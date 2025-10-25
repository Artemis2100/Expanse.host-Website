"use client"
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import MinecraftPricingSection from "./MinecraftPricingSection";
import LocationsSection from "../pages/Location";
import { Footer } from "../components/Footer";
import ReviewsSection from "../components/ReviewsSection";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <MinecraftPricingSection />
      <FeaturesSection />
      <LocationsSection/>
      <FaqSection />
      <Footer />
    </div>
  );
}
