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
 *
 * NOTE: this same treatment was tried for #blog-list (see git history /
 * PR discussion) and reverted. src/data/blog.ts imports real .jpeg/.svg
 * files via `import blog1 from '...jpeg'` so Vite can fingerprint them —
 * but vite.config.ts (and everything reachable from it, including this
 * file, even via dynamic import()) gets bundled by esbuild BEFORE any of
 * Vite's own asset-loader plugins exist, so esbuild has no loader for
 * .jpeg/.svg at that stage and config loading crashes outright. Unlike
 * navbar/footer (whose data — navigation.ts — only holds plain string
 * paths, never an image import), blog.ts can't safely be reached from
 * here. The blog page's CLS fix instead reserves space for #blog-list
 * via CSS (see blog.css + the inline script in blog/index.html) rather
 * than pre-rendering its content.
 */

import type { Plugin } from 'vite';
import { buildNavbarHtml } from './src/components/navbar';
import { buildFooterHtml } from './src/components/footer';
import { BASE_PATH } from './src/config/base-path';

/**
 * Security meta tags injected into every page's <head>.
 *
 * IMPORTANT: <meta> tags can only carry a subset of real HTTP security
 * headers. Browsers ONLY honor `Content-Security-Policy` and
 * `Referrer-Policy` (via <meta name="referrer">) when set this way.
 * Headers such as X-Frame-Options, X-Content-Type-Options,
 * Strict-Transport-Security, and Permissions-Policy are silently ignored
 * by browsers when set via <meta> — they only take effect as actual HTTP
 * response headers, which requires server/edge configuration (see the
 * Cloudflare Transform Rule / .htaccess setup in SECURITY.md).
 *
 * `frame-ancestors`, `report-uri`, and `sandbox` are deliberately omitted
 * from this CSP because the CSP spec disallows them in <meta> — browsers
 * ignore them there too, so they're set instead in the real header
 * (see SECURITY.md) where they actually work.
 */
const SECURITY_META = `
  <!-- Security headers (meta-tag subset — see SECURITY.md for the full set applied at Cloudflare) -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'inline-speculation-rules'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://formspree.io https://script.google.com https://script.googleusercontent.com; form-action 'self' https://formspree.io; base-uri 'self'; object-src 'none'; upgrade-insecure-requests">
  <meta name="referrer" content="strict-origin-when-cross-origin">
`;

export function partialsPlugin(): Plugin {
  return {
    name: 'inject-static-partials',
    transformIndexHtml(html: string): string {
      return html
        .replace('<head>', `<head>${SECURITY_META}`)
        .replace('<div id="navbar"></div>', buildNavbarHtml())
        .replace('<div id="footer"></div>', buildFooterHtml())
        // Every internal <a href="__BASE__..."> in the raw page HTML gets
        // its real base path substituted here — see src/config/base-path.ts
        // for why this is a placeholder instead of a hardcoded string.
        .replaceAll('__BASE__', BASE_PATH);
    },
  };
}