import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./ui/section-label";

const faqs = [
  {
    question: "Do you only build websites?",
    answer: "No — we combine website design, messaging, and SEO strategy so your site actually generates leads.",
  },
  {
    question: "How long does it take?",
    answer: "Most projects take 1–2 weeks depending on complexity.",
  },
  {
    question: "Do I need to provide content?",
    answer: "We guide you through everything — even if you're starting from scratch.",
  },
  {
    question: "What platforms do you use?",
    answer: "We work with modern website platforms like Wix, Squarespace, or Webflow depending on your needs.",
  },
  {
    question: "Who is this for?",
    answer: "Service-based businesses that want more clients from their website.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative w-full py-24 md:py-32 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#BFF549]/15 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        <div className="max-w-4xl mx-auto">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-center mb-16"
          >
            <SectionLabel label="Got Questions?" align="center" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-all duration-300",
                    isOpen ? "bg-white border-[#0D0D0D] shadow-md" : "bg-white border-gray-200/90 shadow-sm hover:border-gray-300"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 md:p-8 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                     <span className={cn(
                       "font-bold text-lg md:text-xl transition-colors duration-300",
                       isOpen ? "text-[#0D0D0D]" : "text-gray-800"
                     )}>
                       {faq.question}
                     </span>
                     <div className={cn(
                       "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border",
                       isOpen ? "bg-[#0D0D0D] text-[#BFF549] border-[#0D0D0D]" : "bg-gray-100 border-gray-200 text-gray-600"
                     )}>
                       {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                     </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-600 font-medium text-base md:text-lg leading-relaxed border-t border-gray-100 mt-2 pt-4">
                           {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
