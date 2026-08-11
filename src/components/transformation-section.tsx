import { motion } from "motion/react";
import { Search, Shield, MousePointerClick, ArrowRight } from "lucide-react";
import { SectionLabel } from "./ui/section-label";
import { Link } from "react-router-dom";

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
    <section className="relative w-full py-24 md:py-32 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#BFF549]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] mb-6">
                Turn Your Website Into a Client-Generating Machine
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-md">
                We help service businesses build a powerful online presence that does 3 things:
              </p>
              <Link to="/contact">
                <button className="bg-[#BFF549] text-[#0D0D0D] px-8 py-4 rounded-full font-bold hover:bg-[#d4ff6e] hover:shadow-lg transition-all w-fit flex items-center gap-2 hover:scale-105 active:scale-95 duration-300">
                  Schedule Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side - Timeline Cards */}
          <div className="lg:col-span-7 relative">
            {/* Vertical Line for desktop */}
            <div className="hidden lg:block absolute left-[2.4rem] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

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
                  <div className="hidden lg:flex absolute -left-[5.3rem] top-8 w-12 h-12 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#0D0D0D] items-center justify-center z-10 text-gray-500 group-hover:text-[#0D0D0D] transition-colors duration-500 shadow-md">
                    <card.icon className="w-5 h-5" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 rounded-[1.5rem] bg-white border border-gray-200/90 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#0D0D0D] text-xs font-bold tracking-widest uppercase bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                        Phase — 0{idx + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] mb-3">
                      {card.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
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
