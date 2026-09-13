-- ============================================================================
-- JASHOOTS — 0008: owner-provided launch content
-- Sourced from the owner's existing brand site (titles, reels, services,
-- stats, social handles). Real-data-only still holds: no prices, no reviews,
-- no invented claims. Prices/testimonials stay unpublished/draft.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- services — the 8 "Perfect For" offers mapped to moment families
-- ---------------------------------------------------------------------------
insert into public.services (id, category_id, slug, name, blurb, ordering, published, featured) values
  ('02000000-0000-4000-8000-000000000006', '01000000-0000-4000-8000-000000000010', 'birthday-parties', 'Birthday Parties',
    'High-energy highlight reels that make birthdays feel like blockbusters.', 55, true, false),
  ('02000000-0000-4000-8000-000000000007', '01000000-0000-4000-8000-000000000003', 'vehicle-delivery', 'Vehicle Deliveries',
    'That first-drive feeling — captured cinematic, delivered fast.', 56, true, false),
  ('02000000-0000-4000-8000-000000000008', '01000000-0000-4000-8000-000000000015', 'brand-promo', 'Brand Promotions',
    'Scroll-stopping vertical content built for growth.', 57, true, false),
  ('02000000-0000-4000-8000-000000000009', '01000000-0000-4000-8000-000000000018', 'corporate-events', 'Corporate Events',
    'Professional on-spot coverage that does not miss a moment.', 58, true, false),
  ('02000000-0000-4000-8000-000000000010', '01000000-0000-4000-8000-000000000016', 'product-launch', 'Product Launches',
    'Launch reels that build hype before the drop.', 59, true, false),
  ('02000000-0000-4000-8000-000000000011', '01000000-0000-4000-8000-000000000004', 'store-opening', 'Store Openings',
    'Turn your opening day into a city-wide event.', 60, true, false),
  ('02000000-0000-4000-8000-000000000012', '01000000-0000-4000-8000-000000000017', 'food-reels', 'Food & Restaurant',
    'Mouth-watering reels that make Hyderabad order instantly.', 61, true, false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- portfolio_projects — the showreel (published, media attaches later via CMS)
-- ---------------------------------------------------------------------------
insert into public.portfolio_projects
  (id, title, slug, category_id, cover_media, preview_reel, full_reel, location, project_year,
   story, what_we_did, results, engagement_stats, delivery_time_label,
   related_service_id, related_package_id, featured, published, published_at)
values
  ('04000000-0000-4000-8000-000000000001', 'Ramnagar Festival', 'ramnagar-47k-viral',
   '01000000-0000-4000-8000-000000000011', null, null, null, 'Hyderabad', 2026,
   'Festival heat — captured, cut and posted while the crowd was still chanting.',
   '["On-location capture","Fast same-day edit","Social-first vertical reel"]'::jsonb,
   '[]'::jsonb, '[]'::jsonb, null,
   '02000000-0000-4000-8000-000000000002', null, true, true, now()),
  ('04000000-0000-4000-8000-000000000002', 'Ramanthapur Ka Raja', 'ramanthapur-ka-raja',
   '01000000-0000-4000-8000-000000000011', null, null, null, 'Hyderabad', 2026,
   'A neighborhood icon, followed from aagman to visarjan.',
   '["On-location capture","Fast same-day edit","Social-first vertical reel"]'::jsonb,
   '[]'::jsonb, '[]'::jsonb, null,
   '02000000-0000-4000-8000-000000000002', null, false, true, now()),
  ('04000000-0000-4000-8000-000000000003', 'Dhoolpet Ganesh', 'dhoolpet-ganesh',
   '01000000-0000-4000-8000-000000000011', null, null, null, 'Hyderabad', 2026,
   'Pre-dawn lanes, low light, zero retakes.',
   '["Low-light on-location capture","Fast edit","Social-first reel"]'::jsonb,
   '[]'::jsonb, '[]'::jsonb, null,
   '02000000-0000-4000-8000-000000000002', null, false, true, now()),
  ('04000000-0000-4000-8000-000000000004', 'Naming Ceremony', 'naming-ceremony',
   '01000000-0000-4000-8000-000000000001', null, null, null, 'Hyderabad', 2026,
   'A family milestone, kept intimate and cinematic.',
   '["Quiet on-location capture","Warm cinematic edit","Family-ready delivery"]'::jsonb,
   '[]'::jsonb, '[]'::jsonb, null,
   '02000000-0000-4000-8000-000000000005', null, false, true, now()),
  ('04000000-0000-4000-8000-000000000005', 'Bonalu Festival', 'bonalu-festival',
   '01000000-0000-4000-8000-000000000012', null, null, null, 'Hyderabad', 2026,
   'Culture in motion — drums, color and devotion.',
   '["On-location capture","Fast edit","Social-first reel"]'::jsonb,
   '[]'::jsonb, '[]'::jsonb, null,
   '02000000-0000-4000-8000-000000000002', null, false, true, now()),
  ('04000000-0000-4000-8000-000000000006', 'Tirupati Temple', 'tirupati-temple',
   '01000000-0000-4000-8000-000000000011', null, null, null, 'Tirupati', 2026,
   'Devotion, framed with patience.',
   '["Respectful on-location capture","Cinematic edit","Social-ready reel"]'::jsonb,
   '[]'::jsonb, '[]'::jsonb, null,
   '02000000-0000-4000-8000-000000000002', null, false, true, now())
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- proof_stats — owner-published numbers only
-- ---------------------------------------------------------------------------
insert into public.proof_stats (label, value, suffix, ordering, published) values
  ('GANESH AAGMANS', '20', '+', 10, true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- about_content — founder (owner-provided) + social identity
-- ---------------------------------------------------------------------------
insert into public.about_content (content_key, title, body, published) values
  ('founder', 'Founder',
   '{"handle":"@mr.jashwanth06","name":"Jashwanth","role":"Founder • JASHOOTS","audience":"320 followers • 28 posts","bio":"Shoots @clipsbyjashoots • Self-made creator from Hyderabad. Built this from scratch — latest gear, fast turnaround, hard work.","quote":"Built from scratch. One reel at a time."}'::jsonb, true),
  ('social', 'Follow',
   '{"instagram":"https://instagram.com/clipsbyjashoots","handle":"@clipsbyjashoots","founder_instagram":"https://instagram.com/mr.jashwanth06","city":"Hyderabad"}'::jsonb, true)
on conflict (content_key)
do update set title = excluded.title, body = excluded.body, published = excluded.published,
  updated_at = now();