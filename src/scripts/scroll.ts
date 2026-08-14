/**
 * Scroll Script
 * Back-to-top button and scroll-related utilities.
 */

import { animationConfig } from '../config/animation.config';

export function initScroll(): void {
  initBackToTop();
}

function initBackToTop(): void {
  // Create back-to-top button
  const btn = document.createElement('button');
  btn.className = 'back-to-top fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center bg-navy text-white rounded shadow-card hover:shadow-card-hover transition-all duration-250 opacity-0 invisible translate-y-2 z-50';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
    </svg>
  `;

  document.body.appendChild(btn);

  // Show/hide on scroll
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > animationConfig.backToTopThreshold) {
          btn.classList.remove('opacity-0', 'invisible', 'translate-y-2');
          btn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
          btn.classList.add('opacity-0', 'invisible', 'translate-y-2');
          btn.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
