import { motion } from "motion/react";
import { Target, Settings2, MessageCircle, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Target,
    title: "Conversion-Focused Websites",
    description: "Digital experiences that signal credibility and turn visitors into serious inquiries.",
  },
  {
    icon: LineChart,
    title: "Lead Generation Campaigns",
    description: "Paid traffic engineered to reach high-intent property buyers and investors.",
  },
  {
    icon: Settings2,
    title: "CRM & Follow-Up Systems",
    description: "Automated systems that capture every lead, organize pipelines, and close the gap between inquiry and sale.",
  },
  {
    icon: MessageCircle,
    title: "Growth Optimization",
    description: "Ongoing data-driven improvements so your cost per inquiry drops and quality rises.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden z-10 border-t border-gray-100">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-4">
            What We Build
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
            Your digital presence should signal confidence and competence — not raise doubts.
            We design digital experiences that build instant trust <em>and</em> generate qualified inquiries.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400/20 via-cyan-400 to-cyan-400/20 mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="relative mx-auto grid max-w-5xl rounded-3xl overflow-hidden border border-gray-200 bg-[#F7F7F7] sm:grid-cols-2 shadow-sm">
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
                "group relative p-10 md:p-14 transition-colors duration-500 hover:bg-white border-gray-200",
                idx === 0 && "border-b sm:border-r",
                idx === 1 && "border-b",
                idx === 2 && "border-b sm:border-b-0 sm:border-r",
                idx === 3 && ""
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center border border-cyan-100 group-hover:border-cyan-300 group-hover:bg-cyan-100 transition-all duration-500 mb-6 shrink-0">
                  <feature.icon className="w-7 h-7 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
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
