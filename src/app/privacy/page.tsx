import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How JASHOOTS collects, uses, and protects your personal information.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: "index,follow",
};

export default function PrivacyPage() {
  return (
    <Container className="py-14 sm:py-16">
      <h1 className="text-display text-3xl sm:text-5xl text-white">Privacy Policy</h1>
      <p className="mt-3 text-xs text-fog">Last updated: September 12, 2026</p>

      <div className="mt-8 space-y-6 text-xs text-fog leading-relaxed">
        <section>
          <h2 className="text-display text-lg mb-2 text-white">1. Information We Collect</h2>
          <p>
            When you submit an enquiry through our website, we collect the following personal information:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-fog/70">
            <li>Name</li>
            <li>Phone number (WhatsApp)</li>
            <li>Email address (optional)</li>
            <li>Event type, date, and location</li>
            <li>Any additional details you provide in the enquiry form</li>
          </ul>
          <p className="mt-2">
            We also collect standard web analytics data (page views, referral source, device type) through
            our conversion event tracking system.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">2. How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-fog/70">
            <li>Respond to your enquiry via WhatsApp</li>
            <li>Confirm availability and discuss your shoot requirements</li>
            <li>Manage your booking if you proceed past the enquiry stage</li>
            <li>Deliver your final content via the client portal</li>
            <li>Improve our services and website experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">3. Data Storage & Security</h2>
          <p>
            Your data is stored securely in our database (Supabase/PostgreSQL) with row-level security
            policies that restrict access to authorised personnel only. We do not sell, share, or rent
            your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">4. Third-Party Services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-fog/70">
            <li><strong>Supabase</strong> — database hosting and authentication</li>
            <li><strong>Vercel</strong> — website hosting and deployment</li>
            <li><strong>WhatsApp (Meta)</strong> — communication via wa.me deep links</li>
          </ul>
          <p className="mt-2">
            Each third-party service has its own privacy policy governing how they handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">5. Cookies & Tracking</h2>
          <p>
            Our website uses minimal tracking for conversion analytics (page views, enquiry submissions,
            WhatsApp clicks). We do not use advertising cookies or cross-site tracking. Session data is
            stored in localStorage, not cookies.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-fog/70">
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for data processing at any time</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact us via WhatsApp or email.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">7. Data Retention</h2>
          <p>
            We retain your enquiry data for as long as necessary to manage your booking and provide
            our services. If no booking is confirmed, enquiry data is retained for up to 12 months
            for follow-up purposes, then deleted.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page
            with an updated &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">9. Grievance Redressal & DPDP Act 2023 Compliance</h2>
          <p>
            In accordance with the Digital Personal Data Protection (DPDP) Act, 2023 and applicable Indian laws,
            JASHOOTS has designated a Grievance Officer to address questions, concerns, or grievances regarding
            the processing of personal data.
          </p>
          <div className="mt-3 card card-glow p-4 border border-white/10 rounded-xl space-y-1.5 text-fog">
            <p className="text-white font-medium text-xs">Grievance Redressal Officer:</p>
            <p><strong>Designation:</strong> Data Protection &amp; Grievance Lead, JASHOOTS</p>
            <p><strong>Location:</strong> Hyderabad, Telangana, India</p>
            <p><strong>Official Email:</strong> privacy@jashoots.com (or via Official WhatsApp Support)</p>
            <p className="text-[11px] text-fog/70 pt-1">
              Response SLA: All legitimate data requests and grievances are reviewed and resolved within 30 days.
              Users also retain the right to escalate unresolved grievances to the Data Protection Board of India (DPBI).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">10. Contact</h2>
          <p>
            For general questions about these policies or your bookings, contact us directly via WhatsApp
            or through our{" "}
            <a href="/enquire" className="text-red underline underline-offset-4 hover:text-red/80 transition">
              enquiry page
            </a>.
          </p>
        </section>
      </div>
    </Container>
  );
}
