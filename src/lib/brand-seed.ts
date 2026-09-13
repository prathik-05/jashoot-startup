// Offline snapshot of exactly what an anonymous visitor sees after the
// migrations + seed are applied. REAL-DATA-ONLY: no portfolio projects,
// no testimonials, no proof stats, no published pricing live in this file.
// Studio flips `published` in the DB; this file is only a build-time default.
import type { SiteData } from "./schema";

export const brandSeed: SiteData = {
  sections: [
    {
      sectionKey: "hero",
      name: "Cinematic Hero",
      ordering: 10,
      enabled: true,
      published: true,
      settings: {
        kicker: "JASHOOTS",
        headline: "SHOOT. EDIT. DELIVER.",
        sub: "Professional reels, delivered within your promised turnaround.",
        primaryCta: { label: "BOOK ON WHATSAPP", action: "book_on_whatsapp" },
        secondaryCta: { label: "SEE OUR WORK", action: "work" },
      },
    },
    {
      sectionKey: "promise",
      name: "The Promise",
      ordering: 20,
      enabled: true,
      published: true,
      settings: {
        headline: "YOUR MOMENT → OUR CAMERA → YOUR REEL",
        sub: "Every package carries its promised turnaround.",
      },
    },
    {
      sectionKey: "work",
      name: "The Work",
      ordering: 30,
      enabled: true,
      published: true,
      settings: {
        headline: "THE WORK",
        kicker: "REAL MOMENTS. REAL JASHOOTS.",
      },
    },
    {
      sectionKey: "moments",
      name: "Whats Your Moment",
      ordering: 40,
      enabled: true,
      published: true,
      settings: {
        headline: "WHAT'S YOUR MOMENT?",
        sub: "Pick what matches your plan — or tell us anything else.",
      },
    },
    {
      sectionKey: "featured_project",
      name: "Featured Project",
      ordering: 50,
      enabled: true,
      published: true,
      settings: {},
    },
    {
      sectionKey: "packages",
      name: "Packages & Pricing",
      ordering: 60,
      enabled: true,
      published: true,
      settings: { headline: "PACKAGES", sub: "Transparent. No hidden quotes." },
    },
    {
      sectionKey: "why",
      name: "Why Jashoots",
      ordering: 70,
      enabled: true,
      published: true,
      settings: { headline: "WHY JASHOOTS" },
    },
    {
      sectionKey: "how_it_works",
      name: "How It Works",
      ordering: 80,
      enabled: true,
      published: true,
      settings: {
        headline: "HOW IT WORKS",
        sub: "ENQUIRE → WHATSAPP → CONFIRM → SHOOT → EDIT → DELIVER",
      },
    },
    {
      sectionKey: "raw_final",
      name: "Raw To Final",
      ordering: 90,
      enabled: true,
      published: true,
      settings: { headline: "RAW → FINAL" },
    },
    {
      sectionKey: "proof",
      name: "Proof",
      ordering: 100,
      enabled: true,
      published: true,
      settings: {
        headline: "REAL SHOOTS. REAL MOMENTS.",
        sub: "Numbers, testimonials and real work — published only when real data exists.",
      },
    },
    {
      sectionKey: "turnaround",
      name: "Turnaround",
      ordering: 110,
      enabled: true,
      published: true,
      settings: { headline: "FAST DOESN'T MEAN RUSHED." },
    },
    {
      sectionKey: "client_experience",
      name: "Client Experience",
      ordering: 120,
      enabled: true,
      published: true,
      settings: { headline: "REVIEW → APPROVE → RECEIVE" },
    },
    {
      sectionKey: "app",
      name: "App",
      ordering: 130,
      enabled: true,
      published: true,
      settings: {
        headline: "YOUR PROJECT. IN YOUR POCKET.",
        sub: "Track your shoot. Review your reels. Approve edits. Download your final work.",
      },
    },
    {
      sectionKey: "faq",
      name: "FAQ",
      ordering: 140,
      enabled: true,
      published: true,
      settings: { headline: "QUESTIONS BEFORE YOU SHOOT?" },
    },
    {
      sectionKey: "instagram",
      name: "Instagram Feed",
      ordering: 145,
      enabled: true,
      published: true,
      settings: {},
    },
    {
      sectionKey: "final_cta",
      name: "Final CTA",
      ordering: 150,
      enabled: true,
      published: true,
      settings: {
        headline: "GOT A MOMENT?",
        sub: "LET'S MAKE IT A REEL.",
        cta: { label: "BOOK ON WHATSAPP", action: "book_on_whatsapp" },
      },
    },
    {
      sectionKey: "footer",
      name: "Footer",
      ordering: 160,
      enabled: true,
      published: true,
      settings: {},
    },
  ],

  categories: [
    { id: "01000000-0000-4000-8000-000000000001", name: "Events", groupKey: "events", slug: "events", tagline: "Birthdays · Celebrations · Functions", ordering: 10, published: true, featured: true },
    { id: "01000000-0000-4000-8000-000000000002", name: "Weddings", groupKey: "weddings", slug: "weddings", tagline: "Engagement · Wedding · Reception", ordering: 20, published: true, featured: true },
    { id: "01000000-0000-4000-8000-000000000003", name: "Automotive", groupKey: "automotive", slug: "automotive", tagline: "Bike · Car · Delivery · Launch", ordering: 30, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000004", name: "Business", groupKey: "business", slug: "business", tagline: "Store · Founder · Corporate · Brand", ordering: 40, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000005", name: "Content", groupKey: "content", slug: "content", tagline: "Product · Food · Social · Campaign", ordering: 50, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000006", name: "Anything Else", groupKey: "custom", slug: "anything-else", tagline: "Tell us what you're planning", ordering: 60, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000010", name: "Birthdays", groupKey: "events", slug: "birthdays", tagline: null, ordering: 11, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000011", name: "Festivals", groupKey: "events", slug: "festivals", tagline: null, ordering: 12, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000012", name: "Cultural", groupKey: "events", slug: "cultural", tagline: null, ordering: 13, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000013", name: "Bike", groupKey: "automotive", slug: "bike", tagline: null, ordering: 31, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000014", name: "Car", groupKey: "automotive", slug: "car", tagline: null, ordering: 32, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000015", name: "Brands", groupKey: "content", slug: "brands", tagline: null, ordering: 51, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000016", name: "Products", groupKey: "content", slug: "products", tagline: null, ordering: 52, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000017", name: "Food", groupKey: "content", slug: "food", tagline: null, ordering: 53, published: true, featured: false },
    { id: "01000000-0000-4000-8000-000000000018", name: "Corporate", groupKey: "business", slug: "corporate", tagline: null, ordering: 41, published: true, featured: false },
  ],

  services: [
    { id: "02000000-0000-4000-8000-000000000001", categoryId: "01000000-0000-4000-8000-000000000005", slug: "instant-reel", name: "Instant Reel", blurb: "Fast-turnaround reel service. Not instant booking — availability is confirmed by the JASHOOTS team.", ordering: 10, published: true, featured: true },
    { id: "02000000-0000-4000-8000-000000000002", categoryId: "01000000-0000-4000-8000-000000000001", slug: "event-coverage", name: "Event Coverage", blurb: "Full-day or select-hour event coverage with social-first reels.", ordering: 20, published: true, featured: true },
    { id: "02000000-0000-4000-8000-000000000003", categoryId: "01000000-0000-4000-8000-000000000002", slug: "wedding", name: "Wedding", blurb: "Engagements, weddings & receptions with fast highlights.", ordering: 30, published: true, featured: true },
    { id: "02000000-0000-4000-8000-000000000004", categoryId: "01000000-0000-4000-8000-000000000001", slug: "hourly-coverage", name: "Hourly Coverage", blurb: "Need us for a few hours? 1 / 2 / 4 hours or full day.", ordering: 40, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000005", categoryId: "01000000-0000-4000-8000-000000000006", slug: "custom-shoot", name: "Custom / Any Function", blurb: "Birthday, college, store opening, launch — anything worth shooting.", ordering: 50, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000006", categoryId: "01000000-0000-4000-8000-000000000010", slug: "birthday-parties", name: "Birthday Parties", blurb: "High-energy highlight reels that make birthdays feel like blockbusters.", ordering: 55, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000007", categoryId: "01000000-0000-4000-8000-000000000003", slug: "vehicle-delivery", name: "Vehicle Deliveries", blurb: "That first-drive feeling — captured cinematic, delivered fast.", ordering: 56, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000008", categoryId: "01000000-0000-4000-8000-000000000015", slug: "brand-promo", name: "Brand Promotions", blurb: "Scroll-stopping vertical content built for growth.", ordering: 57, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000009", categoryId: "01000000-0000-4000-8000-000000000018", slug: "corporate-events", name: "Corporate Events", blurb: "Professional on-spot coverage that does not miss a moment.", ordering: 58, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000010", categoryId: "01000000-0000-4000-8000-000000000016", slug: "product-launch", name: "Product Launches", blurb: "Launch reels that build hype before the drop.", ordering: 59, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000011", categoryId: "01000000-0000-4000-8000-000000000004", slug: "store-opening", name: "Store Openings", blurb: "Turn your opening day into a city-wide event.", ordering: 60, published: true, featured: false },
    { id: "02000000-0000-4000-8000-000000000012", categoryId: "01000000-0000-4000-8000-000000000017", slug: "food-reels", name: "Food & Restaurant", blurb: "Mouth-watering reels that make Hyderabad order instantly.", ordering: 61, published: true, featured: false },
  ],

  packages: [],

  projects: [
    { id: "04000000-0000-4000-8000-000000000001", title: "Ramnagar Festival", slug: "ramnagar-47k-viral", categoryId: "01000000-0000-4000-8000-000000000011", coverMedia: null, previewReel: null, fullReel: null, location: "Hyderabad", projectYear: 2026, story: "Festival heat — captured, cut and posted while the crowd was still chanting.", whatWeDid: ["On-location capture", "Fast same-day edit", "Social-first vertical reel"], results: [], engagementStats: [], deliveryTimeLabel: null, relatedServiceId: "02000000-0000-4000-8000-000000000002", relatedPackageId: null, featured: true, published: true, publishedAt: null },
    { id: "04000000-0000-4000-8000-000000000002", title: "Ramanthapur Ka Raja", slug: "ramanthapur-ka-raja", categoryId: "01000000-0000-4000-8000-000000000011", coverMedia: null, previewReel: null, fullReel: null, location: "Hyderabad", projectYear: 2026, story: "A neighborhood icon, followed from aagman to visarjan.", whatWeDid: ["On-location capture", "Fast same-day edit", "Social-first vertical reel"], results: [], engagementStats: [], deliveryTimeLabel: null, relatedServiceId: "02000000-0000-4000-8000-000000000002", relatedPackageId: null, featured: false, published: true, publishedAt: null },
    { id: "04000000-0000-4000-8000-000000000003", title: "Dhoolpet Ganesh", slug: "dhoolpet-ganesh", categoryId: "01000000-0000-4000-8000-000000000011", coverMedia: null, previewReel: null, fullReel: null, location: "Hyderabad", projectYear: 2026, story: "Pre-dawn lanes, low light, zero retakes.", whatWeDid: ["Low-light on-location capture", "Fast edit", "Social-first reel"], results: [], engagementStats: [], deliveryTimeLabel: null, relatedServiceId: "02000000-0000-4000-8000-000000000002", relatedPackageId: null, featured: false, published: true, publishedAt: null },
    { id: "04000000-0000-4000-8000-000000000004", title: "Naming Ceremony", slug: "naming-ceremony", categoryId: "01000000-0000-4000-8000-000000000001", coverMedia: null, previewReel: null, fullReel: null, location: "Hyderabad", projectYear: 2026, story: "A family milestone, kept intimate and cinematic.", whatWeDid: ["Quiet on-location capture", "Warm cinematic edit", "Family-ready delivery"], results: [], engagementStats: [], deliveryTimeLabel: null, relatedServiceId: "02000000-0000-4000-8000-000000000005", relatedPackageId: null, featured: false, published: true, publishedAt: null },
    { id: "04000000-0000-4000-8000-000000000005", title: "Bonalu Festival", slug: "bonalu-festival", categoryId: "01000000-0000-4000-8000-000000000012", coverMedia: null, previewReel: null, fullReel: null, location: "Hyderabad", projectYear: 2026, story: "Culture in motion — drums, color and devotion.", whatWeDid: ["On-location capture", "Fast edit", "Social-first reel"], results: [], engagementStats: [], deliveryTimeLabel: null, relatedServiceId: "02000000-0000-4000-8000-000000000002", relatedPackageId: null, featured: false, published: true, publishedAt: null },
    { id: "04000000-0000-4000-8000-000000000006", title: "Tirupati Temple", slug: "tirupati-temple", categoryId: "01000000-0000-4000-8000-000000000011", coverMedia: null, previewReel: null, fullReel: null, location: "Tirupati", projectYear: 2026, story: "Devotion, framed with patience.", whatWeDid: ["Respectful on-location capture", "Cinematic edit", "Social-ready reel"], results: [], engagementStats: [], deliveryTimeLabel: null, relatedServiceId: "02000000-0000-4000-8000-000000000002", relatedPackageId: null, featured: false, published: true, publishedAt: null },
  ],

  testimonials: [],

  faqs: [
    { id: "f1", question: "How quickly will I receive my reel?", answer: "Depends on the package you choose. Every package displays its promised turnaround — from 30 minutes to 24–48 hours." },
    { id: "f2", question: "How do I book?", answer: "Submit an enquiry and continue to WhatsApp. Our team checks availability and confirms your booking there." },
    { id: "f3", question: "Is submitting the enquiry a booking?", answer: "No. An enquiry becomes a confirmed booking only after the JASHOOTS team confirms availability and details on WhatsApp." },
    { id: "f4", question: "Can you shoot weddings?", answer: "Yes. Engagements, weddings and receptions. See wedding work in OUR WORK and book on WhatsApp." },
    { id: "f5", question: "Do you shoot bikes, cars and businesses?", answer: "Yes. Automotive, store openings, corporate and brand shoots are a core part of what we do." },
    { id: "f6", question: "Can I request something custom?", answer: "Absolutely. Tell us what you're planning and we will recommend the best option." },
    { id: "f7", question: "How will I receive my final files?", answer: "Through a private delivery link after you approve your work — nothing is shared publicly." },
  ],

  promo: {
    badge: "ON-SPOT COVERAGE",
    headline: "SHOOT ON OUR LATEST GEAR",
    subtext: "Cinema-grade capture on the latest equipment.",
    imageUrl: null,
    enabled: true,
    published: true,
  },

  proofStats: [],

  cities: [{ name: "Hyderabad", slug: "hyderabad" }],

  method: [
    { stepNo: 1, title: "Tell us the moment", description: "What are you shooting? Where and when?", icon: null },
    { stepNo: 2, title: "Choose your package", description: "Transparent packages — pick what fits.", icon: null },
    { stepNo: 3, title: "We confirm the shoot", description: "We check availability and confirm on WhatsApp.", icon: null },
    { stepNo: 4, title: "We capture it", description: "Professional on-location capture.", icon: null },
    { stepNo: 5, title: "We turn it into a reel", description: "Cinematic, social-first edit.", icon: null },
    { stepNo: 6, title: "You review it", description: "Review and approve from the client portal.", icon: null },
    { stepNo: 7, title: "You get the final", description: "Delivered via a private link on time.", icon: null },
  ],

  whyFeatures: [
    { iconKey: "bolt", title: "FAST", description: "A clear delivery SLA on every package." },
    { iconKey: "reel", title: "REELS FIRST", description: "Built for Instagram and social content." },
    { iconKey: "clapperboard", title: "CINEMATIC", description: "Professional visual storytelling." },
    { iconKey: "whatsapp", title: "EASY BOOKING", description: "One tap enquiry on WhatsApp." },
    { iconKey: "tag", title: "TRANSPARENT", description: "Packages and inclusions shown upfront." },
    { iconKey: "cycle", title: "EASY REVIEW", description: "Structured client review workflow." },
    { iconKey: "lock", title: "PRIVATE DELIVERY", description: "Secure private link after approval." },
    { iconKey: "tracking", title: "PROJECT TRACKING", description: "Web, PWA and app experience." },
  ],

  whyDifferent: [
    { trait: "Timing", traditionalValue: "Wait days", jashootsValue: "Defined turnaround" },
    { trait: "Booking", traditionalValue: "Complicated process", jashootsValue: "WhatsApp enquiry" },
    { trait: "Pricing", traditionalValue: "Hidden / custom quotes", jashootsValue: "Transparent packages" },
    { trait: "Delivery", traditionalValue: "Final files days later", jashootsValue: "Fast social-ready content" },
    { trait: "Output", traditionalValue: "Generic coverage", jashootsValue: "Purpose-built content" },
    { trait: "Experience", traditionalValue: "One-off deliverables", jashootsValue: "Client project experience" },
  ],

  about: [
    {
      contentKey: "hero",
      title: "JASHOOTS",
      body: {
        tagline: "YOU BRING THE MOMENT. WE MAKE THE REEL.",
        claim: "SHOOT. EDIT. DELIVER.",
        location: "Hyderabad / India",
      },
    },
    {
      contentKey: "founder",
      title: "Founder",
      body: {
        handle: "@mr.jashwanth06",
        name: "Jashwanth",
        role: "Founder • JASHOOTS",
        audience: "320 followers • 28 posts",
        bio: "Shoots @clipsbyjashoots • Self-made creator from Hyderabad. Built this from scratch — latest gear, fast turnaround, hard work.",
        quote: "Built from scratch. One reel at a time.",
      },
    },
    {
      contentKey: "social",
      title: "Follow",
      body: {
        instagram: "https://instagram.com/clipsbyjashoots",
        handle: "@clipsbyjashoots",
        founder_instagram: "https://instagram.com/mr.jashwanth06",
        city: "Hyderabad",
      },
    },
  ],
};