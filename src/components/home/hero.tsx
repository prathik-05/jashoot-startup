"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Container } from "../ui/container";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/schema";

// ─────────────────────────────────────────────────────────────────────────────
// 🎥 CHANGE HERO VIDEO & POSTER HERE:
// - Video file: Place your .mp4 in public/ (e.g. public/reel.mp4) and set HERO_VIDEO_SRC = "/reel.mp4"
//   Or pass any hosted URL (e.g. Supabase Storage, CDN, Cloudinary).
// - Poster image: Set HERO_POSTER_SRC to your cover image URL or /my-cover.jpg
// ─────────────────────────────────────────────────────────────────────────────
export const HERO_VIDEO_SRC = ""; // Set your video path or URL here, e.g. "/hero-reel.mp4"
export const HERO_POSTER_SRC =
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop";

interface HeroSettings {
  kicker?: string;
  headline?: string;
  sub?: string;
}

const PERFECT_FOR = [
  "Birthday Parties",
  "Vehicle Deliveries",
  "Brand Promotions",
  "Corporate Events",
  "Product Launches",
  "Store Openings",
  "Weddings",
  "Food & Restaurants",
];

export function Hero({ settings }: { settings?: HeroSettings } = {}) {
  void settings;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* ── 52px Technical Grid ────────────────────────────────────────────── */}
      <div className="hero-grid absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* ── Floating Orbital Radar Rings ────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* Outer 680px Orbit */}
        <div
          className="hero-orbit w-[680px] h-[680px] -top-28 -right-28 lg:top-[-80px] lg:right-[15%]"
          style={{ animationDuration: "14s" }}
        />
        {/* Inner 560px Orbit */}
        <div
          className="hero-orbit w-[560px] h-[560px] top-10 -right-10 lg:top-[40px] lg:right-[20%]"
          style={{ animationDuration: "10s", animationDirection: "reverse" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
          {/* ── Left Column: Headline & Value Proposition ────────────────────── */}
          <div>
            {/* Technical Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md animate-fade-up">
              <span className="size-2 rounded-full bg-[#E63838] animate-pulse" />
              <span className="font-mono-brand text-[10px] tracking-[0.14em] uppercase text-white/80">
                HYD · FASTEST REEL CREW
              </span>
            </div>

            {/* Signature Hero Title */}
            <h1
              id="hero-heading"
              className="reveal delay-1 font-display text-[clamp(3.65rem,11vw,9.6rem)] font-extrabold leading-[.83] tracking-[-.09em] text-[#f0ebdc] mt-6 select-none"
            >
              REAL<br />
              <span className="text-[#e5eb4c]">MOMENTS.</span><br />
              <span className="text-[#ef5b45]">REELS.</span>
            </h1>

            {/* Explanatory Body Copy in DM Sans */}
            <p className="mt-6 text-body-lg text-[#F0EBDC]/80 font-sans max-w-xl leading-relaxed">
              You bring the moment. We bring the camera, the sound, and the edit. Professional cinematic reels shot on iPhone + Gimbal, delivered to your phone in minutes.
            </p>

            {/* Technical Camera Badges in Space Mono */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 font-mono-brand text-[10px] uppercase tracking-[0.12em] text-white/70">
              <span className="px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#E63838]" /> 4K 60FPS PRORES
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
                DJI RS4 GIMBAL
              </span>
              <span className="px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-[#E63838]">
                HYDERABAD / INDIA
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/enquire"
                className="btn-primary px-8 py-3.5 text-[14px] font-bold tracking-wide"
              >
                <span>ENQUIRE NOW</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3 text-[13px] font-mono-brand uppercase tracking-[0.12em] text-white/80 hover:text-white flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-[#E63838]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@{INSTAGRAM_HANDLE.replace("@", "")}</span>
              </a>
            </div>

            {/* Perfect For Tags */}
            <div className="mt-10 pt-6 border-t border-white/8">
              <p className="font-mono-brand text-[9px] uppercase tracking-[0.16em] text-white/50 mb-3">
                PERFECT FOR
              </p>
              <div className="flex flex-wrap gap-2">
                {PERFECT_FOR.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/8 font-sans text-[12px] text-[#F0EBDC]/70 hover:text-[#F0EBDC] hover:border-[#E63838]/40 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: CAPTURE_001 / LIVE Video Card ──────────────────── */}
          <div className="relative w-full max-w-[460px] mx-auto lg:mx-0">
            {/* Ambient Backlight Halo */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#E63838]/25 via-transparent to-[#E63838]/15 rounded-[2.5rem] blur-2xl -z-10 transition-opacity duration-700 opacity-60 group-hover:opacity-90 pointer-events-none" />

            {/* Main Video Card */}
            <div
              className={`relative rounded-[2rem] aspect-[4/5] border border-white/15 shadow-2xl overflow-hidden bg-black/80 hero-visual group ${
                isPlaying ? "is-playing" : ""
              }`}
            >
              {/* Camera Viewfinder Corner Brackets */}
              <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none text-white/40 font-mono text-sm leading-none select-none">┌</div>
              <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none text-white/40 font-mono text-sm leading-none select-none">┐</div>
              <div className="absolute bottom-3.5 left-3.5 z-20 pointer-events-none text-white/40 font-mono text-sm leading-none select-none">└</div>
              <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none text-white/40 font-mono text-sm leading-none select-none">┘</div>

              {/* Media layer */}
              <div className="absolute inset-0 z-0">
                {HERO_VIDEO_SRC ? (
                  <video
                    ref={videoRef}
                    src={HERO_VIDEO_SRC}
                    poster={HERO_POSTER_SRC}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover select-none transition-transform duration-700"
                  />
                ) : (
                  <Image
                    src={HERO_POSTER_SRC}
                    alt="JASHOOTS Cinematic Live Reel"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover select-none transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />
              </div>

              {/* Top HUD Pill & Metadata */}
              <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                  <span className="size-1.5 rounded-full bg-[#ef5b45] animate-pulse" />
                  <span className="font-mono-brand text-[9px] tracking-[.14em] text-white/90 uppercase">
                    FEATURED REEL
                  </span>
                </div>
                <div className="font-mono-brand text-[9px] tracking-[.16em] uppercase text-white/80 bg-black/50 px-2.5 py-1 rounded border border-white/15 backdrop-blur-sm flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-[#E63838] animate-ping" />
                  <span>{isPlaying ? "PLAYING [4K]" : "STANDBY"}</span>
                </div>
              </div>

              {/* Floating Play Button with 10px red halo */}
              <div className="absolute inset-0 z-20 grid place-items-center">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause reel preview" : "Play reel preview"}
                  className="play-button size-20 rounded-full bg-[#E63838] text-white grid place-items-center cursor-pointer transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 fill-white translate-x-0.5" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Bottom Left Audio Waveform Visualizer */}
              <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 pointer-events-none">
                <div className="flex items-end gap-0.5 h-4 px-2 py-0.5 rounded bg-black/60 border border-white/10 backdrop-blur-md">
                  <span className="w-0.5 bg-[#E63838] rounded-full animate-soundwave-a" />
                  <span className="w-0.5 bg-white/70 rounded-full animate-soundwave-b" />
                  <span className="w-0.5 bg-[#E63838] rounded-full animate-soundwave-c" />
                  <span className="w-0.5 bg-white/70 rounded-full animate-soundwave-d" />
                </div>
                <span className="font-mono-brand text-[8px] uppercase tracking-[0.16em] text-white/70 bg-black/50 px-2 py-1 rounded border border-white/10 backdrop-blur-sm">
                  {isPlaying ? "AUDIO ACTIVE" : "4K AUDIO SYNC"}
                </span>
              </div>

              {/* Bottom Right HUD Technical Info */}
              <div className="absolute bottom-5 right-5 z-20 font-mono-brand text-[8px] uppercase tracking-[0.14em] text-white/60 text-right pointer-events-none bg-black/50 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
                <div>ISO 400 · 1/50s</div>
                <div className="text-[#E63838]">PRORES LOG</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}