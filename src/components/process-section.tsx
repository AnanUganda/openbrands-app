import { motion } from "motion/react";
import { ArrowRight, Crosshair, Rocket, TrendingUp, Presentation } from "lucide-react";

const processes = [
  {
    step: "01",
    title: "Strategy",
    description: "We identify the right audience, message, and channels.",
    icon: Crosshair,
  },
  {
    step: "02",
    title: "Launch",
    description: "Campaigns go live with close monitoring and optimization.",
    icon: Rocket,
  },
  {
    step: "03",
    title: "Growth",
    description: "We improve performance week by week to increase lead quality.",
    icon: TrendingUp,
  },
];

export function ProcessSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#0a0a0f] overflow-hidden z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
                <span>HOW IT WORKS</span>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                A Structured Process <br className="hidden lg:block" />
                Designed for Growth
              </h2>
              <p className="text-lg text-gray-400 max-w-xl mb-8">
                We help businesses build a reliable flow of qualified leads through a structured, done-for-you system focused on real business growth.
              </p>
              
              <button className="relative group inline-flex items-center justify-center gap-2 bg-cyan-500 text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                Schedule Strategy Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Profile Image with Cyan Theme Overlay */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
               className="relative rounded-3xl overflow-hidden aspect-[4/4] lg:aspect-[4/5] object-cover max-w-[500px] w-full border border-white/10 group"
            >
               {/* Cyan Tint Overlays */}
               <div className="absolute inset-0 bg-cyan-900/40 mix-blend-color z-10 transition-opacity duration-700 group-hover:opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
               
               {/* Profile Image */}
               <img 
                 src="/anan.jpeg"
                 alt="Process Strategy"
                 className="w-full h-full object-cover grayscale-[0.5] contrast-110 group-hover:scale-105 transition-transform duration-1000" 
               />
               
               <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                 <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <Presentation className="text-cyan-400 w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-white font-semibold">Done-For-You System</p>
                    <p className="text-cyan-300/80 text-sm">Focused on real outcomes</p>
                 </div>
               </div>
            </motion.div>
          </div>

          {/* Right Side - Timeline */}
          <div className="relative pt-8 lg:pt-0">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-500/50 via-cyan-500/10 to-transparent hidden md:block" />

            <div className="space-y-8 md:space-y-12">
              {processes.map((process, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-10"
                >
                  {/* Timeline Node */}
                  <div className="flex items-center md:items-start gap-4 md:gap-0 shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#0a0a0f] border border-cyan-500/50 hidden md:flex items-center justify-center z-10 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <process.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    {/* Mobile Only Node */}
                    <div className="w-12 h-12 rounded-full bg-[#0a0a0f] border border-cyan-500/50 flex md:hidden items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <process.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="md:hidden text-cyan-400 font-bold text-sm tracking-wider uppercase">STEP — {process.step}</span>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 group w-full">
                    <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.04] hover:border-cyan-500/30 h-full">
                      <div className="hidden md:flex items-center gap-2 text-cyan-400 text-sm font-bold tracking-wider mb-4 uppercase">
                        STEP — {process.step}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        {process.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {process.description}
                      </p>
                    </div>
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
