import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const outcomes = [
  "Real inquiries. Organized pipelines.",
  "A website that sells instead of apologizes.",
  "Clear data on what’s working.",
  "No more guessing. No more lost leads.",
  "Professional execution that wins trust and closes deals.",
];

export function DreamOutcomeSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden z-10 border-t border-gray-100">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />

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
            <span className="text-cyan-700 font-bold tracking-widest uppercase text-sm px-4 py-2 rounded-full border border-cyan-100 bg-cyan-50">
              The Dream Outcome
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tighter mb-8 leading-tight">
            Imagine This
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
            Real inquiries. Organized pipelines. A digital presence that wins trust before the first call.
          </p>
        </motion.div>

        {/* The Checklist */}
        <div className="bg-[#F7F7F7] border border-gray-200 rounded-3xl p-8 md:p-12 backdrop-blur-md relative shadow-sm overflow-hidden group hover:shadow-md hover:border-cyan-200 transition-all duration-500">
           <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 group-hover:opacity-70" />
           
           <div className="space-y-6 relative z-10">
              {outcomes.map((outcome, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                  className="flex items-start gap-5 hover:bg-white p-4 rounded-xl transition-colors duration-300 -mx-4"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100 mt-0.5 shadow-sm group-hover:border-cyan-300 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                  </div>
                  <p className="text-lg md:text-xl text-[#1A1A1A] font-medium leading-relaxed">
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
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-cyan-400/20 blur-[60px] pointer-events-none" />
           <h3 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter relative z-10">
             That’s the system we build.
           </h3>
        </motion.div>

      </div>
    </section>
  );
}
