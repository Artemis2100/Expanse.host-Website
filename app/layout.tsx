import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Chatwoot from "./components/Chatwoot";
import ScrollToTop from "./components/ScrollToTop";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    images: [
      {
        url: "/og/expanse-og.png",
        width: 1200,
        height: 630,
        alt: "Expanse Host",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ExpanseHost",
    creator: "@ExpanseHost",
    title:
      "Expanse Host — High‑Performance Minecraft, VPS and Dedicated Hosting",
    description:
      "Premium Minecraft, VPS, and dedicated hosting with enterprise DDoS protection, latest-gen hardware, and global presence.",
    images: ["/og/expanse-og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <CurrencyProvider>
          {children}
          <ScrollToTop />
          <Chatwoot />
        </CurrencyProvider>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1TQ8CNNC1E"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1TQ8CNNC1E');
          `}
        </Script>
      </body>
    </html>
  );
}
