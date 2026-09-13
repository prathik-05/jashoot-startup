// Types mirroring the Supabase schema (migrations 20260912000000–06).
// Enums match Postgres enum definitions 1:1.

export type UserRole = "owner" | "studio" | "editor";
export type PublicationStatus = "draft" | "published" | "archived";

export type AvailabilityType = "always" | "date_range" | "weekdays" | "custom" | "contact_only";
export type CtaAction = "book_on_whatsapp" | "discuss_on_whatsapp" | "enquire";

export type LeadStage =
  | "enquiry" | "contacted" | "quoted" | "awaiting_advance"
  | "confirmed" | "abandoned" | "cancelled";

export type BookingState =
  | "enquiry" | "contacted" | "quoted" | "awaiting_advance" | "confirmed"
  | "in_progress" | "editing" | "review" | "approved" | "delivered"
  | "completed" | "cancelled";

export type QuoteStatus = "draft" | "sent" | "accepted" | "declined" | "expired";
export type DeliverableType = "photo" | "video" | "reel" | "raw_footage";
export type DeliverableStatus = "draft" | "pending" | "review" | "approved" | "replaced";
export type ApprovalStatus = "pending" | "approved" | "rejected";
export type DeliveryProvider = "google_drive" | "wetransfer" | "other";
export type DeliveryStatus = "pending" | "ready" | "published" | "expired" | "revoked";
export type PaymentMethod = "upi" | "card" | "netbanking" | "cash" | "other";
export type PaymentStatus = "pending" | "partial" | "paid" | "refunded" | "failed";
export type NotificationChannel = "whatsapp" | "email" | "push";

export type ConversionEventName =
  | "page_view" | "work_opened" | "reel_played" | "package_viewed"
  | "package_cta_clicked" | "enquiry_started" | "enquiry_submitted"
  | "whatsapp_clicked" | "whatsapp_opened" | "quote_sent"
  | "booking_confirmed" | "payment_completed";

export interface ServiceCategory {
  id: string;
  name: string;
  groupKey: "events" | "weddings" | "automotive" | "business" | "content" | "custom" | null;
  slug: string;
  tagline: string | null;
  ordering: number;
  published: boolean;
  featured: boolean;
}

export interface Service {
  id: string;
  categoryId: string | null;
  slug: string;
  name: string;
  blurb: string | null;
  ordering: number;
  published: boolean;
  featured: boolean;
}

export interface Package {
  id: string;
  serviceId: string;
  slug: string;
  name: string;
  tagline: string | null;
  price: number | null;
  startingPrice: boolean;
  coverageDurationValue: number | null;
  coverageDurationUnit: string | null;
  numReels: number | null;
  photos: number | null;
  format: string | null;
  deliveryTimeValue: number | null;
  deliveryTimeUnit: string | null;
  deliveryTimeLabel: string | null;
  revisionsAllowed: number | null;
  features: string[];
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  availabilityType: AvailabilityType;
  availabilityNote: string | null;
  ctaLabel: string;
  ctaAction: CtaAction;
  comparisonGroup: string | null;
  published: boolean;
  featured: boolean;
  ordering: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  categoryId: string | null;
  coverMedia: string | null;
  previewReel: string | null;
  fullReel: string | null;
  location: string | null;
  projectYear: number | null;
  story: string | null;
  whatWeDid: string[];
  results: { label: string; value: string }[];
  engagementStats: { label: string; value: string }[];
  deliveryTimeLabel: string | null;
  relatedServiceId: string | null;
  relatedPackageId: string | null;
  featured: boolean;
  published: boolean;
  publishedAt: string | null;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string | null;
  quote: string;
  rating: number | null;
  mediaUrl: string | null;
  projectId: string | null;
  featured: boolean;
  published: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface HomeSection {
  sectionKey: string;
  name: string;
  enabled: boolean;
  published: boolean;
  ordering: number;
  settings: Record<string, unknown>;
}

export interface PromoBlock {
  badge: string | null;
  headline: string | null;
  subtext: string | null;
  imageUrl: string | null;
  enabled: boolean;
  published: boolean;
}

export interface ProofStat {
  label: string;
  value: string | null;
  suffix: string | null;
}

export interface CoverageCity {
  name: string;
  slug: string;
}

export interface MethodStep {
  stepNo: number;
  title: string;
  description: string | null;
  icon: string | null;
}

export interface WhyFeature {
  iconKey: string | null;
  title: string;
  description: string | null;
}

export interface WhyShootDifferent {
  trait: string;
  traditionalValue: string;
  jashootsValue: string;
}

export interface AboutContent {
  contentKey: string;
  title: string | null;
  body: Record<string, unknown>;
}

export interface SeoMeta {
  pagePath: string;
  title: string | null;
  description: string | null;
  ogImage: string | null;
  canonical: string | null;
  robots: string;
  structuredData: Record<string, unknown>;
}

export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  serviceSlug?: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  preferredTime: string;
  requirements: string;
  budgetInterest: string;
  extraDetails: string;
  sourcePage: string;
  sourceContent: string;
}

