"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo } from "react";
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
            className="flex items-center justify-between gap-4 py-3  last:border-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="flex items-center gap-3 flex-1">
                <Image
                    src={location.flag}
                    alt={`${location.name} flag`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded object-cover"
                    loading="lazy"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-foreground font-semibold text-base">
                            {location.name}
                        </h3>
                    </div>
                    <p className="text-muted text-sm mt-0.5">
                        {location.region}
                    </p>
                </div>
            </div>

        </motion.div>
    );
});

LocationItem.displayName = 'LocationItem';




export default function LocationsSection() {
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
        <div className="relative py-6 overflow-hidden">
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

            {/* Blue gradient SVG - Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
               <svg width="2468" height="1218" viewBox="0 0 2468 1218" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_0_1)">
<ellipse cx="1154" cy="438" rx="664" ry="288" fill="#10468C" fillOpacity="0.08"/>
</g>
<g filter="url(#filter1_f_0_1)">
<ellipse cx="631" cy="870.5" rx="481" ry="197.5" fill="#10468C" fillOpacity="0.06"/>
</g>
<g filter="url(#filter2_f_0_1)">
<ellipse cx="1837" cy="780.5" rx="481" ry="197.5" fill="#10468C" fillOpacity="0.13"/>
</g>
<defs>
<filter id="filter0_f_0_1" x="340" y="0" width="1628" height="876" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_0_1"/>
</filter>
<filter id="filter1_f_0_1" x="0" y="523" width="1262" height="695" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_0_1"/>
</filter>
<filter id="filter2_f_0_1" x="1206" y="433" width="1262" height="695" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_0_1"/>
</filter>
</defs>
</svg>





            </div>

            <div className="relative z-10 max-w-7xl mx-auto ">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                            Global Presence,
                            <br />
                            <span className="text-accent">Local Performance</span>
                        </h2>

                        <p className="text-muted text-base mb-8 leading-relaxed max-w-xl">
                            Our rapidly expanding datacenter network spans across the Americas and Europe,
                            delivering ultra-low latency from anywhere and lightning-fast connections wherever you play.
                        </p>

                        {/* Locations Lists */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            {/* Europe Section */}
                            <div>
                                <h3 className="text-accent text-lg mb-2">Europe</h3>
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
                                <h3 className="text-accent text-lg mb-2">Americas</h3>
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
                        className="relative lg:h-[600px] h-[400px]"
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

            {/* Bottom border with fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                <div
                    className="h-full w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                    }}
                />
            </div>
        </div>
    );
}
