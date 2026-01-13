"use client"
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import HytalePricingSection from "./HytalePricingSection";

// Lazy load heavy components
const ReviewsSection = dynamic(() => import("../components/ReviewsSection"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full" />
});

export default function HytalePage() {
  return (
    <div className="relative">
      <Navbar />
      <HytalePricingSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}

