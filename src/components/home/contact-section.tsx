"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/schema";

interface Hotspot {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  eta: string;
  status: string;
  statusColor: string;
  shoots: string;
  gear: string;
  serviceSlug: string;
  x: number;
  y: number;
  path?: string;
  flightTime?: string;
}

const METRO_HOTSPOTS: Hotspot[] = [
  {
    id: "hq",
    name: "HYDERABAD HQ",
    subtitle: "Abids / Central Command Hub",
    badge: "CENTRAL BASE",
    eta: "IMMEDIATE DISPATCH",
    status: "BASE READY",
    statusColor: "#E63838",
    shoots: "Central Mobilization · Studio · Instant Gear Vault",
    gear: "iPhone 4K ProRes LOG + DJI RS4 Gimbal",
    serviceSlug: "brand-product",
    x: 200,
    y: 180,
  },
  {
    id: "jubilee",
    name: "JUBILEE & BANJARA HILLS",
    subtitle: "Road 36 · VIP Lounges · Luxury Dining",
    badge: "NIGHTLIFE & LUXURY",
    eta: "~15 MINS DISPATCH",
    status: "ACTIVE PATROL",
    statusColor: "#10B981",
    shoots: "VIP Club Drops, Nightlife Recaps, Fine Dining & Luxury Cafes",
    gear: "F1.8 Low-Light Rig · Wide-Angle Cinematic Lens · Beat Sync",
    serviceSlug: "function-events",
    x: 130,
    y: 135,
  },
  {
    id: "hitec",
    name: "HITEC CITY & GACHIBOWLI",
    subtitle: "Cyber Towers · Financial District",
    badge: "TECH & BRANDS",
    eta: "~20 MINS DISPATCH",
    status: "ON STANDBY",
    statusColor: "#38BDF8",
    shoots: "Tech Brand Launches, Co-working Sizzles, Athlete Gym PRs",
    gear: "4K 60FPS ProRes LOG · Gimbal Orbit Rig · Vertical Framer",
    serviceSlug: "brand-product",
    x: 85,
    y: 205,
  },
  {
    id: "dhoolpet",
    name: "DHOOLPET & OLD CITY",
    subtitle: "Historic Core · Visarjan Central",
    badge: "GANESH EPICENTER",
    eta: "~12 MINS DISPATCH",
    status: "HIGH DEMAND",
    statusColor: "#E63838",
    shoots: "Ganesh Aagman & Visarjan 4AM Shoots, Historic Heritage Reels",
    gear: "Dust-Sealed Low-Light Beast · Ultra Wide 60FPS · Smoke Grade",
    serviceSlug: "function-events",
    x: 205,
    y: 260,
  },
  {
    id: "orr",
    name: "OUTER RING ROAD (ORR)",
    subtitle: "Expressway · Shamshabad High-Speed Corridor",
    badge: "SUPERBIKE & SUPERCAR",
    eta: "~20 MINS ACCESS",
    status: "SPEED READY",
    statusColor: "#F59E0B",
    shoots: "Supercar & Superbike Rollers, Exhaust Flame Pops, 60FPS Chases",
    gear: "High-Shutter Speed Locked Gimbal · Suction Car Mount Rig",
    serviceSlug: "automobile",
    x: 310,
    y: 120,
  },
  {
    id: "secunderabad",
    name: "SECUNDERABAD & EAST ZONE",
    subtitle: "Clock Tower · Grand Convention Halls",
    badge: "ROYAL WEDDINGS",
    eta: "~22 MINS DISPATCH",
    status: "AVAILABLE",
    statusColor: "#EC4899",
    shoots: "Grand Telugu Weddings, Sangeet Nights, College & Cultural Fests",
    gear: "Dual Wireless Lav Mics · Warm Cinematic Profile · Fast Edit",
    serviceSlug: "wedding-sangeet",
    x: 285,
    y: 235,
  },
];

