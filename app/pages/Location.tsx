"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo, useState, useEffect } from "react";
import { Globe } from "@/components/ui/globe";

const locations = [
    {
        name: "Amsterdam",
        region: "EU West",
        flag: "/flags/germany.png",
        ping: "66ms",
        status: "active",
        lat: 52.3676,
        lng: 4.9041,
    },
    {
        name: "Chicago, IL",
        region: "US Central",
        flag: "/flags/usa.png",
        ping: "157ms",
        status: "active",
        lat: 41.8781,
        lng: -87.6298,
    },
    {
        name: "Dallas, TX",
        region: "US South",
        flag: "/flags/usa.png",
        ping: "169ms",
        status: "active",
        lat: 32.7767,
        lng: -96.7970,
    },
    {
        name: "Seattle, WA",
        region: "US West",
        flag: "/flags/usa.png",
        ping: "197ms",
        status: "active",
        lat: 47.6062,
        lng: -122.3321,
    },
];

const LocationItem = memo(({ location, index }: { location: typeof locations[0], index: number }) => {
    const isActive = location.status === "active";

    return (
        <motion.div
            className="flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-3 last:border-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="flex items-center gap-2 sm:gap-3 flex-1">
                <Image
                    src={location.flag}
                    alt={`${location.name} flag`}
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded object-cover flex-shrink-0"
                    loading="lazy"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-foreground font-semibold text-sm sm:text-base truncate">
                            {location.name}
                        </h3>
                    </div>
                    <p className="text-muted text-xs sm:text-sm mt-0.5 truncate">
                        {location.region}
                    </p>
                </div>
            </div>

        </motion.div>
    );
});

LocationItem.displayName = 'LocationItem';




export default function LocationsSection() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check theme on mount and listen for changes
        const checkTheme = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };

        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    }), []);

    const globeConfig = useMemo(() => ({
        width: 900,
        height: 900,
        devicePixelRatio: 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 0.4,
        mapSamples: 16000,
        mapBrightness: 3,
        baseColor: [0.1, 0.2, 0.3] as [number, number, number],
        markerColor: [96 / 255, 165 / 255, 250 / 255] as [number, number, number],
        glowColor: [0.1, 0.2, 0.3] as [number, number, number],
        markers: locations
            .filter(loc => loc.status === "active")
            .map(location => ({
                location: [location.lat, location.lng] as [number, number],
                size: 0.08,
            })),
        onRender: () => {},
    }), []);

    return (
        <div className="relative py-6 sm:py-12 md:py-16 overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Top border with fade effect */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                <div
                    className="h-full w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                    }}
                />
            </div>

          

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                            Global Presence,
                            <br />
                            <span className="text-accent">Local Performance</span>
                        </h2>

                        <p className="text-muted text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed max-w-xl">
                            Our rapidly expanding datacenter network spans across the Americas and Europe,
                            delivering ultra-low latency from anywhere and lightning-fast connections wherever you play.
                        </p>

                        {/* Locations Lists */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            {/* Europe Section */}
                            <div>
                                <h3 className="text-accent text-base sm:text-lg mb-2">Europe</h3>
                                <div className="space-y-1">
                                    {locations
                                        .filter(loc => loc.region.includes("EU"))
                                        .map((location, index) => (
                                            <LocationItem key={location.name} location={location} index={index} />
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Americas Section */}
                            <div>
                                <h3 className="text-accent text-base sm:text-lg mb-2">Americas</h3>
                                <div className="space-y-1">
                                    {locations
                                        .filter(loc => loc.region.includes("US"))
                                        .map((location, index) => (
                                            <LocationItem key={location.name} location={location} index={index + 1} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Column - Globe */}
                    <motion.div
                        className="relative hidden lg:block lg:h-[600px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Globe config={globeConfig} />
                        </div>
                    </motion.div>
                </div>
            </div>

            
        </div>
    );
}
