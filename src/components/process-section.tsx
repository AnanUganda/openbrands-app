import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { Search, PenTool, Rocket } from "lucide-react";
import { SectionLabel } from "./ui/section-label";

const steps = [
  {
    number: "01",
    title: "Strategy & SEO",
    description: "We research your audience and competitors to position you as the clear choice. Then we build a keyword strategy to get you found.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design & Copy",
    description: "We write persuasive copy and design a premium, trust-building website that guides visitors toward contacting you.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Launch & Scale",
    description: "We deploy your optimized website, connect tracking systems, and launch campaigns to start driving high-quality leads.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} id="process" className="relative w-full py-24 md:py-32 bg-[#0D0D0D] overflow-hidden z-10 border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#BFF549]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <SectionLabel label="Our Process" />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            How We Build Your Growth Engine
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            No confusion. No long delays. Just a clear process:
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-[#BFF549]/20 via-[#BFF549]/60 to-[#BFF549]/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                {/* Step node */}
                <div className="relative z-10 mb-8">
                  <div className="w-[120px] h-[120px] rounded-3xl bg-[#161616] border-2 border-[#BFF549]/30 flex flex-col items-center justify-center shadow-lg shadow-[#BFF549]/5 group hover:border-[#BFF549]/60 hover:shadow-[#BFF549]/10 transition-all duration-500">
                    <span className="text-xs font-bold text-[#BFF549] tracking-widest uppercase mb-1">
                      STEP {step.step}
                    </span>
                    <step.icon className="w-8 h-8 text-[#BFF549]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
