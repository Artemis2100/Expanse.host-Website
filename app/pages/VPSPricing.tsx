"use client";

import { motion } from "framer-motion";
import { useState, useMemo, memo, useEffect } from "react";
import { FiHardDrive, FiServer } from "react-icons/fi";
import { BiNetworkChart } from "react-icons/bi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import Image from "next/image";
import vpsPlansData from "@/app/json/vps/vps-plans.json";
import locationsData from "@/app/json/dedicated/locations.json";

const AMDIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64" className={className} fill="currentColor">
        <path d="M0 51.413v-12.57l17.938-17.938v25.137h25.137l-17.938 17.94H0zm55.25 3.343l-8.673-8.674v-28.6h-28.6L.512.018h63.452l.007 31.412.026 31.576a.78.78 0 0 1-.027.294c-.034.096-2.3-2.123-8.72-8.543z"></path>
    </svg>
);

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
    bandwidth: string;
    network: string;
    features: string[];
    price: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
    deliveryTime: string;
    popular?: boolean;
    availableLocations: string[];
    availableCPUs: ("Ryzen" | "EPYC")[];
    orderLink: string;
}

const locations: Location[] = locationsData as Location[];
const vpsPlans: VPSPlan[] = vpsPlansData as VPSPlan[];

const VPSCard = memo(({ plan, index }: { plan: VPSPlan; index: number }) => {
    const statusColors = {
        in_stock: "text-success",
        low_stock: "text-warning",
        out_of_stock: "text-destructive"
    };

    const statusText = {
        in_stock: "Available",
        low_stock: "Limited Stock",
        out_of_stock: "Out of Stock"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="relative h-full "
        >
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-1.5  text-xs font-bold border-dashed border-2 backdrop-blur-3xl border-muted text-primary rounded-md ">
                        MOST POPULAR
                    </span>
                </div>
            )}

            <div className={`group relative h-full  transition-all duration-300 overflow-hidden backdrop-blur-sm flex flex-col ${plan.popular
                    ? 'border-2  border-dashed border-muted s '
                    : 'border  border-muted hover:border-accent/50'
                }`}>
                <Ripple />

                <div className="relative z-10 p-6 border-b border-muted bg-gradient-to-br from-accent/5 to-transparent">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2 uppercase tracking-tight">
                                {plan.name}
                            </h3>
                            <span className={`inline-flex items-center text-xs font-semibold ${statusColors[plan.status]}`}>
                                {statusText[plan.status]}
                            </span>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="text-3xl font-bold text-foreground">
                                ${plan.price}
                            </div>
                            <div className="text-xs text-muted font-medium">per month</div>
                        </div>
                    </div>

                </div>

                
                <div className="relative z-10 flex-grow py-4 space-y-2">
                    
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/10">
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <AMDIcon className="w-4 h-4 text-accent" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-muted mb-0.5 font-medium">AMD {plan.cpu.type}</div>
                                <div className="text-sm font-bold text-foreground">
                                    {plan.cpu.cores} @ {plan.cpu.speed}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/10">
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <FiServer className="w-4 h-4 text-accent" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-muted mb-0.5 font-medium">Memory</div>
                                <div className="text-sm font-bold text-foreground">
                                    {plan.ram} RAM
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/10">
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <FiHardDrive className="w-4 h-4 text-accent" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-muted mb-0.5 font-medium">Storage</div>
                                <div className="text-sm font-bold text-foreground">
                                    {plan.storage.size} {plan.storage.type}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/10">
                            <div className="flex-shrink-0 mt-0.5">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <BiNetworkChart className="w-4 h-4 text-accent" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-muted mb-0.5 font-medium">Bandwidth</div>
                                <div className="text-sm font-bold text-foreground">
                                    {plan.bandwidth} Transfer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pb-4 bg-gradient-to-br from-transparent to-accent/5">
                    <div className="flex justify-end">
                        {plan.status === "out_of_stock" ? (
                            <motion.button
                                transition={{ duration: 0.2 }}
                                disabled={true}
                                className={`py-3.5 px-8 border-muted font-semibold transition-all opacity-50 cursor-not-allowed group flex items-center justify-center gap-2 ${plan.popular
                                        ? 'bg-accent border-l border-r rounded-l-3xl text-white'
                                        : 'border-t border-b border-l rounded-l-3xl border-muted'
                                    }`}
                            >
                                <span>Out of Stock</span>
                            </motion.button>
                        ) : (
                            <motion.a
                                href={plan.orderLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                transition={{ duration: 0.2 }}
                                className={`py-3.5 px-8 border-muted font-semibold transition-all group flex items-center justify-center gap-2 ${plan.popular
                                        ? 'bg-accent border-l border-r rounded-l-3xl text-white hover:bg-button'
                                        : 'border-t border-b border-l rounded-l-3xl border-muted hover:bg-button'
                                    }`}
                            >
                                <span>Get Started</span>
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                                </svg>
                            </motion.a>
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
});

VPSCard.displayName = "VPSCard";

export default function VPSPricing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRAM, setSelectedRAM] = useState<string>("all");
    const [selectedCPUType, setSelectedCPUType] = useState<"Ryzen" | "EPYC">("Ryzen");
    const [showOutOfStock, setShowOutOfStock] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 200 });

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

    useEffect(() => {
        const prices = vpsPlans.map(plan => plan.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPriceRange({ min, max });
    }, []);

    const filteredPlans = useMemo(() => {
        return vpsPlans.filter((plan) => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.cpu.cores.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.ram.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRAM = selectedRAM === "all" || plan.ram === selectedRAM;

            const matchesCPUType = plan.cpu.type === selectedCPUType;

            const matchesStock = showOutOfStock || plan.status !== "out_of_stock";

            const matchesPrice = plan.price >= priceRange.min && plan.price <= priceRange.max;
            const matchesLocation = plan.availableLocations.includes(selectedLocation.id);

            const matchesCPUAvailability = plan.availableCPUs.includes(selectedCPUType);

            return matchesSearch && matchesRAM && matchesCPUType && matchesStock && matchesPrice && matchesLocation && matchesCPUAvailability;
        });
    }, [searchQuery, selectedRAM, selectedCPUType, showOutOfStock, priceRange, selectedLocation]);

    const priceMinMax = useMemo(() => {
        const prices = vpsPlans.map(plan => plan.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }, []);

    const ramOptions = useMemo(() => {
        const rams = Array.from(new Set(vpsPlans.map(plan => plan.ram)));
        return ["all", ...rams];
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="relative w-full px-4 sm:px-6 mt-20 sm:mt-28 md:mt-32 lg:px-8">
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 sm:mb-8 md:mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                        Choose your perfect <span className="text-accent">VPS</span> plan
                    </h2>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        Powerful virtual private servers with full root access and guaranteed resources.{" "}
                        <span className="text-accent underline cursor-pointer">Contact us</span> if you need assistance choosing the right plan.
                    </p>
                    <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                        Need custom configurations or enterprise solutions? Our sales team is ready to help via{" "}
                        <span className="text-accent underline cursor-pointer">Discord</span> or{" "}
                        <span className="text-accent underline cursor-pointer">Support Ticket</span>
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-5 sm:mb-6"
                >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {locations.map((location) => (
                            <button
                                key={location.id}
                                onClick={() => setSelectedLocation(location)}
                                className={`px-3 sm:px-4 py-2 bg-card border rounded-xl text-xs sm:text-sm text-foreground font-medium transition-all duration-200 flex items-center gap-2 ${selectedLocation.id === location.id
                                        ? 'border-transparent bg-button text-white'
                                        : 'border-muted hover:border-accent'
                                    }`}
                            >
                                <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-sm overflow-hidden flex-shrink-0">
                                    <Image
                                        src={location.flag}
                                        alt={location.country}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="whitespace-nowrap">{location.city}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1.5 text-muted">
                            <AMDIcon className="w-4 h-4" />
                        </div>

                        <div className="bg-card p-1 gap-4 border border-muted rounded-full">
                            <button
                                onClick={() => setSelectedCPUType("Ryzen")}
                                className={`px-3 sm:px-4 py-2  border rounded-full  text-xs sm:text-sm font-medium transition-all duration-200 ${selectedCPUType === "Ryzen"
                                        ? 'border-transparent bg-button text-white'
                                        : 'border-transparent text-foreground hover:border-accent'
                                    }`}
                            >
                                AMD Ryzen
                            </button>
                            <button
                                onClick={() => setSelectedCPUType("EPYC")}
                                className={`px-3 sm:px-4 py-2 border rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${selectedCPUType === "EPYC"
                                        ? 'border-transparent bg-button text-white'
                                        : 'border-transparent text-foreground hover:border-accent'
                                    }`}
                            >
                                AMD EPYC
                            </button>
                        </div>
                    </div>
                </motion.div>

                {filteredPlans.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  pb-12"
                    >
                        {filteredPlans.map((plan, index) => (
                            <VPSCard key={plan.id} plan={plan} index={index} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 sm:py-16"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted/20 mb-4">
                            <FiServer className="w-8 h-8 sm:w-10 sm:h-10 text-muted" />
                        </div>
                        <p className="text-base sm:text-lg text-foreground font-semibold mb-2">No plans found</p>
                        <p className="text-sm text-muted">Try adjusting your filters or search query</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
