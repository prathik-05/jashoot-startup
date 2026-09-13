# JASHOOTS — ULTIMATE PRODUCTION BUILD PROMPT

---

## 1. ROLE + MISSION

You are the lead product architect, senior Next.js engineer, Supabase engineer, UI/UX designer, security engineer, QA engineer, and DevOps engineer for JASHOOTS.

Build JASHOOTS as a **production-grade reel-production platform** — not a demo, template, landing-page mockup, or generic photography website.

**Objective:**

```
DISCOVER → UNDERSTAND → SEE PROOF → SEE PRICE → ENQUIRE
→ WHATSAPP → TEAM CONFIRMS → PROJECT → REVIEW → DELIVERY → REPEAT
```

---

## 2. SOURCE OF TRUTH

**Priority (highest first):**

1. This Build Specification
2. Actual repository/codebase
3. Actual Supabase schema/data
4. Supplied JASHOOTS reference assets
5. Existing project requirements
6. General engineering conventions

**Do not invent business facts.**

When requirements are ambiguous:
- Preserve the locked architecture
- Prefer the simplest production-safe implementation
- Do not introduce competing product flows
- Do not silently change locked decisions

---

## 3. LOCKED PRODUCT DECISIONS

These are **NOT suggestions**. They are locked architectural decisions.

| Decision | Status |
|----------|--------|
| Flutter (mobile app) | LOCKED — later phase |
| WhatsApp-first booking | LOCKED — non-negotiable |
| No traditional booking engine | LOCKED — no calendar, no payment gateway on site |
| Supabase (Postgres 15+) | LOCKED — database, auth, storage, edge functions |
| Next.js 16 (App Router) | LOCKED — website framework |
| Studio = operational source of truth | LOCKED — all ops flow through Studio |
| Client Portal | LOCKED — post-booking customer experience |
| PWA | LOCKED — later phase |
| JASHU (AI assistant) | LOCKED — later phase |
| External delivery abstraction | LOCKED — signed URLs, not public media |
| Real-data-only | LOCKED — never fabricate content |

---

## 4. BUSINESS LOOP

```
WhatsApp Enquiry
  → Lead (JS-XXXX)
  → Quote
  → Advance
  → Booking
  → Project
  → Deliverables
  → Review
  → Approval
  → Payment
  → Delivery
  → Repeat
```

---

## 5. CUSTOMER LOOP

```
Instagram
  → Website
  → Work / Services / Packages
  → Enquiry
  → WhatsApp
  → Team
  → Availability
  → Quote
  → Advance
  → Confirmation
  → Project
  → Review
  → Approval
  → Delivery
  → Share
  → Repeat
```

---

## 6. PRODUCT ARCHITECTURE

The website is a **conversion engine**, not merely a portfolio website.

Every page, every section, every component must serve the conversion loop. If it doesn't move the visitor toward WhatsApp enquiry, it doesn't belong on the site.

---

## 7. WEBSITE IA

### Sitemap

```
/                           Homepage
/work                       Portfolio listing
/work/[slug]                Case study / reel page
/services                   Services overview
/packages                   Pricing packages
/enquire                    Enquiry form
/portal                     Client Portal (authenticated)
/studio                     Studio Admin (key-gated)
/privacy                    Privacy Policy
/terms                      Terms of Service
```

### Navigation

- **Desktop:** Sticky header — Logo (JA(SH)OOTS) | Work | Services | Founder | BOOK NOW CTA
- **Mobile:** Sticky header — Logo | Hamburger → slide-down menu with BOOK NOW CTA
- **Sticky WhatsApp bar:** Mobile only, fixed bottom, "Got a moment?" + WhatsApp button

### Homepage Sections (16, in order)

