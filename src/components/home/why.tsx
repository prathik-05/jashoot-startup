"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { WhyFeature, WhyShootDifferent } from "@/lib/schema";

export interface ShowcaseEvent {
  id: string;
  tabLabel: string;
  tagIcon: string;
  titleLine1: string;
  titleLine2: string;
  badge: string;
  topCardTitle: string;
  topCardSub: string;
  bottomCardTitle: string;
  bottomCardSub: string;
  quoteTitle: string;
  quoteSub: string;
  accentColor: string;
  bgGradient: string;
  liveStats: string;
  enquiryService: string;
}

const SHOWCASE_EVENTS: ShowcaseEvent[] = [
  {
    id: "ganesh",
    tabLabel: "GANESH FESTIVALS",
    tagIcon: "🔥",
    titleLine1: "GANESH",
    titleLine2: "AAGMAN",
    badge: "FESTIVAL SPECIALISTS",
    topCardTitle: "Low Light Kings",
    topCardSub: "Dhoolpet at 4AM? We own the night.",
    bottomCardTitle: "Reels Ready Before Prasadam",
    bottomCardSub: "Same-day 24h delivery while chanting continues.",
    quoteTitle: "DHUANDHAR VISARJAN REELS ✦",
    quoteSub: "Dhoolpet · Ramanthapur Ka Raja · Khairatabad",
    accentColor: "#E63838",
    bgGradient: "from-red-950/40 via-zinc-900/70 to-black/90",
    liveStats: "4K 60FPS · CROWD ENERGY: 100% · PRORES LOG",
    enquiryService: "function-events",
  },
  {
    id: "automobile",
    tabLabel: "SUPERBIKE & CAR",
    tagIcon: "🏍️",
    titleLine1: "SUPERBIKE",
    titleLine2: "& CAR CHASE",
    badge: "SPEED SPECIALISTS",
    topCardTitle: "Dynamic Rolling Shots",
    topCardSub: "Necklace Road & ORR speed-runs at 60FPS.",
    bottomCardTitle: "Exhaust Flame Audio",
    bottomCardSub: "Speed ramps synced to engine rev drops.",
    quoteTitle: "HIGH-OCTANE VELOCITY ✦",
    quoteSub: "BMW · Ducati · Kawasaki · Thar · Porsche",
    accentColor: "#E63838",
    bgGradient: "from-red-900/30 via-zinc-900/70 to-black/90",
    liveStats: "SHUTTER: 1/120s · ROLLING GIMBAL: LOCKED",
    enquiryService: "automobile",
  },
  {
    id: "nightlife",
    tabLabel: "CLUB NIGHTLIFE",
    tagIcon: "🎧",
    titleLine1: "CLUB &",
    titleLine2: "NIGHTLIFE",
    badge: "DROP SPECIALISTS",
    topCardTitle: "Strobe & Bass Immunity",
    topCardSub: "Jubilee Hills dancefloors & VIP sets.",
    bottomCardTitle: "Instant Recap Drop",
    bottomCardSub: "Posted to Instagram before the party ends.",
    quoteTitle: "HYDERABAD BASSLINE ✦",
    quoteSub: "Live DJ drops · Neon vibes · Crowd euphoria",
    accentColor: "#A855F7",
    bgGradient: "from-purple-950/40 via-zinc-900/70 to-black/90",
    liveStats: "ISO 1600 · F1.8 · CYBER COLOR GRADE",
    enquiryService: "function-events",
  },
  {
    id: "weddings",
    tabLabel: "ROYAL WEDDINGS",
    tagIcon: "💍",
    titleLine1: "ROYAL",
    titleLine2: "WEDDINGS",
    badge: "CINEMATIC COUPLES",
    topCardTitle: "Unfiltered Sangeet Joy",
    topCardSub: "High-energy choreography & grand entries.",
    bottomCardTitle: "Teaser Reel in 24 Hours",
    bottomCardSub: "Instant 4K couple cut for social celebration.",
    quoteTitle: "LOVE IN MOTION ✦",
    quoteSub: "Haldi · Sangeet · Pellikuthuru · Grand Reception",
    accentColor: "#F43F5E",
    bgGradient: "from-rose-950/40 via-zinc-900/70 to-black/90",
    liveStats: "4K PRORES LOG · ROMANCE WARMTH: 100%",
    enquiryService: "wedding-sangeet",
  },
  {
    id: "brands",
    tabLabel: "CAFE & BRANDS",
    tagIcon: "☕",
    titleLine1: "CAFE &",
    titleLine2: "BRAND LAUNCH",
    badge: "VIRAL CONVERSION",
    topCardTitle: "Aesthetic Macro Sizzles",
    topCardSub: "Banjara Hills & Hitec City culinary hotspots.",
    bottomCardTitle: "Footfall-Driven Cuts",
    bottomCardSub: "Engineered to convert scrollers into customers.",
    quoteTitle: "VIRAL FOOTFALL BOOST ✦",
    quoteSub: "Specialty Cafes · Fashion Boutiques · Retail Stores",
    accentColor: "#10B981",
    bgGradient: "from-emerald-950/40 via-zinc-900/70 to-black/90",
    liveStats: "9:16 VERTICAL · HIGH-RETENTION CUTS",
    enquiryService: "brand-product",
  },
  {
    id: "fitness",
    tabLabel: "GYM & FITNESS",
    tagIcon: "⚡",
    titleLine1: "GYM &",
    titleLine2: "FITNESS REELS",
    badge: "POWER & PHYSIQUE",
    topCardTitle: "Chiseled Contour Lighting",
    topCardSub: "Heavy PR sets framed with dramatic shadows.",
    bottomCardTitle: "Hardstyle Beat Drops",
    bottomCardSub: "High-retention audio for athlete personal branding.",
    quoteTitle: "RELENTLESS GRIND IN 4K ✦",
    quoteSub: "Powerlifting · Bodybuilding · Crossfit · Coaches",
    accentColor: "#06B6D4",
    bgGradient: "from-cyan-950/40 via-zinc-900/70 to-black/90",
    liveStats: "120FPS SLOW-MO · MUSCLE CONTOUR: MAX",
    enquiryService: "fitness-creator",
  },
];

