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
  liveUrl, price, isFree, category, techLabel, featured
}`;

const RELATED_QUERY = `*[_type == "template" && slug.current != $slug && category == $category][0..2] {
  _id, title, slug, tagline, mainImage, price, isFree, category
}`;

export function TemplateDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    sanityClient.fetch(QUERY, { slug }).then(async (data) => {
      setTemplate(data);
      setLoading(false);
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
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#1A1A1A] border-t-transparent" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold text-[#1A1A1A]">Template not found.</p>
        <Link to="/templates" className="text-cyan-600 underline text-sm">← Back to Templates</Link>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#F7F7F7] flex-1">
      <Helmet>
        <title>{template.title} | Open Brands Templates</title>
        <meta name="description" content={template.tagline || `Premium real estate template — ${template.title}`} />
      </Helmet>

      {/* Hero Image */}
      <div className="relative w-full h-[45vh] md:h-[55vh] bg-gray-200 overflow-hidden">
        {template.mainImage ? (
          <img
            src={urlFor(template.mainImage).width(1600).url()}
            alt={template.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back button */}
        <Link
          to="/templates"
          className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/90 backdrop-blur text-[#1A1A1A] text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> All Templates
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-6 right-6 md:left-12">
          <div className="flex flex-wrap gap-2 mb-3">
            {template.isFree && (
              <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full">Free</span>
            )}
            {template.category && (
              <span className="bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{template.category}</span>
            )}
            {template.techLabel && (
              <span className="bg-cyan-400/90 text-cyan-900 text-xs font-semibold px-3 py-1 rounded-full">{template.techLabel}</span>
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
              <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-cyan-400 pl-5">
                {template.tagline}
              </p>
            )}

            {/* Rich Text Description */}
            {template.description && (
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                <PortableText value={template.description} />
              </div>
            )}

            {/* Screenshots */}
            {template.screenshots?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Screenshots</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                  {template.screenshots.map((img, i) => (
                    <div key={i} className="shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm w-64 md:w-80 h-48">
                      <img
                        src={urlFor(img).width(640).url()}
                        alt={`Screenshot ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky CTA card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 bg-white rounded-3xl border border-gray-200 shadow-md p-7 flex flex-col gap-5"
            >
              {/* Price */}
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Price</p>
                <p className="text-4xl font-bold text-[#1A1A1A] tracking-tight">
                  {template.isFree ? 'Free' : `$${template.price}`}
                </p>
              </div>

              <div className="border-t border-gray-100" />

              {/* What you get */}
              <div className="space-y-2">
                {['Full source code', 'Free updates', 'WhatsApp support'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100" />

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
                    className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-[#1A1A1A] px-5 py-3.5 rounded-2xl text-sm font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </a>
                )}
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                We'll respond on WhatsApp within 24 hours.
              </p>
            </motion.div>
          </div>

        </div>

        {/* Related Templates */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">More {template.category} Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((t) => (
                <Link key={t._id} to={`/templates/${t.slug.current}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="h-44 bg-gray-100 overflow-hidden">
                    {t.mainImage && (
                      <img src={urlFor(t.mainImage).width(500).url()} alt={t.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-bold text-[#1A1A1A] text-sm">{t.title}</p>
                      <span className="text-sm font-bold text-[#1A1A1A] shrink-0">
                        {t.isFree ? 'Free' : `$${t.price}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{t.tagline}</p>
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
