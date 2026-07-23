/**
 * Navbar Component
 * Builds the sticky navigation markup (desktop dropdown + mobile hamburger menu)
 * as a pure string. Used at build time (Vite plugin, Node) to inject static
 * HTML into every page, avoiding a client-side render flash.
 */

import { mainNavItems } from '../data/navigation';
import { siteConfig } from '../config/site.config';

function buildDropdownItems(items: typeof mainNavItems[1]['dropdown']): string {
  if (!items) return '';
  return items.items
    .map(
      (item) => `
      <a href="${item.href}" class="nav-dropdown-item group flex items-start gap-3 px-4 py-3 rounded hover:bg-gray-50 transition-colors duration-150">
        <div class="flex-1">
          <span class="block text-sm font-medium text-navy group-hover:text-blue-accent transition-colors">${item.label}</span>
          ${item.description ? `<span class="block text-xs text-gray-400 mt-0.5">${item.description}</span>` : ''}
        </div>
        ${item.badge ? `<span class="badge text-[10px] mt-0.5">${item.badge}</span>` : ''}
      </a>`
    )
    .join('');
}

function buildNavItems(): string {
  return mainNavItems
    .map((item) => {
      if (item.dropdown) {
        return `
        <li class="nav-item-dropdown relative">
          <button
            class="nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-navy transition-colors"
            aria-expanded="false"
            aria-haspopup="true"
          >
            ${item.label}
            <svg class="nav-chevron w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="nav-dropdown absolute top-full left-0 mt-2 w-72 bg-white rounded-md shadow-dropdown border border-gray-100 opacity-0 invisible translate-y-1 transition-all duration-200 z-[100]" role="menu">
            <div class="py-2">
              ${buildDropdownItems(item.dropdown)}
            </div>
            <div class="border-t border-gray-100 px-4 py-3">
              <a href="/src/pages/products/" class="text-xs font-medium text-blue-accent hover:text-blue-light transition-colors">
                View All Products &rarr;
              </a>
            </div>
          </div>
        </li>`;
      }
      return `
      <li>
        <a href="${item.href}" class="nav-link px-3 py-2 text-sm font-medium text-gray-700 hover:text-navy transition-colors">${item.label}</a>
      </li>`;
    })
    .join('');
}

function buildMobileNavItems(): string {
  return mainNavItems
    .map((item) => {
      if (item.dropdown) {
        return `
        <li class="mobile-nav-dropdown">
          <button
            class="mobile-dropdown-trigger w-full flex items-center justify-between px-4 py-3 text-base font-medium text-navy"
            aria-expanded="false"
          >
            ${item.label}
            <svg class="mobile-chevron w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="mobile-dropdown-content hidden pl-4 pb-2">
            ${item.dropdown.items
              .map(
                (subItem) => `
              <a href="${subItem.href}" class="block px-4 py-2 text-sm text-gray-600 hover:text-navy hover:bg-gray-50 rounded transition-colors">
                ${subItem.label}
              </a>`
              )
              .join('')}
            <a href="/src/pages/products/" class="block px-4 py-2 text-sm font-medium text-blue-accent hover:text-blue-light transition-colors">
              View All Products &rarr;
            </a>
          </div>
        </li>`;
      }
      return `
      <li>
        <a href="${item.href}" class="block px-4 py-3 text-base font-medium text-navy hover:text-blue-accent transition-colors">${item.label}</a>
      </li>`;
    })
    .join('');
}

/**
 * Builds the complete navbar markup (including the fixed-position spacer div).
 * Pure function — no DOM access — safe to call from Node (Vite build plugin)
 * or from the browser.
 */
export function buildNavbarHtml(): string {
  return `
    <nav class="navbar fixed top-0 left-0 right-0 z-[200] bg-white border-b border-gray-200 shadow-nav" aria-label="Main navigation">
      <div class="container-main flex items-center justify-between h-16 lg:h-18">
        <!-- Logo -->
        <a href="/" class="nav-logo flex items-center gap-2 text-navy font-semibold text-lg tracking-tight" aria-label="${siteConfig.name} - Home">
          <svg class="w-8 h-8 text-blue-accent" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="4" fill="currentColor" opacity="0.1"/>
            <path d="M8 10h4v12H8V10zm6 4h4v8h-4v-8zm6-2h4v10h-4V12z" fill="currentColor"/>
          </svg>
          <span>${siteConfig.name}</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="nav-desktop hidden lg:flex items-center gap-1" role="menubar">
          ${buildNavItems()}
        </ul>

        <!-- Desktop CTA -->
        <a href="/src/pages/contact/" class="nav-cta hidden lg:inline-flex btn-primary text-xs px-4 py-2">
          Get in Touch
        </a>

        <!-- Mobile Menu Toggle -->
        <button
          class="mobile-menu-toggle lg:hidden flex items-center justify-center w-10 h-10 text-navy rounded hover:bg-gray-50 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
        >
          <svg class="hamburger-icon w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg class="close-icon w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu lg:hidden bg-white border-t border-gray-100 overflow-y-auto" role="menu">
        <ul class="py-2">
          ${buildMobileNavItems()}
        </ul>
        <div class="px-4 py-4 border-t border-gray-100">
          <a href="/src/pages/contact/" class="btn-primary w-full text-center text-sm">Get in Touch</a>
        </div>
      </div>
    </nav>
    <!-- Spacer to prevent content from hiding behind fixed nav -->
    <div class="h-16 lg:h-18"></div>
  `;
}
