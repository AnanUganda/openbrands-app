import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { Search, PenTool, Rocket, ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "./ui/section-label";
import { Link } from "react-router-dom";

/**
 * Definition of process timeline steps with activation scroll thresholds
 */
const steps = [
  {
    number: "01",
    title: "Strategy",
    description: "Research audience and build a targeted keyword strategy.",
    icon: Search,
    threshold: 0.05, // Scroll progress threshold to activate Step 1
  },
  {
    number: "02",
    title: "Design and Develop",
    description: "Design premium sites with persuasive copy to drive contacts.",
    icon: PenTool,
    threshold: 0.35, // Scroll progress threshold to activate Step 2
  },
  {
    number: "03",
    title: "Launch",
    description: "Deploy optimized site and campaigns to drive quality leads.",
    icon: Rocket,
    threshold: 0.65, // Scroll progress threshold to activate Step 3
  },
];

export function ProcessSection() {
  // Container ref to track scroll position through the sticky section height
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track normalized scroll progress (0.0 to 1.0) within the section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active step index (0, 1, or 2). Default to 0 when section enters viewport.
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Real-time scroll detection logic: updates active step state as scroll thresholds are crossed
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= steps[2].threshold) {
      setActiveStepIndex(2); // Step 3 (Launch) & all previous steps active
    } else if (latest >= steps[1].threshold) {
      setActiveStepIndex(1); // Step 2 (Design & Develop) & Step 1 active
    } else {
      setActiveStepIndex(0); // Step 1 (Strategy) active
    }
  });

  // Dynamic progress line fill percentage tied directly to scroll position (0% -> 100%)
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.70], ["0%", "100%"]);

  return (
    // Outer scroll container with 200vh height to enable sticky scroll-driven timeline animation
    <section 
      ref={containerRef} 
      id="process" 
      className="relative w-full h-[200vh] sm:h-[220vh] bg-[#FBFBFB] text-[#0D0D0D] border-t border-gray-200/80"
    >
      {/* Sticky viewport frame that anchors content at top-0 while user scrolls through the 200vh height */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-center py-12 md:py-20 overflow-hidden z-10">
        
        {/* Subtle green ambient background glow */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#BFF549]/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <SectionLabel label="Our Process" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] mb-4">
              How We Build Your Growth Engine
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Scroll down to watch our step-by-step process unfold:
            </p>
          </motion.div>

          {/* Interactive Scroll Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            
            {/* Desktop Horizontal Connecting Line Base */}
            <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[3px] bg-gray-200 rounded-full overflow-hidden z-0">
              {/* Dynamic Animated Green Progress Line driven by scroll position */}
              <motion.div 
                style={{ width: lineProgress }} 
                className="h-full bg-gradient-to-r from-[#86e012] via-[#BFF549] to-[#70c910] shadow-[0_0_12px_rgba(191,245,73,0.8)]"
              />
            </div>

            {/* Mobile Vertical Connecting Line Base */}
            <div className="block md:hidden absolute left-[30px] top-[40px] bottom-[40px] w-[3px] bg-gray-200 rounded-full overflow-hidden z-0">
              {/* Dynamic Animated Green Progress Line driven by scroll position */}
              <motion.div 
                style={{ height: lineProgress }} 
                className="w-full bg-gradient-to-b from-[#86e012] via-[#BFF549] to-[#70c910] shadow-[0_0_12px_rgba(191,245,73,0.8)]"
              />
            </div>
            
            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              {steps.map((step, idx) => {
                // Determine if this step is active (reached during scroll)
                const isActive = activeStepIndex >= idx;
                const IconComp = step.icon;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className="flex flex-col items-start md:items-center text-left md:text-center group transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      // CSS Blur & Opacity transition based on scroll state threshold
                      filter: isActive ? "blur(0px)" : "blur(6px)",
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "scale(1)" : "scale(0.95)",
                      transition: "filter 0.45s ease, opacity 0.45s ease, transform 0.45s ease",
                    }}
                  >
                    {/* Step Card Node */}
                    <div className="relative z-10 mb-6 md:mb-8 ml-2 md:ml-0">
                      <div
                        className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-3xl flex flex-col items-center justify-center transition-all duration-500 border-2 ${
                          isActive
                            ? "bg-white border-[#0D0D0D] shadow-[0_12px_35px_rgba(191,245,73,0.35)] scale-105"
                            : "bg-white/80 border-gray-200/90 shadow-xs"
                        }`}
                      >
                        {/* Step Number Badge */}
                        <span
                          className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1.5 px-2.5 py-0.5 rounded-full transition-colors duration-300 ${
                            isActive
                              ? "bg-[#BFF549] text-[#0D0D0D]"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          STEP {step.number}
                        </span>

                        {/* Step Icon */}
                        <IconComp
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${
                            isActive ? "text-[#70c910]" : "text-gray-400"
                          }`}
                        />
                      </div>

                      {/* Active Status Checkmark Badge Indicator */}
                      {isActive && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0D0D0D] border-2 border-white text-[#BFF549] flex items-center justify-center shadow-md"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </motion.div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="pl-12 md:pl-0">
                      <h3 
                        className={`text-xl sm:text-2xl font-bold mb-2.5 leading-snug transition-colors duration-300 ${
                          isActive ? "text-[#0D0D0D]" : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className={`text-sm sm:text-base font-medium leading-relaxed max-w-xs transition-colors duration-300 ${
                          isActive ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-14 sm:mt-18 md:mt-20 flex justify-center relative z-20"
          >
            <Link to="/contact">
              <button className="group flex items-center justify-center gap-3 rounded-full bg-[#BFF549] px-8 py-4 text-base font-bold text-[#0D0D0D] transition-all hover:bg-[#d4ff6e] hover:shadow-[0_0_30px_rgba(191,245,73,0.35)] pointer-events-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0D0D0D]" />
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
