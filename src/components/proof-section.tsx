import { motion } from "motion/react";

const industries = [
  "Consultants",
  "Coaches",
  "Agencies",
  "Home service businesses",
  "Health & wellness professionals",
  "Local service providers",
];

export function ProofSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#0D0D0D] overflow-hidden z-10 border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#BFF549]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Built for Real Service Businesses
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We've helped service providers across industries build websites that convert:
          </p>
        </motion.div>

        {/* Industry Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {industries.map((industry, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#161616] border border-white/[0.06] text-white text-sm font-semibold shadow-sm hover:border-[#BFF549]/40 hover:shadow-md hover:bg-[#BFF549]/10 transition-all duration-300"
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>

        {/* Outcome Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Better messaging. Better traffic.{' '}
            <span className="text-[#BFF549]">Better clients.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
