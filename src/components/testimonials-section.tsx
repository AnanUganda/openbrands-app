import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Jeremy Horning",
    role: "Urban Sheds",
    content: "I’ve known Anan even before he got into website design, and it’s been amazing to watch how quickly and passionately he dove into the craft. Once he decided to pursue design, he fully committed himself—learning from top-tier online courses and some of the best teachers out there. In no time, he mastered tools like Figma and Wix Studio.\n\nWhen my Urban Sheds website needed a revamp, I didn’t hesitate to hire him—and I’m so glad I did. Anan brought a fresh, creative approach to the project, and he was incredibly easy to communicate with throughout the entire process. He not only redesigned the site beautifully but also seamlessly migrated my large blog to the new Wix Studio platform as well as set up the backend database for 100's of dynamic pages.\n\nThe final result speaks for itself—the new website continues to receive many compliments from visitors. I’m really happy with the outcome and look forward to working with him again in the future. Highly recommended!",
    className: "md:col-span-1 md:row-span-2 flex flex-col",
  },
  {
    name: "Zack Morgan",
    role: "Morgan Concrete Services",
    content: "Anan was great to work with and had excellent communication. He was patient during the process, and I am very please with the new website and logo design.",
    className: "md:col-span-1",
  },
  {
    name: "Josh Reiff",
    role: "Reiff Design Build",
    content: "Highly recommend open brands for your website needs! They did a phenomenal job with our contractor site, and we get compliments on it all the time!",
    className: "md:col-span-1",
  },
  {
    name: "Gabe Byler",
    role: "Byler Outdoors",
    content: "I used Anan to design a billboard for my business. He has a natural talent for designing things artistically and professionally. Highly recommend!",
    className: "md:col-span-1",
  },
  {
    name: "Jeriah Raber",
    role: "Willow Hill Doodles",
    content: "The people were kind and the work was professional. What more do you want? Conversions. :) And that's what I got. The new site was hardly live before the difference in sales was showing. We are very happy with our experience",
    className: "md:col-span-1",
  },
];

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden z-10 border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Trusted by great businesses
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500/10 via-cyan-500/50 to-cyan-500/10 mx-auto rounded-full mt-6 flex-shrink-0" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-cyan-500/30",
                testimonial.className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold text-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-500 shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base">{testimonial.name}</h4>
                      <p className="text-gray-400 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                    ))}
                    <span className="text-white text-xs font-semibold ml-1">5.0</span>
                  </div>
                </div>
                
                <div className="text-zinc-200 text-[15px] md:text-base font-medium leading-relaxed tracking-normal flex-1 space-y-4">
                  {testimonial.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>"{paragraph}"</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
