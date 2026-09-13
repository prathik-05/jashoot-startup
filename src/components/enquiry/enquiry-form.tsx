"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Service } from "@/lib/schema";
import { trackEvent } from "@/lib/track";
import { waMeLink } from "@/lib/whatsapp";

interface Result {
  ref: string;
  waUrl: string;
}

const SHOOT_OPTIONS = [
  { value: "automobile", label: "Automobile / Bike & Car Shoot (~₹2,000)", slug: "bike shoot" },
  { value: "function-events", label: "Function / Event Shoot (Hourly) (~₹2,000 / hr)", slug: "hourly-coverage" },
  { value: "brand-product", label: "Brand & Business Promo (~₹2,500)", slug: "brand shoot" },
  { value: "fitness-creator", label: "Gym & Creator Portfolio (~₹1,500 – ₹2,000)", slug: "instant-reel" },
  { value: "wedding-sangeet", label: "Wedding / Pre-Wedding / Sangeet (~₹7,000)", slug: "wedding" },
  { value: "other", label: "Other (Describe your own shoot type)", slug: "" },
];

export function EnquiryForm({
  presetService = "",
}: {
  services?: Service[];
  presetService?: string;
}) {
  const startedRef = useRef(false);

  // Match preset or default to first
  const initialOption = useMemo(() => {
    if (!presetService) return "";
    const matched = SHOOT_OPTIONS.find(
      (opt) => opt.value === presetService || opt.slug === presetService,
    );
    return matched ? matched.value : "other";
  }, [presetService]);

  const [selectedShoot, setSelectedShoot] = useState(initialOption);
  const [customShootType, setCustomShootType] = useState(
    initialOption === "other" && presetService ? presetService : "",
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [requirements, setRequirements] = useState("");
  const budgetInterest = "";
  const [extraDetails, setExtraDetails] = useState("");

  const [busy, setBusy] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  // Minimum (today) and Maximum (1 year out) dates for calendar
  const { minDate, maxDate } = useMemo(() => {
    const now = new Date();
    const min = now.toISOString().split("T")[0];
    const maxObj = new Date();
    maxObj.setFullYear(maxObj.getFullYear() + 1);
    const max = maxObj.toISOString().split("T")[0];
    return { minDate: min, maxDate: max };
  }, []);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("enquiry_started", {
        page: "/enquire",
        content: presetService || "enquiry-form",
      });
    }
  }, [presetService]);

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      errors.name = "Please enter your full name (minimum 2 characters).";
    }

    const cleanDigits = phone.replace(/\D/g, "");
    if (!cleanDigits || cleanDigits.length < 10) {
      errors.phone = "Please enter a valid 10-digit WhatsApp number (e.g. 9876543210).";
    }

    if (!selectedShoot) {
      errors.selectedShoot = "Please select a shoot / event type.";
    } else if (selectedShoot === "other" && !customShootType.trim()) {
      errors.customShootType = "Please describe your custom shoot type.";
    }

    if (!eventDate) {
      errors.eventDate = "Please choose your shoot date from the calendar.";
    }

    if (!eventLocation.trim() || eventLocation.trim().length < 2) {
      errors.eventLocation = "Please specify the shoot location or venue in Hyderabad.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError(null);

    if (!validate()) {
      setServerError("Please fix the highlighted errors before submitting.");
      return;
    }

    setBusy(true);
    try {
      const chosenOption = SHOOT_OPTIONS.find((o) => o.value === selectedShoot);
      const computedEventType =
        selectedShoot === "other"
          ? customShootType.trim()
          : chosenOption?.label.split(" (")[0] || selectedShoot;

      const computedServiceSlug = chosenOption?.slug || selectedShoot;

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          serviceSlug: computedServiceSlug,
          eventType: computedEventType,
          eventDate,
          eventLocation: eventLocation.trim(),
          preferredTime: preferredTime.trim(),
          requirements: requirements.trim(),
          budgetInterest: budgetInterest.trim(),
          extraDetails: extraDetails.trim(),
          sourcePage: "/enquire",
          sourceContent: computedServiceSlug || "enquiry-form",
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || body.error || "Submission failed. Please check your inputs.");
      }

      setResult({ ref: body.ref, waUrl: body.waUrl });
      trackEvent("enquiry_submitted", {
        page: "/enquire",
        content: computedServiceSlug || "enquiry-form",
        leadRef: body.ref,
      });

      // Auto-open WhatsApp immediately
      if (body.waUrl) {
        setTimeout(() => {
          window.location.href = body.waUrl;
        }, 700);
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <div className="border border-red/30 bg-surface/90 p-8 text-center sm:p-10 rounded-2xl shadow-2xl backdrop-blur-md animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-mono-brand text-[10px] tracking-[0.16em] uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          OPENING WHATSAPP...
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-white">
          SHOOT ENQUIRY REGISTERED
        </h2>
        <p className="font-mono-brand mt-3 text-3xl sm:text-5xl font-bold text-red tracking-wider">
          #{result.ref}
        </p>
        <p className="mx-auto mt-4 max-w-md text-xs sm:text-sm text-white/70 leading-relaxed">
          Your shoot details are saved in the JASHOOTS production queue. Redirecting you into WhatsApp now so you can send your shoot brief directly to our team!
        </p>
        <div className="mt-8">
          <a
            href={result.waUrl}
            onClick={() => trackEvent("whatsapp_opened", { page: "/enquire", leadRef: result.ref })}
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black px-8 py-4 rounded-xl font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#25D366]/30 cursor-pointer"
          >
            <span>TAP HERE IF WHATSAPP DIDN&apos;T OPEN AUTOMATICALLY →</span>
          </a>
        </div>
        <p className="mt-4 text-center text-[10px] uppercase font-mono-brand text-white/40">
          Enquiry Registered · Direct chat with JASHOOTS Production Crew
        </p>
      </div>
    );
  }

  const baseInput =
    "h-11 w-full border bg-surface/80 px-3.5 text-xs text-white placeholder:text-white/30 outline-none transition-colors rounded-xl focus:border-red";

  return (
    <form onSubmit={submit} noValidate className="card card-glow p-5 sm:p-7 backdrop-blur-sm border-white/[0.08]">
      {/* Validation Alert Box */}
      {serverError && (
        <div role="alert" className="mb-6 border border-red/40 bg-red/10 p-4 rounded-xl text-xs text-white">
          <div className="flex items-center gap-2 font-bold text-red uppercase tracking-wider text-[11px] mb-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Please Review Your Enquiry</span>
          </div>
          <p className="text-white/80">{serverError}</p>
          {Object.keys(formErrors).length > 0 && (
            <ul className="mt-2 list-disc list-inside space-y-1 text-white/70 text-[11px]">
              {Object.values(formErrors).map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Fieldset 1: Customer Contact */}
      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className="eyebrow mb-2 text-red font-mono-brand text-[11px] tracking-[0.16em] uppercase">
          01 // Client Information
        </legend>

        {/* Name */}
        <label className="flex flex-col gap-1 text-xs text-white/70">
          <span>Name *</span>
          <input
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="Your full name"
            className={`${baseInput} ${formErrors.name ? "border-red ring-1 ring-red/50" : "border-white/10"}`}
            maxLength={120}
          />
          {formErrors.name && (
            <span className="text-red text-[11px]">{formErrors.name}</span>
          )}
        </label>

        {/* WhatsApp Number */}
        <label className="flex flex-col gap-1 text-xs text-white/70">
          <span>WhatsApp Number *</span>
          <input
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: "" }));
            }}
            placeholder="10-digit WhatsApp number (e.g. 9876543210)"
            inputMode="tel"
            className={`${baseInput} ${formErrors.phone ? "border-red ring-1 ring-red/50" : "border-white/10"}`}
            maxLength={20}
          />
          {formErrors.phone && (
            <span className="text-red text-[11px]">{formErrors.phone}</span>
          )}
        </label>

        {/* Email */}
        <label className="flex flex-col gap-1 text-xs text-white/70 sm:col-span-2">
          <span>Email Address (Optional)</span>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="you@email.com"
            inputMode="email"
            className={`${baseInput} ${formErrors.email ? "border-red ring-1 ring-red/50" : "border-white/10"}`}
            maxLength={160}
          />
          {formErrors.email && (
            <span className="text-red text-[11px]">{formErrors.email}</span>
          )}
        </label>
      </fieldset>

      {/* Fieldset 2: Shoot Details */}
      <fieldset className="mt-8 grid gap-3 sm:grid-cols-2">
        <legend className="eyebrow mb-2 text-red font-mono-brand text-[11px] tracking-[0.16em] uppercase">
          02 // Shoot Specifications
        </legend>

        {/* Single Event / Shoot Type Selector */}
        <label className="flex flex-col gap-1 text-xs text-white/70 sm:col-span-2">
          <span>Shoot / Event Type *</span>
          <select
            value={selectedShoot}
            onChange={(e) => {
              setSelectedShoot(e.target.value);
              if (formErrors.selectedShoot) setFormErrors((prev) => ({ ...prev, selectedShoot: "" }));
            }}
            className={`${baseInput} bg-[#141418] cursor-pointer ${
              formErrors.selectedShoot ? "border-red ring-1 ring-red/50" : "border-white/10"
            }`}
          >
            <option value="">Select a shoot package / type…</option>
            {SHOOT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {formErrors.selectedShoot && (
            <span className="text-red text-[11px]">{formErrors.selectedShoot}</span>
          )}
        </label>

        {/* Custom Shoot Type (Revealed when "Other" is chosen) */}
        {selectedShoot === "other" && (
          <label className="flex flex-col gap-1 text-xs text-white/70 sm:col-span-2 animate-fade-up">
            <span>Specify Your Shoot Type *</span>
            <input
              required
              value={customShootType}
              onChange={(e) => {
                setCustomShootType(e.target.value);
                if (formErrors.customShootType) setFormErrors((prev) => ({ ...prev, customShootType: "" }));
              }}
              placeholder="e.g. Festival, Drone Shoot, Nightclub, Food Vlog, Fashion Walk..."
              className={`${baseInput} ${formErrors.customShootType ? "border-red ring-1 ring-red/50" : "border-white/10"}`}
              maxLength={160}
            />
            {formErrors.customShootType && (
              <span className="text-red text-[11px]">{formErrors.customShootType}</span>
            )}
          </label>
        )}

        {/* Event Date with Calendar */}
        <label className="flex flex-col gap-1 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Event Date * (Calendar)</span>
          </span>
          <input
            type="date"
            min={minDate}
            max={maxDate}
            value={eventDate}
            onChange={(e) => {
              setEventDate(e.target.value);
              if (formErrors.eventDate) setFormErrors((prev) => ({ ...prev, eventDate: "" }));
            }}
            className={`${baseInput} cursor-pointer text-white [color-scheme:dark] ${
              formErrors.eventDate ? "border-red ring-1 ring-red/50" : "border-white/10"
            }`}
          />
          {formErrors.eventDate && (
            <span className="text-red text-[11px]">{formErrors.eventDate}</span>
          )}
        </label>

        {/* Shoot Location */}
        <label className="flex flex-col gap-1 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Venue / Area in Hyderabad *</span>
          </span>
          <input
            required
            value={eventLocation}
            onChange={(e) => {
              setEventLocation(e.target.value);
              if (formErrors.eventLocation) setFormErrors((prev) => ({ ...prev, eventLocation: "" }));
            }}
            placeholder="e.g. Banjara Hills, Jubilee Hills, Gachibowli..."
            className={`${baseInput} ${formErrors.eventLocation ? "border-red ring-1 ring-red/50" : "border-white/10"}`}
            maxLength={240}
          />
          {formErrors.eventLocation && (
            <span className="text-red text-[11px]">{formErrors.eventLocation}</span>
          )}
        </label>

        {/* Preferred Time */}
        <label className="flex flex-col gap-1 text-xs text-white/70">
          <span>Preferred Time (Optional)</span>
          <input
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            placeholder="Morning / 5:00 PM / Golden Hour"
            className={`${baseInput} border-white/10`}
            maxLength={64}
          />
        </label>

        {/* Requirements */}
        <label className="flex flex-col gap-1 text-xs text-white/70">
          <span>Deliverables / Reel Count</span>
          <input
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. 2 Reels, 1 Teaser, 4K Stills"
            className={`${baseInput} border-white/10`}
            maxLength={2000}
          />
        </label>

        {/* Additional Details */}
        <label className="flex flex-col gap-1 text-xs text-white/70 sm:col-span-2">
          <span>Additional Notes &amp; Shoot Vision (Optional)</span>
          <textarea
            value={extraDetails}
            onChange={(e) => setExtraDetails(e.target.value)}
            placeholder="Any specific music, aesthetic, or timing requirements..."
            rows={3}
            className="w-full border border-white/10 bg-surface/80 p-3.5 text-xs text-white placeholder:text-white/30 outline-none transition-colors rounded-xl focus:border-red resize-none"
            maxLength={2000}
          />
        </label>
      </fieldset>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={busy}
          className="w-full h-[52px] rounded-xl bg-red hover:bg-[#ff3535] text-white font-sans font-bold text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-red/25 hover:shadow-red/40 disabled:opacity-60 cursor-pointer"
        >
          {busy ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>SENDING ENQUIRY…</span>
            </span>
          ) : (
            <span>SEND ENQUIRY</span>
          )}
        </button>
        <p className="mt-3 text-center text-[10px] uppercase font-mono-brand text-white/35">
          One form → One structured WhatsApp brief · Zero spam guaranteed
        </p>
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-center gap-1.5 text-[11px] text-white/50">
          <span>Need immediate answers?</span>
          <a
            href={waMeLink("Hi JASHOOTS, I have a question about booking a shoot.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:underline font-mono font-medium flex items-center gap-1"
          >
            <span>Official WhatsApp Direct Line</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>
    </form>
  );
}