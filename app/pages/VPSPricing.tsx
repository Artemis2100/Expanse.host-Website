"use client";

import { motion } from "motion/react";
import { useState, useMemo, memo } from "react";
import { FiHardDrive, FiServer, FiCpu, FiShield } from "react-icons/fi";
import { BiNetworkChart } from "react-icons/bi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import Image from "next/image";
import vpsPlansData from "@/app/json/vps/vps-plans.json";
import locationsData from "@/app/json/dedicated/locations.json";
import { PriceDisplay } from "../components/Price";
import Link from "next/link";
import { useVPSPrices } from "@/app/hooks/use-vps-prices";
import { vpsPlanToPID } from "@/app/config/whmcs-config";

interface Location {
    id: string;
    city: string;
    country: string;
    countryCode: string;
    flag: string;
}

interface VPSPlan {
    id: string;
    name: string;
    cpu: {
        cores: string;
        speed: string;
        type: "Ryzen" | "EPYC";
    };
    ram: string;
    storage: {
        size: string;
        type: string;
    };
    bandwidth: {
        naeu: string;
        apac: string;
    };
    network: string;
    price: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
    popular?: boolean;
    availableLocations: string[];
    availableCPUs: ("Ryzen" | "EPYC")[];
    useCase?: string;
    orderLink: string;
}

const locations: Location[] = locationsData as Location[];
const vpsPlans: VPSPlan[] = vpsPlansData as VPSPlan[];

// Expand plans to include location-specific instances
interface VPSPlanWithLocation extends VPSPlan {
    locationId: string;
    location: Location;
}

