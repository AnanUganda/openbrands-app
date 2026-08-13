import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/section-label";
import { SplitTextReveal } from "./ui/split-text-reveal";

const pitfalls = [
  "I built my website, but it doesn't bring clients.",
  "People visit my site, but they don't contact me.",
  "I paid a designer, but nothing changed.",
  "My competitors are getting all the work online.",
];

export function ProblemSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">

      <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">

        {/* Top Header matching reference layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16"
        >
          <div className="flex flex-col items-start max-w-3xl">
            {/* Eyebrow */}
            <SectionLabel label="The Reality" align="left" />

            {/* Consistent H2 Heading */}
            <SplitTextReveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] text-balance">
              Your Website Isn't Broken. It Was Never Built to Sell. <span className="text-gray-400 font-semibold">We fix that.</span>
            </SplitTextReveal>
          </div>

          {/* Subtitle Right Column */}
          <p className="text-gray-600 text-base sm:text-lg font-medium max-w-md leading-relaxed">
            You paid for a website. It loads fast, it looks clean, your logo's in the corner — and it does almost nothing. That's not bad luck. It's what happens when a site is designed to look like a business instead of run like one.          </p>
        </motion.div>

        {/* Main Content Layout matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Large Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative w-full"
          >
            <div className="relative w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-200/90 shadow-2xl h-[420px] sm:h-[500px] lg:h-[600px]">
              <img
                src="/portfolio/Landscaping website.png"
                alt="Landscaping Website Showcase"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right Column: Stacked Pitfalls List + Divider Lines + Primary CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Small eyebrow text above bullet points */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0D0D0D]/70 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]" />
              Does this sound like you?
            </p>

            {/* Stacked Divider Items */}
            <div className="divide-y divide-gray-200/80 border-t border-b border-gray-200/80 w-full mb-6">
              {pitfalls.map((pitfall, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                  className="py-5 md:py-6 flex items-start gap-4 group cursor-default transition-colors hover:bg-gray-50/80 px-2 rounded-xl"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D] mt-2.5 shrink-0 group-hover:bg-[#BFF549] transition-colors" />
                  <p className="text-base sm:text-lg md:text-xl font-bold text-[#0D0D0D] leading-snug">
                    "{pitfall}"
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Empathy note before CTA */}
            <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed mb-6">
              You are not alone — and we would like to fix that.
            </p>

            {/* Primary CTA Button */}
            <Link to="/contact" className="w-fit">
              <button className="group flex items-center gap-3 rounded-full bg-[#BFF549] px-8 py-4 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.3)] pointer-events-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
                <span>Book a Strategy Call</span>
              </button>
            </Link>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