const PAN_INDIA_HOTSPOTS: Hotspot[] = [
  {
    id: "hyd_base",
    name: "HYDERABAD BASE (RGIA)",
    subtitle: "Central Indian Aviation Hub (HYD)",
    badge: "FLIGHT COMMAND",
    eta: "CENTRAL DEPARTURE",
    status: "READY TO FLY",
    statusColor: "#E63838",
    shoots: "Zero-Lag Domestic Mobilization · Carry-on Production Kit",
    gear: "Pelican Flight Kit · Multi-Battery Pack · Rapid Field DIT",
    serviceSlug: "wedding-sangeet",
    x: 195,
    y: 200,
  },
  {
    id: "goa",
    name: "GOA (GOI / GOX)",
    subtitle: "Vagator · Anjuna · South Goa Resorts",
    badge: "BEACH WEDDINGS & EDM",
    eta: "1H 10M DIRECT FLIGHT",
    status: "FREQUENT ROUTE",
    statusColor: "#10B981",
    shoots: "Beach Sunset Weddings, EDM Festivals, Luxury Yacht Parties",
    gear: "ND Filter Flare Kit · Sunset Color Profile · Water-Resistant Rig",
    serviceSlug: "wedding-sangeet",
    x: 110,
    y: 265,
    path: "M 195 200 Q 145 240 110 265",
    flightTime: "1h 10m",
  },
  {
    id: "mumbai",
    name: "MUMBAI & PUNE (BOM/PNQ)",
    subtitle: "Lalbaugcha Raja · Marine Drive · Bandra",
    badge: "VISARJAN & AUTOMOTIVE",
    eta: "1H 15M DIRECT FLIGHT",
    status: "FESTIVAL READY",
    statusColor: "#F59E0B",
    shoots: "Lalbaug Visarjan, Sea Link Supercar Rollouts, Creator Collabs",
    gear: "Crowd Stabilizer · High Dynamic Range Log · 24H Turnaround",
    serviceSlug: "automobile",
    x: 95,
    y: 160,
    path: "M 195 200 Q 135 175 95 160",
    flightTime: "1h 15m",
  },
  {
    id: "bengaluru",
    name: "BENGALURU (BLR)",
    subtitle: "Indiranagar · Koramangala · Track Days",
    badge: "CREATOR & TECH HUBS",
    eta: "1H 05M DIRECT FLIGHT",
    status: "WEEKEND ROTATION",
    statusColor: "#38BDF8",
    shoots: "Founder Keynotes, Track Superbike Laps, Specialty Coffee Sizzles",
    gear: "Crisp Commercial Color Science · Hyperlapse Motion Rig",
    serviceSlug: "brand-product",
    x: 180,
    y: 295,
    path: "M 195 200 Q 190 255 180 295",
    flightTime: "1h 05m",
  },
  {
    id: "delhi",
    name: "DELHI NCR (DEL)",
    subtitle: "Gurugram Farmhouses · Connaught Place",
    badge: "BIG FAT WEDDINGS",
    eta: "2H 10M DIRECT FLIGHT",
    status: "ADVANCE BOOKING",
    statusColor: "#EC4899",
    shoots: "Grand Royal Celebrations, Luxury Car Expos, Brand Launches",
    gear: "Dual-Angle 4K Setup · Master Grade LUTs · Same-Day Teaser",
    serviceSlug: "wedding-sangeet",
    x: 195,
    y: 65,
    path: "M 195 200 Q 190 125 195 65",
    flightTime: "2h 10m",
  },
  {
    id: "tirupati",
    name: "TIRUPATI & CHENNAI",
    subtitle: "Temple Celebrations & Coastal Events",
    badge: "HERITAGE & WEDDINGS",
    eta: "1H 00M TRANSIT",
    status: "FAST CONNECT",
    statusColor: "#A855F7",
    shoots: "Traditional Ceremonies, Temple Wedding Celebrations, Cultural Galas",
    gear: "Low-Profile Silent Rig · Natural Golden Hour Profile",
    serviceSlug: "wedding-sangeet",
    x: 285,
    y: 270,
    path: "M 195 200 Q 245 240 285 270",
    flightTime: "1h 00m",
  },
];

