"use client";

import React, { useState, useTransition } from "react";
import { updateLeadStageAction, deleteLeadAction } from "@/app/studio/actions";

export interface LeadItem {
  id: string;
  ref: string;
  name: string;
  phone: string;
  email: string | null;
  event_type: string | null;
  event_date: string | null;
  event_location: string | null;
  preferred_time: string | null;
  requirements: string | null;
  extra_details: string | null;
  stage: string;
  whatsapp_opened_at: string | null;
  created_at: string;
}

export interface BookingItem {
  id: string;
  ref: string;
  total_amount: number | null;
  advance_amount: number | null;
  state: string;
  shoot_date: string | null;
  shoot_location: string | null;
  created_at: string;
}

interface StudioDashboardProps {
  initialLeads: LeadItem[];
  initialBookings: BookingItem[];
  stats: {
    leadsCount: number;
    bookingsCount: number;
    projectsCount: number;
    unopenedWaCount: number;
  };
}

const STAGE_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  enquiry: {
    label: "New Enquiry",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  contacted: {
    label: "Contacted",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  quoted: {
    label: "Quote Sent",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
  awaiting_advance: {
    label: "Awaiting Advance",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
  },
  confirmed: {
    label: "Shoot Confirmed",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  abandoned: {
    label: "Drop-off",
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/30",
  },
};

export function StudioDashboard({
  initialLeads,
  initialBookings,
  stats,
}: StudioDashboardProps) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [activeTab, setActiveTab] = useState<"leads" | "bookings" | "services" | "guide">("leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Filter leads based on search query and selected stage
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchQuery.trim() ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.event_type && lead.event_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.event_location && lead.event_location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStage =
      selectedStage === "all" || lead.stage === selectedStage;

    return matchesSearch && matchesStage;
  });

  const handleStageChange = (leadId: string, newStage: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );

    startTransition(async () => {
      await updateLeadStageAction(leadId, newStage);
    });
  };

  const handleDeleteLead = (leadId: string, ref: string) => {
    if (!confirm(`Are you sure you want to delete enquiry #${ref}? This cannot be undone.`)) {
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    startTransition(async () => {
      await deleteLeadAction(leadId);
    });
  };

  const handleCopyBrief = (lead: LeadItem) => {
    const brief = [
      `JASHOOTS SHOOT BRIEF #${lead.ref}`,
      `Client: ${lead.name}`,
      `Phone: ${lead.phone}`,
      lead.email ? `Email: ${lead.email}` : null,
      `Shoot Type: ${lead.event_type || "Custom Shoot"}`,
      `Date: ${lead.event_date || "Not specified"}`,
      `Location: ${lead.event_location || "Hyderabad"}`,
      lead.preferred_time ? `Time: ${lead.preferred_time}` : null,
      lead.requirements ? `Requirements: ${lead.requirements}` : null,
      lead.extra_details ? `Notes: ${lead.extra_details}` : null,
      `Stage: ${STAGE_CONFIG[lead.stage]?.label || lead.stage}`,
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(brief);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const cleanPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10 ? `91${digits}` : digits;
  };

  return (
    <div className="space-y-8">
      {/* ── KPI HIGHLIGHT CARDS ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-mono-brand text-[10px] tracking-[0.18em] uppercase text-zinc-400">
              Total Enquiries
            </span>
            <span className="flex h-2 w-2 rounded-full bg-red animate-pulse" />
          </div>
          <p className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-white">
            {stats.leadsCount}
          </p>
          <p className="mt-1 text-[11px] text-zinc-400">Recorded in Supabase</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-mono-brand text-[10px] tracking-[0.18em] uppercase text-amber-400">
              New Enquiries
            </span>
            <span className="text-amber-400 text-xs font-bold">● ACTIVE</span>
          </div>
          <p className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-amber-400">
            {leads.filter((l) => l.stage === "enquiry").length}
          </p>
          <p className="mt-1 text-[11px] text-amber-400/80">Require team reply</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-mono-brand text-[10px] tracking-[0.18em] uppercase text-emerald-400">
              Confirmed Shoots
            </span>
            <span className="text-emerald-400 text-xs font-bold">✓ LOCKED</span>
          </div>
          <p className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-emerald-400">
            {leads.filter((l) => l.stage === "confirmed").length + stats.bookingsCount}
          </p>
          <p className="mt-1 text-[11px] text-emerald-400/80">Booked &amp; scheduled</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-4 sm:p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-mono-brand text-[10px] tracking-[0.18em] uppercase text-[#25D366]">
              WhatsApp Direct
            </span>
            <span className="flex h-2 w-2 rounded-full bg-[#25D366]" />
          </div>
          <p className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#25D366]">
            {Math.max(0, stats.leadsCount - stats.unopenedWaCount)}
          </p>
          <p className="mt-1 text-[11px] text-[#25D366]/80">Connected to chat</p>
        </div>
      </div>

      {/* ── NAVIGATION TABS ────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "leads"
              ? "bg-red text-white shadow-lg shadow-red/25"
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span>📥 Shoot Enquiries</span>
          <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px] font-mono-brand">
            {leads.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "bookings"
              ? "bg-red text-white shadow-lg shadow-red/25"
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span>🎬 Bookings &amp; Projects</span>
          <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px] font-mono-brand">
            {initialBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "services"
              ? "bg-red text-white shadow-lg shadow-red/25"
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span>💎 Pricing &amp; Packages Guide</span>
        </button>

        <button
          onClick={() => setActiveTab("guide")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "guide"
              ? "bg-red text-white shadow-lg shadow-red/25"
              : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span>⚡ Operations Cheat Sheet</span>
        </button>
      </div>

      {/* ── TAB 1: LEADS & ENQUIRIES ────────────────────────────────────── */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by client, phone, docket #, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-xl border border-white/10 bg-surface/80 pl-9 pr-4 text-xs text-white placeholder:text-zinc-500 focus:border-red focus:outline-none"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Stage filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedStage("all")}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono-brand uppercase tracking-wider transition-all cursor-pointer ${
                  selectedStage === "all"
                    ? "bg-white text-black font-bold"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                All ({leads.length})
              </button>
              {Object.entries(STAGE_CONFIG).map(([key, config]) => {
                const count = leads.filter((l) => l.stage === key).length;
                if (count === 0 && selectedStage !== key) return null;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedStage(key)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono-brand uppercase tracking-wider transition-all cursor-pointer ${
                      selectedStage === key
                        ? `${config.bg} ${config.color} border ${config.border} font-bold`
                        : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {config.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* List of Enquiries */}
          {filteredLeads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-surface/30 p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-zinc-500 mb-4">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">
                {searchQuery || selectedStage !== "all"
                  ? "No matching enquiries found"
                  : "No enquiries received yet"}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                {searchQuery || selectedStage !== "all"
                  ? "Try adjusting your search query or stage filter above."
                  : "When clients fill out the enquiry form on the website or click WhatsApp booking, their full shoot brief will appear here automatically."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredLeads.map((lead) => {
                const stageInfo = STAGE_CONFIG[lead.stage] || STAGE_CONFIG.enquiry;
                const formattedDate = lead.created_at
                  ? new Date(lead.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Recent";

                const replyWaUrl = `https://wa.me/${cleanPhone(lead.phone)}?text=${encodeURIComponent(
                  `Hi ${lead.name} 👋 This is JASHOOTS regarding your shoot enquiry #${lead.ref} for ${
                    lead.event_type || "your event"
                  }. Let's discuss details and lock your schedule!`
                )}`;

                return (
                  <div
                    key={lead.id}
                    className="group relative rounded-2xl border border-white/10 bg-surface/70 p-5 sm:p-6 backdrop-blur-md transition-all hover:border-white/20 hover:shadow-xl"
                  >
                    {/* Top Row: Docket & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-brand text-xs sm:text-sm font-bold text-red tracking-wider px-2.5 py-1 rounded-md bg-red/10 border border-red/20">
                          #{lead.ref}
                        </span>
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono-brand uppercase text-zinc-300">
                          {lead.event_type || "Shoot Enquiry"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-zinc-400 font-mono-brand">
                          {formattedDate}
                        </span>

                        {/* Stage Dropdown */}
                        <div className="relative">
                          <select
                            value={lead.stage}
                            onChange={(e) => handleStageChange(lead.id, e.target.value)}
                            disabled={isPending}
                            className={`rounded-lg px-2.5 py-1 text-[11px] font-mono-brand font-bold uppercase tracking-wider border cursor-pointer ${stageInfo.bg} ${stageInfo.color} ${stageInfo.border} focus:outline-none`}
                          >
                            {Object.entries(STAGE_CONFIG).map(([val, cfg]) => (
                              <option key={val} value={val} className="bg-zinc-900 text-white">
                                {cfg.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Client and Shoot Details */}
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-[10px] font-mono-brand uppercase tracking-wider text-zinc-400">
                          Client
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">{lead.name}</p>
                        <p className="mt-0.5 text-xs text-zinc-300 font-mono-brand">
                          {lead.phone}
                        </p>
                        {lead.email && (
                          <p className="text-[11px] text-zinc-400 truncate">{lead.email}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-mono-brand uppercase tracking-wider text-zinc-400">
                          Shoot Date &amp; Time
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {lead.event_date || "Date Pending"}
                        </p>
                        {lead.preferred_time && (
                          <p className="mt-0.5 text-xs text-zinc-400">
                            Time: {lead.preferred_time}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-mono-brand uppercase tracking-wider text-zinc-400">
                          Location / Venue
                        </p>
                        <p className="mt-1 text-sm font-bold text-white">
                          {lead.event_location || "Hyderabad (TBD)"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-mono-brand uppercase tracking-wider text-zinc-400">
                          WhatsApp Status
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          {lead.whatsapp_opened_at ? (
                            <span className="inline-flex items-center gap-1 text-xs text-[#25D366]">
                              <span className="size-1.5 rounded-full bg-[#25D366]" />
                              Client Launched Chat
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                              <span className="size-1.5 rounded-full bg-amber-400" />
                              Pending Verification
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Requirements / Notes if provided */}
                    {(lead.requirements || lead.extra_details) && (
                      <div className="mt-3 rounded-xl bg-white/[0.03] p-3 text-xs text-zinc-300 border border-white/5">
                        <span className="font-bold text-white/80">Brief Details: </span>
                        {lead.requirements || lead.extra_details}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <a
                          href={replyWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-2 font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#25D366]/20 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z" />
                          </svg>
                          <span>Chat on WhatsApp</span>
                        </a>

                        <button
                          onClick={() => handleCopyBrief(lead)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white px-3 py-2 font-sans font-medium text-xs tracking-wider transition-all border border-white/10 cursor-pointer"
                        >
                          {copiedId === lead.id ? (
                            <>
                              <span className="text-emerald-400">✓</span>
                              <span className="text-emerald-400 font-bold">Copied Brief!</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <span>Copy Brief</span>
                            </>
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteLead(lead.id, lead.ref)}
                        className="text-xs text-zinc-500 hover:text-red transition-colors p-1"
                        title="Delete test lead"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: BOOKINGS & PROJECTS ──────────────────────────────────── */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {initialBookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-surface/30 p-12 text-center">
              <h3 className="font-display text-lg font-bold text-white uppercase">
                No active bookings yet
              </h3>
              <p className="mt-2 text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                When an enquiry advances to a locked booking with advance payment received, you can create a booking record in the Supabase <code className="text-red">bookings</code> table to track shoot production and deliverable delivery.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {initialBookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-brand text-xs font-bold text-red">
                      #{b.ref}
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono-brand uppercase text-emerald-400 border border-emerald-500/20">
                      {b.state}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1 text-xs">
                    <p className="text-white">
                      <span className="text-zinc-400">Date:</span> {b.shoot_date || "TBD"}
                    </p>
                    <p className="text-white">
                      <span className="text-zinc-400">Venue:</span> {b.shoot_location || "Hyderabad"}
                    </p>
                    <p className="text-white">
                      <span className="text-zinc-400">Total:</span>{" "}
                      {b.total_amount ? `₹${b.total_amount.toLocaleString("en-IN")}` : "Custom Quote"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: PRICING & PACKAGES QUICK REFERENCE ───────────────────── */}
      {activeTab === "services" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-brand font-bold text-red">01 // AUTOMOBILE</span>
              <span className="text-xs font-bold text-white">₹2,000</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-white uppercase">Automobile Shoot</h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              60FPS speed ramps, exhaust flame audio sync, rolling shots on the ORR. 1 viral reel deliverable within 24–48 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-brand font-bold text-red">02 // EVENTS</span>
              <span className="text-xs font-bold text-white">₹2,000 / hr</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-white uppercase">Event &amp; Function Shoot</h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Hourly candid live coverage for birthdays, ceremonies, and private parties. Same-day highlight cut deliverable.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-brand font-bold text-red">03 // BRANDS</span>
              <span className="text-xs font-bold text-white">₹2,500</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-white uppercase">Brand &amp; Business Promo</h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Cafes, retail boutiques, and aesthetic macro shots in Banjara &amp; Jubilee Hills. 2 vertical promo reels with sound design.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-brand font-bold text-red">04 // FITNESS</span>
              <span className="text-xs font-bold text-white">₹1,500 – ₹2,000</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-white uppercase">Gym &amp; Creator Portfolio</h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Dramatic high-contrast lighting, heavy set audio sync, pump cover reveals, and athlete personal branding reels.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-brand font-bold text-red">05 // WEDDINGS</span>
              <span className="text-xs font-bold text-white">₹7,000</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-white uppercase">Wedding / Pre-Wedding / Sangeet</h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              4K ProRes master reel, couple teaser, and high-energy sangeet coverage. 48-hour delivery guarantee.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-brand font-bold text-red">06 // FESTIVALS</span>
              <span className="text-xs font-bold text-white">Custom Quote</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-white uppercase">Festivals &amp; Mega Events</h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Dhoolpet 4AM low-light masters, Visarjan energy, Ramanthapur Ka Raja, and mass crowd cinematography.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB 4: OPERATIONS CHEAT SHEET ──────────────────────────────── */}
      {activeTab === "guide" && (
        <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md space-y-6">
          <div>
            <h4 className="font-display text-base font-bold text-white uppercase">
              The JASHOOTS Lead-To-Delivery Pipeline
            </h4>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              How shoot bookings flow through your platform from website enquiry to final delivery:
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-5 text-xs">
            <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/5">
              <span className="font-mono-brand text-[10px] text-amber-400 font-bold uppercase">Step 1</span>
              <p className="mt-1 font-bold text-white">Enquiry Received</p>
              <p className="mt-1 text-[11px] text-zinc-400">Customer fills form on website. Stored in Supabase instantly.</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/5">
              <span className="font-mono-brand text-[10px] text-blue-400 font-bold uppercase">Step 2</span>
              <p className="mt-1 font-bold text-white">WhatsApp Chat</p>
              <p className="mt-1 text-[11px] text-zinc-400">Client connects on WhatsApp. Team checks availability &amp; crew schedule.</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/5">
              <span className="font-mono-brand text-[10px] text-purple-400 font-bold uppercase">Step 3</span>
              <p className="mt-1 font-bold text-white">Quote &amp; Advance</p>
              <p className="mt-1 text-[11px] text-zinc-400">Share package pricing. Lock booking with standard 30%–50% advance.</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/5">
              <span className="font-mono-brand text-[10px] text-emerald-400 font-bold uppercase">Step 4</span>
              <p className="mt-1 font-bold text-white">Shoot Execution</p>
              <p className="mt-1 text-[11px] text-zinc-400">Crew dispatches to venue with 4K camera gear, DJI gimbal, and audio kit.</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] p-3.5 border border-white/5">
              <span className="font-mono-brand text-[10px] text-red font-bold uppercase">Step 5</span>
              <p className="mt-1 font-bold text-white">Rapid Delivery</p>
              <p className="mt-1 text-[11px] text-zinc-400">Deliver color-graded 4K reels within 24–48 hours via Google Drive or Portal.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
