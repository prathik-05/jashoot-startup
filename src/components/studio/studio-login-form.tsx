"use client";

import { useActionState } from "react";
import { loginStudioAction, type StudioAuthState } from "@/app/studio/actions";

export function StudioLoginForm() {
  const [state, formAction, isPending] = useActionState<StudioAuthState | null, FormData>(
    loginStudioAction,
    null
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card card-glow p-6 sm:p-8 border border-white/10 backdrop-blur-xl bg-black/60 shadow-2xl rounded-2xl">
        <div className="flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="size-10 rounded-xl bg-red/10 border border-red/30 flex items-center justify-center text-red">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <div>
            <p className="font-mono-brand text-[10px] tracking-[0.2em] uppercase text-red font-semibold">
              Restricted Area
            </p>
            <h2 className="text-white text-lg font-medium tracking-tight">
              Studio Access
            </h2>
          </div>
        </div>

        <p className="mt-4 text-xs text-fog leading-relaxed">
          Operational control dashboard. Authenticate with your administrator access key to manage pipeline health, bookings, and CMS contents.
        </p>

        {state?.error && (
          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-red/40 bg-red/10 p-3 text-xs text-red">
            <svg
              className="size-4 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p>{state.error}</p>
          </div>
        )}

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="accessKey"
              className="block font-mono-brand text-[10px] uppercase tracking-[0.16em] text-fog/80 mb-2"
            >
              Administrator Access Key
            </label>
            <div className="relative">
              <input
                id="accessKey"
                name="accessKey"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter secret access key…"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pl-10 text-sm text-white placeholder-fog/40 outline-none transition focus:border-red/50 focus:ring-1 focus:ring-red/50 font-mono"
              />
              <svg
                className="absolute left-3.5 top-3.5 size-4 text-fog/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-red/90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red/20 font-mono-brand"
          >
            {isPending ? (
              <>
                <span className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying…</span>
              </>
            ) : (
              <>
                <span>Unlock Studio</span>
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[10px] text-fog/50 font-mono">
          <span>COOKIE SESSION AUTH</span>
          <span>HTTPONLY / SAMESITE</span>
        </div>
      </div>
    </div>
  );
}
