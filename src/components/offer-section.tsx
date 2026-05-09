import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, ArrowRight, Zap, Target, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

const phases = [
  {
    icon: Target,
    title: "Phase 1: Foundation & Strategy",
    timeline: "Weeks 1-2",
    description: "We map your exact path to revenue and build the infrastructure.",
    deliverables: [
      "Deep-dive competitive & audience analysis",
      "Custom-built, high-converting funnel creation",
      "Irresistible offer formulation",
      "Advanced tracking & CRM integration",
    ],
  },
  {
    icon: Zap,
    title: "Phase 2: Launch & Activation",
    timeline: "Weeks 3-4",
    description: "Your campaigns go live to highly targeted, in-market buyers.",
    deliverables: [
      "Multi-channel ad deployment (Google, Meta, LinkedIn)",
      "Split-testing initial creative & copy variants",
      "Daily monitoring & micro-optimizations",
      "First qualified leads enter your pipeline",
    ],
  },
  {
    icon: TrendingUp,
    title: "Phase 3: Scale & Dominate",
    timeline: "Weeks 5-12",
    description: "We double down on what works to maximize your ROI.",
    deliverables: [
      "Aggressive budget allocation to winning campaigns",
      "Cost-per-lead reduction and quality enhancement",
      "Weekly performance reviews and strategy calls",
      "Predictable, scalable lead flow established",
    ],
  },
];

const inclusions = [
  "Complete Done-For-You Lead Generation Ecosystem",
  "12 Proprietary Bonuses",
  "End-to-end CRM and integration setup",
  "Dedicated senior account manager",
];

export function OfferSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-clip z-10 border-t border-white/5">
      <FluidParticlesBackground className="pointer-events-none" speedMultiplier={0.2} particleCount={200} />
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>The Exact Blueprint</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                The 90-Day Qualified <br className="hidden md:block" />
                Waitlist System™
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl">
                We don't do vague promises or "brand awareness." We build a relentless, data-driven system engineered exclusively to put qualified buyers on your calendar.
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
                  <div className="absolute left-[11px] top-10 bottom-[-32px] w-[2px] bg-white/5 md:hidden" />
                  
                  <div className="flex bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors duration-300">
                    <div className="hidden md:flex shrink-0 mr-8">
                      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                        <phase.icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                        {/* Mobile Icon */}
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex md:hidden items-center justify-center border border-cyan-500/20 text-cyan-400 absolute -left-[14px]">
                          <phase.icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-zinc-300 text-xs font-semibold uppercase tracking-wider w-fit">
                          <Calendar className="w-3 h-3" />
                          {phase.timeline}
                        </span>
                      </div>
                      
                      <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                        {phase.description}
                      </p>
                      
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="text-zinc-300 text-sm">{item}</span>
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
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden"
              >
                {/* Glow behind the box */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-[80px]" />
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">
                      Core Investment
                    </span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        Custom Quote
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-6">What's Included</h4>
                    <ul className="space-y-4">
                      {inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          </div>
                          <span className="text-zinc-300 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full relative group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-5 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Schedule Your Strategy Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-6 flex flex-col items-center gap-2 text-center">
                    <p className="text-sm text-zinc-500 font-medium flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" />
                       100% confidential. No credit card required.
                    </p>
                    <p className="text-sm text-zinc-500/80">
                       If we're not a fit, we'll tell you immediately.
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
