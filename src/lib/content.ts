// Content provider: reads the public CMS surface from Supabase when
// configured, otherwise returns the offline brand snapshot.
// REAL-DATA-ONLY is enforced by the DB itself (RLS + published flags) and by
// this layer never synthesizing content that is not stored.
import { brandSeed } from "./brand-seed";
import type { SiteData } from "./schema";
import { getServerClient, hasSupabaseEnv } from "./supabase";

type Row = Record<string, unknown>;

function col<T>(row: Row, name: string): T | null {
  const v = row[name as string];
  return v === undefined || v === null ? null : (v as T);
}

function arr(row: Row, name: string): string[] {
  const v = row[name as string];
  if (!Array.isArray(v)) return [];
  return v.map((x) => (typeof x === "string" ? x : JSON.stringify(x)));
}

function mapJsonStringArray(v: unknown): Array<{ label: string; value: string }> {
  if (!Array.isArray(v)) return [];
  return v.map((x) => {
    if (typeof x === "string") {
      try {
        const o = JSON.parse(x) as { label?: unknown; value?: unknown };
        return { label: String(o.label ?? ""), value: String(o.value ?? "") };
      } catch {
        return { label: x, value: "" };
      }
    }
    const o = (x ?? {}) as { label?: unknown; value?: unknown };
    return { label: String(o.label ?? ""), value: String(o.value ?? "") };
  });
}

interface DbClients {
  select: (table: string, opts?: { onlyPublished?: boolean }) => Promise<Row[]>;
}

function db() {
  const supabase = getServerClient();
  return {
    select: async (table: string, opts = {}) => {
      if (!supabase) return [];
      try {
        let q = supabase.from(table).select("*");
        if (opts.onlyPublished !== false) {
          // public CMS surface: published & enabled only (mirrors anon RLS)
          if (table === "promo_block" || table === "home_sections") {
            q = q.eq("published", true).eq("enabled", true);
          } else {
            q = q.eq("published", true);
          }
        }
        const tablesWithOrdering = new Set([
          "home_sections",
          "service_categories",
          "services",
          "packages",
          "faqs",
          "why_shoot_different",
        ]);
        if (tablesWithOrdering.has(table)) {
          q = q.order("ordering");
        } else if (table === "portfolio_projects") {
          q = q.order("created_at", { ascending: false });
        }
        const { data, error } = await q;
        if (error) throw error;
        return (data as Row[]) ?? [];
      } catch (err) {
        console.error(`[content] failed to read ${table}:`, err);
        return [];
      }
    },
  } satisfies DbClients;
}

let hasWarnedMissingEnv = false;

