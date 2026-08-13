import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO, SUBTLE, START, prefersReducedMotion } from "@/lib/motion";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
  /** "hero" travels further and slower; "subtle" suits section headings. */
  variant?: "hero" | "subtle";
}

/**
 * Wrap each word of the element's text in an inline-block span, without moving
 * any element out of its parent — so `<span class="text-gray-400">` keeps
 * wrapping (and styling) its own words.
 *
 * Returns the word spans, in document order, ready to stagger.
 */
function wrapWordsInPlace(el: HTMLElement): HTMLElement[] {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    if (node.textContent && node.textContent.trim()) textNodes.push(node as Text);
    node = walker.nextNode();
  }

  const words: HTMLElement[] = [];
  textNodes.forEach((textNode) => {
    const parent = textNode.parentNode;
    if (!parent) return;

    const fragment = document.createDocumentFragment();
    // Keep the whitespace tokens so spacing between words survives the split.
    textNode.textContent!.split(/(\s+)/).forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        fragment.appendChild(document.createTextNode(token));
        return;
      }
      const span = document.createElement("span");
      span.className = "split-word inline-block will-change-transform";
      span.textContent = token;
      fragment.appendChild(span);
      words.push(span);
    });

    parent.replaceChild(fragment, textNode);
  });

  return words;
}

/** Line splitting rewrites innerHTML, so it only works on plain text children. */
function isPlainText(children: React.ReactNode): boolean {
  if (typeof children === "string" || typeof children === "number") return true;
  if (Array.isArray(children)) {
    return children.every((c) => typeof c === "string" || typeof c === "number");
  }
  return false;
}

/**
 * SplitTextReveal
 *
 * Reveals a heading line by line on scroll, using GSAP & ScrollTrigger. Line
 * breaks are recalculated on resize so the masks never break across viewports.
 *
 * Headings containing markup (a coloured <span>, a <br />) are animated as a
 * single block instead — splitting them would mean rebuilding innerHTML and
 * throwing that markup away.
 *
 * Respects prefers-reduced-motion: renders as a plain heading, no tween.
 */
export function SplitTextReveal({
  children,
  className = "",
  as: Component = "h2",
  delay = 0,
  stagger,
  variant = "subtle",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  // A polymorphic `as` prop resolves its props to `never` in JSX; narrowing the
  // element type here keeps the ref and className assignable.
  const Tag = Component as unknown as React.FC<{
    ref?: React.Ref<HTMLElement>;
    className?: string;
    children?: React.ReactNode;
  }>;

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const cfg = variant === "hero" ? HERO : SUBTLE;
    const lineStagger = stagger ?? (variant === "hero" ? 0.12 : 0.08);

    // Both paths rewrite the DOM React rendered, so keep the original markup to
    // restore on cleanup. Without this, a re-run would wrap already-wrapped
    // words and nest the splits.
    const originalHTML = el.innerHTML;

    // Headings containing markup (a coloured <span>, a <br />) get a word-level
    // stagger instead of line masks. Line masking requires reparenting nodes
    // into wrappers, which would break a span that straddles two lines; wrapping
    // words in place leaves every parent element exactly where it was.
    if (!isPlainText(children)) {
      const words = wrapWordsInPlace(el);
      if (!words.length) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { y: variant === "hero" ? "0.45em" : "0.3em", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: variant === "hero" ? 0.85 : 0.55,
            ease: cfg.ease,
            delay,
            stagger: variant === "hero" ? 0.035 : 0.02,
            scrollTrigger: { trigger: el, start: START, once: true },
          }
        );
      }, el);

      return () => {
        ctx.revert();
        el.innerHTML = originalHTML;
      };
    }

    // Helper to calculate DOM line wrappers dynamically based on layout top offsets
    const splitIntoLines = () => {
      const text = el.innerText || el.textContent || "";
      if (!text.trim()) return;

      const words = text.trim().split(/\s+/);
      el.innerHTML = words
        .map((word) => `<span class="inline-block split-word mr-[0.25em]">${word}</span>`)
        .join("");

      const wordNodes = Array.from(el.querySelectorAll<HTMLElement>(".split-word"));
      if (!wordNodes.length) return;

      const lineGroups: HTMLElement[][] = [];
      let currentLine: HTMLElement[] = [];
      let currentTop = -1;

      wordNodes.forEach((node) => {
        const top = node.offsetTop;
        if (currentTop === -1 || Math.abs(top - currentTop) < 6) {
          currentLine.push(node);
          currentTop = top;
        } else {
          lineGroups.push(currentLine);
          currentLine = [node];
          currentTop = top;
        }
      });
      if (currentLine.length) lineGroups.push(currentLine);

      // Construct masked line containers
      el.innerHTML = "";
      lineGroups.forEach((group) => {
        const lineWrapper = document.createElement("div");
        lineWrapper.className = "overflow-hidden block py-[0.05em]";

        const lineInner = document.createElement("div");
        lineInner.className = "split-line-inner block transform-gpu";
        lineInner.innerHTML = group.map((w) => w.outerHTML).join(" ");

        lineWrapper.appendChild(lineInner);
        el.appendChild(lineWrapper);
      });
    };

    // Execute line splitting
    splitIntoLines();

    // Animate line inners as they cross ScrollTrigger viewport threshold
    const lineInners = el.querySelectorAll(".split-line-inner");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineInners,
        {
          y: "115%",
          opacity: 0,
          rotateX: variant === "hero" ? -12 : -6,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: variant === "hero" ? 1.1 : 0.7,
          ease: cfg.ease,
          stagger: lineStagger,
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: START,
            // Play once. Reversing on scroll-up made long pages feel restless.
            once: true,
          },
        }
      );
    }, el);

    // Recalculate line splits on window resize for 100% responsive accuracy
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ctx.revert();
        splitIntoLines();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      el.innerHTML = originalHTML;
    };
  }, [children, delay, stagger, variant]);

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
