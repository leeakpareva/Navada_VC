# FFG app walkthrough — extracted notes

Source: 10.0s / 784x1168 / h264 / 24fps, AAC audio with **no speech**
(music bed only — confirmed both with and without the VAD filter). Every piece
of information in this video is visual.

Single continuous take: scene detection found one cut, so the uniform 1 fps
sample carries the walkthrough. Frames are in `frames/`, timestamps in
`manifest.json`.

## Screen sequence

| t (s) | Screen | What's on it |
|---|---|---|
| 0–2 | **Home** | "Good afternoon, Leslie." · AI briefing card (mentor matches, Founders' Breakfast seats, cohort applications) · composer · HAPPENING NOW IN ROOMS carousel (Fundraising, Your first 5 hires) · FFG Insights Group |
| 2–4 | **Rooms** | "Fundraising in 2026 — what's actually working" pinned · live room rows with host avatars · SCHEDULED section · Summer Garden Reception card |
| 4–5 | *transition* | Horizontal push from Rooms to Events |
| 5–6 | **Events** | Summer Garden Reception hero (LIVE, CAPITAL, 143 listening) · UPCOMING list: Founders' Breakfast, Capital Roundtable, Art & Collecting Salon, each with a date chip and RSVP |
| 6–9 | **Reads** | "The Female Founder" hero (LIVE, CAPITAL, 153 listening) · MORE TO EXPLORE: The Future of Social, Building a Strong Pitch, Mastering Term Sheets |
| 9–10 | **You** | Profile (Leslie, Edit profile) · stat row Connections 28 / Events 3 / Reads 12 · SAVED sections |

## Product model

A members' community app for founders. Six tabs: Home, Rooms, Connect, Events,
Reads, You. Four content types — **Rooms** (live audio), **Events** (dated,
RSVP-able), **Reads** (articles/audio), and **Connect** (mentor matching,
implied by the briefing copy but never opened on screen). A `CAPITAL` badge
marks a premium or investor tier across both Rooms and Reads.

The Connect tab is never opened in the video. Anything about its contents would
be a guess.

## Caveat

AI-generated footage. Headings render cleanly; smaller copy is text-shaped
noise ("The bam, am", "17et. 1 4.3 - 12 11 am", "SEOUR PROFILE", "Gubiody").
Treat layout and hierarchy as real, and every body or metadata string as
placeholder.
