import { motion } from "motion/react";
import { Layout, Pointer, Zap, LineChart } from "lucide-react";
import { Feature108 } from "@/components/ui/shadcnblocks-com-feature108";

/* ─────────────────────────────────────────────
   Card 1 – Conversion-Focused Website mockup
───────────────────────────────────────────── */
function WebsiteMockup() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden text-[10px]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-gray-200 rounded px-2 py-0.5 text-gray-500 text-[8px]">
          openbrands.co/property
        </div>
      </div>
      {/* Hero section */}
      <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1A3A5C] p-4 text-white">
        <div className="text-[9px] font-bold mb-1 leading-tight">
          Luxury Waterfront Properties
        </div>
        <div className="text-[7px] text-blue-200 mb-3">
          Exclusive listings — verified buyers only
        </div>
        <div className="flex gap-2">
          <div className="bg-cyan-400 text-[#0F1C2E] font-bold rounded px-3 py-1 text-[8px]">
            Book Viewing →
          </div>
          <div className="border border-white/30 rounded px-3 py-1 text-[8px]">
            View All
          </div>
        </div>
      </div>
      {/* Trust bar */}
      <div className="flex items-center justify-around px-3 py-2 bg-gray-50 border-b border-gray-100">
        {["★ 4.9 Rating", "500+ Deals", "Verified Agency"].map((t) => (
          <div key={t} className="flex items-center gap-1 text-[7px] text-gray-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            {t}
          </div>
        ))}
      </div>
      {/* Property cards */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {[
          { label: "Kololo Villa", price: "$480K", badge: "Hot" },
          { label: "Naguru Penthouse", price: "$320K", badge: "New" },
        ].map((p) => (
          <div key={p.label} className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="h-10 bg-gradient-to-br from-blue-100 to-blue-200 relative">
              <span className="absolute top-1 right-1 bg-cyan-400 text-[6px] font-bold px-1 rounded text-[#0F1C2E]">
                {p.badge}
              </span>
            </div>
            <div className="p-1.5">
              <div className="font-bold text-[8px] text-gray-800">{p.label}</div>
              <div className="text-cyan-600 font-bold text-[8px]">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 2 – Lead Gen Dashboard mockup
───────────────────────────────────────────── */
function LeadGenMockup() {
  const bars = [55, 72, 48, 88, 65, 91, 78];
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden text-[10px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-bold text-[10px] text-gray-800">Campaign Overview</span>
        <span className="bg-green-100 text-green-700 text-[8px] font-semibold px-2 py-0.5 rounded-full">
          Live
        </span>
      </div>
      {/* KPI row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[
          { label: "Leads / Day", value: "24", delta: "+18%" },
          { label: "CTR", value: "6.4%", delta: "+2.1%" },
          { label: "CPL", value: "$11.20", delta: "-34%" },
        ].map((k) => (
          <div key={k.label} className="p-3 text-center">
            <div className="font-bold text-[12px] text-[#0F1C2E]">{k.value}</div>
            <div className="text-[7px] text-gray-500">{k.label}</div>
            <div className="text-[7px] font-semibold text-green-600">{k.delta}</div>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div className="px-4 pt-3 pb-1">
        <div className="text-[8px] text-gray-400 mb-2">Daily inquiries (last 7d)</div>
        <div className="flex items-end gap-1.5 h-12">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
              <div
                className="w-full rounded-t"
                style={{
                  height: `${h}%`,
                  background: i === 5 ? "#22d3ee" : "#BFDBFE",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[7px] text-gray-400 mt-1">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
      {/* Audience tags */}
      <div className="flex flex-wrap gap-1 px-4 py-2">
        {["Property Investors", "HNW Buyers", "First-Time Buyers", "Diaspora"].map((t) => (
          <span key={t} className="bg-blue-50 text-blue-700 text-[7px] font-medium px-2 py-0.5 rounded-full border border-blue-100">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 3 – CRM Pipeline mockup
───────────────────────────────────────────── */
function CRMMockup() {
  const stages = [
    { label: "New Lead", count: 14, color: "bg-blue-100 text-blue-700" },
    { label: "Qualified", count: 8, color: "bg-purple-100 text-purple-700" },
    { label: "Viewing", count: 5, color: "bg-cyan-100 text-cyan-700" },
    { label: "Offer", count: 3, color: "bg-green-100 text-green-700" },
  ];
  const leads = [
    { name: "Sarah M.", stage: "Viewing", tag: "Auto-follow" },
    { name: "James O.", stage: "Qualified", tag: "Pending call" },
    { name: "Aisha K.", stage: "Offer", tag: "Hot lead" },
  ];
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden text-[10px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-bold text-[10px] text-gray-800">Pipeline — Q2 2025</span>
        <span className="text-[8px] text-gray-400">30 active leads</span>
      </div>
      {/* Kanban stage pills */}
      <div className="grid grid-cols-4 gap-1.5 px-3 py-2 border-b border-gray-100">
        {stages.map((s) => (
          <div key={s.label} className={`${s.color} rounded-lg px-2 py-1.5 text-center`}>
            <div className="font-bold text-[11px]">{s.count}</div>
            <div className="text-[7px] leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Lead rows */}
      <div className="divide-y divide-gray-100">
        {leads.map((l) => (
          <div key={l.name} className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400 flex items-center justify-center text-white text-[7px] font-bold">
                {l.name[0]}
              </div>
              <span className="font-medium text-[8px] text-gray-700">{l.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[7px] text-gray-400">{l.stage}</span>
              <span className="bg-amber-50 text-amber-700 text-[6px] border border-amber-100 px-1.5 py-0.5 rounded-full font-medium">
                {l.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Automation row */}
      <div className="mx-3 mb-3 mt-1 rounded-lg bg-green-50 border border-green-100 px-3 py-2 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center text-white text-[8px]">✓</div>
        <div>
          <div className="text-[7px] font-bold text-green-800">Auto follow-up sent</div>
          <div className="text-[7px] text-green-600">3 sequences active · 0 missed leads</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 4 – Growth Optimization chart mockup
───────────────────────────────────────────── */
function GrowthMockup() {
  // CPL declining, quality rising (SVG path)
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden text-[10px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-bold text-[10px] text-gray-800">Growth Metrics · 6 months</span>
        <span className="text-[8px] font-semibold text-green-600">↑ Improving</span>
      </div>
      {/* Dual line chart */}
      <div className="px-3 pt-2 pb-1">
        <svg viewBox="0 0 200 80" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="qualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cplGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[20, 40, 60].map((y) => (
            <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="#f0f0f0" strokeWidth="0.5" />
          ))}
          {/* CPL area (declining — red) */}
          <path
            d="M10,20 C40,22 70,35 110,45 C140,52 170,58 190,62"
            fill="none"
            stroke="#f87171"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          {/* Quality area (rising — cyan) */}
          <path
            d="M10,65 C40,60 70,50 110,40 C140,32 170,22 190,18"
            fill="url(#qualGrad)"
            stroke="#22d3ee"
            strokeWidth="1.5"
          />
          {/* Dots on quality line */}
          {[[10,65],[50,57],[110,40],[160,25],[190,18]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#22d3ee" />
          ))}
        </svg>
        <div className="flex justify-between text-[7px] text-gray-400 -mt-1 px-1">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-4 px-4 pb-3 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-cyan-400" />
          <span className="text-[8px] text-gray-600">Lead Quality Score</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 border-t-2 border-dashed border-red-400" />
          <span className="text-[8px] text-gray-600">Cost Per Inquiry</span>
        </div>
      </div>
      {/* KPI callouts */}
      <div className="grid grid-cols-2 gap-2 px-3 pb-3">
        <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-2 text-center">
          <div className="text-[12px] font-bold text-cyan-700">-42%</div>
          <div className="text-[7px] text-cyan-600">Cost per inquiry</div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-lg p-2 text-center">
          <div className="text-[12px] font-bold text-green-700">+91%</div>
          <div className="text-[7px] text-green-600">Lead quality score</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
const features = [
  {
    title: "Conversion-Focused Websites",
    description:
      "Digital experiences that signal credibility and turn visitors into serious property inquiries.",
    accent: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
    tag: "Website",
    tagColor: "bg-blue-100 text-blue-700",
    mockup: <WebsiteMockup />,
  },
  {
    title: "Lead Generation Campaigns",
    description:
      "Paid traffic engineered to reach high-intent property buyers and investors — not casual browsers.",
    accent: "from-indigo-50 to-purple-50",
    border: "border-indigo-100",
    tag: "Paid Traffic",
    tagColor: "bg-indigo-100 text-indigo-700",
    mockup: <LeadGenMockup />,
  },
  {
    title: "CRM & Follow-Up Systems",
    description:
      "Automated pipelines that capture every lead, organize follow-ups, and close the gap between inquiry and sale.",
    accent: "from-cyan-50 to-teal-50",
    border: "border-cyan-100",
    tag: "Automation",
    tagColor: "bg-cyan-100 text-cyan-700",
    mockup: <CRMMockup />,
  },
  {
    title: "Growth Optimization",
    description:
      "Ongoing data-driven improvements so your cost per inquiry drops while lead quality keeps climbing.",
    accent: "from-green-50 to-emerald-50",
    border: "border-green-100",
    tag: "Analytics",
    tagColor: "bg-green-100 text-green-700",
    mockup: <GrowthMockup />,
  },
];

export function FeaturesSection() {
  const tabsData = [
    {
      value: "tab-1",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Websites",
      content: {
        badge: "Core Solution",
        title: "Conversion-Focused Websites",
        description:
          "Digital experiences that signal credibility and turn visitors into serious property inquiries.",
        buttonText: "See Showcase",
        imageSrc: "/portfolio/URban.png",
        imageAlt: "Urban Sheds Websites Portfolio Showcase",
      },
    },
    {
      value: "tab-2",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Campaigns",
      content: {
        badge: "Growth Pipeline",
        title: "Lead Generation Campaigns",
        description:
          "Paid traffic engineered to reach high-intent property buyers and investors — not casual browsers.",
        buttonText: "Review ROI Metrics",
        mockup: <LeadGenMockup />,
      },
    },
    {
      value: "tab-3",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Automation",
      content: {
        badge: "Operational Excellence",
        title: "CRM & Follow-Up Systems",
        description:
          "Automated pipelines that capture every lead, organize follow-ups, and close the gap between inquiry and sale.",
        buttonText: "Test Pipelines",
        mockup: <CRMMockup />,
      },
    },
    {
      value: "tab-4",
      icon: <LineChart className="h-auto w-4 shrink-0" />,
      label: "Optimization",
      content: {
        badge: "Data Intelligence",
        title: "Growth Optimization",
        description:
          "Ongoing data-driven improvements so your cost per inquiry drops while lead quality keeps climbing.",
        buttonText: "Check Performance",
        mockup: <GrowthMockup />,
      },
    },
  ];

  return (
    <>
      {/* ── Section A: Radix Tabs Layout Showcase (Feature108) ── */}
      <Feature108
        badge="Our Core Services"
        heading="Systemized Acquisition Tabs"
        description="A unified, tabbed overview of our four core system solutions designed to scale property growth."
        tabs={tabsData}
      />

      {/* ── Section B: Original Grid Layout Showcase (Coexisting) ── */}
      <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden z-10 border-t border-gray-100">
        {/* Background glows */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
              Our Core Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-4">
              What We Build
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Four precision-built systems that work together to generate qualified property
              inquiries and convert them into paying clients.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400/30 via-cyan-400 to-cyan-400/30 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className={`group relative rounded-2xl border ${f.border} bg-gradient-to-br ${f.accent} p-6 lg:p-8 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Top row: tag + title */}
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${f.tagColor}`}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1C2E] tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {f.description}
                </p>

                {/* Visual mockup */}
                <div className="transform group-hover:scale-[1.01] transition-transform duration-500">
                  {f.mockup}
                </div>

                {/* Subtle corner glow on hover */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-cyan-300/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