const VPSCard = memo(({ 
    planWithLocation, 
    index,
    whmcsPrice
}: { 
    planWithLocation: VPSPlanWithLocation; 
    index: number;
    whmcsPrice?: number;
}) => {
    if (!planWithLocation || !planWithLocation.location) {
        return null;
    }

    const location = planWithLocation.location;
    const isComingSoon = planWithLocation.name === "EPYC Plans" || planWithLocation.status === "out_of_stock";
    
    // Use WHMCS price if available, otherwise fall back to JSON price
    const displayPrice = whmcsPrice !== undefined ? whmcsPrice : planWithLocation.price;
    
    // Determine if location is NA/EU or APAC
    const isAPAC = planWithLocation.locationId === "sg" || 
                   planWithLocation.locationId === "my" || 
                   planWithLocation.locationId === "in";
    const isNAEU = !isAPAC;
    const bandwidth = isNAEU ? planWithLocation.bandwidth.naeu : planWithLocation.bandwidth.apac;
    
    // Generate order link with correct PID based on location
    const generateOrderLink = () => {
        if (isComingSoon) return "#";
        
        // Build the plan ID key: use -apac suffix for APAC locations
        const planIdKey = isAPAC ? `${planWithLocation.id}-apac` : planWithLocation.id;
        const pid = vpsPlanToPID[planIdKey] || vpsPlanToPID[planWithLocation.id];
        
        if (!pid) {
            console.warn(`No PID found for plan ${planIdKey}, using fallback`);
            return planWithLocation.orderLink; // Fallback to JSON orderLink
        }
        
        return `https://my.expanse.host/cart.php?a=add&pid=${pid}`;
    };
    
    const orderLink = generateOrderLink();


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative h-full"
        >
            {planWithLocation.popular && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-2 py-0.5 text-xs font-bold bg-accent/10 text-accent border border-accent/20 rounded">
                        POPULAR
                    </span>
                </div>
            )}

            <div className={`group relative h-full transition-all duration-300 overflow-hidden backdrop-blur-sm flex flex-col border rounded-lg ${
                planWithLocation.popular
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-muted hover:border-accent/50'
            }`}>
                <Ripple />
                
                <div className="relative z-10 p-4 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-base font-bold text-foreground">{planWithLocation.name}</h3>
                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted/30 border border-muted rounded">
                                    <div className="relative w-3 h-2.5 rounded-sm overflow-hidden flex-shrink-0">
                                        <Image
                                            src={location.flag}
                                            alt={location.country}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-[10px] text-muted font-medium">{location.countryCode}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right ml-2 flex-shrink-0">
                            <div className="text-xl font-bold text-foreground">
                                {isComingSoon ? (
                                    <span className="text-muted text-sm">Coming Soon</span>
                                ) : (
                                    <>
                                        <PriceDisplay usdPrice={displayPrice} />
                                        <span className="text-xs font-normal text-muted ml-1">/mo</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Specs - Compact Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3 flex-grow">
                        <div className="flex items-center gap-1.5">
                            <FiCpu className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <div className="min-w-0">
                                <div className="text-xs text-muted leading-tight">CPU</div>
                                <div className="text-xs font-semibold text-foreground leading-tight">{planWithLocation.cpu.cores}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FiServer className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <div className="min-w-0">
                                <div className="text-xs text-muted leading-tight">RAM</div>
                                <div className="text-xs font-semibold text-foreground leading-tight">{planWithLocation.ram}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FiHardDrive className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <div className="min-w-0">
                                <div className="text-xs text-muted leading-tight">Storage</div>
                                <div className="text-xs font-semibold text-foreground leading-tight">{planWithLocation.storage.size}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BiNetworkChart className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <div className="min-w-0">
                                <div className="text-xs text-muted leading-tight">Bandwidth</div>
                                <div className="text-xs font-semibold text-foreground leading-tight">
                                    {bandwidth}
                                    <span className="text-[10px] text-muted ml-0.5">({isNAEU ? 'NA/EU' : 'APAC'})</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-2 border-t border-muted mt-auto">
                        {isComingSoon ? (
                            <button
                                disabled
                                className="w-full py-2 px-4 bg-muted/50 text-muted text-xs font-medium rounded cursor-not-allowed"
                            >
                                Coming Soon
                            </button>
                        ) : planWithLocation.status === "out_of_stock" ? (
                            <button
                                disabled
                                className="w-full py-2 px-4 bg-muted/50 text-muted text-xs font-medium rounded cursor-not-allowed"
                            >
                                Out of Stock
                            </button>
                        ) : (
                            <a
                                href={orderLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2 px-4 bg-button hover:bg-button-hover text-white text-xs font-medium rounded text-center transition-colors"
                            >
                                Get Started
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

VPSCard.displayName = "VPSCard";

export default function VPSPricing() {
    // Default to first available location instead of "all"
    const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]?.id || "all");
    const [selectedCPUType, setSelectedCPUType] = useState<"Ryzen" | "EPYC">("Ryzen");
    
    // Fetch prices from WHMCS (refreshes every 10 minutes)
    const { prices: whmcsPrices } = useVPSPrices();

    // Expand plans to create location-specific instances
    const plansWithLocations = useMemo(() => {
        const expanded: VPSPlanWithLocation[] = [];
        
        vpsPlans.forEach(plan => {
            if (plan.availableCPUs.includes(selectedCPUType)) {
                plan.availableLocations.forEach(locationId => {
                    const location = locations.find(l => l.id === locationId);
                    if (location) {
                        expanded.push({
                            ...plan,
                            locationId,
                            location
                        });
                    }
                });
            }
        });

        return expanded;
    }, [selectedCPUType]);

    const filteredPlans = useMemo(() => {
        return plansWithLocations.filter((planWithLocation) => {
            if (selectedLocation === "all") return true;
            return planWithLocation.locationId === selectedLocation;
        });
    }, [plansWithLocations, selectedLocation]);

    return (
        <section className="relative w-full px-4 sm:px-6 mt-20 sm:mt-28 md:mt-32 lg:px-8 pb-12">
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                        Choose your perfect <span className="text-accent">VPS</span> plan
                    </h2>
                    <p className="text-sm text-muted mb-1">
                        <strong>Ryzen 9 9950X · DDR5 · NVMe · 10 Gbps</strong>
                    </p>
                    <p className="text-xs sm:text-sm text-muted">
                        High-performance virtual private servers with full root access and guaranteed resources.
                    </p>
                </motion.div>

                {/* Location Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap gap-2 sm:gap-3 mb-6"
                >
                    <button
                        onClick={() => setSelectedLocation("all")}
                        className={`px-4 py-2 bg-card border rounded-lg text-sm text-foreground font-medium transition-all duration-200 ${
                            selectedLocation === "all"
                                ? 'border-transparent bg-accent text-white'
                                : 'border-muted hover:border-accent'
                        }`}
                    >
                        All Locations
                    </button>
                    {locations.map((location) => (
                        <button
                            key={location.id}
                            onClick={() => setSelectedLocation(location.id)}
                            className={`px-4 py-2 bg-card border rounded-lg text-sm text-foreground font-medium transition-all duration-200 flex items-center gap-2 ${
                                selectedLocation === location.id
                                    ? 'border-transparent bg-accent text-white'
                                    : 'border-muted hover:border-accent'
                            }`}
                        >
                            <div className="relative w-5 h-5 rounded-sm overflow-hidden flex-shrink-0">
                                <Image
                                    src={location.flag}
                                    alt={location.country}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="whitespace-nowrap">{location.city}, {location.countryCode}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 mb-6"
                >
                    {/* CPU Type Selector */}
                    <div className="flex items-center gap-2 bg-card p-1 border border-muted rounded-lg">
                        <button
                            onClick={() => setSelectedCPUType("Ryzen")}
                            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                                selectedCPUType === "Ryzen"
                                    ? 'bg-button text-white'
                                    : 'text-foreground hover:bg-muted/50'
                            }`}
                        >
                            AMD Ryzen
                        </button>
                        <button
                            onClick={() => setSelectedCPUType("EPYC")}
                            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                                selectedCPUType === "EPYC"
                                    ? 'bg-button text-white'
                                    : 'text-foreground hover:bg-muted/50'
                            }`}
                        >
                            AMD EPYC
                        </button>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center text-sm text-muted ml-auto">
                        Showing {filteredPlans.length} {filteredPlans.length === 1 ? 'plan' : 'plans'}
                    </div>
                </motion.div>

                {/* Plans Grid - Card Layout */}
                {filteredPlans.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
                    >
                        {filteredPlans.map((planWithLocation, index) => {
                            // Determine if this is an APAC location
                            const isAPAC = planWithLocation.locationId === "sg" || 
                                         planWithLocation.locationId === "my" || 
                                         planWithLocation.locationId === "in";
                            
                            // Build price lookup key: regular plans use planId, APAC plans use planId-apac
                            const priceKey = isAPAC ? `${planWithLocation.id}-apac` : planWithLocation.id;
                            const whmcsPrice = whmcsPrices[priceKey] || whmcsPrices[planWithLocation.id];
                            
                            return (
                                <VPSCard 
                                    key={`${planWithLocation.id}-${planWithLocation.locationId}`} 
                                    planWithLocation={planWithLocation} 
                                    index={index}
                                    whmcsPrice={whmcsPrice}
                                />
                            );
                        })}
                    </motion.div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted">No plans available for the selected filters.</p>
                    </div>
                )}

                {/* Common Information Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 p-5 bg-card/50 border border-muted rounded-lg backdrop-blur-sm"
                >
                    <h3 className="text-base font-bold text-foreground mb-4">Additional Options & Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                            <h4 className="font-semibold text-foreground mb-2 text-sm">Bandwidth Upgrades</h4>
                            <ul className="space-y-1 text-muted">
                                <li>• Extra Bandwidth: <strong className="text-foreground">$2/TB</strong> for NA/EU regions</li>
                                <li>• Extra Bandwidth: <strong className="text-foreground">$4/TB</strong> for Asia Pacific regions</li>
                                <li>• 1Gbit unmetered available</li>
                                <li>• 10Gbit unmetered available</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-2 text-sm">Network & Security</h4>
                            <ul className="space-y-1 text-muted">
                                <li>• Extra IPs: <strong className="text-foreground">$2.5/IP</strong> address</li>
                                <li>• VLAN Support: <strong className="text-foreground">Available</strong> (Debian 13 & RHEL 10 only)</li>
                                <li>• BGP Sessions: <span className="text-muted italic">Available soon</span></li>
                                <li>• DDoS Protection: <strong className="text-foreground">Included</strong> in each plan</li>
                                <li>• For more DDoS info, see our <Link href="/infrastructure" className="text-accent hover:underline">Infrastructure page</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-muted">
                        <p className="text-xs text-muted">
                            <strong className="text-foreground">Note:</strong> All plans include DDoS protection. Bandwidth amounts vary by region (NA/EU regions receive 2x APAC bandwidth). Storage is calculated as 15x RAM for all plans.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
