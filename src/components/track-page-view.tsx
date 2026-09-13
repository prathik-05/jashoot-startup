"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/track";

/** Fires a page_view conversion event once per route change (A8). */
export function TrackPageView() {
  const path = usePathname();
  useEffect(() => {
    trackEvent("page_view", { page: path });
  }, [path]);
  return null;
}