import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Trophy, Users, Target, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex-1 pb-24">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8">
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Results</span>, Not Retainers.
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed font-medium">
            We started Open Brands because we were tired of seeing agencies charge massive retainers for "brand awareness" while businesses starved for actual qualified leads.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">The Anti-Agency Approach</h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
              <p>
                Most agencies focus on making things look pretty. We focus on making the cash register ring. Our entire philosophy is built around predictability and mathematics.
              </p>
              <p>
                We don't guess. We engineer systems. From the first ad impression to the booked call on your calendar, every step is tracked, measured, and optimized for maximum ROI.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-black text-cyan-400 mb-2">150+</div>
                <div className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Clients Scaled</div>
              </div>
              <div>
                <div className="text-4xl font-black text-cyan-400 mb-2">$50M+</div>
                <div className="text-sm text-zinc-500 font-semibold uppercase tracking-wider">Revenue Generated</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="aspect-square bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-black to-black opacity-60"></div>
             {/* Abstract techy pattern or image here */}
             <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                 <p className="text-white font-medium text-xl">"Marketing isn't magic. It's math, human psychology, and relentless execution."</p>
             </div>
          </motion.div>
        </div>
        
        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Target, title: "Data Over Opinions", desc: "We let the numbers drive every decision. No guesswork." },
                    { icon: Users, title: "Partners, Not Vendors", desc: "We sit on the same side of the table as you. Your wins are our wins." },
                    { icon: ShieldCheck, title: "Radical Transparency", desc: "You'll always know where every dollar goes and what it brings back." }
                ].map((val, i) => (
                     <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                            <val.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{val.desc}</p>
                     </div>
                ))}
            </div>
        </motion.div>

      </div>
    </div>
  );
}
