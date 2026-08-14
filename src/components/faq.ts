/**
 * FAQ Accordion Component
 * Accessible accordion with smooth expand/collapse animations.
 * Used on product detail pages.
 */

import type { ProductFAQ } from '../types/product';

function buildFAQItem(item: ProductFAQ, index: number): string {
  return `
    <div class="faq-item border border-gray-200 rounded mb-3 overflow-hidden transition-shadow duration-200 hover:shadow-card">
      <button
        class="faq-trigger w-full flex items-center justify-between px-5 py-4 text-left text-navy font-medium text-sm lg:text-base transition-colors hover:bg-gray-50"
        aria-expanded="false"
        aria-controls="faq-answer-${index}"
        id="faq-trigger-${index}"
      >
        <span class="pr-4">${item.question}</span>
        <svg class="faq-icon w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"/>
        </svg>
      </button>
      <div
        class="faq-content"
        id="faq-answer-${index}"
        role="region"
        aria-labelledby="faq-trigger-${index}"
        style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out;"
      >
        <div class="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed">
          ${item.answer}
        </div>
      </div>
    </div>
  `;
}

export function renderFAQ(containerId: string, items: ProductFAQ[]): void {
  const container = document.getElementById(containerId);
  if (!container || items.length === 0) return;

  container.innerHTML = `
    <div class="faq-accordion" role="list">
      ${items.map((item, i) => buildFAQItem(item, i)).join('')}
    </div>
  `;

  // Initialize accordion behavior
  const triggers = container.querySelectorAll<HTMLButtonElement>('.faq-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling as HTMLElement | null;
      const icon = trigger.querySelector('.faq-icon') as HTMLElement | null;

      if (!content) return;

      // Close all other items (single-open mode)
      triggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          const otherContent = otherTrigger.nextElementSibling as HTMLElement | null;
          const otherIcon = otherTrigger.querySelector('.faq-icon') as HTMLElement | null;
          otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0';
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current item
      if (expanded) {
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) icon.style.transform = 'rotate(45deg)';
      }
    });
  });
}
