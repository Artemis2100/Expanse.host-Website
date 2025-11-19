"use client"
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import MinecraftPricingSection from "./MinecraftPricingSection";
import { Footer } from "../components/Footer";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";
import VPSPanelShowcase from "../pages/VPSPanelShowcase";
import { FiMonitor, FiServer, FiSettings, FiShield } from "react-icons/fi";

// Lazy load heavy components
const LocationsSection = dynamic(() => import("../pages/Location").then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full" />
});

const ReviewsSection = dynamic(() => import("../components/ReviewsSection"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full" />
});

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <MinecraftPricingSection />
      <VPSPanelShowcase
        title="Powerful Control Panel"
        subtitle="Experience seamless Minecraft server management with our cutting-edge control panel"
        panelName="Expanse Panel"
        panelDescription="Expanse Panel is a modern, intuitive control panel designed for Minecraft server management. With its user-friendly interface and powerful features, you can manage your game servers effortlessly."
        features={[
          {
            icon: <FiMonitor className="w-6 h-6" />,
            title: "Intuitive Dashboard",
            description: "Monitor your Minecraft server performance at a glance with real-time metrics and insights."
          },
          {
            icon: <FiServer className="w-6 h-6" />,
            title: "Resource Management",
            description: "Easily manage CPU, RAM, storage, and network resources with precision control."
          },
          {
            icon: <FiSettings className="w-6 h-6" />,
            title: "One-Click Operations",
            description: "Deploy, restart, or configure your Minecraft server with simple one-click actions."
          },
          {
            icon: <FiShield className="w-6 h-6" />,
            title: "Plugin and Mod Installers",
            description: "Built-in Plugin , Mods and Modpack installer for ease of use."
          }
        ]}
        images={[
          {
            src: "/panel/expanse-panel-console.png",
            alt: "Expanse Panel Dashboard",
            caption: "Main dashboard with real-time metrics"
          },
          {
            src: "/panel/expanse-panel-plugins.png",
            alt: "Minecraft Server Management",
            caption: "Server management interface"
          },
          {
            src: "/panel/expanse-panel-softwares.png",
            alt: "Settings Panel",
            caption: "Advanced configuration options"
          }
        ]}
      />
      <FeaturesSection />
      <LocationsSection/>
      <FaqSection />
      <Footer />
    </div>
  );
}
