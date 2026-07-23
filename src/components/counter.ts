/**
 * Stat Counter Component
 * Animates numeric stats (e.g. "15+", "100+", "24/7") counting up from 0
 * when they scroll into view. Falls back to displaying the static text
 * immediately if prefers-reduced-motion is set or the value has no digits
 * to animate (e.g. "24/7").
 */

const COUNTER_SELECTOR = '[data-counter]';
const COUNTER_DURATION = 1400; // ms

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounter(el: HTMLElement): void {
  const raw = el.textContent?.trim() ?? '';
  const match = raw.match(/^(\D*)(\d+)(.*)$/);

  // No digits found (e.g. "24/7") — nothing to animate, leave as-is.
  if (!match) return;

  const [, prefix = '', digits, suffix = ''] = match;
  if (!digits) return;
  const target = parseInt(digits, 10);
  const start = performance.now();

  function tick(now: number): void {
    const elapsed = now - start;
    const progress = Math.min(elapsed / COUNTER_DURATION, 1);
    const current = Math.round(easeOutExpo(progress) * target);
    el.textContent = `${prefix}${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = raw; // snap to exact original string at the end
    }
  }

  requestAnimationFrame(tick);
}

export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>(COUNTER_SELECTOR);
  if (counters.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Leave static values as-is
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
}
