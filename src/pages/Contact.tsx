import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Mail, Phone, Globe, MessageCircle, ArrowRight, Clock, CalendarDays, CheckCircle2 } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitTextReveal } from "@/components/ui/split-text-reveal";

export function Contact() {
  const faqs = [
    {
      q: "What happens on the strategy call?",
      a: "We review your current website, identify why it's not converting visitors, and lay out a clear plan to turn it into a lead-generating engine."
    },
    {
      q: "How fast can we launch?",
      a: "Most website projects launch within 1–2 weeks from initial kickoff."
    },
    {
      q: "What do I need to prepare?",
      a: "Just your business goals, target audience details, and any existing brand assets. We guide you through everything else."
    },
    {
      q: "Do you work with businesses outside our city?",
      a: "Yes! We work with service businesses nationwide. All communication is seamless via video call, email, and instant updates."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden flex-1 border-t border-gray-200/80">
      <Helmet>
        <title>Book a Call & Contact Us | Open Brands</title>
        <meta 
          name="description" 
          content="Schedule a strategy call with Open Brands to turn your service website into a client-generating engine." 
        />
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80 pt-24 md:pt-32 pb-24 md:pb-32">
        
        {/* Header Section matching Homepage Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex flex-col items-center mb-16 md:mb-24 max-w-4xl mx-auto"
        >
          <SectionLabel label="©2026 Open Brands" align="center" />

          <SplitTextReveal
            as="h1"
            variant="hero"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D0D0D] tracking-tight leading-[1.05] mb-6 text-balance"
          >
            Let's Build Your Growth Engine
          </SplitTextReveal>

          <p className="text-base sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl text-balance">
            Ready to stop guessing and start getting booked clients? Choose how you'd like to reach us below.
          </p>
        </motion.div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-24">
          
          {/* Left Column: Quick Call Booking & Direct Contact Details */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* Primary Calendar Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#0D0D0D] text-[#BFF549] flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Fastest Response
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-3">
                Book a Free Strategy Session
              </h2>

              <p className="text-gray-600 font-medium leading-relaxed mb-8">
                Pick a 30-minute time slot that works best for you. We'll analyze your current site and map out a step-by-step conversion plan.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "No pressure or pushy sales pitch",
                  "Actionable insights tailored to your market",
                  "Clear project timeline and estimate"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-[#0D0D0D]">
                    <CheckCircle2 className="w-4 h-4 text-[#70c910] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://calendly.com/openbrand-marketing/30min" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block w-full sm:w-auto"
              >
                <button className="group flex items-center justify-center gap-3 w-full sm:w-auto rounded-full bg-[#BFF549] px-8 py-4 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.35)] pointer-events-auto">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
                  <span>Open Calendar</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </a>
            </motion.div>

            {/* Direct Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col gap-6"
            >
              <h3 className="text-xl font-bold text-[#0D0D0D] tracking-tight">
                Direct Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <a 
                  href="mailto:twijjukyeanan00@gmail.com" 
                  className="flex items-center gap-4 group p-3 rounded-2xl bg-gray-50 border border-gray-200/70 hover:bg-gray-100/80 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#0D0D0D] group-hover:text-[#70c910] shrink-0 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Us</div>
                    <div className="text-sm font-bold text-[#0D0D0D] truncate">twijjukyeanan00@gmail.com</div>
                  </div>
                </a>

                <a 
                  href="tel:+256754593472" 
                  className="flex items-center gap-4 group p-3 rounded-2xl bg-gray-50 border border-gray-200/70 hover:bg-gray-100/80 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#0D0D0D] group-hover:text-[#70c910] shrink-0 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Call Us</div>
                    <div className="text-sm font-bold text-[#0D0D0D]">+256 754 593 472</div>
                  </div>
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-6 bg-white border border-gray-200/90 rounded-3xl p-8 sm:p-10 shadow-sm"
          >
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Send a Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight">
                Tell us about your project
              </h2>
            </div>

            <form 
              action="https://formsubmit.co/twijjukyeanan00@gmail.com" 
              method="POST" 
              className="space-y-5"
            >
              {/* Anti-spam honeypot */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              {/* Disable Captcha */}
              <input type="hidden" name="_captcha" value="false" />
              {/* Success redirection */}
              <input type="hidden" name="_next" value={window.location.href} />

              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#0D0D0D] font-medium placeholder-gray-400 focus:outline-none focus:border-[#0D0D0D] focus:bg-white transition-colors"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#0D0D0D] font-medium placeholder-gray-400 focus:outline-none focus:border-[#0D0D0D] focus:bg-white transition-colors"
                  placeholder="sarah@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Company / Industry
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#0D0D0D] font-medium placeholder-gray-400 focus:outline-none focus:border-[#0D0D0D] focus:bg-white transition-colors"
                  placeholder="e.g. Apex Property Group"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  How can we help?
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#0D0D0D] font-medium placeholder-gray-400 focus:outline-none focus:border-[#0D0D0D] focus:bg-white transition-colors resize-none"
                  placeholder="Tell us about your business goals and what you'd like to achieve..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full group flex items-center justify-center gap-3 rounded-full bg-[#0D0D0D] px-8 py-4 text-base font-bold text-white transition-all hover:bg-gray-800 shadow-md cursor-pointer pt-4"
              >
                <span>Send Message</span>
                <div className="w-7 h-7 rounded-full bg-[#BFF549] text-[#0D0D0D] flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-gray-500">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>We typically respond within 24 hours</span>
              </div>
            </form>
          </motion.div>

        </div>

        {/* FAQs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border-t border-gray-200/80 pt-20"
        >
          <div className="text-center mb-12">
            <SectionLabel label="Got Questions?" align="center" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] tracking-tight mb-4">
              Common Questions Before Booking
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-[#0D0D0D] mb-3">{faq.q}</h3>
                <p className="text-gray-600 font-medium leading-relaxed text-sm sm:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
