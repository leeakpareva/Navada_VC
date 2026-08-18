#!/usr/bin/env python3
"""Turn a video into artifacts a language model can actually read.

No current Claude model accepts video or audio, so "watching" a video means
decoding it into frames (images) and a transcript (text). This script does that
decode and writes everything into library/<slug>/ with a manifest tying each
frame to its timestamp.

    python3 pipeline/vid2skill.py run inbox/demo.mp4 --slug my-demo

Stages run independently too (probe / extract / transcribe), which is useful
when you want to re-extract frames without paying for transcription again.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LIBRARY = REPO / "library"

# Scene detection alone is unreliable: a continuous shot yields one frame, and
# `gt(scene,X)` never fires on frame 0, so a title card is silently lost. We
# always pair it with uniform sampling and force frame 0 into the selection.
SCENE_THRESHOLD = 0.2
UNIFORM_INTERVAL = 1.0
MAX_FRAMES = 120
FRAME_WIDTH = 1024


class PipelineError(RuntimeError):
    pass


def require_tools(*names: str) -> None:
    missing = [n for n in names if shutil.which(n) is None]
    if missing:
        raise PipelineError(
            f"missing required tool(s): {', '.join(missing)}. "
            "Install ffmpeg (apt-get install -y --no-install-recommends ffmpeg) "
            "or use the Docker image in docker/."
        )


def run(cmd: list[str], capture_stderr: bool = False) -> str:
    proc = subprocess.run(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    if proc.returncode != 0:
        tail = "\n".join(proc.stderr.strip().splitlines()[-8:])
        raise PipelineError(f"command failed ({' '.join(cmd[:3])}...):\n{tail}")
    return proc.stderr if capture_stderr else proc.stdout


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "untitled"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1 << 20), b""):
            digest.update(block)
    return digest.hexdigest()


# --------------------------------------------------------------------------- probe


@dataclass
class Probe:
    duration: float
    size: int
    video: dict
    audio: dict | None

    @property
    def has_audio(self) -> bool:
        return self.audio is not None


def probe(source: Path) -> Probe:
    require_tools("ffprobe")
    raw = run(
        [
            "ffprobe", "-v", "error", "-print_format", "json",
            "-show_format", "-show_streams", str(source),
        ]
    )
    data = json.loads(raw)
    fmt = data.get("format", {})

    video_stream = None
    audio_stream = None
    for stream in data.get("streams", []):
        kind = stream.get("codec_type")
        # An mjpeg "video" stream is an embedded cover image, not real footage.
        if kind == "video" and stream.get("codec_name") != "mjpeg" and video_stream is None:
            video_stream = stream
        elif kind == "audio" and audio_stream is None:
            audio_stream = stream

    if video_stream is None:
        raise PipelineError(f"no decodable video stream found in {source.name}")

    def fps(stream: dict) -> float:
        num, _, den = (stream.get("r_frame_rate") or "0/1").partition("/")
        try:
            return round(int(num) / int(den), 3) if int(den) else 0.0
        except (ValueError, ZeroDivisionError):
            return 0.0

    return Probe(
        duration=float(fmt.get("duration", 0.0)),
        size=int(fmt.get("size", 0)),
        video={
            "codec": video_stream.get("codec_name"),
            "width": video_stream.get("width"),
            "height": video_stream.get("height"),
            "fps": fps(video_stream),
            "frames": int(video_stream.get("nb_frames") or 0),
        },
        audio=None
        if audio_stream is None
        else {
            "codec": audio_stream.get("codec_name"),
            "channels": audio_stream.get("channels"),
            "sample_rate": audio_stream.get("sample_rate"),
        },
    )


# ------------------------------------------------------------------------- extract


@dataclass
class Frame:
    file: str
    t: float
    kind: str


@dataclass
class Extraction:
    frames: list[Frame] = field(default_factory=list)
    contact_sheet: str | None = None
    audio_wav: Path | None = None
    uniform_interval: float = UNIFORM_INTERVAL


def _select_frames(
    source: Path, out_dir: Path, prefix: str, vfilter: str, kind: str
) -> list[Frame]:
    """Extract frames and recover each one's true timestamp from showinfo."""
    pattern = str(out_dir / f"{prefix}%04d.jpg")
    stderr = run(
        [
            "ffmpeg", "-v", "info", "-i", str(source), "-map", "0:v:0",
            "-vf", f"{vfilter},scale={FRAME_WIDTH}:-2,showinfo",
            "-fps_mode", "vfr", "-q:v", "4", pattern,
        ],
        capture_stderr=True,
    )
    # showinfo prints one line per emitted frame, in output order.
    times = [float(m) for m in re.findall(r"pts_time:([0-9.]+)", stderr)]
    files = sorted(out_dir.glob(f"{prefix}*.jpg"))
    frames = []
    for idx, path in enumerate(files):
        t = times[idx] if idx < len(times) else 0.0
        frames.append(Frame(file=path.name, t=round(t, 3), kind=kind))
    return frames


