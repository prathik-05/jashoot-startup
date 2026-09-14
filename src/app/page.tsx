import type { Metadata } from "next";
import { getCachedSiteData, getSeoMeta } from "@/lib/content";
import { SITE_URL } from "@/lib/schema";
import { TrackPageView } from "@/components/track-page-view";
import { Hero } from "@/components/home/hero";
import { LiveTicker } from "@/components/ui/live-ticker";
import { WorkWall } from "@/components/home/work-wall";
import { StatsStrip } from "@/components/home/stats-strip";
import { Why } from "@/components/home/why";
import { FounderSection } from "@/components/home/founder-section";
import { ContactSection } from "@/components/home/contact-section";
import { FaqSection } from "@/components/home/faq";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta("/");
  if (!seo) return {};
  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    robots: seo.robots,
    alternates: { canonical: seo.canonical ?? SITE_URL },
    openGraph: seo.ogImage
      ? { images: [{ url: seo.ogImage }], title: seo.title ?? undefined, description: seo.description ?? undefined }
      : undefined,
  };
}

/**
 * Homepage — reference-aligned section order:
 * Hero → Available Shoots & Services → Stats Strip → Why → Founder → Contact → FAQ → Footer
 */
export default async function Home() {
  const data = await getCachedSiteData();

  return (
    <>
      <TrackPageView />
      <Hero settings={{}} />
      <LiveTicker />
      <WorkWall
        projects={data.projects}
        categories={data.categories}
        services={data.services}
        settings={{}}
        preview
      />
      <StatsStrip />
      <Why
        features={data.whyFeatures}
        different={data.whyDifferent}
        settings={{}}
      />
      <FounderSection />
      <ContactSection />
      <FaqSection faqs={data.faqs} settings={{}} />
    </>
  );
}
