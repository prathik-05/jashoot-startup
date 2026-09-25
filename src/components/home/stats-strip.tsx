export function StatsStrip() {
  const stats = [
    { label: "INSTANT SHOOT", sub: "On-Spot Coverage", icon: "⚡" },
    { label: "EXPERT EDITING", sub: "Cinematic Cuts", icon: "🎬" },
    { label: "FAST DELIVERY", sub: "In Minutes", icon: "🚀" },
    { label: "100% QUALITY", sub: "Pro 4K HDR Grade", icon: "✦" },
  ];

  return (
    <section className="relative bg-[#0A0A0E] text-white border-y border-white/[0.08] overflow-hidden shadow-2xl">
      {/* Subtle Dark Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E63838]/[0.05] via-transparent to-[#E63838]/[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-3.5 md:justify-center px-3 ${
              i < stats.length - 1 ? "md:border-r border-white/[0.06]" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] grid place-items-center shrink-0 shadow-inner text-[#E63838] text-sm">
              {s.icon}
            </div>
            <div>
              <div className="font-mono-brand font-bold text-[12px] tracking-[0.14em] uppercase text-[#F0EBDC]">
                {s.label}
              </div>
              <div className="font-sans text-[11px] text-white/50">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
