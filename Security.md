# Security headers — how they're applied at each stage

Browsers only enforce most security headers when they arrive as real HTTP
response headers. A static HTML file (which is all GitHub Pages and GoDaddy
shared hosting serve) can only fake **two** of them via `<meta>` tags:
`Content-Security-Policy` and `Referrer-Policy`. Everything else
(`X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`,
`Permissions-Policy`, and the `frame-ancestors` part of CSP) is silently
ignored by the browser if it's not a real header.

That's why this is done in three layers:

| Stage | What's active | Where it's defined |
|---|---|---|
| **GitHub Pages (team preview)** | CSP + Referrer-Policy only (meta tags) | `vite-plugin-partials.ts` → injected into every page's `<head>` at build time |
| **GoDaddy origin (fallback)** | Full header set | `public/.htaccess` → copied into `dist/.htaccess` on build |
| **Cloudflare (production, final)** | Full header set, edge-enforced, applies even if `.htaccess` fails | Configured manually in the Cloudflare dashboard — see below |

Cloudflare is the one that actually matters in production, since every
request hits it first. Treat GoDaddy's `.htaccess` as a safety net, not the
primary control.

## Cloudflare setup (do this once GoDaddy + Cloudflare are connected)

**Rules → Transform Rules → Modify Response Header** (free plan supports this):

Create a rule, e.g. "Security headers", matching `Hostname equals
www.lbrinfosolutions.com` (and your apex domain), then add these
**Set static** header actions:

| Header | Value |
|---|---|
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'inline-speculation-rules'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://formspree.io https://script.google.com https://script.googleusercontent.com; form-action 'self' https://formspree.io; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests` |

Also worth turning on while you're in the dashboard (not headers, but part
of the same hardening pass, all free-plan):
- **SSL/TLS → Overview**: set to **Full (strict)** once GoDaddy has a valid cert, not "Flexible".
- **SSL/TLS → Edge Certificates**: enable **Always Use HTTPS** and **Automatic HTTPS Rewrites**.
- **SSL/TLS → Edge Certificates → HSTS**: enable it there too — it's the mechanism the docs push you toward instead of hand-rolling the header, and it'll stay in sync with the "Always Use HTTPS" setting.

## If the CSP ever breaks something

The policy above was built from what the site currently loads: self-hosted
JS bundle, Google Fonts stylesheet, Formspree for the contact form, the
Careers page's Google Apps Script endpoint (`script.google.com` /
`script.googleusercontent.com`, via `VITE_CAREERS_API_URL`), and no other
third-party scripts. If you add something later (analytics, a chat
widget, Stripe.js, another API, etc.), it will be blocked by default
under this CSP — that's the point of CSP — and you'll need to add its
domain to the relevant directive (usually `script-src` or `connect-src`)
in **both** places: `vite-plugin-partials.ts` (meta tag) and the
Cloudflare Transform Rule (and `.htaccess`, for consistency, though it's
the least important of the three).

Note that endpoints loaded from an env var (`import.meta.env.VITE_*`)
won't show up if you just grep the codebase for `https://` — check every
`.env*` file and every `import.meta.env.VITE_*` reference too, not just
literal URLs in `.ts`/`.html` files.

## Why `'inline-speculation-rules'` is in `script-src`

`src/scripts/prefetch.ts` injects an inline `<script type="speculationrules">`
tag on supporting browsers (on-hover prefetching — see that file's header
comment for the full design). CSP treats speculation-rules scripts like
any other inline script and blocks them by default; `'inline-speculation-rules'`
is a narrow CSP keyword that allow-lists exactly that one tag type without
loosening `script-src` for anything else (no general `'unsafe-inline'` was
added).

Quickest way to check what's being blocked: open DevTools → Console, the
browser prints a CSP violation for each blocked resource with the exact
directive that needs updating.

## Why `unsafe-inline` is in `style-src`

Several pages use inline `style="..."` attributes (mostly for
one-off positioning/masks). Removing `unsafe-inline` would require moving
all of those into classes or using per-page CSP hashes — worth doing
eventually, but not blocking for now. `script-src` has no such exception:
there are no inline `<script>` blocks or `onclick`-style handlers in the
codebase, so scripts are locked to `'self'` with no loosening.
