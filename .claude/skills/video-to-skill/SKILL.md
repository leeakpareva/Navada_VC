---
name: video-to-skill
description: Turn a video into readable artifacts (frames + transcript) and then into a skill or a written spec. Use whenever the user drops a video file, references a .mp4/.mov/.m4v/.webm/.mkv, or asks to "watch", "study", "learn from", "summarize", or "extract information from" a video, screen recording, demo, tutorial, or walkthrough.
---

# Video to skill

## The constraint that shapes everything

You cannot watch video or hear audio. No current Claude model accepts either.
"Watching" a video always means decoding it into things you *can* read:

**video → frames (images) + transcript (text) → you read those → you write the output**

Never claim to have watched a video. You read frames sampled from it.

## Where an uploaded video lands

Attachments from the desktop and mobile apps arrive at
`/root/.claude/uploads/<session-id>/<file>`. They do **not** appear in the repo,
and `/mnt/attach` may exist but stay empty. When the user says they dropped a
video, look there first:

```bash
ls -la /root/.claude/uploads/*/ 2>/dev/null | grep -iE '\.(mp4|mov|m4v|webm|mkv)'
```

## Run the pipeline

```bash
python3 pipeline/vid2skill.py run <path-to-video> --slug <short-name>
```

Writes `library/<slug>/` containing `manifest.json` (every frame with its real
timestamp), `frames/`, `contact.jpg`, and `transcript.md`.

If `ffmpeg` is missing, install it with
`apt-get install -y --no-install-recommends ffmpeg` — plain `apt-get install ffmpeg`
fails in this environment because optional VA-API driver packages 404 against a
stale index. Playwright's bundled ffmpeg at `/opt/pw-browsers/` is built
`--disable-everything` and cannot decode H.264 or HEVC; do not use it.

## Then read what it produced

1. **`contact.jpg` first.** One tiled image gives you the whole arc for the cost
   of a single Read. Decide from it which moments deserve attention.
2. **`transcript.md` next.** On a narrated video the words carry most of the
   information; frames mostly confirm and locate what was said.
3. **Full-resolution frames last, and selectively.** Small UI text and code are
   unreadable in the downscaled contact sheet. Pull an exact moment with:
   ```bash
   ffmpeg -v error -ss <seconds> -i <video> -frames:v 1 -q:v 2 /tmp/frame.jpg
   ```
   Reading all frames at full size burns context for little gain — pick the
   handful that carry the actual content.

## Decide what the video can honestly become

Match the output to the material. Forcing a skill out of a video that has no
procedure in it produces something that reads like instructions but teaches
nothing.

| The video shows | The right output |
|---|---|
| A repeatable procedure (GUI walkthrough, tool demo, setup) | A skill — steps, preconditions, failure modes |
| A designed interface or artifact | A spec — navigation, layout, palette, type, components |
| Discussion, a talk, a conversation | Notes with timestamps — not a skill |
| A bug or failure being reproduced | A repro report — steps, expected vs. actual |

Say which one you're producing and why. If a video does not contain a
procedure, say so rather than inventing one.

## Writing the skill

Hand off to the **`skill-creator`** skill — it owns the SKILL.md format and can
validate and eval the result. Write generated skills to
`.claude/skills/<slug>/SKILL.md` and keep supporting frames and the transcript
in `library/<slug>/`, referenced by relative path.

## What the decode will and won't give you

- **Scene detection alone is not enough.** A continuous shot yields exactly one
  frame, and `gt(scene,X)` never fires on frame 0 — a title card vanishes. The
  pipeline pairs scene detection with uniform sampling and forces frame 0 for
  this reason. Don't remove either half.
- **Silence is a real answer.** Transcription runs with a VAD filter because
  Whisper hallucinates lyrics over a music bed without one. `has_speech: false`
  in the manifest means the video genuinely has no narration — then every piece
  of information is in the pixels, and you must read more frames, not fewer.
- **AI-generated video contains fake text.** Diffusion models render
  text-shaped noise: plausible headings beside garbled words. If frames show
  strings like `Gubiody` or `SEOUR PROFILE`, treat *all* small text in that
  video as unreliable. Report structure and layout confidently; quote specific
  copy only where it is unambiguously legible, and flag the rest.
- **Timestamps come from `showinfo`,** not from filename order, so
  `manifest.json` times are the real presentation times and safe to cite.

## Never

- Commit raw video. `inbox/` and media extensions are gitignored; only the
  derived artifacts in `library/` belong in the repo.
- Describe frames you did not Read.
- Present garbled generated text as real product copy.
