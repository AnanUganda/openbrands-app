import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const outcomes = [
  "You're getting qualified leads consistently every single week.",
  "Your sales team actually has a pipeline to work with—no more chasing cold deals.",
  "You've stopped guessing which marketing channels work because you have the hard data.",
  "You have a predictable, scalable revenue engine that runs independently of your daily effort.",
  "Your team is energized by momentum, not paralyzed by inconsistent lead flow.",
  "You are strategically planning next year's expansion with total confidence.",
];

export function DreamOutcomeSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#020202] overflow-hidden z-10 border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* Opening Scene */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4 md:mb-6">
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10">
              The Dream Outcome
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
            Imagine this: <br className="hidden md:block"/>
            <span className="text-zinc-500 font-medium">90 days from now.</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto font-medium">
            It's Monday morning. You open your pipeline report and instead of that familiar knot of anxiety, you see a calendar booked with qualified buyers who asked to speak with you over the weekend.
          </p>
        </motion.div>

        {/* The Checklist */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md relative shadow-2xl overflow-hidden group">
           <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 group-hover:opacity-70" />
           
           <div className="space-y-6 relative z-10">
              {outcomes.map((outcome, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                  className="flex items-start gap-5 hover:bg-white/5 p-4 rounded-xl transition-colors duration-300 -mx-4"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/30 mt-0.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed">
                    {outcome}
                  </p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Closing Line */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
           className="mt-20 text-center relative"
        >
           {/* Inner glow for text */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-cyan-500/20 blur-[60px] pointer-events-none" />
           <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter relative z-10 drop-shadow-xl">
             That's what we build.
           </h3>
        </motion.div>

      </div>
    </section>
  );
}
