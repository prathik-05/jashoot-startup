import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/schema";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StickyWhatsAppBar } from "@/components/ui/sticky-cta";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono-brand",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JASHOOTS — Shoot. Edit. Deliver.",
    template: "%s — JASHOOTS",
  },
  description:
    "Reels-first photo & video production in Hyderabad. Transparent packages, fast turnaround, one-tap WhatsApp enquiry.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "theme-color": "#0A0A0A",
  },
  openGraph: {
    type: "website",
    siteName: "JASHOOTS",
    title: "JASHOOTS — Shoot. Edit. Deliver.",
    description:
      "Professional reels, delivered within your promised turnaround. Hyderabad / India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JASHOOTS — Shoot. Edit. Deliver.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JASHOOTS — Shoot. Edit. Deliver.",
    description:
      "Reels-first photo & video production in Hyderabad. Transparent packages, fast turnaround, one-tap WhatsApp enquiry.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${spaceMono.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-body font-sans grain selection:bg-brand-red selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyWhatsAppBar />
      </body>
    </html>
  );
}