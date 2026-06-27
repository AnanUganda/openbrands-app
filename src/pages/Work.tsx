import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Code, Briefcase } from "lucide-react";
import { sanityClient, urlFor } from "@/lib/sanity";

interface ShowcaseItem {
  _id: string;
  _type: 'project' | 'template';
  title: string;
  slug: { current: string };
  category: string;
  metrics?: string;
  tagline?: string;
  mainImage: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  price?: number;
  isFree?: boolean;
  techLabel?: string;
  featured?: boolean;
  liveUrl?: string;
}

export function Work() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type in ["project", "template"] && defined(slug.current)] | order(featured desc, publishedAt desc) {
            _id,
            _type,
            title,
            slug,
            category,
            metrics,
            tagline,
            mainImage,
            price,
            isFree,
            techLabel,
            featured,
            liveUrl
          }`
        );
        setItems(data);
      } catch (err) {
        console.error("Error fetching showcase items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShowcase();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] overflow-hidden flex-1 pb-24 text-white">
      <Helmet>
        <title>Projects & Templates | Open Brands</title>
        <meta name="description" content="Explore our portfolio of B2B lead generation projects and premium website templates designed for serious property brands." />
      </Helmet>

      {/* Background structural grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      }} />

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 pt-20 md:pt-28 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm border-l-2 border-[#BFF549] bg-white/[0.03] text-xs font-bold tracking-widest uppercase text-gray-300 shadow-sm backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#BFF549]" />
            Projects & Templates
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-white tracking-tighter mb-8 leading-[1.05] drop-shadow-lg">
            Our Work & <span className="text-gray-500">Digital Assets</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed text-balance">
            A curated, high-end collection of conversion-focused website templates and successful real-world pipeline outcomes we've engineered for our B2B clients.
          </p>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20">
        {/* Assets Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#161616] rounded-xl border border-white/[0.08] overflow-hidden animate-pulse aspect-[4/3] p-6 space-y-4">
                <div className="w-full h-44 bg-white/[0.05] rounded-lg" />
                <div className="h-4 bg-white/[0.05] rounded w-1/3" />
                <div className="h-6 bg-white/[0.05] rounded w-3/4" />
                <div className="h-4 bg-white/[0.05] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border border-white/[0.08] bg-[#161616] shadow-sm rounded-xl px-6"
          >
            <h3 className="text-2xl font-bold text-white mb-2">No showcase items found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We are currently updating our portfolio. Check back shortly to explore our latest projects and premium templates!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map((item, idx) => {
              const isProject = item._type === 'project';
              const detailUrl = isProject 
                ? `/projects/${item.slug.current}` 
                : `/templates/${item.slug.current}`;
              
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group flex flex-col bg-[#161616]/40 backdrop-blur-sm border border-white/[0.08] shadow-sm rounded-2xl overflow-hidden hover:border-[#BFF549]/40 hover:bg-[#161616]/60 transition-all duration-500 relative"
                >
                  {/* Image / Cover Section */}
                  <Link to={detailUrl} className="aspect-[4/3] bg-[#161616] overflow-hidden relative border-b border-white/[0.08] shrink-0 block">
                    {item.mainImage ? (
                      <img
                        src={urlFor(item.mainImage).width(800).height(600).url()}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                        fetchPriority={idx < 3 ? "high" : "auto"}
                      />
                    ) : (
                      <img
                        src={isProject 
                          ? "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
                          : "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover opacity-75 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                      />
                    )}
                    
                    {/* Badge overlays */}
                    <div className="absolute top-4 left-4 flex gap-2 z-20">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-1 border ${
                        isProject
                          ? 'bg-white/[0.1] text-white border-white/[0.2] backdrop-blur-md'
                          : 'bg-[#BFF549] text-[#0D0D0D] border-[#BFF549]'
                      }`}>
                        {isProject ? <Briefcase className="w-3 h-3" /> : <Code className="w-3 h-3" />}
                        {isProject ? 'Project' : 'Template'}
                      </span>
                      {item.featured && (
                        <span className="bg-[#BFF549]/10 text-[#BFF549] border border-[#BFF549]/30 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                          ★ Featured
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow relative z-20">
                    <div className="flex items-center justify-between mb-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      <span>{item.category}</span>
                      {item.techLabel && (
                        <span className="bg-white/[0.05] text-[#BFF549] px-2 py-0.5 rounded-sm text-[9px] border border-white/[0.08] font-semibold">
                          {item.techLabel}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-6 group-hover:text-[#BFF549] transition-colors line-clamp-2 leading-snug tracking-tight">
                      <Link to={detailUrl}>
                        {item.title}
                      </Link>
                    </h3>

                    <div className="pt-4 border-t border-white/[0.06] mt-auto flex items-center justify-between">
                      {/* Highlight Stat / Price */}
                      <div>
                        <div className="text-base font-bold text-white tracking-tight leading-none">
                          {isProject ? (
                            item.metrics || "Success story"
                          ) : (
                            item.isFree ? 'Free' : `$${item.price}`
                          )}
                        </div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                          {isProject ? 'Outcome' : 'Investment'}
                        </div>
                      </div>

                      {/* Explore Button */}
                      <Link
                        to={detailUrl}
                        className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-white hover:bg-[#BFF549] hover:text-[#0D0D0D] hover:border-[#BFF549] hover:shadow-[0_0_15px_rgba(191,245,73,0.3)] transition-all duration-300 group/btn shrink-0"
                      >
                        <span>Explore</span>
                        <div className="relative w-3 h-3 overflow-hidden shrink-0">
                          <ArrowUpRight className="w-3 h-3 absolute inset-0 transition-transform duration-300 ease-out group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
                          <ArrowUpRight className="w-3 h-3 absolute inset-0 -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
