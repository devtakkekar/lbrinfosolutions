/**
 * Seamless Infinite Marquee
 * Measures content width and creates a perfect loop with no gap or jump.
 */

export function initMarquee(): void {
  const root = document.getElementById('marquee');
  if (!root) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('marquee-static');
    return;
  }

  const track = root.querySelector('.marquee-track') as HTMLElement;
  const content = root.querySelector('.marquee-content') as HTMLElement;
  if (!track || !content) return;

  // Clear any previous clones
  track.querySelectorAll('.marquee-clone').forEach((el) => el.remove());

  // Measure one set
  const contentWidth = content.getBoundingClientRect().width;

  // How many copies do we need so the track is always wider than the viewport?
  const copiesNeeded = Math.ceil(window.innerWidth / contentWidth) + 2;

  // Clone the original content enough times
  for (let i = 0; i < copiesNeeded; i++) {
    const clone = content.cloneNode(true) as HTMLElement;
    clone.classList.add('marquee-clone');
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  }

  // Total width of one "set" (original + clones that make one full cycle)
  // We animate by the width of the *original* content only
  const speed = 45; // px per second – adjust to taste (higher = faster)
  let position = 0;
  let rafId: number;
  let paused = false;

  const step = () => {
    if (!paused) {
      position -= speed / 60; // ~60fps

      // Seamless reset
      if (Math.abs(position) >= contentWidth) {
        position += contentWidth;
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;
    }
    rafId = requestAnimationFrame(step);
  };

  rafId = requestAnimationFrame(step);

  // Pause on hover
  root.addEventListener('mouseenter', () => { paused = true; });
  root.addEventListener('mouseleave', () => { paused = false; });

  // Recalculate on resize (debounced)
  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(rafId);
      // Re-init cleanly
      track.querySelectorAll('.marquee-clone').forEach((el) => el.remove());
      track.style.transform = '';
      initMarquee();
    }, 200);
  });
}