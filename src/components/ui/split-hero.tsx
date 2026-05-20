import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Star } from 'lucide-react';
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
        <div className="relative z-10 w-full lg:w-[58%] flex flex-col justify-center order-2 lg:order-1">
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

        {/* ── Right: Image & Cards (42%) — extends left via negative margin ── */}
        <motion.div 
          className="relative z-10 w-full lg:w-[42%] order-1 lg:order-2 lg:-mr-8 xl:-mr-12"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {/* Image container — taller on desktop, shorter on mobile */}
          <div className="relative w-full h-[55vw] sm:h-[50vw] md:h-[45vw] lg:h-[78vh] min-h-[300px] max-h-[700px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80" 
              alt="Modern Property" 
              className="w-full h-full object-cover object-center"
            />
            
            {/* Subtle brand overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent mix-blend-overlay pointer-events-none"></div>

            {/* Card: Offer */}
            <motion.div 
              className="absolute top-5 left-5 sm:top-8 sm:left-8 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 shadow-lg border border-white/50 w-32 sm:w-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              whileHover={{ y: -5 }}
            >
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Limited Offer</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-2 sm:mb-3">15% Off</p>
              <button className="w-full bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-xl transition-colors">
                Inquire
              </button>
            </motion.div>

            {/* Card: Virtual Tour */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 bg-white/90 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 pr-4 sm:pr-5 shadow-lg border border-white/50 flex items-center gap-2 sm:gap-3 cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-cyan-50 transition-colors shrink-0">
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-[#1A1A1A] ml-0.5 sm:ml-1 group-hover:text-cyan-600 transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A] whitespace-nowrap">Virtual Tour</span>
            </motion.div>

            {/* Card: Property Details */}
            <motion.div 
              className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 md:left-auto md:right-6 md:w-72 lg:w-80 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              whileHover={{ y: -5 }}
            >
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">The Ridge House</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 sm:mb-3 tracking-tight">$2,850,000</p>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Contemporary masterpiece with panoramic valley views and brand-new amenities.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
