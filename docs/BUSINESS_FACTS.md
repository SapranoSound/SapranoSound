# Business facts — Saprano Sound

Single source of truth for every factual claim on the site. Rule carried over from the
Checkmark Audio SEO strategy docs: **never invent facts**. Anything not listed under
"Approved" needs Tony's explicit approval (exact wording) before it appears anywhere —
page copy, metadata, or structured data. Unapproved items ship as `<!-- NEEDS APPROVAL -->`
source comments, never as placeholder-looking text.

## Approved and published

| Fact | Value | Where it appears |
|---|---|---|
| Business name | Saprano Sound | Site-wide |
| Operator | Tony Rivera — audio engineer, music producer, video editor | Site-wide, Person schema |
| Studio home | Checkmark Audio Studio B, 5413 Lomas Blvd NE, Albuquerque, NM 87110 | Proof strip, contact, footer, LocalBusiness schema |
| Services | Vocal recording · Music production · Video editing | Home, Services |
| Working modes | In-studio · Remote · Travel | Home, Services, footer |
| Demo reel | 1:04 (63.79 s), 1920×1080, H.264 + AAC audio, MP4 | Home, /demo-reel/, VideoObject schema |
| Working domain in all URLs | `https://sapranosound.com/` | Canonicals, OG, JSON-LD, robots, sitemap |

Source material: Tony's own photos and reel in `Website Pictures/`; studio affiliation and
address from the Checkmark Audio implementation-plan documents.

## Deliberately absent (and why)

- **Rates / pricing** — quoted per project. The Services FAQ says so explicitly instead of publishing a rate.
- **Years of experience, education, credentials** — out of scope per the brief.
- **Client list / credits** — none supplied.
- **Reviews and ratings** — no review markup and no `aggregateRating` anywhere. Quotes enter the home proof strip only after Tony approves the exact text, reviewer attribution, and source link.
- **Gear/equipment list** — none supplied.
- **Claims of ranking results** — the site cannot guarantee search placement; nothing on it implies one.

## NEEDS APPROVAL before launch

| # | Item | Lands in |
|---|---|---|
| 1 | Direct phone | Utility strip, contact details, footer, mobile rail, `telephone` in LocalBusiness schema (property intentionally absent until the number exists) |
| 2 | Direct email | Contact details, footer |
| 3 | Business hours | Contact details |
| 4 | Social profile URLs | Footer + contact page |
| 5 | MailJS public key / service ID / template ID | `config.js` (see `docs/MAILJS_SETUP.md`) |
| 6 | Production domain confirmation | Canonicals, OG, JSON-LD, robots.txt, sitemap.xml (currently `sapranosound.com`) |
| 7 | Review quotes — exact text + reviewer name + source link | Home proof strip |
| 8 | Studio address confirmation | Proof strip, contact, footer, schema |

Rule for all eight: no placeholder values ship. Until an item is approved the site simply
doesn't display it, and the copy never points at something that isn't there.
