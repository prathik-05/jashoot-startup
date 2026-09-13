import Link from "next/link";
import type { ServiceCategory } from "@/lib/schema";
import { Section, SectionHead } from "../ui/section";
import { anythingElseMessage, waMeLink } from "@/lib/whatsapp";

const FAMILY_ORDER = ["events", "weddings", "automotive", "business", "content", "custom"] as const;

export function Moments({
  categories,
  settings,
}: {
  categories: ServiceCategory[];
  settings: { headline?: string; sub?: string };
}) {
  const byGroup = new Map<string, ServiceCategory[]>();
  for (const c of categories.filter((x) => x.published)) {
    const g = c.groupKey ?? "custom";
    if (!byGroup.has(g)) byGroup.set(g, []);
    byGroup.get(g)!.push(c);
  }

  return (
    <Section id="moments">
      <SectionHead
        title={settings.headline ?? "What's your moment?"}
        sub={settings.sub ?? "Pick what matches your plan — or tell us anything else."}
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FAMILY_ORDER.filter((g) => g !== "custom").map((g, i) => {
          const fam = byGroup.get(g);
          if (!fam || fam.length === 0) return null;
          const head = fam.find((c) => c.featured) ?? fam[0];
          return (
            <Link
              key={g}
              href={`/work#${head.slug}`}
              className="group card card-glow card-hover p-4 animate-fade-up"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <p className="eyebrow text-red">{head.name}</p>
              <p className="mt-1.5 text-xs text-fog">
                {fam.map((c) => c.name).join(" · ")}
              </p>
              <p className="mt-3 font-display text-[0.55rem] uppercase tracking-[0.1em] text-white/30 transition group-hover:text-red">
                Explore {head.name} →
              </p>
            </Link>
          );
        })}

        <a
          href={waMeLink(
            anythingElseMessage({ event: "", date: "", location: "", requirements: "" }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-dashed border-border p-4 transition hover:border-red/20 rounded-2xl animate-fade-up"
          style={{ animationDelay: `${FAMILY_ORDER.length * 75}ms` }}
        >
          <p className="eyebrow text-red">Anything else?</p>
          <p className="mt-1.5 font-display text-sm uppercase text-white">
            Don&apos;t see your event?
          </p>
          <p className="mt-1.5 text-xs text-fog">
            Birthday. College. Store opening. Launch. Anything — tell us what&apos;s happening.
          </p>
        </a>
      </div>
    </Section>
  );
}