export async function getSiteData(): Promise<SiteData> {
  // No DB configured (local/dev): serve the offline brand snapshot —
  // exactly the anon-visible seed. Never invent anything live doesn't have.
  if (!hasSupabaseEnv()) {
    if (!hasWarnedMissingEnv) {
      hasWarnedMissingEnv = true;
      console.warn(
        "[content] WARNING: Supabase env vars not configured. " +
        "Serving offline brand seed data. " +
        "This is NOT suitable for production — visitors will see seed content, " +
        "not real CMS data. Set NEXT_PUBLIC_SUPABASE_URL, " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY."
      );
    }
    return brandSeed;
  }
  const c = db();

  const sections = (await c.select("home_sections")).map((r) => ({
    sectionKey: col<string>(r, "section_key") ?? "",
    name: col<string>(r, "name") ?? "",
    enabled: Boolean(col<boolean>(r, "enabled") ?? false),
    published: Boolean(col<boolean>(r, "published") ?? false),
    ordering: col<number>(r, "ordering") ?? 0,
    settings: (col<Record<string, unknown>>(r, "settings") ?? {}) as Record<string, unknown>,
  }));

  const categories = (await c.select("service_categories")).map((r) => ({
    id: col<string>(r, "id") ?? "",
    name: col<string>(r, "name") ?? "",
    groupKey: col<string>(r, "group_key") as never,
    slug: col<string>(r, "slug") ?? "",
    tagline: col<string>(r, "tagline"),
    ordering: col<number>(r, "ordering") ?? 0,
    published: Boolean(col<boolean>(r, "published") ?? false),
    featured: Boolean(col<boolean>(r, "featured") ?? false),
  }));

  const services = (await c.select("services")).map((r) => ({
    id: col<string>(r, "id") ?? "",
    categoryId: col<string>(r, "category_id"),
    slug: col<string>(r, "slug") ?? "",
    name: col<string>(r, "name") ?? "",
    blurb: col<string>(r, "blurb"),
    ordering: col<number>(r, "ordering") ?? 0,
    published: true,
    featured: Boolean(col<boolean>(r, "featured") ?? false),
  }));

  const packages = (await c.select("packages")).map((r) => {
    const price = col<number>(r, "price");
    const num = (n: unknown) => (n === null || n === undefined || n === "") ? null : Number(n);
    return {
      id: col<string>(r, "id") ?? "",
      serviceId: col<string>(r, "service_id") ?? "",
      slug: col<string>(r, "slug") ?? "",
      name: col<string>(r, "name") ?? "",
      tagline: col<string>(r, "tagline"),
      price: price === null ? null : Number(price),
      startingPrice: Boolean(col<boolean>(r, "starting_price") ?? false),
      coverageDurationValue: num(col<number>(r, "coverage_duration_value")),
      coverageDurationUnit: col<string>(r, "coverage_duration_unit"),
      numReels: num(col<number>(r, "num_reels")),
      photos: num(col<number>(r, "photos")),
      format: col<string>(r, "format"),
      deliveryTimeValue: num(col<number>(r, "delivery_time_value")),
      deliveryTimeUnit: col<string>(r, "delivery_time_unit"),
      deliveryTimeLabel: col<string>(r, "delivery_time_label"),
      revisionsAllowed: num(col<number>(r, "revisions_allowed")),
      features: arr(r, "features"),
      whatsIncluded: arr(r, "whats_included"),
      whatsNotIncluded: arr(r, "whats_not_included"),
      availabilityType: (col<string>(r, "availability_type") ?? "contact_only") as never,
      availabilityNote: col<string>(r, "availability_note"),
      ctaLabel: col<string>(r, "cta_label") ?? "BOOK ON WHATSAPP",
      ctaAction: (col<string>(r, "cta_action") ?? "book_on_whatsapp") as never,
      comparisonGroup: col<string>(r, "comparison_group"),
      published: true,
      featured: Boolean(col<boolean>(r, "featured") ?? false),
      ordering: col<number>(r, "ordering") ?? 0,
    };
  });

  const projects = (await c.select("portfolio_projects")).map((r) => ({
    id: col<string>(r, "id") ?? "",
    title: col<string>(r, "title") ?? "",
    slug: col<string>(r, "slug") ?? "",
    categoryId: col<string>(r, "category_id"),
    coverMedia: col<string>(r, "cover_media"),
    previewReel: col<string>(r, "preview_reel"),
    fullReel: col<string>(r, "full_reel"),
    location: col<string>(r, "location"),
    projectYear: col<number>(r, "project_year"),
    story: col<string>(r, "story"),
    whatWeDid: arr(r, "what_we_did"),
    results: mapJsonStringArray(col<unknown>(r, "results")),
    engagementStats: mapJsonStringArray(col<unknown>(r, "engagement_stats")),
    deliveryTimeLabel: col<string>(r, "delivery_time_label"),
    relatedServiceId: col<string>(r, "related_service_id"),
    relatedPackageId: col<string>(r, "related_package_id"),
    featured: Boolean(col<boolean>(r, "featured") ?? false),
    published: true,
    publishedAt: col<string>(r, "published_at"),
  }));

  const testimonials = (await c.select("testimonials")).map((r) => ({
    id: col<string>(r, "id") ?? "",
    clientName: col<string>(r, "client_name") ?? "",
    clientRole: col<string>(r, "client_role"),
    quote: col<string>(r, "quote") ?? "",
    rating: col<number>(r, "rating"),
    mediaUrl: col<string>(r, "media_url"),
    projectId: col<string>(r, "project_id"),
    featured: false,
    published: true,
  }));

  const faqs = (await c.select("faqs")).map((r) => ({
    id: col<string>(r, "id") ?? "",
    question: col<string>(r, "question") ?? "",
    answer: col<string>(r, "answer") ?? "",
  }));

  const promos = await c.select("promo_block");
  const promo =
    promos.length > 0
      ? {
          badge: col<string>(promos[0], "badge"),
          headline: col<string>(promos[0], "headline"),
          subtext: col<string>(promos[0], "subtext"),
          imageUrl: col<string>(promos[0], "image_url"),
          enabled: true,
          published: true,
        }
      : null;

  const proofStats = (await c.select("proof_stats")).map((r) => ({
    label: col<string>(r, "label") ?? "",
    value: col<string>(r, "value"),
    suffix: col<string>(r, "suffix"),
  }));

  const cities = (await c.select("coverage_cities")).map((r) => ({
    name: col<string>(r, "name") ?? "",
    slug: col<string>(r, "slug") ?? "",
  }));

  const method = (await c.select("method_steps"))
    .sort((a, b) => (col<number>(a, "step_no") ?? 99) - (col<number>(b, "step_no") ?? 99))
    .map((r) => ({
      stepNo: col<number>(r, "step_no") ?? 0,
      title: col<string>(r, "title") ?? "",
      description: col<string>(r, "description"),
      icon: col<string>(r, "icon"),
    }));

  const whyFeatures = (await c.select("why_features")).map((r) => ({
    iconKey: col<string>(r, "icon_key"),
    title: col<string>(r, "title") ?? "",
    description: col<string>(r, "description"),
  }));

  const whyDifferent = (await c.select("why_shoot_different")).map((r) => ({
    trait: col<string>(r, "trait") ?? "",
    traditionalValue: col<string>(r, "traditional_value") ?? "",
    jashootsValue: col<string>(r, "jashoots_value") ?? "",
  }));

  const about = (await c.select("about_content")).map((r) => ({
    contentKey: col<string>(r, "content_key") ?? "",
    title: col<string>(r, "title"),
    body: (col<Record<string, unknown>>(r, "body") ?? {}) as Record<string, unknown>,
  }));

  return {
    sections,
    categories,
    services,
    packages,
    projects,
    testimonials,
    faqs,
    promo,
    proofStats,
    cities,
    method,
    whyFeatures,
    whyDifferent,
    about,
  };
}

