"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  fullText?: string;
  initials: string;
}

export const authenticTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jeremy Horning",
    role: "Founder at Urban Sheds",
    testimonial: "Anan brought a fresh, creative approach to the project, and he was incredibly easy to communicate with throughout the entire process. He redesigned the site beautifully, migrated our large blog, and set up the backend database for 100's of dynamic pages.",
    fullText: "I’ve known Anan even before he got into website design, and it’s been amazing to watch how quickly and passionately he dove into the craft. Once he decided to pursue design, he fully committed himself—learning from top-tier online courses and some of the best teachers out there. In no time, he mastered tools like Figma and Wix Studio.\n\nWhen my Urban Sheds website needed a revamp, I didn’t hesitate to hire him—and I’m so glad I did. Anan brought a fresh, creative approach to the project, and he was incredibly easy to communicate with throughout the entire process. He not only redesigned the site beautifully but also seamlessly migrated my large blog to the new Wix Studio platform as well as set up the backend database for 100's of dynamic pages.\n\nThe final result speaks for itself—the new website continues to receive many compliments from visitors. I’m really happy with the outcome and look forward to working with him again in the future. Highly recommended!",
    initials: "JH",
  },
  {
    id: 2,
    name: "Zack Morgan",
    role: "Owner at Morgan Concrete Services",
    testimonial: "Anan was great to work with and had excellent communication. He was patient during the process, and I am very pleased with the new website and logo design.",
    initials: "ZM",
  },
  {
    id: 3,
    name: "Josh Reiff",
    role: "Founder at Reiff Design Build",
    testimonial: "Highly recommend Open Brands for your website needs! They did a phenomenal job with our contractor site, and we get compliments on it all the time!",
    initials: "JR",
  },
  {
    id: 4,
    name: "Gabe Byler",
    role: "Owner at Byler Outdoors",
    testimonial: "I used Anan to design a billboard for my business. He has a natural talent for designing things artistically and professionally. Highly recommend!",
    initials: "GB",
  },
  {
    id: 5,
    name: "Jeriah Raber",
    role: "Founder at Willow Hill Doodles",
    testimonial: "The people were kind and the work was professional. What more do you want? Conversions. :) And that's what I got. The new site was hardly live before the difference in sales was showing. We are very happy with our experience.",
    initials: "JR",
  },
];

const SQRT_5000 = Math.sqrt(5000);

// Fixed pastel tints assigned strictly by card ID ((id - 1) % 3) to prevent color/style jumping when moving
const cardPastelTints = [
  "bg-[#EAF8D7] border-[#BFF549]/60",
  "bg-[#F3F4F6] border-gray-300",
  "bg-[#FDF9C3]/80 border-yellow-300",
];

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  onSelect: () => void;
  cardSize: number;
  onOpenFullText?: (testimonial: Testimonial) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  onSelect,
  cardSize,
  onOpenFullText,
}) => {
  const isCenter = position === 0;
  
  // Stable background style based on card's unique ID
  const tintClass = cardPastelTints[(testimonial.id - 1) % cardPastelTints.length];

  return (
    <div
      onClick={onSelect}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-out select-none flex flex-col justify-between",
        isCenter
          ? "z-30 bg-[#0D0D0D] text-white border-[#0D0D0D] shadow-2xl scale-100 opacity-100"
          : cn("z-10 text-[#0D0D0D] shadow-md hover:border-gray-400 opacity-90 hover:opacity-100", tintClass)
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -55 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 20px 45px rgba(0, 0, 0, 0.3)" : "0px 4px 12px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Clip-path corner accent line */}
      <span
        className={cn(
          "absolute block origin-top-right rotate-45 transition-colors duration-500",
          isCenter ? "bg-[#BFF549]/40" : "bg-gray-300"
        )}
        style={{
          right: -2,
          top: 40,
          width: SQRT_5000,
          height: 2,
        }}
      />

      {/* Header with Initials badge and 5 Stars */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border transition-colors duration-500 shrink-0",
            isCenter
              ? "bg-[#BFF549] text-[#0D0D0D] border-[#BFF549]"
              : "bg-white text-[#0D0D0D] border-gray-300 shadow-xs"
          )}>
            {testimonial.initials}
          </div>
          
          <div className={cn(
            "flex gap-1 transition-colors duration-500",
            isCenter ? "text-[#BFF549]" : "text-amber-500"
          )}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
        </div>

        {/* Quote Content */}
        <p className={cn(
          "text-sm sm:text-base font-medium leading-relaxed transition-colors duration-500 line-clamp-5",
          isCenter ? "text-gray-100" : "text-gray-900"
        )}>
          "{testimonial.testimonial}"
        </p>

        {/* Full story trigger if available */}
        {testimonial.fullText && onOpenFullText && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenFullText(testimonial);
            }}
            className={cn(
              "mt-2 text-xs font-semibold underline underline-offset-2 transition-colors",
              isCenter ? "text-[#BFF549] hover:text-white" : "text-gray-700 hover:text-black"
            )}
          >
            Read Full Review
          </button>
        )}
      </div>

      {/* Author Footer */}
      <div className="pt-4 border-t border-black/5 mt-auto">
        <h4 className={cn(
          "text-sm sm:text-base font-bold transition-colors duration-500",
          isCenter ? "text-[#BFF549]" : "text-[#0D0D0D]"
        )}>
          {testimonial.name}
        </h4>
        <p className={cn(
          "text-xs font-semibold transition-colors duration-500",
          isCenter ? "text-gray-400" : "text-gray-600"
        )}>
          {testimonial.role}
        </p>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFullText, setSelectedFullText] = useState<Testimonial | null>(null);

  const total = authenticTestimonials.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-transparent" style={{ height: 580 }}>
      {authenticTestimonials.map((testimonial, index) => {
        // Compute relative wrapped position from activeIndex
        let position = index - activeIndex;
        if (position > Math.floor(total / 2)) position -= total;
        if (position < -Math.floor(total / 2)) position += total;

        // Hide cards out of view range
        if (Math.abs(position) > 2) return null;

        return (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onSelect={() => setActiveIndex(index)}
            position={position}
            cardSize={cardSize}
            onOpenFullText={setSelectedFullText}
          />
        );
      })}

      {/* Nav Controls */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-30">
        <button
          onClick={handlePrev}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all cursor-pointer shadow-md",
            "bg-[#0D0D0D] text-white hover:bg-[#BFF549] hover:text-[#0D0D0D]"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-1.5 px-3">
          {authenticTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex ? "w-8 bg-[#0D0D0D]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all cursor-pointer shadow-md",
            "bg-[#0D0D0D] text-white hover:bg-[#BFF549] hover:text-[#0D0D0D]"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Full Text Modal */}
      {selectedFullText && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedFullText(null)}
        >
          <div 
            className="bg-[#0D0D0D] text-white border border-[#BFF549]/30 p-8 rounded-3xl max-w-xl w-full relative shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFullText(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#BFF549] text-[#0D0D0D] flex items-center justify-center font-bold text-sm">
                {selectedFullText.initials}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{selectedFullText.name}</h3>
                <p className="text-xs text-[#BFF549]">{selectedFullText.role}</p>
              </div>
            </div>

            <div className="flex gap-1 text-[#BFF549] pb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-white/10 pt-4">
              {selectedFullText.fullText || selectedFullText.testimonial}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
