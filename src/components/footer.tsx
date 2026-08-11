import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  /* Dynamic Variables for Open Brands dark theme */
  --pill-bg-1: rgba(255, 255, 255, 0.03);
  --pill-bg-2: rgba(255, 255, 255, 0.01);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.1);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.08);
  
  --pill-bg-1-hover: rgba(255, 255, 255, 0.08);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.02);
  --pill-border-hover: rgba(191, 245, 73, 0.3);
  --pill-shadow-hover: rgba(0, 0, 0, 0.7);
  --pill-highlight-hover: rgba(255, 255, 255, 0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(191, 245, 73, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(191, 245, 73, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow - Open Brands Lime */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(191, 245, 73, 0.05) 0%, 
    rgba(191, 245, 73, 0.02) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: white;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 20vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.15));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    to?: string;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", to, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    // If using React Router's Link
    if (Component === Link) {
      return (
        <Link
          to={to!}
          ref={(node: any) => {
            (localRef as any).current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) (forwardedRef as any).current = node;
          }}
          className={cn("cursor-pointer", className)}
          {...(props as any)}
        >
          {children}
        </Link>
      );
    }

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>High-Converting Websites</span> <span className="text-[#BFF549]/60">✦</span>
    <span>SEO Systems</span> <span className="text-gray-500/60">✦</span>
    <span>Lead Generation</span> <span className="text-[#BFF549]/60">✦</span>
    <span>Brand Authority</span> <span className="text-gray-500/60">✦</span>
    <span>Service Businesses</span> <span className="text-[#BFF549]/60">✦</span>
  </div>
);

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#FBFBFB] text-[#0D0D0D] cinematic-footer-wrapper border-t border-gray-200">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] bg-[#BFF549]/15 blur-[120px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none opacity-20" />

          {/* Giant background text */}
          <motion.div
            initial={{ y: "8vh", scale: 0.9, opacity: 0 }}
            whileInView={{ y: "0vh", scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none tracking-tighter text-gray-200/70"
          >
            OPEN BRANDS
          </motion.div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-gray-200/80 bg-white/80 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-sm">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-gray-600 uppercase">
              <MarqueeItem />
              <MarqueeItem />
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D0D0D] tracking-tight mb-6 text-balance leading-tight">
                Ready to Turn Your Website Into a Lead Generator?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-12 text-balance leading-relaxed max-w-2xl">
                Your website should be your best salesperson — working 24/7 to bring you clients.<br/>
                <span className="text-[#0D0D0D] font-bold">If it's not doing that yet, it's time to fix it.</span>
              </p>
            </motion.div>

            {/* Interactive Magnetic Pills Layout */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 w-full"
            >
              {/* Primary CTA Links */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as={Link} to="/contact" className="bg-[#BFF549] text-[#0D0D0D] hover:bg-[#d4ff6e] shadow-md px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group transition-all">
                  <span className="text-xl">👉</span>
                  Book a Free Strategy Call
                </MagneticButton>
                
                <MagneticButton as={Link} to="/portfolio" className="bg-white border border-gray-200 text-[#0D0D0D] hover:bg-gray-100 shadow-sm px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3 group transition-all">
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#0D0D0D] transition-colors" />
                  View Our Work
                </MagneticButton>
              </div>

              {/* Secondary Text Links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                <MagneticButton as={Link} to="/blog" className="bg-white/80 border border-gray-200 px-6 py-3 rounded-full text-gray-600 font-semibold text-xs md:text-sm hover:text-[#0D0D0D] hover:bg-white shadow-xs">
                  Blog
                </MagneticButton>
                <MagneticButton as={Link} to="/hiring" className="bg-white/80 border border-gray-200 px-6 py-3 rounded-full text-gray-600 font-semibold text-xs md:text-sm hover:text-[#0D0D0D] hover:bg-white shadow-xs">
                  Hiring
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-gray-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 flex items-center gap-2">
              <img
                src="/portfolio/logo.png"
                alt="Open Brands"
                className="h-6 w-auto object-contain brightness-0 opacity-80"
              />
              © {new Date().getFullYear()} Open Brands. All rights reserved.
            </div>

            {/* "Made with Love" Badge */}
            <div className="bg-white border border-gray-200/90 shadow-xs px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-emerald-600">❤</span>
              <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-[#0D0D0D] font-black text-xs md:text-sm tracking-normal ml-1">Open Brands</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:text-[#0D0D0D] hover:bg-gray-100 group order-3 transition-all"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
