"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Particles } from '@/components/ui/particles';

function LogoRow() {
  const logos = [
    "/software/Antigravity.png",
    "/software/Framer.png",
    "/software/GA.png",
    "/software/Meta.png",
    "/software/hubspot.png",
    "/software/chimp.png",
    "/software/convertkit.png",
    "/software/google ads.png",
    "/software/zappie.png",
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md lg:max-w-xl overflow-hidden">
      <div className="text-sm md:text-base font-bold text-[#0D0D0D]">
        Backed by Leading <span className="text-gray-500 font-medium">Startups & Enterprises</span>
      </div>

      {/* Horizontal Continuous Ticker Animation */}
      <div 
        className="flex overflow-hidden relative w-full py-1"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
        }}
      >
        <div className="flex w-max animate-logo-marquee items-center gap-8 md:gap-10 shrink-0">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center shrink-0">
              <img 
                src={logo} 
                alt="Partner logo" 
                className="h-8 md:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const easeCubic = [0.215, 0.61, 0.355, 1];

export default function SplitHero() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const heroContainerRef = React.useRef<HTMLDivElement>(null);

  // Scroll-driven growth for video card
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.6], [0.96, 1.02]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.6], ["1.75rem", "2.5rem"]);

  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = true;
    videoElement.defaultMuted = true;
    videoElement.playsInline = true;

    const playVideo = () => {
      if (videoElement.paused) {
        videoElement.play().catch(() => {});
      }
    };

    playVideo();

    window.addEventListener("touchstart", playVideo, { once: true });
    window.addEventListener("scroll", playVideo, { once: true });
    window.addEventListener("click", playVideo, { once: true });

    return () => {
      window.removeEventListener("touchstart", playVideo);
      window.removeEventListener("scroll", playVideo);
      window.removeEventListener("click", playVideo);
    };
  }, []);

  return (
    <div ref={heroContainerRef} className="relative bg-[#FBFBFB] text-[#0D0D0D] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Interactive Canvas Particles Background */}
      <Particles className="absolute inset-0 z-0" quantity={200} color="#000000" staticity={40} ease={50} />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 border-l border-r border-gray-200/80">
        
        {/* Eyebrow: Fades up with 100ms delay */}
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeCubic }}
        >
          <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-[8px] text-white font-bold">
            ★
          </div>
          <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            ©2026 Open Brands
          </span>
        </motion.div>

        {/* Main Headline: Fades up and moves upward 20px */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold text-[#0D0D0D] tracking-tight leading-[1.04] mb-4 max-w-5xl text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeCubic }}
        >
          Your Website Should Be <span className="text-gray-400 font-semibold">Booking Jobs.</span> Not Just Sitting There.
        </motion.h1>

        {/* Supporting Subtitle: Fades in shortly after */}
        <motion.p 
          className="text-gray-600 text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-6 max-w-3xl text-balance"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: easeCubic }}
        >
          We build lead-generation websites for service businesses
        </motion.p>

        {/* CTA Buttons & Logo Ticker: Appears with a stagger */}
        <motion.div 
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: easeCubic }}
        >
          <Link to="/contact">
            <button className="group flex items-center gap-3 rounded-full bg-[#BFF549] px-8 py-4 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.3)] pointer-events-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
              Book a Strategy Call
            </button>
          </Link>

          <LogoRow />
        </motion.div>

        {/* Video Card: Entrance scale 1.05 to 1 + Scroll-driven growth & 650px height */}
        <motion.div 
          style={{
            scale: videoScale,
            borderRadius: videoRadius,
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: easeCubic }}
          className="relative w-full overflow-hidden bg-black shadow-2xl border border-gray-200/80 aspect-[16/9] md:aspect-[21/9] min-h-[450px] md:min-h-[650px]"
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="/portfolio/video.mov"
            onLoadedMetadata={(e) => {
              e.currentTarget.play().catch(() => {});
            }}
            onCanPlay={(e) => {
              e.currentTarget.play().catch(() => {});
            }}
            className="w-full h-full object-cover"
          />

          {/* Top-Left Overlay inside Video: Avatars + 5 Stars */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-white">
            <div className="flex -space-x-2">
              <img src="/portfolio/anan.jpeg" alt="Client" className="w-8 h-8 rounded-full border-2 border-black object-cover" />
              <div className="w-8 h-8 rounded-full bg-[#BFF549] border-2 border-black flex items-center justify-center text-xs font-bold text-[#0D0D0D]">A</div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-black flex items-center justify-center text-xs font-bold text-white">B</div>
            </div>
            <div className="flex flex-col">
              <div className="flex text-[#BFF549]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <span className="text-xs text-white font-semibold">Trusted by local businesses</span>
            </div>
          </div>

          {/* Subtle gradient overlay at bottom of video container */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </motion.div>

      </div>
    </div>
  );
}
