"use client"
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import Advertisements from "./pages/Advertisements";
import { FeaturesSection } from "./pages/FeaturesSection";
import PricingSection from "./pages/PricingSection";
import LocationsSection from "./pages/Location";
import { BackgroundBeams } from "../components/ui/background-beams"
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="relative">
      {/* Section with background beams */}
      <div className="relative">
        <BackgroundBeams />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <Advertisements />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 relative border-t border-b border-blue-400/20 bg-gradient-to-br from-blue-400/20 to-black/30  p-8 md:p-12 backdrop-blur-sm overflow-hidden"
          >
            {/* Background decoration */}

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
              {/* Left side - Text content */}
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  FIND THE PERFECT DOMAIN
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl uppercase tracking-wide font-mono">
                  SECURE YOUR IDEAL DOMAIN NAME AND ESTABLISH YOUR ONLINE PRESENCE TODAY. FIND THE PERFECT MATCH FOR YOUR BRAND WITH EASE.
                </p>
              </div>

              {/* Right side - Search and domain extensions */}
              <div className="flex-1 w-full lg:w-auto">
                {/* Search input */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="mydomain.com"
                    className="w-full bg-black border border-blue-400/30 rounded-lg px-4 py-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
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

                {/* Domain extensions */}
                <div className="flex flex-wrap gap-2">
                  {['.COM', '.ORG', '.NET', '.SHOP', '.ONLINE', '.LIVE', '.RO'].map((ext) => (
                    <button
                      key={ext}
                      style={{ boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.6)" }}
                      className="px-4 py-2 bg-blue-400/40  rounded text-white text-sm font-mono transition-all"
                    >
                      {ext}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section without background beams */}
      <FeaturesSection />
      <PricingSection />
    </div>
  );
}
