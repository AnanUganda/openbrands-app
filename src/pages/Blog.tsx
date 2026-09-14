import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { fetchWithCache, urlFor } from "@/lib/sanity";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { SectionLabel } from "@/components/ui/section-label";
import { FALLBACK_BLOG_POSTS } from "@/data/blogData";

export const BLOG_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  authorName,
  "categoryTitles": categories[]->title,
  categories
}`;

interface DisplayPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  categories: string[];
  categoryDisplay: string;
  authorName?: string;
  imageUrl: string;
}

export function Blog() {
  const [sanityPosts, setSanityPosts] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchWithCache(BLOG_QUERY);
        if (Array.isArray(data)) {
          setSanityPosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Merge Sanity posts with fallback posts so the full 8+ card editorial grid is always rich & populated
  const allPosts = useMemo<DisplayPost[]>(() => {
    const mappedSanity: DisplayPost[] = sanityPosts.map((post) => {
      let cats: string[] = [];
      if (Array.isArray(post.categoryTitles) && post.categoryTitles.length > 0) {
        cats = post.categoryTitles.filter((c: unknown) => typeof c === "string");
      } else if (Array.isArray(post.categories)) {
        cats = post.categories.filter((c: unknown) => typeof c === "string");
      }
      if (cats.length === 0) cats = ["B2B Strategy"];

      const slugStr = post.slug?.current || "";
      const fallbackMatch = FALLBACK_BLOG_POSTS.find((f) => f.slug.current === slugStr);

      let imgUrl = "";
      if (post.mainImage) {
        imgUrl = urlFor(post.mainImage).width(1200).height(800).url();
      } else if (fallbackMatch?.imageUrl) {
        imgUrl = fallbackMatch.imageUrl;
      } else {
        imgUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80";
      }

      const catDisplay = cats.join(", ").toUpperCase();

      return {
        _id: post._id,
        title: post.title,
        slug: slugStr,
        publishedAt: post.publishedAt || new Date().toISOString(),
        excerpt: post.excerpt || fallbackMatch?.excerpt || "",
        categories: cats,
        categoryDisplay: catDisplay,
        authorName: post.authorName || "RAM",
        imageUrl: imgUrl,
      };
    });

    const sanitySlugs = new Set(mappedSanity.map((p) => p.slug));

    const mappedFallbacks: DisplayPost[] = FALLBACK_BLOG_POSTS.filter(
      (fb) => !sanitySlugs.has(fb.slug.current)
    ).map((fb) => ({
      _id: fb._id,
      title: fb.title,
      slug: fb.slug.current,
      publishedAt: fb.publishedAt,
      excerpt: fb.excerpt,
      categories: fb.categories,
      categoryDisplay: fb.categoryDisplay,
      authorName: fb.authorName,
      imageUrl: fb.imageUrl,
    }));

    return [...mappedSanity, ...mappedFallbacks];
  }, [sanityPosts]);

  // Extract unique category filters
  const categories = useMemo(() => {
    const set = new Set<string>();
    allPosts.forEach((p) => p.categories.forEach((c) => set.add(c.toUpperCase())));
    return ["ALL", ...Array.from(set)];
  }, [allPosts]);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (activeCategory === "ALL") return allPosts;
    return allPosts.filter((post) =>
      post.categories.some((c) => c.toUpperCase() === activeCategory)
    );
  }, [allPosts, activeCategory]);

  const featuredPosts = filteredPosts.slice(0, 2);
  const secondaryPosts = filteredPosts.slice(2);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 4000);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FBFBFB] overflow-hidden flex-1 pb-28 sm:pb-36 text-[#0D0D0D] selection:bg-[#BFF549] selection:text-black">
      <Helmet>
        <title>Activity & Updates | Open Brands</title>
        <meta
          name="description"
          content="Read the latest insights, strategies, and B2B marketing case studies on our activity and updates feed."
        />
      </Helmet>

      {/* Interactive Canvas Particles matching the Homepage */}
      <Particles className="absolute inset-0 z-0 pointer-events-none" quantity={140} color="#000000" staticity={40} ease={50} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 relative z-10 border-l border-r border-gray-200/80 min-h-screen">
        {/* =========================================================================
            HEADER SECTION: "Blog" title, subtitle, and category pills on the right
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 sm:mb-16"
        >
          <div className="mb-4">
            <SectionLabel label="©2026 Open Brands Blog" align="left" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="max-w-2xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0D0D0D] mb-3 leading-[1.05]">
                Blog
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed text-balance">
                Discover insights, inspiration, and expert advice on our engaging blog.
              </p>
            </div>

            {/* Category Filter Pills on the Right (matching screenshot) */}
            <div className="flex items-center flex-wrap gap-2 shrink-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#0D0D0D] text-white border border-[#0D0D0D] shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:text-black hover:border-gray-400"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="space-y-12 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[16/10] bg-gray-200/70 rounded-2xl" />
                  <div className="h-3 bg-gray-200/70 rounded w-24" />
                  <div className="h-7 bg-gray-200/70 rounded w-4/5" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[16/10] bg-gray-200/70 rounded-2xl" />
                  <div className="h-3 bg-gray-200/70 rounded w-20" />
                  <div className="h-6 bg-gray-200/70 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 border border-gray-200 bg-white rounded-2xl my-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#0D0D0D] mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">No articles currently match "{activeCategory}".</p>
            <button
              onClick={() => setActiveCategory("ALL")}
              className="px-5 py-2.5 bg-[#0D0D0D] text-white font-bold text-xs uppercase tracking-wider rounded-md hover:bg-gray-800 transition-all cursor-pointer"
            >
              View All Articles
            </button>
          </div>
        ) : (
          <>
            {/* =========================================================================
                TOP FEATURED SECTION: 2 Large Cards Side-by-Side (matching screenshot)
                ========================================================================= */}
            {featuredPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-14 lg:mb-16">
                {featuredPosts.map((post, idx) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex flex-col cursor-pointer block"
                    >
                      {/* Image container: rounded rectangle with gentle radius */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-gray-100 shadow-sm">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content block below image */}
                      <div className="pt-4 sm:pt-5">
                        <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-[#0D0D0D] transition-colors duration-200">
                          {post.categoryDisplay}
                        </div>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight leading-snug group-hover:text-gray-600 transition-colors duration-300">
                          {post.title}
                        </h2>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* =========================================================================
                SECONDARY GRID SECTION: 3 Columns Grid (matching screenshot)
                ========================================================================= */}
            {secondaryPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20 lg:mb-28">
                {secondaryPosts.map((post, idx) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex flex-col cursor-pointer block"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200/90 bg-gray-100 shadow-sm">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content block */}
                      <div className="pt-4">
                        <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-gray-500 group-hover:text-[#0D0D0D] transition-colors duration-200">
                          {post.categoryDisplay}
                        </div>
                        <h3 className="mt-1.5 text-lg sm:text-xl font-bold text-[#0D0D0D] tracking-tight leading-snug group-hover:text-gray-600 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* =========================================================================
            NEWSLETTER SECTION AT BOTTOM (matching screenshot)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-200/80 pt-16 sm:pt-20 mt-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left side: Eyebrow + Large headline */}
            <div className="lg:col-span-7">
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                NEWSLETTER
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D0D0D] tracking-tight leading-[1.08] text-balance">
                Get the latest news into your inbox
              </h2>
            </div>

            {/* Right side: Explanatory copy + Email signup form */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                Stay informed and up-to-date with the latest news delivered straight to your inbox
                for a seamless and convenient experience.
              </p>

              <form onSubmit={handleSubscribe} className="w-full">
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2.5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" />
                    <span>You're subscribed! Keep an eye on your inbox for our next edition.</span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white border border-gray-300 focus:border-[#0D0D0D] text-[#0D0D0D] placeholder:text-gray-400 rounded-full px-5 py-3.5 text-sm shadow-sm outline-none transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      className="bg-[#BFF549] hover:bg-[#aee63d] text-black font-bold px-7 py-3.5 rounded-full text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(191,245,73,0.35)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