export function ContactSection() {
  const [hudMode, setHudMode] = useState<"metro" | "panIndia">("metro");
  const [activeNodeId, setActiveNodeId] = useState<string>("hq");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeHotspots = hudMode === "metro" ? METRO_HOTSPOTS : PAN_INDIA_HOTSPOTS;
  const activeNode =
    activeHotspots.find((n) => n.id === activeNodeId) || activeHotspots[0];

  const handleModeSwitch = (mode: "metro" | "panIndia") => {
    setHudMode(mode);
    setActiveNodeId(mode === "metro" ? "hq" : "hyd_base");
  };

  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-4 md:px-6 py-14 md:py-24">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        {/* Left: Book Now Hub Template */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red/10 border border-red/20 text-red font-mono-brand text-[11px] tracking-[0.16em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              04 // BOOKING &amp; RESERVATION
            </div>
            <h2 className="font-display text-[44px] md:text-[64px] lg:text-[76px] leading-[0.88] tracking-[0.02em] uppercase font-extrabold text-[#F0EBDC]">
              BOOK <span className="text-[#E63838]">NOW.</span>
            </h2>
            <p className="mt-4 font-sans text-[14px] md:text-[15px] text-white/50 max-w-[460px] leading-relaxed">
              You bring the moment, we frame the reel. Submit your shoot details on our booking portal or connect instantly on WhatsApp for rapid turnaround.
            </p>
          </div>

          {/* Booking Template Card */}
          <div className="rounded-2xl bg-surface/70 border border-white/[0.08] p-5 sm:p-7 space-y-4 backdrop-blur-sm shadow-xl shadow-black/40">
            {/* Primary Action 1: BOOK NOW -> Enquire Page */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-red/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red" />
                  <span className="font-mono-brand text-[10px] tracking-[0.16em] uppercase text-red font-semibold">
                    ONLINE // SHOOT ENQUIRY DOCKET
                  </span>
                </div>
                <span className="font-mono-brand text-[10px] text-white/30 tracking-wider">
                  ~60 SEC FORM
                </span>
              </div>
              <h3 className="font-display text-[19px] sm:text-[22px] font-bold uppercase text-white mb-1.5">
                Detailed Shoot Enquiry
              </h3>
              <p className="font-sans text-[12px] sm:text-[13px] text-white/50 mb-4 leading-relaxed">
                Provide your event type, date, location in Hyderabad &amp; reel deliverable requirements on our dedicated booking page.
              </p>
              <Link
                href="/enquire"
                className="w-full h-[52px] rounded-xl bg-red hover:bg-[#ff3b3b] text-white font-sans font-bold tracking-[0.12em] uppercase text-[13px] flex items-center justify-between px-5 sm:px-6 transition-all duration-200 shadow-[0_0_24px_rgba(230,56,56,0.35)] hover:shadow-[0_0_36px_rgba(230,56,56,0.55)] cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>BOOK NOW</span>
                </span>
                <span className="flex items-center gap-1.5 text-white/90 text-xs font-mono-brand">
                  <span>SEND ENQUIRY</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Divider */}
            <div className="relative py-1 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative bg-[#141210] px-3 font-mono-brand text-[10px] uppercase tracking-[0.2em] text-white/35">
                OR DIRECT BOOKING
              </div>
            </div>

            {/* Primary Action 2: WhatsApp Instant Chat */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#25D366]/[0.04] border border-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                  <span className="font-mono-brand text-[10px] tracking-[0.16em] uppercase text-[#25D366] font-semibold">
                    FASTEST // DIRECT CHAT
                  </span>
                </div>
                <span className="font-mono-brand text-[10px] text-[#25D366]/70 tracking-wider">
                  ~10 MIN RESPONSE
                </span>
              </div>
              <h3 className="font-display text-[19px] sm:text-[22px] font-bold uppercase text-white mb-1.5">
                Chat On WhatsApp
              </h3>
              <p className="font-sans text-[12px] sm:text-[13px] text-white/50 mb-4 leading-relaxed">
                Need urgent slot confirmation, custom event pricing, or direct answers? Message Jashwanth directly on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi JASHOOTS - I want to book a shoot / enquire for Hyderabad")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[52px] rounded-xl bg-[#25D366] hover:bg-[#22c35e] text-black font-sans font-bold tracking-[0.12em] uppercase text-[13px] flex items-center justify-between px-5 sm:px-6 transition-all duration-200 shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_30px_rgba(37,211,102,0.45)] cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>CHAT ON WHATSAPP</span>
                </span>
                <span className="font-mono-brand text-xs font-bold text-black/80">
                  INSTANT CONNECT →
                </span>
              </a>
            </div>

            {/* Quick Guarantee & Social Strip */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono-brand text-white/45 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-red">●</span>
                <span>SAME-DAY 24H DELIVERY GUARANTEE</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white/60">
                  HYDERABAD &amp; PAN-INDIA
                </span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-red transition-colors flex items-center gap-1"
                >
                  <span>@CLIPSBYJASHOOTS</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: UPGRADED INTERACTIVE RADAR & FLIGHT DISPATCH HUD */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#141316] via-[#100F12] to-[#0D0D10] border border-white/[0.12] shadow-2xl shadow-black/60 flex flex-col">
          {/* Top HUD Header with Mode Switcher & Telemetry */}
          <div className="p-3.5 sm:p-4 bg-black/40 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red" />
              </span>
              <span className="font-mono-brand font-bold text-[11px] tracking-[0.16em] uppercase text-white/90">
                LIVE DISPATCH RADAR
              </span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-black/60 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono-brand">
              <button
                type="button"
                onClick={() => handleModeSwitch("metro")}
                className={`px-2.5 py-1 rounded-md transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  hudMode === "metro"
                    ? "bg-red text-white font-bold shadow-sm shadow-red/40"
                    : "text-white/45 hover:text-white"
                }`}
              >
                <span>📍 HYD METRO</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch("panIndia")}
                className={`px-2.5 py-1 rounded-md transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  hudMode === "panIndia"
                    ? "bg-red text-white font-bold shadow-sm shadow-red/40"
                    : "text-white/45 hover:text-white"
                }`}
              >
                <span>✈️ PAN-INDIA</span>
              </button>
            </div>
          </div>

          {/* HUD Sub-Bar with Coordinates and Live Clock */}
          <div className="px-4 py-2 bg-black/30 border-b border-white/[0.04] flex items-center justify-between text-[9px] font-mono-brand text-white/40">
            <div className="flex items-center gap-2">
              <span className="text-red/80 font-bold">GPS:</span>
              <span>17.3850° N, 78.4867° E</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60">TIME:</span>
              <span className="text-white/90 font-bold">{currentTime || "LIVE SYNC"}</span>
            </div>
          </div>

          {/* Interactive Radar Display Screen */}
          <div className="relative h-[320px] sm:h-[350px] w-full bg-[#0A0A0D] overflow-hidden select-none">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg viewBox="0 0 400 360" className="w-full h-full">
                <defs>
                  <pattern id="tactical-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="400" height="360" fill="url(#tactical-grid)" />
              </svg>
            </div>

            {/* Interactive SVG Canvas */}
            <svg
              viewBox="0 0 400 360"
              className="w-full h-full relative z-10"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Radar Sweep Gradient */}
                <linearGradient id="sweep-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E63838" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#E63838" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#E63838" stopOpacity="0" />
                </linearGradient>

                {/* HQ Pulse Radial Glow */}
                <radialGradient id="hq-glow">
                  <stop offset="0%" stopColor="#E63838" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#E63838" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#E63838" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric Tactical Range Rings */}
              {hudMode === "metro" ? (
                <>
                  <circle cx="200" cy="180" r="45" fill="none" stroke="#E63838" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
                  <circle cx="200" cy="180" r="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                  <circle cx="200" cy="180" r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="4 4" />

                  {/* Range Distance Labels */}
                  <text x="200" y="130" textAnchor="middle" fill="#E63838" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.4">10 KM INNER RADAR</text>
                  <text x="200" y="85" textAnchor="middle" fill="white" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.3">25 KM METRO CORRIDOR</text>
                  <text x="200" y="35" textAnchor="middle" fill="white" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.2">50 KM ORR PERIMETER</text>

                  {/* Azimuth / Direction Markers */}
                  <text x="200" y="16" textAnchor="middle" fill="#E63838" fontSize="9" fontFamily="Space Mono, monospace" fontWeight="bold" opacity="0.6">N 000°</text>
                  <text x="385" y="183" textAnchor="end" fill="white" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.3">E 090°</text>
                  <text x="200" y="352" textAnchor="middle" fill="white" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.3">S 180°</text>
                  <text x="15" y="183" textAnchor="start" fill="white" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.3">W 270°</text>

                  {/* Crosshairs */}
                  <line x1="200" y1="25" x2="200" y2="335" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
                  <line x1="25" y1="180" x2="375" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />

                  {/* Animated Rotating Radar Sweep Beam */}
                  <g className="origin-[200px_180px] animate-[spin_5.5s_linear_infinite] pointer-events-none">
                    <line x1="200" y1="180" x2="350" y2="180" stroke="#E63838" strokeWidth="1.6" opacity="0.75" />
                    <path
                      d="M 200 180 L 350 180 A 150 150 0 0 0 325 105 Z"
                      fill="url(#sweep-gradient)"
                    />
                  </g>

                  {/* Tactical connecting line to active node */}
                  {activeNode && activeNode.id !== "hq" && (
                    <line
                      x1="200"
                      y1="180"
                      x2={activeNode.x}
                      y2={activeNode.y}
                      stroke="#E63838"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      opacity="0.75"
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Pan-India Air Corridor Background Rings */}
                  <circle cx="195" cy="200" r="60" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="195" cy="200" r="115" fill="none" stroke="#E63838" strokeWidth="0.8" opacity="0.25" />
                  <circle cx="195" cy="200" r="165" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" strokeDasharray="4 4" />

                  <text x="195" y="135" textAnchor="middle" fill="white" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.3">500 KM AIR REACH</text>
                  <text x="195" y="80" textAnchor="middle" fill="#E63838" fontSize="8" fontFamily="Space Mono, monospace" opacity="0.5">1000 KM DOMESTIC ROUTE</text>

                  {/* India Tactical Grid & Compass */}
                  <line x1="195" y1="20" x2="195" y2="340" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />

                  {/* Flight Arcs and Traveling Pulses */}
                  {PAN_INDIA_HOTSPOTS.filter((h) => h.path).map((dest, idx) => {
                    const isSelected = dest.id === activeNodeId;
                    return (
                      <g key={dest.id}>
                        <path
                          d={dest.path}
                          fill="none"
                          stroke={isSelected ? "#E63838" : "rgba(230,56,56,0.28)"}
                          strokeWidth={isSelected ? "2" : "1.2"}
                          strokeDasharray="4 4"
                          opacity={isSelected ? "1" : "0.6"}
                        />
                        {/* Animated traveling light along flight path */}
                        <circle r="3.2" fill="#E63838">
                          <animateMotion
                            path={dest.path}
                            dur={idx % 2 === 0 ? "2.6s" : "3.4s"}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    );
                  })}
                </>
              )}

              {/* Render Hotspot Nodes */}
              {activeHotspots.map((node) => {
                const isSelected = node.id === activeNodeId;
                const isHq = node.id === "hq" || node.id === "hyd_base";

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer transition-transform duration-200 hover:scale-110"
                    onClick={() => setActiveNodeId(node.id)}
                  >
                    {/* Invisible expanded hit target for easy clicking / touch */}
                    <circle cx={node.x} cy={node.y} r="22" fill="transparent" />

                    {/* Central Shockwave Pulse for HQ or selected node */}
                    {isSelected && (
                      <>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="18"
                          fill="none"
                          stroke="#E63838"
                          strokeWidth="1.5"
                          opacity="0.6"
                        >
                          <animate attributeName="r" from="8" to="24" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        {/* Targeting brackets [ ] */}
                        <path
                          d={`M ${node.x - 14} ${node.y - 8} L ${node.x - 14} ${node.y - 14} L ${node.x - 8} ${node.y - 14}`}
                          fill="none"
                          stroke="#E63838"
                          strokeWidth="1.5"
                        />
                        <path
                          d={`M ${node.x + 14} ${node.y - 8} L ${node.x + 14} ${node.y - 14} L ${node.x + 8} ${node.y - 14}`}
                          fill="none"
                          stroke="#E63838"
                          strokeWidth="1.5"
                        />
                        <path
                          d={`M ${node.x - 14} ${node.y + 8} L ${node.x - 14} ${node.y + 14} L ${node.x - 8} ${node.y + 14}`}
                          fill="none"
                          stroke="#E63838"
                          strokeWidth="1.5"
                        />
                        <path
                          d={`M ${node.x + 14} ${node.y + 8} L ${node.x + 14} ${node.y + 14} L ${node.x + 8} ${node.y + 14}`}
                          fill="none"
                          stroke="#E63838"
                          strokeWidth="1.5"
                        />
                      </>
                    )}

                    {/* Outer Beacon Glow */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHq ? "9" : "6"}
                      fill={node.statusColor}
                      opacity={isSelected ? "0.9" : "0.4"}
                    />
                    {/* Inner Solid Point */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHq ? "5" : "3.5"}
                      fill="#FFFFFF"
                    />

                    {/* Node Tag Label */}
                    <text
                      x={node.x}
                      y={node.y + (node.y > 280 ? -14 : 16)}
                      textAnchor="middle"
                      fill={isSelected ? "#FFFFFF" : "#F0EBDC"}
                      fontSize={isHq ? "9.5" : "8"}
                      fontFamily="Space Mono, monospace"
                      fontWeight={isSelected || isHq ? "bold" : "normal"}
                      opacity={isSelected ? 1 : 0.75}
                      className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    >
                      {node.name.split(" ")[0]}
                      {isSelected ? " ●" : ""}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Tactical Corner HUD Overlays */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 border border-white/10 text-[9px] font-mono-brand text-white/60 pointer-events-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              <span>RADAR SCAN: ACTIVE</span>
            </div>

            <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/70 border border-white/10 text-[9px] font-mono-brand text-white/50 pointer-events-none">
              FREQ: 5.8 GHz // LOG-4K
            </div>

            {/* Interactive Location Quick-Picker Pills at Bottom of Screen */}
            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none z-20">
              {activeHotspots.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setActiveNodeId(n.id)}
                  className={`px-2.5 py-1 rounded-full text-[9px] font-mono-brand uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    n.id === activeNodeId
                      ? "bg-red text-white font-bold shadow-md shadow-red/50 border border-red"
                      : "bg-black/65 text-white/60 hover:text-white border border-white/10 hover:border-white/25 backdrop-blur-md"
                  }`}
                >
                  {n.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Node Live Telemetry Dossier (Bottom of Card) */}
          <div className="p-4 sm:p-5 bg-panel/90 border-t border-white/[0.08] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeNode.statusColor }}
                  />
                  <span className="font-mono-brand font-bold text-[13px] tracking-wider uppercase text-white">
                    {activeNode.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono-brand font-bold uppercase tracking-wider bg-white/[0.08] text-white/70 border border-white/10">
                    {activeNode.badge}
                  </span>
                </div>
                <div className="font-sans text-[11px] text-white/45 mt-0.5">
                  {activeNode.subtitle}
                </div>
              </div>

              {/* ETA / Flight Status Pill */}
              <div className="px-3 py-1.5 rounded-lg bg-red/10 border border-red/25 text-red font-mono-brand font-bold text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{activeNode.eta}</span>
              </div>
            </div>

            {/* Specialty Shoots & Gear Specification */}
            <div className="grid sm:grid-cols-2 gap-2 text-[11px] font-sans">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <div className="font-mono-brand text-[9px] uppercase tracking-wider text-white/40 mb-1">
                  SPECIALTY REEL SHOOTS
                </div>
                <div className="text-white/80 font-medium line-clamp-2">
                  {activeNode.shoots}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <div className="font-mono-brand text-[9px] uppercase tracking-wider text-white/40 mb-1">
                  CREW PRODUCTION GEAR
                </div>
                <div className="text-white/80 font-medium line-clamp-2">
                  {activeNode.gear}
                </div>
              </div>
            </div>

            {/* Direct Booking & Action Buttons for this Area */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <Link
                href={`/enquire?service=${encodeURIComponent(activeNode.serviceSlug)}`}
                className="flex-1 min-w-[140px] h-[40px] rounded-lg bg-red hover:bg-[#ff3b3b] text-white font-mono-brand font-bold text-[11px] tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-red/25 hover:shadow-red/45 cursor-pointer"
              >
                <span>BOOK IN THIS ZONE</span>
                <span className="text-xs">→</span>
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi JASHOOTS! I saw your Live Radar for ${activeNode.name}. I want to check availability for a shoot here.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[40px] px-3.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-[#25D366] font-mono-brand font-bold text-[10px] tracking-wider uppercase flex items-center gap-2 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WHATSAPP CREW</span>
              </a>
            </div>

            {/* Audio Waveform & Status Telemetry Strip */}
            <div className="pt-2 flex items-center justify-between text-[9px] font-mono-brand text-white/35 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#10B981]">●</span>
                <span>COMMS 48kHz ONLINE</span>
                {/* Visual Audio Bars */}
                <div className="flex items-center gap-0.5 ml-2 h-2.5">
                  <span className="w-0.5 h-1.5 bg-red/60 animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-2.5 bg-red animate-[pulse_0.5s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-1 bg-red/80 animate-[pulse_1.1s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-2 bg-red/50 animate-[pulse_0.7s_ease-in-out_infinite]" />
                </div>
              </div>
              <div>SAME-DAY 24H DELIVERY GUARANTEED</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
