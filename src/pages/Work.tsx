import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

export function Work() {
  const caseStudies = [
    {
      title: "Consortium Studio",
      category: "B2B SaaS Lead Gen",
      stats: "+340% Pipeline Growth",
      image: "/portfolio/Lifecall%20display%202.png" 
    },
    {
      title: "Heritage Heights",
      category: "High-Ticket Real Estate",
      stats: "12x ROAS",
      image: "/portfolio/Torify%20Case%202.png"
    },
    {
      title: "Pro Coach",
      category: "Consulting & Coaching",
      stats: "$1.2M Added Revenue",
      image: "/portfolio/Pro%20coach.png"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex-1 pb-24">
      <Helmet>
        <title>Portfolio & Case Studies | Open Brands</title>
        <meta name="description" content="Browse our recent success stories and see how our systems drive predictable, scalable growth for B2B businesses and high-ticket consultants." />
      </Helmet>
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 pt-16 md:pt-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
            Our Portfolio
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8">
            Proof is in the <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Pipeline</span>.
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Browse our recent success stories and see how our systems drive predictable, scalable growth for businesses.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 pt-8 md:pt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                 className="group cursor-pointer"
               >
                   <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
                       <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                   </div>
                   <div className="flex justify-between items-start">
                       <div>
                           <div className="text-cyan-400 font-medium text-sm mb-2">{study.category}</div>
                           <h3 className="text-2xl font-bold text-white mb-2">{study.title}</h3>
                           <div className="text-zinc-400 font-semibold">{study.stats}</div>
                       </div>
                       <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-300">
                           <ArrowUpRight className="w-5 h-5" />
                       </div>
                   </div>
               </motion.div>
            ))}
        </div>
      </div>

      {/* Re-use the existing image slider for the visual heavy lifting */}
      <div className="mt-8 mb-16">
        <ImageAutoSlider />
      </div>

    </div>
  );
}
