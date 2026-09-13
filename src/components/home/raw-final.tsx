"use client";

import { useRef, useState } from "react";
import { Section, SectionHead } from "../ui/section";
import { trackEvent } from "@/lib/track";

export function RawFinal({ settings }: { settings: { headline?: string } }) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <Section id="raw-final">
      <SectionHead title={settings.headline ?? "Raw → Final"} />
      <div
        ref={trackRef}
        role="slider"
        aria-label="Raw to final comparison"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
          trackEvent("reel_played", { content: "raw-final" });
        }}
        className="relative mt-6 aspect-video cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-border"
      >
        <div className="absolute inset-0 grid place-items-center bg-panel">
          <div className="text-center">
            <p className="text-display text-3xl text-white/20 sm:text-5xl">RAW</p>
            <p className="mt-2 text-[0.55rem] uppercase tracking-[0.1em] text-fog/30">
              Flat · shaky · uncut
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 grid place-items-center bg-gradient-to-br from-red/20 to-red/5 border border-red/10"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          aria-hidden="true"
        >
          <div className="text-center">
            <p className="text-display text-3xl text-white sm:text-5xl">FINAL</p>
            <p className="mt-2 text-[0.55rem] uppercase tracking-[0.1em] text-fog/60">
              Graded · stabilized · scored
            </p>
          </div>
        </div>
        <div
          className="absolute inset-y-0 w-px bg-white/40"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-canvas/70 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.1em] text-fog backdrop-blur">
          Raw
        </span>
        <span className="absolute right-3 top-3 rounded-lg bg-red px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.1em] text-white">
          Final
        </span>
      </div>
      <p className="mt-2 text-xs text-fog/50">Drag the divider — this is what the edit buys you.</p>
    </Section>
  );
}
