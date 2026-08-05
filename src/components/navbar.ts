/**
 * Navbar Component
 * Builds the sticky navigation markup (desktop dropdown + mobile hamburger menu)
 * as a pure string. Used at build time (Vite plugin, Node) to inject static
 * HTML into every page, avoiding a client-side render flash.
 */

import { mainNavItems } from '../data/navigation';
import { siteConfig } from '../config/site.config';
import type { NavDropdown } from '../types/navigation';

function buildDropdownItems(items: NavDropdown | undefined): string {
  if (!items) return '';

  return items.items
    .map(
      (item) => `
      <a
        href="${item.href}"
        class="nav-dropdown-item group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"
      >
        <div class="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
          <img
            src="${item.logo}"
            alt="${item.label}"
            class="max-h-8 max-w-full object-contain"
            loading="lazy"
          />
        </div>

        <div class="min-w-0 flex-1">
          <h4 class="text-sm font-semibold text-navy transition-colors group-hover:text-blue-accent">
            ${item.label}
          </h4>

          ${
            item.description
              ? `<p class="mt-0.5 text-xs text-gray-500">${item.description}</p>`
              : ''
          }
        </div>

        <svg
          class="h-4 w-4 shrink-0 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
      `
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
            class="nav-link flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-700 hover:text-navy transition-colors"
            aria-expanded="false"
            aria-haspopup="true"
          >
            ${item.label}
            <svg class="nav-chevron w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="nav-dropdown absolute top-full left-0 mt-3 w-[430px] rounded-2xl border border-gray-200 bg-white shadow-2xl opacity-0 invisible -translate-y-2 transition-all duration-200 ease-out z-[100]" role="menu">
            <div class="space-y-2 p-4">
              ${buildDropdownItems(item.dropdown)}
            </div>
            <div class="border-t border-gray-200 p-4">
              <a
                  href="/lbrinfosolutions/src/pages/products/"
                  class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-blue-accent transition hover:bg-blue-50"
              >
                  <span>View All Products</span>

                  <svg
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                  >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                      />
                  </svg>
              </a>
          </div>
          </div>
        </li>`;
      }
      return `
      <li>
        <a href="${item.href}" class="nav-link px-3 py-2 text-base font-medium text-gray-700 hover:text-navy transition-colors">${item.label}</a>
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
            <a href="/lbrinfosolutions/src/pages/products/" class="block px-4 py-2 text-sm font-medium text-blue-accent hover:text-blue-light transition-colors">
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
      <div class="container-main flex items-center justify-between h-18 lg:h-20">
        <!-- Logo -->
        <a href="/" class="nav-logo flex items-center flex-shrink-0" aria-label="${siteConfig.name} - Home">
          <img src="/lbrinfosolutions/lbrinfosolutions.png" alt="${siteConfig.name}" class="h-9 lg:h-11 w-auto" />
        </a>

        <!-- Desktop Navigation -->
        <ul class="nav-desktop hidden lg:flex items-center gap-1" role="menubar">
          ${buildNavItems()}
        </ul>

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
      </div>
    </nav>
    <!-- Spacer to prevent content from hiding behind fixed nav -->
    <div class="h-18 lg:h-20"></div>
  `;
}