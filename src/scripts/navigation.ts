/**
 * Navigation Script
 * Handles active link highlighting and smooth scroll to anchors.
 */

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
      const navHeight = document.querySelector('.navbar')?.getBoundingClientRect().height ?? 64;

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

    // Match exact path or parent path for products
    if (currentPath === href || (currentPath.startsWith(href) && href !== '/')) {
      link.classList.add('text-navy', 'font-semibold');
      link.setAttribute('aria-current', 'page');
    }
  });
}
