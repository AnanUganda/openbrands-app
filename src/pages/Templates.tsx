import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import { sanityClient, urlFor } from '@/lib/sanity';

interface Template {
  _id: string;
  title: string;
  slug: { current: string };
  tagline: string;
  mainImage: any;
  price: number;
  isFree: boolean;
  category: string;
  techLabel: string;
  featured: boolean;
  liveUrl: string;
}

const CATEGORIES = ['All', 'Luxury', 'Residential', 'Commercial', 'Landing Page', 'Free'];

const QUERY = `*[_type == "template"] | order(featured desc, publishedAt desc) {
  _id, title, slug, tagline, mainImage, price, isFree, category, techLabel, featured, liveUrl
}`;

export function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    sanityClient.fetch(QUERY).then((data) => {
      setTemplates(data);
      setLoading(false);
    });
  }, []);

  const featured = templates.find((t) => t.featured);
  const filtered = templates.filter((t) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Free') return t.isFree;
    return t.category === activeFilter;
  });

  return (
    <div className="relative w-full min-h-screen bg-[#F7F7F7] flex-1">
      <Helmet>
        <title>Real Estate Website Templates | Open Brands</title>
        <meta name="description" content="Premium real estate website templates — vibe coded, conversion-focused, and ready to launch. Browse luxury, residential, and commercial options." />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 lg:px-12 pt-16 pb-14">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3"
          >
            Templates & Starter Kits
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tighter mb-4"
          >
            Real Estate Website Templates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Professionally built, conversion-focused templates for property developers,
            agents, and real estate brands. Inquire on WhatsApp to get started.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">

        {/* Featured Banner */}
        {featured && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col lg:flex-row"
          >
            {featured.mainImage && (
              <div className="w-full lg:w-1/2 h-64 lg:h-auto">
                <img
                  src={urlFor(featured.mainImage).width(800).url()}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-8 lg:p-12 w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Featured
                </span>
                {featured.category && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {featured.category}
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-gray-500 mb-6">{featured.tagline}</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#1A1A1A]">
                  {featured.isFree ? 'Free' : `$${featured.price}`}
                </span>
                <Link to={`/templates/${featured.slug.current}`}>
                  <button className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all">
                    See Details <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                {featured.liveUrl && (
                  <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gray-200 bg-white text-[#1A1A1A] px-5 py-2.5 rounded-full text-sm font-semibold hover:border-gray-300 transition-all">
                    Live Demo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === cat
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">No templates in this category yet.</p>
            <p className="text-sm mt-2">Check back soon — more are being added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, idx) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.5 }}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 bg-gray-100 overflow-hidden">
                  {t.mainImage ? (
                    <img
                      src={urlFor(t.mainImage).width(600).url()}
                      alt={t.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No preview</div>
                  )}
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {t.featured && (
                      <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" /> Featured
                      </span>
                    )}
                    {t.isFree && (
                      <span className="bg-green-400 text-green-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-[#1A1A1A] text-base leading-tight">{t.title}</h3>
                    <span className="text-base font-bold text-[#1A1A1A] shrink-0">
                      {t.isFree ? 'Free' : `$${t.price}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 leading-snug">{t.tagline}</p>
                  <div className="flex items-center gap-2 mb-4">
                    {t.category && (
                      <span className="bg-gray-100 text-gray-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {t.category}
                      </span>
                    )}
                    {t.techLabel && (
                      <span className="bg-cyan-50 text-cyan-700 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-cyan-100">
                        {t.techLabel}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {t.liveUrl && (
                      <a
                        href={t.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-200 text-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all"
                      >
                        Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <Link to={`/templates/${t.slug.current}`} className="flex-1">
                      <button className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1A1A1A] text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all">
                        Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
