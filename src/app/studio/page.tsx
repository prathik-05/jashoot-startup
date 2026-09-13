import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerClient, hasSupabaseEnv } from "@/lib/supabase";
import { TrackPageView } from "@/components/track-page-view";
import { Container } from "@/components/ui/container";
import { StudioLoginForm } from "@/components/studio/studio-login-form";
import { StudioSignoutButton } from "@/components/studio/studio-signout-button";
import { StudioDashboard, type LeadItem, type BookingItem } from "@/components/studio/studio-dashboard";
import {
  getStudioAccessKey,
  generateStudioSessionToken,
  isValidStudioSession,
} from "@/lib/studio-auth";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Studio — JASHOOTS",
  robots: "noindex,nofollow",
};

/**
 * JASHOOTS Studio — Protected Operational Surface.
 * Secured with strict httpOnly, SameSite=Strict cookie-based session tokens.
 * Query parameter authentication (?key=) is completely disabled for security.
 */
export default async function StudioPage() {
  const configured = hasSupabaseEnv();
  const configuredKey = getStudioAccessKey();

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("studio_session")?.value;
  const isAuthenticated = isValidStudioSession(sessionToken);

  // If a stale or invalid session token exists, wipe it immediately
  if (sessionToken && !isAuthenticated) {
    cookieStore.set("studio_session", "", { path: "/", maxAge: 0, expires: new Date(0) });
    cookieStore.set("studio_session", "", { path: "/studio", maxAge: 0, expires: new Date(0) });
  }

  if (!configured) {
    return (
      <>
        <TrackPageView />
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl mx-auto border border-white/10 bg-surface/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono-brand text-[10px] tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              DATABASE CONFIGURATION NEEDED
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              Connect Supabase to Enable Studio
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              JASHOOTS Studio requires a connected Supabase Postgres database to securely manage shoot enquiries, client leads, and real-time operations.
            </p>

            <div className="mt-6 rounded-xl border border-white/5 bg-black/40 p-5 space-y-3 text-xs">
              <p className="font-bold text-white font-mono-brand uppercase text-[11px] tracking-wider text-red">
                Setup Checklist:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                <li>
                  Add your keys to <code className="text-red">.env.local</code>:
                  <div className="mt-1.5 font-mono text-[11px] text-zinc-400 bg-black/50 p-2.5 rounded-lg border border-white/5 space-y-1">
                    <div>NEXT_PUBLIC_SUPABASE_URL=https://...</div>
                    <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=...</div>
                    <div>SUPABASE_SERVICE_ROLE_KEY=...</div>
                    <div>STUDIO_ACCESS_KEY=your_secret_password</div>
                  </div>
                </li>
                <li>
                  Run the migration files in <code className="text-white">supabase/migrations/</code> in the Supabase SQL Editor.
                </li>
                <li>Restart your dev server with <code className="text-white">npm run dev</code>.</li>
              </ol>
            </div>
          </div>
        </Container>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <TrackPageView />
        <Container className="py-14 sm:py-20">
          <StudioLoginForm />
        </Container>
      </>
    );
  }

  const supabase = getServerClient()!;
  const [
    leadsCountRes,
    bookingsCountRes,
    projectsCountRes,
    abandonedRes,
    leadsDataRes,
    bookingsDataRes,
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("ref", { count: "exact", head: true })
      .is("whatsapp_opened_at", null)
      .neq("stage", "cancelled"),
    supabase
      .from("leads")
      .select("id, ref, name, phone, email, event_type, event_date, event_location, preferred_time, requirements, extra_details, stage, whatsapp_opened_at, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("bookings")
      .select("id, ref, total_amount, advance_amount, state, shoot_date, shoot_location, created_at")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const rawLeads = (leadsDataRes.data as LeadItem[]) || [];
  const rawBookings = (bookingsDataRes.data as BookingItem[]) || [];

  const stats = {
    leadsCount: leadsCountRes.count ?? rawLeads.length,
    bookingsCount: bookingsCountRes.count ?? rawBookings.length,
    projectsCount: projectsCountRes.count ?? 0,
    unopenedWaCount: abandonedRes.count ?? 0,
  };

  return (
    <>
      <TrackPageView />
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red/10 border border-red/30 text-red font-mono-brand text-[10px] tracking-[0.2em] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              LIVE OPERATIONS // HYDERABAD FLEET
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              Studio Command Center
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              Manage client shoot enquiries, track pipeline conversion, and coordinate live crew dispatch.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StudioSignoutButton />
          </div>
        </div>

        <div className="mt-8">
          <StudioDashboard
            initialLeads={rawLeads}
            initialBookings={rawBookings}
            stats={stats}
          />
        </div>
      </Container>
    </>
  );
}