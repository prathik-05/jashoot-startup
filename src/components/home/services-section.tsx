"use client";

import Link from "next/link";
import type { Service } from "@/lib/schema";
import { Container } from "@/components/ui/container";

interface ServicesSectionProps {
  services: Service[];
}

const SERVICE_ICONS: Record<string, string> = {
  "instant-reel": "⚡",
  wedding: "💍",
  "hourly-coverage": "⏱️",
  "corporate-event": "🏢",
  "bike shoot": "🏍️",
  "car shoot": "🚗",
  "food reel": "🍔",
  "brand shoot": "📸",
  "store-opening": "🏪",
};

export function ServicesSection({ services }: ServicesSectionProps) {
  const published = services.filter((s) => s.published);

  if (published.length === 0) return null;

  return (
    <section id="services" className="section-gap-lg surface-gradient">
      <Container>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-brand-red grid place-items-center">
            <svg className="w-4 h-4 text-on-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
            </svg>
          </div>
          <h3 className="text-section-title">
            Services — We Shoot Anything That Moves
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xs md:gap-sm">
          {published.slice(0, 8).map((service) => {
            const icon = SERVICE_ICONS[service.slug] ?? "📸";
            return (
              <article
                key={service.id}
                className="card card-hover"
              >
                <div className="w-9 h-9 rounded-full bg-brand-red/10 border border-brand-red/20 grid place-items-center text-[16px]">
                  {icon}
                </div>
                <div className="mt-3.5 text-feature-title text-on-dark">
                  {service.name}
                </div>
                {service.blurb && (
                  <div className="mt-2 text-body text-on-dark-muted">
                    {service.blurb}
                  </div>
                )}
                <Link
                  href={`/enquire?service=${encodeURIComponent(service.slug)}`}
                  className="mt-3.5 inline-flex items-center gap-1 text-caption font-medium uppercase text-on-dark/40 hover:text-[#E63838] transition-colors duration-200"
                >
                  <span>BOOK THIS</span>
                  <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}