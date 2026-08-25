/**
 * Image Skeleton Loader
 * Applies a shimmering skeleton placeholder to any <img> that hasn't
 * finished loading yet, then fades it out once the image has loaded
 * (or failed — a broken image shouldn't shimmer forever).
 *
 * Works directly on the <img> element itself (background + opacity)
 * rather than wrapping it in extra markup. Every image on this site
 * already sits inside a container with fixed sizing, an aspect ratio,
 * or object-fit rules (.logo-chip, .logo-card, .blog-image-frame,
 * hero art, etc.), so no wrapper div is needed and nothing shifts
 * layout when the skeleton is added or removed.
 *
 * Call initImageSkeletons() once at boot for images already in the
 * initial HTML. Call it again, scoped to a container, any time a
 * component injects new <img> elements afterward — blog-list.ts and
 * logo-carousel.ts both do this (see their call sites).
 */

const BOUND_ATTR = 'data-skeleton-bound';

/** Images on a dark hero/navy section (or explicitly flagged) get the light-on-dark shimmer variant. */
function isOnDarkBackground(img: HTMLImageElement): boolean {
  return Boolean(
    img.closest(
      '.logo-chip--dark, [data-blog-frame], .bg-navy, section.bg-navy, footer, [data-skeleton-dark]'
    )
  );
}

function settle(img: HTMLImageElement): void {
  img.classList.remove('img-skeleton', 'img-skeleton--dark');
  img.classList.add('is-loaded');
}

/**
 * Exported (not just used internally by initImageSkeletons) so
 * blog-gallery.ts can bind a single slide the moment it actually gets a
 * `src` — see the early-return below for why that matters.
 */
export function bindImage(img: HTMLImageElement): void {
  if (img.hasAttribute(BOUND_ATTR)) return;

  // No src yet — e.g. a blog gallery slide waiting on blog-gallery.ts's
  // hydrateSlide() to fill in data-blog-src (see blog-list.ts). It isn't
  // loading, so it shouldn't shimmer: `.img-skeleton` sets `opacity: 1`,
  // which — at equal specificity — beats `.blog-image-slide { opacity: 0 }`
  // on cascade order, permanently un-hiding an inactive slide that will
  // never fire load/error to clear the class. Leave it unbound (no
  // BOUND_ATTR) so a later call — once it has a real src — is not a no-op.
  if (!img.getAttribute('src')) return;

  img.setAttribute(BOUND_ATTR, 'true');

  // Already loaded — e.g. served from cache, or a same-page navigation.
  // Nothing to skeletonize.
  if (img.complete && img.naturalWidth > 0) return;

  img.classList.add('img-skeleton-fade', 'img-skeleton');
  if (isOnDarkBackground(img)) {
    img.classList.add('img-skeleton--dark');
  }

  img.addEventListener('load', () => settle(img), { once: true });
  img.addEventListener('error', () => settle(img), { once: true });
}

/** Scans `root` for <img> elements and wires each one up with a skeleton state. */
export function initImageSkeletons(root: ParentNode = document): void {
  root.querySelectorAll<HTMLImageElement>('img').forEach(bindImage);
}

/**
 * Resets a single <img> so it can be re-processed by initImageSkeletons —
 * needed after cloneNode(true), since the clone copies the "already
 * bound" attribute/classes but not the load/error listeners that would
 * ever clear them. Used by logo-carousel.ts when it duplicates logos.
 */
export function resetImageSkeleton(img: HTMLImageElement): void {
  img.removeAttribute(BOUND_ATTR);
  img.classList.remove('img-skeleton', 'img-skeleton--dark', 'img-skeleton-fade', 'is-loaded');
}