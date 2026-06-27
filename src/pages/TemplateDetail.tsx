import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, MessageCircle, CheckCircle2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { sanityClient, urlFor } from '@/lib/sanity';

interface Template {
  _id: string;
  title: string;
  slug: { current: string };
  tagline: string;
  description: any[];
  mainImage: any;
  screenshots: any[];
  liveUrl: string;
  price: number;
  isFree: boolean;
  category: string;
  techLabel: string;
  featured: boolean;
}

const QUERY = `*[_type == "template" && slug.current == $slug][0] {
  _id, title, slug, tagline, description, mainImage, screenshots,
  liveUrl, price, isFree, category, techLabel, featured, highlights
}`;

const RELATED_QUERY = `*[_type == "template" && slug.current != $slug && category == $category && defined(slug.current)][0..2] {
  _id, title, slug, tagline, mainImage, price, isFree, category
}`;

export function TemplateDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [template, setTemplate] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    sanityClient.fetch(QUERY, { slug }).then(async (data) => {
      setTemplate(data);
      setLoading(false);
      if (data?.mainImage) {
        setActiveImage(data.mainImage);
      }
      if (data?.category) {
        const rel = await sanityClient.fetch(RELATED_QUERY, { slug, category: data.category });
        setRelated(rel);
      }
    });
  }, [slug]);

  const whatsappUrl = template
    ? `https://wa.me/256754593472?text=${encodeURIComponent(`Hi, I'm interested in the "${template.title}" template.`)}`
    : '#';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-xl font-bold">Template not found.</p>
        <Link to="/projects" className="text-[#BFF549] hover:underline text-sm">← Back to Showcase</Link>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] text-white flex-1 pb-24">
      <Helmet>
        <title>{template.title} | Open Brands Templates</title>
        <meta name="description" content={template.tagline || `Premium real estate template — ${template.title}`} />
      </Helmet>

      {/* Hero Image */}
      <div className="relative w-full h-[45vh] md:h-[55vh] bg-[#161616] overflow-hidden border-b border-white/[0.08]">
        {activeImage ? (
          <img
            src={urlFor(activeImage).width(1600).url()}
            alt={template.title}
            className="w-full h-full object-cover opacity-75"
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80"
            alt={template.title}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />

        {/* Back button */}
        <Link
          to="/projects"
          className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur text-white text-sm font-semibold px-4 py-2 rounded-full shadow transition-all z-20"
        >
          <ArrowLeft className="w-4 h-4" /> All Work
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12">
          <div className="flex flex-wrap gap-2 mb-3">
            {template.isFree ? (
              <span className="bg-[#BFF549] text-[#0D0D0D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Free</span>
            ) : (
              <span className="bg-[#BFF549]/20 text-[#BFF549] border border-[#BFF549]/30 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Premium</span>
            )}
            {template.category && (
              <span className="bg-white/10 border border-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">{template.category}</span>
            )}
            {template.techLabel && (
              <span className="bg-white/10 border border-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">{template.techLabel}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow">
            {template.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: Description + Screenshots */}
          <div className="lg:col-span-2 space-y-10">

            {/* Tagline */}
            {template.tagline && (
              <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-[#BFF549] pl-5">
                {template.tagline}
              </p>
            )}

            {/* Rich Text Description */}
            {template.description && (
              <div className="prose prose-invert prose-gray max-w-none text-gray-300 leading-relaxed">
                <PortableText value={template.description} />
              </div>
            )}

            {/* Screenshots */}
            {template.screenshots?.length > 0 && (
              <div className="border-t border-white/[0.08] pt-10">
                <h2 className="text-xl font-bold text-white mb-4">Screenshots</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                  {/* Default main image option */}
                  <div
                    onClick={() => setActiveImage(template.mainImage)}
                    className={`shrink-0 rounded-2xl overflow-hidden border cursor-pointer shadow-sm w-44 md:w-56 h-32 transition-all duration-300 ${
                      activeImage === template.mainImage ? 'border-[#BFF549] scale-[1.03] ring-2 ring-[#BFF549]/20' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={urlFor(template.mainImage).width(300).height(200).url()}
                      alt="Widescreen Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {template.screenshots.map((img, i) => (
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

          {/* Right: Sticky CTA card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 bg-[#161616] rounded-3xl border border-white/[0.08] shadow-md p-7 flex flex-col gap-5"
            >
              {/* Price */}
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Price</p>
                <p className="text-4xl font-extrabold text-white tracking-tight leading-none">
                  {template.isFree ? 'Free' : `$${template.price}`}
                </p>
              </div>

              <div className="border-t border-white/[0.06]" />

              {/* What you get */}
              <div className="space-y-2">
                {template.highlights && template.highlights.length > 0 ? (
                  template.highlights.map((item: string) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-gray-300 leading-tight">
                      <CheckCircle2 className="w-4 h-4 text-[#BFF549] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  ['Full source code', 'Free updates', 'WhatsApp support'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#BFF549] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/[0.06]" />

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-2xl text-sm font-bold hover:bg-[#1ebe5d] transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire on WhatsApp
                </a>
                {template.liveUrl && (
                  <a
                    href={template.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white px-5 py-3.5 rounded-2xl text-sm font-semibold hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </a>
                )}
              </div>

              <p className="text-[11px] text-gray-500 text-center">
                We'll respond on WhatsApp within 24 hours.
              </p>
            </motion.div>
          </div>

        </div>

        {/* Related Templates */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-white/[0.08] pt-12">
            <h2 className="text-2xl font-bold text-white mb-8">More {template.category} Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t) => (
                <Link key={t._id} to={`/templates/${t.slug?.current || ""}`}
                  className="group bg-[#161616]/40 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden hover:border-[#BFF549]/40 hover:bg-[#161616]/60 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-44 bg-[#161616] overflow-hidden border-b border-white/[0.08]">
                    {t.mainImage && (
                      <img src={urlFor(t.mainImage).width(500).url()} alt={t.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-bold text-white text-sm group-hover:text-[#BFF549] transition-colors">{t.title}</p>
                      <span className="text-sm font-bold text-[#BFF549] shrink-0">
                        {t.isFree ? 'Free' : `$${t.price}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{t.tagline}</p>
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
