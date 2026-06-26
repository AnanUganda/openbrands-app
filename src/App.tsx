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
import { NotFound } from '@/pages/NotFound';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#BFF549]/30 bg-[#0D0D0D] text-[#F0F0F0] overflow-clip relative">

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Work />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Catch-all: any unknown URL → 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
