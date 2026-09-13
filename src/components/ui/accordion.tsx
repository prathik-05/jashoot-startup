"use client";

import { useState } from "react";
import type { Faq } from "@/lib/schema";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col divide-y divide-border border-y border-border">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.id} className="py-0.5">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
            >
              <span className="font-display text-xs sm:text-sm uppercase tracking-wide text-white">
                {f.question}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border transition-all duration-200 ${
                  isOpen ? "border-red/30 bg-red/10 text-red" : "border-border text-fog"
                }`}
              >
                <span className="text-sm leading-none">{isOpen ? "–" : "+"}</span>
              </span>
            </button>
            {isOpen ? (
              <p className="max-w-3xl pb-4 text-xs text-fog leading-relaxed">{f.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
