/**
 * Stat Counter Component
 * Animates numeric stats (e.g. "15+", "100+", "24/7") counting up from 0
 * when they scroll into view. Falls back to displaying the static text
 * immediately if prefers-reduced-motion is set or the value has no digits
 * to animate (e.g. "24/7").
 */


export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]");

  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix ?? "";
    const duration = prefersReducedMotion ? 1000 : 2000;
    const start = performance.now();

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(time: number): void {
      const progress = Math.min((time - start) / duration, 1);
      const eased = easeOutCubic(progress);
      const value = Math.round(target * eased);

      counter.textContent = `${value}${suffix}`;

      // Decorative effects only when motion is allowed
      if (!prefersReducedMotion) {
        const blur = (1 - eased) * 5;
        counter.style.filter = `blur(${blur}px)`;

        const scale = 1 + (1 - eased) * 0.08;
        counter.style.transform = `scale(${scale})`;

        counter.style.opacity = `${0.75 + eased * 0.25}`;
        counter.style.willChange = "transform, filter, opacity";
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = `${target}${suffix}`;
        counter.style.filter = "none";
        counter.style.transform = "scale(1)";
        counter.style.opacity = "1";
        counter.style.willChange = "auto";
      }
    }

    requestAnimationFrame(animate);
  });
}