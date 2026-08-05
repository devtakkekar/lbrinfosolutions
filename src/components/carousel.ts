/**
 * Product Carousel Component
 * Responsive carousel with autoplay, touch swipe, keyboard nav, and pagination.
 * Reads configuration from carousel.config.ts.
 */

import { carouselConfig } from '../config/carousel.config';
import { getFeaturedProducts } from '../data/products';
import type { Product } from '../types/product';

interface CarouselState {
  currentIndex: number;
  visibleCards: number;
  gap: number;
  totalSlides: number;
  isTransitioning: boolean;
  autoplayTimer: ReturnType<typeof setInterval> | null;
  touchStartX: number;
  touchEndX: number;
}

function getResponsiveValues(): { visibleCards: number; gap: number } {
  const width = window.innerWidth;
  let result = { visibleCards: 1, gap: 16 };

  for (const bp of carouselConfig.breakpoints) {
    if (width >= bp.minWidth) {
      result = { visibleCards: bp.visibleCards, gap: bp.gap };
    }
  }
  return result;
}

function buildProductCard(product: Product, index: number): string {
  return `
    <div class="carousel-slide flex-shrink-0 opacity-0 translate-y-3" style="transition: opacity 0.5s ease-out ${index * 90}ms, transform 0.5s ease-out ${index * 90}ms;" role="group" aria-label="${product.name}">
      <div class="card h-full p-6 flex flex-col">
        <div class="flex items-center justify-between mb-4">
          ${product.logo ? `<span class="logo-chip"><img src="${product.logo}" alt="${product.name} logo" loading="lazy"></span>` : ''}
          <span class="badge">${product.category}</span>
        </div>
        <h3 class="text-h3 text-navy mb-2">${product.name}</h3>
        <p class="text-sm text-blue-accent font-medium mb-3">${product.tagline}</p>
        <p class="text-sm text-gray-600 leading-relaxed flex-1 mb-5">${product.shortDescription}</p>
        <a href="${product.pagePath}" class="btn-outline text-xs px-4 py-2 self-start">
          Learn More
          <svg class="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  `;
}

