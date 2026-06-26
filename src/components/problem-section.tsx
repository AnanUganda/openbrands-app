import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { SectionLabel } from "./ui/section-label";

const painPoints = [
  "I built my website, but it doesn't bring clients",
  "I paid a designer, but nothing changed in my business",
  "People visit my site, but don't contact me",
  "My website looks fine, but it doesn't convert",
  "I have no idea why I'm not getting traffic",
  "My competitors seem to be getting all the clients online",
];

export function ProblemSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#0D0D0D] overflow-hidden z-10">
      
      {/* Background structural grid (optional full width) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
        >
          <SectionLabel label="The Harsh Reality" />
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-[800px] mx-auto text-balance">
            Most Service Websites Fail to Bring in Clients
          </h2>
        </motion.div>

        {/* 3×2 Grid of Styled Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
          {painPoints.map((pain, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              className="group relative p-8 md:p-10 bg-[#0D0D0D] border border-white/[0.1] hover:border-[#BFF549]/40 transition-all duration-300"
            >
              {/* Corner nodes */}
              <div className="absolute top-[-1px] left-[-1px] w-2 h-2 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />
              <div className="absolute top-[-1px] right-[-1px] w-2 h-2 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />
              <div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />
              <div className="absolute bottom-[-1px] right-[-1px] w-2 h-2 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />

              {/* Dotted grid background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]" 
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '16px 16px'
                }}
              />
              
              <div className="relative z-10 flex flex-col items-start h-full">
                <div className="text-[#BFF549] mb-4 sm:mb-6">
                  <Quote className="w-5 h-5 opacity-80" />
                </div>
                <p className="text-white text-xl sm:text-2xl font-bold leading-[1.15] tracking-tight group-hover:text-gray-100 transition-colors mt-auto">
                  "{pain}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
