"use client";

import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import {
  FiGlobe,
  FiLock,
  FiRefreshCw,
  FiDownload,
  FiCode,
  FiMonitor,
  FiCheckCircle,
  FiShield,
  FiDatabase,
  FiUsers,
  FiServer,
  FiArrowRight,
  FiList,
  FiClock,
} from "react-icons/fi";
import Link from "next/link";

const featureCards = [
  {
    title: "23 DNS record types",
    description: "From A to SVCB, HTTPS, and TLSA",
    icon: FiList,
  },
  {
    title: "DNSSEC built-in",
    description: "Enable, rotate keys, view DS records",
    icon: FiShield,
  },
  {
    title: "Change history & rollback",
    description: "See and undo edits",
    icon: FiClock,
  },
  {
    title: "Import & export",
    description: "JSON, CSV, BIND",
    icon: FiDownload,
  },
  {
    title: "REST API",
    description: "Full programmatic access",
    icon: FiCode,
  },
  {
    title: "Multi-device sessions",
    description: "Manage logins across devices",
    icon: FiMonitor,
  },
  {
    title: "Delegation verification",
    description: "Confirm NS and zone status",
    icon: FiCheckCircle,
  },
  {
    title: "Record locking",
    description: "Protect records from changes",
    icon: FiLock,
  },
];

const zoneFeatures = [
  "Create and delete DNS zones",
  "Scan existing domains and import records before creating a zone",
  "Zone status (PENDING, ACTIVE, BROKEN) with delegation checks",
  "Zone reminder date for renewals and delegation",
  "Delegation check to confirm NS records at parent zones",
];

const recordTypes =
  "A, AAAA, CNAME, MX, TXT, SRV, NS, PTR, CAA, SSHFP, TLSA, SVCB, HTTPS, NAPTR, HINFO, CERT, SMIMEA, OPENPGPKEY, URI, LOC, RP, ZONEMD, SPF";

const recordFeatures = [
  "23 record types supported",
  "Record type descriptions and format help in the add-record modal",
  "Full CRUD on records",
  "Record locking to stop accidental changes",
  "Propagation check for common types",
  "Filter by all supported record types",
];

const dnssecFeatures = [
  "Enable or disable DNSSEC per zone",
  "Key rotation (CSK)",
  "DS records for parent zone delegation",
];

const historyFeatures = [
  "Change history with rollback",
  "Export to JSON, CSV, or BIND",
  "Import from JSON, CSV, or BIND with dry-run preview",
];

const accountFeatures = [
  "Multi-device sessions (see and revoke devices)",
  "API keys for programmatic access",
  "Email verification",
  "Password reset and change",
];

const apiFeatures = [
  "REST API for automation and integrations",
  "Bearer token authentication",
  "Zone and record management endpoints",
];

const allFeatureSections = [
  {
    title: "Zone Management",
    icon: FiGlobe,
    features: zoneFeatures,
  },
  {
    title: "DNS Records",
    icon: FiDatabase,
    features: recordFeatures,
    subtitle: recordTypes,
  },
  {
    title: "DNSSEC",
    icon: FiShield,
    features: dnssecFeatures,
  },
  {
    title: "History & Export/Import",
    icon: FiRefreshCw,
    features: historyFeatures,
  },
  {
    title: "Account & Security",
    icon: FiUsers,
    features: accountFeatures,
  },
  {
    title: "REST API",
    icon: FiCode,
    features: apiFeatures,
  },
];

function FeatureCard({
  feature,
}: {
  feature: (typeof featureCards)[0];
  index: number;
}) {
  const Icon = feature.icon as React.ComponentType<{ className?: string }>;
  return (
    <div className="relative group">
      <div className="relative h-full p-4 border border-muted/30 rounded-lg bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-200">
        <div className="relative z-10 flex items-start gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 flex-shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-sm mb-0.5">
              {feature.title}
            </h3>
            <p className="text-xs text-muted/80">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DNSPage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-background">
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <Spotlight />
      </div>
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                Enterprise DNS Management
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-sm font-bold border border-amber-500/30">
                BETA
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Powerful DNS Management
              <br />
              <span className="text-accent">Built for Scale</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Zone management, 23 record types, DNSSEC, delegation verification,
              change history, REST API, and more. Manage your DNS with
              enterprise-grade tooling.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://discord.gg/uWS3qvJN8B"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Join BETA (Discord)
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-muted/50 hover:border-accent/50 text-foreground rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Feature Cards - Quick highlights */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Everything You Need
              </h2>
              <p className="text-sm text-muted/80 max-w-xl mx-auto">
                Zone management, DNSSEC, REST API, delegation verification & more
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featureCards.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>

          {/* Compiled Features - compact grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {allFeatureSections.map((section) => {
              const Icon = section.icon as React.ComponentType<{ className?: string }>;
              return (
                <div
                  key={section.title}
                  className="p-5 rounded-xl border border-muted/30 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">{section.title}</h3>
                  </div>
                  {section.subtitle && (
                    <p className="text-[10px] text-muted font-mono mb-2 px-2 py-1 rounded bg-muted/20 break-all leading-tight">
                      {section.subtitle}
                    </p>
                  )}
                  <ul className="space-y-1.5 text-sm text-muted">
                    {section.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FiCheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="relative mb-20">
            <div className="relative p-10 sm:p-12 border border-accent/30 rounded-2xl bg-card/50 backdrop-blur-sm text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 mb-4">
                <FiServer className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Ready to manage your DNS?
              </h3>
              <p className="text-muted/80 mb-6 max-w-xl mx-auto">
                Join our BETA Discord to get early access and help shape the future of our DNS platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="https://discord.gg/uWS3qvJN8B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  Join BETA Discord
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-muted/50 hover:border-accent/50 text-foreground rounded-lg font-semibold transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