export function initCarousel(): void {
  const container = document.getElementById('product-carousel');
  if (!container) return;

  const products = getFeaturedProducts();
  if (products.length === 0) return;

  const { visibleCards, gap } = getResponsiveValues();

  const state: CarouselState = {
    currentIndex: 0,
    visibleCards,
    gap,
    totalSlides: products.length,
    isTransitioning: false,
    autoplayTimer: null,
    touchStartX: 0,
    touchEndX: 0,
  };

  // Render carousel HTML
  container.innerHTML = `
    <div class="carousel-wrapper relative" aria-label="${carouselConfig.ariaLabel}" role="region">
      <!-- Track -->
      <div class="carousel-viewport overflow-hidden">
        <div class="carousel-track flex transition-transform" style="gap: ${state.gap}px; transition-duration: ${carouselConfig.transitionDuration}ms; transition-timing-function: ${carouselConfig.transitionEasing};">
          ${products.map((p, i) => buildProductCard(p, i)).join('')}
        </div>
      </div>

      <!-- Navigation arrows -->
      ${carouselConfig.showArrows ? `
      <button class="carousel-prev absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-card hover:shadow-card-hover border border-gray-200 text-navy transition-all duration-200" aria-label="Previous slide">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="carousel-next absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-card hover:shadow-card-hover border border-gray-200 text-navy transition-all duration-200" aria-label="Next slide">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      ` : ''}

      <!-- Pagination dots -->
      ${carouselConfig.showDots ? `
      <div class="carousel-dots flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Carousel pagination"></div>
      ` : ''}
    </div>
  `;

  // Get DOM references
  const track = container.querySelector<HTMLElement>('.carousel-track');
  const slides = container.querySelectorAll<HTMLElement>('.carousel-slide');
  const prevBtn = container.querySelector<HTMLButtonElement>('.carousel-prev');
  const nextBtn = container.querySelector<HTMLButtonElement>('.carousel-next');
  const dotsContainer = container.querySelector<HTMLElement>('.carousel-dots');
  const viewport = container.querySelector<HTMLElement>('.carousel-viewport');
  let dots: NodeListOf<HTMLButtonElement> = container.querySelectorAll<HTMLButtonElement>('.carousel-dot');
  let dotsInitialized = false;

  if (!track || slides.length === 0) return;

  /**
   * Number of valid scroll positions equals the number of distinct offsets
   * the track can sit at — one more than the max index. This must be
   * recalculated whenever visibleCards changes (responsive breakpoints),
   * since e.g. 6 slides shown 3-at-a-time only has 4 valid positions, not 6.
   */
  function getPositionCount(): number {
    return Math.max(1, state.totalSlides - state.visibleCards + 1);
  }

  function renderDots(): void {
    if (!dotsContainer) return;
    const positionCount = getPositionCount();
    dotsContainer.innerHTML = Array.from({ length: positionCount })
      .map(
        (_, i) =>
          `<button class="carousel-dot w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === 0 ? 'bg-blue-accent w-6' : 'bg-gray-300'}" role="tab" aria-selected="${i === 0}" aria-label="Go to slide ${i + 1}"></button>`
      )
      .join('');
    dots = dotsContainer.querySelectorAll<HTMLButtonElement>('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); });
    });
  }

  function updateSlideWidths(): void {
    const { visibleCards: vc, gap: g } = getResponsiveValues();
    const visibleCardsChanged = vc !== state.visibleCards;
    state.visibleCards = vc;
    state.gap = g;

    if (!viewport || !track) return;
    const viewportWidth = viewport.offsetWidth;
    const totalGap = g * (vc - 1);
    const slideWidth = (viewportWidth - totalGap) / vc;

    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
      slide.style.minWidth = `${slideWidth}px`;
    });

    track.style.gap = `${g}px`;

    // Dot count depends on visibleCards, so rebuild on the very first call
    // and whenever visibleCards changes thereafter (e.g. resizing across a
    // breakpoint). Clamp the current index into the new valid range before
    // repositioning the track.
    if (!dotsInitialized || visibleCardsChanged) {
      renderDots();
      dotsInitialized = true;
      state.currentIndex = Math.min(state.currentIndex, getPositionCount() - 1);
    }

    goToSlide(state.currentIndex, false);
  }

  function goToSlide(index: number, animate = true): void {
    if (!track || !viewport) return;

    const maxIndex = getPositionCount() - 1;

    if (carouselConfig.loop) {
      if (index > maxIndex) index = 0;
      if (index < 0) index = maxIndex;
    } else {
      index = Math.max(0, Math.min(index, maxIndex));
    }

    state.currentIndex = index;

    const viewportWidth = viewport.offsetWidth;
    const totalGap = state.gap * (state.visibleCards - 1);
    const slideWidth = (viewportWidth - totalGap) / state.visibleCards;
    const offset = index * (slideWidth + state.gap);

    track.style.transitionDuration = animate ? `${carouselConfig.transitionDuration}ms` : '0ms';
    track.style.transform = `translateX(-${offset}px)`;

    // Update dots
    dots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle('bg-blue-accent', isActive);
      dot.classList.toggle('w-6', isActive);
      dot.classList.toggle('bg-gray-300', !isActive);
      dot.classList.toggle('w-2.5', !isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  function nextSlide(): void {
    goToSlide(state.currentIndex + 1);
  }

  function prevSlide(): void {
    goToSlide(state.currentIndex - 1);
  }

  function startAutoplay(): void {
    if (!carouselConfig.autoplay) return;
    stopAutoplay();
    state.autoplayTimer = setInterval(nextSlide, carouselConfig.autoplayInterval);
  }

  function stopAutoplay(): void {
    if (state.autoplayTimer) {
      clearInterval(state.autoplayTimer);
      state.autoplayTimer = null;
    }
  }

  // Event listeners
  prevBtn?.addEventListener('click', () => { prevSlide(); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { nextSlide(); startAutoplay(); });

  // Note: dot click handlers are attached inside renderDots() since dots
  // are rebuilt dynamically (see updateSlideWidths).

  // Pause on hover
  if (carouselConfig.pauseOnHover) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  // Touch support
  container.addEventListener('touchstart', (e: TouchEvent) => {
    state.touchStartX = e.touches[0]?.clientX ?? 0;
    stopAutoplay();
  }, { passive: true });

  container.addEventListener('touchmove', (e: TouchEvent) => {
    state.touchEndX = e.touches[0]?.clientX ?? 0;
  }, { passive: true });

  container.addEventListener('touchend', () => {
    const diff = state.touchStartX - state.touchEndX;
    if (Math.abs(diff) > carouselConfig.touchThreshold) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    startAutoplay();
  });

  // Keyboard navigation
  if (carouselConfig.keyboardNavigation) {
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { nextSlide(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { prevSlide(); e.preventDefault(); }
    });
  }

  // Responsive resize
  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateSlideWidths, 150);
  });

  // Initialize — use rAF to ensure layout is calculated after render
  requestAnimationFrame(() => {
    updateSlideWidths();
    startAutoplay();

    // Cascade the cards in on mount (respects reduced-motion by skipping the
    // opacity/transform reset — the cards remain visible immediately).
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(() => {
        slides.forEach((slide) => {
          slide.classList.remove('opacity-0', 'translate-y-3');
        });
      });
    } else {
      slides.forEach((slide) => slide.classList.remove('opacity-0', 'translate-y-3'));
    }
  });
}
