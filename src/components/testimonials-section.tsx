import { motion } from "motion/react";
import { SectionLabel } from "./ui/section-label";
import { StaggerTestimonials } from "./ui/stagger-testimonials";
import { SplitTextReveal } from "./ui/split-text-reveal";

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BFF549]/15 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        
        {/* Header matching exact requested title and eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 flex flex-col items-center"
        >
          <SectionLabel label="IN THEIR WORDS" align="center" />
          <SplitTextReveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] mt-2">
            What Happens After Launch
          </SplitTextReveal>
        </motion.div>

        {/* Staggered Testimonials Polygon Slider */}
        <StaggerTestimonials />

      </div>
    </section>
  );
}
