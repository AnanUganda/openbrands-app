import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { fetchWithCache, urlFor } from "@/lib/sanity";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { SplitTextReveal } from "@/components/ui/split-text-reveal";

export const BLOG_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  authorName,
  categories
}`;

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("View all");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchWithCache(BLOG_QUERY);
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Categories are plain strings on the post. Guard against anything else so a
  // half-migrated or hand-edited document can't take the whole page down.
  const postCategories = (post: any): string[] => // eslint-disable-line @typescript-eslint/no-explicit-any
    Array.isArray(post?.categories) ? post.categories.filter((c: unknown) => typeof c === "string") : [];

  // Dynamically extract unique categories from posts
  const categories = React.useMemo(() => {
    const list = new Set<string>();
    posts.forEach((post) => postCategories(post).forEach((cat) => list.add(cat)));
    return ["View all", ...Array.from(list)];
  }, [posts]);

  // Filter posts based on active category
  const filteredPosts = posts.filter((post) => {
    if (activeCategory === "View all") return true;
    return postCategories(post).includes(activeCategory);
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.65; // Scroll 65% of container view width
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] overflow-hidden flex-1 pb-32 text-white">
      <Helmet>
        <title>Activity & Updates | Open Brands</title>
        <meta name="description" content="Read the latest insights, strategies, and B2B marketing case studies on our activity and updates feed." />
      </Helmet>

      {/* Background structural grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      }} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-32 lg:pt-40 relative z-10">
        
        {/* Activity & Updates Display Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mb-12 sm:mb-16"
        >
          <SplitTextReveal
            as="h1"
            variant="hero"
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tighter text-white leading-tight drop-shadow-lg"
          >
            Activity & Updates
          </SplitTextReveal>
          
          {/* Growth description accompanied by leading divider line */}
          <div className="flex items-start gap-4 sm:gap-6 max-w-2xl mt-4">
            <div className="w-12 h-[2px] bg-[#BFF549] shrink-0 mt-3.5" />
            <p className="text-lg sm:text-xl font-medium text-gray-400 leading-relaxed text-balance">
              Our biggest challenge is making sure we're always designing and building products that will help you run your business better.
            </p>
          </div>
        </motion.div>

        {/* Dynamic Category Navigation with spring underline animations */}
        <div className="border-b border-white/[0.08] pb-4 mb-16 overflow-x-auto scrollbar-none flex">
          <div className="flex gap-8 md:gap-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-500 hover:text-white"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="blogTabUnderline"
                      className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#BFF549]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider & Carousel Grid */}
        {loading ? (
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[320px] sm:w-[400px] shrink-0 bg-[#161616] rounded-sm border border-white/[0.08] p-6 space-y-4 animate-pulse">
                <div className="aspect-[4/3] bg-white/[0.05] rounded-sm" />
                <div className="h-4 bg-white/[0.05] rounded w-1/3" />
                <div className="h-6 bg-white/[0.05] rounded w-3/4" />
                <div className="h-4 bg-white/[0.05] rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 border border-white/[0.08] bg-[#161616] shadow-sm rounded-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-2">No updates found</h3>
            <p className="text-gray-400">Check back later for new articles under this category!</p>
          </motion.div>
        ) : (
          <div className="relative group/slider">
            
            {/* Horizontal Snap Scroll Container */}
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-8 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post._id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                    className="w-[310px] sm:w-[380px] md:w-[410px] shrink-0 snap-start group relative flex flex-col bg-[#0D0D0D] border border-white/[0.08] shadow-sm overflow-hidden hover:border-[#BFF549]/40 transition-all duration-500"
                  >
                    <Link to={`/blog/${post.slug?.current || ""}`} className="absolute inset-0 z-10">
                      <span className="sr-only">Read {post.title}</span>
                    </Link>
                    
                    {/* Portrait Card Image */}
                    {post.mainImage ? (
                      <div className="aspect-[4/3] w-full overflow-hidden relative border-b border-white/[0.08]">
                        <img 
                          src={urlFor(post.mainImage).width(800).height(600).url()} 
                          alt={post.title}
                          className="w-full h-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] w-full bg-[#111] flex items-center justify-center border-b border-white/[0.08]">
                        <span className="text-white/[0.2] font-extrabold tracking-widest uppercase text-xs">Open Brands</span>
                      </div>
                    )}
                    
                    {/* Content Section */}
                    <div className="p-7 flex flex-col flex-grow relative z-20">
                      {/* Meta credits line */}
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#BFF549]" />
                          <span>Published in Insight {new Date(post.publishedAt || new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                        {post.authorName && (
                          <span className="text-white shrink-0 ml-2">by : {post.authorName}</span>
                        )}
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#BFF549] transition-colors line-clamp-2 leading-tight tracking-tight">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.excerpt || "Check out the latest strategic concepts, detailed insights, and framework outcomes in the full article."}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Floating arrow navigation controls centered vertically on card edges */}
            <div className="absolute top-[40%] -translate-y-1/2 left-[-24px] right-[-24px] pointer-events-none hidden md:flex justify-between items-center z-30">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 bg-[#0D0D0D] shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-[#BFF549] hover:border-[#BFF549]/30 transition-all cursor-pointer pointer-events-auto"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 bg-[#0D0D0D] shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-[#BFF549] hover:border-[#BFF549]/30 transition-all cursor-pointer pointer-events-auto"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