export function Why({
  features,
}: {
  features: WhyFeature[];
  different?: WhyShootDifferent[];
  settings?: { headline?: string };
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const current = SHOWCASE_EVENTS[currentIndex];

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_EVENTS.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section id="why" className="mx-auto max-w-[1280px] px-4 md:px-6 py-14 md:py-24 scroll-mt-24">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
        {/* Left: Headline + Stats */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E63838]/10 border border-[#E63838]/20 text-[10px] font-mono-brand font-bold tracking-[0.18em] uppercase text-[#E63838]">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
            MULTI-EVENT DOMINANCE
          </div>
          <h3 className="mt-5 font-display text-[34px] sm:text-[48px] lg:text-[60px] font-extrabold leading-[0.92] tracking-tight uppercase text-[#F0EBDC]">
            Why Hyderabad<br />
            <span className="text-[#E63838]">Loves Us.</span>
          </h3>
          <p className="mt-5 font-sans text-[14px] sm:text-[15px] leading-relaxed text-[#F0EBDC]/70 max-w-[460px]">
            We don&apos;t just shoot one thing — we capture the pulse of the city. From Dhoolpet festival visarjans at 4AM to midnight supercar rollouts on the ORR, Jubilee Hills club drops, and intimate royal weddings — we frame raw moments that break the internet.
          </p>

          {/* Feature Highlights: 3-Column Grid on Desktop & Mobile with Clean Word Wrapping */}
          {features.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-2.5 max-w-[480px]">
              {features.slice(0, 3).map((f, i) => {
                const isHighlight = i === 2;
                return (
                  <div
                    key={f.title}
                    className={`rounded-xl border p-2.5 sm:p-3.5 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[96px] overflow-hidden ${
                      isHighlight
                        ? "bg-gradient-to-b from-[#E63838]/20 to-[#E63838]/5 text-white border-[#E63838]/40 shadow-[0_0_24px_rgba(230,56,56,0.15)]"
                        : "bg-[#0E0E13] border-white/[0.08] hover:border-white/15"
                    }`}
                  >
                    <div className="font-display font-black uppercase text-[11px] sm:text-[14px] md:text-[15px] leading-tight tracking-tight text-center break-words w-full">
                      {f.title === "CINEMATIC CAPTURE" ? (
                        <>
                          CINEMATIC<br />CAPTURE
                        </>
                      ) : (
                        f.title
                      )}
                    </div>
                    {f.description && (
                      <div
                        className="text-[9px] sm:text-[10px] font-sans sm:font-mono-brand uppercase tracking-normal sm:tracking-[0.06em] leading-tight text-center mt-1.5 sm:mt-2"
                        style={{
                          color: isHighlight
                            ? "rgba(255,255,255,0.92)"
                            : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {f.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right: Real-Time Auto-Cycling Event Showcase Engine */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-[24px] overflow-hidden bg-[#0C0C10] border border-white/[0.08] p-4 sm:p-6 shadow-2xl shadow-black/60 transition-all duration-500"
        >
          {/* Top Event Selector Pills */}
          <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SHOWCASE_EVENTS.map((evt, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono-brand uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? "bg-red text-white font-bold shadow-md shadow-red/30 scale-[1.02]"
                      : "bg-white/[0.04] text-white/45 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{evt.tagIcon}</span>
                  <span>{evt.tabLabel.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Timer Line */}
          <div className="relative h-1 w-full bg-white/[0.06] rounded-full overflow-hidden mb-4">
            <div
              key={currentIndex}
              className="h-full bg-red rounded-full transition-all"
              style={{
                width: isPaused ? "100%" : "100%",
                animation: isPaused ? "none" : "progressFill 3.8s linear",
              }}
            />
          </div>

          {/* Visual Showcase Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Big Feature Banner Card */}
            <div
              className={`sm:col-span-2 sm:row-span-2 rounded-2xl bg-gradient-to-br ${current.bgGradient} border border-white/10 p-5 sm:p-6 min-h-[200px] sm:min-h-[260px] flex flex-col justify-between relative overflow-hidden transition-all duration-500`}
            >
              {/* Background ambient lighting pulse */}
              <div
                className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ backgroundColor: current.accentColor }}
              />

              {/* Viewfinder HUD readout */}
              <div className="flex items-center justify-between text-[9px] font-mono-brand text-white/50 z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
                  <span>SPECIALIST MODE</span>
                </span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-white/10">
                  REAL-TIME / 0{currentIndex + 1}
                </span>
              </div>

              {/* Big Event Typography */}
              <div className="my-auto py-3 sm:py-4 z-10">
                <div className="font-display text-[26px] sm:text-[44px] font-black uppercase leading-[0.9] tracking-[0.02em] text-[#F0EBDC]">
                  {current.titleLine1}
                </div>
                <div
                  className="font-display text-[26px] sm:text-[44px] font-black uppercase leading-[0.9] tracking-[0.02em] mt-0.5"
                  style={{ color: current.accentColor }}
                >
                  {current.titleLine2}
                </div>
                <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black text-[9px] sm:text-[10px] font-ui font-bold tracking-[0.14em] uppercase shadow-lg">
                  <span>{current.tagIcon}</span>
                  <span>{current.badge}</span>
                </div>
              </div>

              {/* Audio visualizer equalizer bars & telemetry */}
              <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10 text-[9px] font-mono-brand text-white/40">
                <span className="truncate max-w-[200px]">{current.liveStats}</span>
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-red animate-pulse" />
                  <span className="w-1 h-4 bg-red animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-red animate-pulse delay-150" />
                  <span className="w-1 h-5 bg-red animate-pulse delay-100" />
                </div>
              </div>
            </div>

            {/* Sidecards Container: 2-Column Grid on Mobile, Stacked flex on Desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2.5 sm:col-span-1">
              {/* Sidecard 1: ADVANTAGE */}
              <div className="rounded-2xl bg-surface/80 border border-white/[0.08] p-3 sm:p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="font-mono-brand text-[8px] uppercase tracking-wider text-white/30">
                    ADVANTAGE
                  </span>
                </div>
                <div className="mt-2.5 sm:mt-3">
                  <div className="font-ui font-bold text-[11px] sm:text-[13px] uppercase tracking-[0.04em] text-white leading-tight">
                    {current.topCardTitle}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] font-sans text-white/40 leading-snug line-clamp-2">
                    {current.topCardSub}
                  </div>
                </div>
              </div>

              {/* Sidecard 2: SPEED SLA */}
              <div className="rounded-2xl bg-red p-3 sm:p-4 flex flex-col justify-between text-white shadow-lg shadow-red/25">
                <div className="flex items-center justify-between">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                  </svg>
                  <span className="font-mono-brand text-[8px] uppercase tracking-wider text-white/80">
                    SPEED SLA
                  </span>
                </div>
                <div className="mt-2.5 sm:mt-3">
                  <div className="font-ui font-bold text-[11px] sm:text-[13px] uppercase leading-tight tracking-[0.04em]">
                    {current.bottomCardTitle}
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] font-sans text-white/85 leading-snug line-clamp-2">
                    {current.bottomCardSub}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="sm:col-span-3 rounded-2xl bg-[#F0EBDC] text-black p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
              <div>
                <div className="font-ui font-bold uppercase tracking-[0.14em] text-[10px] sm:text-[11px] flex items-center gap-1.5">
                  <span>{current.quoteTitle}</span>
                </div>
                <div className="font-sans text-[10px] sm:text-[11px] text-black/60 mt-0.5">
                  {current.quoteSub}
                </div>
              </div>
              <Link
                href={`/enquire?service=${current.enquiryService}`}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black text-white text-[10px] font-mono-brand font-bold uppercase tracking-wider hover:bg-red transition-colors shrink-0 cursor-pointer"
              >
                <span>BOOK THIS EVENT</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