1. Hero — "INSTANT REELS" headline, SHOOT ⚡ EDIT ⚡ DELIVER pill, phone mockup, stats
2. Work Wall — Filterable grid, gradient cards, keyboard nav, 9:16 aspect
3. Services — 4-column grid, emoji icons, hover effects, BOOK THIS links
4. Stats Strip — Red background bar, 4 stat items
5. Why — "Why Hyderabad Loves Us", Ganesh Aagman visual, feature cards
6. Founder — Profile card, bio, Telugu voiceover, stats, gear section
7. Contact — Book Now heading, WhatsApp CTA, Instagram link, inquiry form
8. Map — Interactive MapLibre GL map, Hyderabad center, location tags
9. FAQ — Accordion from CMS
10. Proof — Stats + testimonials (CMS-driven, hidden if empty)
11. Packages Preview — Up to 3 package cards (CMS-driven, hidden if empty)
12. Instagram Feed — @clipsbyjashoots link card
13. Final CTA — Red background, headline, WhatsApp CTA
14. Client App — PWA preview (placeholder for future)
15. Promise Strip — SHOOT → EDIT → DELIVER
16. Footer — LAMP SVG pattern, brand signature, social links

---

## 8. VISUAL REFERENCE + CREATIVE DIRECTION

**Reference image = creative direction, not a template.**

### Take inspiration from:
- Bold typography
- Red/black/white contrast
- Brush graphics
- Editorial composition
- High-impact photography
- Visual storytelling
- Strong CTA treatment
- SHOOT → EDIT → DELIVER
- Energetic event imagery

### Do NOT copy:
- Exact layout
- Exact composition
- Artwork
- Images
- Device renders
- Typography placement
- Exact graphics

---

## 9. DESIGN SYSTEM

### Fonts

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Display (headlines) | Anton | 400 | Impact, system-ui |
| Condensed (labels, UI) | Barlow Condensed | 400–900 | system-ui |
| Body (text) | Inter | 400–700 | system-ui |

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Canvas | `#0A0A0A` | Primary background |
| Surface | `#111111` | Card base, elevated panels |
| Panel | `#141414` | Mid-level surfaces |
| Shell | `#1A1A1A` | Borders, subtle bg |
| Inner | `#1E1E1E` | Input bg, nested cards |
| Border | `rgba(255,255,255,0.06)` | Hairline borders |
| Muted | `rgba(255,255,255,0.03)` | Very subtle bg |
| Ash | `#a1a1aa` | Primary text |
| Fog | `#71717a` | Secondary text |
| White | `#fafafa` | Headlines |
| Red | `#E30613` | Accent (JASHOOTS signature) |
| Red-dim | `rgba(227,6,19,0.12)` | Tinted bg |
| WhatsApp Green | `#25D366` | WhatsApp CTA |

### Design Principles

```
VIDEO > IMAGE
MOMENT > CARD
RESULT > DESCRIPTION
REEL > THUMBNAIL
CTA > NAVIGATION
MOTION > DECORATION
```

Motion must never compromise performance.

### Key Visual Elements

- **brush-btn:** `clip-path: polygon(...)` for signature red buttons
- **grain::after:** SVG noise texture overlay on surfaces
- **Glass morphism:** `.glass`, `.glass-subtle`, `.glass-strong` with backdrop-blur
- **Gradient borders:** `.gradient-border` with mask-composite
- **Pill buttons:** `.pill-btn` for secondary actions
- **Rounded cards:** `rounded-[20px]` / `rounded-[24px]` / `rounded-[28px]`
- **Aspect ratios:** `aspect-[9/16]` for reels, `aspect-[4/5]` for phone mockup

---

## 10. REFERENCE IMAGE → MODERN WEB TRANSLATION

```
Poster energy          →  Editorial web composition
Brush graphics         →  Reusable SVG/CSS primitives
Red CTA strip          →  Dynamic CTA components
SHOOT / EDIT / DELIVER →  Interactive process component
Service bullet list    →  CMS-driven "What's Your Moment?" experiences
Hero imagery           →  Optimized responsive video/image media
```

---

## 11. CMS

### Studio must control:

| Entity | Key Fields |
|--------|-----------|
| `home_sections` | section_key, published, ordering, config (jsonb) |
| `services` | name, slug, blurb, published, ordering |
| `service_categories` | name, slug, published, ordering |
| `packages` | name, slug, price, starting_price, coverage, reels, photos, delivery, format, revisions, includes, excludes, published, ordering |
| `portfolio_projects` | title, slug, category_id, cover_media, preview_reel, location, project_year, engagement_stats, delivery_time_label, published, featured, ordering |
| `proof_stats` | label, value, published, ordering |
| `coverage_cities` | name, published, ordering |
| `promo_block` | headline, sub, published |
| `method_steps` | step_number, title, description, published |
| `why_features` | title, description, published, ordering |
| `why_shoot_different` | label, us, them, published, ordering |
| `testimonials` | client_name, quote, rating, published, ordering |
| `faqs` | question, answer, published, ordering |
| `about_content` | section_key, headline, body, published |
| `seo_meta` | path, title, description, og_image, canonical, robots |

### Every entity must support:

- `published` (boolean)
- `ordering` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 12. REAL-DATA-ONLY RULE

**NEVER fabricate:**

- Prices
- Reviews
- Client names
- Statistics
- Likes
- Number of reels
- Delivery times
- Locations
- Availability
- Testimonials
- Social proof
- Equipment claims

**If CMS data is missing:**
→ Hide the component OR
→ Show an intentional CMS-empty state in Studio

**Never show fake production content.**

This is one of the most important rules in the entire specification.

---

## 13. WORK / PORTFOLIO

- Each project = a case study page with JSON-LD structured data
- URL: `/work/[slug]`
- Must include: title, location, year, category, cover media, engagement stats, delivery time, description
- Shareable via OpenGraph metadata
- Filterable by category on `/work`
- Keyboard navigation on work wall (arrow keys)

---

## 14. SERVICES

- CMS-driven, hidden if no published services
- 4-column grid with emoji icons
- Each service links to `/enquire` with preset service
- BOOK THIS → opens enquiry form with service pre-selected

---

## 15. PACKAGES

- CMS-driven, hidden if no published packages
- Displayed on `/packages` page and homepage preview (max 3)
- Each package shows: name, price, coverage, reels, photos, delivery, format, revisions, includes/excludes
- CTA: WhatsApp with package details prefilled
- ENQUIRY ≠ BOOKING — package CTA opens enquiry, not booking confirmation

---

## 16. WHATSAPP ENGINE

### Centralized function:

```typescript
createWhatsAppBookingLink({
  service?: string,
  package?: string,
  date?: string,
  preferredTime?: string,
  location?: string,
  requirements?: string,
  leadReference?: string,
  source?: string,
  content?: string,
}): string
```

### Requirements:
- URL encoding of all parameters
- Prefilled structured message
- Source attribution (which page/CTA triggered it)
- Service attribution
- Lead reference (JS-XXXX)
- Mobile: opens WhatsApp app
- Desktop: opens WhatsApp Web
- Fallback: copy message to clipboard if WhatsApp cannot open
- Track: `whatsapp_clicked`, `whatsapp_opened`

---

## 17. ENQUIRY SYSTEM

### Flow:

```
FORM → VALIDATE (Zod) → CREATE LEAD (JS-XXXX) → GENERATE WHATSAPP MESSAGE → OPEN WHATSAPP
```

### Critical rule:

**ENQUIRY ≠ BOOKING**

Booking confirmed only after JASHOOTS team confirms on WhatsApp. The form submission creates a lead, not a booking. This is explicitly stated in `/terms` Section 2.

---

## 18. LEAD MANAGEMENT

### Tracking events:

- `form_started` — visitor began filling form
- `form_submitted` — form submitted successfully
- `whatsapp_clicked` — CTA clicked
- `whatsapp_opened` — WhatsApp app/web opened

### Studio must identify:

```
JS-1048 — WhatsApp not opened
```

This is a real business feature, not just analytics.

---

## 19. STATE MACHINES

### Lead States:

```
ENQUIRY → CONTACTED → QUOTED → AWAITING_ADVANCE → CONFIRMED → CANCELLED
```

### Project States:

```
CONFIRMED → IN_PROGRESS → EDITING → REVIEW → APPROVED → DELIVERED → COMPLETED → CANCELLED
```

### Rules:
- Invalid transitions must be rejected at the API/database/business-logic level
- Not merely hidden in UI
- Enforced via Postgres enums + check constraints + RPC functions

---

## 20. STUDIO

### Studio is the operational command center.

### Sections:

