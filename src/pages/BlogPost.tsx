import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "post" && slug.current == $slug][0] {
            title,
            publishedAt,
            body,
            mainImage,
            authorName,
            authorRole,
            authorImage
          }`,
          { slug }
        );
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center text-[#1A1A1A] px-6">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-cyan-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>
    );
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!value?.asset?._ref) return null;
        return (
          <img
            alt={value.alt || "Article Image"}
            src={urlFor(value).width(1000).url()}
            className="rounded-[2rem] my-10 w-full border border-gray-200 shadow-sm"
          />
        );
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-3xl sm:text-4xl font-black mt-16 mb-6 text-[#1A1A1A] tracking-tight">{children}</h1>, // eslint-disable-line @typescript-eslint/no-explicit-any
      h2: ({ children }: any) => <h2 className="text-2xl sm:text-3xl font-extrabold mt-12 mb-5 text-[#1A1A1A] tracking-tight">{children}</h2>, // eslint-disable-line @typescript-eslint/no-explicit-any
      h3: ({ children }: any) => <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-gray-800 tracking-tight">{children}</h3>, // eslint-disable-line @typescript-eslint/no-explicit-any
      normal: ({ children }: any) => <p className="text-[17px] sm:text-[18px] text-gray-600 leading-[1.85] mb-8 font-normal">{children}</p>, // eslint-disable-line @typescript-eslint/no-explicit-any
      blockquote: ({ children }: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
        <blockquote className="border-l-[6px] border-cyan-500 pl-8 py-2 italic text-xl sm:text-2xl text-gray-800 my-12 leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-3 text-[17px] sm:text-[18px]">{children}</ul>, // eslint-disable-line @typescript-eslint/no-explicit-any
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-8 text-gray-600 space-y-3 text-[17px] sm:text-[18px]">{children}</ol>, // eslint-disable-line @typescript-eslint/no-explicit-any
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F7F7F7] overflow-hidden flex-1 pb-32">
      <Helmet>
        <title>{post.title} | Open Brands</title>
        <meta name="description" content={`Read ${post.title} on Open Brands`} />
      </Helmet>
      
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-blue-700 origin-left z-[200]" 
        style={{ scaleX }} 
      />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40 relative z-10">
        
        {/* Centered top header to take after reference layout */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-500 transition-colors mb-8 text-xs font-bold tracking-widest uppercase">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[1.15] mb-8 text-balance">
            {post.title}
          </h1>
          
          <div className="flex justify-center items-center gap-6 text-xs sm:text-sm font-bold tracking-wider text-gray-400 uppercase">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-500" />
              {new Date(post.publishedAt || new Date()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
            {post.authorName && (
              <div className="flex items-center gap-1.5">
                <span>By</span>
                <span className="text-cyan-500 font-extrabold">{post.authorName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tall featured image with action overlay matching the reference image layout */}
        {post.mainImage && (
          <div className="max-w-5xl mx-auto aspect-[16/10] md:aspect-[16/9] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-gray-200/80 mb-16 sm:mb-20 shadow-xl shadow-gray-200/30 relative group">
            <img 
              src={urlFor(post.mainImage).width(1600).height(900).url()} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
            />
            {/* Play/Action overlay */}
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none transition-colors duration-300 group-hover:bg-black/10">
              <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-cyan-600 shadow-xl transform scale-95 group-hover:scale-100 transition-transform duration-300">
                <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Double-column grid section: Author card sticky sidebar on the left, article text on the right */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left column: Sticky Author Sidebar Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 text-center shadow-lg shadow-gray-200/20 flex flex-col items-center">
                {/* Avatar Portrait */}
                {post.authorImage ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-50/50 shadow-md mb-6">
                    <img 
                      src={urlFor(post.authorImage).width(200).height(200).url()} 
                      alt={post.authorName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 flex items-center justify-center mb-6 shadow-inner border border-cyan-100/50">
                    <User className="w-10 h-10" />
                  </div>
                )}
                
                {/* Author Details */}
                <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-1">{post.authorName || "Open Brands Expert"}</h3>
                <p className="text-xs font-bold tracking-wider uppercase text-cyan-500 mb-6">{post.authorRole || "Growth Strategist"}</p>
                
                {/* Line Separator */}
                <div className="w-12 h-[2px] bg-cyan-100 mb-6" />
                
                {/* Centered Social Icons matching the reference card exactly */}
                <div className="flex gap-4">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:border-cyan-200 hover:bg-cyan-50/20 transition-all duration-300"
                    aria-label="Twitter Profile"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:border-cyan-200 hover:bg-cyan-50/20 transition-all duration-300"
                    aria-label="Facebook Profile"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-cyan-500 hover:border-cyan-200 hover:bg-cyan-50/20 transition-all duration-300"
                    aria-label="Instagram Profile"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: Article Body / Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                {post.body ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <p className="text-gray-500 italic">This post has no content.</p>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
