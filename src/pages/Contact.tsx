import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "motion/react";
import { Mail, Phone, Globe, MessageCircle, ArrowRight, Clock, CalendarDays } from "lucide-react";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

export function Contact() {
  const faqs = [
    {
      q: "What happens in the strategy call?",
      a: "We dive deep into your current lead generation process, identify gaps, and outline exactly how our Waitlist System™ would work for your specific business case."
    },
    {
      q: "How quickly can we start?",
      a: "Depending on our current capacity, we typically onboard new clients within 7-10 business days from the signed agreement."
    },
    {
      q: "What should I prepare?",
      a: "Just bring a clear understanding of your target audience, current customer lifetime value (LTV), and your growth goals for the next quarter."
    },
    {
      q: "Can we do this if we're not local?",
      a: "Absolutely. We work with businesses globally. All our communication and updates are handled seamlessly via Zoom, Slack, and our dedicated client portal."
    }
  ];

  return (
    <>
    <style>{`
      @keyframes grid-scroll {
        0% { transform: translateY(0); }
        100% { transform: translateY(100px); }
      }
      .animated-grid-bg {
        animation: grid-scroll 20s linear infinite;
      }
    `}</style>
    <div className="relative w-full min-h-screen bg-[#0D0D0D] overflow-hidden flex-1">
      <Helmet>
        <title>Contact Us | Open Brands</title>
        <meta name="description" content="Get in touch with Open Brands to schedule a strategy call and learn how our Waitlist System™ can scale your B2B service business." />
      </Helmet>
      
      {/* Animated Structural Grid Overlay */}
      <div className="absolute inset-[-100px] pointer-events-none opacity-[0.03] z-0 animated-grid-bg" style={{
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
      }} />

      {/* Subtle ambient light - significantly reduced green */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#BFF549]/3 rounded-full blur-[150px] pointer-events-none" />


      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 pt-12 pb-24 md:pt-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4 block">
            Start The Journey
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
            Let's Talk
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to stop guessing and start scaling? Choose how you'd like to reach us below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Left Column: Quick Book & Contact Info */}
          <div className="flex flex-col gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CalendarDays className="w-6 h-6 text-[#BFF549]" />
                The fastest way to get started:
              </h2>
              <div className="bg-[#161616] border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden group hover:border-[#BFF549]/40 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(191,245,73,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#BFF549]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col items-center justify-center text-center py-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/[0.08] text-[#BFF549] mb-6 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <CalendarDays className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Book your free strategy session</h3>
                  <p className="text-gray-400 mb-8 max-w-md">Pick a time that works for you. We'll take it from there.</p>
                  
                  <motion.a 
                    href="https://calendly.com/openbrand-marketing/30min" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative group/btn inline-flex items-center justify-center gap-2 bg-[#BFF549] text-[#0D0D0D] px-8 py-4 rounded-xl font-bold hover:bg-[#a9db3f] transition-colors"
                  >
                    Open Calendar
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Direct Contact</h2>
              <div className="bg-[#161616] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-6">
                <a href="mailto:twijjukyeanan00@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#BFF549]/40 group-hover:bg-[#BFF549]/10 transition-colors">
                    <Mail className="w-5 h-5 text-[#BFF549]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Email</div>
                    <div className="text-lg">twijjukyeanan00@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+256754593472" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#BFF549]/40 group-hover:bg-[#BFF549]/10 transition-colors">
                    <Phone className="w-5 h-5 text-[#BFF549]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Phone</div>
                    <div className="text-lg">+256 754 593 472</div>
                  </div>
                </a>
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-[#0D0D0D] hover:bg-[#BFF549] hover:border-[#BFF549] transition-all">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-[#0D0D0D] hover:bg-[#BFF549] hover:border-[#BFF549] transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Or send us a message</h2>
            <div className="bg-[#161616] border border-white/[0.06] rounded-[24px] p-8 relative overflow-hidden group shadow-2xl">
              <form 
                action="https://formsubmit.co/twijjukyeanan00@gmail.com" 
                method="POST" 
                className="flex flex-col gap-5 relative z-10"
              >
                {/* Anti-spam honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                {/* Disable Captcha */}
                <input type="hidden" name="_captcha" value="false" />
                {/* Success redirection */}
                <input type="hidden" name="_next" value={window.location.href} />
                
                <div>
                  <label htmlFor="name" className="block text-[11px] font-bold font-mono uppercase tracking-[0.1em] text-gray-500 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#BFF549]/50 focus:border-[#BFF549] transition-all shadow-inner"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] font-bold font-mono uppercase tracking-[0.1em] text-gray-500 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#BFF549]/50 focus:border-[#BFF549] transition-all shadow-inner"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-[11px] font-bold font-mono uppercase tracking-[0.1em] text-gray-500 mb-2">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#BFF549]/50 focus:border-[#BFF549] transition-all shadow-inner"
                    placeholder="Company Inc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold font-mono uppercase tracking-[0.1em] text-gray-500 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#BFF549]/50 focus:border-[#BFF549] transition-all shadow-inner resize-none"
                    placeholder="Tell us about your current lead generation..."
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full relative group/btn flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/[0.1] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#BFF549] hover:text-[#0D0D0D] hover:border-[#BFF549] transition-colors mt-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
                
                <div className="flex items-center justify-center gap-2 mt-2 text-[11px] font-mono text-gray-500 font-medium tracking-wider uppercase">
                  <Clock className="w-3.5 h-3.5" />
                  We'll respond within 24 hours
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border-t border-white/[0.08] pt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Before we talk, here are a few things people usually ask.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#161616] border border-white/[0.08] rounded-2xl p-6 hover:border-[#BFF549]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
    </>
  );
}
