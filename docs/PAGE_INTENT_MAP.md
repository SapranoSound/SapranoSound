# Page intent map — Saprano Sound

Five pages, one conversion route. Every page ends at the contact form; no page exists
just to fill a keyword. URL convention: lowercase, hyphenated, directory URLs with one
trailing slash, self-referencing canonical on every page.

## `/` — Home

- **Title:** Saprano Sound | Audio Engineering, Production & Video Editing in Albuquerque
- **Intent:** head cluster — audio engineer Albuquerque, music production, vocal recording, video editing; brand capture for "Saprano Sound"
- **Job:** establish identity + location, show the reel as primary evidence, then services → about → contact
- **Order:** hero (full-bleed studio image) → demo reel → proof strip (Checkmark affiliation; approved quotes when they exist) → three service statements → single About section → contact form
- **Primary CTA:** "Start a project" → `/contact/` (header, hero, mobile rail; one dominant action per view)
- **Schema:** ProfessionalService + LocalBusiness, Person (Tony), WebSite — all facts mirrored in visible copy, no review/rating markup

## `/services/` — Services

- **Title:** Recording, Production & Video Editing Services | Saprano Sound
- **Intent:** service-query cluster — vocal recording Albuquerque, music production services, video editing
- **Job:** each service gets who it's for / how it runs / what to bring — useful detail, not a keyword stub; plus how sessions run (studio, remote, travel) and a short practical FAQ
- **CTA:** per-service anchors from home; end band → `/contact/`
- **Schema:** none beyond site defaults. The FAQ is a plain visible `<dl>`; no FAQPage markup (rich results here aren't eligible for a small local site, and markup discipline beats markup volume)

## `/about/` — About Tony

- **Title:** About Tony Rivera | Saprano Sound
- **Intent:** person/entity queries — "Tony Rivera Albuquerque", supports E-E-A-T for the whole site
- **Job:** factual bio + approved portrait; approach section (evidence first); no experience-year or education claims
- **CTA:** → `/demo-reel/`, → `/contact/`
- **Schema:** Person (same `@id` graph as home), profile OG type

## `/contact/` — Contact

- **Title:** Contact Tony Rivera | Saprano Sound
- **Intent:** high-intent conversion — "hire audio engineer Albuquerque", contact queries
- **Job:** MailJS form is the primary route; studio address, based-in, availability shown as direct alternatives; "what to include" guidance raises message quality
- **CTA:** the form itself (utility strip and header link anchor to `#contact-form`)

## `/demo-reel/` — Demo reel

- **Title:** Demo Reel | Saprano Sound — Tony Rivera
- **Intent:** video-search metadata lives here so the home page stays lean
- **Job:** the reel with native controls, what's-in-it summary, runtime/resolution/format facts, exit to contact
- **CTA:** → `/contact/`, → `/services/`
- **Schema:** VideoObject — name, description, thumbnail, contentUrl, uploadDate, duration `PT1M4S`, creator, publisher; values match the actual file

## Metadata rules applied site-wide

- One `<h1>` per page; heading hierarchy never skips levels
- Distinct title + description per page; no two pages target the same primary query
- Self-referencing canonical, absolute URLs, matching `og:url`
- Descriptive image filenames and contextual alt text per Google's image guidance — no keyword-loaded media names, no alt stuffing
- Sitemap lists exactly the five pages; robots.txt allows all and points at it
