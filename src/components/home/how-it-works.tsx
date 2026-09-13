import type { MethodStep } from "@/lib/schema";
import { Section, SectionHead } from "../ui/section";

export function HowItWorks({
  method,
  settings,
}: {
  method: MethodStep[];
  settings: { headline?: string; sub?: string };
}) {
  const steps = [...method].sort((a, b) => a.stepNo - b.stepNo);
  if (steps.length === 0) return null;

  return (
    <Section id="how-it-works" tone="surface">
      <SectionHead
        title={settings.headline ?? "How it works"}
        sub={settings.sub ?? "ENQUIRE → WHATSAPP → CONFIRM → SHOOT → EDIT → DELIVER"}
      />
      {steps.length > 0 ? (
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.stepNo}
              className="card card-glow card-hover p-4 animate-fade-up"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <p className="text-display text-3xl text-red/40">
                {String(s.stepNo).padStart(2, "0")}
              </p>
              <p className="text-ui mt-1.5 text-xs font-bold uppercase text-white">{s.title}</p>
              {s.description ? (
                <p className="mt-1.5 text-xs text-fog leading-relaxed">{s.description}</p>
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}
      <p className="mt-6 text-xs text-fog/50">
        An enquiry is <strong className="text-fog">not</strong> a booking — a booking is confirmed only after
        the JASHOOTS team confirms availability on WhatsApp.
      </p>
    </Section>
  );
}
