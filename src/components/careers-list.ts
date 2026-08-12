/**
 * Careers List Component
 * Renders job posting cards from src/data/careers.ts. Each card shows
 * the role title and links straight out to the LinkedIn post — no embed,
 * no iframe, just a fast, simple card. Runs in the browser (like
 * blog-list.ts), invoked from an inline script on
 * src/pages/career/index.html.
 */

import type { JobPosting } from '../data/careers';

function buildCard(posting: JobPosting): string {
  return `
    <a
      href="${posting.linkedinPostUrl}"
      target="_blank"
      rel="noopener noreferrer"
      class="job-card animate-on-scroll"
      aria-label="View the ${posting.title} posting on LinkedIn"
    >
      <div class="job-card-glow" aria-hidden="true"></div>
      <div class="job-card-content">
        <div class="job-card-header">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="job-card-linkedin-icon" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
          </svg>
          <span>Open Position</span>
        </div>
        <h3 class="job-card-title">${posting.title}</h3>
      </div>
      <span class="go-corner" aria-hidden="true">
        <span class="go-arrow">&rarr;</span>
      </span>
    </a>`;
}

export function renderJobPostings(containerId: string, postings: JobPosting[]): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = postings.map(buildCard).join('');
}
