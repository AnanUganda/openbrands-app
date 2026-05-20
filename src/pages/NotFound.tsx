import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="relative w-full min-h-screen bg-[#F7F7F7] flex items-center justify-center flex-1 px-4">
      <Helmet>
        {/* Tell Google this is truly a 404 page */}
        <title>Page Not Found | Open Brands</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-8xl font-black text-gray-100 tracking-tighter mb-2 select-none">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-4">
            Page not found
          </h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            This page doesn't exist or may have been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <button className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black transition-all">
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 border border-gray-200 bg-white text-[#1A1A1A] px-6 py-3 rounded-full text-sm font-semibold hover:border-gray-300 transition-all">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
