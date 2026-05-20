import React from 'react';

const LOGOS = [
  "HubSpot", "Salesforce", "Marketo", "Stripe", "Figma", "Webflow", "Sanity", "Vercel", "Shopify", "Klaviyo"
];

export function LogoTicker() {
  return (
    <section className="py-12 border-b border-gray-200 bg-[#F7F7F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-8">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Powered by industry-leading tools
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden w-full group">
        {/* Left/Right Gradients for smooth fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F7F7] to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F7F7] to-transparent z-10"></div>
        
        <div className="animate-logo-marquee flex gap-16 items-center w-max pl-16">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
            <div key={index} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-300">
              <span className="text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tighter">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
