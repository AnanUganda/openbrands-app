import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Home } from '@/pages/Home';
import { Contact } from '@/pages/Contact';
import { About } from '@/pages/About';
import { Work } from '@/pages/Work';
import { Hiring } from '@/pages/Hiring';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Templates } from '@/pages/Templates';
import { TemplateDetail } from '@/pages/TemplateDetail';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 bg-[#F7F7F7] text-[#1A1A1A] overflow-clip relative">
        <div className="bg-[#1A1A1A] text-white py-2 px-4 text-center text-xs md:text-sm font-semibold w-full z-[60] relative tracking-wide uppercase">
          Website Under Development | Contact +256 754593472 For Inquiries
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:slug" element={<TemplateDetail />} />
        </Routes>
        <Footer />
      </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
