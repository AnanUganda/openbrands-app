import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { sanityClient, urlFor } from "@/lib/sanity";
import { motion } from "motion/react";
import { ArrowRight, Calendar, User } from "lucide-react";

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await sanityClient.fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          publishedAt,
          excerpt,
          mainImage,
          "authorName": author->name
        }`
      );
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F7F7F7] overflow-hidden flex-1 pb-24">
      <Helmet>
        <title>Insights & Articles | Open Brands</title>
        <meta name="description" content="Read the latest insights, strategies, and case studies on B2B marketing and growth from Open Brands." />
      </Helmet>
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 pt-32 lg:pt-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[#1A1A1A] leading-tight">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">Strategies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Actionable advice, deep dives, and actual frameworks we use to scale B2B service businesses.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-gray-200 bg-white shadow-sm rounded-3xl">
            <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">No posts found</h3>
            <p className="text-gray-600">Check back later for new insights. Head to the studio to write your first post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden hover:border-cyan-300 hover:shadow-md transition-all duration-500"
              >
                <Link to={`/blog/${post.slug.current}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Read {post.title}</span>
                </Link>
                
                {post.mainImage ? (
                  <div className="w-full h-60 overflow-hidden relative">
                    <img 
                      src={urlFor(post.mainImage).width(800).height(600).url()} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 font-bold tracking-widest uppercase">Open Brands</span>
                  </div>
                )}
                
                <div className="p-8 flex flex-col flex-grow relative z-20">
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.publishedAt || new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    {post.authorName && (
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.authorName}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-8 line-clamp-3 flex-grow">
                    {post.excerpt || "Read more about this topic in the full article."}
                  </p>
                  
                  <div className="mt-auto flex items-center font-semibold text-cyan-600 text-sm group-hover:translate-x-2 transition-transform">
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
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
