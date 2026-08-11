import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Home, Scale, HeartPulse, UserCircle, TrendingUp, Wrench, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/section-label";

interface SectorItem {
  id: string;
  icon: React.ElementType;
  title: string;
  overview: string;
  tags: string[];
  image: string;
  ctaText: string;
  ctaLink: string;
}

const sectors: SectorItem[] = [
  {
    id: "real-estate",
    icon: Home,
    title: "Real Estate & Property",
    overview: "High-converting web platforms and listing configurator funnels engineered to showcase properties, build instant market credibility, and capture qualified buyer and seller leads.",
    tags: ["Property Funnels", "Listing Showcases", "Lead Capture"],
    image: "/portfolio/real_estate_showcase.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "legal",
    icon: Scale,
    title: "Law Firms & Legal Practices",
    overview: "Authoritative brand platforms designed to establish market leadership, communicate practice area depth, and turn high-intent search traffic into corporate retainers.",
    tags: ["Trust Building", "Consultation Booking", "SEO Ranking"],
    image: "/portfolio/legal_showcase.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "health",
    icon: HeartPulse,
    title: "Health & Wellness Clinics",
    overview: "Intuitive, welcoming patient portals optimized for instant appointment scheduling, mobile experience, and local map pack dominance.",
    tags: ["Appointment Booking", "Mobile First", "Local Search"],
    image: "/portfolio/health_showcase.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "coaching",
    icon: UserCircle,
    title: "Consultants & Executive Coaches",
    overview: "Premium personal brand websites that articulate your unique methodology, showcase client outcomes, and book high-ticket advisory calls.",
    tags: ["Brand Positioning", "Sales Copy", "Funnel Strategy"],
    image: "/portfolio/coaching_showcase.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "financial",
    icon: TrendingUp,
    title: "Financial & Wealth Advisors",
    overview: "Credible, security-focused web experiences built to attract high-net-worth investors, communicate value, and generate qualified consultations.",
    tags: ["High-Trust Layouts", "Lead Qualification", "Security"],
    image: "/portfolio/Torify website.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "home-services",
    icon: Wrench,
    title: "Home Services & Contracting",
    overview: "Frictionless quote calculator sites and search engines engineered to convert local search traffic into booked estimate jobs.",
    tags: ["Quote Funnels", "Local SEO", "Mobile Calls"],
    image: "/portfolio/homeservices_showcase.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
];

// Framer-inspired smooth cubic bezier curve
const framerEase = [0.16, 1, 0.3, 1];

export function WhoWeServeSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="who-we-serve" className="relative w-full py-24 md:py-32 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: framerEase }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          <div>
            <SectionLabel label="Who We Serve" align="left" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1]">
              Engineered for Service Businesses
            </h2>
          </div>

          <Link to="/contact" className="shrink-0">
            <button className="group flex items-center gap-3 rounded-full bg-[#BFF549] px-7 py-3.5 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.3)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
              <span>Book a Strategy Call</span>
            </button>
          </Link>
        </motion.div>

        {/* Framer-Inspired Accordion List */}
        <div className="divide-y divide-gray-200/90 border-t border-b border-gray-200/90 w-full">
          {sectors.map((sector, idx) => {
            const isOpen = openIndex === idx;
            const IconComp = sector.icon;

            return (
              <div 
                key={sector.id}
                onMouseEnter={() => setOpenIndex(idx)}
                onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
                className="py-4 sm:py-6 transition-colors group cursor-pointer"
              >
                
                {/* Collapsed Header Bar */}
                <div className="flex items-center justify-between gap-4 w-full py-2">
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Service Icon Container: Maintains grey-ish background, icon lights up green when open/hovered */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gray-100/90 border border-gray-200/90 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? "scale-105 shadow-xs" : "group-hover:scale-105"
                      }`}
                    >
                      <IconComp
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                          isOpen
                            ? "text-[#6bb90c]"
                            : "text-[#0D0D0D] group-hover:text-[#6bb90c]"
                        }`}
                      />
                    </div>

                    {/* Service Title */}
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                        isOpen
                          ? "text-[#0D0D0D]"
                          : "text-gray-500 group-hover:text-[#0D0D0D]"
                      }`}
                    >
                      {sector.title}
                    </h3>
                  </div>

                  {/* Clean Chevron Indicator (Text Pill Removed) */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 bg-gray-100/90 border border-gray-200/90 ${
                      isOpen ? "rotate-180 text-[#0D0D0D]" : "text-gray-400 group-hover:text-[#0D0D0D]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Framer Smooth Downward Expanding Dark Card */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${sector.id}`}
                      initial={{ opacity: 0, height: 0, y: -12 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                        transition: {
                          height: { duration: 0.45, ease: framerEase },
                          opacity: { duration: 0.35, delay: 0.08 },
                          y: { duration: 0.45, ease: framerEase },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -12,
                        transition: {
                          height: { duration: 0.35, ease: framerEase },
                          opacity: { duration: 0.2 },
                          y: { duration: 0.35, ease: framerEase },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 bg-[#0D0D0D] text-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 mb-2">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                          
                          {/* Left Column: Overview & Main Call To Action */}
                          <div className="lg:col-span-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#BFF549] animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                  Overview
                                </span>
                              </div>

                              <p className="text-gray-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-balance mb-6">
                                {sector.overview}
                              </p>

                              {/* Tag Pills */}
                              <div className="flex flex-wrap gap-2 mb-8">
                                {sector.tags.map((tag, tagIdx) => (
                                  <span
                                    key={tagIdx}
                                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-gray-200"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Main Call To Action Button inside dark card */}
                            <Link to={sector.ctaLink} className="w-fit">
                              <button className="group flex items-center gap-3 rounded-full bg-[#BFF549] px-7 py-3.5 text-sm sm:text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_25px_rgba(191,245,73,0.35)] pointer-events-auto">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
                                <span>{sector.ctaText}</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </button>
                            </Link>
                          </div>

                          {/* Right Column: High-Quality Framed Preview Image */}
                          <div className="lg:col-span-6">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 aspect-[16/10] bg-gray-900 shadow-2xl group/img">
                              <img
                                src={sector.image}
                                alt={sector.title}
                                className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
