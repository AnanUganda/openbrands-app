import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "motion/react";
import { Mail, Phone, Globe, MessageCircle, ArrowRight, Clock, CalendarDays, CheckCircle2 } from "lucide-react";
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
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex-1">
      <Helmet>
        <title>Contact Us | Open Brands</title>
        <meta name="description" content="Get in touch with Open Brands to schedule a strategy call and learn how our Waitlist System™ can scale your B2B service business." />
      </Helmet>
      <FluidParticlesBackground className="pointer-events-none opacity-50" speedMultiplier={0.2} particleCount={100} />
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 pt-12 pb-24 md:pt-20 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Let's Talk
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
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
                <CalendarDays className="w-6 h-6 text-cyan-400" />
                The fastest way to get started:
              </h2>
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group hover:bg-white/[0.05] transition-colors">
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-6">
                    <CalendarDays className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Book your free strategy session</h3>
                  <p className="text-zinc-400 mb-8 max-w-md">Pick a time that works for you. We'll take it from there.</p>
                  
                  <a href="https://calendly.com/openbrand-marketing/30min" target="_blank" rel="noopener noreferrer" className="relative group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Open Calendar
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Direct Contact</h2>
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
                <a href="mailto:hello@openbrands.com" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 font-medium">Email</div>
                    <div className="text-lg">hello@openbrands.com</div>
                  </div>
                </a>
                <a href="tel:+18005550199" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 font-medium">Phone</div>
                    <div className="text-lg">+1 (800) 555-0199</div>
                  </div>
                </a>
                <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#0A66C2] transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-black hover:border-white/20 border border-transparent transition-colors">
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
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <form 
                action="https://formsubmit.co/hello@openbrands.com" 
                method="POST" 
                className="flex flex-col gap-6"
              >
                {/* Anti-spam honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                {/* Disable Captcha (optional, but good for UX) */}
                <input type="hidden" name="_captcha" value="false" />
                {/* Success redirection (can be updated to a specific thank you page later) */}
                <input type="hidden" name="_next" value={window.location.href} />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-zinc-400 mb-2">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="Company Inc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your current lead generation..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full relative group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all mt-2">
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-zinc-500 font-medium">
                  <Clock className="w-4 h-4" />
                  We'll respond within 24 hours
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section (Contact Focused) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border-t border-white/10 pt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Before we talk, here are a few things people usually ask.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
