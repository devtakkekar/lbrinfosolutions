/**
 * Logo Carousel Component
 * Continuous marquee of partner/technology logos ("trust bar").
 * Duplicates the logo set once so the strip can loop seamlessly, then
 * hands off the actual scrolling to a CSS `animation` (see .logo-track
 * in utilities.css) — this component only measures the duplicated
 * track once (and again on resize) and writes that measurement into
 * two CSS custom properties for the animation to use.
 *
 * This used to drive the scroll itself, every frame, from a
 * requestAnimationFrame loop that wrote `transform` directly — that
 * runs on the main thread, so any main-thread contention elsewhere on
 * the page (other timers, IntersectionObservers, image decoding, GC
 * pauses) could delay or drop frames and show up as a visible stutter
 * or catch-up jump. A CSS `animation` on a `transform` property is
 * handled by the compositor instead, so it keeps scrolling smoothly
 * independent of what the main thread is doing.
 *
 * Pauses on hover (plain CSS `:hover`, no JS) and respects
 * prefers-reduced-motion (globals.css turns the animation off for
 * `.logo-track` directly) — matching the conventions already used by
 * the product carousel and animate-on-scroll.
 */

import { initImageSkeletons, resetImageSkeleton } from './image-skeleton';

const SPEED_PX_PER_SEC = 60; // same visual speed as the old ~1px-per-frame-at-60fps loop
const GAP_PX = 24; // must match the `gap` set on .logo-track in utilities.css

export function initLogoCarousel(): void {
  const trackEl = document.getElementById('logoTrack');
  if (!trackEl) return;
  // Re-bind with an explicit type: TS control-flow narrowing from the guard
  // above does not persist into the nested closures below, but a `const`
  // declared with an explicit type needs no narrowing to begin with.
  const track: HTMLElement = trackEl;

  const originalCards = Array.from(track.children) as HTMLElement[];

  // Duplicate the set once so the strip can scroll seamlessly from the
  // first copy into the second, then reset without a visible jump.
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    // cloneNode copies the "already skeleton-bound" state but not the
    // load/error listeners that clear it, which would leave the clone
    // shimmering forever — reset so the scan below re-binds it fresh.
    clone.querySelectorAll<HTMLImageElement>('img').forEach(resetImageSkeleton);
    track.appendChild(clone);
  });
  initImageSkeletons(track);

  function updateLoopMetrics(): void {
    const loopWidth =
      originalCards.reduce((sum, card) => sum + card.offsetWidth, 0) +
      (originalCards.length - 1) * GAP_PX;

    track.style.setProperty('--logo-loop-distance', `-${loopWidth}px`);
    track.style.setProperty('--logo-marquee-duration', `${loopWidth / SPEED_PX_PER_SEC}s`);
  }

  updateLoopMetrics();
  window.addEventListener('resize', updateLoopMetrics);
}
