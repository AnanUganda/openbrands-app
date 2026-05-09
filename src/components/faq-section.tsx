import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Isn't this expensive?",
    answer: "Compared to what? A failed $20K agency? Or the lost revenue from not getting leads? No, it's a bargain. Plus we guarantee results.",
  },
  {
    question: "How fast until we see results?",
    answer: "Leads start flowing within 30 days. Full system optimized by 90 days. That's 2-3x faster than most agencies.",
  },
  {
    question: "What if this doesn't work for us?",
    answer: "Then you get a full refund. We guarantee qualified leads. No questions asked. We don't get paid unless you get results.",
  },
  {
    question: "How much time does this require from us?",
    answer: "Essentially zero. One 15-minute call per week where we show you results. We handle everything else. You focus on your business.",
  },
  {
    question: "We tried marketing before. Why is this different?",
    answer: "Because we don't guess. We analyze YOUR market, YOUR competitors, YOUR ideal customer. We build for you specifically, not cookie-cutter.",
  },
  {
    question: "Who will I be working with?",
    answer: "You'll be paired with a dedicated senior account manager. You're never handed off to a junior media buyer or an intern. We put our best people on your account.",
  },
  {
    question: "Do you work with any industry?",
    answer: "No. We specialize in working with established B2B service businesses and high-ticket offers. If we don't think we can crush it for you, we won't take you on.",
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#020202] overflow-hidden z-10 border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
             <MessageCircleQuestion className="w-4 h-4" />
             <span>Clarification</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-xl text-zinc-400 font-medium">
             We already know you're thinking these...
          </p>
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
                  "border rounded-2xl overflow-hidden transition-colors duration-300",
                  isOpen ? "bg-white/[0.04] border-cyan-500/30" : "bg-white/[0.01] border-white/10 hover:bg-white/[0.03] hover:border-white/20"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 md:p-8 flex items-center justify-between gap-4 focus:outline-none"
                >
                   <span className={cn(
                     "font-semibold text-lg md:text-xl transition-colors duration-300",
                     isOpen ? "text-cyan-400" : "text-white"
                   )}>
                     {faq.question}
                   </span>
                   <div className={cn(
                     "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border",
                     isOpen ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400" : "bg-white/5 border-white/10 text-white/50"
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
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-zinc-300 text-base md:text-lg leading-relaxed">
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
