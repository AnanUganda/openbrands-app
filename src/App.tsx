import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Home } from '@/pages/Home';
import { Contact } from '@/pages/Contact';
import { About } from '@/pages/About';
import { Work } from '@/pages/Work';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Dev Banner */}
      <div className="fixed top-0 left-0 w-full bg-cyan-400 text-black text-center text-[10px] md:text-xs font-bold py-1.5 z-[9999] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
        Website currently in development
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
      </div>
      <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 bg-black dark text-zinc-50 overflow-clip pt-24 lg:pt-28">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
