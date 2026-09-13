"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Founder", href: "/#founder" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 surface-carbon/80 backdrop-blur-md border-b border-white/8">
      <div className="container h-[60px] md:h-[68px] flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex flex-col justify-center select-none" aria-label="JASHOOTS home">
            <span className="font-display text-[1.55rem] font-extrabold leading-none tracking-[-0.08em] text-[#f0ebdc] transition-transform duration-200 group-hover:scale-[1.02]">
              JA<span className="text-[#E63838]">S</span>HOOTS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 nav-pill" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.href + n.label}
                href={n.href}
                className="nav-link"
              >
                {n.label}
              </Link>
            ))}
            <span className="w-px h-3.5 bg-white/10" aria-hidden="true" />
            <span className="text-on-dark-muted">HYD</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/enquire"
            className="hidden md:inline-flex btn-primary px-6"
          >
            BOOK NOW
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/20 transition-colors focus-ring"
          >
            <div className="space-y-[3px]">
              <div className={`w-3.5 h-[1.5px] bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[4.5px]" : ""}`} />
              <div className={`w-3.5 h-[1.5px] bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <div className={`w-3.5 h-[1.5px] bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/8 surface-carbon/80 backdrop-blur-md px-4 py-5 flex flex-col gap-3 animate-fade-up">
          {NAV.map((n) => (
            <Link key={n.href + n.label} href={n.href} onClick={() => setOpen(false)} className="nav-link text-body-medium uppercase tracking-[0.16em] text-on-dark/60 hover:text-on-dark transition-colors py-2">
              {n.label}
            </Link>
          ))}
          <Link href="/portal" onClick={() => setOpen(false)} className="nav-link text-body-medium uppercase tracking-[0.16em] text-on-dark/30 hover:text-on-dark/60 transition-colors py-2">
            Client Login
          </Link>
          <Link
            href="/enquire"
            onClick={() => setOpen(false)}
            className="btn-primary w-full justify-center py-3"
          >
            BOOK NOW
          </Link>
        </div>
      )}
    </header>
  );
}