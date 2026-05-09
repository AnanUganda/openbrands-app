import { GradientText } from "@/components/ui/gradient-text";
import { motion } from "motion/react";

export function SolutionSection() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-black overflow-hidden z-10 flex flex-col items-center justify-center border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white/90 leading-tight">
            You Deserve To Know Where <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0033] via-[#4a0050] to-[#00ff66]">Your Customer</span>{" "}
            Is Coming From
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
