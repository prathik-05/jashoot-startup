export function FounderSection() {
  return (
    <section id="founder" className="bg-panel/30 border-y border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-12 md:py-20 grid md:grid-cols-[380px_1fr] gap-8">
        {/* Profile Card */}
        <div className="rounded-[20px] bg-shell border border-white/[0.06] p-6">
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-white/[0.08] grid place-items-center font-display text-[26px] text-white/80">
              J
            </div>
            <div>
              <div className="font-display text-[17px] uppercase tracking-[0.02em]">
                @mr.jashwanth06
              </div>
              <div className="font-body text-[11px] text-white/35 mt-0.5">
                Founder · JASHOOTS
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-white/40">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Creator &amp; Director · Hyderabad
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-5 p-4 rounded-xl bg-canvas/60 border border-white/[0.04]">
            <div className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-white/25">
              Bio
            </div>
            <p className="mt-2 font-body text-[12px] leading-relaxed text-white/50">
              Shoots @clipsbyjashoots · Self-made creator from Hyderabad. Built this from scratch — no fancy camera, just iPhone + gimbal + hard work. Co-author of all brand reels.
            </p>
          </div>

          {/* Telugu Voiceover */}
          <div className="mt-3 p-4 rounded-xl bg-red-dim border border-red/15">
            <div className="font-ui text-[9px] font-semibold tracking-[0.18em] uppercase text-red">
              Telugu Voiceover
            </div>
            <p className="mt-2 font-body text-[12px] italic leading-relaxed text-white/60">
              &quot;Kashtapadi sampadinchadamlo unna kick verey. iPhone tho start chesi, ippudu Hyderabad motham na reels choosthondi.&quot;
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red/10 border border-red/20 text-red font-mono-brand text-[10px] tracking-[0.16em] uppercase mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
            FOUNDER &amp; VISION
          </div>
          <h3 className="font-display text-[26px] sm:text-[34px] md:text-[46px] uppercase leading-[1.05] tracking-tight text-[#F0EBDC] break-words">
            BUILT FROM<br />
            <span className="text-[#E63838]">THE GROUND UP.</span>
          </h3>
          <p className="mt-3 font-sans text-[13px] sm:text-[14px] leading-relaxed text-white/60 max-w-xl">
            No massive agency overhead. No slow bureaucratic approvals. Just direct on-ground execution, mobile agility, and cinematic storytelling crafted for modern social feeds.
          </p>

          {/* Gear */}
          <div className="w-full mt-5 rounded-2xl bg-surface border border-white/[0.08] p-4 sm:p-5 md:p-6 flex gap-3.5 sm:gap-4 items-start min-w-0 box-border">
            <div className="w-9 h-9 rounded-full bg-red grid place-items-center shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-ui font-bold uppercase tracking-[0.14em] text-[12px] text-white">
                Gear — No Excuses
              </div>
              <p className="mt-1.5 font-body text-[12px] leading-relaxed text-white/50">
                iPhone, DJI OM Gimbal, CapCut Pro. No RED, no Sony FX. Proof that story &gt; gear. If you can see it, I can shoot it.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["iPhone", "DJI Gimbal", "CapCut", "Lightroom Mobile"].map((g) => (
                  <span key={g} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/8 text-[10px] font-body text-white/60">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
