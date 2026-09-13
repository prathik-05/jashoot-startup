import type { Metadata } from "next";
import { getCachedSiteData, getSeoMeta } from "@/lib/content";
import { SITE_URL } from "@/lib/schema";
import { TrackPageView } from "@/components/track-page-view";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section";
import { PackageCard } from "@/components/packages/package-card";
import { PendingContent } from "@/components/ui/empty-state";
import { FaqAccordion } from "@/components/ui/accordion";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta("/packages");
  return {
    title: seo?.title ?? "Packages & Pricing — JASHOOTS",
    description: seo?.description ?? "Transparent packages with clear coverage, delivery and revisions.",
    alternates: { canonical: seo?.canonical ?? `${SITE_URL}/packages` },
  };
}

export default async function PackagesPage() {
  const data = await getCachedSiteData();
  const serviceById = new Map(data.services.map((s) => [s.id, s]));
  const shown = data.packages.filter((p) => p.published);

  const groups = new Map<string | null, typeof shown>();
  for (const p of shown) {
    const g = p.comparisonGroup ?? null;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(p);
  }

  return (
    <>
      <TrackPageView />
      <Container className="pt-14">
        <p className="eyebrow text-red">Pricing</p>
        <h1 className="text-display mt-2 text-4xl sm:text-6xl text-white">Packages</h1>
        <p className="mt-4 max-w-2xl text-xs text-fog">
          Price, coverage, deliverables, turnaround, format, revisions —
          what&apos;s included and what&apos;s not. Finalized in the Studio; real figures only.
        </p>
      </Container>

      {shown.length === 0 ? (
        <div className="py-10">
          <PendingContent
            title="Packages finalizing"
            sub="Real pricing is being finalized in the Studio. Nothing here is a placeholder — ask on WhatsApp for today's options."
            ctaLabel="ASK ON WHATSAPP"
            content="packages-page-empty"
          />
        </div>
      ) : (
        [...groups.entries()].map(([group, list]) => (
          <Container key={group ?? "all"} className="py-10">
            {group ? (
              <SectionHead title={group} className="mb-6" />
            ) : null}
            <div className="grid gap-4 md:grid-cols-3">
              {list.map((p) => {
                const s = serviceById.get(p.serviceId);
                return (
                  <PackageCard
                    key={p.id}
                    pkg={p}
                    serviceName={s?.name}
                    serviceSlug={s?.slug}
                    content="packages-page"
                  />
                );
              })}
            </div>
          </Container>
        ))
      )}

      {data.faqs.length > 0 ? (
        <Container className="pb-20">
          <SectionHead title="Still deciding?" className="mb-6" />
          <FaqAccordion faqs={data.faqs} />
        </Container>
      ) : null}
    </>
  );
}