/**
 * Main Entry Point
 * Bootstraps all page-level scripts and interactive behaviors.
 * Imported by every HTML page via <script type="module" src="/src/main.ts">
 *
 * Note: the navbar and footer markup is already present in the HTML by the
 * time this script runs — it is injected at build/dev time by the
 * `inject-static-partials` Vite plugin (see vite-plugin-partials.ts). This
 * avoids a flash of empty markup that occurred when they were rendered
 * client-side after DOMContentLoaded.
 *
 * CSS is intentionally NOT imported here. It is loaded via a native
 * <link rel="stylesheet"> tag in each page's <head> instead, so the browser
 * can load and apply styles in parallel with HTML parsing — before this
 * module script even executes. Importing CSS from a JS module means Vite's
 * dev server injects it via a runtime <style> tag, which only happens after
 * the deferred module script runs, causing a flash of unstyled content.
 */

import { initDropdowns } from './components/dropdown';
import { initCookieBanner } from './components/cookie-banner';
import { initCarousel } from './components/carousel';
import { initLogoCarousel } from './components/logo-carousel';
import { initCounters } from './components/counter';
import { initNavigation } from './scripts/navigation';
import { initAnimations } from './scripts/animations';
import { initScroll } from './scripts/scroll';

function init(): void {
  // 1. Initialize interactive behaviors on the already-present navbar/footer markup
  initDropdowns();
  initNavigation();
  initAnimations();
  initScroll();
  initCounters();

  // 2. Initialize page-specific components if their containers exist
  if (document.getElementById('product-carousel')) {
    initCarousel();
  }
  if (document.getElementById('logoTrack')) {
    initLogoCarousel();
  }

  // 3. Cookie consent (always last, non-blocking)
  initCookieBanner();
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

document.querySelectorAll<HTMLElement>("[data-counter]").forEach((counter) => {
  const target = Number(counter.dataset.target);
  const suffix = counter.dataset.suffix ?? "";
  const duration = 2000;
  const start = performance.now();

  function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(time: number) {
    const progress = Math.min((time - start) / duration, 1);
    const eased = easeOutCubic(progress);
    const value = Math.round(target * eased);

    counter.textContent = `${value}${suffix}`;

    // Motion blur (5px -> 0px)
    const blur = (1 - eased) * 5;
    counter.style.filter = `blur(${blur}px)`;

    // Slight scale (1.08 -> 1)
    const scale = 1 + (1 - eased) * 0.08;
    counter.style.transform = `scale(${scale})`;

    // Fade in (0.75 -> 1)
    counter.style.opacity = `${0.75 + eased * 0.25}`;

    // Smooth GPU rendering
    counter.style.willChange = "transform, filter, opacity";

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