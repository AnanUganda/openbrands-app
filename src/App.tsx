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
      <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 bg-black dark text-zinc-50 overflow-clip pt-20 lg:pt-24">
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
