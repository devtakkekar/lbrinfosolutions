/**
 * Careers Data Layer
 *
 * The Careers UI (careers-list.ts / careers-modal.ts) only ever talks to
 * this module — it doesn't know or care whether job postings came from
 * Google Sheets or the local fallback file. Call `getJobPostings()`.
 *
 * Source selection:
 *   VITE_CAREERS_API_URL configured  → fetch from that Google Apps Script
 *                                       endpoint (see /google-apps-script)
 *   unset, unreachable, or malformed → fall back to the local
 *                                       `jobPostings` array in careers.ts
 *
 * The remote response is untrusted input (it's editable by anyone with
 * Sheet access, and the request itself can fail in any number of ways),
 * so every field is validated/narrowed before it reaches the UI — a
 * malformed row is dropped rather than allowed to crash rendering or
 * leak an unexpected shape into the DOM.
 */

import { jobPostings as fallbackJobPostings, type JobPosting, type JobSection } from './careers';

const API_URL = import.meta.env.VITE_CAREERS_API_URL as string | undefined;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Narrows an unknown array entry into a JobSection, or null if invalid. */
function normalizeSection(raw: unknown): JobSection | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const section = raw as Record<string, unknown>;

  if (!isNonEmptyString(section.heading)) return null;
  if (!Array.isArray(section.items)) return null;

  const items = section.items.filter(isNonEmptyString);
  if (items.length === 0) return null;

  return { heading: section.heading, items };
}

/** Narrows an unknown array entry into a JobPosting, or null if invalid. */
function normalizeJobPosting(raw: unknown): JobPosting | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const job = raw as Record<string, unknown>;

  if (!isNonEmptyString(job.title)) return null;
  if (!isNonEmptyString(job.summary)) return null;
  if (!Array.isArray(job.sections)) return null;

  const sections = job.sections.map(normalizeSection).filter((s): s is JobSection => s !== null);
  if (sections.length === 0) return null;

  const posting: JobPosting = { title: job.title, summary: job.summary, sections };
  if (isNonEmptyString(job.id)) posting.id = job.id;
  if (isNonEmptyString(job.linkedinPostUrl)) posting.linkedinPostUrl = job.linkedinPostUrl;
  if (isNonEmptyString(job.location)) posting.location = job.location;
  if (isNonEmptyString(job.employmentType)) posting.employmentType = job.employmentType;
  if (Array.isArray(job.tags)) {
    const tags = job.tags.filter(isNonEmptyString);
    if (tags.length > 0) posting.tags = tags;
  }

  return posting;
}

/**
 * `malformed: true` means the response wasn't usable at all (not an
 * array, or every entry failed validation) — distinct from a
 * legitimately empty `[]`, which just means "no open roles right now"
 * and should NOT trigger a fallback to stale local data.
 */
function normalizeResponse(data: unknown): { jobs: JobPosting[]; malformed: boolean } {
  if (!Array.isArray(data)) return { jobs: [], malformed: true };
  if (data.length === 0) return { jobs: [], malformed: false };

  const jobs = data.map(normalizeJobPosting).filter((job): job is JobPosting => job !== null);
  return { jobs, malformed: jobs.length === 0 };
}

/**
 * Fetches active job postings for the Careers page.
 * Never throws — a missing config, network error, bad JSON, or
 * malformed payload resolves to the local fallback data instead, so a
 * Careers API outage never breaks the page. A well-formed but empty
 * response (Sheets genuinely has no active postings) resolves to `[]`
 * so the page can show a real "no open roles" empty state instead of
 * silently showing stale fallback jobs.
 */
export async function getJobPostings(): Promise<JobPosting[]> {
  if (!isNonEmptyString(API_URL)) {
    return fallbackJobPostings;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.warn(`Careers API returned ${response.status}; using fallback job data.`);
      return fallbackJobPostings;
    }

    const data: unknown = await response.json();
    const { jobs, malformed } = normalizeResponse(data);

    if (malformed) {
      console.warn('Careers API returned malformed data; using fallback job data.');
      return fallbackJobPostings;
    }

    return jobs;
  } catch (error) {
    console.warn('Careers API request failed; using fallback job data.', error);
    return fallbackJobPostings;
  }
}
