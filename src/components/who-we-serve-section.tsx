import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Home, Scale, HeartPulse, UserCircle, TrendingUp, Wrench, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/section-label";
import { SplitTextReveal } from "./ui/split-text-reveal";

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
    image: "/Website Mockups Projects/Oakline/Oakline Landscaping_.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "legal",
    icon: Scale,
    title: "Law Firms & Legal Practices",
    overview: "Authoritative brand platforms designed to establish market leadership, communicate practice area depth, and turn high-intent search traffic into corporate retainers.",
    tags: ["Trust Building", "Consultation Booking", "SEO Ranking"],
    image: "/Website Mockups Projects/Reiff Design Build /410133250_f4a94722-b23c-45c9-bcb8-1ceb81466408.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "health",
    icon: HeartPulse,
    title: "Health & Wellness Clinics",
    overview: "Intuitive, welcoming patient portals optimized for instant appointment scheduling, mobile experience, and local map pack dominance.",
    tags: ["Appointment Booking", "Mobile First", "Local Search"],
    image: "/Website Mockups Projects/Echo Kenya/Eco Kenya.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "coaching",
    icon: UserCircle,
    title: "Consultants & Executive Coaches",
    overview: "Premium personal brand websites that articulate your unique methodology, showcase client outcomes, and book high-ticket advisory calls.",
    tags: ["Brand Positioning", "Sales Copy", "Funnel Strategy"],
    image: "/Website Mockups Projects/Extend Cafes/Extend Cafes Mockup_.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "financial",
    icon: TrendingUp,
    title: "Financial & Wealth Advisors",
    overview: "Credible, security-focused web experiences built to attract high-net-worth investors, communicate value, and generate qualified consultations.",
    tags: ["High-Trust Layouts", "Lead Qualification", "Security"],
    image: "/Website Mockups Projects/Torify/Torify website.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
  {
    id: "home-services",
    icon: Wrench,
    title: "Home Services & Contracting",
    overview: "Frictionless quote calculator sites and search engines engineered to convert local search traffic into booked estimate jobs.",
    tags: ["Quote Funnels", "Local SEO", "Mobile Calls"],
    image: "/Website Mockups Projects/Sowers Harvest Cafe/410133250_f4a94722-b23c-45c9-bcb8-1ceb81466408.png",
    ctaText: "Book a Strategy Call",
    ctaLink: "/contact",
  },
];

// GSAP Power3.out / Power2.out signature smooth cubic-bezier easing curve [0.22, 1, 0.36, 1]
const gsapEase = [0.22, 1, 0.36, 1];

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
          transition={{ duration: 0.7, ease: gsapEase }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          <div>
            <SectionLabel label="Who We Serve" align="left" />

            <SplitTextReveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1]">
              Engineered for Service Businesses
            </SplitTextReveal>
          </div>

          <Link to="/contact" className="shrink-0">
            <button className="group flex items-center gap-3 rounded-full bg-[#BFF549] px-7 py-3.5 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.3)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
              <span>Book a Strategy Call</span>
            </button>
          </Link>
        </motion.div>

        {/* GSAP Timeline-inspired Accordion List */}
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
                    {/* Service Icon Container */}
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

                  {/* Clean Chevron Indicator */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 bg-gray-100/90 border border-gray-200/90 ${
                      isOpen ? "rotate-180 text-[#0D0D0D]" : "text-gray-400 group-hover:text-[#0D0D0D]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* GSAP Sequenced Downward Expanding Dark Card */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${sector.id}`}
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                        transition: {
                          height: { duration: 0.5, ease: gsapEase },
                          opacity: { duration: 0.35, ease: gsapEase },
                          y: { duration: 0.5, ease: gsapEase },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -10,
                        transition: {
                          height: { duration: 0.35, ease: gsapEase },
                          opacity: { duration: 0.2 },
                          y: { duration: 0.35, ease: gsapEase },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 bg-[#0D0D0D] text-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 mb-2">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                          
                          {/* Left Column: Sequenced Timeline Fade-Ins */}
                          <div className="lg:col-span-6 flex flex-col justify-between">
                            <div>
                              {/* Overview Badge */}
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.08, ease: gsapEase }}
                                className="flex items-center gap-2 mb-4"
                              >
                                <span className="w-2 h-2 rounded-full bg-[#BFF549] animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                  Overview
                                </span>
                              </motion.div>

                              {/* Overview Text */}
                              <motion.p 
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.14, ease: gsapEase }}
                                className="text-gray-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-balance mb-6"
                              >
                                {sector.overview}
                              </motion.p>

                              {/* Tag Pills */}
                              <motion.div 
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.22, ease: gsapEase }}
                                className="flex flex-wrap gap-2 mb-8"
                              >
                                {sector.tags.map((tag, tagIdx) => (
                                  <span
                                    key={tagIdx}
                                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-gray-200"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </motion.div>
                            </div>

                            {/* Main CTA Button */}
                            <motion.div
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.45, delay: 0.28, ease: gsapEase }}
                            >
                              <Link to={sector.ctaLink} className="w-fit">
                                <button className="group flex items-center gap-3 rounded-full bg-[#BFF549] px-7 py-3.5 text-sm sm:text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_25px_rgba(191,245,73,0.35)] pointer-events-auto">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
                                  <span>{sector.ctaText}</span>
                                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                              </Link>
                            </motion.div>
                          </div>

                          {/* Right Column: Image Preview Reveal */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.96, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.16, ease: gsapEase }}
                            className="lg:col-span-6"
                          >
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 aspect-[16/10] bg-gray-900 shadow-2xl group/img">
                              <img
                                src={sector.image}
                                alt={sector.title}
                                className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                              />
                            </div>
                          </motion.div>

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
