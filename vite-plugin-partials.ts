/**
 * Vite Plugin: Inject Static Partials
 *
 * Replaces the empty <div id="navbar"></div> and <div id="footer"></div>
 * placeholders in every HTML page with fully-rendered static markup at
 * build/dev time (transformIndexHtml runs for both `vite` and `vite build`).
 *
 * Why this exists: previously navbar/footer were rendered client-side by
 * main.ts after DOMContentLoaded. Because this is a multi-page app (every
 * link triggers a full page load, not client-side routing), that meant the
 * empty placeholders were visible for a split second on every navigation —
 * a visible flash of unstyled/incomplete markup. Injecting the HTML at
 * build time means the browser receives the complete page on first paint.
 */

import type { Plugin } from 'vite';
import { buildNavbarHtml } from './src/components/navbar';
import { buildFooterHtml } from './src/components/footer';

export function partialsPlugin(): Plugin {
  return {
    name: 'inject-static-partials',
    transformIndexHtml(html: string): string {
      return html
        .replace('<div id="navbar"></div>', buildNavbarHtml())
        .replace('<div id="footer"></div>', buildFooterHtml());
    },
  };
}