| Section | Purpose |
|---------|---------|
| Dashboard | Overview metrics, recent activity |
| Leads | All enquiries, status, follow-up |
| Calendar | Bookings, availability |
| Quotes | Pending, sent, accepted |
| Bookings | Confirmed projects |
| Projects | Active work, status tracking |
| Deliverables | Files, versions, approvals |
| Approvals | Client review status |
| Payments | Tracking, reconciliation |
| CMS | All content management |
| Pricing | Package management |
| Notifications | Alert configuration |
| Analytics | Conversion funnel, sources |
| Audit Logs | All state changes tracked |
| Global Search | Cross-entity search |

### Access control:
- Gated by `STUDIO_ACCESS_KEY` environment variable
- Server-side verification only
- Never expose key in client bundle

---

## 21. CLIENT PORTAL

### Customer experience:

```
LOGIN → MY PROJECTS → PROJECT TIMELINE → MEDIA → REVIEW → FEEDBACK → APPROVE → DELIVERY
```

### Review features:
- Individual file approval
- Batch approval
- Feedback comments
- Versioning (v1, v2, v3...)
- Approval history with timestamps
- Rejection with reason

---

## 22. DELIVERY

### Security (A6 rule):

```
Authenticated user
+ Authorized client
+ Project membership
+ Delivery published
  → Return delivery URL
```

### Requirements:
- RLS is mandatory. Never rely exclusively on frontend authorization
- External URLs must not be publicly exposed
- Signed/time-limited URLs for media delivery
- Delivery = final approved files sent to client

---

## 23. MEDIA ARCHITECTURE

### Pipeline:

```
Original → Processing → Optimized preview → CDN → Client
```

### Requirements:
- Lazy loading for all media
- Poster images for video
- Responsive video (multiple resolutions)
- Optimized formats (WebP, AVIF for images; H.264/H.265 for video)
- Muted autoplay where appropriate
- Viewport-based loading (IntersectionObserver)
- No 20-video simultaneous streaming
- No raw originals in public pages
- Supabase Storage for file management

---

## 24. PAYMENTS

### Scope (Phase 3+):

- Advance payment tracking (manual entry in Studio)
- Payment confirmation workflow
- Receipt generation
- No payment gateway integration on public site
- WhatsApp-based payment coordination

---

## 25. NOTIFICATIONS

### Scope (Phase 3+):

- New enquiry alerts (WhatsApp/SMS to team)
- Lead status change notifications
- Project milestone alerts
- Delivery approval notifications
- Studio dashboard alerts

---

## 26. ANALYTICS + ATTRIBUTION

### Conversion events:

```
page_view
work_opened
reel_played
package_viewed
package_cta_clicked
enquiry_started
enquiry_submitted
whatsapp_clicked
whatsapp_opened
quote_sent
booking_confirmed
payment_completed
```

### Attribution fields:

```
source
medium
campaign
content
landing_page
service
package
portfolio_project
```

### Implementation:
- Client-side `trackEvent()` → `/api/events` → Supabase `log_conversion_event()` RPC
- Rate limited: 30/min/IP

---

## 27. SEO

### Requirements:

- Dynamic `<title>` and `<meta description>` per page
- OpenGraph tags for social sharing
- Twitter card metadata
- Canonical URLs
- Auto-generated sitemap (`/sitemap.xml`)
- Robots.txt
- JSON-LD structured data on work pages
- Semantic HTML (proper heading hierarchy, landmarks)
- Dynamic work URLs (`/work/[slug]`)
- Dynamic service URLs (future)
- Dynamic package URLs (future)

---

## 28. ACCESSIBILITY

### Requirements:

- Keyboard navigation throughout
- Semantic HTML (landmarks, headings, lists)
- Accessible buttons (proper `aria-label`, `role`)
- Visible focus states (`focus-ring` utility)
- Alt text on all images
- `prefers-reduced-motion` support (animations disabled)
- Sufficient color contrast (WCAG AA minimum)
- Form labels and error messages
- Screen-reader-friendly status messages (`aria-live`)
- Skip-to-content link

---

## 29. SECURITY

### Checklist:

