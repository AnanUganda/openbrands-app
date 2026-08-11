import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, MessageCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { sanityClient, urlFor } from "@/lib/sanity";

interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  clientName?: string;
  category?: string;
  tagline?: string;
  metrics?: string;
  mainImage: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  screenshots?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  description?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  highlights?: string[];
  techLabel?: string;
  liveUrl?: string;
  featured?: boolean;
  publishedAt?: string;
}

const QUERY = `*[_type == "portfolio" && slug.current == $slug][0] {
  _id, title, slug, clientName, category, tagline, metrics, mainImage,
  screenshots, description, highlights, techLabel, liveUrl, featured, publishedAt
}`;

const RELATED_QUERY = `*[_type == "portfolio" && slug.current != $slug && category == $category && defined(slug.current)] | order(featured desc, publishedAt desc) [0..2] {
  _id, title, slug, tagline, metrics, mainImage, category
}`;

const DEFAULT_HIGHLIGHTS = [
  "Highly converting visual funnel",
  "Integrated CRM automations",
  "Custom speed-optimized engine",
  "Tailored client dashboards",
];

export function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [related, setRelated] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    const fetchItem = async () => {
      try {
        const data = await sanityClient.fetch(QUERY, { slug });
        setItem(data);
        setActiveImage(data?.mainImage ?? null);

        if (data?.category) {
          const rel = await sanityClient.fetch(RELATED_QUERY, { slug, category: data.category });
          setRelated(rel);
        } else {
          setRelated([]);
        }
      } catch (err) {
        console.error("Error fetching portfolio item:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [slug]);

  const whatsappUrl = item
    ? `https://wa.me/256754593472?text=${encodeURIComponent(
        `Hi Anan, I'm interested in building a system similar to the "${item.title}" project (${item.metrics || 'Client Project'}).`
      )}`
    : "#";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-xl font-bold">Project not found.</p>
        <Link to="/portfolio" className="text-[#BFF549] hover:underline text-sm">← Back to Portfolio</Link>
      </div>
    );
  }

  const highlights = item.highlights?.length ? item.highlights : DEFAULT_HIGHLIGHTS;

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!value?.asset?._ref) return null;
        return (
          <img
            alt={value.alt || item.title}
            src={urlFor(value).width(1200).url()}
            className="rounded-2xl my-10 w-full border border-white/[0.08]"
          />
        );
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-16 mb-8 text-white tracking-tight">{children}</h1>, // eslint-disable-line @typescript-eslint/no-explicit-any
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white tracking-tight">{children}</h2>, // eslint-disable-line @typescript-eslint/no-explicit-any
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-200 tracking-tight">{children}</h3>, // eslint-disable-line @typescript-eslint/no-explicit-any
      normal: ({ children }: any) => <p className="text-lg text-gray-400 leading-relaxed mb-8">{children}</p>, // eslint-disable-line @typescript-eslint/no-explicit-any
      blockquote: ({ children }: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
        <blockquote className="border-l-4 border-[#BFF549] bg-[#BFF549]/5 p-6 rounded-r-2xl italic text-xl text-gray-300 my-10 leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-8 text-gray-400 space-y-3 text-lg leading-relaxed">{children}</ul>, // eslint-disable-line @typescript-eslint/no-explicit-any
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-8 text-gray-400 space-y-3 text-lg leading-relaxed">{children}</ol>, // eslint-disable-line @typescript-eslint/no-explicit-any
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] flex-1 pb-24 text-white">
      <Helmet>
        <title>{item.title} | Open Brands Portfolio</title>
        <meta
          name="description"
          content={item.tagline || `See the strategy and results we delivered for ${item.clientName || item.title}.`}
        />
      </Helmet>

      {/* 1. CINEMATIC WIDESCREEN HERO COVER */}
      <div className="relative w-full h-[45vh] md:h-[60vh] bg-black overflow-hidden border-b border-white/[0.08]">
        {activeImage ? (
          <img
            src={urlFor(activeImage).width(1600).height(800).url()}
            alt={item.title}
            className="w-full h-full object-cover opacity-75"
            fetchPriority="high"
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt={item.title}
            className="w-full h-full object-cover opacity-60"
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/20 to-black/40 pointer-events-none" />

        {/* Floating Back to Portfolio trigger */}
        <Link
          to="/portfolio"
          className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow transition-all z-20"
        >
          <ArrowLeft className="w-4 h-4" /> All Work
        </Link>

        {/* Title overlays */}
        <div className="absolute bottom-12 left-6 right-6 md:left-12 max-w-4xl z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.clientName && (
              <span className="bg-[#BFF549] text-[#0D0D0D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {item.clientName}
              </span>
            )}
            {item.category && (
              <span className="bg-white/10 border border-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {item.category}
              </span>
            )}
            {item.techLabel && (
              <span className="bg-white/10 border border-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {item.techLabel}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md leading-tight">
            {item.title}
          </h1>
        </div>
      </div>

      {/* 2. MAIN GRID CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN: Overview & Detailed Screenshots */}
          <div className="lg:col-span-2 space-y-12">

            {/* Tagline */}
            {item.tagline && (
              <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-[#BFF549] pl-5">
                {item.tagline}
              </p>
            )}

            {/* Headline metric */}
            {item.metrics && (
              <div className="bg-[#BFF549]/5 border-l-4 border-[#BFF549] p-6 rounded-r-3xl flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-[#BFF549] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-[#BFF549]/80 uppercase tracking-widest mb-1">Key Performance Indicator</h4>
                  <p className="text-2xl font-black text-white tracking-tight">{item.metrics} achieved.</p>
                </div>
              </div>
            )}

            {/* Rich text case study */}
            {item.description ? (
              <div className="prose prose-invert prose-gray max-w-none text-gray-300 leading-relaxed">
                <PortableText value={item.description} components={portableTextComponents} />
              </div>
            ) : (
              <p className="text-gray-500 italic">This project does not have detailed text documented yet.</p>
            )}

            {/* Screenshots Slide-Carousel */}
            {item.screenshots && item.screenshots.length > 0 && (
              <div className="border-t border-white/[0.08] pt-10">
                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">System Showcase</h3>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                  {/* Default main image option */}
                  {item.mainImage && (
                    <div
                      onClick={() => setActiveImage(item.mainImage)}
                      className={`shrink-0 rounded-2xl overflow-hidden border cursor-pointer shadow-sm w-44 md:w-56 h-32 transition-all duration-300 ${
                        activeImage === item.mainImage ? 'border-[#BFF549] scale-[1.03] ring-2 ring-[#BFF549]/20' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={urlFor(item.mainImage).width(300).height(200).url()}
                        alt="Widescreen Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {item.screenshots.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`shrink-0 rounded-2xl overflow-hidden border cursor-pointer shadow-sm w-44 md:w-56 h-32 transition-all duration-300 ${
                        activeImage === img ? 'border-[#BFF549] scale-[1.03] ring-2 ring-[#BFF549]/20' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={urlFor(img).width(300).height(200).url()}
                        alt={`Screenshot ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">Click any card to expand it as the hero image above.</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sticky Conversion card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="sticky top-24 bg-[#161616] rounded-3xl border border-white/[0.08] shadow-md p-8 flex flex-col gap-6"
            >
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
                  {item.metrics ? 'Success Metric' : 'Client'}
                </p>
                <p className="text-4xl font-extrabold text-white tracking-tight leading-none">
                  {item.metrics || item.clientName || "Qualified"}
                </p>
                <p className="text-xs text-gray-500 font-semibold mt-2">Verified client outcome.</p>
              </div>

              <div className="border-t border-white/[0.06]" />

              {/* What is included section */}
              <div>
                <h5 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">Capabilities</h5>
                <div className="space-y-3">
                  {highlights.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-sm text-gray-300 leading-tight">
                      <CheckCircle2 className="w-4 h-4 text-[#BFF549] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/[0.06]" />

              {/* Strategic CTA Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-4 rounded-2xl text-sm font-extrabold hover:bg-[#1ebe5d] transition-all shadow-sm shadow-[#25D366]/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire on WhatsApp
                </a>

                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white px-5 py-4 rounded-2xl text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Live Website
                  </a>
                )}
              </div>

              <p className="text-[10px] text-gray-500 text-center font-semibold uppercase tracking-wider">
                We typically respond on WhatsApp in minutes.
              </p>
            </motion.div>
          </div>

        </div>

        {/* Related work */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-white/[0.08] pt-12">
            <h2 className="text-2xl font-bold text-white mb-8">More {item.category} Work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r._id} to={`/portfolio/${r.slug?.current || ""}`}
                  className="group bg-[#161616]/40 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden hover:border-[#BFF549]/40 hover:bg-[#161616]/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-44 bg-[#161616] overflow-hidden border-b border-white/[0.08]">
                    {r.mainImage && (
                      <img src={urlFor(r.mainImage).width(500).url()} alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-bold text-white text-sm group-hover:text-[#BFF549] transition-colors">{r.title}</p>
                      {r.metrics && (
                        <span className="text-sm font-bold text-[#BFF549] shrink-0">{r.metrics}</span>
                      )}
                    </div>
                    {r.tagline && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{r.tagline}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
