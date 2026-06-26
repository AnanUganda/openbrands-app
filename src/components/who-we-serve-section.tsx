import { motion } from "motion/react";
import { Home, Scale, HeartPulse, UserCircle, TrendingUp, Wrench, ArrowRight } from "lucide-react";
import { SectionLabel } from "./ui/section-label";

const sectors = [
  {
    icon: Home,
    title: "Real Estate & Property",
    description: "Websites that showcase listings beautifully and capture high-intent buyer leads.",
  },
  {
    icon: Scale,
    title: "Law Firms & Legal",
    description: "Professional, authoritative designs that build instant trust with potential clients.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellness",
    description: "Calm, welcoming interfaces designed to book more patient appointments.",
  },
  {
    icon: UserCircle,
    title: "Consultants & Coaches",
    description: "Personal brand focused sites that position you as the premium choice.",
  },
  {
    icon: TrendingUp,
    title: "Financial Advisors",
    description: "Credible, secure-feeling designs that attract high-net-worth individuals.",
  },
  {
    icon: Wrench,
    title: "Home Services",
    description: "Frictionless funnels that turn local search traffic into booked jobs.",
  },
];

export function WhoWeServeSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#0D0D0D] overflow-hidden z-10 border-t border-white/[0.04]">
      
      {/* Background structural grid */}
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
          className="text-center mb-16 md:mb-20"
        >
          <SectionLabel label="Who We Serve" />
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-[800px] mx-auto text-balance">
            Engineered for Service Businesses
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-6">
            We don't build generic brochure sites. We build highly-optimized client acquisition systems for specific industries.
          </p>
        </motion.div>

        {/* 3×2 Grid of Styled Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sectors.map((sector, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              className="group relative p-8 md:p-10 bg-[#0D0D0D] border border-white/[0.1] hover:border-white/[0.3] transition-all duration-300"
            >
              {/* Corner nodes */}
              <div className="absolute top-[-1px] left-[-1px] w-2 h-2 bg-white/40 z-10 transition-colors duration-300 group-hover:bg-white" />
              <div className="absolute top-[-1px] right-[-1px] w-2 h-2 bg-white/40 z-10 transition-colors duration-300 group-hover:bg-white" />
              <div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 bg-white/40 z-10 transition-colors duration-300 group-hover:bg-white" />
              <div className="absolute bottom-[-1px] right-[-1px] w-2 h-2 bg-white/40 z-10 transition-colors duration-300 group-hover:bg-white" />

              {/* Dotted grid background */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]" 
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '16px 16px'
                }}
              />
              
              <div className="relative z-10 flex flex-col items-start h-full">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  <sector.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-2xl font-bold tracking-tight mb-3">
                  {sector.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outline CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center"
        >
          <button className="group flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold tracking-wide hover:bg-white hover:text-[#0D0D0D] transition-all duration-300 hover:scale-105 active:scale-95">
            See How We Can Help
            <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-[#0D0D0D] transition-colors" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
