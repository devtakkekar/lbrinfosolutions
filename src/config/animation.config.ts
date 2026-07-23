/**
 * Animation Configuration
 * Controls IntersectionObserver thresholds, durations, and scroll behavior
 */

export interface AnimationConfig {
  /** IntersectionObserver threshold — fraction of element visible to trigger */
  observerThreshold: number;
  /** Root margin for triggering animations before fully in view */
  observerRootMargin: string;
  /** Base transition duration in ms */
  baseDuration: number;
  /** Stagger delay between sequential elements in ms */
  staggerDelay: number;
  /** Fade-in animation distance in px (translateY) */
  fadeDistance: number;
  /** Whether to animate elements only once or every time they enter view */
  animateOnce: boolean;
  /** Delay before back-to-top button appears (scroll distance in px) */
  backToTopThreshold: number;
  /** Navbar background transition scroll threshold in px */
  navScrollThreshold: number;
}

export const animationConfig: AnimationConfig = {
  observerThreshold: 0.15,
  observerRootMargin: '0px 0px -50px 0px',
  baseDuration: 500,
  staggerDelay: 100,
  fadeDistance: 20,
  animateOnce: true,
  backToTopThreshold: 400,
  navScrollThreshold: 50,
};
