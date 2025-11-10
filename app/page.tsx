"use client"
import React, { memo, useCallback, useRef } from "react";
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

// Memoized Domain Search Component to prevent re-renders of parent
const DomainSearchSection = memo(() => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDomainSearch = useCallback((domain?: string) => {
    const inputValue = inputRef.current?.value || "";
    const searchDomain = domain || inputValue.trim();
    const baseUrl = "https://my.expanse.host/cart.php?a=add&domain=register";
    
    if (searchDomain) {
      // Clean the domain (remove http://, https://, www., spaces, and ensure it's lowercase)
      const cleanedDomain = searchDomain
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\s+/g, "")
        .trim();
      
      // Redirect to WHMCS domain registration page with the domain query
      window.location.href = `${baseUrl}&query=${encodeURIComponent(cleanedDomain)}`;
    } else {
      // If no domain entered, just redirect to the registration page
      window.location.href = baseUrl;
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleDomainSearch();
    }
  }, [handleDomainSearch]);

  const handleExtensionClick = useCallback((ext: string) => {
    const extension = ext.toLowerCase().replace(/^\./, "");
    const inputValue = inputRef.current?.value || "";
    const domain = inputValue.trim() || "mydomain";
    const fullDomain = domain.endsWith(`.${extension}`) 
      ? domain 
      : `${domain}.${extension}`;
    handleDomainSearch(fullDomain);
  }, [handleDomainSearch]);

  return (
    <motion.div
      className="mt-12 relative border-t border-b border-muted bg-gradient-to-br from-blue-400/20 to-card/30 p-8 md:p-12 backdrop-blur-sm overflow-hidden"
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
              ref={inputRef}
              type="text"
              placeholder="mydomain.com"
              onKeyDown={handleKeyDown}
              className="w-full bg-card border border-muted rounded-xl px-4 py-4 pr-12 text-foreground placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button 
              onClick={() => handleDomainSearch()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
              aria-label="Search domain"
              type="button"
            >
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
                onClick={() => handleExtensionClick(ext)}
                className="px-4 py-2 bg-button rounded text-primary-foreground text-sm font-mono transition-all hover:bg-blue-400/50 cursor-pointer"
                type="button"
              >
                {ext}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

DomainSearchSection.displayName = 'DomainSearchSection';

export default function Home() {
  return (
    <div className="relative">

      <div className="absolute top-0 left-0 right-0 h-screen bg-black/20 overflow-hidden pointer-events-none">
        <BackgroundBeams />
      </div>

      <Navbar />

      <div className="relative z-10">
        <HeroSection />
        <Advertisements />
        <DomainSearchSection />
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
