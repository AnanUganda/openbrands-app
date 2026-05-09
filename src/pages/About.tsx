import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Target, Users, ShieldCheck, HeartHandshake, Eye, Handshake, CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex-1 pb-24">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 pt-16 md:pt-24">
        
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
            The Real Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
            Why I Started Open Brands <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600">
              (And Why It's Different)
            </span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed font-medium max-w-2xl mx-auto">
            A skill nobody else was using properly. A promise to do things differently.
          </p>
        </motion.div>

        {/* SECTION 1: THE ORIGIN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-lg"
          >
            <p>
              I spent years watching incredible entrepreneurs struggle with marketing. They weren't bad at business—they just needed leads.
            </p>
            <p>
              But every time they'd hire an agency, the same thing happened: Big promises. Vague timelines. Reports filled with vanity metrics that meant absolutely nothing to the bottom line. Slowly, trust would break down. I watched them get burned, then skeptical, then desperate.
            </p>
            <p>
              And I realized something: <strong className="text-white">I could generate qualified leads better than almost anyone I knew.</strong> But I wasn't using that skill where it actually mattered—helping the people who needed it most.
            </p>
            <p>
              So I started Open Brands. Not to brag about how great I am, but to actually help busy entrepreneurs who needed a partner they could finally trust.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="md:col-span-5 aspect-[4/5] bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden relative"
          >
             <img src="/anan.jpeg" alt="Twijjukye Anan" className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
             <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                 <p className="text-white font-medium text-lg italic mb-2">"Marketing isn't magic. It's math, human psychology, and relentless execution."</p>
                 <p className="text-cyan-400 font-bold tracking-wider uppercase text-xs">— Twijjukye Anan</p>
             </div>
          </motion.div>
        </div>

        {/* BUSINESS AS MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <HeartHandshake className="w-8 h-8 text-cyan-400" />
              Business as Mission
            </h2>
            <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
              <p>
                At Open Brands, we don't just view business as a way to make money. We view <strong>Business as Mission</strong>.
              </p>
              <p>
                This means we believe entrepreneurship is a high calling. It's an opportunity to serve others with absolute integrity, solve real problems, and bless the communities we operate in. When we help your business grow, you're able to hire more people, provide for families, and impact the world positively.
              </p>
              <p>
                Every strategy we deploy, every promise we make, and every client relationship we build is rooted in this truth: <em>We are here to serve you genuinely, not just transact with you.</em>
              </p>
            </div>
          </div>
        </motion.div>

        {/* THE CORE DIFFERENCE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24"
        >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Biggest Lie in the Agency Industry</h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Most agencies treat clients like transactions. Once you sign, communication drops and results become secondary. I'm fixing that. Here is what actually makes me different:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { 
                      icon: Target, 
                      title: "I Say No To Bad Fits", 
                      desc: "If you're not a fit for what we do, I'll tell you honestly—even if it costs me money. Bringing you on when I can't help you is worse than saying no." 
                    },
                    { 
                      icon: Eye, 
                      title: "I Show You Everything", 
                      desc: "No black box. No 'trust us.' You see weekly reports, the raw data, and understand exactly why something is or isn't working." 
                    },
                    { 
                      icon: Users, 
                      title: "Obsessed With YOUR Success", 
                      desc: "If getting you leads means changing strategy or investing more than I planned, I do it. My profit comes from your growth, not from billing you extra." 
                    },
                    { 
                      icon: Handshake, 
                      title: "Long-Term Relationships", 
                      desc: "My goal isn't a quick transaction. It's to become the trusted marketing partner you call with questions and work with for years." 
                    }
                ].map((val, i) => (
                     <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                            <val.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">{val.desc}</p>
                     </div>
                ))}
            </div>
        </motion.div>

        {/* THE PROMISE & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border-t border-white/10 pt-24 text-center"
        >
          <ShieldCheck className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">My Personal Promise</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
            When you work with Open Brands, you're working with me. I'm personally responsible for your results. If you've been burned before, you're skeptical. That's smart. So let's just have a conversation. I'll be honest if we're a fit, and you'll walk away with clarity either way.
          </p>
          
          <a 
            href="https://calendly.com/openbrand-marketing/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-5 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Schedule a Conversation (Not a Sales Call)
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-6 text-sm text-zinc-500 font-medium">
            We'll be honest about whether we're a fit. No pitch. No pressure.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
