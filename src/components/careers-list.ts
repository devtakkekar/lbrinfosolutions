/**
 * Careers List Component
 * Renders job posting cards from src/data/careers.ts (or the live
 * Careers API — see careers-api.ts). Each card shows the role title,
 * location, category tags, and employment type at a glance; clicking
 * anywhere on the card expands the full point-wise job description
 * directly beneath it, in place — no modal/lightbox.
 *
 * Data layer (JobPosting shape, careers-api.ts validation, the
 * fallback array in careers.ts) is unchanged; this file only controls
 * how a posting is rendered and how the full description is revealed.
 *
 * Runs in the browser (like blog-list.ts), invoked from an inline
 * script on src/pages/career/index.html.
 */

import type { JobPosting, JobSection } from '../data/careers';
import { BASE_PATH } from '../config/base-path';

/**
 * Minimal HTML-escaping for text interpolated into template strings.
 * Needed here because, unlike the old hardcoded careers.ts array, job
 * data can now come from the Careers API (careers-api.ts) — Sheet
 * content edited by someone else — so it has to be treated as
 * untrusted before it lands in innerHTML.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildTags(posting: JobPosting): string {
  const pills = (posting.tags ?? []).map(
    (tag) => `<span class="job-card-tag">${escapeHtml(tag)}</span>`
  );
  if (pills.length === 0 && !posting.employmentType) return '';

  return `
    <div class="job-card-tags-row">
      <div class="job-card-tags">${pills.join('')}</div>
      ${
        posting.employmentType
          ? `<span class="job-card-type">${escapeHtml(posting.employmentType)}</span>`
          : ''
      }
    </div>`;
}

function buildSections(sections: JobSection[]): string {
  return sections
    .map(
      (section) => `
        <div class="job-card-expand-section">
          <h4 class="job-card-expand-heading">${escapeHtml(section.heading)}</h4>
          <ul class="job-card-expand-list">
            ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>`
    )
    .join('');
}

function buildCard(posting: JobPosting, index: number): string {
  const title = escapeHtml(posting.title);

  return `
    <div class="job-card animate-on-scroll" data-job-index="${index}">
      <button
        type="button"
        class="job-card-face"
        aria-expanded="false"
        aria-controls="job-card-expand-${index}"
        aria-label="Show full job description for ${title}"
      >
        <div class="job-card-main">
          <div class="job-card-heading-row">
            <h3 class="job-card-title">${title}</h3>
            <span class="job-card-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H8M17 7v9"/></svg>
            </span>
          </div>
          ${posting.location ? `<p class="job-card-location">${escapeHtml(posting.location)}</p>` : ''}
        </div>
        ${buildTags(posting)}
      </button>
      <div class="job-card-expand" id="job-card-expand-${index}" role="region">
        <div class="job-card-expand-inner">
          <div class="job-card-expand-body">
            ${buildSections(posting.sections)}
            ${
              posting.linkedinPostUrl
                ? `<a class="job-card-expand-linkedin" href="${posting.linkedinPostUrl}" target="_blank" rel="noopener noreferrer">View original LinkedIn post</a>`
                : ''
            }
            <a class="btn-accent job-card-expand-apply" href="${BASE_PATH}src/pages/contact/index.html">Contact Us</a>
          </div>
        </div>
      </div>
    </div>`;
}

export function renderJobPostings(containerId: string, postings: JobPosting[]): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = postings.map(buildCard).join('');
}

/**
 * Animates one card's expand panel open or closed by measuring its
 * real content height and transitioning to/from that pixel value
 * (the CSS just has `transition: height`, see careers.css). This is
 * more reliable across browsers than letting a CSS grid-rows trick
 * animate `fr` units, which some browsers don't ease smoothly.
 *
 * Expanding: set height to the measured content height, then swap to
 * `height: auto` once the transition finishes so the panel still
 * reflows correctly if content/viewport changes while it's open.
 * Collapsing: if height is currently `auto`, pin it to the current
 * pixel height first (so there's something to transition *from*),
 * force a reflow, then set it to 0 on the next frame.
 */
function setExpanded(card: HTMLElement, panel: HTMLElement, expand: boolean): void {
  if (expand) {
    card.classList.add('is-expanded');
    panel.style.height = `${panel.scrollHeight}px`;
    panel.addEventListener(
      'transitionend',
      function onEnd(event: TransitionEvent) {
        if (event.propertyName !== 'height') return;
        panel.removeEventListener('transitionend', onEnd);
        if (card.classList.contains('is-expanded')) panel.style.height = 'auto';
      }
    );
  } else {
    panel.style.height = `${panel.scrollHeight}px`;
    // Force layout so the browser registers the pixel height above
    // before we change it again — otherwise the two writes collapse
    // into one and there's nothing to transition from.
    void panel.offsetHeight;
    card.classList.remove('is-expanded');
    requestAnimationFrame(() => {
      panel.style.height = '0px';
    });
  }
}

/**
 * Wires up expand/collapse on each rendered card. Call once, right
 * after renderJobPostings() has inserted the card markup. Clicking a
 * link inside the expanded panel (Contact Us / LinkedIn) is not
 * intercepted — only the card face itself toggles the panel.
 */
export function initCareersExpand(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll<HTMLElement>('.job-card').forEach((card) => {
    const face = card.querySelector<HTMLButtonElement>('.job-card-face');
    const panel = card.querySelector<HTMLElement>('.job-card-expand');
    if (!face || !panel) return;

    face.addEventListener('click', () => {
      const willExpand = !card.classList.contains('is-expanded');
      setExpanded(card, panel, willExpand);
      face.setAttribute('aria-expanded', String(willExpand));
    });
  });
}

/** Skeleton placeholder cards shown while the Careers API request is in flight. */
export function renderJobPostingsLoading(containerId: string, count = 3): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = Array.from({ length: count })
    .map(
      () => `
      <div class="job-card job-card-skeleton" aria-hidden="true">
        <div class="job-card-face">
          <div class="job-card-main">
            <div class="job-card-skeleton-line job-card-skeleton-line--title"></div>
            <div class="job-card-skeleton-line job-card-skeleton-line--location"></div>
          </div>
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
