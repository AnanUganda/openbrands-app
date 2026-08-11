import { motion } from "motion/react";
import { Layout, Target, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionLabel } from "./ui/section-label";

const services = [
  {
    icon: Layout,
    title: "Web Design & Development",
    description: "Custom, high-performing websites engineered to capture attention, build instant authority, and convert qualified visitors into booked clients.",
    bgTint: "bg-[#EAF8D7]", // soft lime tint
    borderTint: "border-[#BFF549]/40",
    tags: ["UI/UX Design", "Custom Engineering", "Conversion Funnels"],
  },
  {
    icon: Target,
    title: "PPC & Acquisition Engines",
    description: "Laser-targeted paid ad campaigns paired with high-converting funnels and integrated CRM workflows to capture, nurture, and close leads seamlessly.",
    bgTint: "bg-[#F3F4F6]", // soft neutral tint
    borderTint: "border-gray-200",
    tags: ["PPC Advertising", "High-Convert Funnels", "CRM & Automation"],
  },
  {
    icon: Search,
    title: "SEO & GEO Services",
    description: "Dominating traditional search engines and Generative AI engines (ChatGPT, Perplexity & Gemini) so your brand is recommended wherever clients search.",
    bgTint: "bg-[#FDF9C3]/70", // soft warm tint
    borderTint: "border-yellow-200",
    tags: ["Organic SEO", "GEO (AI Search)", "Authority Building"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        
        {/* Header Section matching reference image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16"
        >
          <div className="flex flex-col items-start max-w-3xl">
            <SectionLabel label="Our Services" align="left" />

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] text-balance">
              How we make it happen <br className="hidden sm:inline" />
              <span className="text-gray-400 font-semibold">together with purpose</span>
            </h2>
          </div>

          {/* Right Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-md leading-relaxed">
            We combine strategy, creativity, and data to deliver impactful marketing solutions. From discovery to execution.
          </p>
        </motion.div>

        {/* 3-Column Service Cards matching reference image layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              className={`p-8 lg:p-10 rounded-3xl ${service.bgTint} border ${service.borderTint} flex flex-col justify-between min-h-[420px] shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <div>
                {/* Top Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center mb-10 shadow-xs group-hover:scale-110 transition-transform duration-300 text-[#0D0D0D]">
                  <service.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-base leading-relaxed font-medium mb-8">
                  {service.description}
                </p>
              </div>

              {/* Bottom Tags Row */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-black/5">
                {service.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#0D0D0D] border border-gray-200/80 text-xs font-bold shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link to="/contact">
            <button className="group flex items-center gap-3 rounded-full bg-[#0D0D0D] px-8 py-4 text-base font-bold text-white transition-all hover:bg-gray-800 hover:shadow-xl pointer-events-auto">
              <span>Explore All Solutions</span>
              <div className="w-7 h-7 rounded-full bg-[#BFF549] flex items-center justify-center text-[#0D0D0D] transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
