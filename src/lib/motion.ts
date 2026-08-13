/**
 * Shared motion tokens.
 *
 * The site runs two intensities: a bold reveal on page heroes to make a first
 * impression, and restrained motion everywhere below so scrolling the rest of
 * the page never feels slow.
 */

export const EASE = {
  /** Decelerating curve used for nearly everything that enters the viewport. */
  out: "power3.out",
  /** Slightly softer curve for large hero elements travelling further. */
  heroOut: "power4.out",
} as const;

export const HERO = {
  duration: 1.1,
  stagger: 0.09,
  y: 34,
  ease: EASE.heroOut,
} as const;

export const SUBTLE = {
  duration: 0.55,
  stagger: 0.07,
  y: 18,
  ease: EASE.out,
} as const;

/** Viewport position at which scroll-driven reveals begin. */
export const START = "top 85%";

/**
 * Reduced-motion check.
 *
 * Read at effect time rather than cached at module load, so a user toggling the
 * OS setting gets the new behaviour on their next navigation.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
