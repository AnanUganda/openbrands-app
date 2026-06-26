import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "motion/react";
import { ArrowRight, Target, Users, ShieldCheck, HeartHandshake, Eye, Handshake } from "lucide-react";

export function About() {
  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] overflow-hidden flex-1 pb-24 text-white">
      <Helmet>
        <title>Our Story | Open Brands</title>
        <meta name="description" content="Discover why Open Brands was founded and learn about our mission to help B2B service businesses scale with predictability and integrity." />
      </Helmet>
      
      {/* Background structural grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      }} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 pt-16 md:pt-24">
        
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm border-l-2 border-[#BFF549] bg-white/[0.03] text-xs font-bold tracking-widest uppercase text-gray-300 shadow-sm backdrop-blur-md mb-6">
            THE REAL STORY
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-white tracking-tighter leading-[1.05] mb-6 text-balance drop-shadow-lg">
            Why I Started Open Brands <br className="hidden md:block" />
            <span className="text-gray-500">
              (And Why It's Different)
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed text-balance">
            A skill nobody else was using properly. A promise to do things differently.
          </p>
        </motion.div>

        {/* SECTION 1: THE ORIGIN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-32 border-y border-white/[0.08] py-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-7 space-y-6 text-gray-300 leading-relaxed text-lg"
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
            className="md:col-span-5 aspect-[4/5] bg-[#161616] border border-white/[0.08] p-2 overflow-hidden relative shadow-sm"
          >
             <img src="/anan.jpeg" alt="Twijjukye Anan" className="w-full h-full object-cover object-top grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent pointer-events-none"></div>
             <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                 <p className="text-white font-medium text-lg md:text-xl italic mb-3">"Marketing isn't magic. It's math, human psychology, and relentless execution."</p>
                 <p className="text-[#BFF549] font-bold tracking-widest uppercase text-xs">— Twijjukye Anan</p>
             </div>
          </motion.div>
        </div>

        {/* BUSINESS AS MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#161616] border border-white/[0.08] p-8 md:p-16 mb-32 relative overflow-hidden group hover:border-[#BFF549]/30 transition-colors duration-500"
        >
          {/* Subtle grid pattern in card */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '16px 16px'
          }} />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4 tracking-tight">
              <HeartHandshake className="w-10 h-10 text-[#BFF549]" />
              Business as Mission
            </h2>
            <div className="space-y-6 text-gray-300 text-xl leading-relaxed">
              <p>
                At Open Brands, we don't just view business as a way to make money. We view <strong className="text-white">Business as Mission</strong>.
              </p>
              <p>
                This means we believe entrepreneurship is a high calling. It's an opportunity to serve others with absolute integrity, solve real problems, and bless the communities we operate in. When we help your business grow, you're able to hire more people, provide for families, and impact the world positively.
              </p>
              <p className="text-[#BFF549] font-medium border-l-2 border-[#BFF549] pl-6 italic">
                "Every strategy we deploy, every promise we make, and every client relationship we build is rooted in this truth: We are here to serve you genuinely, not just transact with you."
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
          className="mb-32"
        >
            <div className="text-center mb-16 flex flex-col items-center">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm border-l-2 border-[#BFF549] bg-white/[0.03] text-xs font-bold tracking-widest uppercase text-gray-300 shadow-sm backdrop-blur-md mb-6">
                THE CORE DIFFERENCE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-[800px] text-balance">The Biggest Lie in the Agency Industry</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
                     <div key={i} className="group relative bg-[#0D0D0D] border border-white/[0.08] hover:border-[#BFF549]/40 p-10 transition-all duration-300 overflow-hidden">
                        {/* Corner nodes */}
                        <div className="absolute top-[-1px] left-[-1px] w-1.5 h-1.5 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />
                        <div className="absolute top-[-1px] right-[-1px] w-1.5 h-1.5 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />
                        <div className="absolute bottom-[-1px] left-[-1px] w-1.5 h-1.5 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />
                        <div className="absolute bottom-[-1px] right-[-1px] w-1.5 h-1.5 bg-[#BFF549] z-10 transition-transform duration-300 group-hover:scale-125" />

                        <div className="w-12 h-12 bg-white/[0.03] flex items-center justify-center text-[#BFF549] mb-8 border border-white/[0.08] group-hover:bg-[#BFF549]/10 group-hover:border-[#BFF549]/30 transition-all">
                            <val.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors tracking-tight">{val.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">{val.desc}</p>
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
          className="border-t border-white/[0.08] py-24 text-center"
        >
          <ShieldCheck className="w-16 h-16 text-[#BFF549] mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">My Personal Promise</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            When you work with Open Brands, you're working with me. I'm personally responsible for your results. If you've been burned before, you're skeptical. That's smart. So let's just have a conversation. I'll be honest if we're a fit, and you'll walk away with clarity either way.
          </p>
          
          <a 
            href="https://calendly.com/openbrand-marketing/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#BFF549] text-[#0D0D0D] px-10 py-5 font-bold text-lg hover:bg-[#d4ff6e] transition-all shadow-[0_0_30px_rgba(191,245,73,0.15)] group"
          >
            Schedule a Conversation (Not a Sales Call)
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-8 text-sm text-gray-500 font-medium tracking-wide uppercase">
            We'll be honest about whether we're a fit. No pitch. No pressure.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
