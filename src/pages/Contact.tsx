import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, ArrowRight, Clock, CheckCircle2, Loader2, AlertCircle, MessageCircle, ChevronDown, Plus, Minus } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { authenticTestimonials } from "@/components/ui/stagger-testimonials";
import { getUtmParams, trackLeadGenerated } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CAL_BOOKING_URL, handleBookingClick, openBookingPopup } from "@/lib/cal-booking";

// TODO: replace the placeholder below with the real value.
const GOOGLE_REVIEWS_URL = "[GOOGLE_REVIEWS_URL]";

// Jeriah Raber's quote mentions sales; Jeremy Horning's runs at the bottom of the page.
const cardTestimonial = authenticTestimonials.find((t) => t.name === "Jeriah Raber");
const closingTestimonial = authenticTestimonials.find((t) => t.name === "Jeremy Horning");

const GOAL_OPTIONS = [
  "More enquiries",
  "A new website",
  "Leads followed up automatically",
  "Showing up on Google",
  "Not sure yet",
];

const EMPTY_FORM = {
  name: "",
  whatsapp: "",
  email: "",
  business: "",
  website: "",
  goal: "",
  notes: "",
  fax: "", // Anti-spam honeypot
};

const inputClass =
  "w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-[#0D0D0D] font-medium placeholder-gray-400 focus:outline-none focus:border-[#0D0D0D] focus:bg-white transition-colors";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2";

function RequiredMark() {
  return <span className="text-red-500">*</span>;
}

