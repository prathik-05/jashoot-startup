-- ============================================================================
-- JASHOOTS — 0002: Content / CMS layer
-- Everything the Studio controls without touching code (frozen spec v6).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- service_categories — "WHAT'S YOUR MOMENT" families + THE WORK filter tags
-- group_key maps to homepage moment families:
--   events / weddings / automotive / business / content / custom
-- ---------------------------------------------------------------------------
create table if not exists public.service_categories (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  group_key     text,
  slug          text not null unique,
  tagline       text,
  ordering      integer not null default 0,
  published     boolean not null default false,
  featured      boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_service_categories_ordering
  on public.service_categories (ordering);
create index if not exists idx_service_categories_group
  on public.service_categories (group_key, published);

-- ---------------------------------------------------------------------------
-- services — concrete offers (Instant Reel, Event Coverage, ...)
-- ---------------------------------------------------------------------------
create table if not exists public.services (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid references public.service_categories (id) on delete set null,
  slug          text not null unique,
  name          text not null,
  blurb         text,
  ordering      integer not null default 0,
  published     boolean not null default false,
  featured      boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_services_category on public.services (category_id);
create index if not exists idx_services_published on public.services (published, ordering);

-- ---------------------------------------------------------------------------
-- packages — products (A3 availability rules, A4 CTA config)
-- ---------------------------------------------------------------------------
create table if not exists public.packages (
  id                     uuid primary key default gen_random_uuid(),
  service_id             uuid not null references public.services (id) on delete cascade,
  slug                   text not null unique,
  name                   text not null,
  tagline                text,

  -- pricing (real-data-only: NULL / draft until published with real figures)
  price                  numeric(12, 2),
  price_currency         text not null default 'INR',
  starting_price         boolean not null default false,

  -- coverage
  coverage_duration_value integer,
  coverage_duration_unit   text,
  num_reels              integer,
  photos                 integer,
  format                 text,

  -- delivery SLA (per-package, never hardcoded globally)
  delivery_time_value    integer,
  delivery_time_unit     text,
  delivery_time_label    text,

  revisions_allowed      integer default 0,

  features               jsonb not null default '[]'::jsonb,
  whats_included         jsonb not null default '[]'::jsonb,
  whats_not_included     jsonb not null default '[]'::jsonb,

  -- availability rules (A3)
  availability_type      public.availability_type not null default 'contact_only',
  availability_start     date,
  availability_end       date,
  weekdays               integer[] not null default '{}',
  availability_note      text,

  -- CTA config (A4)
  cta_label              text not null default 'BOOK ON WHATSAPP',
  cta_action             public.cta_action not null default 'book_on_whatsapp',

  comparison_group       text,
  published              boolean not null default false,
  featured               boolean not null default false,
  ordering               integer not null default 0,

  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists idx_packages_service  on public.packages (service_id, published, ordering);
create index if not exists idx_packages_avail    on public.packages (availability_type);
create index if not exists idx_packages_compare  on public.packages (comparison_group);

-- ---------------------------------------------------------------------------
-- portfolio_projects — THE WORK showcase (A5 / real-data-only)
-- what_we_did, results, engagement_stats are JSON arrays of {label, value}
-- ---------------------------------------------------------------------------
create table if not exists public.portfolio_projects (
  id                   uuid primary key default gen_random_uuid(),
  title                text not null,
  slug                 text not null unique,
  category_id          uuid references public.service_categories (id) on delete set null,
  cover_media          text,
  preview_reel         text,
  full_reel            text,
  location             text,
  project_year         integer,
  story                text,
  what_we_did          jsonb not null default '[]'::jsonb,
  results              jsonb not null default '[]'::jsonb,
  engagement_stats     jsonb not null default '[]'::jsonb,
  delivery_time_label  text,
  -- "BOOK A SIMILAR SHOOT" auto-resolution (A5)
  related_service_id   uuid references public.services (id) on delete set null,
  related_package_id   uuid references public.packages (id) on delete set null,
  featured             boolean not null default false,
  published            boolean not null default false,
  published_at         timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists idx_projects_category   on public.portfolio_projects (category_id);
create index if not exists idx_projects_featured   on public.portfolio_projects (featured, published);
create index if not exists idx_projects_published  on public.portfolio_projects (published_at desc)
  where published;
create index if not exists idx_projects_slug       on public.portfolio_projects (slug);

-- ---------------------------------------------------------------------------
-- testimonials — REAL SHOOTS. REAL MOMENTS.
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id            uuid primary key default gen_random_uuid(),
  client_name   text not null,
  client_role   text,
  quote         text not null,
  rating        integer check (rating between 1 and 5),
  media_url     text,
  project_id    uuid references public.portfolio_projects (id) on delete set null,
  featured      boolean not null default false,
  published     boolean not null default false,
  ordering      integer not null default 0,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_testimonials_published on public.testimonials (published, ordering);

-- ---------------------------------------------------------------------------
-- faqs — conversion tool (CMS-managed)
-- ---------------------------------------------------------------------------
create table if not exists public.faqs (
  id            uuid primary key default gen_random_uuid(),
  question      text not null,
  answer        text not null,
  ordering      integer not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_faqs_published on public.faqs (published, ordering);

-- ---------------------------------------------------------------------------
-- about_content — keyed content blocks (hero, founder, studio, ...)
-- ---------------------------------------------------------------------------
create table if not exists public.about_content (
  id            uuid primary key default gen_random_uuid(),
  content_key   text not null unique,
  title         text,
  body          jsonb not null default '{}'::jsonb,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- home_sections — 16 homepage sections independently manageable (A7)
--   section_key            -> hero, promise, work, moments, featured_project,
--                             packages, why, how_it_works, raw_final, proof,
--                             turnaround, client_experience, app, faq,
--                             final_cta, footer
--   enabled / published / ordering / settings(jsonb) are Studio controls
-- ---------------------------------------------------------------------------
create table if not exists public.home_sections (
  id            uuid primary key default gen_random_uuid(),
  section_key   text not null unique,
  name          text not null,
  enabled       boolean not null default true,
  published     boolean not null default true,
  ordering      integer not null default 0,
  settings      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_home_sections_order on public.home_sections (ordering);

-- ---------------------------------------------------------------------------
-- promo_block — CMS-controlled promo strip (not hard-coded device claims)
-- ---------------------------------------------------------------------------
create table if not exists public.promo_block (
  id            uuid primary key default gen_random_uuid(),
  badge         text,
  headline      text,
  subtext       text,
  image_url     text,
  enabled       boolean not null default false,
  ordering      integer not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- proof_stats — proof wall. Real-data-only: rows with NULL value are never
-- rendered; absent stats simply hide the component.
-- ---------------------------------------------------------------------------
create table if not exists public.proof_stats (
  id            uuid primary key default gen_random_uuid(),
  label         text not null,
  value         text,
  suffix        text,
  ordering      integer not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_proof_stats_published on public.proof_stats (published, ordering);

-- ---------------------------------------------------------------------------
-- coverage_cities — "Currently shooting in: Hyderabad" + SEO value
-- ---------------------------------------------------------------------------
create table if not exists public.coverage_cities (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  active        boolean not null default false,
  ordering      integer not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- method_steps — THE JASHOOTS METHOD (brand story)
-- ---------------------------------------------------------------------------
create table if not exists public.method_steps (
  id            uuid primary key default gen_random_uuid(),
  step_no       integer not null,
  title         text not null,
  description   text,
  icon          text,
  ordering      integer not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create unique index if not exists idx_method_steps_no on public.method_steps (step_no);

-- ---------------------------------------------------------------------------
-- why_features — WHY JASHOOTS proof strip
-- ---------------------------------------------------------------------------
create table if not exists public.why_features (
  id            uuid primary key default gen_random_uuid(),
  icon_key      text,
  title         text not null,
  description   text,
  ordering      integer not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_why_features_published on public.why_features (published, ordering);

-- ---------------------------------------------------------------------------
-- why_shoot_different — "WHY WE SHOOT DIFFERENT" (positioning statement)
-- ---------------------------------------------------------------------------
create table if not exists public.why_shoot_different (
  id                uuid primary key default gen_random_uuid(),
  trait             text not null,
  traditional_value text not null,
  jashoots_value    text not null,
  ordering          integer not null default 0,
  published         boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_why_different_published
  on public.why_shoot_different (published, ordering);

-- ---------------------------------------------------------------------------
-- seo_meta — per-public-page metadata (A-next / SEO)
-- ---------------------------------------------------------------------------
create table if not exists public.seo_meta (
  id               uuid primary key default gen_random_uuid(),
  page_path        text not null unique,
  title            text,
  description      text,
  og_image         text,
  canonical        text,
  robots           text not null default 'index,follow',
  structured_data  jsonb not null default '{}'::jsonb,
  published        boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_seo_meta_published on public.seo_meta (published);