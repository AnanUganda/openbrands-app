import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchPost = async () => {
      const data = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
          title,
          publishedAt,
          body,
          mainImage,
          "authorName": author->name,
          "authorImage": author->image
        }`,
        { slug }
      );
      setPost(data);
      setLoading(false);
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
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <img
            alt={value.alt || "Article Image"}
            src={urlFor(value).width(1000).url()}
            className="rounded-3xl my-12 w-full border border-gray-200 shadow-sm"
          />
        );
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-16 mb-8 text-[#1A1A1A]">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-[#1A1A1A]">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">{children}</h3>,
      normal: ({ children }: any) => <p className="text-[19px] text-gray-600 leading-[1.8] mb-8">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-cyan-600 bg-cyan-50 p-6 rounded-r-2xl italic text-xl text-gray-700 my-10">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-3 text-[19px]">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-8 text-gray-600 space-y-3 text-[19px]">{children}</ol>,
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

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 pt-32 lg:pt-40 relative z-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-600 transition-colors mb-12 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-600" />
              {new Date(post.publishedAt || new Date()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
            {post.authorName && (
              <div className="flex items-center gap-2">
                {post.authorImage ? (
                  <img src={urlFor(post.authorImage).width(50).height(50).url()} alt={post.authorName} className="w-6 h-6 rounded-full object-cover border border-gray-200 shadow-sm" />
                ) : (
                  <User className="w-4 h-4 text-cyan-600" />
                )}
                {post.authorName}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight text-[#1A1A1A] leading-[1.1]">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden border border-gray-200 mb-16 shadow-sm">
              <img 
                src={urlFor(post.mainImage).width(1200).height(514).url()} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="max-w-[700px] mx-auto">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-gray-500 italic">This post has no content.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
