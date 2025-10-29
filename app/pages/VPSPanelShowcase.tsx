"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiMonitor, FiServer, FiSettings, FiShield } from "react-icons/fi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface PanelFeature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface VPSPanelShowcaseProps {
    title?: string;
    subtitle?: string;
    panelName?: string;
    panelDescription?: string;
    features?: PanelFeature[];
    images?: {
        src: string;
        alt: string;
        caption?: string;
    }[];
    ctaLink?: string;
    ctaText?: string;
}

export default function VPSPanelShowcase({
    title = "Powerful Control Panel",
    subtitle = "Experience seamless VPS management with our cutting-edge control panel",
    panelName = "Virtfusion",
    panelDescription = "Virtfusion is a modern, intuitive control panel designed for VPS management. With its user-friendly interface and powerful features, you can manage your virtual servers effortlessly.",
    features = [
        {
            icon: <FiMonitor className="w-6 h-6" />,
            title: "Intuitive Dashboard",
            description: "Monitor your VPS performance at a glance with real-time metrics and insights."
        },
        {
            icon: <FiServer className="w-6 h-6" />,
            title: "Resource Management",
            description: "Easily manage CPU, RAM, storage, and network resources with precision control."
        },
        {
            icon: <FiSettings className="w-6 h-6" />,
            title: "One-Click Operations",
            description: "Deploy, restart, or configure your VPS with simple one-click actions."
        },
        {
            icon: <FiShield className="w-6 h-6" />,
            title: "Security First",
            description: "Built-in security features including firewall management and access controls."
        }
    ],
    images = [
        {
            src: "/panel/virtfusion.png",
            alt: "Virtfusion Dashboard",
            caption: "Main dashboard with real-time metrics"
        },
        {
            src: "/panel/virtfusion.png",
            alt: "VPS Management",
            caption: "VPS management interface"
        },
        {
            src: "/panel/virtfusion.png",
            alt: "Settings Panel",
            caption: "Advanced configuration options"
        }
    ],
    ctaLink,
    ctaText = "Get Started"
}: VPSPanelShowcaseProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-16 border-t border-b border-muted">
            <BackgroundBeams />
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
                    {/* Left Side - Panel Info & Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Panel Description */}
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                                Meet <span className="text-accent">{panelName}</span>
                            </h3>
                            <p className="text-sm sm:text-base text-muted leading-relaxed">
                                {panelDescription}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="relative h-full p-4  border-l-4 border-muted backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                                        <div className="relative z-10">
                                            <h4 className="text-sm font-bold text-foreground mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-xs text-muted leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        {ctaLink && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <a
                                    href={ctaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-button text-white font-semibold rounded-lg hover:opacity-90 transition-all group"
                                >
                                    <span>{ctaText}</span>
                                    <svg
                                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </a>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Side - Image Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Main Image Display */}
                        <div className="relative rounded-lg border border-muted overflow-hidden bg-card/50 backdrop-blur-sm shadow-2xl">
                            <Ripple />
                            <div className="relative z-10 aspect-video w-full">
                                <Image
                                    src={images[selectedImage].src}
                                    alt={images[selectedImage].alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                />
                            </div>
                            {images[selectedImage].caption && (
                                <div className="relative z-10 px-4 py-3 bg-background/95 backdrop-blur-sm border-t border-muted">
                                    <p className="text-xs sm:text-sm text-muted text-center">
                                        {images[selectedImage].caption}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Navigation */}
                        {images.length > 1 && (
                            <div className="flex gap-3 mt-4 justify-center">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-14 rounded-lg border-2 overflow-hidden transition-all ${
                                            selectedImage === index
                                                ? "border-accent scale-105"
                                                : "border-muted hover:border-accent/50"
                                        }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
