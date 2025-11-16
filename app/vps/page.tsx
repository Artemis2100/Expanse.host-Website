"use client"
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import PricingSection from "../pages/PricingSection";
import LocationsSection from "../pages/Location";
import { Footer } from "../components/Footer";
import VPSPricing from "../pages/VPSPricing";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";
import VPSPanelShowcase from "../pages/VPSPanelShowcase";

export const metadata: Metadata = {
  title: "NVMe VPS Hosting with Ryzen 9 & Enterprise DDoS",
  description:
    "Scale faster with Expanse NVMe VPS on Ryzen 9 9950X, DDR5, and premium DDoS protection. Global regions, fair pricing, instant setup.",
  keywords: [
    "NVMe VPS",
    "Ryzen VPS",
    "Virtual servers",
    "DDoS protected VPS",
    "High performance VPS",
  ],
  alternates: { canonical: "/vps" },
};
export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-0   left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <Spotlight />
      </div>
      <Navbar />
      <VPSPricing />
      <VPSPanelShowcase />
      <FeaturesSection />
      <LocationsSection/>
      <PricingSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
