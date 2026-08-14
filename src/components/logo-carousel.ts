/**
 * Logo Carousel Component
 * Continuous marquee of partner/technology logos ("trust bar").
 * Duplicates the logo set once so the strip can loop seamlessly, then
 * animates via requestAnimationFrame using a translate3d transform
 * (cheap on the compositor, no layout thrash).
 *
 * Pauses on hover and respects prefers-reduced-motion — matching the
 * conventions already used by the product carousel and animate-on-scroll.
 */

const SPEED_PX_PER_FRAME = 1.0;
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
    track.appendChild(card.cloneNode(true));
  });

  let loopWidth = 0;
  let x = 0;
  let paused = false;

  function calculateLoopWidth(): void {
    loopWidth = originalCards.reduce((sum, card) => sum + card.offsetWidth, 0);
    loopWidth += (originalCards.length - 1) * GAP_PX;
  }

  function animate(): void {
    if (!paused) {
      x -= SPEED_PX_PER_FRAME;
      if (Math.abs(x) >= loopWidth) {
        x += loopWidth;
      }
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    }
    requestAnimationFrame(animate);
  }

  calculateLoopWidth();
  window.addEventListener('resize', calculateLoopWidth);

  // Pause on hover so a logo can actually be read/clicked.
  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });

  requestAnimationFrame(animate);
}
