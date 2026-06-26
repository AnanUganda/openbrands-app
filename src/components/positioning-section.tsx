import { motion } from "motion/react";

const elements = [
  "Strategic messaging",
  "Conversion-focused design",
  "SEO foundations",
  "Clean, professional branding",
];

export function PositioningSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#BFF549] overflow-hidden z-10">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: 'linear-gradient(to right, #0D0D0D 1px, transparent 1px), linear-gradient(to bottom, #0D0D0D 1px, transparent 1px)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight mb-10 leading-tight">
            Your website should not just exist —{' '}
            <span className="text-[#0D0D0D]/60">it should actively grow your business.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-[#0D0D0D]/50 text-sm font-semibold uppercase tracking-widest mb-6">
            We combine
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {elements.map((el, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0D0D0D]/20 bg-[#0D0D0D]/5 text-[#0D0D0D] text-sm font-medium hover:bg-[#0D0D0D]/10 hover:border-[#0D0D0D]/40 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D0D0D]" />
                {el}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#0D0D0D]/70 font-medium"
        >
          So your website becomes a consistent source of leads.
        </motion.p>
      </div>
    </section>
  );
}
