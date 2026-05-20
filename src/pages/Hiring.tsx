import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "motion/react";
import { ArrowRight, Briefcase, Palette, MonitorSmartphone, Share2 } from "lucide-react";

const roles = [
  {
    title: "Graphics Designer",
    icon: Palette,
    type: "Remote / Freelance",
    description: "We are looking for a visionary graphics designer who understands that design isn't just about making things look pretty, but about driving conversions. You'll create high-impact ad creatives, landing page assets, and brand collateral.",
    requirements: [
      "Mastery of Figma, Photoshop, and Illustrator",
      "Experience designing for direct-response marketing",
      "Strong portfolio demonstrating high-contrast, modern aesthetics"
    ]
  },
  {
    title: "UI/UX Designer",
    icon: MonitorSmartphone,
    type: "Remote / Freelance",
    description: "Join us to build conversion-obsessed landing pages and web applications. You'll architect user flows, design stunning interfaces with glassmorphism and modern UI trends, and collaborate directly with our engineering team.",
    requirements: [
      "Deep understanding of conversion rate optimization (CRO)",
      "Expertise in Figma and modern web design patterns",
      "Ability to create high-fidelity prototypes"
    ]
  },
  {
    title: "Social Media Manager",
    icon: Share2,
    type: "Remote / Part-time",
    description: "We need a strategic thinker who can manage organic growth across LinkedIn, Twitter, and Instagram. You'll curate content, engage with the community, and translate complex marketing concepts into digestible, viral posts.",
    requirements: [
      "Proven track record of growing B2B social accounts",
      "Excellent copywriting skills with a punchy, bold tone",
      "Familiarity with analytics and scheduling tools"
    ]
  }
];

export function Hiring() {
  return (
    <div className="relative w-full min-h-screen bg-[#F7F7F7] overflow-hidden flex-1 pb-24">
      <Helmet>
        <title>Careers & Hiring | Open Brands</title>
        <meta name="description" content="Join Open Brands and help build the future of B2B growth. We are looking for relentless, top-tier talent who care about driving actual results." />
      </Helmet>
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold tracking-wider uppercase mb-6">
            <Briefcase className="w-4 h-4" />
            Join The Team
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] tracking-tight mb-8">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#1A1A1A] to-gray-500">Future</span> of Growth.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-6">
            We are always looking for relentless, top-tier talent who care about one thing: driving actual results. No corporate fluff, just real impact.
          </p>
          <div className="bg-white border border-cyan-100 shadow-sm rounded-2xl p-6 text-left inline-block">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Our Philosophy: Business as Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We believe entrepreneurship is a calling to serve others with absolute integrity. We don't just want employees; we want partners who view their work as a mission to genuinely help our clients succeed and bless the communities we impact.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col relative group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <role.icon className="w-6 h-6" />
              </div>
              
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider w-fit mb-4">
                {role.type}
              </div>
              
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{role.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                {role.description}
              </p>
              
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-[#1A1A1A] mb-3 uppercase tracking-wider">Requirements</h4>
                <ul className="space-y-2">
                  {role.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-cyan-600 mt-0.5">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a 
                href={`mailto:hello@openbrands.com?subject=Application for ${role.title}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 group/btn"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-cyan-50 to-white border border-cyan-100 shadow-sm rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">Don't see your role?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We are always open to hearing from exceptional talent who align with our mission-driven approach. If you operate with integrity and can bring massive value to Open Brands, pitch us your role.
          </p>
          <a 
            href="mailto:hello@openbrands.com?subject=Open Pitch: Why you need me at Open Brands"
            className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-cyan-600 transition-all hover:scale-105 shadow-sm hover:shadow"
          >
            Pitch Us
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}
