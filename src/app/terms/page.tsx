import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using JASHOOTS services and website.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: "index,follow",
};

export default function TermsPage() {
  return (
    <Container className="py-14 sm:py-16">
      <h1 className="text-display text-3xl sm:text-5xl text-white">Terms of Service</h1>
      <p className="mt-3 text-xs text-fog">Last updated: September 12, 2026</p>

      <div className="mt-8 space-y-6 text-xs text-fog leading-relaxed">
        <section>
          <h2 className="text-display text-lg mb-2 text-white">1. Acceptance of Terms</h2>
          <p>
            By using the JASHOOTS website and services, you agree to these Terms of Service. If you
            do not agree, please do not use our website or submit an enquiry.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-red">2. Enquiry Is Not a Booking</h2>
          <div className="border border-red/20 bg-red/[0.03] p-4 rounded-xl">
            <p className="font-bold text-white text-xs">
              Submitting an enquiry through our website does NOT constitute a confirmed booking.
            </p>
            <p className="mt-2">
              An enquiry is an expression of interest. Your booking is only confirmed after:
            </p>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-fog/70">
              <li>You submit an enquiry via our website or WhatsApp</li>
              <li>Our team reviews your enquiry and checks availability</li>
              <li>Our team confirms the shoot details, timing, and pricing on WhatsApp</li>
              <li>You receive explicit written confirmation from JASHOOTS</li>
            </ol>
            <p className="mt-3 font-bold text-white text-xs">
              Until you receive explicit confirmation from JASHOOTS, no time slot, date, or service
              is reserved for you. No payment is required at the enquiry stage.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">3. Services</h2>
          <p>
            JASHOOTS provides photography and videography services including event coverage, wedding
            coverage, automotive shoots, content creation, and related production services. All
            services are subject to availability and confirmation by our team.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">4. Pricing & Payment</h2>
          <p>
            Package prices displayed on our website are indicative and subject to confirmation.
            Final pricing, inclusions, and payment terms will be agreed upon during the WhatsApp
            confirmation process. Payment terms will be specified in your confirmed booking agreement.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">5. Content Delivery</h2>
          <p>
            Final content is delivered via private link (Google Drive, WeTransfer, or similar)
            after your approval through the client portal. Delivery timelines are specified in
            your confirmed package and are counted from the shoot date, not the enquiry date.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">6. Cancellation</h2>
          <p>
            Cancellation terms will be specified in your confirmed booking agreement. Enquiries
            that do not result in a confirmed booking can be withdrawn at any time without penalty.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">7. Intellectual Property</h2>
          <p>
            Upon full payment, you receive a license to use the delivered content for personal or
            commercial purposes as agreed in your booking. JASHOOTS retains the right to use
            content for portfolio and marketing purposes unless otherwise agreed in writing.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">8. Limitation of Liability</h2>
          <p>
            JASHOOTS shall not be liable for any indirect, incidental, or consequential damages
            arising from the use of our services. Our total liability shall not exceed the total
            amount paid for the specific service in question.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective
            immediately upon posting. Continued use of our website constitutes acceptance of
            updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">10. Governing Law &amp; Jurisdiction</h2>
          <p>
            These terms and any contracts formed hereunder shall be governed by and construed in accordance with
            the laws of India. Any disputes arising out of or related to our services or website shall be subject
            to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
          </p>
        </section>

        <section>
          <h2 className="text-display text-lg mb-2 text-white">11. Contact &amp; Grievances</h2>
          <p>
            reach out to our team directly via our Official WhatsApp Channel or email{" "}
            <span className="text-white">legal@jashoots.com</span>. You may also submit
            an initial request through our{" "}
            <a href="/enquire" className="text-red underline underline-offset-4 hover:text-red/80 transition">
              enquiry page
            </a>.
          </p>
        </section>
      </div>
    </Container>
  );
}
