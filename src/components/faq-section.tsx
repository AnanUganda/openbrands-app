import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How fast will we see results?",
    answer: "Timelines vary depending on your market, offer, and existing infrastructure. Some businesses begin seeing traction within weeks, while others require a longer optimization period.",
  },
  {
    question: "What industries do you work with?",
    answer: "We primarily work with service-based businesses that want a more reliable and measurable lead flow.",
  },
  {
    question: "Do you only build websites?",
    answer: "No. Websites are one part of the overall system. We also help with lead generation campaigns, CRM setup, automation, and conversion optimization.",
  },
  {
    question: "How involved do we need to be?",
    answer: "We handle the majority of implementation, while collaborating with you on strategy, messaging, and business goals.",
  },
  {
    question: "How do you measure success?",
    answer: "We focus on measurable outcomes such as lead quality, conversion rates, pipeline consistency, and customer acquisition performance.",
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F7F7F7] overflow-hidden z-10 border-t border-gray-200">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold tracking-wider uppercase mb-6">
             <MessageCircleQuestion className="w-4 h-4" />
             <span>Clarification</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-4">
            Common Questions
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
                  isOpen ? "bg-white border-cyan-300 shadow-md" : "bg-white border-gray-200 shadow-sm hover:shadow hover:border-gray-300"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 md:p-8 flex items-center justify-between gap-4 focus:outline-none"
                >
                   <span className={cn(
                     "font-semibold text-lg md:text-xl transition-colors duration-300",
                     isOpen ? "text-cyan-700" : "text-[#1A1A1A]"
                   )}>
                     {faq.question}
                   </span>
                   <div className={cn(
                     "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border",
                     isOpen ? "bg-cyan-100 border-cyan-200 text-cyan-700" : "bg-gray-50 border-gray-200 text-gray-400"
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
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-gray-600 text-base md:text-lg leading-relaxed">
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
    </section>
  );
}
