"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getStudioAccessKey,
  generateStudioSessionToken,
} from "@/lib/studio-auth";

import crypto from "crypto";

export interface StudioAuthState {
  error?: string;
  success?: boolean;
}

export async function loginStudioAction(
  _prevState: StudioAuthState | null,
  formData: FormData
): Promise<StudioAuthState> {
  const enteredKey = formData.get("accessKey")?.toString().trim();
  const configuredKey = getStudioAccessKey();

  if (!configuredKey) {
    return { error: "STUDIO_ACCESS_KEY is not configured in the server environment." };
  }

  // Brute-force protection: max 5 login attempts per 15 minutes
  const { rateLimit } = await import("@/lib/rate-limit");
  const limiter = await rateLimit("studio_login_brute_protect", {
    windowMs: 15 * 60 * 1000,
    max: 5,
  });
  if (!limiter.allowed) {
    return {
      error: "Too many failed login attempts. Studio access locked for 15 minutes.",
    };
  }

  // Constant-time key comparison to prevent timing attacks
  const enteredBuf = Buffer.from(enteredKey || "");
  const configBuf = Buffer.from(configuredKey);
  const isMatch =
    enteredBuf.length === configBuf.length &&
    crypto.timingSafeEqual(enteredBuf, configBuf);

  if (!isMatch) {
    return { error: "Invalid access key. Access denied." };
  }

  const token = generateStudioSessionToken(configuredKey);
  const cookieStore = await cookies();

  // Set uniform strict cookie across root domain with 8-hour expiration
  cookieStore.set("studio_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  // Clean up any legacy path="/studio" cookie
  cookieStore.set("studio_session", "", {
    path: "/studio",
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/studio", "layout");
  redirect("/studio");
}

export async function logoutStudioAction(): Promise<void> {
  const cookieStore = await cookies();

  // Nuclear wipe across all paths with past expiration
  cookieStore.set("studio_session", "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });
  cookieStore.set("studio_session", "", {
    path: "/studio",
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
  });
  cookieStore.delete("studio_session");

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/studio", "layout");
  revalidatePath("/studio", "page");
  redirect("/studio");
}

export async function updateLeadStageAction(
  leadId: string,
  stage: string
): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("studio_session")?.value;
  const { isValidStudioSession } = await import("@/lib/studio-auth");
  if (!isValidStudioSession(sessionToken)) {
    return { success: false, error: "Unauthorized" };
  }

  const { getServerClient } = await import("@/lib/supabase");
  const supabase = getServerClient();
  if (!supabase) {
    return { success: false, error: "Database not connected" };
  }

  const { error } = await supabase
    .from("leads")
    .update({ stage, updated_at: new Date().toISOString() })
    .eq("id", leadId);

  if (error) {
    return { success: false, error: error.message };
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/studio");
  return { success: true };
}

export async function deleteLeadAction(
  leadId: string
): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("studio_session")?.value;
  const { isValidStudioSession } = await import("@/lib/studio-auth");
  if (!isValidStudioSession(sessionToken)) {
    return { success: false, error: "Unauthorized" };
  }

  const { getServerClient } = await import("@/lib/supabase");
  const supabase = getServerClient();
  if (!supabase) {
    return { success: false, error: "Database not connected" };
  }

  const { error } = await supabase.from("leads").delete().eq("id", leadId);
  if (error) {
    return { success: false, error: error.message };
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/studio");
  return { success: true };
}