| Control | Status |
|---------|--------|
| Supabase RLS on all tables | Required |
| RBAC (role-based access control) | Required |
| Server-side authorization | Required |
| Input validation (Zod) | Implemented |
| Rate limiting (Upstash Redis) | Implemented |
| CSRF protection | Required where applicable |
| Secure cookies/session handling | Required |
| Server-only secrets (service role key) | Required |
| No service-role key in client | Required |
| Signed/private media access | Required |
| File validation on uploads | Required |
| Upload restrictions (type, size) | Required |
| XSS protection (output encoding) | Implemented |
| SQL injection protection (parameterized queries) | Required |
| Security headers (CSP, HSTS, X-Frame-Options) | Implemented |
| Audit logs for state changes | Required |

---

## 30. PERFORMANCE

### Budget:

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

### Requirements:
- Minimal JavaScript bundle
- Server Components where appropriate
- Dynamic imports for client-only components
- Image optimization (next/image)
- Video optimization (compressed, poster images)
- Font optimization (subset, swap, preload)
- Aggressive caching (ISR, stale-while-revalidate)
- CDN for static assets
- No unnecessary libraries
- No giant client-side bundles
- Tree shaking enabled

---

## 31. RESPONSIVE UX

### Breakpoints:

| Name | Width |
|------|-------|
| Mobile | 390px–430px |
| Tablet | 768px |
| Desktop | 1024px–1440px |
| Large desktop | 1920px |

### Critical rule:

**Do not simply shrink the desktop layout.**

The mobile experience should be designed independently around the WhatsApp conversion action. Mobile-first, WhatsApp-first.

---

## 32. COMPONENT ARCHITECTURE

### Directory structure:

```
/components
  /brand          Wordmark, Scribble, Splat, ReelFrame, Arrow
  /navigation     Header, MobileMenu
  /hero           Hero
  /work           WorkWall, WorkCard, ReelCard
  /services       ServicesSection
  /packages       PackageCard, PackagesPreview
  /proof          Proof (stats + testimonials)
  /testimonials   TestimonialCarousel
  /faq            FaqAccordion
  /whatsapp       WhatsAppCta, StickyWhatsAppBar
  /enquiry        EnquiryForm
  /studio         (Phase 3)
  /portal         (Phase 4)
  /media          VideoPlayer, ImageGallery
  /ui             Button, Container, Section, Accordion, Skeleton, EmptyState
  /home           Hero, WorkWall, ServicesSection, StatsStrip, Why, FounderSection,
                  ContactSection, MapSection, FaqSection, Proof, PackagesPreview,
                  InstagramFeed, FinalCta, ClientApp, PromiseStrip
```

### Rules:
- Avoid one giant homepage component
- Each section = its own component
- Shared UI primitives in `/ui`
- Brand elements in `/brand`
- Client components only when necessary (`"use client"`)

---

## 33. ERROR / EMPTY / LOADING STATES

Every major feature needs:

| State | Behavior |
|-------|----------|
| Loading | Skeleton or spinner |
| Empty | Hide section (production) or show CMS-empty state (Studio) |
| Error | User-friendly message + retry option |
| Success | Confirmation with next step |
| Unauthorized | Redirect to login or show access message |
| Not Found | Custom 404 page |

### Example — No Work:

Production site: Hide the Work section entirely.
Studio: "No published projects yet. Add projects in the Work CMS."

---

## 34. TESTING

### Unit tests:

- Business logic (lead creation, state transitions)
- Validation (Zod schemas)
- WhatsApp URL generation (`createWhatsAppBookingLink`)
- State machine transitions (valid + invalid)

### Integration tests:

- Lead → WhatsApp flow
- Quote → Booking flow
- Project → Approval flow
- Delivery authorization

### E2E tests:

**Visitor flow:**
```
Homepage → Work → Package → Enquiry → WhatsApp
```

**Client flow:**
```
Login → Project → Review → Approve → Delivery
```

### Security tests:

- RLS with correct client → allowed
- RLS with wrong client → denied
- RLS with unauthenticated user → denied
- RLS with admin → allowed
- RLS with unauthorized project → denied

---

## 35. VISUAL QA

### Check at:

