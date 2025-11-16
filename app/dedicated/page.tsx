"use client"
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import PricingSection from "../pages/PricingSection";
import LocationsSection from "../pages/Location";
import { Footer } from "../components/Footer";
import DedicatedPricing from "../pages/DedicatedPricing";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";
import PanelShowcase from "../pages/PanelShowcase";

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
