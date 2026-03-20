import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DNS Management — Zone Management, DNSSEC & API | Expanse",
  description:
    "Enterprise DNS management with 23 record types, DNSSEC, zone management, delegation verification, change history, REST API, and multi-device sessions. Now in BETA.",
  keywords: [
    "DNS management",
    "DNSSEC",
    "zone management",
    "DNS records",
    "delegation",
    "REST API",
    "Expanse DNS",
  ],
  openGraph: {
    title: "DNS Management — Zone Management, DNSSEC & API | Expanse",
    description:
      "Enterprise DNS management with 23 record types, DNSSEC, zone management, and REST API. Now in BETA.",
  },
  alternates: {
    canonical: "https://www.expanse.host/dns",
  },
};

export default function DNSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
