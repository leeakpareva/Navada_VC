---
name: ffg-app-design
description: Build screens in the FFG community-app visual language — warm bone and oxblood palette, botanical line art, tall rounded cards, dotted uppercase section labels, and a six-tab bar. Use when designing or coding any screen, component, or mockup for FFG or a founders/members community app in this style.
---

# FFG app design language

Derived from a 10-second product walkthrough. Source frames and manifest:
`library/ffg-app-walkthrough/`. Frame timestamps below are real presentation
times and can be pulled again with the command in `video-to-skill`.

> The source is AI-generated video, so body copy and metadata in the frames are
> rendered noise ("The bam, am", "SEOUR PROFILE", "Gubiody"). Structure,
> layout, color, and headings are reliable; **do not reuse the small copy** —
> write real strings.

## Palette

| Token | Value | Use |
|---|---|---|
| `--ink` | `#141210` | Headings, primary text |
| `--bone` | `#F2EBE0` | Page ground, warm off-white |
| `--card` | `#FFFDF9` | Raised card surfaces |
| `--oxblood` | `#8E2F3A` | Primary accent — LIVE pills, RSVP, active tab |
| `--tan` | `#D9C9A8` | Secondary chips, outlines, CAPITAL badge |
| `--muted` | `#7A6F63` | Metadata, timestamps, secondary text |

The accent is a deep brick red, not a bright red — it sits *under* the ground in
brightness, which is what keeps the palette editorial rather than promotional.
Spend it only on live state and primary actions. The profile screen warms the
ground into a tan gradient; every other screen stays flat bone.

## Type

- **Display**: heavy geometric sans, tight tracking, two lines max
  ("Good afternoon, Leslie." / "Events" / "You"). Large and confident.
- **Body**: same family, regular weight, generous line height.
- **Micro-labels**: uppercase, letterspaced ~0.08em, preceded by a small filled
  dot in oxblood — `• UPCOMING`, `• HAPPENING NOW IN ROOMS`, `• YOUR PROFILE`,
  `SCHEDULED`, `SAVED`, `MORE TO EXPLORE`.

That dotted uppercase label is the signature device. It separates every section
and does the work a horizontal rule would do elsewhere. Use it consistently or
the layout loses its rhythm.

## Layout

Single scrolling column, generous outer margin (~5% of width), cards stacked
with even gaps. Corner radius is large and consistent (~20–24px) on every card,
pill, and chip — nothing in this design has a sharp corner except the type.

**Chrome.** Status bar, then a slim top bar: wordmark (moth glyph + `FFG`) on
Home, a back chevron `‹` on subpages; search and a bell with unread dot on the
right. Screen title sits *below* the bar, large, left-aligned. Secondary screens
add two circular icon buttons on the title's right edge.

**Tab bar** — six items, always in this order:
`Home · Rooms · Connect · Events · Reads · You`
Active tab is oxblood with a filled icon; inactive are `--muted` line icons.

## Components

- **AI briefing card** — bone card, sparkle glyph, dotted uppercase label with a
  `›` affordance, 3–4 lines of digest text. Opens the Home screen.
- **Composer** — pill-shaped row, user avatar left, placeholder text, image icon
  right.
- **Live/room card** — image or botanical illustration, `● LIVE` filled oxblood
  pill top-left, `CAPITAL` tan outlined pill top-right, title over the art,
  overlapping circular avatars bottom-left, `143 listening` bottom-right.
- **Event row** — date chip on the left (tiny floral line glyph, month in small
  caps, large day number), title and metadata center, filled oxblood `RSVP` pill
  right.
- **Reads row** — colored circular category dot, title, two-line excerpt, `···`
  overflow at the right.
- **Stat row** — one white card split into equal columns by hairline dividers,
  label above, large number below (`Connections 28 · Events 3 · Reads 12`).

## Illustration

Botanical line art — roses, peonies, ferns — drawn in tan at low contrast, used
as card backgrounds and as date-chip glyphs. It is the only decorative element,
and it is always monoline and never full-color. Photography, where it appears,
is warm and editorial.

## Building a new screen

1. Bone ground, single column.
2. Top bar, then a large left-aligned title.
3. One hero card if the screen has a "now" state (live, featured, in progress).
4. Dotted uppercase label, then a stack of rows.
5. Six-tab bar pinned to the bottom, correct tab active.

Keep oxblood to one or two elements per screen. If a mock reads as busy, the
accent is over-spent — pull it back to live state and the primary action only.
