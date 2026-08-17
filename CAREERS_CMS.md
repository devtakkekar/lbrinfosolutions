# Careers page — dynamic job postings (Google Sheets CMS)

The Careers page (`src/pages/career/`) can load job postings from a Google
Sheet at runtime, so postings can be added/edited/removed without touching
code or redeploying the site. The site stays fully static — the browser
fetches job data directly from a Google Apps Script JSON endpoint.

```
GitHub Pages (static site)
        ↓ runtime fetch (browser)
Google Apps Script Web App  (google-apps-script/Code.gs)
        ↓
Google Sheet ("Jobs" + "JobSections")
```

If the API isn't configured, is unreachable, or returns malformed data,
the page falls back to the local postings in `src/data/careers.ts` — the
Careers page never breaks because of the Sheet.

## 1. Files changed / added

| File | What changed |
|---|---|
| `src/data/careers.ts` | Added optional `id?: string` to `JobPosting`. Array is now the **fallback** data source. |
| `src/data/careers-api.ts` | **New.** `getJobPostings()` — fetches + validates the Apps Script response, falls back on any failure. |
| `src/components/careers-list.ts` | Added HTML-escaping (data is now untrusted); added `renderJobPostingsLoading()` and `renderJobPostingsEmpty()`. |
| `src/components/careers-modal.ts` | Added HTML-escaping for section headings/items. |
| `src/pages/career/index.html` | Page script now `async`, calls `getJobPostings()` instead of importing the static array; shows a loading skeleton, then the cards, or an empty-state message. |
| `src/styles/careers.css` | Added skeleton/empty-state styles only — no changes to existing card/modal styles. |
| `src/vite-env.d.ts` | Typed the new `VITE_CAREERS_API_URL` env var. |
| `.env.example` | Documents the env var. |
| `google-apps-script/Code.gs` | **New.** The Apps Script Web App source (not part of the site build — deployed separately, see below). |

## 2. Google Sheet schema

Create a Google Sheet with two tabs:

**`Jobs`**

| id | title | summary | linkedin_url | sort_order | active |
|---|---|---|---|---|---|
| 001 | Sales Manager | Drive new business and grow key accounts... | https://linkedin.com/... | 1 | TRUE |
| 002 | Intern | A 6-month, hands-on introduction to... | https://linkedin.com/... | 2 | TRUE |

- `id` — any short unique text (used to link rows in `JobSections`).
- `title` — shown in bold on the card and modal.
- `summary` — one-line teaser shown on the card face.
- `linkedin_url` — optional; leave blank to hide the "View original LinkedIn post" link for that job.
- `sort_order` — number controlling display order (lower first).
- `active` — `TRUE` to show on the site, `FALSE` to hide (don't delete old rows — just set this to `FALSE`).

**`JobSections`**

| job_id | heading | item | section_order | item_order |
|---|---|---|---|---|
| 002 | What We're Looking For | Strong technical aptitude and willingness to learn. | 1 | 1 |
| 002 | What We're Looking For | Interest in database technologies, especially PostgreSQL. | 1 | 2 |
| 002 | Key Responsibilities | Learn and build expertise in PostgreSQL. | 2 | 1 |
| 002 | Internship Details | 6-month internship program. | 3 | 1 |

- `job_id` — matches a row's `id` in the `Jobs` tab.
- `heading` — free text; any heading works ("Requirements", "Perks", "What We're Looking For" — whatever fits that role).
- `item` — one bullet point.
- `section_order` — controls which heading appears first within a job.
- `item_order` — controls bullet order within a heading.

Any number of rows/headings/bullets per job is fine — nothing is hardcoded to a fixed count.

## 3. Deploying the Apps Script

1. Open the Google Sheet → **Extensions → Apps Script**.
2. Delete any placeholder code and paste in the contents of `google-apps-script/Code.gs`.
3. Click **Deploy → New deployment**.
4. Type: **Web app**.
5. Execute as: **Me**. Who has access: **Anyone**.
6. Click **Deploy**, authorize when prompted, and copy the Web App URL (ends in `/exec`).
7. Whenever you change `Code.gs`, deploy a **new version** (Deploy → Manage deployments → Edit → New version) — editing the script alone doesn't update the live URL.

This URL is a public, read-only, GET-only endpoint. It contains no
credentials and cannot be used to modify the sheet.

## 4. Configuring `VITE_CAREERS_API_URL`

- **Local dev:** copy `.env.example` to `.env.local` and paste in your Web App URL. Vite loads `.env.local` automatically; it's gitignored.
- **Production (GitHub Pages):** set `VITE_CAREERS_API_URL` as a repository/environment variable (or secret — it's not sensitive, but either works) in whatever builds the site (e.g. a GitHub Actions workflow step, `env:` on the build job). It gets baked into the built JS at `npm run build` time, same as any other Vite `VITE_*` var.
- If unset, the site builds and runs fine — it just shows the local fallback postings from `src/data/careers.ts`.

## 5. Day-to-day editing

- **Add a job:** add a row to `Jobs` (unique `id`, `active = TRUE`), then add its bullets as rows in `JobSections` using that same `job_id`.
- **Edit a job:** edit the relevant cells directly. Changes appear next time someone loads the Careers page (no caching, no redeploy).
- **Deactivate a job:** set `active` to `FALSE` in `Jobs`. Don't delete the row — this keeps history and makes it easy to re-activate later.
- **Add responsibilities/requirements/details:** add more rows to `JobSections` with the matching `job_id` and `heading`. To add a whole new section, just use a new `heading` value — no code change needed.
- **Attach a LinkedIn post:** paste the post URL into `linkedin_url` for that job. Leave blank to hide the link.

## 6. Testing locally

```bash
npm install
cp .env.example .env.local   # paste in your Apps Script Web App URL (optional)
npm run dev
```

Visit `/career/`. Try it both with and without `VITE_CAREERS_API_URL` set to confirm the fallback works, and try temporarily setting `active = FALSE` on every `Jobs` row to see the empty state.

## 7. Building for production

```bash
npm run build   # tsc && vite build — does not require the Apps Script to be reachable
npm run preview # optional local check of the production build
```

The build never calls the Apps Script — job data is fetched by the
browser at runtime, after the static files are already deployed.

## Assumptions / limitations

- The Apps Script must be deployed with **Anyone** access for the public site to read it; it only ever returns `active = TRUE` rows, and only GET is implemented (no write endpoint exists).
- A `JobSections` row with a blank `heading` or `item` is skipped; a `Jobs` row with zero valid sections is dropped entirely (rather than showing a broken/empty modal).
- There's no caching layer — every page load fetches fresh from Apps Script. For a low-traffic Careers page this is fine; if that ever becomes a concern, a simple `Cache-Control` or client-side TTL cache could be added to `careers-api.ts` without touching the UI.
