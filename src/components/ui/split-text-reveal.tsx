import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
}

/**
 * SplitTextReveal
 * 
 * Reusable component providing responsive line-split scroll reveals with GSAP & ScrollTrigger.
 * Dynamically calculates line breaks on window resize so line masks never break across viewports.
 */
export function SplitTextReveal({
  children,
  className = "",
  as: Component = "h2",
  delay = 0,
  stagger = 0.12,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
          rotateX: -12,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    // Recalculate line splits on window resize for 100% responsive accuracy
    let resizeTimer: NodeJS.Timeout;
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
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [children, delay, stagger]);

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
