/**
 * Careers Modal Component
 * A single shared modal (built once, reused) that shows the full,
 * point-wise job description for whichever job card was clicked.
 * Same interaction pattern as the blog page's lightbox in
 * blog-gallery.ts (backdrop, Escape/backdrop-click to close, focus
 * returned to the trigger on close) — reused here for a consistent
 * feel across the site rather than inventing a new one.
 *
 * Call initCareersModal(postings) once, after careers-list.ts has
 * inserted the card markup into the DOM.
 */

import type { JobPosting } from '../data/careers';

let modalEl: HTMLDivElement | null = null;
let titleEl: HTMLElement | null = null;
let bodyEl: HTMLElement | null = null;
let linkedinLinkEl: HTMLAnchorElement | null = null;
let applyLinkEl: HTMLAnchorElement | null = null;
let lastFocusedElement: HTMLElement | null = null;

function renderSections(posting: JobPosting): string {
  return posting.sections
    .map(
      (section) => `
        <div class="job-modal-section">
          <h4 class="job-modal-section-heading">${section.heading}</h4>
          <ul class="job-modal-list">
            ${section.items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>`
    )
    .join('');
}

/** Builds the single shared modal and appends it to <body> once. */
function ensureModal(): void {
  if (modalEl) return;

  const el = document.createElement('div');
  el.className = 'job-modal';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-labelledby', 'job-modal-title');
  el.innerHTML = `
    <div class="job-modal-backdrop" data-job-modal-close></div>
    <div class="job-modal-panel">
      <button type="button" class="job-modal-close" data-job-modal-close aria-label="Close job description">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="job-modal-header">
        <span class="job-modal-eyebrow">Open Position</span>
        <h3 id="job-modal-title" class="job-modal-title"></h3>
      </div>
      <div class="job-modal-body"></div>
      <div class="job-modal-footer">
        <a class="job-modal-linkedin-link" data-job-modal-linkedin-link target="_blank" rel="noopener noreferrer">
          View original LinkedIn post
        </a>
        <a class="btn-accent job-modal-apply" data-job-modal-apply-link href="mailto:info@lbrinfosolutions.com">
          Apply for this role
        </a>
      </div>
    </div>`;
  document.body.appendChild(el);

  modalEl = el;
  titleEl = el.querySelector('#job-modal-title');
  bodyEl = el.querySelector('.job-modal-body');
  linkedinLinkEl = el.querySelector('[data-job-modal-linkedin-link]');
  applyLinkEl = el.querySelector('[data-job-modal-apply-link]');

  el.querySelectorAll<HTMLElement>('[data-job-modal-close]').forEach((closeTarget) =>
    closeTarget.addEventListener('click', closeModal)
  );
  document.addEventListener('keydown', handleModalKeydown);
}

function openModal(posting: JobPosting, trigger: HTMLElement): void {
  ensureModal();
  if (!modalEl || !titleEl || !bodyEl) return;

  titleEl.textContent = posting.title;
  bodyEl.innerHTML = renderSections(posting);

  if (linkedinLinkEl) {
    if (posting.linkedinPostUrl) {
      linkedinLinkEl.href = posting.linkedinPostUrl;
      linkedinLinkEl.classList.remove('is-hidden');
    } else {
      linkedinLinkEl.classList.add('is-hidden');
    }
  }

  if (applyLinkEl) {
    applyLinkEl.href = `mailto:info@lbrinfosolutions.com?subject=${encodeURIComponent(
      `Application: ${posting.title}`
    )}`;
  }

  lastFocusedElement = trigger;
  modalEl.classList.add('is-open');
  document.body.classList.add('job-modal-open'); // scroll lock, see careers.css
  modalEl.querySelector<HTMLButtonElement>('.job-modal-close')?.focus();
}

function closeModal(): void {
  if (!modalEl?.classList.contains('is-open')) return;
  modalEl.classList.remove('is-open');
  document.body.classList.remove('job-modal-open');
  lastFocusedElement?.focus();
}

function handleModalKeydown(event: KeyboardEvent): void {
  if (!modalEl?.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeModal();
}

export function initCareersModal(containerId: string, postings: JobPosting[]): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll<HTMLButtonElement>('[data-job-index]').forEach((card) => {
    card.addEventListener('click', () => {
      const index = Number(card.dataset.jobIndex);
      const posting = postings[index];
      if (posting) openModal(posting, card);
    });
  });
}