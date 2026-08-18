# vid2skill

Turn a video into artifacts a language model can read — then into a skill or a
written spec.

No current Claude model accepts video or audio. "Watching" a video means
decoding it into frames and a transcript:

```
video ──ffmpeg──> frames (images) ──┐
      └─ffmpeg──> audio ──whisper──> transcript (text) ──> Claude reads ──> SKILL.md
```

## Use

```bash
make setup                                     # ffmpeg + python deps
python3 pipeline/vid2skill.py run inbox/demo.mp4 --slug demo
```

Output lands in `library/<slug>/`:

| File | What it is |
|---|---|
| `manifest.json` | Every frame with its true presentation time, plus source and transcript metadata |
| `frames/` | `u*.jpg` uniform samples, `s*.jpg` scene changes |
| `contact.jpg` | Tiled overview — read this first, it costs one image |
| `transcript.md` | Timestamped speech, or an explicit "no speech detected" |

Reproducibly, via the pinned toolchain:

```bash
make docker-build && make docker-run VIDEO=inbox/demo.mp4 SLUG=demo
```

## Design notes

- **Scene detection is paired with uniform sampling, never used alone.** A
  continuous shot yields exactly one scene frame, and `gt(scene,X)` never fires
  on frame 0, silently dropping the opening. The filter forces `eq(n,0)`.
- **Timestamps come from ffmpeg's `showinfo`,** not filename order, so manifest
  times are safe to cite.
- **Transcription runs with a VAD filter.** Whisper hallucinates lyrics over
  music without one; with it, a music-only track correctly returns zero
  segments. `has_speech: false` is a real answer, not a failure.
- **Frame count is bounded** (`MAX_FRAMES = 120`) by widening the sample
  interval on long videos, so a 90-minute recording doesn't produce thousands
  of images.
- **Raw video is never committed.** `inbox/` and media extensions are
  gitignored; only derived artifacts live in `library/`.

## Sandboxing

`docker/Dockerfile` pins ffmpeg and the ASR weights so runs behave identically
on a laptop, in CI, and in an agent sandbox. The same file is what
`e2b template build` consumes if you later move execution into E2B Firecracker
microVMs — worth doing when *other people's* videos are the input, since
containers share the host kernel and ffmpeg has a long CVE history against
malicious media. For your own files, Docker is enough.

## Skills

- `.claude/skills/video-to-skill/` — drives this pipeline and decides what a
  given video can honestly become
- `.claude/skills/ffg-app-design/` — generated from `library/ffg-app-walkthrough/`,
  a worked example of the output