let cache: SiteData | null = null;
let cacheAt = 0;
const TTL_MS = 60_000;

/** Aggressive, short TTL SSR cache so the homepage isn't DB-bashing. */
export async function getCachedSiteData(): Promise<SiteData> {
  if (cache && Date.now() - cacheAt < TTL_MS) return cache;
  const data = await getSiteData();
  cache = data;
  cacheAt = Date.now();
  return data;
}

export interface SeoRow {
  pagePath: string;
  title: string | null;
  description: string | null;
  ogImage: string | null;
  canonical: string | null;
  robots: string;
  structuredData: Record<string, unknown>;
}

/** SEO lookup for a public path (falls back to the seed/homepage meta). */
export async function getSeoMeta(pagePath: string): Promise<SeoRow | null> {
  const c = db();
  const rows = await c.select("seo_meta");
  const found = rows.find((r) => col<string>(r, "page_path") === pagePath);
  if (!found) {
    if (pagePath === "/") {
      return {
        pagePath: "/",
        title: "JASHOOTS — Shoot. Edit. Deliver.",
        description:
          "Reels-first photo & video production in Hyderabad. Transparent packages, fast turnaround, one-tap WhatsApp enquiry.",
        ogImage: null,
        canonical: null,
        robots: "index,follow",
        structuredData: {},
      };
    }
    return null;
  }
  return {
    pagePath,
    title: col<string>(found, "title"),
    description: col<string>(found, "description"),
    ogImage: col<string>(found, "og_image"),
    canonical: col<string>(found, "canonical"),
    robots: col<string>(found, "robots") ?? "index,follow",
    structuredData: (col<Record<string, unknown>>(found, "structured_data") ?? {}) as Record<string, unknown>,
  };
}

export function sectionsOrdered(s: SiteData) {
  return [...s.sections]
    .filter((x) => x.enabled && x.published)
    .sort((a, b) => a.ordering - b.ordering);
}

export function isSectionVisible(s: SiteData, key: string) {
  const sec = s.sections.find((x) => x.sectionKey === key);
  return Boolean(sec && sec.enabled && sec.published);
}

export { mapJsonStringArray };