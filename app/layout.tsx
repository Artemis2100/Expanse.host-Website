import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Chatwoot from "./components/Chatwoot";
import ScrollToTop from "./components/ScrollToTop";
import ServiceWorker from "./components/ServiceWorker";
import PreconnectLinks from "./components/PreconnectLinks";
import PlausibleAnalytics from "./components/PlausibleAnalytics";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Reduced from 4 to 3 weights
  display: "swap",
  preload: false, // Disable preload for faster LCP
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.expanse.host"),
  title: {
    default: "Expanse Host",
    template: "%s | Expanse Host",
  },
  description:
    "High‑performance Minecraft hosting, VPS, and dedicated servers with enterprise DDoS protection, low latency global network, and 24/7 support.",
  keywords: [
    "Minecraft hosting",
    "VPS hosting",
    "Dedicated servers",
    "Ryzen 9 9950X",
    "DDoS protection",
    "Low latency",
    "Expanse Host",
    "Game servers",
    "Web hosting",
    "NVMe",
  ],
  openGraph: {
    type: "website",
    url: "https://www.expanse.host",
    siteName: "Expanse Host",
    title:
      "Expanse Host — High‑Performance Minecraft, VPS and Dedicated Hosting",
    description:
      "Premium Minecraft, VPS, and dedicated hosting with enterprise DDoS protection, latest-gen hardware, and global presence.",
  },
  twitter: {
    card: "summary",
    site: "@ExpanseHost",
    creator: "@ExpanseHost",
    title:
      "Expanse Host — High‑Performance Minecraft, VPS and Dedicated Hosting",
    description:
      "Premium Minecraft, VPS, and dedicated hosting with enterprise DDoS protection, latest-gen hardware, and global presence.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#3b82f6",
  },
  // Add preconnect links via metadata
  alternates: {
    canonical: "https://www.expanse.host",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${montserrat.variable} antialiased overflow-x-hidden`}
      >
        <PlausibleAnalytics />
        <PreconnectLinks />
        <ServiceWorker />
        <CurrencyProvider>
          {children}
          <ScrollToTop />
          <Chatwoot />
        </CurrencyProvider>
        {/* Google Analytics - Deferred even further */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1TQ8CNNC1E"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1TQ8CNNC1E', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
