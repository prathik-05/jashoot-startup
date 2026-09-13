import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;
let browserClient: SupabaseClient | null = null;

function env(key: string) {
  return process.env[key]?.trim() || "";
}

export function hasSupabaseEnv() {
  return Boolean(env("NEXT_PUBLIC_SUPABASE_URL") && env("SUPABASE_SERVICE_ROLE_KEY"));
}

/**
 * Server-only client. Service role bypasses RLS — use ONLY in server code
 * (API routes / server components) behind proper authorization checks.
 */
export function getServerClient(): SupabaseClient | null {
  const url = env("NEXT_PUBLIC_SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return null;
  if (!serverClient) {
    serverClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { "X-JASHOOTS-CONTEXT": "server" } },
    });
  }
  return serverClient;
}

/**
 * Browser-safe client (anon + RLS). Never include the service role key here.
 */
export function getBrowserClient(): SupabaseClient | null {
  const url = env("NEXT_PUBLIC_SUPABASE_URL");
  const key = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !key) return null;
  if (!browserClient) {
    browserClient = createClient(url, key, {
      global: { headers: { "X-JASHOOTS-CONTEXT": "browser" } },
    });
  }
  return browserClient;
}