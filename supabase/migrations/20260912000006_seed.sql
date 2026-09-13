-- ============================================================================
-- JASHOOTS — 0007: Seed
-- REAL-DATA-ONLY RULE: only factual/brand copy is published.
-- Prices, testimonials, proof stats, portfolio work are draft/hidden until
-- the business supplies real data (Studio flips `published`).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- service_categories — filters (THE WORK) grouped into moment families
-- ---------------------------------------------------------------------------
insert into public.service_categories (id, name, group_key, slug, tagline, ordering, published, featured) values
  ('01000000-0000-4000-8000-000000000001', 'Events',       'events',     'events',       'Birthdays · Celebrations · Functions', 10, true, true),
  ('01000000-0000-4000-8000-000000000002', 'Weddings',     'weddings',   'weddings',     'Engagement · Wedding · Reception',     20, true, true),
  ('01000000-0000-4000-8000-000000000003', 'Automotive',   'automotive', 'automotive',   'Bike · Car · Delivery · Launch',       30, true, false),
  ('01000000-0000-4000-8000-000000000004', 'Business',     'business',   'business',     'Store · Founder · Corporate · Brand',  40, true, false),
  ('01000000-0000-4000-8000-000000000005', 'Content',      'content',    'content',      'Product · Food · Social · Campaign',   50, true, false),
  ('01000000-0000-4000-8000-000000000006', 'Anything Else', 'custom',    'anything-else', 'Tell us what you''re planning',        60, true, false),
  ('01000000-0000-4000-8000-000000000010', 'Birthdays',    'events',     'birthdays',    null, 11, true, false),
  ('01000000-0000-4000-8000-000000000011', 'Festivals',    'events',     'festivals',    null, 12, true, false),
  ('01000000-0000-4000-8000-000000000012', 'Cultural',     'events',     'cultural',     null, 13, true, false),
  ('01000000-0000-4000-8000-000000000013', 'Bike',         'automotive', 'bike',         null, 31, true, false),
  ('01000000-0000-4000-8000-000000000014', 'Car',          'automotive', 'car',          null, 32, true, false),
  ('01000000-0000-4000-8000-000000000015', 'Brands',       'content',    'brands',       null, 51, true, false),
  ('01000000-0000-4000-8000-000000000016', 'Products',     'content',    'products',     null, 52, true, false),
  ('01000000-0000-4000-8000-000000000017', 'Food',         'content',    'food',         null, 53, true, false),
  ('01000000-0000-4000-8000-000000000018', 'Corporate',    'business',   'corporate',    null, 41, true, false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
insert into public.services (id, category_id, slug, name, blurb, ordering, published, featured) values
  ('02000000-0000-4000-8000-000000000001', '01000000-0000-4000-8000-000000000005', 'instant-reel', 'Instant Reel',
    'Fast-turnaround reel service. Not instant booking — availability is confirmed by the JASHOOTS team.', 10, true, true),
  ('02000000-0000-4000-8000-000000000002', '01000000-0000-4000-8000-000000000001', 'event-coverage', 'Event Coverage',
    'Full-day or select-hour event coverage with social-first reels.', 20, true, true),
  ('02000000-0000-4000-8000-000000000003', '01000000-0000-4000-8000-000000000002', 'wedding', 'Wedding',
    'Engagements, weddings & receptions with fast highlights.', 30, true, true),
  ('02000000-0000-4000-8000-000000000004', '01000000-0000-4000-8000-000000000001', 'hourly-coverage', 'Hourly Coverage',
    'Need us for a few hours? 1 / 2 / 4 hours or full day.', 40, true, false),
  ('02000000-0000-4000-8000-000000000005', '01000000-0000-4000-8000-000000000006', 'custom-shoot', 'Custom / Any Function',
    'Birthday, college, store opening, launch — anything worth shooting.', 50, true, false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- packages — DRAFTS ONLY. Price NULL + unpublished until real figures exist.
-- (A3 availability, A4 CTA config demonstrated.)
-- ---------------------------------------------------------------------------
insert into public.packages
  (id, service_id, slug, name, tagline, price, starting_price, coverage_duration_value, coverage_duration_unit,
   num_reels, photos, format, delivery_time_value, delivery_time_unit, delivery_time_label, revisions_allowed,
   features, whats_included, whats_not_included, availability_type, cta_label, cta_action, comparison_group,
   published, featured, ordering)
values
  ('03000000-0000-4000-8000-000000000001', '02000000-0000-4000-8000-000000000001',
   'instant-reel-standard', 'Instant Reel', 'On-spot capture, edited and ready to post.',
   null, false, 30, 'minutes', 1, null, '9:16', 30, 'minutes', '30 minutes', 0,
   '["Cinematic edit"]'::jsonb, '["1 reel","On-location shoot","Cinematic edit","9:16 delivery","Delivery within 30 minutes"]'::jsonb,
   '[]'::jsonb, 'contact_only', 'BOOK ON WHATSAPP', 'book_on_whatsapp', null, false, false, 10),
  ('03000000-0000-4000-8000-000000000002', '02000000-0000-4000-8000-000000000002',
   'event-standard', 'Event Coverage', 'Coverage + highlighted reels for your event.',
   null, true, 4, 'hours', 3, null, '9:16', 2, 'hours', '2 hours', 1,
   '["Cinematic edit","Highlight reel"]'::jsonb,
   '["X hours coverage","3 reels","Fast highlights","Revisions per package"]'::jsonb,
   '["Raw footage (unless selected)","Drone (unless selected)"]'::jsonb,
   'contact_only', 'BOOK ON WHATSAPP', 'book_on_whatsapp', null, false, false, 20),
  ('03000000-0000-4000-8000-000000000003', '02000000-0000-4000-8000-000000000003',
   'wedding-highlights', 'Wedding', 'Complete wedding coverage with fast highlights.',
   null, true, null, 'days', 8, 0, 'Mix', 48, 'hours', '24–48 hours', 2,
   '["Cinematic film look","Same-day teaser"]'::jsonb,
   '["Custom coverage","Multiple reels","Fast highlights","Custom delivery timeline"]'::jsonb,
   '[]'::jsonb, 'contact_only', 'DISCUSS ON WHATSAPP', 'discuss_on_whatsapp', null, false, false, 30)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- home_sections — the 16-section homepage, independently manageable (A7)
-- ---------------------------------------------------------------------------
insert into public.home_sections (section_key, name, ordering, enabled, published, settings) values
  ('hero', 'Cinematic Hero', 10, true, true,
   '{"kicker":"JASHOOTS","headline":"SHOOT. EDIT. DELIVER.","sub":"Professional reels, delivered within your promised turnaround.","primary_cta":{"label":"BOOK ON WHATSAPP","action":"book_on_whatsapp"},"secondary_cta":{"label":"SEE OUR WORK","action":"work"}}'::jsonb),
  ('promise', 'The Promise', 20, true, true,
   '{"headline":"YOUR MOMENT → OUR CAMERA → YOUR REEL","sub":"Every package carries its promised turnaround."}'::jsonb),
  ('work', 'The Work', 30, true, true,
   '{"headline":"THE WORK","kicker":"REAL MOMENTS. REAL JASHOOTS.","filters":["all","events","weddings","bike","car","business","brands","food"]}'::jsonb),
  ('moments', 'Whats Your Moment', 40, true, true,
   '{"headline":"WHAT''S YOUR MOMENT?","sub":"Pick what matches your plan — or tell us anything else."}'::jsonb),
  ('featured_project', 'Featured Project', 50, true, true, '{}'::jsonb),
  ('packages', 'Packages & Pricing', 60, true, true,
   '{"headline":"PACKAGES","sub":"Transparent. No hidden quotes."}'::jsonb),
  ('why', 'Why Jashoots', 70, true, true, '{"headline":"WHY JASHOOTS"}'::jsonb),
  ('how_it_works', 'How It Works', 80, true, true,
   '{"headline":"HOW IT WORKS","sub":"ENQUIRE → WHATSAPP → CONFIRM → SHOOT → EDIT → DELIVER"}'::jsonb),
  ('raw_final', 'Raw To Final', 90, true, true, '{"headline":"RAW → FINAL"}'::jsonb),
  ('proof', 'Proof', 100, true, true,
   '{"headline":"REAL SHOOTS. REAL MOMENTS.","sub":"Numbers, testimonials and real work — published only when real data exists."}'::jsonb),
  ('turnaround', 'Turnaround', 110, true, true, '{"headline":"FAST DOESN''T MEAN RUSHED."}'::jsonb),
  ('client_experience', 'Client Experience', 120, true, true,
   '{"headline":"REVIEW → APPROVE → RECEIVE"}'::jsonb),
  ('app', 'App', 130, true, true,
   '{"headline":"YOUR PROJECT. IN YOUR POCKET.","sub":"Track your shoot. Review your reels. Approve edits. Download your final work."}'::jsonb),
  ('faq', 'FAQ', 140, true, true, '{"headline":"QUESTIONS BEFORE YOU SHOOT?"}'::jsonb),
  ('final_cta', 'Final CTA', 150, true, true,
   '{"headline":"GOT A MOMENT?","sub":"LET''S MAKE IT A REEL.","cta":{"label":"BOOK ON WHATSAPP","action":"book_on_whatsapp"}}'::jsonb),
  ('footer', 'Footer', 160, true, true, '{}'::jsonb)
on conflict (section_key) do nothing;

-- ---------------------------------------------------------------------------
-- promo_block — CMS promo strip (device claims stay CMS-editable)
-- ---------------------------------------------------------------------------
insert into public.promo_block (badge, headline, subtext, enabled, published, ordering) values
  ('ON-SPOT COVERAGE', 'SHOOT ON OUR LATEST GEAR', 'Cinema-grade capture on the latest equipment.', true, true, 10)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- coverage_cities
-- ---------------------------------------------------------------------------
insert into public.coverage_cities (name, slug, active, ordering, published) values
  ('Hyderabad', 'hyderabad', true, 10, true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- method_steps — THE JASHOOTS METHOD
-- ---------------------------------------------------------------------------
insert into public.method_steps (step_no, title, description, ordering, published) values
  (1, 'Tell us the moment',  'What are you shooting? Where and when?', 10, true),
  (2, 'Choose your package', 'Transparent packages — pick what fits.',   20, true),
  (3, 'We confirm the shoot','We check availability and confirm on WhatsApp.', 30, true),
  (4, 'We capture it',       'Professional on-location capture.',        40, true),
  (5, 'We turn it into a reel','Cinematic, social-first edit.',          50, true),
  (6, 'You review it',       'Review and approve from the client portal.',60, true),
  (7, 'You get the final',   'Delivered via a private link on time.',    70, true)
on conflict (step_no) do nothing;

-- ---------------------------------------------------------------------------
-- why_features — WHY JASHOOTS proof strip
-- ---------------------------------------------------------------------------
insert into public.why_features (icon_key, title, description, ordering, published) values
  ('bolt',       'FAST',              'A clear delivery SLA on every package.', 10, true),
  ('reel',       'REELS FIRST',       'Built for Instagram and social content.', 20, true),
  ('clapperboard','CINEMATIC CAPTURE','Professional visual storytelling.',       30, true),
  ('whatsapp',   'EASY BOOKING',      'One tap enquiry on WhatsApp.',           40, true),
  ('tag',        'TRANSPARENT',       'Packages and inclusions shown upfront.', 50, true),
  ('cycle',      'EASY REVIEW',       'Structured client review workflow.',     60, true),
  ('lock',       'PRIVATE DELIVERY',  'Secure private link after approval.',    70, true),
  ('tracking',   'PROJECT TRACKING',  'Web, PWA and app experience.',          80, true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- why_shoot_different — positioning statement (not an attack on
-- photographers; a different product)
-- ---------------------------------------------------------------------------
insert into public.why_shoot_different (trait, traditional_value, jashoots_value, ordering, published) values
  ('Primary',    'Photos first',            'Reels first',            10, true),
  ('Timing',     'Wait days',               'Defined turnaround',     20, true),
  ('Booking',    'Complicated process',     'WhatsApp enquiry',       30, true),
  ('Pricing',    'Hidden / custom quotes',  'Transparent packages',   40, true),
  ('Delivery',   'Final files days later',  'Fast social-ready content', 50, true),
  ('Output',     'Generic coverage',        'Purpose-built content',   60, true),
  ('Experience', 'One-off deliverables',    'Client project experience', 70, true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- faqs — conversion FAQ
-- ---------------------------------------------------------------------------
insert into public.faqs (question, answer, ordering, published) values
  ('How quickly will I receive my reel?', 'Depends on the package you choose. Every package displays its promised turnaround — from 30 minutes to 24–48 hours.', 10, true),
  ('How do I book?', 'Submit an enquiry and continue to WhatsApp. Our team checks availability and confirms your booking there.', 20, true),
  ('Is submitting the enquiry a booking?', 'No. An enquiry becomes a confirmed booking only after the JASHOOTS team confirms availability and details on WhatsApp.', 30, true),
  ('Can you shoot weddings?', 'Yes. Engagements, weddings and receptions. See wedding work in OUR WORK and book on WhatsApp.', 40, true),
  ('Do you shoot bikes, cars and businesses?', 'Yes. Automotive, store openings, corporate and brand shoots are a core part of what we do.', 50, true),
  ('Can I request something custom?', 'Absolutely. Tell us what you''re planning and we will recommend the best option.', 60, true),
  ('How will I receive my final files?', 'Through a private delivery link after you approve your work — nothing is shared publicly.', 70, true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- about_content — brand copy published; founder content stays draft
-- ---------------------------------------------------------------------------
insert into public.about_content (content_key, title, body, published) values
  ('hero', 'JASHOOTS',
   '{"tagline":"YOU BRING THE MOMENT. WE MAKE THE REEL.","claim":"SHOOT. EDIT. DELIVER.","location":"Hyderabad / India"}'::jsonb, true),
  ('founder', null,
   '{}'::jsonb, false)
on conflict (content_key) do nothing;

-- ---------------------------------------------------------------------------
-- seo_meta
-- ---------------------------------------------------------------------------
insert into public.seo_meta (page_path, title, description, robots, published) values
  ('/', 'JASHOOTS — Shoot. Edit. Deliver.', 'Reels-first photo & video production in Hyderabad. Transparent packages, fast turnaround, one-tap WhatsApp enquiry.', 'index,follow', true),
  ('/work', 'Our Work — JASHOOTS', 'Real moments, real JASHOOTS. Events, weddings, bikes, cars, brands and more.', 'index,follow', true),
  ('/packages', 'Packages & Pricing — JASHOOTS', 'Transparent packages with clear coverage, delivery and revisions.', 'index,follow', true)
on conflict (page_path) do nothing;