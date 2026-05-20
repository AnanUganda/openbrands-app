import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SplitHero() {
  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden bg-[#F7F7F7] px-4 md:px-8 lg:px-12 pt-28 pb-12 lg:pt-32 flex items-center justify-center">
      
      {/* Background Vertical Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-evenly">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-full w-[1px] bg-black/[0.03]"></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="relative z-10 w-full lg:w-3/5 flex flex-col justify-center lg:pr-8 xl:pr-12">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] tracking-tighter leading-[1.05] mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Qualified Property Inquiries. <span className="text-gray-400">Without the Guesswork.</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 text-balance w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            We build strategic digital systems for real estate companies, developers, and premium property brands that turn professional presentation into predictable leads — not generic websites or scattered ads.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Link to="/collection">
              <button className="group flex items-center justify-center gap-2 rounded-full border border-transparent bg-cyan-400 px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-cyan-300">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-[#F7F7F7] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-[#F7F7F7] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-[#F7F7F7] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
              </div>
              <div className="flex flex-col">
                <div className="flex text-black">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500 font-medium mt-0.5">Trusted globally</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Image & Cards */}
        <motion.div 
          className="relative z-10 w-full lg:w-2/5 h-[60vh] lg:h-[80vh] min-h-[500px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80" 
              alt="Modern Property" 
              className="w-full h-full object-cover"
            />
            
            {/* Subtle brand cyan gradient overlay for integration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent mix-blend-overlay pointer-events-none"></div>

            {/* Card: Offer */}
            <motion.div 
              className="absolute top-8 left-8 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 w-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              whileHover={{ y: -5 }}
            >
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Limited Offer</p>
              <p className="text-2xl font-bold text-[#1A1A1A] mb-3">15% Off</p>
              <button className="w-full bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-sm font-semibold py-2 rounded-xl transition-colors">
                Inquire
              </button>
            </motion.div>

            {/* Card: Virtual Tour */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-3 pr-5 shadow-lg border border-white/50 flex items-center gap-3 cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                <Play className="w-4 h-4 text-[#1A1A1A] ml-1 group-hover:text-cyan-600 transition-colors" />
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A]">Virtual Tour</span>
            </motion.div>

            {/* Card: Property Details */}
            <motion.div 
              className="absolute bottom-8 right-8 left-8 sm:left-auto sm:w-80 bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              whileHover={{ y: -5 }}
            >
              <p className="text-sm font-medium text-gray-500 mb-1">The Ridge House</p>
              <p className="text-3xl font-bold text-[#1A1A1A] mb-3 tracking-tight">$2,850,000</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Contemporary masterpiece with panoramic valley views and brand-new amenities.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
