import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
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

const SITE_URL = 'https://www.openbrands.studio';
const DEFAULT_TITLE = 'Open Brands | Results-Driven B2B Marketing Agency';
const DEFAULT_DESCRIPTION =
  'We build structured, done-for-you lead generation systems that drive real growth for B2B service businesses and high-ticket offers.';
const SHARE_IMAGE = `${SITE_URL}/open-brands-logo.png`;

/**
 * Site-wide head defaults. Individual pages render their own <Helmet> after this
 * one, so anything they set (title, description, og:*, canonical) wins.
 */
function SiteHead() {
  const { pathname } = useLocation();
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname.replace(/\/$/, '')}`;

  // React 19 hoists metadata natively rather than de-duplicating it, so every tag
  // needs exactly one owner. The blog pages set their own social tags.
  const pageOwnsSocialTags = pathname === '/blog' || pathname.startsWith('/blog/');

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      {!pageOwnsSocialTags && <meta property="og:type" content="website" />}
      {!pageOwnsSocialTags && <meta property="og:site_name" content="Open Brands" />}
      {!pageOwnsSocialTags && <meta property="og:title" content={DEFAULT_TITLE} />}
      {!pageOwnsSocialTags && <meta property="og:description" content={DEFAULT_DESCRIPTION} />}
      {!pageOwnsSocialTags && <meta property="og:url" content={canonical} />}
      {!pageOwnsSocialTags && <meta property="og:image" content={SHARE_IMAGE} />}
      {!pageOwnsSocialTags && <meta name="twitter:card" content="summary_large_image" />}
      {!pageOwnsSocialTags && <meta name="twitter:title" content={DEFAULT_TITLE} />}
      {!pageOwnsSocialTags && <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />}
      {!pageOwnsSocialTags && <meta name="twitter:image" content={SHARE_IMAGE} />}
    </Helmet>
  );
}

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
          <SiteHead />
          <div className="min-h-screen flex flex-col font-sans selection:bg-[#BFF549]/40 bg-[#FBFBFB] text-[#0D0D0D] relative">

            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
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
