import { useEffect, useState, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { fetchWithCache, urlFor } from "@/lib/sanity";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitTextReveal } from "@/components/ui/split-text-reveal";

export const PORTFOLIO_QUERY = `*[_type == "portfolio" && defined(slug.current)] | order(featured desc, publishedAt desc) {
  _id,
  title,
  slug,
  clientName,
  category,
  tagline,
  metrics,
  mainImage,
  techLabel,
  featured,
  liveUrl
}`;

interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  clientName?: string;
  category?: string;
  tagline?: string;
  metrics?: string;
  mainImage?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  techLabel?: string;
  featured?: boolean;
  liveUrl?: string;
  localImage?: string;
}

const defaultPortfolio: PortfolioItem[] = [
  {
    _id: "p1",
    title: "Oakline Master-Crafted Landscape Digital Platform",
    slug: { current: "oakline-landscaping" },
    clientName: "Oakline Landscaping",
    category: "Landscaping & Property",
    tagline: "High-converting web experience generating 3.4x more booking consultations.",
    metrics: "+240% Bookings",
    localImage: "/Website Mockups Projects/Oakline/Oakline Landscaping_.png",
  },
  {
    _id: "p2",
    title: "Urban Sheds Lead-Generation Growth Engine",
    slug: { current: "urban-sheds" },
    clientName: "Urban Sheds",
    category: "Home Structures",
    tagline: "Modern configurator funnel and SEO framework driving qualified national leads.",
    metrics: "$1.2M Pipeline",
    localImage: "/Website Mockups Projects/Urban Sheds /Urban Sheds Mock Up.png",
  },
  {
    _id: "p3",
    title: "Sowers Harvest Contractor Service Platform",
    slug: { current: "sowers-harvest" },
    clientName: "Sowers Harvest",
    category: "Contracting Services",
    tagline: "Frictionless quote calculator site turning search traffic into booked jobs.",
    metrics: "+180% Estimates",
    localImage: "/Website Mockups Projects/Sowers Harvest Cafe/410133250_f4a94722-b23c-45c9-bcb8-1ceb81466408.png",
  },
  {
    _id: "p4",
    title: "Torify Financial Analytics & Advisory Portal",
    slug: { current: "torify-financial" },
    clientName: "Torify Wealth",
    category: "Financial Services",
    tagline: "Credible, high-trust portal built for high-net-worth client acquisition.",
    metrics: "$4.5M AUM Growth",
    localImage: "/Website Mockups Projects/Torify/Torify website.png",
  },
  {
    _id: "p5",
    title: "Reiff Design Build Architectural Platform",
    slug: { current: "reiff-design-build" },
    clientName: "Reiff Design Build",
    category: "Architecture & Construction",
    tagline: "Authoritative design-build showcase platform engineered to win premium contracts.",
    metrics: "4.9★ Rating",
    localImage: "/Website Mockups Projects/Reiff Design Build /410133250_f4a94722-b23c-45c9-bcb8-1ceb81466408.png",
  },
  {
    _id: "p6",
    title: "Extend Cafes Digital Hospitality Platform",
    slug: { current: "extend-cafes" },
    clientName: "Extend Cafes",
    category: "Hospitality & Dining",
    tagline: "Sleek web ordering portal driving customer engagement and repeat visits.",
    metrics: "+310% Online Orders",
    localImage: "/Website Mockups Projects/Extend Cafes/Extend Cafes Mockup_.png",
  },
  {
    _id: "p7",
    title: "Echo Kenya Wildlife & Expedition Experience",
    slug: { current: "echo-kenya" },
    clientName: "Echo Kenya",
    category: "Travel & Tourism",
    tagline: "Immersive safari and tour booking platform capturing international traveler leads.",
    metrics: "+195% Inquiries",
    localImage: "/Website Mockups Projects/Echo Kenya/Eco Kenya.png",
  },
];

