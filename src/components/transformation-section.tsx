import { motion } from "motion/react";
import { Search, Shield, MousePointerClick, ArrowRight } from "lucide-react";
import { SectionLabel } from "./ui/section-label";

const cards = [
  {
    icon: Search,
    title: "Attract the right people",
    description: "SEO + structure that gets you found by your ideal clients",
  },
  {
    icon: Shield,
    title: "Build instant trust",
    description: "Clear messaging that positions you as the obvious choice",
  },
  {
    icon: MousePointerClick,
    title: "Convert visitors into leads",
    description: "Strategic design that guides people to contact you",
  },
];

export function TransformationSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#0D0D0D] overflow-hidden z-10 border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#BFF549]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Sticky Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-10">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <SectionLabel label="The Transformation" align="left" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Turn Your Website Into a Client-Generating Machine
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-md">
                We help service businesses build a powerful online presence that does 3 things:
              </p>
              <button className="bg-[#BFF549] text-[#0D0D0D] px-8 py-4 rounded-full font-bold hover:bg-[#d4ff6e] transition-colors w-fit flex items-center gap-2 hover:scale-105 active:scale-95 duration-300">
                Schedule Strategy Call
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Right Side - Timeline Cards */}
          <div className="lg:col-span-7 relative">
            {/* Vertical Line for desktop */}
            <div className="hidden lg:block absolute left-[2.4rem] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/[0.1] to-transparent" />

            <div className="flex flex-col gap-6 lg:gap-8 lg:pl-24">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  className="relative group"
                >
                  {/* Node for desktop timeline */}
                  <div className="hidden lg:flex absolute -left-[5.3rem] top-8 w-12 h-12 rounded-full bg-[#0D0D0D] border-2 border-white/[0.08] group-hover:border-[#BFF549]/50 items-center justify-center z-10 text-white/[0.3] group-hover:text-[#BFF549] transition-colors duration-500 shadow-xl">
                    <card.icon className="w-5 h-5" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#161616] border border-white/[0.06] shadow-sm hover:border-[#BFF549]/30 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#BFF549] text-xs font-bold tracking-widest uppercase">
                        Phase — 0{idx + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#BFF549] transition-colors duration-300">
                      {card.title}
                    </h3>
                    
                    <p className="text-lg text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
