# JASHOOTS — Database

Frozen spec v6 · Supabase (Postgres 15+) · 8 migrations · 28 tables · 16 enums

## Apply

```powershell
# 1. Create a project at supabase.com, then link it:
npx supabase login
npx supabase link --project-ref <ref>

# 2. Push the suite (runs 000000 → 000007 in order):
npx supabase db push

# 3. Verify:
node scripts/validate-migrations.mjs
```

Alternatively run each file in `supabase/migrations/` in filename order via
the SQL editor. Never reorder or mutate applied migrations — add a new one.

## Migration map

| File | Contents |
|---|---|
| `20260912000000_extensions_enums.sql` | pgcrypto + 16 enums (booking state machine, availability, CTA, delivery, payments, conversion events) |
| `20260912000001_content_cms.sql` | 15 CMS tables: categories, services, packages (A3/A4), portfolio_projects (A5), testimonials, faqs, about, home_sections (A7), promo, proof_stats, cities, method, why (+why-different), seo_meta |
| `20260912000002_ops_core.sql` | admin_users, clients, leads (ref + attribution + abandonment), quotes, bookings (state machine), projects, deliverables, approvals, deliveries (A2), payments, notifications, conversion_events (A8), audit_logs |
| `20260912000003_functions_triggers.sql` | updated_at loop · is_admin/is_owner/is_project_client/is_booking_client/delivery_released · clients sync on signup · JS-XXXX generator · `log_conversion_event` RPC · `get_delivery_link` RPC (A6) · per-table audit triggers |
| `20260912000004_rls_policies.sql` | anon reads published rows only; Studio full; clients scoped to own records; deliveries visible only when published + unexpired + own project |
| `20260912000005_storage.sql` | `work-public` (public previews) + `portal-private` (Studio-only; review media served signed/server-side) |
| `20260912000006_seed.sql` | Brand CMS: categories, services, 16 home_sections, promo, Hyderabad, method(7), why(8), why-different(7), FAQ(7), hero/about, SEO(3). Packages are drafts with NULL price; no projects, testimonials or stats |
| `20260912000007_reference_content.sql` | Owner-published content: 7 more services, 6 showreel projects, 2 proof stats, founder + social rows |

## Real-data-only rule

Seed publishes only facts the owner already publishes publicly. Never commit
prices, testimonials, stats or availability claims to `published=true`
without Studio confirmation. The website auto-hides anything unpublished.

## Security model (A6)

- `deliveries.external_url` is **never** in public HTML/API. Clients read a
  delivery only through the `client released delivery only` policy (published +
  unexpired + own project) or the `get_delivery_link()` RPC.
- `conversion_events` inserts happen only via the `log_conversion_event` RPC
  (explicit EXECUTE grant to anon/authenticated).
- Audit of prices, quotes, booking confirmation, payment status, approvals,
  media replacement, delivery publication, lead stage — all in `audit_logs`.
- Every table has RLS enabled and at least one policy (validated by script).

## Lead lifecycle

`enquiry → contacted → quoted → awaiting_advance → confirmed → …` with
`whatsapp_opened_at` tracking abandonment (`JS-XXXX — WhatsApp not opened`).

## Env

See `.env.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (server only), `NEXT_PUBLIC_WHATSAPP_NUMBER`,
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `STUDIO_ACCESS_KEY`.
