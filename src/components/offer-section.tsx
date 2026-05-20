import { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, ArrowRight, Zap, Target, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const phases = [
  {
    icon: Target,
    title: "Phase 1: Foundation & Strategy",
    timeline: "Weeks 1-2",
    description: "We establish the messaging, conversion strategy, and infrastructure needed for growth.",
    deliverables: [
      "Audience and competitor research",
      "Offer positioning",
      "Website and funnel planning",
      "CRM and tracking setup",
      "Conversion strategy mapping",
    ],
  },
  {
    icon: Zap,
    title: "Phase 2: Launch & Activation",
    timeline: "Weeks 3-4",
    description: "We deploy your website, campaigns, and lead systems.",
    deliverables: [
      "Website launch",
      "Paid ad campaign setup",
      "Lead tracking implementation",
      "Initial testing and optimization",
      "Lead capture system deployment",
    ],
  },
  {
    icon: TrendingUp,
    title: "Phase 3: Optimization & Growth",
    timeline: "Weeks 5-12",
    description: "We improve performance through data, testing, and ongoing optimization.",
    deliverables: [
      "Campaign optimization",
      "Conversion improvements",
      "Lead quality refinement",
      "Reporting and review calls",
      "Ongoing growth strategy",
    ],
  },
];

const inclusions = [
  "Conversion-focused website",
  "Lead generation setup",
  "CRM integration",
  "Tracking infrastructure",
  "Automation systems",
  "Ongoing optimization support",
];

export function OfferSection() {
  useEffect(() => {
    const w = window as any;
    if (!w.UnicornStudio) {
      w.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (!w.UnicornStudio.isInitialized) {
          w.UnicornStudio.init();
          w.UnicornStudio.isInitialized = true;
        }
      };
      document.head.appendChild(script);
    } else {
      if (typeof w.UnicornStudio.init === 'function') {
         setTimeout(() => {
           w.UnicornStudio.init();
         }, 100);
      }
    }
  }, []);

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F7F7F7] overflow-clip z-10 border-t border-gray-200">
      <div data-us-project="Vpa6JQ9WnxiC9cgDUWnu" className="absolute top-0 left-0 w-full h-full -z-10" />


      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column (60%) */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold tracking-wider uppercase mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>The Exact Blueprint</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight mb-6 leading-tight">
                The Property Growth System
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                A complete, conversion-focused digital infrastructure — positioning, website, advertising, inquiry systems, and optimization — engineered to deliver qualified property leads and long-term scalability.
              </p>
            </motion.div>

            {/* Phases */}
            <div className="space-y-8 mb-16">
              {phases.map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  className="relative pl-8 md:pl-0"
                >
                  {/* Vertical Line for mobile */}
                  <div className="absolute left-[11px] top-10 bottom-[-32px] w-[2px] bg-gray-200 md:hidden" />
                  
                  <div className="flex bg-white border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8 hover:border-cyan-300 hover:shadow-md transition-all duration-300">
                    <div className="hidden md:flex shrink-0 mr-8">
                      <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center border border-cyan-100 text-cyan-600">
                        <phase.icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                        {/* Mobile Icon */}
                        <div className="w-8 h-8 rounded-lg bg-cyan-50 flex md:hidden items-center justify-center border border-cyan-100 text-cyan-600 absolute -left-[14px]">
                          <phase.icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1A1A1A]">{phase.title}</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider w-fit">
                          <Calendar className="w-3 h-3" />
                          {phase.timeline}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {phase.description}
                      </p>
                      
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl backdrop-blur-sm relative overflow-hidden"
              >
                {/* Glow behind the box */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-[80px]" />
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">
                      Investment
                    </span>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter">
                        Custom Quote
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        Typical range: <span className="text-[#1A1A1A] font-semibold">$15,000 – $50,000+</span> depending on scope.
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-[#1A1A1A] mb-6">What's Included</h4>
                    <ul className="space-y-4">
                      {inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                          </div>
                          <span className="text-gray-600 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full relative group inline-flex items-center justify-center gap-2 bg-cyan-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-cyan-600 transition-all duration-300">
                    Book Your Strategy Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-6 flex flex-col items-center gap-2 text-center">
                    <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" />
                       No pressure.
                    </p>
                    <p className="text-sm text-gray-500">
                       We only partner with committed property businesses. If it’s not the right fit, we’ll tell you.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
