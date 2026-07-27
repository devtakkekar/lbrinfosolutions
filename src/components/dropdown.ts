/**
 * Dropdown Component
 * Manages desktop hover dropdowns and mobile tap-to-expand behavior.
 * Initialized after navbar renders.
 */

export function initDropdowns(): void {
  initDesktopDropdowns();
  initMobileDropdowns();
  initMobileMenu();
}

function initDesktopDropdowns(): void {
  const dropdownItems = document.querySelectorAll<HTMLElement>('.nav-item-dropdown');

  dropdownItems.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('button');
    const dropdown = item.querySelector<HTMLElement>('.nav-dropdown');
    const chevron = item.querySelector<HTMLElement>('.nav-chevron');

    if (!trigger || !dropdown) return;

    let hideTimeout: ReturnType<typeof setTimeout>;

    function show(): void {
      clearTimeout(hideTimeout);
      dropdown!.classList.remove('opacity-0', 'invisible', '-translate-y-2');
      dropdown!.classList.add('opacity-100', 'visible', 'translate-y-0');
      trigger!.setAttribute('aria-expanded', 'true');
      chevron?.classList.add('rotate-180');
    }

    function hide(): void {
      hideTimeout = setTimeout(() => {
        dropdown!.classList.add('opacity-0', 'invisible', '-translate-y-2');
        dropdown!.classList.remove('opacity-100', 'visible', 'translate-y-0');
        trigger!.setAttribute('aria-expanded', 'false');
        chevron?.classList.remove('rotate-180');
      }, 150);
    }

    // Desktop: hover behavior
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);

    // Desktop: click behavior (for touch-laptops and accessibility)
    trigger.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) hide();
      else show();
    });

    // Keyboard: toggle on Enter/Space
    trigger.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) hide();
        else show();
      }
      if (e.key === 'Escape') {
        hide();
        trigger.focus();
      }
    });

    // Close on Escape from within dropdown
    dropdown.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hide();
        trigger.focus();
      }
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.nav-item-dropdown')) {
      document.querySelectorAll<HTMLElement>('.nav-dropdown').forEach((dd) => {
        dd.classList.add('opacity-0', 'invisible', '-translate-y-2');
        dd.classList.remove('opacity-100', 'visible', 'translate-y-0');
      });
      document.querySelectorAll<HTMLButtonElement>('.nav-item-dropdown button').forEach((btn) => {
        btn.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll<HTMLElement>('.nav-chevron').forEach((chev) => {
        chev.classList.remove('rotate-180');
      });
    }
  });
}

function initMobileDropdowns(): void {
  const triggers = document.querySelectorAll<HTMLButtonElement>('.mobile-dropdown-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling as HTMLElement | null;
      const chevron = trigger.querySelector<HTMLElement>('.mobile-chevron');
      const expanded = trigger.getAttribute('aria-expanded') === 'true';

      if (!content) return;

      if (expanded) {
        trigger.setAttribute('aria-expanded', 'false');
        content.classList.add('hidden');
        chevron?.classList.remove('rotate-180');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
      }
    });
  });
}

function initMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
  const menu = document.querySelector<HTMLElement>('.mobile-menu');
  const hamburger = document.querySelector<HTMLElement>('.hamburger-icon');
  const closeIcon = document.querySelector<HTMLElement>('.close-icon');

  if (!toggle || !menu) return;

  // Cap the slide-open height at the viewport (minus the fixed nav bar height)
  // so long menus scroll internally instead of overflowing the screen.
  const maxOpenHeight = () => `${Math.min(menu.scrollHeight, window.innerHeight - 72)}px`;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.style.maxHeight = '0px';
      menu.classList.remove('is-open');
      hamburger?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      document.body.style.overflow = '';
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      menu.style.maxHeight = maxOpenHeight();
      menu.classList.add('is-open');
      hamburger?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close mobile menu on Escape
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click();
    }
  });

  // Close mobile menu when viewport becomes desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click();
    }
  });

  // Mobile accordion sub-menus (e.g. Products) can grow the mobile menu's
  // content height after it's already open — recalculate max-height so the
  // slide-open panel doesn't clip the newly revealed items.
  menu.querySelectorAll('.mobile-dropdown-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        // Wait a tick for the accordion's own class toggle to apply first
        requestAnimationFrame(() => {
          menu.style.maxHeight = maxOpenHeight();
        });
      }
    });
  });
}
