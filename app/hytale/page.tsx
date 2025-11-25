"use client"
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import HytaleWaitlistSection from "./HytaleWaitlistSection";

// Lazy load heavy components
const ReviewsSection = dynamic(() => import("../components/ReviewsSection"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full" />
});

export default function HytalePage() {
  return (
    <div className="relative">
      <Navbar />
      <HytaleWaitlistSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}

