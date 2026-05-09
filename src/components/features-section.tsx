import { motion } from "motion/react";
import { Target, Settings2, MessageCircle, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Target,
    title: "Qualified Leads",
    description: "We focus on attracting people likely to become customers.",
  },
  {
    icon: Settings2,
    title: "Done-For-You",
    description: "We handle strategy, setup, optimization, and reporting.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description: "No confusing marketing language or hidden processes.",
  },
  {
    icon: LineChart,
    title: "Measurable Results",
    description: "Everything is tracked against real business outcomes.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden z-10 border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Built Around Accountability
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500/10 via-cyan-500/50 to-cyan-500/10 mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="relative mx-auto grid max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md sm:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              className={cn(
                "group relative p-10 md:p-14 transition-colors duration-500 hover:bg-white/[0.02] border-white/10",
                idx === 0 && "border-b sm:border-r",
                idx === 1 && "border-b",
                idx === 2 && "border-b sm:border-b-0 sm:border-r",
                idx === 3 && ""
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500 mb-6 shrink-0">
                  <feature.icon className="w-7 h-7 text-gray-400 group-hover:text-cyan-400 transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
