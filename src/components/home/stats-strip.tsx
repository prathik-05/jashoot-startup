export function StatsStrip() {
  const stats = [
    { label: "INSTANT SHOOT", sub: "On-Spot Coverage" },
    { label: "EXPERT EDITING", sub: "Cinematic Cuts" },
    { label: "FAST DELIVERY", sub: "In Minutes" },
    { label: "100% QUALITY", sub: "Pro Grade" },
  ];

  return (
    <section className="relative bg-red text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red via-red to-red/90" />
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 py-5 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 md:justify-center px-2 ${
              i < stats.length - 1 ? "md:border-r border-white/20" : ""
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-black/20 grid place-items-center shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
              </svg>
            </div>
            <div>
              <div className="font-mono-brand font-bold text-[12px] tracking-[0.14em] uppercase text-white">
                {s.label}
              </div>
              <div className="font-sans text-[11px] text-white/80">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
