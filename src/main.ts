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
import { initLogoCarousel } from './components/logo-carousel';
import { initRadialDiagram } from './components/radial-diagram';
import { initCounters } from './components/counter';
import { initContactForm } from './components/contact-form';
import { initNavigation } from './scripts/navigation';
import { initAnimations } from './scripts/animations';
import { initScroll } from './scripts/scroll';
import { initHoverPrefetch } from './scripts/prefetch';

function init(): void {
  // 1. Initialize interactive behaviors on the already-present navbar/footer markup
  initDropdowns();
  initNavigation();
  initAnimations();
  initScroll();
  initCounters();

  // 2. Initialize page-specific components if their containers exist
  if (document.getElementById('logoTrack')) {
    initLogoCarousel();
  }
  if (document.getElementById('stage')) {
    initRadialDiagram();
  }
  if (document.getElementById('contact-form')) {
    initContactForm();
  }

  // 3. Cookie consent (always last, non-blocking)
  initCookieBanner();

  // 4. Prefetch on hover-intent so the next page navigation feels instant
  initHoverPrefetch();
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}