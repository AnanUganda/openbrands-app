import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO, SUBTLE, START, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  /** "hero" travels further and slower; "subtle" is the default for everything below the fold. */
  variant?: "hero" | "subtle";
  /**
   * Stagger the element's direct children instead of the element itself.
   * This is what makes card grids animate in sequence.
   */
  stagger?: boolean;
  /** Play as soon as it mounts rather than waiting for the scroll position. Use for above-the-fold heroes. */
  immediate?: boolean;
  delay?: number;
}

/**
 * ScrollReveal
 *
 * Fades and lifts content into view via GSAP + ScrollTrigger. Wrap a grid and
 * pass `stagger` to have its cards arrive one after another.
 *
 * Respects prefers-reduced-motion: content renders in place, fully visible,
 * with no tween and no ScrollTrigger registered.
 */
export function ScrollReveal({
  children,
  className = "",
  as: Component = "div",
  variant = "subtle",
  stagger = false,
  immediate = false,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  // A polymorphic `as` prop resolves its props to `never` in JSX; narrowing the
  // element type here keeps the ref and className assignable.
  const Tag = Component as unknown as React.FC<{
    ref?: React.Ref<HTMLElement>;
    className?: string;
    children?: React.ReactNode;
  }>;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: leave the DOM untouched so content is visible immediately.
    if (prefersReducedMotion()) return;

    const cfg = variant === "hero" ? HERO : SUBTLE;
    const childEls = Array.from(el.children);
    // Nothing to stagger (empty grid, or still loading) — skip rather than
    // registering a trigger against zero targets.
    if (stagger && childEls.length === 0) return;
    const targets: gsap.TweenTarget = stagger ? childEls : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: cfg.y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: cfg.duration,
          ease: cfg.ease,
          delay,
          stagger: stagger ? cfg.stagger : 0,
          // Above-the-fold heroes play on mount; everything else waits for scroll.
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: el,
                  start: START,
                  // Play once — replaying on scroll-up is what makes long pages
                  // feel restless.
                  toggleActions: "play none none none",
                  once: true,
                },
              }),
        }
      );
    }, el);

    return () => ctx.revert();
  }, [variant, stagger, immediate, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
