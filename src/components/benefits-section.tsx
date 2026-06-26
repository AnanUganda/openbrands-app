import { motion } from "motion/react";
import { SectionLabel } from "./ui/section-label";

const benefits = [
  {
    emoji: "📈",
    title: "Get More Clients",
    description: "Your website clearly communicates your value so visitors turn into paying customers.",
  },
  {
    emoji: "📞",
    title: "Get More Calls & Inquiries",
    description: "We design your site to guide visitors toward taking action.",
  },
  {
    emoji: "🔍",
    title: "Get Found on Google",
    description: "SEO-friendly structure helps your business show up when people search.",
  },
  {
    emoji: "🏆",
    title: "Build Authority & Trust",
    description: "A professional website that makes your business look credible instantly.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative w-full py-24 md:py-32 bg-[#111111] overflow-hidden z-10 border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#BFF549]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#BFF549]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <SectionLabel label="The Benefits" />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Everything Your Website Needs to Grow Your Business
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#BFF549]/20 via-[#BFF549] to-[#BFF549]/20 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="group relative p-8 rounded-3xl bg-[#161616] border border-white/[0.06] shadow-sm overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-[#BFF549]/30 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#BFF549]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-6 shadow-sm border border-white/[0.06] group-hover:scale-110 group-hover:bg-[#BFF549]/10 transition-all duration-500">
                  <span className="text-2xl" role="img" aria-label={benefit.title}>
                    {benefit.emoji}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
