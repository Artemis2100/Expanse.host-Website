"use client"
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import DiscordBotPricingSection from "./DiscordBotPricingSection";
import SupportedSoftwareSection from "./SupportedSoftwareSection";

// Lazy load heavy components
const ReviewsSection = dynamic(() => import("../components/ReviewsSection"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full" />
});

export default function DiscordBotPage() {
  return (
    <div className="relative">
      <Navbar />
      <DiscordBotPricingSection />
      <SupportedSoftwareSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