export interface Lead extends EnquiryInput {
  id: string;
  ref: string;
  stage: LeadStage;
  whatsappOpenedAt: string | null;
  abandonedAt: string | null;
}

export interface SiteData {
  sections: HomeSection[];
  categories: ServiceCategory[];
  services: Service[];
  packages: Package[];
  projects: PortfolioProject[];
  testimonials: Testimonial[];
  faqs: Faq[];
  promo: PromoBlock | null;
  proofStats: ProofStat[];
  cities: CoverageCity[];
  method: MethodStep[];
  whyFeatures: WhyFeature[];
  whyDifferent: WhyShootDifferent[];
  about: AboutContent[];
}

function requireEnv(name: string, fallback: string): string {
  const val = process.env[name];
  if (val) return val;
  if (process.env.NODE_ENV === "production") {
    console.error(`[JASHOOTS] CRITICAL: Missing env var ${name}. Using fallback "${fallback}". Set this in your hosting provider before going live.`);
  }
  return fallback;
}

const rawWhatsApp = requireEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "919398794825");
export const WHATSAPP_NUMBER =
  rawWhatsApp.replace(/\D/g, "").length === 10
    ? `91${rawWhatsApp.replace(/\D/g, "")}`
    : rawWhatsApp.replace(/\D/g, "");
export const WHATSAPP_DISPLAY =
  requireEnv("NEXT_PUBLIC_WHATSAPP_DISPLAY", "JASHOOTS");
function resolveSiteUrl(): string {
  let custom = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (custom) {
    custom = custom.replace(/\/+$/, "");
    if (!custom.includes("localhost") && !custom.includes("127.0.0.1")) {
      if (custom.startsWith("http://")) {
        custom = "https://" + custom.slice(7);
      } else if (!custom.startsWith("https://")) {
        custom = "https://" + custom;
      }
      return custom;
    }
    return custom;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim().replace(/\/+$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.trim().replace(/\/+$/, "")}`;
  }
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[JASHOOTS] WARNING: NEXT_PUBLIC_SITE_URL is not set in production. " +
      "Canonical URLs and metadata will default to localhost:3000 until configured in hosting provider."
    );
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

// Brand social identity (owner-provided; editable via about_content.social in CMS)
export const INSTAGRAM_URL =
  requireEnv("NEXT_PUBLIC_INSTAGRAM_URL", "https://instagram.com/clipsbyjashoots");
export const INSTAGRAM_HANDLE = "@clipsbyjashoots";
export const FOUNDER_HANDLE = "@mr.jashwanth06";
export const CITY = "Hyderabad";
export const TAGLINE = "YOU BRING THE MOMENT. WE MAKE THE REEL.";
export const PROMISE = "SHOOT. EDIT. DELIVER.";

// ── Zod Validation Schemas ──────────────────────────────────────────────
// Reusable runtime validation — used by API routes and form components.

import { z } from "zod";

export const enquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name (minimum 2 characters)")
      .max(120, "Name cannot exceed 120 characters"),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid WhatsApp number (minimum 7 digits)")
      .max(20, "Phone number cannot exceed 20 characters"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(160)
      .or(z.literal("")),
    serviceSlug: z.string().max(128).default(""),
    eventType: z
      .string()
      .trim()
      .min(2, "Please select or specify your shoot / event type")
      .max(160),
    eventDate: z.string().trim().max(32).default(""),
    eventLocation: z
      .string()
      .trim()
      .min(2, "Please specify the shoot location in Hyderabad")
      .max(240),
    preferredTime: z.string().trim().max(64).default(""),
    requirements: z.string().trim().max(2000).default(""),
    budgetInterest: z.string().trim().max(240).default(""),
    extraDetails: z.string().trim().max(2000).default(""),
    sourcePage: z.string().max(256).default("enquire"),
    sourceContent: z.string().max(256).default("enquiry-form"),
  })
  .strict();

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const conversionEventSchema = z
  .object({
    session: z.string().max(128).default("none"),
    event: z.enum([
      "page_view", "work_opened", "reel_played", "package_viewed",
      "package_cta_clicked", "enquiry_started", "enquiry_submitted",
      "whatsapp_clicked", "whatsapp_opened", "quote_sent",
      "booking_confirmed", "payment_completed",
    ]),
    page: z.string().max(512).default("unknown"),
    content: z.string().max(256).nullish(),
    leadRef: z.string().max(32).nullish(),
    meta: z.record(
      z.string().max(64),
      z.union([z.string().max(256), z.number(), z.boolean()]),
    ).default({}),
  })
  .strict();

export type ConversionEventData = z.infer<typeof conversionEventSchema>;