"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { memo, useMemo, useState, useRef } from "react";
import { Globe } from "@/components/ui/globe";

interface Location {
    name: string;
    region: string;
    flag: string;
    status: "active" | "coming soon";
    lat: number;
    lng: number;
}

const locations: Location[] = [
    {
        name: "New York City",
        region: "US East",
        flag: "/flags/usa.png",
        status: "active",
        lat: 40.7128,
        lng: -74.006,
    },
    {
        name: "Germany",
        region: "EU Central",
        flag: "/flags/germany.png",
        status: "active",
        lat: 51.1657,
        lng: 10.4515,
    },
    {
        name: "Johor Bahru",
        region: "APAC",
        flag: "/flags/malaysia.png",
        status: "active",
        lat: 1.4927,
        lng: 103.7414,
    },
];

const LocationCard = memo(
    ({ location, index }: { location: Location; index: number }) => {
        const isComingSoon = location.status === "coming soon";

        return (
            <motion.div
                className={`rounded-lg p-4 transition-all duration-200 bg-card border border-muted hover:border-accent/50 ${
                    isComingSoon ? "opacity-80" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                        <Image
                            src={location.flag}
                            alt={`${location.name} flag`}
                            width={40}
                            height={40}
                            className={`w-10 h-10 rounded object-cover ${isComingSoon ? "opacity-60" : ""}`}
                            loading="lazy"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3
                            className={`font-semibold text-sm sm:text-base ${isComingSoon ? "text-muted" : "text-foreground"}`}
                        >
                            {location.name}
                        </h3>
                        <p className="text-muted text-xs mt-0.5">{location.region}</p>
                    </div>
                </div>
            </motion.div>
        );
    },
);

LocationCard.displayName = "LocationCard";

const LocationGrid = memo(({ locations: locs }: { locations: Location[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        {locs.map((location, index) => (
            <LocationCard key={location.name} location={location} index={index} />
        ))}
    </div>
));

LocationGrid.displayName = "LocationGrid";

const latLngToScreen = (
    lat: number,
    lng: number,
    width: number,
    height: number,
    phi: number,
    theta: number,
) => {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;

    const x = Math.cos(latRad) * Math.cos(lngRad);
    const y = Math.sin(latRad);
    const z = Math.cos(latRad) * Math.sin(lngRad);

    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const rotatedX = x * cosTheta - z * sinTheta;
    const rotatedZ = x * sinTheta + z * cosTheta;
    const rotatedY = y * cosPhi - rotatedZ * sinPhi;
    const finalZ = y * sinPhi + rotatedZ * cosPhi;

    if (finalZ < 0) return null;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;

    const screenX = centerX + rotatedX * radius;
    const screenY = centerY - rotatedY * radius;

    return { x: screenX, y: screenY };
};

const HoveredLocationTooltip = memo(
    ({
        location,
        mousePos,
    }: {
        location: Location | null;
        mousePos: { x: number; y: number } | null;
    }) => {
        if (!location || !mousePos) return null;

        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed z-50 bg-card border border-muted rounded-lg p-3 shadow-lg pointer-events-none"
                    style={{
                        left: mousePos.x + 15,
                        top: mousePos.y - 10,
                    }}
                >
                    <div className="flex items-center gap-2">
                        <Image
                            src={location.flag}
                            alt={`${location.name} flag`}
                            width={20}
                            height={20}
                            className="w-5 h-5 rounded object-cover"
                        />
                        <div>
                            <div className="text-sm font-semibold text-foreground">{location.name}</div>
                            <div className="text-xs text-muted">{location.region}</div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    },
);

HoveredLocationTooltip.displayName = "HoveredLocationTooltip";

export default function LocationsSection() {
    const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const globeContainerRef = useRef<HTMLDivElement>(null);
    const [globeRotation, setGlobeRotation] = useState({ phi: 0, theta: 0.3 });

    const containerVariants = useMemo(
        () => ({
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
        }),
        [],
    );

    const activeLocations = useMemo(() => locations.filter((loc) => loc.status === "active"), []);

    const globeConfig = useMemo(
        () => ({
            width: 900,
            height: 900,
            devicePixelRatio: 2,
            phi: globeRotation.phi,
            theta: globeRotation.theta,
            dark: 1,
            diffuse: 0.4,
            mapSamples: 16000,
            mapBrightness: 3,
            baseColor: [0.1, 0.2, 0.3] as [number, number, number],
            markerColor: [96 / 255, 165 / 255, 250 / 255] as [number, number, number],
            glowColor: [0.1, 0.2, 0.3] as [number, number, number],
            markers: activeLocations.map((location) => ({
                location: [location.lat, location.lng] as [number, number],
                size: 0.08,
            })),
            onRender: (state: Record<string, unknown>) => {
                setGlobeRotation({
                    phi: state.phi as number,
                    theta: state.theta as number,
                });
            },
        }),
        [activeLocations, globeRotation],
    );

    const handleGlobeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!globeContainerRef.current) return;

        const rect = globeContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const width = rect.width;
        const height = rect.height;

        let closestLocation: Location | null = null;
        let minDistance = Infinity;
        const hoverRadius = 30;

        activeLocations.forEach((location) => {
            const screenPos = latLngToScreen(
                location.lat,
                location.lng,
                width,
                height,
                globeRotation.phi,
                globeRotation.theta,
            );

            if (screenPos) {
                const distance = Math.sqrt(Math.pow(x - screenPos.x, 2) + Math.pow(y - screenPos.y, 2));

                if (distance < hoverRadius && distance < minDistance) {
                    minDistance = distance;
                    closestLocation = location;
                }
            }
        });

        if (closestLocation) {
            setHoveredLocation(closestLocation);
            setMousePos({ x: e.clientX, y: e.clientY });
        } else {
            setHoveredLocation(null);
            setMousePos(null);
        }
    };

    const handleGlobeMouseLeave = () => {
        setHoveredLocation(null);
        setMousePos(null);
    };

    return (
        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                            Global Presence,
                            <br />
                            <span className="text-accent">Local Performance</span>
                        </h2>

                        <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl mb-6 sm:mb-8">
                            Our rapidly expanding datacenter network spans across the Americas, Europe, and Asia Pacific,
                            so you can deploy close to your players and customers.
                        </p>

                        <LocationGrid locations={locations} />

                        <motion.div
                            className="bg-card border border-muted rounded-lg p-4 border-dashed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl text-muted-foreground">?</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm sm:text-base text-foreground">More locations</h3>
                                    <p className="text-muted text-xs mt-0.5">Coming soon</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="relative hidden lg:block lg:h-[600px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        ref={globeContainerRef}
                        onMouseMove={handleGlobeMouseMove}
                        onMouseLeave={handleGlobeMouseLeave}
                    >
                        <div className="relative h-full w-full">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Globe config={globeConfig} />
                            </div>

                            <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm border border-muted rounded-lg p-3 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                                    <span className="text-xs text-foreground">Active</span>
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-muted rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-accent">99.9%</div>
                                <div className="text-xs text-foreground mt-1">Uptime SLA</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <HoveredLocationTooltip location={hoveredLocation} mousePos={mousePos} />
        </div>
    );
}
