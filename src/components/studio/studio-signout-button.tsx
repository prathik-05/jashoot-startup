"use client";

import { useTransition } from "react";
import { logoutStudioAction } from "@/app/studio/actions";

export function StudioSignoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await logoutStudioAction();
      } catch {
        // redirect might throw NEXT_REDIRECT in Next.js
      } finally {
        // Enforce hard reload to wipe client router cache & bfcache
        window.location.replace("/studio");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-xl border border-red/30 bg-red/10 px-3.5 py-1.5 text-xs font-mono-brand font-bold uppercase tracking-wider text-red hover:bg-red hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
      title="Lock Studio & End Session"
    >
      <svg
        className="size-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span>{isPending ? "Locking..." : "Sign Out"}</span>
    </button>
  );
}
