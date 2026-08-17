/**
 * Careers Data
 *
 * This array is the FALLBACK job data used by careers-api.ts whenever
 * VITE_CAREERS_API_URL is unset, unreachable, or returns malformed data
 * (including local `npm run dev` with no env var configured). The live
 * site normally renders postings fetched from Google Sheets at runtime —
 * see careers-api.ts for that data layer. This file is what keeps the
 * Careers page working even if that API is down.
 *
 * Each opening's full job description lives here, point-wise.
 * `linkedinPostUrl` is optional and only used as a secondary "View
 * original post" link in the modal footer; if a post gets taken down,
 * deleted, or was never posted, just omit it (or delete it) and
 * everything keeps working.
 *
 * To add a new opening: add an entry with a `title`, a one-line
 * `summary` (shown on the card face), and one or more `sections` —
 * each a heading plus a bullet list. Keep bullets short (one line each)
 * so cards stay visually consistent regardless of how long a role's
 * full description runs; the summary/card is fixed-height, the full
 * detail opens in a modal.
 *
 * To remove a closed position, delete its entry. Nothing else
 * references this array — the whole page renders from it.
 */

export interface JobSection {
  /** e.g. "Key Responsibilities", "Requirements", "Internship Details" */
  heading: string;
  /** One bullet per line item. Keep each to a single short line. */
  items: string[];
}

export interface JobPosting {
  /**
   * Optional stable identifier (e.g. a Google Sheet row id). Not used by
   * the UI directly — cards/modal are keyed by array index like before —
   * but kept so a remote data source (see careers-api.ts) has something
   * stable to key rows on.
   */
  id?: string;
  /** Displayed in bold on the card — e.g. "Sales Manager", "Intern". */
  title: string;
  /** Short one-line teaser shown on the card face (not the full JD). */
  summary: string;
  /** Full job description, rendered point-wise in the modal. */
  sections: JobSection[];
  /** Optional — secondary "View original post" link in the modal footer. */
  linkedinPostUrl?: string;
}

export const jobPostings: JobPosting[] = [];

// NOTE: inferred from the "lbrinfosolutions" slug in the post URLs above —
// please double-check this is actually your company's LinkedIn Page URL
// (Settings > "Public URL" on the Page) before shipping, since a personal
// profile and a company Page use different URL formats.
export const linkedinCompanyUrl = 'https://www.linkedin.com/company/lbrinfosolutions/';