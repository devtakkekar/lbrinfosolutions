/**
 * Animations Script
 * IntersectionObserver-based reveal animations for `.animate-on-scroll`
 * and its variants (`.reveal-fade`, `.reveal-zoom`, `.reveal-left`,
 * `.reveal-right`). Also supports automatic staggering for grid/list
 * containers via `data-stagger` so sibling cards cascade in one after
 * another instead of all appearing at once.
 * Respects prefers-reduced-motion.
 */

import { animationConfig } from '../config/animation.config';

const REVEAL_SELECTOR = '.animate-on-scroll, .reveal-fade, .reveal-zoom, .reveal-left, .reveal-right';

export function initAnimations(): void {
  applyAutoStagger();

  // Respect reduced motion preference — reveal everything immediately, no motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          if (animationConfig.animateOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!animationConfig.animateOnce) {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: animationConfig.observerThreshold,
      rootMargin: animationConfig.observerRootMargin,
    }
  );

  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Finds every container marked with `data-stagger` and applies an
 * incrementing `transition-delay` to each of its direct reveal-eligible
 * children, so grids of cards cascade in sequentially rather than firing
 * all at once. Runs once on init, before the IntersectionObserver attaches.
 */
function applyAutoStagger(): void {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((container) => {
    const children = Array.from(container.children).filter((child) =>
      child.matches(REVEAL_SELECTOR)
    ) as HTMLElement[];

    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * animationConfig.staggerDelay}ms`;
    });
  });
}

/**
 * Apply stagger delays to children of a container matched by selector.
 * Manual variant for cases where the container isn't known until after
 * dynamic content renders (e.g. the product carousel).
 */
export function applyStagger(containerSelector: string, childSelector: string): void {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const children = container.querySelectorAll<HTMLElement>(childSelector);
  children.forEach((child, index) => {
    child.style.transitionDelay = `${index * animationConfig.staggerDelay}ms`;
  });
}
