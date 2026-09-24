import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { sanityClient, fetchWithCache, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, Check, Link2 } from "lucide-react";
import { BLOG_QUERY, mapBlogPosts, type DisplayPost } from "@/lib/blogPosts";
import { PostImage } from "@/components/ui/post-image";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  excerpt,
  body,
  mainImage,
  categories,
  "categoryTitles": categories[]->title,
  authorName,
  authorRole,
  authorBio,
  authorImage
}`;

/** Shared eyebrow styling used by every sidebar heading and category label. */
const EYEBROW = "text-[11px] font-bold uppercase tracking-widest text-gray-500";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const SITE_URL = "https://www.openbrands.studio";

/** Concatenated plain text of a Portable Text block. */
const blockText = (block: any): string => // eslint-disable-line @typescript-eslint/no-explicit-any
  Array.isArray(block?.children)
    ? block.children.map((c: any) => c?.text || "").join("") // eslint-disable-line @typescript-eslint/no-explicit-any
    : "";

/**
 * Pulls question/answer pairs out of the article's "Common questions" section
 * (an h2 followed by h3 questions) so the page can emit FAQPage structured data.
 */
function extractFaq(body: any): { question: string; answer: string }[] { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!Array.isArray(body)) return [];
  const start = body.findIndex(
    (b: any) => b?.style === "h2" && /questions/i.test(blockText(b)) // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  if (start === -1) return [];

  const faq: { question: string; answer: string }[] = [];
  let question = "";
  for (const block of body.slice(start + 1)) {
    if (block?.style === "h2") break;
    if (block?.style === "h3") {
      question = blockText(block);
    } else if (question && block?.style === "normal" && !block?.listItem) {
      faq.push({ question, answer: blockText(block) });
      question = "";
    }
  }
  return faq;
}

/** "Open Brands Editorial" -> "OB", used when an author has no photo. */
const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

/** Rough reading time from the article's Portable Text blocks. */
function estimateReadTime(post: any): string { // eslint-disable-line @typescript-eslint/no-explicit-any
  let words = 0;
  if (Array.isArray(post?.body)) {
    post.body.forEach((block: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (block?._type === "block" && Array.isArray(block.children)) {
        block.children.forEach((child: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          if (typeof child?.text === "string") words += child.text.split(/\s+/).length;
        });
      }
    });
  }
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<DisplayPost[]>([]);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    sanityClient
      .fetch(POST_QUERY, { slug })
      .then((data) => setPost(data || null))
      .catch((err) => {
        console.error("Error fetching post:", err);
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // The sidebars (recent posts, archive, related) run off the full post list.
  useEffect(() => {
    fetchWithCache(BLOG_QUERY)
      .then((data) => setAllPosts(mapBlogPosts(Array.isArray(data) ? data : [])))
      .catch(() => setAllPosts([]));
  }, []);

  const otherPosts = useMemo(
    () => allPosts.filter((p) => p.slug !== slug),
    [allPosts, slug]
  );

  const recentPosts = useMemo(() => otherPosts.slice(0, 4), [otherPosts]);

  /**
   * Categories can arrive either as plain strings (current schema) or as
   * references to legacy category documents, so resolve both shapes and fall
   * back to the merged listing entry for this slug.
   */
  const postCategories = useMemo<string[]>(() => {
    const isString = (c: unknown): c is string => typeof c === "string";
    const fromTitles = (post?.categoryTitles || []).filter(isString);
    if (fromTitles.length > 0) return fromTitles;
    const fromCategories = (post?.categories || []).filter(isString);
    if (fromCategories.length > 0) return fromCategories;
    const listed = allPosts.find((p) => p.slug === slug);
    if (listed && listed.categories.length > 0) return listed.categories;
    return ["B2B Strategy"];
  }, [post, allPosts, slug]);

  const relatedPosts = useMemo(() => {
    const cats = postCategories.map((c) => c.toUpperCase());
    const sameCategory = otherPosts.filter((p) =>
      p.categories.some((c) => cats.includes(c.toUpperCase()))
    );
    const rest = otherPosts.filter((p) => !sameCategory.includes(p));
    return [...sameCategory, ...rest].slice(0, 2);
  }, [otherPosts, postCategories]);

  // Month-by-month archive, e.g. "September 2026 (3)".
  const archive = useMemo(() => {
    const buckets = new Map<string, { label: string; count: number }>();
    allPosts.forEach((p) => {
      const date = new Date(p.publishedAt);
      if (Number.isNaN(date.getTime())) return;
      const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}`;
      const label = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      const bucket = buckets.get(key);
      if (bucket) bucket.count += 1;
      else buckets.set(key, { label, count: 1 });
    });
    return Array.from(buckets.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([, value]) => value)
      .slice(0, 6);
  }, [allPosts]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable (insecure context or denied permission) — ignore. */
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#0D0D0D] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center text-[#0D0D0D] px-6">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Post Not Found</h1>
        <Link to="/blog" className="text-gray-600 hover:text-[#0D0D0D] transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const authorName = post.authorName || "Open Brands Editorial";
  const authorRole = post.authorRole || "Growth Strategist";
  const authorBio =
    post.authorBio ||
    "Insights on positioning, demand generation, and the systems behind B2B brands that grow without chasing leads.";
  const categoryDisplay = postCategories.join(", ").toUpperCase();
  const heroImage = post.mainImage
    ? urlFor(post.mainImage).width(1400).height(900).url()
    : undefined;

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const metaDescription = post.excerpt || `Read ${post.title} on Open Brands`;
  const faq = extractFaq(post.body);
  const publishedIso = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: metaDescription,
    ...(heroImage ? { image: heroImage } : {}),
    ...(publishedIso ? { datePublished: publishedIso } : {}),
    author: { "@type": "Person", name: authorName, jobTitle: authorRole },
    publisher: {
      "@type": "Organization",
      name: "Open Brands",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/open-brands-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection: postCategories,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!value?.asset?._ref) return null;
        return (
          <img
            alt={value.alt || "Article image"}
            src={urlFor(value).width(1000).url()}
            className="rounded-2xl my-10 w-full border border-gray-200/90"
          />
        );
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-3xl sm:text-4xl font-bold mt-14 mb-5 text-[#0D0D0D] tracking-tight">{children}</h1>, // eslint-disable-line @typescript-eslint/no-explicit-any
      h2: ({ children }: any) => <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-4 text-[#0D0D0D] tracking-tight">{children}</h2>, // eslint-disable-line @typescript-eslint/no-explicit-any
      h3: ({ children }: any) => <h3 className="text-xl sm:text-2xl font-bold mt-10 mb-3 text-[#0D0D0D] tracking-tight">{children}</h3>, // eslint-disable-line @typescript-eslint/no-explicit-any
      normal: ({ children }: any) => <p className="text-[16.5px] sm:text-[17px] text-gray-700 leading-[1.85] mb-7">{children}</p>, // eslint-disable-line @typescript-eslint/no-explicit-any
      blockquote: ({ children }: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
        <blockquote className="border-l-2 border-[#BFF549] pl-6 sm:pl-8 my-10 text-lg sm:text-xl text-gray-500 leading-relaxed">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-7 text-gray-700 space-y-2.5 text-[16.5px] sm:text-[17px] leading-relaxed">{children}</ul>, // eslint-disable-line @typescript-eslint/no-explicit-any
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-7 text-gray-700 space-y-2.5 text-[16.5px] sm:text-[17px] leading-relaxed">{children}</ol>, // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    marks: {
      link: ({ children, value }: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0D0D0D] underline decoration-[#BFF549] decoration-2 underline-offset-4 hover:decoration-[#0D0D0D] transition-colors"
        >
          {children}
        </a>
      ),
    },
  };

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
    },
    {
      label: "X",
      href: "https://twitter.com",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      path: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
  ];

  const shareTargets = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      path: socialLinks[0].path,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
      path: socialLinks[1].path,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      path: socialLinks[2].path,
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FBFBFB] text-[#0D0D0D] flex-1 pb-24 sm:pb-32 selection:bg-[#BFF549] selection:text-black">
      <Helmet>
        <title>{`${post.title} | Open Brands`}</title>
        <meta name="description" content={metaDescription} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Open Brands" />
        {heroImage && <meta property="og:image" content={heroImage} />}
        {publishedIso && <meta property="article:published_time" content={publishedIso} />}
        {postCategories.map((category) => (
          <meta property="article:tag" content={category} key={category} />
        ))}

        <meta name="twitter:card" content={heroImage ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
        {heroImage && <meta name="twitter:image" content={heroImage} />}

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faq.length > 0 && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#BFF549] origin-left z-[200]"
        style={{ scaleX }}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 border-l border-r border-gray-200/80 min-h-screen">
        <Link
          to="/blog"
          className={`inline-flex items-center gap-2 mb-10 sm:mb-14 hover:text-[#0D0D0D] transition-colors ${EYEBROW}`}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">

          {/* =====================================================================
              LEFT SIDEBAR — author card ("About Me" in the reference layout)
              ===================================================================== */}
          <aside className="lg:col-span-3 order-2 lg:order-1 lg:sticky lg:top-28">
            <div className={EYEBROW}>About the author</div>

            {post.authorImage ? (
              <div className="mt-5 aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl border border-gray-200/90 bg-gray-100">
                <img
                  src={urlFor(post.authorImage).width(520).height(700).url()}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="mt-5 w-16 h-16 rounded-full bg-[#0D0D0D] text-[#BFF549] flex items-center justify-center text-base font-bold tracking-tight">
                {initialsOf(authorName)}
              </div>
            )}

            <h2 className="mt-5 text-lg font-bold tracking-tight text-[#0D0D0D]">{authorName}</h2>
            <p className={`mt-1 ${EYEBROW}`}>{authorRole}</p>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-[260px]">{authorBio}</p>

            <div className={`mt-8 ${EYEBROW}`}>Let's connect</div>
            <div className="mt-3 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${authorName} on ${social.label}`}
                  className="text-gray-400 hover:text-[#0D0D0D] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </aside>

          {/* =====================================================================
              CENTER COLUMN — the article itself
              ===================================================================== */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 order-1 lg:order-2 min-w-0"
          >
            <div className={EYEBROW}>{categoryDisplay}</div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.12] text-[#0D0D0D] text-balance">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
              {post.publishedAt && (
                <>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="text-gray-300">/</span>
                </>
              )}
              <span>{estimateReadTime(post)}</span>
            </div>

            {heroImage && (
              <div className="mt-8 sm:mt-10 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200/90 bg-gray-100">
                <img src={heroImage} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="mt-10 sm:mt-12">
              {post.body ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : (
                <p className="text-gray-500 italic">This post has no content.</p>
              )}
            </div>

            {/* Share row */}
            <div className="mt-14 pt-6 border-t border-gray-200/80 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className={EYEBROW}>Share this:</span>
              {shareTargets.map((target) => (
                <a
                  key={target.label}
                  href={target.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#0D0D0D] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d={target.path} />
                  </svg>
                  {target.label}
                </a>
              ))}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#0D0D0D] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>

            {/* Author byline block under the article */}
            <div className="mt-10 pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row gap-5">
              <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-gray-100">
                {post.authorImage ? (
                  <img
                    src={urlFor(post.authorImage).width(160).height(160).url()}
                    alt={authorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#0D0D0D] text-[#BFF549] text-base font-bold tracking-tight">
                    {initialsOf(authorName)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-[#0D0D0D]">{authorName}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{authorBio}</p>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-14">
                <div className={EYEBROW}>Related posts</div>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related._id} to={`/blog/${related.slug}`} className="group block">
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200/90 bg-gray-100">
                        <PostImage
                          src={related.imageUrl}
                          alt={related.title}
                        />
                      </div>
                      <div className={`mt-3 ${EYEBROW}`}>{related.categoryDisplay}</div>
                      <h3 className="mt-1.5 text-lg font-bold tracking-tight leading-snug text-[#0D0D0D] group-hover:text-gray-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.article>

          {/* =====================================================================
              RIGHT SIDEBAR — recent posts + archive
              ===================================================================== */}
          <aside className="lg:col-span-3 order-3 lg:sticky lg:top-28">
            <div className={EYEBROW}>Recent posts</div>
            <div className="mt-5 space-y-6">
              {recentPosts.map((recent) => (
                <Link key={recent._id} to={`/blog/${recent.slug}`} className="group block">
                  <div className={EYEBROW}>{recent.categoryDisplay}</div>
                  <h3 className="mt-1.5 text-[15px] font-bold tracking-tight leading-snug text-[#0D0D0D] group-hover:text-gray-500 transition-colors">
                    {recent.title}
                  </h3>
                </Link>
              ))}
            </div>

            {archive.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-200/80">
                <div className={EYEBROW}>Archive</div>
                <ul className="mt-4 space-y-2.5">
                  {archive.map((entry) => (
                    <li key={entry.label}>
                      <Link
                        to="/blog"
                        className="text-sm text-gray-600 hover:text-[#0D0D0D] transition-colors"
                      >
                        {entry.label}{" "}
                        <span className="text-gray-400">({entry.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
}
