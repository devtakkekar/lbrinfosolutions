/**
 * Navigation Script
 * Handles active link highlighting and smooth scroll to anchors.
 */

import { BASE_PATH } from '../config/base-path';

export function initNavigation(): void {
  initStickyNav();
  initSmoothScrollLinks();
  highlightActiveLink();
}

function initStickyNav(): void {
  // Navbar is always solid white with border — no scroll-based transitions needed
}

function initSmoothScrollLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e: Event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector('.navbar')?.getBoundingClientRect().height ?? 72;

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navHeight - 20,
        behavior: 'smooth',
      });
    });
  });
}

function highlightActiveLink(): void {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link, .nav-dropdown-item');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    // The Home link's href is just the site's base path (e.g. "/" or
    // "/lbrinfosolutions/"), which is itself a *prefix* of every other
    // page's path. A plain startsWith() check therefore matched Home on
    // every single page. Home now requires an exact match; every other
    // link keeps the "exact or parent path" prefix match (e.g. so a
    // product sub-page still highlights the "Products" parent link).
    const isHome = href === BASE_PATH;
    const isActive = isHome ? currentPath === href : currentPath === href || currentPath.startsWith(href);

    if (isActive) {
      link.classList.add('text-navy', 'font-semibold');
      link.setAttribute('aria-current', 'page');
    }
  });
}