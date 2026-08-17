/**
 * Careers List Component
 * Renders job posting cards from src/data/careers.ts. Each card shows
 * the role title and a short teaser and, on click, opens the full
 * point-wise job description in a modal (see careers-modal.ts) —
 * nothing here links out to LinkedIn anymore, so a deleted/edited
 * LinkedIn post can never break a listing.
 *
 * Cards are deliberately identical in shape (fixed-height teaser,
 * clamped to 2 lines) regardless of how long a role's full JD runs —
 * that length only shows up once the modal opens, so the grid stays
 * visually consistent whether a posting has 3 bullets or 20.
 *
 * Runs in the browser (like blog-list.ts), invoked from an inline
 * script on src/pages/career/index.html.
 */

import type { JobPosting } from '../data/careers';

/**
 * Minimal HTML-escaping for text interpolated into template strings.
 * Same pattern as blog-list.ts. Needed here because, unlike the old
 * hardcoded careers.ts array, job data can now come from the Careers
 * API (careers-api.ts) — Sheet content edited by someone else — so it
 * has to be treated as untrusted before it lands in innerHTML.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildCard(posting: JobPosting, index: number): string {
  const title = escapeHtml(posting.title);
  return `
    <button
      type="button"
      data-job-index="${index}"
      class="job-card animate-on-scroll"
      aria-haspopup="dialog"
      aria-label="View full job description for ${title}"
    >
      <div class="job-card-glow" aria-hidden="true"></div>
      <div class="job-card-content">
        <div class="job-card-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="job-card-briefcase-icon" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <span>Open Position</span>
        </div>
        <h3 class="job-card-title">${title}</h3>
        <p class="job-card-summary">${escapeHtml(posting.summary)}</p>
      </div>
      <span class="go-corner" aria-hidden="true">
        <span class="go-arrow">&rarr;</span>
      </span>
      <span class="job-card-cta">View job description</span>
    </button>`;
}

export function renderJobPostings(containerId: string, postings: JobPosting[]): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = postings.map(buildCard).join('');
}

/** Skeleton placeholder cards shown while the Careers API request is in flight. */
export function renderJobPostingsLoading(containerId: string, count = 3): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="job-card job-card-skeleton" aria-hidden="true">
        <div class="job-card-content">
          <div class="job-card-skeleton-line job-card-skeleton-line--eyebrow"></div>
          <div class="job-card-skeleton-line job-card-skeleton-line--title"></div>
          <div class="job-card-skeleton-line job-card-skeleton-line--summary"></div>
          <div class="job-card-skeleton-line job-card-skeleton-line--summary short"></div>
        </div>
      </div>`
    )
    .join('');
}

/** Shown when the Careers API responds successfully with zero active postings. */
export function renderJobPostingsEmpty(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="job-list-empty">
      <p>There are no open positions right now — check back soon, or follow us on LinkedIn below for future openings.</p>
    </div>`;
}