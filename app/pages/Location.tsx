"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { memo, useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Globe } from "@/components/ui/globe";
import { FiActivity, FiX, FiRefreshCw } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

interface Location {
    name: string;
    region: string;
    flag: string;
    ping: string;
    status: "active" | "coming soon";
    lat: number;
    lng: number;
    wsEndpoint?: string;
}

// Filtered locations - only show the requested ones
const locations: Location[] = [
    // Americas
    {
        name: "New York City",
        region: "US East",
        flag: "/flags/usa.png",
        ping: "45ms",
        status: "active",
        lat: 40.7128,
        lng: -74.0060,
        wsEndpoint: "wss://echo.websocket.org",
    },
    // Europe
    {
        name: "Germany",
        region: "EU Central",
        flag: "/flags/germany.png",
        ping: "TBD",
        status: "active",
        lat: 51.1657,
        lng: 10.4515,
        wsEndpoint: "wss://echo.websocket.org",
    },
    // Asia Pacific
    {
        name: "Singapore",
        region: "APAC",
        flag: "/flags/singapore.png",
        ping: "TBD",
        status: "active",
        lat: 1.3521,
        lng: 103.8198,
        wsEndpoint: "wss://echo.websocket.org",
    },
    {
        name: "Johor Bahru",
        region: "APAC",
        flag: "/flags/malaysia.png",
        ping: "TBD",
        status: "active",
        lat: 1.4927,
        lng: 103.7414,
        wsEndpoint: "wss://jhb.expanse.host/ping",
    },
];

// Rate limiter: 10 requests per second
class RateLimiter {
    private requests: number[] = [];
    private readonly maxRequests = 10;
    private readonly windowMs = 1000;

    canMakeRequest(): boolean {
        const now = Date.now();
        // Remove requests older than 1 second
        this.requests = this.requests.filter(time => now - time < this.windowMs);
        
        if (this.requests.length < this.maxRequests) {
            this.requests.push(now);
            return true;
        }
        return false;
    }

    getTimeUntilNextSlot(): number {
        if (this.requests.length < this.maxRequests) return 0;
        const oldest = Math.min(...this.requests);
        return Math.max(0, this.windowMs - (Date.now() - oldest));
    }
}

const globalRateLimiter = new RateLimiter();

// WebSocket latency hook with manual refresh support
const useLatency = (wsEndpoint: string | undefined, isActive: boolean, refreshTrigger?: number) => {
    const [latency, setLatency] = useState<string>("TBD");
    const [isPinging, setIsPinging] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);
    const pendingPingRef = useRef<(() => void) | null>(null);

    const ping = useRef<(() => void) | null>(null);
    
    ping.current = () => {
        if (!wsEndpoint || !isActive) return;
        
        // Check rate limit
        if (!globalRateLimiter.canMakeRequest()) {
            const delay = globalRateLimiter.getTimeUntilNextSlot();
            pendingPingRef.current = ping.current;
            setTimeout(() => {
                if (pendingPingRef.current) {
                    pendingPingRef.current();
                    pendingPingRef.current = null;
                }
            }, delay);
            return;
        }

        if (wsRef.current?.readyState === WebSocket.OPEN) {
            setIsPinging(true);
            startTimeRef.current = Date.now();
            wsRef.current.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
            
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setLatency("Timeout");
                setIsPinging(false);
            }, 5000);
        } else if (wsRef.current?.readyState === WebSocket.CONNECTING) {
            // Wait for connection
            const checkConnection = setInterval(() => {
                if (wsRef.current?.readyState === WebSocket.OPEN) {
                    clearInterval(checkConnection);
                    if (ping.current) ping.current();
                } else if (wsRef.current?.readyState === WebSocket.CLOSED) {
                    clearInterval(checkConnection);
                }
            }, 100);
            
            setTimeout(() => clearInterval(checkConnection), 5000);
        }
    };

    useEffect(() => {
        if (!wsEndpoint || !isActive) {
            setLatency("TBD");
            return;
        }

        const connect = () => {
            try {
                const ws = new WebSocket(wsEndpoint);
                wsRef.current = ws;

                ws.onopen = () => {
                    if (ping.current) ping.current();
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        if (data.type === "pong" || data.type === "ping") {
                            const elapsed = Date.now() - startTimeRef.current;
                            setLatency(`${elapsed}ms`);
                            setIsPinging(false);
                            if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        }
                    } catch (e) {
                        const elapsed = Date.now() - startTimeRef.current;
                        setLatency(`${elapsed}ms`);
                        setIsPinging(false);
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }
                };

                ws.onerror = () => {
                    setLatency("Error");
                    setIsPinging(false);
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                };

                ws.onclose = () => {
                    setTimeout(connect, 10000);
                };
            } catch (error) {
                setLatency("Error");
                setIsPinging(false);
            }
        };

        connect();
        const interval = setInterval(() => {
            if (ping.current) ping.current();
        }, 30000);

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            clearInterval(interval);
        };
    }, [wsEndpoint, isActive]);

    // Trigger refresh when refreshTrigger changes
    useEffect(() => {
        if (refreshTrigger !== undefined && refreshTrigger > 0) {
            if (ping.current) ping.current();
        }
    }, [refreshTrigger]);

    return { latency, isPinging, refresh: ping.current };
};

