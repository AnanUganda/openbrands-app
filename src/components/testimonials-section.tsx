import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { SectionLabel } from "./ui/section-label";

const testimonials = [
  {
    content: "Anan brought a fresh, creative approach to the project, and he was incredibly easy to communicate with throughout the entire process. He redesigned the site beautifully, migrated our large blog, and set up the backend.",
    name: "Jeremy Horning",
    company: "Urban Sheds",
    rating: "5.0",
  },
  {
    content: "Anan was great to work with and had excellent communication. He was patient during the process, and I am very pleased with the new website and logo design.",
    name: "Zack Morgan",
    company: "Morgan Concrete Services",
    rating: "5.0",
  },
  {
    content: "I highly recommend Open Brands for any website needs. They did a phenomenal job with our contractor website and we get compliments on it all the time.",
    name: "Josh Reiff",
    company: "Reiff Design Build",
    rating: "5.0",
  },
  {
    content: "The work was professional, and the difference in sales was noticeable almost immediately after launch. We are very happy with the experience.",
    name: "Jeriah Raber",
    company: "Willow Hill Doodles",
    rating: "5.0",
  },
];

export function TestimonialsSection() {
  // We'll define specific rotations and translations to create the "fanned out" card look
  // Spreading them out more and giving them slightly larger rotations for a better fan effect
  const desktopRotations = ["-rotate-12", "-rotate-4", "rotate-4", "rotate-12"];
  const desktopX = ["-translate-x-[75%]", "-translate-x-[25%]", "translate-x-[25%]", "translate-x-[75%]"];
  const desktopY = ["translate-y-12", "translate-y-2", "translate-y-2", "translate-y-12"];
  const zIndexes = ["z-10", "z-20", "z-30", "z-40"];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#0D0D0D] overflow-hidden z-10 border-t border-white/[0.08]">
      {/* Structural Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      }} />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BFF549]/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20">
        
        {/* Header matching the screenshot's text but with consistent H2 size and reduced margin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12 flex flex-col items-center"
        >
          <SectionLabel label="Featured Reviews" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter drop-shadow-lg mt-4">
            Client Highlights
          </h2>
        </motion.div>

        {/* Desktop Fanned Out Layout */}
        <div className="hidden md:flex justify-center items-center relative h-[500px] w-full">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className={`absolute w-[340px] lg:w-[400px] h-[400px] p-8 lg:p-10 rounded-2xl bg-[#161616] border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] hover:!rotate-0 hover:!translate-y-[-10px] hover:!z-50 hover:border-[#BFF549]/40 group cursor-default origin-bottom ${desktopRotations[idx]} ${desktopX[idx]} ${desktopY[idx]} ${zIndexes[idx]}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-8 shrink-0 border border-white/[0.08] group-hover:border-[#BFF549]/30 transition-colors duration-500">
                <Quote className="w-6 h-6 text-[#BFF549]" />
              </div>
              
              <p className="text-gray-300 text-base lg:text-sm xl:text-base leading-relaxed mb-8 flex-grow transition-colors duration-500">
                "{testimonial.content}"
              </p>
              
              <div className="pt-6 border-t border-white/[0.08] mt-auto flex items-center justify-between transition-colors duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#BFF549] flex items-center justify-center text-[#0D0D0D] font-bold text-sm shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-gray-500 font-medium group-hover:text-gray-400 transition-colors duration-500">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] transition-colors duration-500 group-hover:border-[#BFF549]/20">
                  <Star className="w-3.5 h-3.5 text-[#BFF549] fill-[#BFF549]" />
                  <span className="text-xs font-bold text-white">{testimonial.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Layout */}
        <div className="md:hidden flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-none px-4 -mx-4">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[300px] w-[85vw] snap-center p-6 rounded-2xl bg-[#161616] border border-white/[0.08] shadow-lg flex flex-col relative transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center mb-6 shrink-0 border border-white/[0.08]">
                <Quote className="w-5 h-5 text-[#BFF549]" />
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                "{testimonial.content}"
              </p>
              
              <div className="pt-4 border-t border-white/[0.08] mt-auto flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#BFF549] flex items-center justify-center text-[#0D0D0D] font-bold text-xs shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white leading-tight">
                        {testimonial.name}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium leading-tight">
                        {testimonial.company}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                    <Star className="w-3 h-3 text-[#BFF549] fill-[#BFF549]" />
                    <span className="text-[10px] font-bold text-white">{testimonial.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
