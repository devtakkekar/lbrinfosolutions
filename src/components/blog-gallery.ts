/**
 * Blog Gallery Component
 * Handles two things for every `[data-blog-frame]` rendered by blog-list.ts:
 *
 *  1. Auto-rotation — if a post has more than one image, its frame
 *     crossfades to the next image every 3s, pausing on hover. Skipped
 *     entirely under prefers-reduced-motion.
 *
 *  2. Lightbox — clicking the zoom button (revealed on hover) opens a
 *     single shared full-screen lightbox with that post's images loaded
 *     in, starting from whichever image was showing. Inside the
 *     lightbox, navigation is manual only (prev/next arrows, arrow keys)
 *     — auto-rotation never runs there. Auto-rotation on the underlying
 *     card also pauses for as long as the lightbox is open.
 *
 * Call initBlogGalleries() once, after blog-list.ts has inserted the
 * card markup into the DOM.
 */

const ROTATE_INTERVAL_MS = 3000;

interface GalleryFrame {
  element: HTMLElement;
  slides: HTMLElement[];
  index: number;
  timer: number | null;
}

let lightboxEl: HTMLDivElement | null = null;
let lightboxImgEl: HTMLImageElement | null = null;
let lightboxCounterEl: HTMLElement | null = null;
let lightboxPrevBtn: HTMLButtonElement | null = null;
let lightboxNextBtn: HTMLButtonElement | null = null;
let activeFrame: GalleryFrame | null = null;
let lightboxIndex = 0;
let lastFocusedElement: HTMLElement | null = null;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showSlide(frame: GalleryFrame, index: number): void {
  frame.slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
  frame.index = index;
}

function startRotation(frame: GalleryFrame): void {
  if (frame.slides.length <= 1 || prefersReducedMotion()) return;
  stopRotation(frame);
  frame.timer = window.setInterval(() => {
    showSlide(frame, (frame.index + 1) % frame.slides.length);
  }, ROTATE_INTERVAL_MS);
}

function stopRotation(frame: GalleryFrame): void {
  if (frame.timer !== null) {
    window.clearInterval(frame.timer);
    frame.timer = null;
  }
}

/** Builds the single shared lightbox and appends it to <body> once. */
function ensureLightbox(): void {
  if (lightboxEl) return;

  const el = document.createElement('div');
  el.className = 'blog-lightbox';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Image viewer');
  el.innerHTML = `
    <div class="blog-lightbox-backdrop" data-blog-lightbox-close></div>
    <button type="button" class="blog-lightbox-close" data-blog-lightbox-close aria-label="Close image viewer">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <button type="button" class="blog-lightbox-arrow blog-lightbox-prev" data-blog-lightbox-prev aria-label="Previous image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
    </button>
    <figure class="blog-lightbox-figure">
      <img class="blog-lightbox-img" alt="" />
      <figcaption class="blog-lightbox-counter"></figcaption>
    </figure>
    <button type="button" class="blog-lightbox-arrow blog-lightbox-next" data-blog-lightbox-next aria-label="Next image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </button>`;
  document.body.appendChild(el);

  lightboxEl = el;
  lightboxImgEl = el.querySelector('.blog-lightbox-img');
  lightboxCounterEl = el.querySelector('.blog-lightbox-counter');
  lightboxPrevBtn = el.querySelector('[data-blog-lightbox-prev]');
  lightboxNextBtn = el.querySelector('[data-blog-lightbox-next]');

  el.querySelectorAll<HTMLElement>('[data-blog-lightbox-close]').forEach((closeTarget) =>
    closeTarget.addEventListener('click', closeLightbox)
  );
  lightboxPrevBtn?.addEventListener('click', () => stepLightbox(-1));
  lightboxNextBtn?.addEventListener('click', () => stepLightbox(1));
  document.addEventListener('keydown', handleLightboxKeydown);
}

function renderLightboxImage(): void {
  if (!activeFrame || !lightboxImgEl || !lightboxCounterEl) return;
  const src = activeFrame.slides[lightboxIndex]?.getAttribute('src') ?? '';
  const title = activeFrame.element.dataset.blogTitle ?? '';
  lightboxImgEl.src = src;
  lightboxImgEl.alt = title;

  const multiple = activeFrame.slides.length > 1;
  lightboxCounterEl.textContent = multiple ? `${lightboxIndex + 1} / ${activeFrame.slides.length}` : title;
  lightboxPrevBtn?.classList.toggle('is-hidden', !multiple);
  lightboxNextBtn?.classList.toggle('is-hidden', !multiple);
}

function stepLightbox(direction: 1 | -1): void {
  if (!activeFrame) return;
  const count = activeFrame.slides.length;
  lightboxIndex = (lightboxIndex + direction + count) % count;
  renderLightboxImage();
}

function openLightbox(frame: GalleryFrame): void {
  ensureLightbox();
  if (!lightboxEl) return;

  stopRotation(frame); // pause auto-rotation on the card while viewing it large
  activeFrame = frame;
  lightboxIndex = frame.index;
  renderLightboxImage();

  lastFocusedElement = document.activeElement as HTMLElement | null;
  lightboxEl.classList.add('is-open');
  document.body.classList.add('blog-lightbox-open'); // scroll lock, see blog.css
  lightboxEl.querySelector<HTMLButtonElement>('.blog-lightbox-close')?.focus();
}

function closeLightbox(): void {
  if (!lightboxEl || !activeFrame) return;
  lightboxEl.classList.remove('is-open');
  document.body.classList.remove('blog-lightbox-open');

  // Sync the card behind the lightbox to whichever image was last viewed,
  // then resume auto-rotation from there.
  showSlide(activeFrame, lightboxIndex);
  startRotation(activeFrame);

  lastFocusedElement?.focus();
  activeFrame = null;
}

function handleLightboxKeydown(event: KeyboardEvent): void {
  if (!lightboxEl?.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') stepLightbox(-1);
  if (event.key === 'ArrowRight') stepLightbox(1);
}

export function initBlogGalleries(): void {
  document.querySelectorAll<HTMLElement>('[data-blog-frame]').forEach((element) => {
    const slides = Array.from(element.querySelectorAll<HTMLElement>('[data-blog-slide]'));
    if (slides.length === 0) return;

    const frame: GalleryFrame = { element, slides, index: 0, timer: null };

    startRotation(frame);
    element.addEventListener('mouseenter', () => stopRotation(frame));
    element.addEventListener('mouseleave', () => startRotation(frame));

    element.querySelector<HTMLButtonElement>('[data-blog-zoom-trigger]')?.addEventListener('click', () => {
      openLightbox(frame);
    });
  });
}