export function Contact() {
  const { hash, key: locationKey } = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookRef = useRef<HTMLDivElement>(null);

  const reviewRef = useRef<HTMLElement>(null);

  const scrollToSection = useCallback((section: HTMLElement | null) => {
    if (!section) return;
    // Native smooth scrolling fights Lenis, so scroll through it when it's running.
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(section);
    } else {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToBooking = useCallback(() => {
    scrollToSection(bookRef.current);
    openBookingPopup();
  }, [scrollToSection]);

  // Nav anchors (/contact#book, /contact#review). After a route change, wait for
  // the scroll-to-top reset to run first; on this page, scroll straight away.
  const hasSettled = useRef(false);
  useEffect(() => {
    const id = window.setTimeout(() => {
      hasSettled.current = true;
    }, 400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (hash !== "#book" && hash !== "#review") return;
    const go = () => (hash === "#book" ? scrollToBooking() : scrollToSection(reviewRef.current));
    const id = window.setTimeout(go, hasSettled.current ? 0 : 400);
    return () => window.clearTimeout(id);
  }, [hash, locationKey, scrollToBooking, scrollToSection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const required = [formData.name, formData.whatsapp, formData.email, formData.business, formData.website, formData.goal];
    if (required.some((value) => !value.trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const goal = formData.goal.trim();
      const notes = formData.notes.trim();

      // Same /api/lead handler and destinations as before; the new fields map onto
      // the fields it already accepts.
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.whatsapp.trim(),
        business: formData.business.trim(),
        website: formData.website.trim(),
        services: [goal],
        message: [`What do you want more of: ${goal}`, notes ? `Anything else: ${notes}` : null]
          .filter(Boolean)
          .join("\n\n"),
        fax: formData.fax.trim(),
        source: "contact_form",
        utm: getUtmParams(),
        referrer: typeof document !== "undefined" ? document.referrer : "",
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Unable to send your details. Please try again.");
      }

      // Track lead conversion in Google Analytics
      trackLeadGenerated("contact_form");

      // Full page load, not a client-side route change, so a Google Ads "page load"
      // conversion on /thank-you fires reliably.
      window.location.assign("/thank-you");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "What happens on the call?",
      a: "I'll have looked at your website before we talk. We go through what's stopping visitors from enquiring, what your best clients need to hear, and what I'd change first. You keep that plan whether we work together or not.",
    },
    {
      q: "How much does a project cost?",
      a: "Websites start from UGX 4,500,000 and full client acquisition systems from UGX 9,000,000. You'll get an exact written quote within 24 hours of our call, and payment is split into three stages.",
    },
    {
      q: "How long does it take?",
      a: "A Conversion Website takes 3–4 weeks. A Client Acquisition Engine takes 6–8 weeks, from strategy call to launch.",
    },
    {
      q: "Do you only work with Kampala businesses?",
      a: "No. I work with service businesses across Uganda and in the United States, over video call, email and WhatsApp.",
    },
  ];

  const steps = [
    "You book a call or send your details.",
    "I review your website and reply within 24 hours.",
    "We go through your plan together, and you decide whether to go ahead.",
  ];

  const directContacts = [
    { label: "Chat on WhatsApp", href: "https://wa.me/256754593472", icon: MessageCircle, external: true },
    { label: "Call +256 754 593 472", href: "tel:+256754593472", icon: Phone, external: false },
    { label: "hello@openbrands.studio", href: "mailto:hello@openbrands.studio", icon: Mail, external: false },
  ];

  const hasReviewsUrl = GOOGLE_REVIEWS_URL.startsWith("http");

  return (
    <div className="relative w-full min-h-screen bg-[#FBFBFB] text-[#0D0D0D] overflow-hidden flex-1 border-t border-gray-200/80">
      <Helmet>
        <title>Book a Free Strategy Call | Open Brands</title>
        <meta
          name="description"
          content="Book a free 30-minute call with me, Anan. You'll leave with a clear list of what's stopping your website from bringing in enquiries, whether we work together or not."
        />
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-20 border-l border-r border-gray-200/80 pt-24 md:pt-32 pb-24 md:pb-32">

        {/* 1. Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex flex-col items-center mb-16 md:mb-20 max-w-4xl mx-auto"
        >
          <SectionLabel label="Book a call" align="center" />

          {/* Plain heading: SplitTextReveal's line split adds a margin on top of the
              space between words, which doubled the word gaps here. */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D0D0D] tracking-tight leading-[1.05] mb-6 text-balance">
            {"Let's find what's costing you clients"}
          </h1>

          <p className="text-base sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl text-balance">
            {"Book a free 30-minute call with me, Anan. You'll leave with a clear list of what's stopping your website from bringing in enquiries, whether we work together or not."}
          </p>
        </motion.div>

        {/* 2. Primary: call card; "Choose a time" opens the Cal.com pop-up */}
        <div id="book" ref={bookRef} className="max-w-2xl mx-auto mb-10 scroll-mt-24">

          {/* Card 1: primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-white border-2 border-[#BFF549] rounded-3xl p-6 sm:p-10 shadow-[0_4px_20px_rgba(191,245,73,0.3)] relative overflow-hidden"
          >
            <span className="inline-flex items-center rounded-full bg-[#BFF549] text-[#0D0D0D] px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6">
              Recommended · 30 minutes
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-3">
              Book your free strategy call
            </h2>

            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              {"Pick a time that suits you. I'll look at your website before we talk, so the call is about your business, not a sales pitch."}
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Your website reviewed before the call",
                "The 3 changes that would bring in the most enquiries",
                "An honest timeline and price range for your project",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-semibold text-[#0D0D0D]">
                  <CheckCircle2 className="w-4 h-4 text-[#70c910] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <ButtonWithIcon
              href={CAL_BOOKING_URL}
              onClick={handleBookingClick}
              variant="lime"
              size="lg"
              className="w-full sm:w-fit"
            >
              Choose a time
            </ButtonWithIcon>

            {/* Trust row */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200/80">
              <img
                src="/anan.jpeg"
                alt="Twijjukye Anan"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200"
              />
              <div className="text-sm leading-snug">
                <p className="font-semibold text-[#0D0D0D]">
                  {"You'll speak directly with Twijjukye Anan, founder of Open Brands"}
                </p>
                {hasReviewsUrl ? (
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 font-bold text-[#0D0D0D] underline underline-offset-4 hover:opacity-80"
                  >
                    ★ 5.0 on Google
                  </a>
                ) : (
                  <span className="inline-block mt-1 font-bold text-[#0D0D0D]">★ 5.0 on Google</span>
                )}
              </div>
            </div>

            {cardTestimonial && (
              <figure className="mt-6 rounded-2xl bg-gray-50 border border-gray-200/70 p-5">
                <blockquote className="text-sm text-gray-700 font-medium leading-relaxed">
                  "{cardTestimonial.testimonial}"
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold text-[#0D0D0D]">
                  {cardTestimonial.name}
                  <span className="font-semibold text-gray-500"> · {cardTestimonial.role}</span>
                </figcaption>
              </figure>
            )}
          </motion.div>
        </div>

        {/* Secondary: free website review */}
        <motion.section
          id="review"
          ref={reviewRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="scroll-mt-24 bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-10"
        >
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
              Not ready for a call?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-3">
              Get a free website review
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              {"Send me your website and I'll record a short video showing what's working, what isn't, and what I'd fix first. You'll have it within 24 hours."}
            </p>
          </div>

          <div className="lg:col-span-7">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="fax"
                value={formData.fax}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
              />

              <div>
                <label htmlFor="name" className={labelClass}>
                  Your name <RequiredMark />
                </label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                  autoComplete="name" className={inputClass} />
              </div>

              <div>
                <label htmlFor="whatsapp" className={labelClass}>
                  WhatsApp number <RequiredMark />
                </label>
                <input type="tel" id="whatsapp" name="whatsapp" required value={formData.whatsapp} onChange={handleChange}
                  autoComplete="tel" inputMode="tel" className={inputClass} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <RequiredMark />
                </label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                  autoComplete="email" className={inputClass} />
              </div>

              <div>
                <label htmlFor="business" className={labelClass}>
                  Business name <RequiredMark />
                </label>
                <input type="text" id="business" name="business" required value={formData.business} onChange={handleChange}
                  autoComplete="organization" className={inputClass} />
              </div>

              <div>
                <label htmlFor="website" className={labelClass}>
                  Website URL <RequiredMark />
                </label>
                <input type="text" id="website" name="website" required value={formData.website} onChange={handleChange}
                  autoComplete="url" inputMode="url" className={inputClass} />
              </div>

              <div>
                <label htmlFor="goal" className={labelClass}>
                  What do you want more of? <RequiredMark />
                </label>
                <div className="relative">
                  <select id="goal" name="goal" required value={formData.goal} onChange={handleChange}
                    className={`${inputClass} appearance-none pr-11 cursor-pointer`}>
                    <option value="" disabled hidden></option>
                    {GOAL_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelClass}>
                  Anything else?
                </label>
                <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleChange}
                  className={`${inputClass} resize-none`} />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group flex items-center justify-center gap-3 rounded-full bg-[#0D0D0D] px-8 py-4 text-base font-bold text-white transition-all hover:bg-gray-800 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" aria-label="Sending" />
                  ) : (
                    <>
                      <span>Send me my free review</span>
                      <div className="w-7 h-7 rounded-full bg-[#BFF549] text-[#0D0D0D] flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </>
                  )}
                </button>

                <div className="flex items-start justify-center gap-2 pt-4 text-xs font-semibold text-gray-500 text-center">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>I reply within 2 working hours, Monday to Saturday. No spam, no pressure.</span>
                </div>
              </div>
            </form>
          </div>
        </motion.section>

        {/* 3. Direct contact */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-24">
          {directContacts.map(({ label, href, icon: Icon, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white/60 px-6 py-3 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-white hover:border-[#0D0D0D] shadow-xs"
            >
              <Icon className="w-4 h-4 shrink-0 group-hover:text-[#70c910] transition-colors" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* 4. What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border-t border-gray-200/80 pt-20 mb-24"
        >
          <SectionLabel label="What happens next" align="center" />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
            {steps.map((step, idx) => (
              <li key={step} className="flex md:flex-col items-start gap-4 bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
                <span className="w-10 h-10 rounded-full bg-[#BFF549] text-[#0D0D0D] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-[#0D0D0D] font-semibold leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* 6. FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border-t border-gray-200/80 pt-20 mb-24"
        >
          <div className="text-center mb-12">
            <SectionLabel label="Got Questions?" align="center" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D0D0D] tracking-tight mb-4">
              Common Questions Before Booking
            </h2>
          </div>

          {/* Same accordion as the homepage FAQ section. */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-all duration-300",
                    isOpen ? "bg-white border-[#0D0D0D] shadow-md" : "bg-white border-gray-200/90 shadow-sm hover:border-gray-300"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 py-5 md:p-8 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className={cn("font-bold text-lg md:text-xl transition-colors duration-300", isOpen ? "text-[#0D0D0D]" : "text-gray-800")}>
                      {faq.q}
                    </span>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border",
                        isOpen ? "bg-[#0D0D0D] text-[#BFF549] border-[#0D0D0D]" : "bg-gray-100 border-gray-200 text-gray-600"
                      )}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 text-gray-600 font-medium text-base md:text-lg leading-relaxed border-t border-gray-100 mt-2 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 7. Closing testimonial (replaces the footer ticker and CTA on this page) */}
        {closingTestimonial && (
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="border-t border-gray-200/80 pt-20 max-w-4xl mx-auto text-center"
          >
            <span className="block text-6xl leading-none font-bold text-[#BFF549] mb-4" aria-hidden="true">“</span>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D0D0D] tracking-tight leading-snug text-balance">
              {closingTestimonial.testimonial}
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#0D0D0D] text-[#BFF549] text-sm font-bold flex items-center justify-center shrink-0">
                {closingTestimonial.initials}
              </span>
              <span className="text-left text-sm">
                <span className="block font-bold text-[#0D0D0D]">{closingTestimonial.name}</span>
                <span className="block font-semibold text-gray-500">{closingTestimonial.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        )}
      </div>
    </div>
  );
}
