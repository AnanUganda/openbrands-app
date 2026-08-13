"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { SectionLabel } from "./ui/section-label";

interface CapabilityItem {
  year: string;
  title: string;
  overview: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const capabilities: CapabilityItem[] = [
  {
    year: "2026",
    title: "Product Design and UX",
    overview:
      "Defines how a brand should present itself, communicate clearly, and grow across websites, digital products, marketing materials, and social platforms. We build structured identity systems that ensure visual consistency as the brand expands.",
    image: "/Website Mockups Projects/Oakline/Oakline Landscaping_.png",
    ctaText: "Project Inquiry",
    ctaLink: "/contact",
  },
  {
    year: "2025",
    title: "Digital Product Experience Design",
    overview:
      "Crafting intuitive web interfaces and frictionless lead funnels engineered specifically for service providers. Every user journey is optimized to turn high-intent site visitors into booked client consultations.",
    image: "/Website Mockups Projects/Torify/Torify website.png",
    ctaText: "Project Inquiry",
    ctaLink: "/contact",
  },
  {
    year: "2024",
    title: "Brand Identity System Design",
    overview:
      "Comprehensive visual identity frameworks including typography, color palettes, custom UI design systems, and strategic brand positioning designed to elevate your company above local competitors.",
    image: "/Website Mockups Projects/Urban Sheds /Urban Sheds Mock Up.png",
    ctaText: "Project Inquiry",
    ctaLink: "/contact",
  },
  {
    year: "2023",
    title: "Conversion Engine & Lead Automation",
    overview:
      "Integrating automated CRM routing, instant notification triggers, and calendar booking flows so your sales team never misses a qualified lead opportunity.",
    image: "/Website Mockups Projects/Reiff Design Build /410133250_f4a94722-b23c-45c9-bcb8-1ceb81466408.png",
    ctaText: "Project Inquiry",
    ctaLink: "/contact",
  },
  {
    year: "2022",
    title: "Local Search & SEO Architecture",
    overview:
      "Building lightning-fast, search-optimized web architectures that rank at the top of local map packs and organic search results for high-value service queries.",
    image: "/Website Mockups Projects/Extend Cafes/Extend Cafes Mockup_.png",
    ctaText: "Project Inquiry",
    ctaLink: "/contact",
  },
];

// Custom smooth easing-out curve (cubic-bezier)
const smoothEaseOut = [0.16, 1, 0.3, 1];

export function CapabilitiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden border-t border-gray-200/80">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 border-l border-r border-gray-200/80">
        
        {/* Header matching screenshot 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEaseOut }}
          className="mb-12 md:mb-16"
        >
          <SectionLabel label="Our Capabilities" align="left" />
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
            <span className="block text-gray-400 font-semibold mb-1">
              Designed for
            </span>
            <span className="block text-[#0D0D0D] font-bold">
              Business owners
            </span>
          </h2>
        </motion.div>

        {/* Accordion / Hover Items List */}
        <div className="divide-y divide-gray-200/90 border-t border-b border-gray-200/90 w-full">
          {capabilities.map((item, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(idx)}
                className="py-6 sm:py-8 transition-colors group cursor-pointer"
              >
                {/* Collapsed Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                  <div className="flex items-baseline gap-6 md:gap-12 lg:gap-16">
                    {/* Year / Index */}
                    <span
                      className={`text-xl sm:text-2xl md:text-3xl font-bold shrink-0 transition-colors duration-300 ${
                        isHovered ? "text-[#0D0D0D]" : "text-gray-400"
                      }`}
                    >
                      {item.year}
                    </span>

                    {/* Capability Title */}
                    <h3
                      className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-colors duration-300 ${
                        isHovered
                          ? "text-[#0D0D0D]"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Project Inquiry CTA Button */}
                  <div className="flex items-center self-end sm:self-auto">
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, x: 10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9, x: 10 }}
                          transition={{ duration: 0.3, ease: smoothEaseOut }}
                        >
                          <Link to={item.ctaLink}>
                            <button className="flex items-center gap-2 rounded-full bg-gray-200/80 hover:bg-[#BFF549] px-4 py-2 text-xs sm:text-sm font-bold text-[#0D0D0D] transition-colors duration-300">
                              <span className="w-2 h-2 rounded-full bg-[#0D0D0D]" />
                              <span>{item.ctaText}</span>
                            </button>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Smooth Easing-Out Expandable Dark Card Content */}
                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: smoothEaseOut }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 bg-[#0D0D0D] text-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                          
                          {/* Left Column: Overview Details */}
                          <div className="lg:col-span-6 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-[#BFF549] text-sm">✹</span>
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Overview
                              </span>
                            </div>

                            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-balance">
                              {item.overview}
                            </p>
                          </div>

                          {/* Right Column: High Quality Preview Image */}
                          <div className="lg:col-span-6">
                            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 aspect-[16/10] bg-gray-900 shadow-xl">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                              />
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