def extract(source: Path, dest: Path, probe_data: Probe) -> Extraction:
    require_tools("ffmpeg")
    frames_dir = dest / "frames"
    if frames_dir.exists():
        shutil.rmtree(frames_dir)
    frames_dir.mkdir(parents=True)

    # Keep the frame count bounded on long videos by widening the sample interval.
    interval = UNIFORM_INTERVAL
    if probe_data.duration > MAX_FRAMES * UNIFORM_INTERVAL:
        interval = round(probe_data.duration / MAX_FRAMES, 2)

    result = Extraction(uniform_interval=interval)
    result.frames.extend(
        _select_frames(source, frames_dir, "u", f"fps=1/{interval}", "uniform")
    )
    # eq(n,0) forces the opening frame, which gt(scene,...) alone always drops.
    result.frames.extend(
        _select_frames(
            source, frames_dir, "s",
            f"select='eq(n\\,0)+gt(scene\\,{SCENE_THRESHOLD})'", "scene",
        )
    )
    result.frames.sort(key=lambda f: (f.t, f.kind))

    if result.frames:
        sheet = dest / "contact.jpg"
        cols = 5
        rows = max(1, (len([f for f in result.frames if f.kind == "uniform"]) + cols - 1) // cols)
        try:
            run([
                "ffmpeg", "-v", "error", "-pattern_type", "glob",
                "-i", str(frames_dir / "u*.jpg"),
                "-filter_complex", f"scale=320:-2,tile={cols}x{rows}:margin=6:padding=4",
                "-frames:v", "1", "-q:v", "3", str(sheet),
            ])
            result.contact_sheet = sheet.name
        except PipelineError:
            pass  # A contact sheet is a convenience, never a reason to fail the run.

    if probe_data.has_audio:
        wav = dest / "audio.wav"
        run([
            "ffmpeg", "-v", "error", "-y", "-i", str(source),
            "-map", "0:a:0", "-ac", "1", "-ar", "16000", str(wav),
        ])
        result.audio_wav = wav

    return result


# ---------------------------------------------------------------------- transcribe


def transcribe(wav: Path, dest: Path, model_size: str = "base") -> dict:
    """Transcribe with faster-whisper. Silence is reported, never invented."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        return {
            "backend": None,
            "has_speech": False,
            "segments": 0,
            "note": "faster-whisper not installed; run pip install -r pipeline/requirements.txt",
        }

    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    # VAD matters: without it Whisper will happily hallucinate lyrics over a
    # music bed. With it, a music-only track correctly yields zero segments.
    segments, info = model.transcribe(str(wav), vad_filter=True)

    lines, count = [], 0
    for seg in segments:
        lines.append(f"[{seg.start:07.2f} → {seg.end:07.2f}] {seg.text.strip()}")
        count += 1

    body = "\n".join(lines) if lines else "_No speech detected (music or silence only)._"
    (dest / "transcript.md").write_text(
        f"# Transcript\n\nLanguage: {info.language} "
        f"(confidence {info.language_probability:.2f})\n\n{body}\n"
    )
    return {
        "backend": f"faster-whisper/{model_size}",
        "language": info.language,
        "language_probability": round(info.language_probability, 3),
        "segments": count,
        "has_speech": count > 0,
    }


# ---------------------------------------------------------------------------- cli


def cmd_run(args: argparse.Namespace) -> int:
    source = Path(args.source).expanduser()
    if not source.is_file():
        raise PipelineError(f"no such file: {source}")

    slug = slugify(args.slug or source.stem)
    dest = LIBRARY / slug
    dest.mkdir(parents=True, exist_ok=True)

    print(f"→ probing {source.name}")
    info = probe(source)
    print(f"  {info.duration:.1f}s  {info.video['width']}x{info.video['height']}  "
          f"{info.video['codec']}  audio={'yes' if info.has_audio else 'no'}")

    print("→ extracting frames")
    ext = extract(source, dest, info)
    kinds = {}
    for f in ext.frames:
        kinds[f.kind] = kinds.get(f.kind, 0) + 1
    print(f"  {len(ext.frames)} frames ({kinds})")

    transcript_info = {"has_speech": False, "segments": 0, "backend": None}
    if ext.audio_wav and not args.no_transcribe:
        print("→ transcribing audio")
        transcript_info = transcribe(ext.audio_wav, dest, args.model)
        print(f"  {transcript_info['segments']} speech segments")
        if not args.keep_wav:
            ext.audio_wav.unlink(missing_ok=True)

    manifest = {
        "slug": slug,
        "source": {
            "filename": source.name,
            "sha256": sha256(source),
            "duration_s": round(info.duration, 3),
            "size_bytes": info.size,
            "video": info.video,
            "audio": info.audio,
        },
        "extraction": {
            "uniform_interval_s": ext.uniform_interval,
            "scene_threshold": SCENE_THRESHOLD,
            "frame_width": FRAME_WIDTH,
            "frame_count": len(ext.frames),
            "contact_sheet": ext.contact_sheet,
        },
        "transcript": transcript_info,
        "frames": [{"file": f"frames/{f.file}", "t": f.t, "kind": f.kind} for f in ext.frames],
    }
    (dest / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"✓ {dest.relative_to(REPO)}/manifest.json")
    return 0


def cmd_probe(args: argparse.Namespace) -> int:
    info = probe(Path(args.source).expanduser())
    print(json.dumps(info.__dict__, indent=2))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="command", required=True)

    p_run = sub.add_parser("run", help="probe + extract + transcribe")
    p_run.add_argument("source")
    p_run.add_argument("--slug", help="output name under library/ (default: filename)")
    p_run.add_argument("--model", default="base", help="whisper model size")
    p_run.add_argument("--no-transcribe", action="store_true")
    p_run.add_argument("--keep-wav", action="store_true")
    p_run.set_defaults(func=cmd_run)

    p_probe = sub.add_parser("probe", help="inspect a video without extracting")
    p_probe.add_argument("source")
    p_probe.set_defaults(func=cmd_probe)

    args = parser.parse_args()
    try:
        return args.func(args)
    except PipelineError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
