"use client"
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import Advertisements from "./pages/Advertisements";
import { FeaturesSection } from "./pages/FeaturesSection";
import PricingSection from "./pages/PricingSection";
import LocationsSection from "./pages/Location";
import { BackgroundBeams } from "../components/ui/background-beams"
import { motion } from "motion/react";
import { Footer } from "./components/Footer";
import ReviewsSection from "./components/ReviewsSection";
import FaqSection from "./pages/FaqSection";

export default function Home() {
  return (
    <div className="relative">
      {/* Background beams - fixed to hero section only */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none">
        <BackgroundBeams />
      </div>

      <Navbar />

      <div className="relative z-10">
        <HeroSection />
        <Advertisements />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 relative border-t border-b border-muted bg-gradient-to-br from-blue-500/10 to-card/30 p-8 md:p-12 backdrop-blur-sm overflow-hidden"
        >
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                FIND THE PERFECT DOMAIN
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl uppercase tracking-wide">
                SECURE YOUR IDEAL DOMAIN NAME AND ESTABLISH YOUR ONLINE PRESENCE TODAY. FIND THE PERFECT MATCH FOR YOUR BRAND WITH EASE.
              </p>
            </div>
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="mydomain.com"
                  className="w-full bg-card border border-muted rounded-xl px-4 py-4 pr-12 text-foreground placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {['.COM', '.ORG', '.NET', '.SHOP', '.ONLINE', '.LIVE', '.RO'].map((ext) => (
                  <button
                    key={ext}
                    className="px-4 py-2 bg-button rounded text-primary-foreground text-sm font-mono transition-all hover:bg-blue-400/50"
                  >
                    {ext}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <FeaturesSection />
      <LocationsSection />
      <PricingSection />
      <ReviewsSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
