"use client"
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import PricingSection from "../pages/PricingSection";
import { Footer } from "../components/Footer";
import VPSPricing from "../pages/VPSPricing";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";
import VPSPanelShowcase from "../pages/VPSPanelShowcase";

// Lazy load heavy components
const LocationsSection = dynamic(() => import("../pages/Location").then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full" />
});

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
