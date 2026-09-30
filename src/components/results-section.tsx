import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SectionLabel } from "./ui/section-label";
import { SplitTextReveal } from "./ui/split-text-reveal";
import { ButtonWithIcon } from "./ui/button-with-icon";
import { prefersReducedMotion } from "@/lib/motion";

interface Stat {
  /** Exact string shown once the count-up finishes, and to screen readers throughout. */
  value: string;
  label: string;
  /** Number to count up to. Omitted for values where counting reads as noise ("#1"). */
  countTo?: number;
  prefix?: string;
  suffix?: string;
}

interface CaseStudy {
  client: string;
  clientUrl?: string;
  meta: string;
  /** Led with at large size; the rest sit in a row beneath it. */
  stats: Stat[];
  proof: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    client: "Urban Sheds",
    clientUrl: "https://www.urban-sheds.com/",
    meta: "Custom shed builder · USA",
    stats: [
      { value: "5,400+", label: "monthly visitors", countTo: 5400, suffix: "+" },
      { value: "10,000+", label: "blog reads per month", countTo: 10000, suffix: "+" },
      { value: "500+", label: "ChatGPT queries that pulled from the site this month", countTo: 500, suffix: "+" },
      { value: "Page 1", label: 'on Google for "shed siding options"' },
    ],
    proof:
      "We redesigned the site, migrated a large blog, and built the database behind hundreds of dynamic pages. Now the site gets found by people searching topics like “modern shed” and “shed siding options”, and AI assistants like ChatGPT and Perplexity use it when answering buyers' questions.",
    tags: ["Web Design", "SEO", "GEO (AI Search)", "Content"],
    image: "/case-studies/urban-sheds.avif",
    imageAlt: "Urban Sheds custom backyard shed",
  },
  {
    client: "Sowers Harvest Café",
    meta: "Café & restaurant · State College, PA",
    stats: [
      { value: "3,600+", label: "monthly visitors", countTo: 3600, suffix: "+" },
      { value: "~48%", label: "of all visits come from Google search", countTo: 48, prefix: "~", suffix: "%" },
      { value: "2,500+", label: "menu page views per month", countTo: 2500, suffix: "+" },
      { value: "#1", label: "on Google when people search the café's name" },
    ],
    proof:
      "Nearly half of the café's traffic comes from organic Google search, with no ad spend. Most visitors go straight to the menu, which is what a local customer is doing right before they walk in.",
    tags: ["Web Design", "Local SEO", "Site Management"],
    image: "/case-studies/hero-image-sowers.avif",
    imageAlt: "Sowers Harvest Café",
  },
];

/**
 * Counts up to a stat's value when it scrolls into view. Falls back to the
 * final value immediately when the stat is not numeric or the visitor has
 * asked for reduced motion.
 */
function StatValue({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    // Nothing to animate: the render below already shows the exact value.
    if (!el || stat.countTo === undefined || prefersReducedMotion()) return;

    const target = stat.countTo;
    const duration = 1400;
    let frame = 0;

    // A plain IntersectionObserver rather than motion's useInView, which does
    // not fire for these nodes in this tree.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          // Clamped at both ends: a rAF timestamp can precede the start time
          // captured when scheduling, and a negative progress would send the
          // cubic easing below zero and render a negative number.
          const progress = Math.min(Math.max((now - start) / duration, 0), 1);
          // Matches the decelerating curve used elsewhere on the page.
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplay(
            `${stat.prefix || ""}${current.toLocaleString("en-US")}${stat.suffix || ""}`
          );
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat]);

  // Not a live region, so assistive tech reads whatever is present when it
  // reaches the number rather than announcing each intermediate value. The
  // pre-animation render is the exact value, so prerendered HTML is correct.
  return <span ref={ref}>{display ?? stat.value}</span>;
}

export function ResultsSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden z-10 border-t border-gray-200/80">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#BFF549]/15 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16 flex flex-col items-center"
        >
          <SectionLabel label="THE RESULTS" align="center" />
          <SplitTextReveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D0D0D] tracking-tight leading-[1.1] mt-2">
            Websites That Get Found. And Get Used.
          </SplitTextReveal>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed text-balance">
            Real numbers from sites we built and still manage. No projections, no mockups: 30 days
            of live analytics.
          </p>
        </motion.div>

        {/* Case studies: alternating text / image rows */}
        <div className="space-y-20 lg:space-y-28">
          {CASE_STUDIES.map((study, index) => {
            const [lead, ...rest] = study.stats;
            const imageFirst = index % 2 === 1;

            return (
              <motion.article
                key={study.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Copy */}
                <div className={imageFirst ? "lg:order-2" : undefined}>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {study.meta}
                  </p>

                  <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0D0D0D] leading-[1.15]">
                    {study.clientUrl ? (
                      <a
                        href={study.clientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-[#BFF549] decoration-2 underline-offset-4 hover:decoration-[#0D0D0D] transition-colors"
                      >
                        {study.client}
                      </a>
                    ) : (
                      study.client
                    )}
                  </h3>

                  <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                    {study.proof}
                  </p>

                  <div className="mt-8 pt-8 border-t border-gray-200/80">
                    <p className="text-5xl sm:text-6xl font-bold tracking-tight text-[#0D0D0D] tabular-nums">
                      <StatValue stat={lead} />
                    </p>
                    <p className="mt-2 text-sm text-gray-600">{lead.label}</p>
                  </div>

                  {/* Supporting stats */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {rest.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-xl sm:text-2xl font-bold tracking-tight text-[#0D0D0D] tabular-nums">
                          <StatValue stat={stat} />
                        </p>
                        <p className="mt-1 text-xs text-gray-600 leading-snug">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-full bg-white text-[#0D0D0D] border border-gray-200/80 text-xs font-bold shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Site image */}
                <div className={imageFirst ? "lg:order-1" : undefined}>
                  <div className="aspect-square w-full overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm">
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="mt-8 text-xs sm:text-sm text-gray-500">
          Figures from each site's Wix Analytics, 30-day period ending September 2026.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 text-center"
        >
          <p className="text-base sm:text-lg font-medium text-[#0D0D0D]">
            Want numbers like these for your business?
          </p>
          <ButtonWithIcon to="/contact" variant="lime" size="lg">
            Book a Strategy Call
          </ButtonWithIcon>
        </motion.div>
      </div>
    </section>
  );
}
