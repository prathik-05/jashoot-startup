import type { ProofStat, Testimonial } from "@/lib/schema";
import { Section, SectionHead } from "../ui/section";

export function Proof({
  stats,
  testimonials,
  settings,
}: {
  stats: ProofStat[];
  testimonials: Testimonial[];
  settings: { headline?: string; sub?: string };
}) {
  const real = stats.filter((s) => s.value !== null && s.value !== "");
  const quotes = testimonials.filter((t) => t.published);

  if (real.length === 0 && quotes.length === 0) return null;

  return (
    <Section id="proof">
      <SectionHead
        title={settings.headline ?? "Real shoots. Real moments."}
        sub={settings.sub}
      />
      {real.length > 0 ? (
        <dl className="mt-6 grid grid-cols-2 gap-3 sm:gap-3 lg:grid-cols-5">
          {real.map((s, i) => (
            <div
              key={s.label}
              className="card card-glow p-4 text-center animate-fade-up"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <dd className="text-display text-3xl text-red sm:text-4xl">
                {s.value}
                {s.suffix ?? ""}
              </dd>
              <dt className="mt-1.5 text-[0.5rem] uppercase tracking-[0.1em] text-fog">{s.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
      {quotes.length > 0 ? (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {quotes.slice(0, 4).map((t, i) => (
            <figure
              key={t.id}
              className="card card-glow p-4 animate-fade-up"
              style={{ animationDelay: `${(real.length + i) * 75}ms` }}
            >
              <blockquote className="text-xs text-fog leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-3 text-[0.55rem] uppercase tracking-[0.1em] text-fog/50">
                — {t.clientName}
                {t.clientRole ? ` · ${t.clientRole}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
