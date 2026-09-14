export interface FallbackPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  categories: string[];
  categoryDisplay: string;
  authorName: string;
  imageUrl: string;
  readTime?: string;
  bodyContent?: string[];
}

export const FALLBACK_BLOG_POSTS: FallbackPost[] = [
  {
    _id: "post-waitlist-system",
    title: "The Waitlist System™: How to Stop Chasing Leads and Start Managing Demand",
    slug: { current: "the-waitlist-system-tm-how-to-stop-chasing-leads-and-start-managing-demand" },
    publishedAt: "2026-05-11T11:54:00.000Z",
    excerpt: "Why high-growth B2B companies flip the traditional outbound sales model on its head by turning customer acquisition into an exclusive, high-demand waitlist.",
    categories: ["B2B Strategy", "Growth"],
    categoryDisplay: "B2B STRATEGY, GROWTH",
    authorName: "RAM",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    readTime: "6 min read",
    bodyContent: [
      "The traditional outbound sales grind is broken. Cold outreach rates are at historic lows, ad costs are skyrocketing, and buyers are increasingly immune to generic sales pitches.",
      "The Waitlist System™ flips this dynamic completely. Instead of chasing prospects, category-leading brands create intentional scarcity and operational exclusivity that makes clients compete to work with them.",
      "When you position your service not as an open commodity but as a limited-capacity partnership with strict qualification criteria, your perceived value compounds exponentially."
    ]
  },
  {
    _id: "post-art-positioning",
    title: "The Art of Positioning: How to Win in a Crowded B2B Market",
    slug: { current: "the-art-of-positioning-how-to-win-in-a-crowded-b2b-market" },
    publishedAt: "2026-05-25T14:50:00.000Z",
    excerpt: "Positioning is not just what you do to a product or service; it is what you do to the mind of the prospect. Learn how to win in a crowded B2B market.",
    categories: ["Positioning", "Branding"],
    categoryDisplay: "POSITIONING, BRANDING",
    authorName: "RAM",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    readTime: "5 min read",
    bodyContent: [
      "In a crowded B2B market, being 'better' is a losing strategy. You have to be fundamentally different.",
      "Positioning is the single highest-leverage decision an executive makes. It dictates who your competition is, what pricing power you command, and which customers seek you out.",
      "By narrowing your focus to solve an acute, expensive problem for a clearly defined ideal customer profile, you transform from an interchangeable option into the only logical choice."
    ]
  },
  {
    _id: "post-branding-alternatives",
    title: "Things to Look for When Comparing Branding Alternatives",
    slug: { current: "things-to-look-for-when-comparing-branding-alternatives" },
    publishedAt: "2026-05-20T10:00:00.000Z",
    excerpt: "A comprehensive decision framework for B2B executives evaluating brand strategy partners, agency retainers, and specialized design studios.",
    categories: ["Branding", "Design"],
    categoryDisplay: "BRANDING, DESIGN",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    readTime: "7 min read",
    bodyContent: [
      "Choosing a branding partner is not like buying software. It is an operational commitment that influences your sales conversion for the next 3 to 5 years.",
      "Look beyond aesthetic portfolios. The critical test is whether the partner understands your unit economics, your average contract value, and how messaging influences sales velocity.",
      "Ask to see pipeline outcomes, not just moodboards. If a studio cannot articulate how their design work generated pipeline, they are treating your company like an art experiment."
    ]
  },
  {
    _id: "post-standout-features",
    title: "5 Stand-out Features of High-Converting B2B Websites",
    slug: { current: "5-stand-out-features-of-branding-you-should-know" },
    publishedAt: "2026-05-18T09:30:00.000Z",
    excerpt: "Discover the architectural cues, kinetic interactions, and positioning mechanics that transform website visitors into qualified pipeline opportunities.",
    categories: ["Design", "Branding"],
    categoryDisplay: "DESIGN, BRANDING",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80",
    readTime: "4 min read",
    bodyContent: [
      "1. Above-the-fold value clarity that answers 'What do you do, who is it for, and why does it matter' in under 3 seconds.",
      "2. Interactive proof mechanisms: real before-and-after data points, client showcases, and verified return metrics rather than vague testimonials.",
      "3. Frictionless qualification pathways that respect the executive buyer's time with instant calendar booking and direct pricing clarity.",
      "4. Editorial typography and bespoke micro-interactions that communicate craft, stability, and enterprise credibility.",
      "5. Zero-bloat performance optimization ensuring sub-second Largest Contentful Paint across desktop and mobile devices."
    ]
  },
  {
    _id: "post-real-customers",
    title: "Branding: What Real Customers Have to Say",
    slug: { current: "branding-what-real-customers-have-to-say" },
    publishedAt: "2026-05-15T14:00:00.000Z",
    excerpt: "We surveyed 120 B2B buyers to discover what visual and messaging elements actually influence their purchasing decisions.",
    categories: ["Branding", "B2B Strategy"],
    categoryDisplay: "BRANDING, STRATEGY",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1000&q=80",
    readTime: "5 min read",
    bodyContent: [
      "Buyers form an subconscious impression of your business competence within 50 milliseconds of landing on your page.",
      "The survey revealed that 84% of B2B decision makers eliminate vendors from shortlists due to outdated web presence, inconsistent design, or confusing positioning.",
      "Investing in premium design is not vanity—it is insurance against being disqualified before your sales team ever gets on the phone."
    ]
  },
  {
    _id: "post-pros-and-cons",
    title: "Branding: Pros and Cons They Don't Tell You",
    slug: { current: "branding-pros-and-cons-they-dont-tell-you" },
    publishedAt: "2026-05-12T11:15:00.000Z",
    excerpt: "An unvarnished breakdown of rebranding timelines, opportunity costs, internal alignment hurdles, and how to safeguard client relationships during transition.",
    categories: ["Branding", "B2B Strategy"],
    categoryDisplay: "BRANDING, STRATEGY",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    readTime: "6 min read",
    bodyContent: [
      "The pros: higher closing rates, the ability to command premium prices, and immediate brand differentiation.",
      "The cons: organizational friction, the temptation to over-complicate messaging, and the discipline required to maintain consistency across every touchpoint.",
      "Understanding these trade-offs upfront allows you to run a streamlined rebranding sprint without slowing down your day-to-day sales pipeline."
    ]
  },
  {
    _id: "post-spot-best-branding",
    title: "How to Spot the Best Branding for Your Business",
    slug: { current: "how-to-spot-the-best-branding-for-your-business" },
    publishedAt: "2026-05-08T16:20:00.000Z",
    excerpt: "Signs, features, and diagnostic signals that reveal whether your current positioning is pulling clients in or quietly repelling high-value accounts.",
    categories: ["B2B Strategy", "Design"],
    categoryDisplay: "B2B STRATEGY, DESIGN",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80",
    readTime: "4 min read",
    bodyContent: [
      "Sign 1: Inbound prospects understand your offer before getting on the call and ask 'how soon can we start' rather than 'what exactly do you do?'",
      "Sign 2: Your sales cycle shrinks from months to weeks because trust is pre-built through your positioning and visual authority.",
      "Sign 3: You no longer compete in discount price wars with low-tier commodity providers."
    ]
  },
  {
    _id: "post-how-much-spend",
    title: "How Much Should I Spend on Branding?",
    slug: { current: "how-much-should-i-spend-on-branding" },
    publishedAt: "2026-05-05T13:40:00.000Z",
    excerpt: "A practical budgeting guide based on annual revenue, target deal size, and lifetime customer value for scaling B2B companies.",
    categories: ["B2B Strategy", "Growth"],
    categoryDisplay: "B2B STRATEGY, GROWTH",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
    readTime: "5 min read",
    bodyContent: [
      "A common rule of thumb is allocating 5% to 10% of projected annual revenue toward marketing and brand infrastructure.",
      "However, for high-ticket B2B businesses where a single client is worth $50k-$200k, a brand overhaul often pays for itself with the very first closed deal.",
      "Frame your investment not as an expense, but as the foundational digital asset that drives all future client acquisition."
    ]
  },
  {
    _id: "post-rookie-mistakes",
    title: "Rookie Mistakes You're Making With Your Branding",
    slug: { current: "rookie-mistakes-youre-making-with-your-branding" },
    publishedAt: "2026-05-02T10:00:00.000Z",
    excerpt: "The most frequent branding pitfalls that erode credibility and cost scaling companies millions in lost pipeline.",
    categories: ["Branding", "Design"],
    categoryDisplay: "BRANDING, DESIGN",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    readTime: "6 min read",
    bodyContent: [
      "Mistake 1: Talking about your features instead of the executive's high-stakes business problems.",
      "Mistake 2: Copying competitors' websites, which instantly turns you into a second-rate commodity.",
      "Mistake 3: Inconsistent typography and styling across your proposals, website, and social presence."
    ]
  },
  {
    _id: "post-customer-reviews",
    title: "Real Branding Customer Reviews You Need to See",
    slug: { current: "real-branding-customer-reviews-you-need-to-see" },
    publishedAt: "2026-04-28T09:00:00.000Z",
    excerpt: "Executive case studies and transparent performance outcomes from companies that transformed their market positioning with Open Brands.",
    categories: ["Branding", "B2B Strategy"],
    categoryDisplay: "BRANDING, STRATEGY",
    authorName: "Open Brands Editorial",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    readTime: "4 min read",
    bodyContent: [
      "Explore how Oakline Landscaping generated 3.4x more booking consultations with a premium web platform.",
      "See how Urban Sheds built a nationwide configurator funnel that added over $1.2M to their pipeline in under 9 months.",
      "Read firsthand accounts from founders who elevated their brand authority and unlocked higher tier enterprise contracts."
    ]
  }
];
