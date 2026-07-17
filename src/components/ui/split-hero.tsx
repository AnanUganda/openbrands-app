"use client";

import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSplineBackground() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      pointerEvents: 'auto',
      overflow: 'hidden',
    }}>
      {/* 
        We use scale and translateX to push the 3D scene to the right 
        and make it fill the right side of the screen better.
      */}
      <div className="absolute inset-0 z-0" style={{ transform: 'translateX(0%) scale(1.15)' }}>
        <Spline
          style={{
            width: '100%',
            height: '100vh',
            pointerEvents: 'auto',
          }}
          scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode" 
        />
      </div>
      
      {/* Gradient masks to blend the 3D scene smoothly into the dark background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(to right, rgba(13, 13, 13, 1) 0%, rgba(13, 13, 13, 0.7) 40%, transparent 70%),
            linear-gradient(to bottom, transparent 60%, rgba(13, 13, 13, 1) 95%)
          `,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Subtle theme glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#BFF549]/5 rounded-full blur-[150px] pointer-events-none z-0" />
    </div>
  );
}



function HeroContent() {
  return (
    <div className="text-white px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full flex flex-col justify-center h-full pt-20 relative z-10">
      
      {/* Structural vertical grid lines (subtle) */}
      <div className="absolute inset-0 z-[-1] pointer-events-none flex justify-between px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto opacity-20">
        <div className="w-[1px] h-full bg-white/[0.08]" />
        <div className="w-[1px] h-full bg-white/[0.08]" />
        <div className="w-[1px] h-full bg-white/[0.08]" />
        <div className="w-[1px] h-full bg-white/[0.08]" />
      </div>

      <div className="w-full lg:max-w-3xl flex flex-col justify-center pointer-events-auto mt-10">
        
        {/* Top tagline */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm border-l-2 border-[#BFF549] bg-white/[0.03] text-xs font-bold tracking-widest uppercase text-gray-300 shadow-sm backdrop-blur-md">
            BUILT FOR GROWTH
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-white tracking-tighter leading-[1.05] mb-6 text-balance drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Turn Your Website Into a{' '}
          <span className="text-[#BFF549] drop-shadow-md">Client-Generating System.</span>
        </motion.h1>
        
        <motion.p 
          className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 text-balance w-full max-w-2xl drop-shadow-md font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          We help service-based businesses build simple, conversion-focused websites that turn visitors into booked calls using clear messaging, SEO structure, and proven funnel systems.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Link to="/contact">
            <button className="group flex items-center justify-center gap-2 rounded-full border border-transparent bg-[#BFF549] px-7 py-4 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.2)] whitespace-nowrap pointer-events-auto">
              Book a Free Strategy Call
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {["bg-[#BFF549]/30", "bg-[#BFF549]/20", "bg-[#BFF549]/10"].map((bg, i) => (
                <div key={i} className={`w-9 h-9 rounded-full ${bg} border-2 border-[#0D0D0D] flex items-center justify-center text-xs font-bold text-gray-300`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-[#BFF549]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-xs text-gray-400 font-medium mt-0.5 drop-shadow-sm">Trusted by service businesses</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function LogoMarquee() {
  const logos = [
    "ACME Corp", "GlobalTech", "Nexus", "Pinnacle", "Astra", "Zenith", "Quantum"
  ];

  return (
    <div className="w-full bg-[#0D0D0D] border-y border-white/[0.06] py-10 overflow-hidden relative z-20">
      {/* Grid line overlay for the marquee section */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      }} />
      
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-center text-xs font-bold tracking-widest text-gray-500 uppercase">Trusted by ambitious brands worldwide</p>
      </div>

      <div className="flex w-[300%] sm:w-[200%] md:w-full">
        <div className="flex w-full animate-logo-marquee items-center justify-around gap-8 md:gap-16 px-4 md:px-8">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center shrink-0">
              <span className="text-xl md:text-2xl font-black text-white/[0.15] tracking-tighter uppercase whitespace-nowrap hover:text-white/[0.3] transition-colors cursor-default">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SplitHero() {
  return (
    <div className="relative bg-[#0D0D0D]">
      
      <div className="relative min-h-screen overflow-hidden">
        {/* Fullscreen Spline Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        {/* Hero Content Overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
        }}>
          <HeroContent />
        </div>
      </div>

      {/* Marquee right below the fold */}
      <LogoMarquee />
      
    </div>
  );
}
