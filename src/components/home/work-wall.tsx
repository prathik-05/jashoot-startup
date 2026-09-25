"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/track";
import { Container } from "@/components/ui/container";
import type { Service } from "@/lib/schema";

export interface AvailableShoot {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string;
  priceNote: string;
  turnaround: string;
  tag: string;
  deliverables: string;
  description: string;
  badge: string;
  accentColor: string;
  svgVisual: React.ReactNode;
}

export const TOP_5_SHOOTS: AvailableShoot[] = [
  {
    id: "automobile",
    slug: "automobile",
    title: "Automobile Shoot",
    category: "Car & Superbike",
    price: "₹2,000",
    priceNote: "per viral reel",
    turnaround: "24-48 HRS",
    tag: "SPEED RAMPS · EXHAUST AUDIO",
    deliverables: "1 High-Octane 4K Reel · Audio Sync · Color Grade",
    description: "Dynamic rolling shots, exhaust rev sound design, dramatic low angles and speed-ramped transitions.",
    badge: "MOST POPULAR",
    accentColor: "#E63838",
    svgVisual: (
      <svg viewBox="0 0 300 450" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="auto-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#250808" />
            <stop offset="50%" stopColor="#140D0D" />
            <stop offset="100%" stopColor="#080707" />
          </linearGradient>
          <radialGradient id="auto-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#E63838" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#E63838" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="300" height="450" fill="url(#auto-grad)" />
        <rect width="300" height="450" fill="url(#auto-glow)" />
        {/* Speed lines & neon trails */}
        <path d="M-50 260 L350 220" stroke="#E63838" strokeWidth="2.5" opacity="0.6" strokeDasharray="12 6" />
        <path d="M-50 285 L350 245" stroke="#E63838" strokeWidth="4" opacity="0.8" />
        <path d="M-50 310 L350 270" stroke="#F0EBDC" strokeWidth="1.5" opacity="0.4" strokeDasharray="8 8" />
        {/* Supercar silhouette outline */}
        <path d="M30 290 Q60 250 110 240 L180 238 Q220 245 270 280 L280 295 L20 295 Z" fill="#0E0E11" stroke="#E63838" strokeWidth="1.5" />
        {/* Headlight beam */}
        <polygon points="260,265 320,250 320,290" fill="#FFE57F" opacity="0.25" />
        <circle cx="260" cy="265" r="4" fill="#FFE57F" />
        {/* Wheel glow */}
        <circle cx="75" cy="295" r="18" fill="#1A1818" stroke="#E63838" strokeWidth="2" />
        <circle cx="230" cy="295" r="18" fill="#1A1818" stroke="#E63838" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "function-events",
    slug: "function-events",
    title: "Event & Function",
    category: "Birthday & Party",
    price: "₹2,000",
    priceNote: "per hour coverage",
    turnaround: "SAME DAY / 24H",
    tag: "LIVE CANDIDS · CELEBRATION",
    deliverables: "Hourly Live Coverage · Same-Day Reel · Key Moments",
    description: "Candid celebrations for birthdays, naming ceremonies, anniversaries, and family get-togethers.",
    badge: "FLEXIBLE HOURLY",
    accentColor: "#F59E0B",
    svgVisual: (
      <svg viewBox="0 0 300 450" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="event-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C1405" />
            <stop offset="50%" stopColor="#120E08" />
            <stop offset="100%" stopColor="#080706" />
          </linearGradient>
          <radialGradient id="event-bokeh" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="300" height="450" fill="url(#event-grad)" />
        <rect width="300" height="450" fill="url(#event-bokeh)" />
        {/* Warm bokeh spheres */}
        <circle cx="60" cy="140" r="28" fill="#F59E0B" opacity="0.18" />
        <circle cx="220" cy="180" r="38" fill="#F59E0B" opacity="0.14" />
        <circle cx="140" cy="240" r="44" fill="#E63838" opacity="0.12" />
        <circle cx="80" cy="270" r="16" fill="#FBBF24" opacity="0.25" />
        <circle cx="230" cy="280" r="20" fill="#FBBF24" opacity="0.22" />
        {/* Celebration sparkles */}
        <polygon points="150,110 154,124 168,128 154,132 150,146 146,132 132,128 146,124" fill="#FDE68A" opacity="0.75" />
        <polygon points="90,190 92,198 100,200 92,202 90,210 88,202 80,200 88,198" fill="#FDE68A" opacity="0.6" />
        <polygon points="210,130 212,136 218,138 212,140 210,146 208,140 202,138 208,136" fill="#FDE68A" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "brand-product",
    slug: "brand-product",
    title: "Brand & Business",
    category: "Cafes & Retail",
    price: "₹2,500",
    priceNote: "per promo reel",
    turnaround: "24-48 HRS",
    tag: "PRODUCT SHOWCASE · AMBIENCE",
    deliverables: "2 Vertical Promo Reels · Macro Product · Vibe Cut",
    description: "Cafe walkthroughs, culinary sizzles, retail store launches, and product showcases designed to convert.",
    badge: "HIGH CONVERSION",
    accentColor: "#A855F7",
    svgVisual: (
      <svg viewBox="0 0 300 450" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A0826" />
            <stop offset="50%" stopColor="#110719" />
            <stop offset="100%" stopColor="#07040A" />
          </linearGradient>
          <radialGradient id="brand-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#A855F7" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="300" height="450" fill="url(#brand-grad)" />
        <rect width="300" height="450" fill="url(#brand-glow)" />
        {/* Studio spotlight cone */}
        <polygon points="150,40 40,320 260,320" fill="#C084FC" opacity="0.08" />
        {/* Product pedestal */}
        <ellipse cx="150" cy="285" rx="70" ry="16" fill="#1D1526" stroke="#A855F7" strokeWidth="1.5" />
        {/* Stylized coffee / perfume / product silhouette */}
        <rect x="132" y="210" width="36" height="65" rx="8" fill="#2E1C40" stroke="#C084FC" strokeWidth="1.5" />
        <line x1="140" y1="200" x2="160" y2="200" stroke="#E9D5FF" strokeWidth="3" strokeLinecap="round" />
        <line x1="150" y1="200" x2="150" y2="210" stroke="#E9D5FF" strokeWidth="2" />
        {/* Glow particles */}
        <circle cx="120" cy="180" r="3" fill="#E9D5FF" opacity="0.7" />
        <circle cx="180" cy="165" r="2.5" fill="#E9D5FF" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: "fitness-creator",
    slug: "fitness-creator",
    title: "Gym & Fitness",
    category: "Fitness & Creator",
    price: "₹1,500 – ₹2,000",
    priceNote: "per reel edit",
    turnaround: "24 HRS",
    tag: "DRAMATIC LIGHT · PUMP COVER",
    deliverables: "1 Cinematic Workout Reel · Heavy Set Sync · Lighting",
    description: "High-contrast dramatic lighting, aesthetic workout cuts, personal branding, and creator reels.",
    badge: "POPULAR",
    accentColor: "#06B6D4",
    svgVisual: (
      <svg viewBox="0 0 300 450" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="fit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#041B20" />
            <stop offset="50%" stopColor="#051214" />
            <stop offset="100%" stopColor="#02080A" />
          </linearGradient>
          <radialGradient id="fit-glow" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="300" height="450" fill="url(#fit-grad)" />
        <rect width="300" height="450" fill="url(#fit-glow)" />
        {/* Dramatic cross lighting */}
        <line x1="0" y1="80" x2="300" y2="340" stroke="#06B6D4" strokeWidth="1" opacity="0.25" />
        <line x1="300" y1="80" x2="0" y2="340" stroke="#06B6D4" strokeWidth="1" opacity="0.25" />
        {/* Barbell silhouette */}
        <line x1="50" y1="230" x2="250" y2="230" stroke="#22D3EE" strokeWidth="6" strokeLinecap="round" />
        {/* Weight plates */}
        <rect x="75" y="195" width="14" height="70" rx="4" fill="#0E2F35" stroke="#06B6D4" strokeWidth="1.5" />
        <rect x="92" y="205" width="10" height="50" rx="3" fill="#0E2F35" stroke="#06B6D4" strokeWidth="1.5" />
        <rect x="211" y="195" width="14" height="70" rx="4" fill="#0E2F35" stroke="#06B6D4" strokeWidth="1.5" />
        <rect x="198" y="205" width="10" height="50" rx="3" fill="#0E2F35" stroke="#06B6D4" strokeWidth="1.5" />
        {/* Cyan energy spark */}
        <polygon points="150,170 153,180 163,183 153,186 150,196 147,186 137,183 147,180" fill="#67E8F9" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "wedding-sangeet",
    slug: "wedding-sangeet",
    title: "Wedding & Sangeet",
    category: "Couples & Wedding",
    price: "₹7,000",
    priceNote: "complete event approx",
    turnaround: "24-48 HRS",
    tag: "4K PRORES · GRAND COUPLE",
    deliverables: "Cinematic Teaser Reel · 4K ProRes Master · Highlights",
    description: "Haldi, energetic Sangeet, romantic pre-wedding, and grand ceremony reels captured with high-bitrate ProRes.",
    badge: "PREMIUM",
    accentColor: "#F43F5E",
    svgVisual: (
      <svg viewBox="0 0 300 450" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="wed-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#240710" />
            <stop offset="50%" stopColor="#16080C" />
            <stop offset="100%" stopColor="#090305" />
          </linearGradient>
          <radialGradient id="wed-glow" cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#F43F5E" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="300" height="450" fill="url(#wed-grad)" />
        <rect width="300" height="450" fill="url(#wed-glow)" />
        {/* Mandap / arch golden silhouette */}
        <path d="M60 300 L60 170 Q150 110 240 170 L240 300" fill="none" stroke="#FDA4AF" strokeWidth="1.5" opacity="0.4" />
        <path d="M80 300 L80 185 Q150 135 220 185 L220 300" fill="none" stroke="#F43F5E" strokeWidth="1" opacity="0.3" />
        {/* Golden flower / fairy lights */}
        <circle cx="100" cy="165" r="3" fill="#FECDD3" opacity="0.75" />
        <circle cx="150" cy="125" r="4" fill="#FECDD3" opacity="0.85" />
        <circle cx="200" cy="165" r="3" fill="#FECDD3" opacity="0.75" />
        <circle cx="75" cy="220" r="2.5" fill="#FFE4E6" opacity="0.6" />
        <circle cx="225" cy="220" r="2.5" fill="#FFE4E6" opacity="0.6" />
        {/* Wedding rings interlocking icon */}
        <circle cx="140" cy="245" r="16" fill="none" stroke="#FDE047" strokeWidth="2" opacity="0.75" />
        <circle cx="160" cy="245" r="16" fill="none" stroke="#FB7185" strokeWidth="2" opacity="0.75" />
      </svg>
    ),
  },
  {
    id: "custom-other",
    slug: "custom-shoot",
    title: "Other / Custom Shoot",
    category: "Tailored For You",
    price: "Custom",
    priceNote: "fair quote",
    turnaround: "SAME DAY / 24H",
    tag: "YOU NAME IT · WE SHOOT IT",
    deliverables: "Festivals · College · Drone · Store Launch · Custom Cuts",
    description: "Got a unique moment, store launch, festival, or private event? Tell us your vision and we'll frame it in 4K ProRes.",
    badge: "DIRECT ENQUIRY",
    accentColor: "#3B82F6",
    svgVisual: (
      <svg viewBox="0 0 300 450" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="custom-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#08182B" />
            <stop offset="50%" stopColor="#080F18" />
            <stop offset="100%" stopColor="#05080C" />
          </linearGradient>
          <radialGradient id="custom-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="300" height="450" fill="url(#custom-grad)" />
        <rect width="300" height="450" fill="url(#custom-glow)" />
        {/* Cinema lens aperture blades */}
        <circle cx="150" cy="225" r="70" fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.6" strokeDasharray="6 4" />
        <circle cx="150" cy="225" r="45" fill="#0D2137" stroke="#3B82F6" strokeWidth="2.5" />
        <circle cx="150" cy="225" r="22" fill="#1D4ED8" opacity="0.5" />
        {/* Sparkle stars */}
        <polygon points="150,115 154,127 166,131 154,135 150,147 146,135 134,131 146,127" fill="#93C5FD" opacity="0.8" />
        <polygon points="90,290 92,298 100,300 92,302 90,310 88,302 80,300 88,298" fill="#93C5FD" opacity="0.6" />
        <polygon points="215,280 217,286 223,288 217,290 215,296 213,290 207,288 213,286" fill="#93C5FD" opacity="0.6" />
      </svg>
    ),
  },
];

const SERVICE_ICONS: Record<string, string> = {
  "instant-reel": "⚡",
  wedding: "💍",
  "hourly-coverage": "⏱️",
  "corporate-event": "🏢",
  "corporate-events": "🏢",
  "bike shoot": "🏍️",
  "car shoot": "🚗",
  automobile: "🏎️",
  "food reel": "🍔",
  "food-reels": "🍔",
  "brand shoot": "📸",
  "brand-promo": "📸",
  "store-opening": "🏪",
  "birthday-parties": "🎉",
  "custom-shoot": "🎬",
  "vehicle-delivery": "🚗",
  "product-launch": "🚀",
};

function SpotlightShootCard({
  children,
  active,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden bg-[#0C0C10] border flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl shadow-black/50 hover:-translate-y-1.5 select-none ${
        active
          ? "border-red ring-1 ring-red/50 shadow-red/20"
          : "border-white/[0.08] hover:border-red/40"
      } ${className}`}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(230, 56, 56, 0.24), transparent 75%)`,
        }}
      />
      {children}
    </article>
  );
}

export function WorkWall({
  projects,
  categories,
  services,
  settings,
  preview,
}: {
  projects?: unknown[];
  categories?: unknown[];
  services?: Service[];
  settings?: unknown;
  preview?: boolean;
} = {}) {
  void projects;
  void categories;
  void settings;
  void preview;
  const [activeShoot, setActiveShoot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToShoot = (index: number) => {
    setActiveShoot(index);
    if (carouselRef.current) {
      const card = carouselRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.firstElementChild as HTMLElement)?.clientWidth || 280;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < TOP_5_SHOOTS.length && newIndex !== activeShoot) {
      setActiveShoot(newIndex);
    }
  };

  const publishedServices = (services ?? []).filter((s) => s.published);

  return (
    <section id="services" className="mx-auto max-w-[1280px] px-4 md:px-6 py-12 md:py-24 relative">
      <div id="work" className="absolute -top-24" />
      <Container>
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono-brand text-[10px] tracking-[0.2em] uppercase text-red mb-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-red animate-pulse" />
              <span>Available Shoots &amp; Services · Transparent Pricing</span>
            </div>
            <h2 className="font-display text-[32px] sm:text-[48px] lg:text-[60px] font-extrabold leading-[0.92] tracking-tight uppercase text-[#F0EBDC]">
              AVAILABLE <span className="text-[#E63838]">SHOOTS.</span>
            </h2>
          </div>
          <div className="max-w-[420px]">
            <p className="font-sans text-[13px] sm:text-[14px] text-white/50 leading-relaxed">
              Transparent, market-rate shoot packages for Hyderabad &amp; pan-India. Shot on iPhone 4K ProRes with same-day 24h edits delivered ready for Instagram.
            </p>
          </div>
        </div>

        {/* Quick Shoot Switcher Pills (Mobile & Desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TOP_5_SHOOTS.map((shoot, idx) => (
            <button
              key={shoot.id}
              type="button"
              onClick={() => scrollToShoot(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-brand uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                idx === activeShoot
                  ? "bg-red text-white font-bold shadow-md shadow-red/30"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-white/60 border border-white/10"
              }`}
            >
              <span>{shoot.id === "custom-other" ? "✦ Other / Custom" : shoot.title.split(" ")[0]}</span>
              <span className="text-[10px] opacity-75">{shoot.price}</span>
            </button>
          ))}
        </div>

        {/* Top Shoots: 6-Column Grid on Desktop / Smooth Horizontal Snap Swipe on Mobile */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none gap-4 pb-2 sm:pb-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {TOP_5_SHOOTS.map((shoot, idx) => (
            <SpotlightShootCard
              key={shoot.id}
              active={idx === activeShoot}
              onClick={() => scrollToShoot(idx)}
              className="w-[80vw] max-w-[285px] shrink-0 snap-center sm:w-auto sm:shrink sm:max-w-none"
            >
              {/* Visual Thumbnail with Viewfinder Camera HUD */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                {shoot.svgVisual}

                {/* Viewfinder crosshair overlay */}
                <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[8px] font-mono-brand text-white/60">
                    <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                      [4K 60FPS]
                    </span>
                    <span className="bg-red/80 text-white font-bold px-1.5 py-0.5 rounded text-[7px] tracking-wider uppercase">
                      {shoot.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono-brand text-white/50">
                    <span className="text-[7px] tracking-widest uppercase">
                      ISO 400 · 1/50s
                    </span>
                    <span className="text-[7px] tracking-widest uppercase text-red">
                      ● REC
                    </span>
                  </div>
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-black/25 backdrop-blur-[2px]">
                  <div className="w-11 h-11 rounded-full bg-red text-white grid place-items-center shadow-lg shadow-red/40 transform scale-90 group-hover:scale-100 transition-transform">
                    <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom gradient fade into card body */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C0C10] to-transparent pointer-events-none" />
              </div>

              {/* Card Information */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-mono-brand text-[9px] uppercase tracking-[0.14em] text-white/40 mb-1">
                    {shoot.category}
                  </div>
                  <h3 className="font-display text-[17px] font-bold uppercase text-white leading-snug">
                    {shoot.title}
                  </h3>

                  {/* Price Tag */}
                  <div className="mt-2.5 flex items-baseline gap-1.5">
                    <span className="font-display text-[22px] font-extrabold text-[#E63838]">
                      {shoot.price}
                    </span>
                    <span className="text-[10px] font-mono-brand text-white/40">
                      {shoot.priceNote}
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] font-sans text-white/55 leading-relaxed">
                    {shoot.deliverables}
                  </p>
                </div>

                {/* Direct Action Link to /enquire with shoot preset */}
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <Link
                    href={`/enquire?service=${shoot.slug}`}
                    onClick={() => trackEvent("package_cta_clicked", { content: shoot.slug })}
                    className="w-full h-9 rounded-lg bg-white/[0.06] hover:bg-red hover:text-white text-white/80 font-sans font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 group-hover:border-transparent cursor-pointer"
                  >
                    <span>BOOK SHOOT</span>
                    <span className="text-[10px]">→</span>
                  </Link>
                </div>
              </div>
            </SpotlightShootCard>
          ))}
        </div>

        {/* Mobile Swipe / Pagination Indicators */}
        <div className="flex sm:hidden items-center justify-between mt-3 px-1 text-xs font-mono-brand text-white/40">
          <div className="flex items-center gap-1.5">
            {TOP_5_SHOOTS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToShoot(idx)}
                aria-label={`Go to shoot ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeShoot ? "w-6 bg-red" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-white/50">
            Swipe for more →
          </span>
        </div>

        {/* Collaborated Specialized Shoot Services Docket */}
        {publishedServices.length > 0 && (
          <div className="mt-6 p-3.5 sm:p-5 rounded-2xl bg-[#0C0C10]/90 backdrop-blur-md border border-white/[0.08] shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-red animate-pulse" />
                <span className="font-mono-brand text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-white/80 font-bold">
                  More Specialized Shoots
                </span>
                <span className="text-[10px] text-white/40 font-mono hidden sm:inline">✦ Custom &amp; Commercial</span>
              </div>
              <span className="font-mono-brand text-[9px] sm:text-[10px] text-red uppercase tracking-wider">
                Instant WhatsApp Confirmation
              </span>
            </div>
            {/* Compact 2-column on mobile, wrap on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-1.5 sm:gap-2">
              {publishedServices.map((service) => {
                const icon = SERVICE_ICONS[service.slug] ?? "📸";
                return (
                  <Link
                    key={service.id}
                    href={`/enquire?service=${encodeURIComponent(service.slug)}`}
                    onClick={() => trackEvent("package_cta_clicked", { content: service.slug })}
                    className="group flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-red/15 border border-white/10 hover:border-red/40 text-[11px] font-sans text-white/80 hover:text-white transition-all duration-200 cursor-pointer min-w-0"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="text-xs shrink-0">{icon}</span>
                      <span className="truncate font-medium">{service.name}</span>
                    </span>
                    <span className="text-[9px] text-white/30 group-hover:text-red transition-colors shrink-0">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Guarantee banner */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-brand text-white/45">
          <div className="flex items-center gap-2">
            <span className="text-red">✦</span>
            <span>CUSTOM PACKAGES AVAILABLE FOR TRAVEL &amp; MULTI-DAY FESTIVALS</span>
          </div>
          <Link
            href="/enquire"
            className="text-red hover:text-white transition-colors flex items-center gap-1"
          >
            <span>CUSTOM ENQUIRY DOCKET →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}