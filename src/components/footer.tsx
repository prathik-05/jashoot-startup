import Link from "next/link";
import { CITY, INSTAGRAM_URL, INSTAGRAM_HANDLE, TAGLINE } from "@/lib/schema";

export function Footer() {
  return (
    <footer className="relative mt-12 bg-black/50 border-t border-white/[0.04] overflow-hidden">
      {/* LAMP pattern background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <g fill="white">
            <path d="M0 200 Q20 80 40 200" opacity="0.5" />
            <path d="M45 200 Q65 60 85 200" opacity="0.5" />
            <path d="M90 200 Q110 90 130 200" opacity="0.5" />
            <path d="M135 200 Q155 50 175 200" opacity="0.5" />
            <path d="M180 200 Q200 70 220 200" opacity="0.5" />
            <path d="M225 200 Q245 85 265 200" opacity="0.5" />
            <path d="M270 200 Q290 55 310 200" opacity="0.5" />
            <path d="M315 200 Q335 75 355 200" opacity="0.5" />
            <path d="M360 200 Q380 65 400 200" opacity="0.5" />
            <path d="M405 200 Q425 80 445 200" opacity="0.5" />
            <path d="M450 200 Q470 50 490 200" opacity="0.5" />
            <path d="M495 200 Q515 90 535 200" opacity="0.5" />
            <path d="M540 200 Q560 60 580 200" opacity="0.5" />
            <path d="M585 200 Q605 70 625 200" opacity="0.5" />
            <path d="M630 200 Q650 85 670 200" opacity="0.5" />
            <path d="M675 200 Q695 55 715 200" opacity="0.5" />
            <path d="M720 200 Q740 75 760 200" opacity="0.5" />
            <path d="M765 200 Q785 65 805 200" opacity="0.5" />
            <path d="M810 200 Q830 80 850 200" opacity="0.5" />
            <path d="M855 200 Q875 50 895 200" opacity="0.5" />
            <path d="M900 200 Q920 90 940 200" opacity="0.5" />
            <path d="M945 200 Q965 60 985 200" opacity="0.5" />
            <path d="M990 200 Q1010 70 1030 200" opacity="0.5" />
            <path d="M1035 200 Q1055 85 1075 200" opacity="0.5" />
            <path d="M1080 200 Q1100 55 1120 200" opacity="0.5" />
            <path d="M1125 200 Q1145 75 1165 200" opacity="0.5" />
            <path d="M1170 200 Q1190 65 1200 200" opacity="0.5" />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-4 select-none">
            <div className="flex flex-col">
              <span className="font-display text-[1.55rem] font-extrabold leading-none tracking-[-0.08em] text-[#f0ebdc]">
                JA<span className="text-[#E63838]">S</span>HOOTS
              </span>
            </div>
            <span className="px-3 py-1 rounded-full border border-white/10 surface-dark-carbon text-[9px] font-mono-brand uppercase tracking-[0.15em] text-white/50">
              {TAGLINE} ✦
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6 font-ui font-semibold tracking-[0.16em] uppercase text-[10px] text-white/35">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors duration-200 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @{INSTAGRAM_HANDLE.replace("@", "")}
            </a>
            <Link href="/privacy" className="hover:text-white/70 transition-colors duration-200">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors duration-200">Terms</Link>
            <span>© 2026 JASHOOTS</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row gap-2 md:items-center justify-between font-body text-[10px] text-white/20">
          <span>Shot on iPhone + Gimbal · Edited on phone · Delivered in minutes · {CITY}</span>
          <span className="font-ui font-semibold tracking-[0.16em] uppercase">Made with ✦ in HYD</span>
        </div>
      </div>
    </footer>
  );
}
