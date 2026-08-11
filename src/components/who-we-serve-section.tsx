import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Home, Scale, HeartPulse, UserCircle, TrendingUp, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/section-label";

const sectors = [
  {
    id: "real-estate",
    icon: Home,
    title: "Real Estate & Property",
    description: "Websites that showcase listings beautifully and capture high-intent buyer and seller leads.",
    tags: ["Property Funnels", "Listing Showcases", "Lead Capture"],
    image: "/portfolio/real_estate_showcase.png",
  },
  {
    id: "legal",
    icon: Scale,
    title: "Law Firms & Legal",
    description: "Professional, authoritative designs that build instant trust and authority with potential clients.",
    tags: ["Trust Building", "Consultation Booking", "SEO Ranking"],
    image: "/portfolio/legal_showcase.png",
  },
  {
    id: "health",
    icon: HeartPulse,
    title: "Health & Wellness",
    description: "Calm, welcoming interfaces designed to book more patient and client appointments effortlessly.",
    tags: ["Appointment Booking", "Mobile First", "Local Search"],
    image: "/portfolio/health_showcase.png",
  },
  {
    id: "coaching",
    icon: UserCircle,
    title: "Consultants & Coaches",
    description: "Personal brand focused sites that position you as the premium, obvious choice in your market.",
    tags: ["Brand Positioning", "Sales Copy", "Funnel Strategy"],
    image: "/portfolio/coaching_showcase.png",
  },
  {
    id: "financial",
    icon: TrendingUp,
    title: "Financial Advisors",
    description: "Credible, secure-feeling designs that attract high-net-worth individuals and business owners.",
    tags: ["High-Trust Layouts", "Lead Qualification", "Security"],
    image: "/portfolio/Torify website.png",
  },
  {
    id: "home-services",
    icon: Wrench,
    title: "Home Services & Contracting",
    description: "Frictionless lead-generation funnels that turn local search traffic into booked estimate jobs.",
    tags: ["Quote Funnels", "Local SEO", "Mobile Calls"],
    image: "/portfolio/homeservices_showcase.png",
  },
];

export function WhoWeServeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSector = sectors[activeIndex];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        
        {/* Top Header matching reference screenshot 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 lg:mb-16"
        >
          <div>
            <SectionLabel label="Who We Serve" align="left" />

            {/* Consistent H2 Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1]">
              Engineered for Service Businesses
            </h2>
          </div>

          {/* Right Header Button */}
          <Link to="/contact" className="shrink-0">
            <button className="group flex items-center gap-3 rounded-full bg-[#BFF549] px-7 py-3.5 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.3)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
              <span>Book a Strategy Call</span>
            </button>
          </Link>
        </motion.div>

        {/* Interactive 2-Column Grid Layout matching screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Stack of Interactive Sector Items */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {sectors.map((sector, idx) => {
              const isActive = activeIndex === idx;
              const IconComp = sector.icon;

              return (
                <motion.div
                  key={sector.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "bg-white border-gray-300 shadow-md"
                      : "bg-gray-100/80 border-gray-200/90 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                  layout
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-[#0D0D0D] text-[#BFF549]"
                          : "bg-white text-[#0D0D0D] border border-gray-200"
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-[#0D0D0D]">
                      {sector.title}
                    </span>
                  </div>

                  {/* Expanded Content for Active Item */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed mt-4 mb-5">
                          {sector.description}
                        </p>

                        {/* Tag Pills */}
                        <div className="flex flex-wrap gap-2">
                          {sector.tags.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-[#0D0D0D]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Container displaying active sector visual */}
          <div className="lg:col-span-7 w-full sticky top-28">
            <div className="relative w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-200/90 shadow-2xl h-[420px] sm:h-[500px] lg:h-[620px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSector.id}
                  src={activeSector.image}
                  alt={activeSector.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Bottom Sector Info Overlay Pill */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full border border-gray-200/80 shadow-xl text-[#0D0D0D]">
                <div className="w-3 h-3 rounded-full bg-[#BFF549]" />
                <span className="text-xs md:text-sm font-bold tracking-wider uppercase">
                  {activeSector.title} Solution
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
