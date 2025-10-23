"use client"
import Navbar from "../components/Navbar";
import HeroSection from "../pages/HeroSection";
import Advertisements from "../pages/Advertisements";
import { FeaturesSection } from "../pages/FeaturesSection";
import PricingSection from "../pages/PricingSection";
import LocationsSection from "../pages/Location";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import ReviewsSection from "../components/ReviewsSection";
import FaqSection from "../pages/FaqSection";
import VDSPricing from "../pages/VDSPricing";
import { BackgroundBeams } from "../../components/ui/background-beams"
import { Spotlight } from "@/components/ui/ripple";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-0   left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <Spotlight />
      </div>
      <Navbar />
      <VDSPricing />
      <FeaturesSection />
      <LocationsSection />
      <PricingSection />
      <ReviewsSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
