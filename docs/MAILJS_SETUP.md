# MailJS (EmailJS) setup — Saprano Sound

MailJS is the entire delivery backend: the browser calls the EmailJS API directly with the
public key. There is no server of ours, no build step, and nothing to deploy beyond the
static files. This doc is the full setup sequence Tony (or whoever holds the accounts)
follows before the form goes live.

## What's already built

- `config.js` (repo root, loaded on every page) holds the three public values:

  ```js
  window.SAPRANO_CONFIG = { publicKey: "", serviceId: "", templateId: "" };
  ```

  Empty by design — until they're filled, the form reports a clear not-configured state
  instead of pretending to send. **Only EmailJS *public* values ever go here.** The EmailJS
  private key exists for server-side API calls only; this site never uses it, and it must
  never be committed.

- The EmailJS browser SDK (`@emailjs/browser@4` from jsDelivr) is loaded with `defer` **only
  on pages that have a form** (home, contact). The other pages don't pay for it.

- Both forms (home + contact) share one handler in `main.js` with these states:
  idle → native validation → not-configured → sending (button disabled) → success →
  failure. Status text is announced via `role="status"` / `aria-live="polite"`.

- Anti-spam honeypot: a visually hidden field named `website`. Bots that fill it get a fake
  success and nothing is sent. Real visitors never see it (`aria-hidden`, `tabindex="-1"`).

## Setup sequence

1. **Account** — create the EmailJS account (owner: Tony).
2. **Email service** — connect the mailbox that should receive inquiries (Gmail, Outlook,
   custom IMAP…). Note the generated **Service ID**.
3. **Template** — create a template whose variables match the form field names exactly:

   | Template variable | Comes from |
   |---|---|
   | `{{from_name}}` | Name field |
   | `{{reply_to}}` | Email field (also set as the template's *Reply-to*) |
   | `{{project}}` | Project select (Vocal recording / Music production / Video editing / Something else) |
   | `{{phone}}` | Phone (optional) |
   | `{{message}}` | Message textarea (JS converts newlines to `<br>`) |
   | `{{page_url}}` | Filled by JS with the page the inquiry came from |
   | `{{time}}` | Filled by JS with the submit timestamp |

   A paste-ready branded template using exactly these variables lives at
   `docs/EMAIL_TEMPLATE.html` — paste it into the template's HTML content field.
   Recommended template settings:

   - **Subject:** `New {{project}} inquiry from {{from_name}}`
   - **Reply To:** `{{reply_to}}`
   - **To:** the receiving mailbox
   - **From Name:** `Saprano Sound`

   Note the **Template ID**.
4. **Public key** — Account → General, copy the **Public key**.
5. **Fill `config.js`** with the three values. Nothing else changes; the forms pick them up
   immediately.
6. **Domain restriction** — in EmailJS account security settings, restrict API use to the
   production origin (and the localhost origin during development). This stops someone else
   from spending your quota with your public key.
7. **Optional hardening** — EmailJS account-level send limits; server-side anti-spam rules
   on the template (e.g. reject empty `{{message}}`).

## Test procedure (before announcing the site)

1. **Unconfigured state** — with `config.js` still empty: submit valid input, expect
   "This form isn't accepting messages yet…". No network call should fire.
2. **Honeypot** — fill the hidden `website` field via devtools, submit: expect fake success,
   nothing delivered.
3. **Validation** — empty required fields and a malformed email: expect native validation,
   no send.
4. **Real send** — fill `config.js`, submit from the production origin: email arrives with
   all six variables populated and the reply-to set to the sender.
5. **Failure path** — temporarily break the template ID: expect the failure message and an
   enabled button afterward.
6. **Domain restriction live** — submit from a non-allowed origin: expect a blocked call.

## Ownership note

Whoever holds the EmailJS login owns the inbox routing and can rotate the public key at any
time by editing `config.js`. Rotating keys requires no other change.
