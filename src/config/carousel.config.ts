/**
 * Carousel Configuration
 * Controls autoplay, transition behavior, responsive card counts, and interaction
 */

export interface CarouselBreakpoint {
  /** Minimum viewport width in px */
  minWidth: number;
  /** Number of cards visible at this breakpoint */
  visibleCards: number;
  /** Gap between cards in px */
  gap: number;
}

export interface CarouselConfig {
  /** Enable automatic sliding */
  autoplay: boolean;
  /** Time between auto-slides in milliseconds */
  autoplayInterval: number;
  /** Pause autoplay when user hovers over carousel */
  pauseOnHover: boolean;
  /** Enable infinite looping */
  loop: boolean;
  /** Slide transition duration in milliseconds */
  transitionDuration: number;
  /** Transition easing function */
  transitionEasing: string;
  /** Minimum swipe distance in px to trigger slide */
  touchThreshold: number;
  /** Enable keyboard navigation (arrow keys) */
  keyboardNavigation: boolean;
  /** Show navigation arrows */
  showArrows: boolean;
  /** Show pagination dots */
  showDots: boolean;
  /** Responsive breakpoints (ordered smallest to largest) */
  breakpoints: CarouselBreakpoint[];
  /** ARIA label for the carousel region */
  ariaLabel: string;
}

export const carouselConfig: CarouselConfig = {
  autoplay: true,
  autoplayInterval: 5000,
  pauseOnHover: true,
  loop: true,
  transitionDuration: 400,
  transitionEasing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  touchThreshold: 50,
  keyboardNavigation: true,
  showArrows: true,
  showDots: true,
  breakpoints: [
    { minWidth: 0, visibleCards: 1, gap: 16 },
    { minWidth: 640, visibleCards: 2, gap: 20 },
    { minWidth: 1024, visibleCards: 3, gap: 24 },
    { minWidth: 1440, visibleCards: 4, gap: 24 },
  ],
  ariaLabel: 'Product Solutions Carousel',
};
