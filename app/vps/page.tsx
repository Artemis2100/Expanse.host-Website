"use client"
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import PricingSection from "../pages/PricingSection";
import LocationsSection from "../pages/Location";
import { Footer } from "../components/Footer";
import VPSPricing from "../pages/VPSPricing";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-0   left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <Spotlight />
      </div>
      <Navbar />
      <VPSPricing />
      <FeaturesSection />
      <LocationsSection/>
      <PricingSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
