import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FinalCtaSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#111111] overflow-hidden z-10 border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BFF549]/8 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            Ready to Turn Your Website Into a{' '}
            <span className="text-[#BFF549]">Lead Generator?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your website should be your best salesperson — working 24/7 to bring you clients. If it's not doing that yet, it's time to fix it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Primary CTA */}
          <Link to="/contact">
            <button className="group flex items-center justify-center gap-2.5 rounded-full bg-[#BFF549] px-8 py-4 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_40px_rgba(191,245,73,0.2)] hover:scale-[1.02] active:scale-[0.98]">
              👉 Book a Free Strategy Call
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>

          {/* Secondary Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/contact" 
              className="text-gray-400 hover:text-[#BFF549] transition-colors font-medium underline underline-offset-4 decoration-gray-600 hover:decoration-[#BFF549]"
            >
              Get a Website Audit
            </Link>
            <span className="text-gray-600">|</span>
            <Link 
              to="/contact" 
              className="text-gray-400 hover:text-[#BFF549] transition-colors font-medium underline underline-offset-4 decoration-gray-600 hover:decoration-[#BFF549]"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