/** Parallax Card Component that shifts image smoothly on scroll */
function ParallaxPortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation from -30px to 30px
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const detailUrl = `/portfolio/${item.slug.current}`;
  const numStr = (index + 1).toString().padStart(2, "0");

  const imageUrl = item.mainImage
    ? urlFor(item.mainImage).width(1000).height(750).url()
    : item.localImage || "/Website Mockups Projects/Oakline/Oakline Landscaping_.png";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="group flex flex-col mb-12 sm:mb-16 lg:mb-20"
    >
      {/* Image Container with Parallax Effect */}
      <Link
        to={detailUrl}
        className="relative w-full rounded-3xl lg:rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-200/90 shadow-lg aspect-[4/3] block mb-5"
      >
        <motion.div style={{ y, scale }} className="w-full h-full">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>

        {/* Category Pill Tag */}
        {item.category && (
          <div className="absolute top-5 left-5 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200/80 text-[11px] font-bold text-[#0D0D0D] uppercase tracking-wider shadow-sm">
            {item.category}
          </div>
        )}
      </Link>

      {/* Info Row below Image matching reference screenshot */}
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D0D0D] shrink-0 mt-1">
          <div className="w-2 h-2 rounded-full bg-[#0D0D0D]" />
          <span>{numStr}</span>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] leading-snug tracking-tight group-hover:text-gray-600 transition-colors">
            <Link to={detailUrl}>{item.title}</Link>
          </h3>
          {item.tagline && (
            <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed mt-1">
              {item.tagline}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await fetchWithCache(PORTFOLIO_QUERY);
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(defaultPortfolio);
        }
      } catch (err) {
        console.error("Error fetching portfolio items:", err);
        setItems(defaultPortfolio);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const displayItems = items.length > 0 ? items : defaultPortfolio;
  const leftColumnItems = displayItems.filter((_, idx) => idx % 2 === 0);
  const rightColumnItems = displayItems.filter((_, idx) => idx % 2 === 1);

  return (
    <div className="relative w-full min-h-screen bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden flex-1 pb-24 border-t border-gray-200/80">
      <Helmet>
        <title>Selected Work | Open Brands</title>
        <meta
          name="description"
          content="Explore a selection of projects that highlight Open Brands' approach to strategy, design, and digital innovation."
        />
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80 pt-24 md:pt-32">
        {/* Header matching reference screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex flex-col items-center mb-16 md:mb-24 max-w-4xl mx-auto"
        >
          <SectionLabel label="©2026 Open Brands" align="center" />

          {/* Headline */}
          <SplitTextReveal
            as="h1"
            variant="hero"
            className="text-4xl sm:text-6xl lg:text-[4.75rem] font-bold text-[#0D0D0D] tracking-tight leading-[1.04] mb-6 text-balance"
          >
            Selected work <br className="hidden sm:inline" />
            <span className="text-gray-400 font-semibold">that drives results</span>
          </SplitTextReveal>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-600 font-medium leading-relaxed mb-8 max-w-2xl text-balance">
            Explore a selection of projects that highlight Open Brands' approach to strategy, design, and digital innovation.
          </p>

          {/* Primary CTA Button */}
          <Link to="/contact">
            <button className="group flex items-center gap-3 rounded-full bg-[#0D0D0D] px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-gray-800 hover:shadow-xl pointer-events-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-[#BFF549]" />
              <span>Book a Call</span>
            </button>
          </Link>
        </motion.div>

        {/* Staggered 2-Column Parallax Grid Layout */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-3xl animate-pulse aspect-[4/3] p-6 space-y-4"
              >
                <div className="w-full h-full bg-gray-200 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column */}
            <div className="flex flex-col">
              {leftColumnItems.map((item, idx) => (
                <ParallaxPortfolioCard
                  key={item._id}
                  item={item}
                  index={idx * 2}
                />
              ))}
            </div>

            {/* Right Column (Offset vertically for staggered masonry layout matching screenshot) */}
            <div className="flex flex-col md:mt-24">
              {rightColumnItems.map((item, idx) => (
                <ParallaxPortfolioCard
                  key={item._id}
                  item={item}
                  index={idx * 2 + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
