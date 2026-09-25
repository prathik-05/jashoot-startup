"use client";

const TICKER_ITEMS = [
  "LIVE FROM HYDERABAD",
  "SAME-DAY 24H EDITS",
  "4K 60FPS PRORES CAPTURE",
  "AUTOMOBILE & SUPERBIKE REELS",
  "WEDDING & SANGEET TEASERS",
  "COMMERCIAL BRAND PROMOS",
  "DJI RS4 GIMBAL STABILIZATION",
  "VIRAL SOUND DESIGN & COLOR GRADE",
  "SERVING PAN-INDIA",
  "DIRECT FOUNDER COVERAGE",
];

export function LiveTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#08080B]/80 py-3 backdrop-blur-md select-none">
      {/* Left and Right Gradient Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[#08080B] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-[#08080B] to-transparent" />

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-4">
            <span className="font-mono-brand text-[11px] uppercase tracking-[0.18em] text-white/75 font-medium flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-red animate-pulse" />
              <span>{item}</span>
            </span>
            <span className="text-white/20 text-xs font-mono">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
