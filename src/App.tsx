import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Home } from '@/pages/Home';
import { Contact } from '@/pages/Contact';
import { About } from '@/pages/About';
import { Portfolio } from '@/pages/Portfolio';
import { PortfolioDetail } from '@/pages/PortfolioDetail';
import { Hiring } from '@/pages/Hiring';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { NotFound } from '@/pages/NotFound';

import { SmoothScroll } from '@/components/ui/smooth-scroll';

/** Redirects the retired /projects/:slug and /templates/:slug URLs to /portfolio/:slug. */
function LegacyDetailRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/portfolio/${slug}`} replace />;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans selection:bg-[#BFF549]/40 bg-[#FBFBFB] text-[#0D0D0D] relative">

            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<Navigate to="/" replace />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
              {/* Legacy URLs kept alive so old links and search results don't 404 */}
              <Route path="/projects" element={<Navigate to="/portfolio" replace />} />
              <Route path="/templates" element={<Navigate to="/portfolio" replace />} />
              <Route path="/projects/:slug" element={<LegacyDetailRedirect />} />
              <Route path="/templates/:slug" element={<LegacyDetailRedirect />} />
              <Route path="/hiring" element={<Hiring />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* Catch-all: any unknown URL → 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </SmoothScroll>
      </BrowserRouter>
    </HelmetProvider>
  );
}
