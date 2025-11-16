"use client"
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import PricingSection from "../pages/PricingSection";
import LocationsSection from "../pages/Location";
import { Footer } from "../components/Footer";
import DedicatedPricing from "../pages/DedicatedPricing";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";
import PanelShowcase from "../pages/PanelShowcase";

export const metadata: Metadata = {
  title: "Dedicated & Bare Metal — Ryzen 9, NVMe, DDoS",
  description:
    "Run demanding workloads on Expanse dedicated servers. Latest-gen Ryzen 9, DDR5 memory, NVMe storage, enterprise DDoS, and premium network.",
  keywords: [
    "Dedicated servers",
    "Bare metal",
    "Ryzen 9 dedicated",
    "DDoS protected dedicated",
    "High frequency hosting",
  ],
  alternates: { canonical: "/dedicated" },
};
export default function DedicatedPage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <Spotlight />
      </div>
      <Navbar />
      <DedicatedPricing />
      <PanelShowcase />
      <FeaturesSection />
      <LocationsSection/>
      <PricingSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
