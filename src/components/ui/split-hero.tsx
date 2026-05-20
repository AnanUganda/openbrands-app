import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SplitHero() {
  return (
    <div className="relative min-h-[92vh] w-full overflow-hidden bg-[#F7F7F7] px-4 md:px-8 lg:px-12 pt-20 pb-12 lg:pt-24 flex items-center justify-center">
      
      {/* Background Vertical Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-evenly">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-full w-[1px] bg-black/[0.03]"></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
        
        {/* ── Left: Text Content (60%) ── */}
        <div className="relative z-10 w-full lg:w-[58%] flex flex-col justify-center order-1">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] tracking-tighter leading-[1.05] mb-5 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Qualified Property Inquiries.{' '}
            <span className="text-gray-400">Without the Guesswork.</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed mb-8 text-balance w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            We build strategic digital systems for real estate companies, developers, and premium property brands that turn professional presentation into predictable leads — not generic websites or scattered ads.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Link to="/contact">
              <button className="group flex items-center justify-center gap-2 rounded-full border border-transparent bg-cyan-400 px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-cyan-300 whitespace-nowrap">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full border-2 border-[#F7F7F7] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                <img className="w-9 h-9 rounded-full border-2 border-[#F7F7F7] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                <img className="w-9 h-9 rounded-full border-2 border-[#F7F7F7] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
              </div>
              <div className="flex flex-col">
                <div className="flex text-black">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  <Star className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 font-medium mt-0.5">Trusted globally</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Right: Image & Cards (42%) ── */}
        <motion.div 
          className="relative z-10 w-full lg:w-[42%] order-2 lg:-mr-8 xl:-mr-12"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {/* Image container — tall enough to hold all three cards without overlap */}
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10"
               style={{ minHeight: '520px', height: 'clamp(520px, 75vh, 700px)' }}>
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80" 
              alt="Modern Property" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            {/* Subtle brand overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent mix-blend-overlay pointer-events-none" />

            {/* ── Card 1: Inquiries — top-left ── */}
            <motion.div 
              className="absolute top-6 left-6 bg-white/92 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg border border-white/60 w-44 sm:w-52"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">This Month</p>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight leading-none">+43</p>
              <p className="text-xs text-gray-500 font-medium leading-snug mt-2">Qualified Property<br/>Inquiries</p>
            </motion.div>

            {/* ── Card 2: Notification — top-right ── */}
            <motion.div 
              className="absolute top-6 right-6 bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-lg border border-white/60 w-44 sm:w-52"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A] leading-snug">New Buyer Inquiry Received</p>
                  <p className="text-[11px] text-gray-400 mt-1">3 minutes ago</p>
                </div>
              </div>
            </motion.div>

            {/* ── Card 3: Campaign Performance — bottom, full-width ── */}
            <motion.div 
              className="absolute bottom-6 left-6 right-6 bg-white/92 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Campaign Performance</p>
              <div className="flex items-end gap-2 mb-3">
                <p className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight leading-none">4.7x</p>
                <span className="text-sm font-bold text-green-500 mb-0.5">↑ ROAS</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: '82%' }} />
              </div>
              <p className="text-xs text-gray-500">Return on Ad Spend · this campaign</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
