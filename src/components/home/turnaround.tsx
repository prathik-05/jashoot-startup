import type { Package } from "@/lib/schema";
import { Section } from "../ui/section";

export function Turnaround({
  packages,
  settings,
}: {
  packages: Package[];
  settings: { headline?: string };
}) {
  const sla = packages
    .filter((p) => p.published && (p.deliveryTimeLabel || (p.deliveryTimeValue && p.deliveryTimeUnit)))
    .slice(0, 6);

  return (
    <Section id="turnaround" tone="surface">
      <p className="font-mono-brand text-[10px] uppercase tracking-[0.18em] text-[#E63838]">PROMISE</p>
      <h2 className="font-display font-extrabold mt-2 max-w-3xl text-3xl sm:text-5xl text-[#F0EBDC] tracking-tight">
        {settings.headline ?? "Fast doesn't mean rushed."}
      </h2>
      <div className="mt-4 flex items-center gap-3 font-mono-brand text-[9px] uppercase tracking-[0.15em] text-[#9E9AA0] sm:text-[10px]">
        <span>Shoot</span>
        <span aria-hidden="true" className="text-[#E63838]">→</span>
        <span>Edit</span>
        <span aria-hidden="true" className="text-[#E63838]">→</span>
        <span>Deliver</span>
      </div>
      {sla.length > 0 ? (
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sla.map((p, i) => (
            <div
              key={p.id}
              className="card card-glow card-hover p-4 animate-fade-up"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <dt className="font-mono-brand text-[9px] uppercase tracking-[0.15em] text-[#9E9AA0]">{p.name}</dt>
              <dd className="font-display font-bold mt-1 text-2xl text-[#E63838]">
                {p.deliveryTimeLabel ??
                  `${p.deliveryTimeValue} ${p.deliveryTimeUnit}`}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 max-w-xl text-xs text-fog">
          Turnarounds are promised per package — never a single invented number.
          They appear here once the Studio publishes them.
        </p>
      )}
    </Section>
  );
}
