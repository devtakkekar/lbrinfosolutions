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

function buildCard(posting: JobPosting, index: number): string {
  return `
    <button
      type="button"
      data-job-index="${index}"
      class="job-card animate-on-scroll"
      aria-haspopup="dialog"
      aria-label="View full job description for ${posting.title}"
    >
      <div class="job-card-glow" aria-hidden="true"></div>
      <div class="job-card-content">
        <div class="job-card-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="job-card-briefcase-icon" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <span>Open Position</span>
        </div>
        <h3 class="job-card-title">${posting.title}</h3>
        <p class="job-card-summary">${posting.summary}</p>
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