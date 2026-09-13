import type { Metadata } from "next";
import { getCachedSiteData, getSeoMeta, isSectionVisible } from "@/lib/content";
import { SITE_URL } from "@/lib/schema";
import { TrackPageView } from "@/components/track-page-view";
import { WorkWall } from "@/components/home/work-wall";
import { Container } from "@/components/ui/container";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta("/work");
  return {
    title: seo?.title ?? "Our Work — JASHOOTS",
    description: seo?.description ?? "Real moments, real JASHOOTS. Events, weddings, bikes, cars, brands and more.",
    alternates: { canonical: seo?.canonical ?? `${SITE_URL}/work` },
  };
}

export default async function WorkPage() {
  const data = await getCachedSiteData();
  const work = data.sections.find((s) => s.sectionKey === "work");
  const visible = isSectionVisible(data, "work");

  return (
    <>
      <TrackPageView />
      <Container className="pt-14">
        <p className="eyebrow text-red">Showcase</p>
        <h1 className="text-display mt-2 text-4xl sm:text-6xl text-white">Our Work</h1>
        <p className="mt-4 max-w-2xl text-xs text-fog">
          Real moments, real JASHOOTS. Every project sells the result — the reel,
          the story, the delivery.
        </p>
      </Container>
      {visible && work ? (
        <WorkWall
          projects={data.projects}
          categories={data.categories}
          settings={(work.settings ?? {}) as never}
        />
      ) : (
        <Container className="py-16">
          <p className="text-fog">Work showcase is being published from the Studio.</p>
        </Container>
      )}
    </>
  );
}