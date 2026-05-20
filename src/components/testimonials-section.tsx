import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Jeremy Horning",
    role: "Urban Sheds",
    content: "Anan brought a fresh, creative approach to the project, and he was incredibly easy to communicate with throughout the entire process. He redesigned the site beautifully, migrated our large blog into Wix Studio, and set up the backend database for hundreds of dynamic pages. The final result continues to receive compliments from visitors.",
  },
  {
    name: "Zack Morgan",
    role: "Morgan Concrete Services",
    content: "Anan was great to work with and had excellent communication. He was patient during the process, and I am very pleased with the new website and logo design.",
  },
  {
    name: "Josh Reiff",
    role: "Reiff Design Build",
    content: "Highly recommend Open Brands for your website needs. They did a phenomenal job with our contractor site, and we get compliments on it all the time.",
  },
  {
    name: "Jeriah Raber",
    role: "Willow Hill Doodles",
    content: "The work was professional, and the difference in sales was noticeable almost immediately after launch. We are very happy with the experience.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F7F7F7] overflow-hidden z-10 border-t border-gray-200">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase text-gray-500 tracking-widest mb-3 font-semibold">
            Featured Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            Client Highlights
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center py-12 sm:py-20 min-h-[450px]"
        >
          <div className="container max-w-full flex justify-center items-center h-full relative flex-wrap md:flex-nowrap gap-8 md:gap-0 mt-12 md:mt-0">
            {testimonials.map((testimonial, i) => {
              // Create a fan out effect based on index
              const rotations = [-12, -4, 4, 12];
              const rotation = rotations[i] || 0;
              
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
                  initial={{ rotate: rotation }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group"
                  style={{
                    position: 'relative',
                    width: '320px',
                    height: '340px',
                    background: 'linear-gradient(rgba(255, 255, 255, 0.8), transparent)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 25px 25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '1rem',
                    margin: typeof window !== 'undefined' && window.innerWidth >= 768 ? '0px -40px' : '0px',
                    backdropFilter: 'blur(10px)',
                    zIndex: i,
                  }}
                >
                  <div className="absolute inset-4 rounded-xl bg-white/95 text-[#1A1A1A] shadow-xl ring-1 ring-gray-200 overflow-hidden flex flex-col">
                    <div className="p-6 flex flex-col h-full">
                      <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gray-50 ring-1 ring-gray-200 mb-4 shrink-0">
                        <Quote className="h-4 w-4 text-cyan-600" />
                      </div>
                      <p className="text-[13px] leading-relaxed text-gray-700 mb-4 flex-grow overflow-hidden line-clamp-6">
                        "{testimonial.content}"
                      </p>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-xs shrink-0">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#1A1A1A]">
                              {testimonial.name}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] font-semibold text-[#1A1A1A]">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
