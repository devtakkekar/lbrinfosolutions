/**
 * Footer Component
 * Builds the site-wide footer markup as a pure string (product links, company
 * links, legal, contact info). Used at build time (Vite plugin, Node) to
 * inject static HTML into every page, avoiding a client-side render flash.
 */

import { footerColumns } from '../data/navigation';
import { siteConfig } from '../config/site.config';

function buildFooterColumns(): string {
  return footerColumns
    .map(
      (column) => `
      <div>
        <h4 class="text-sm font-semibold text-navy mb-4 tracking-wide uppercase">${column.title}</h4>
        <ul class="space-y-2.5">
          ${column.links
            .map(
              (link) => `
            <li>
              <a href="${link.href}" class="text-sm text-gray-500 hover:text-blue-accent transition-colors duration-150"${link.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                ${link.label}
              </a>
            </li>`
            )
            .join('')}
        </ul>
      </div>`
    )
    .join('');
}

/**
 * Builds the complete footer markup.
 * Pure function — no DOM access — safe to call from Node (Vite build plugin)
 * or from the browser.
 */
export function buildFooterHtml(): string {
  return `
    <footer class="bg-navy text-white" aria-label="Site footer">
      <div class="container-main section-padding">
        <!-- Top section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <!-- Brand column -->
          <div class="lg:col-span-2">
            <a href="/" class="inline-flex items-center gap-2 text-white font-semibold text-lg mb-4" aria-label="${siteConfig.name} - Home">
              <svg class="w-8 h-8 text-blue-accent" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" fill="currentColor" opacity="0.2"/>
                <path d="M8 10h4v12H8V10zm6 4h4v8h-4v-8zm6-2h4v10h-4V12z" fill="currentColor"/>
              </svg>
              <span>${siteConfig.name}</span>
            </a>
            <p class="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Delivering disruptive enterprise technology solutions in database infrastructure, storage, AI, and data orchestration for modern workloads.
            </p>
            <!-- Contact info -->
            <div class="space-y-2 text-sm text-gray-400">
              <p class="flex items-start gap-2">
                <svg class="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>${siteConfig.contact.address}</span>
              </p>
              <p class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:${siteConfig.contact.email}" class="hover:text-blue-accent transition-colors">${siteConfig.contact.email}</a>
              </p>
            </div>
          </div>

          <!-- Link columns -->
          ${buildFooterColumns()}
        </div>

        <!-- Divider -->
        <div class="border-t border-white/10 mt-12 pt-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-xs text-gray-500">${siteConfig.footer.copyright}</p>
            <!-- Social links -->
            <div class="flex items-center gap-4">
              <a href="${siteConfig.social.linkedin}" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-blue-accent transition-colors" aria-label="LinkedIn">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="${siteConfig.social.twitter}" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-blue-accent transition-colors" aria-label="Twitter / X">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}
