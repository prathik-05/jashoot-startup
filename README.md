# JASHOOTS

**Production-grade cinematic reel production & media agency platform.**

Built with Next.js 16 (App Router & Turbopack), Supabase (PostgreSQL), Tailwind CSS, TypeScript, and Sentry.

---

## 🚀 Overview

JASHOOTS provides an end-to-end platform for client enquiry, reel production workflow, studio project management, and automated lead alerts.

- **Reel Portfolio**: Showreels, category filters, high-resolution media previews, and dynamic project pages.
- **Client Conversion & Enquiries**: Interactive enquiry workflows, deep-linked WhatsApp enquiry paths, and client portal review.
- **Studio Dashboard**: Real-time management of leads, projects, deliverables, and service packages.
- **Automated Owner Alerts**: Instant notifications on new client submissions via WhatsApp.
- **Enterprise-ready Backend**: Supabase PostgreSQL with strict Row Level Security (RLS), automated audit logging, and Upstash Redis rate limiting.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Turbopack)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL 15+, RLS, Storage)
- **Maps**: [MapLibre GL](https://maplibre.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Rate Limiting**: [@upstash/ratelimit](https://upstash.com/) + Upstash Redis
- **Monitoring**: [Sentry](https://sentry.io/)

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prathik-05/jashoot-startup.git
   cd jashoot-startup
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the sample environment file:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials, Upstash Redis keys, and optional alert keys.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database & Migrations

Database migrations are located in `supabase/migrations/` and managed with the Supabase CLI.

For setup and deployment steps, refer to [DATABASE.md](./DATABASE.md).

```bash
# Validate migrations
node scripts/validate-migrations.mjs
```

---

## 🏗️ Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## 📄 License

Private repository. All rights reserved.
