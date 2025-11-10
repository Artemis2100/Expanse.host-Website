"use client"
import Navbar from "../components/Navbar";
import { FeaturesSection } from "../pages/FeaturesSection";
import MinecraftPricingSection from "./MinecraftPricingSection";
import LocationsSection from "../pages/Location";
import { Footer } from "../components/Footer";
import ReviewsSection from "../components/ReviewsSection";
import FaqSection from "../pages/FaqSection";
import { Spotlight } from "@/components/ui/ripple";
import VPSPanelShowcase from "../pages/VPSPanelShowcase";
import { FiMonitor, FiServer, FiSettings, FiShield } from "react-icons/fi";

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
            title: "Security First",
            description: "Built-in security features including firewall management and access controls."
          }
        ]}
        images={[
          {
            src: "/panel/virtfusion.png",
            alt: "Expanse Panel Dashboard",
            caption: "Main dashboard with real-time metrics"
          },
          {
            src: "/panel/virtfusion.png",
            alt: "Minecraft Server Management",
            caption: "Server management interface"
          },
          {
            src: "/panel/virtfusion.png",
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
