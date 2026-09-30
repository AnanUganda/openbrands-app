import { motion } from "motion/react";
import { Layout, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionLabel } from "./ui/section-label";
import { SplitTextReveal } from "./ui/split-text-reveal";

const services = [
  {
    icon: Layout,
    title: "Conversion Website",
    audience: "For businesses that get referrals but lose them on a weak website.",
    description:
      "A fast, clear website written around what your best clients need to hear, with call, WhatsApp and enquiry buttons on every page.",
    bgTint: "bg-[#F3F4F6]",
    borderTint: "border-gray-200",
    recommended: false,
    tags: ["Copy written with you", "Up to 7 pages", "Ready in 3\u20134 weeks"],
  },
  {
    icon: Zap,
    title: "Client Acquisition Engine",
    audience: "For businesses ready to get new enquiries every month.",
    description:
      "Your conversion website plus a lead magnet, funnel, CRM and automatic follow-up, so every enquiry is captured and followed up until they book.",
    bgTint: "bg-[#EAF8D7]",
    borderTint: "border-[#BFF549]/40",
    recommended: true,
    tags: ["Lead magnet + funnel", "CRM & follow-up", "Ready in 6\u20138 weeks"],
  },
  {
    icon: TrendingUp,
    title: "Growth Partner",
    audience: "For clients after launch who want steady growth.",
    description:
      "Monthly work to help you show up on Google and in ChatGPT and Gemini answers, plus improvements based on your numbers and a short report every month.",
    bgTint: "bg-[#F3F4F6]",
    borderTint: "border-gray-200",
    recommended: false,
    tags: ["SEO & AI search", "Monthly report", "After launch"],
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
            <SectionLabel label="OUR OFFERS" align="left" />

            {/* Title */}
            <SplitTextReveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] text-balance">
              Three ways to get more clients from your website
            </SplitTextReveal>
          </div>

          {/* Right Subtitle */}
          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-md leading-relaxed">
            Start with a website that converts, or go all in with a system that brings in,
            captures and follows up leads for you. Every project is led by me, start to finish.
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
              className={`relative p-8 lg:p-10 rounded-3xl ${service.bgTint} border ${service.borderTint} flex flex-col justify-between min-h-[420px] shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              {service.recommended && (
                <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#0D0D0D] text-white text-[10px] font-bold uppercase tracking-widest">
                  Recommended
                </span>
              )}

              <div>
                {/* Top Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center mb-10 shadow-xs group-hover:scale-110 transition-transform duration-300 text-[#0D0D0D]">
                  <service.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-4">
                  {service.title}
                </h3>

                {/* Who it is for */}
                <p className="text-sm font-bold text-gray-500 mb-4">{service.audience}</p>

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
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/60 px-8 py-3.5 text-base font-semibold text-[#0D0D0D] transition-all hover:bg-white hover:border-[#0D0D0D] shadow-xs cursor-pointer"
          >
            Not sure which fits? Book a 30-minute call
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