const LocationCard = memo(({ location, index, refreshTrigger, isLowestLatency }: { location: Location; index: number; refreshTrigger?: number; isLowestLatency?: boolean }) => {
    const isActive = location.status === "active";
    const isComingSoon = location.status === "coming soon";
    const { latency, isPinging } = useLatency(location.wsEndpoint, isActive, refreshTrigger);

    const displayLatency = location.wsEndpoint ? latency : location.ping;

    return (
        <motion.div
            className={`rounded-lg p-4 transition-all duration-200 ${
                isLowestLatency 
                    ? 'bg-green-500/10 border-2 border-green-500/50 hover:border-green-500' 
                    : 'bg-card border border-muted hover:border-accent/50'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Image
                        src={location.flag}
                        alt={`${location.name} flag`}
                        width={40}
                        height={40}
                        className={`w-10 h-10 rounded object-cover flex-shrink-0 ${isComingSoon ? 'opacity-60' : ''}`}
                        loading="lazy"
                    />
                    {isLowestLatency && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                            <FaCrown className="w-3 h-3 text-yellow-400" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className={`font-semibold text-sm sm:text-base ${isComingSoon ? 'text-muted' : isLowestLatency ? 'text-green-400' : 'text-foreground'}`}>
                            {location.name}
                        </h3>
                    </div>
                    <p className="text-muted text-xs mt-0.5">
                        {location.region}
                    </p>
                </div>
                {isActive && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-sm font-medium ${
                            displayLatency === "TBD" || displayLatency === "Error" || displayLatency === "Timeout" 
                                ? 'text-muted' 
                                : isLowestLatency 
                                    ? 'text-green-400' 
                                    : 'text-red-500'
                        }`}>
                            {isPinging ? "..." : displayLatency}
                        </span>
                        {displayLatency !== "TBD" && displayLatency !== "Error" && displayLatency !== "Timeout" && !isPinging ? (
                            <FiActivity className={`w-4 h-4 ${isLowestLatency ? 'text-green-400' : 'text-red-500'}`} />
                        ) : (
                            <FiX className="w-4 h-4 text-muted" />
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
});

LocationCard.displayName = 'LocationCard';

// Helper function to parse latency value to number for sorting
const parseLatency = (latency: string): number => {
    if (latency === "TBD" || latency === "Error" || latency === "Timeout" || latency === "...") {
        return Infinity;
    }
    const match = latency.match(/(\d+)ms/);
    return match ? parseInt(match[1], 10) : Infinity;
};

// Component to track latencies and sort locations
const LocationGrid = memo(({ locations, refreshTrigger }: { locations: Location[]; refreshTrigger: number }) => {
    const [latencies, setLatencies] = useState<Record<string, string>>({});
    
    // Track latencies from all LocationCards - memoized to prevent infinite loops
    const updateLatency = useCallback((name: string, latency: string) => {
        setLatencies(prev => {
            // Only update if latency actually changed to prevent unnecessary re-renders
            if (prev[name] === latency) return prev;
            return { ...prev, [name]: latency };
        });
    }, []);

    // Sort locations by latency
    const sortedLocations = useMemo(() => {
        return [...locations].sort((a, b) => {
            const latencyA = latencies[a.name] || a.ping;
            const latencyB = latencies[b.name] || b.ping;
            return parseLatency(latencyA) - parseLatency(latencyB);
        });
    }, [locations, latencies]);

    // Find location with lowest latency
    const lowestLatencyLocation = useMemo(() => {
        if (sortedLocations.length === 0) return null;
        const first = sortedLocations[0];
        const firstLatency = latencies[first.name] || first.ping;
        // Only highlight if we have a valid latency
        if (parseLatency(firstLatency) !== Infinity) {
            return first.name;
        }
        return null;
    }, [sortedLocations, latencies]);

    // Arrange in zigzag pattern (left-right-left-right)
    const zigzagLocations = useMemo(() => {
        const result: (Location & { gridColumn: number })[] = [];
        sortedLocations.forEach((location, index) => {
            result.push({
                ...location,
                gridColumn: (index % 2) + 1, // 1 for left, 2 for right
            });
        });
        return result;
    }, [sortedLocations]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {zigzagLocations.map((location, index) => (
                <LocationCardWithLatency
                    key={location.name}
                    location={location}
                    index={index}
                    refreshTrigger={refreshTrigger}
                    isLowestLatency={location.name === lowestLatencyLocation}
                    onLatencyUpdate={updateLatency}
                />
            ))}
        </div>
    );
});

LocationGrid.displayName = 'LocationGrid';

// Wrapper component to track latency updates
const LocationCardWithLatency = memo(({ 
    location, 
    index, 
    refreshTrigger, 
    isLowestLatency,
    onLatencyUpdate 
}: { 
    location: Location; 
    index: number; 
    refreshTrigger?: number; 
    isLowestLatency?: boolean;
    onLatencyUpdate: (name: string, latency: string) => void;
}) => {
    const isActive = location.status === "active";
    const { latency, isPinging } = useLatency(location.wsEndpoint, isActive, refreshTrigger);
    const displayLatency = location.wsEndpoint ? latency : location.ping;
    const prevLatencyRef = useRef<string>("");

    // Update parent with latency - only when latency actually changes
    useEffect(() => {
        if (displayLatency !== prevLatencyRef.current) {
            prevLatencyRef.current = displayLatency;
            onLatencyUpdate(location.name, displayLatency);
        }
    }, [displayLatency, location.name, onLatencyUpdate]);

    return (
        <LocationCard 
            location={location} 
            index={index} 
            refreshTrigger={refreshTrigger} 
            isLowestLatency={isLowestLatency}
        />
    );
});

LocationCardWithLatency.displayName = 'LocationCardWithLatency';

// Helper function to convert lat/lng to screen coordinates on the globe
const latLngToScreen = (lat: number, lng: number, width: number, height: number, phi: number, theta: number) => {
    // Convert to radians
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    
    // Spherical to Cartesian
    const x = Math.cos(latRad) * Math.cos(lngRad);
    const y = Math.sin(latRad);
    const z = Math.cos(latRad) * Math.sin(lngRad);
    
    // Rotate based on globe rotation
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    
    const rotatedX = x * cosTheta - z * sinTheta;
    const rotatedZ = x * sinTheta + z * cosTheta;
    const rotatedY = y * cosPhi - rotatedZ * sinPhi;
    const finalZ = y * sinPhi + rotatedZ * cosPhi;
    
    // Project to 2D (orthographic projection)
    if (finalZ < 0) return null; // Behind the globe
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;
    
    const screenX = centerX + rotatedX * radius;
    const screenY = centerY - rotatedY * radius;
    
    return { x: screenX, y: screenY };
};

export default function LocationsSection() {
    const [isDark, setIsDark] = useState(true);
    const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const globeContainerRef = useRef<HTMLDivElement>(null);
    const [globeRotation, setGlobeRotation] = useState({ phi: 0, theta: 0.3 });
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };

        checkTheme();
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

    const activeLocations = useMemo(() => 
        locations.filter(loc => loc.status === "active"),
        []
    );

    const globeConfig = useMemo(() => ({
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
        markerColor: [96 / 255, 165 / 255, 250 / 255] as [number, number, number], // Blue accent color
        glowColor: [0.1, 0.2, 0.3] as [number, number, number],
        markers: activeLocations.map(location => ({
            location: [location.lat, location.lng] as [number, number],
            size: 0.08,
        })),
        onRender: (state: any) => {
            setGlobeRotation({ phi: state.phi, theta: state.theta });
        },
    }), [activeLocations, globeRotation]);

    const handleGlobeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!globeContainerRef.current) return;
        
        const rect = globeContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const width = rect.width;
        const height = rect.height;
        
        // Check which marker is closest
        let closestLocation: Location | null = null;
        let minDistance = Infinity;
        const hoverRadius = 30; // pixels
        
        activeLocations.forEach(location => {
            const screenPos = latLngToScreen(
                location.lat,
                location.lng,
                width,
                height,
                globeRotation.phi,
                globeRotation.theta
            );
            
            if (screenPos) {
                const distance = Math.sqrt(
                    Math.pow(x - screenPos.x, 2) + Math.pow(y - screenPos.y, 2)
                );
                
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

    // Tooltip component that uses latency hook
    const HoveredLocationTooltip = memo(({ location, mousePos, refreshTrigger }: { location: Location | null; mousePos: { x: number; y: number } | null; refreshTrigger?: number }) => {
        if (!location || !mousePos) return null;
        
        const { latency, isPinging } = useLatency(location.wsEndpoint, true, refreshTrigger);
        const displayLatency = location.wsEndpoint ? latency : location.ping;
        
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
                            <div className="text-sm font-semibold text-foreground">
                                {location.name}
                            </div>
                            <div className="text-xs text-muted">
                                Latency: <span className="text-accent font-medium">{isPinging ? "..." : displayLatency}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    });
    
    HoveredLocationTooltip.displayName = 'HoveredLocationTooltip';

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

                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                                Our rapidly expanding datacenter network spans across the Americas, Europe, and Asia Pacific,
                                delivering ultra-low latency from anywhere and lightning-fast connections wherever you play.
                            </p>
                            <button
                                onClick={() => {
                                    if (!isRefreshing) {
                                        setIsRefreshing(true);
                                        setRefreshTrigger(prev => prev + 1);
                                        setTimeout(() => setIsRefreshing(false), 1000);
                                    }
                                }}
                                disabled={isRefreshing}
                                className="ml-4 flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                <span className="text-sm">Refresh</span>
                            </button>
                        </div>

                        <LocationGrid locations={locations} refreshTrigger={refreshTrigger} />

                        {/* More locations placeholder */}
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
                                    <h3 className="font-semibold text-sm sm:text-base text-foreground">
                                        More locations
                                    </h3>
                                    <p className="text-muted text-xs mt-0.5">
                                        Coming soon
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Globe Section */}
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
                            
                            {/* Legend */}
                            <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm border border-muted rounded-lg p-3 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                                    <span className="text-xs text-foreground">Active</span>
                                </div>
                            </div>

                            {/* Uptime SLA */}
                            <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-muted rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-accent">99.9%</div>
                                <div className="text-xs text-foreground mt-1">Uptime SLA</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Hover tooltip */}
            <HoveredLocationTooltip location={hoveredLocation} mousePos={mousePos} refreshTrigger={refreshTrigger} />
        </div>
    );
}
