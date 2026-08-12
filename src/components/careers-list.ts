/**
 * Careers List Component
 * Renders job posting cards — each an embedded LinkedIn post — from
 * src/data/careers.ts. Runs in the browser (like blog-list.ts), invoked
 * from an inline script on src/pages/career/index.html.
 *
 * LinkedIn's official embed format is:
 *   https://www.linkedin.com/embed/feed/update/urn:li:activity:{ID}
 * where {ID} is the numeric string following "activity-" in a normal
 * post URL (e.g. the one you get from "Copy link to post"). This module
 * extracts that ID automatically so the data file only ever needs a
 * plain, full post URL — the same thing you'd paste anywhere else.
 */

import type { JobPosting } from '../data/careers';

const ACTIVITY_ID_PATTERN = /activity[:-](\d+)/;

/** Extracts the numeric activity ID from a LinkedIn post URL, or null if the URL doesn't match the expected shape. */
export function extractActivityId(postUrl: string): string | null {
  const match = postUrl.match(ACTIVITY_ID_PATTERN);
  return match?.[1] ?? null;
}

function buildCard(posting: JobPosting): string {
  const activityId = extractActivityId(posting.linkedinPostUrl);

  if (!activityId) {
    // Malformed URL in the data file — skip rendering a broken embed
    // rather than showing a blank iframe, but leave a clear trace in
    // the console so it doesn't fail silently for whoever edited it.
    console.warn(`[careers] Could not parse a LinkedIn activity ID from: ${posting.linkedinPostUrl}`);
    return '';
  }

  const embedSrc = `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`;

  return `
    <div class="job-card animate-on-scroll">
      <div class="job-card-glow" aria-hidden="true"></div>
      <div class="job-card-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="job-card-linkedin-icon" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
        </svg>
        <span>Open Position</span>
      </div>
      <div class="job-embed-frame" data-job-frame>
        <iframe
          src="${embedSrc}"
          title="LinkedIn job posting"
          loading="lazy"
          data-job-iframe
        ></iframe>
      </div>
      <a href="${posting.linkedinPostUrl}" target="_blank" rel="noopener noreferrer" class="job-card-apply-link">
        View &amp; apply on LinkedIn
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9M17 7v8"/></svg>
      </a>
    </div>`;
}

export function renderJobPostings(containerId: string, postings: JobPosting[]): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = postings.map(buildCard).join('');
}

/**
 * Wires the fade-in-once-loaded behavior for every rendered iframe. The
 * skeleton shimmer (see careers.css) shows by default; once the iframe's
 * own `load` event fires, `.is-loaded` swaps it for the real content.
 * `load` fires reliably even for cross-origin iframes like this one — the
 * browser only restricts *reading* cross-origin content, not knowing when
 * it finished loading.
 */
export function initJobPostingFrames(): void {
  document.querySelectorAll<HTMLIFrameElement>('[data-job-iframe]').forEach((iframe) => {
    const frame = iframe.closest<HTMLElement>('[data-job-frame]');
    iframe.addEventListener('load', () => {
      frame?.classList.add('is-loaded');
    });
  });
}
