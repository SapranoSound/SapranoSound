# Saprano Sound

Static five-page site for Saprano Sound — Tony Rivera's audio engineering, music
production, and video editing practice at Checkmark Audio Studio B in Albuquerque. Dark
editorial design, portfolio-first: the demo reel is the evidence, every path ends at the
MailJS contact form.

No framework, no build step, no dependencies to install. Plain HTML, one stylesheet, one
behaviour file.

## Structure

```
index.html            Home — hero → reel → proof strip → services → about → contact
services/index.html   Service detail, sessions, practical FAQ
about/index.html      About Tony (Person schema)
contact/index.html    MailJS form + direct contact details
demo-reel/index.html  The reel page (VideoObject schema)
styles.css            Design system (Fraunces + Inter self-hosted, reduced-motion safe)
main.js               Nav, reveals, reel play affordance, form states
config.js             Public MailJS values only — never private keys
images/  video/  fonts/   Generated web derivatives (see docs/MEDIA_CATALOG.md)
docs/                 Business facts, page intent map, media catalog, MailJS setup
Website Pictures/     Tony's originals — untouched, never served as-is
```

## Local preview

Serve the directory with any static server that resolves directory indexes, e.g.:

```
ruby -run -e httpd . -p 8090 -b 127.0.0.1
```

then open `http://127.0.0.1:8090/`. Clean URLs (`/services/` etc.) depend on the server
serving `index.html` per directory — any normal static host does.

## Media

All published media is generated: AVIF/WebP/JPEG derivatives with GPS and camera metadata
stripped, plus a 1080p H.264 transcode of the reel (~5.5 MB) with poster frames. Sources,
alt text, and page assignments are in [docs/MEDIA_CATALOG.md](docs/MEDIA_CATALOG.md).
Originals in `Website Pictures/` are the only archival copies — treat them as the source of
truth for regeneration.

## Before launch

Everything below ships today as `<!-- NEEDS APPROVAL -->` source notes — no placeholder
values are visible anywhere on the site. Full detail: [docs/BUSINESS_FACTS.md](docs/BUSINESS_FACTS.md).

- [ ] Tony's direct phone → utility strip, contact, footer, mobile rail, schema `telephone`
- [ ] Tony's direct email → contact, footer
- [ ] Business hours and social profile URLs → contact, footer
- [ ] MailJS public key / service ID / template ID → `config.js`
      (full setup + test procedure: [docs/MAILJS_SETUP.md](docs/MAILJS_SETUP.md))
- [ ] Production domain confirmation → canonicals, OG, JSON-LD, robots.txt, sitemap.xml
      (currently `sapranosound.com`)
- [ ] Review quotes — exact text, reviewer attribution, and source link approved by Tony →
      home proof strip. No review markup or ratings ship with or without quotes.

## After launch

- Submit `sitemap.xml` in Google Search Console.
- Keep the matching Google Business Profile accurate and consistent with the NAP on the site.
- No completed site can guarantee first-page ranking; these steps improve discovery, nothing more.
