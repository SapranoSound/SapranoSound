# Media catalog — Saprano Sound

Every public derivative, its source file in `Website Pictures/` (originals untouched), its
page assignment, and its alt text. Governance applied, per the media plan:

- factual, short filenames — role, not keywords
- AVIF + WebP + JPEG for photos; every `<picture>` has a fallback chain
- **all precise GPS and camera metadata stripped** from public derivatives (verified with `mdls`: no latitude/longitude, no camera model on any shipped file)
- orientation normalized at build (no EXIF rotation dependency)
- alt text describes what is visibly in the frame; nothing invented, nothing stuffed
- derivatives exist **only** where a page assignment exists

## Studio photographs (source: Sony 4240×2384 frames)

| Derivative base (`images/studio/`) | Source | Widths (AVIF/WebP/JPEG) | Alt text | Used on |
|---|---|---|---|---|
| `vocal-microphone-red-light` | `DSC08388.JPG` | 960 / 1440 / 1920 / 2560 | "Studio microphone lit in red against a curtain in a darkened recording room" | Home hero, home + homepage OG image |
| `vocal-booth-blue-light` | `DSC08430.JPG` | 640 / 1024 / 1600 | "Vocal booth lit in blue with a patterned curtain and instruments in the background" | About page, approach section |
| `control-room-workstation` | `DSC08350.JPG` | 640 / 1024 / 1600 | "Recording workstation with a monitor showing an editing session and a studio monitor speaker" | Services page sessions section, services OG image |
| `studio-rack-gear` | `DSC08406.JPG` | 640 / 1024 / 1600 | (not shown in page body) | Contact page OG image only — social preview |

The three portrait-orientation sets are center crops to 640×1138-class framing; the hero is
a 16:9 landscape set.

## Portrait

| Derivative base (`images/team/`) | Source | Widths | Alt text | Used on |
|---|---|---|---|---|
| `tony-rivera-portrait` | `Tony_profile_Pic_DSC2846.jpg` (2670×2781; developed from `_DSC2846.ARW`. A re-saved duplicate exists as `tony-rivera-profile-portrait.jpg` — same photo, different bytes) | 480 / 800 / 1200 | "Tony Rivera smiling in front of a green foliage wall" | Home About section, About page, About OG image, Person schema |

## Brand

| File (`images/brand/`) | Source | Used on |
|---|---|---|
| `checkmark-audio-logo-white-256` (PNG + WebP) | `CMA_Logo_Updated(White).png` (4000px original) | Header lockup (34px), home proof strip (44px), footer — alt "Checkmark Audio" |

No invented Saprano Sound icon exists — the Saprano Sound mark is typographic
("Saprano **Sound**") in the Fraunces face, sitting beside the Checkmark logo.

## Demo reel (`video/`)

| File | Facts |
|---|---|
| `saprano-sound-demo-reel-2026.mp4` | 1920×1080, H.264 + MPEG-4 AAC audio, 63.79 s (1:04), 5,771,653 bytes (~5.5 MiB, under the 6 MB budget), faststart |
| `saprano-sound-demo-reel-thumbnail-1280w` (AVIF/WebP/JPEG) | Poster shown before play; OG image on home and reel page |
| `saprano-sound-demo-reel-thumbnail-1920w` (AVIF/WebP/JPEG) | Larger thumbnail listed in VideoObject `thumbnailUrl` |

Source: `copy_C597AD5E-7575-4D95-8B75-5FB50E2068C5.MOV` (30.5 MB HEVC). Transcoded to
1080p H.264; no metadata retained. Video never autoplays; `preload="none"` with poster on
both pages.

## Originals deliberately unused (kept in `Website Pictures/`, never published)

`IMG_3934.JPG`, `IMG_3455.HEIC`, `1000012987.jpeg`, `images (1).jpeg` — no page assignment
(visual review decided they didn't fit the editorial direction). `CMA_Logo_Black.png` —
black logo doesn't work on the dark system. `checkmark_logo_gold 2.png` — gold lockup out
of scope for this brand; gold derivatives were generated during the build and then removed
when no page referenced them. `_DSC2846.ARW`, `_DSC2848.ARW` — RAW originals.

## Regeneration

The build toolchain (portable Node + `sharp`, static `ffmpeg`) is intentionally not
committed — it was fetched to a temp dir at build time. To regenerate or extend: re-fetch
that toolchain, strip metadata (`sharp` with no `withMetadata()`), keep the naming and
width tables in this file, and re-verify GPS cleanliness with `mdls` before publishing.