| Viewport | Width |
|----------|-------|
| Desktop | 1440px |
| Desktop | 1920px |
| Tablet | 768px |
| Mobile | 390px |
| Mobile | 430px |

### Check:

- Typography rendering (Anton, Barlow Condensed, Inter)
- Spacing consistency
- Overflow (no horizontal scroll)
- Video cropping (9:16 aspect correct)
- CTA visibility (always accessible)
- Navigation (desktop + mobile)
- Sticky WhatsApp bar (mobile)
- Forms (input focus, validation errors)
- Animations (smooth, not janky)
- Accessibility (focus states, alt text)
- Loading states (skeletons, spinners)
- Empty states (hidden or placeholder)
- Error states (retry available)

---

## 36. DEPLOYMENT

### Target: Vercel

- Environment variables configured
- Supabase production project connected
- Upstash Redis provisioned
- Domain configured (when ready)
- SSL enabled
- Preview deployments for PRs
- Production deployment on merge to main

---

## 37. PHASES + GATES

| Phase | Scope | Gate |
|-------|-------|------|
| **Phase 1** | Foundation + Supabase | GATE 1 |
| **Phase 2** | Website + WhatsApp | GATE 2 |
| **Phase 3** | Studio | GATE 3 |
| **Phase 4** | Client Portal | GATE 4 |
| **Phase 5** | PWA | GATE 5 |
| **Phase 6** | Flutter | GATE 6 |
| **Phase 7** | JASHU (AI) | GATE 7 |

**Never proceed to the next gate with failing critical tests.**

---

## 38. ULTIMATE LOOP

```
ANALYZE → PLAN → IMPLEMENT → RUN → TEST → AUDIT → FIX → VERIFY → IMPROVE → REPEAT
```

**Never stop at "implemented." Stop only at "verified."**

---

## 39. DEFINITION OF DONE

Every feature is complete only when:

- [x] Implemented
- [x] Connected to real backend
- [x] Authenticated/authorized
- [x] Responsive
- [x] Accessible
- [x] Loading state
- [x] Empty state
- [x] Error state
- [x] Tested
- [x] Security checked
- [x] Performance checked
- [x] Analytics added where relevant
- [x] No console errors
- [x] No TypeScript errors
- [x] No broken routes
- [x] No fake production data
- [x] Visual QA completed

---

## 40. FINAL REPORT FORMAT

At the end of every phase, report:

```
PHASE: [number + name]
STATUS: [complete / partial / blocked]

Implemented:
- ...

Database:
- ...

Routes:
- ...

Components:
- ...

Tests:
- ...

Security:
- ...

Performance:
- ...

Known issues:
- ...

Deferred:
- ...

Next phase:
- ...
```

---

## 41. NO FAKE IMPLEMENTATION RULE

- Do not create fake buttons that do nothing
- Do not create fake booking confirmation
- Do not create fake analytics
- Do not create fake CMS controls
- Do not create fake payment success
- Do not create fake availability
- Do not hard-code content that is supposed to come from CMS

**If a feature is not implemented yet:**
→ Expose a clear TODO/phase boundary
→ Do not pretend it works

---

## 42. CURRENT BUILD STATUS (v6)

### Completed:

- Phase 1: 8 Supabase migrations (28 tables, 16 enums, RLS, triggers, seed)
- Phase 2 (website): 21 routes, 0 TypeScript errors
- 16 CMS-driven homepage sections
- 6 SSG case study pages with JSON-LD
- Hybrid enquiry flow (Zod → lead → WhatsApp)
- Conversion event pipeline (`/api/events` → RPC)
- Security headers, rate limiting, robots, sitemap, error boundary, 404
- Offline brand-seed fallback
- Interactive MapLibre GL map
- Design system v6 (Anton, Barlow Condensed, Inter, #E30613 red)
- Glass morphism, brush-btn clip-path, grain texture
- WhatsApp sticky bar (mobile)

### Blocked:

- No Supabase project connected
- No Upstash Redis provisioned
- No domain purchased
- Legal pages not reviewed

### Next:

- Phase 3: Studio admin
- Phase 4: Client Portal
- Phase 5: PWA
