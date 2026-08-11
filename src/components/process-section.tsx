import { motion } from "motion/react";
import { useRef } from "react";
import { Search, PenTool, Rocket, ArrowRight } from "lucide-react";
import { SectionLabel } from "./ui/section-label";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description: "Research audience and build a targeted keyword strategy.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design and Develop",
    description: "Design premium sites with persuasive copy to drive contacts.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Launch",
    description: "Deploy optimized site and campaigns to drive quality leads.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} id="process" className="relative w-full py-24 md:py-32 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#BFF549]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <SectionLabel label="Our Process" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] mb-4">
            How We Build Your Growth Engine
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No confusion. No long delays. Just a clear process:
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-gray-200 via-[#0D0D0D]/30 to-gray-200" />
          
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
                  <div className="w-[120px] h-[120px] rounded-3xl bg-white border-2 border-gray-200 flex flex-col items-center justify-center shadow-lg group hover:border-[#0D0D0D] transition-all duration-300">
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-1">
                      STEP {step.number}
                    </span>
                    <step.icon className="w-8 h-8 text-[#0D0D0D]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-[#0D0D0D] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-16 md:mt-24 flex justify-center relative z-20"
        >
          <Link to="/contact" className="group flex items-center justify-center gap-3 rounded-full bg-[#BFF549] px-8 py-4 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-xl">
            <span>Start Your Project</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
