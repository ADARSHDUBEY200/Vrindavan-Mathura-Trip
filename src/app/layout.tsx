import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Vrindavan & Mathura Pilgrimage Tours`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fff9f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${poppins.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lift transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
