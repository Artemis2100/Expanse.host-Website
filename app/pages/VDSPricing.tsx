"use client";

import { motion } from "framer-motion";
import { useState, useMemo, memo, useEffect, useRef } from "react";
import { FiCpu, FiHardDrive, FiShield, FiServer, FiChevronDown } from "react-icons/fi";
import { BiNetworkChart } from "react-icons/bi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import Image from "next/image";
import vpsPlansData from "@/app/json/dedicated/vds-plans.json";
import locationsData from "@/app/json/dedicated/locations.json";

interface Location {
    id: string;
    city: string;
    country: string;
    countryCode: string;
    flag: string;
}

interface VDSPlan {
    id: string;
    name: string;
    cpu: {
        model: string;
        cores: string;
    };
    ram: {
        size: string;
        type: string;
    };
    storage: {
        size: string;
        type: string;
    };
    network: {
        speed: string;
        description: string;
    };
    ddos: {
        enabled: boolean;
        level: string;
    };
    price: number;
    status: "in_stock" | "low_stock" | "out_of_stock";
    deliveryTime: string;
    badge?: string;
}

// Load data from JSON files with type assertions
const locations: Location[] = locationsData as Location[];
const vdsPlans: VDSPlan[] = vpsPlansData as VDSPlan[];

const CPUDropdown = memo(({
    selectedCPU,
    onCPUChange,
    cpuOptions
}: {
    selectedCPU: string;
    onCPUChange: (cpu: string) => void;
    cpuOptions: string[];
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getDisplayText = (cpu: string) => {
        if (cpu === "all") return "All CPUs";
        return cpu;
    };

    const getCPUImage = (cpu: string) => {
        if (cpu === "all") return "/cpu/ryzen9.png";
        if (cpu.includes("Ryzen 9 7950X")) return "/cpu/ryzen9.png";
        if (cpu.includes("Ryzen 9 5950X")) return "/cpu/ryzen9.png";
        if (cpu.includes("EPYC")) return "/cpu/intel.png";
        return "/cpu/ryzen9.png";
    };

    const handleSelect = (cpu: string) => {
        onCPUChange(cpu);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="w-full sm:w-64 px-4 py-2.5 sm:py-3 backdrop-blur-sm bg-card border border-muted rounded-lg text-foreground text-sm hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all flex items-center justify-between gap-3"
            >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                            src={getCPUImage(selectedCPU)}
                            alt="CPU"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-medium truncate">{getDisplayText(selectedCPU)}</span>
                </div>
                <FiChevronDown
                    className={`w-4 h-4 text-muted transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 z-[9999] backdrop-blur-xl bg-card border border-muted rounded-lg shadow-2xl overflow-hidden max-h-60 sm:max-h-64 overflow-y-auto"
                >
                    {cpuOptions.map((cpu) => (
                        <button
                            type="button"
                            key={cpu}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelect(cpu);
                            }}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 transition-colors text-left hover:bg-muted/10 active:bg-muted/20 ${
                                selectedCPU === cpu
                                    ? 'bg-accent/10 border-l-2 border-accent'
                                    : ''
                            }`}
                        >
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-sm overflow-hidden flex-shrink-0">
                                <Image
                                    src={getCPUImage(cpu)}
                                    alt="CPU"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-foreground font-medium text-xs sm:text-sm truncate">{getDisplayText(cpu)}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

CPUDropdown.displayName = "CPUDropdown";

const VDSCard = memo(({ plan, index }: { plan: VDSPlan; index: number }) => {
    const statusColors = {
        in_stock: "text-success",
        low_stock: "text-warning",
        out_of_stock: "text-destructive"
    };

    const statusText = {
        in_stock: "In Stock",
        low_stock: "Low Stock",
        out_of_stock: "Out of Stock"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            className="relative h-full"
        >
            {/* Badge */}
            {plan.badge && (
                <div className="absolute -top-3 left-6 z-10">
                    <span className="px-3 py-1 text-xs font-bold bg-accent text-accent-foreground rounded-md shadow-lg">
                        {plan.badge}
                    </span>
                </div>
            )}

            {/* Card */}
            <div className="h-full flex flex-col rounded-xl border border-muted hover:border-accent/50 transition-all duration-300">
                <div className="flex flex-col flex-grow rounded-xl relative z-50">
                    <Ripple />
                    <div className="p-4 sm:p-5 md:p-6 rounded-xl">
                        {/* Header */}
                        <div className="flex flex-col xs:flex-row items-start xs:justify-between mb-4 gap-3 xs:gap-2">
                            <div className="flex-1">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 tracking-wide">
                                    {plan.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className={`text-xs font-medium ${statusColors[plan.status]}`}>
                                        {statusText[plan.status]}
                                    </span>
                                    <span className="text-xs text-muted hidden xs:inline">•</span>
                                    <span className="text-xs text-muted">{plan.deliveryTime}</span>
                                </div>
                            </div>
                            <div className="text-left xs:text-right">
                                <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground">
                                    ${plan.price}
                                </div>
                                <div className="text-xs text-muted">/month</div>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                            {/* CPU */}
                            <div className="flex items-start gap-2.5 sm:gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <FiCpu className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">
                                        {plan.cpu.cores}
                                    </div>
                                    <div className="text-xs text-muted truncate">{plan.cpu.model}</div>
                                </div>
                            </div>

                            {/* RAM */}
                            <div className="flex items-start gap-2.5 sm:gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <FiServer className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">
                                        {plan.ram.size}
                                    </div>
                                    <div className="text-xs text-muted">{plan.ram.type}</div>
                                </div>
                            </div>

                            {/* Storage */}
                            <div className="flex items-start gap-2.5 sm:gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <FiHardDrive className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">
                                        {plan.storage.size}
                                    </div>
                                    <div className="text-xs text-muted">{plan.storage.type}</div>
                                </div>
                            </div>

                            {/* Network */}
                            <div className="flex items-start gap-2.5 sm:gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <BiNetworkChart className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">
                                        {plan.network.speed}
                                    </div>
                                    <div className="text-xs text-muted">{plan.network.description}</div>
                                </div>
                            </div>

                            {/* DDoS Protection */}
                            <div className="flex items-start gap-2.5 sm:gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <FiShield className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5">
                                        GSL DDoS Protection
                                    </div>
                                    <div className="text-xs text-muted">{plan.ddos.level}</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            disabled={plan.status === "out_of_stock"}
                            className="w-full flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-button text-primary-foreground rounded-lg text-sm sm:text-base font-semibold hover:bg-button-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="truncate">{plan.status === "out_of_stock" ? "Out of Stock" : "Request this server"}</span>
                            {plan.status !== "out_of_stock" && (
                                <svg
                                    className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

VDSCard.displayName = "VDSCard";

export default function VDSPricing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCPU, setSelectedCPU] = useState<string>("all");
    const [showOutOfStock, setShowOutOfStock] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);

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

    const filteredPlans = useMemo(() => {
        return vdsPlans.filter((plan) => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.cpu.model.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCPU = selectedCPU === "all" || plan.cpu.model === selectedCPU;

            const matchesStock = showOutOfStock || plan.status !== "out_of_stock";

            return matchesSearch && matchesCPU && matchesStock;
        });
    }, [searchQuery, selectedCPU, showOutOfStock]);

    const cpuOptions = useMemo(() => {
        const cpus = Array.from(new Set(vdsPlans.map(plan => plan.cpu.model)));
        return ["all", ...cpus];
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <section className="relative w-full px-4 sm:px-6 mt-20 sm:mt-28 md:mt-32 lg:px-8">
            {/* Blue gradient SVG - matching Location.tsx pattern */}
            <div className="absolute top-1/2 left-1/2 opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="1463" height="926" viewBox="0 0 1463 926" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_vps_1)">
                        <ellipse cx="731.5" cy="300" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
                    </g>
                    <g filter="url(#filter1_f_vps_1)">
                        <ellipse cx="731.5" cy="626" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
                    </g>
                    <defs>
                        <filter id="filter0_f_vps_1" x="156" y="-102.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_vps_1" />
                        </filter>
                        <filter id="filter1_f_vps_1" x="156" y="223.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_vps_1" />
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 sm:mb-8 md:mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                        Find the perfect <span className="text-accent">VDS</span> for you
                    </h2>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        Feel free to contact us at any time if you need help picking a server via{" "}
                        <span className="text-accent underline cursor-pointer">Discord</span> or a{" "}
                        <span className="text-accent underline cursor-pointer">Sales ticket</span>
                    </p>
                    <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                        Have a large community and need multiple machines? Reach out via the links above to our sales team for bulk pricing.
                    </p>
                </motion.div>

                {/* Location Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6"
                >
                    {locations.map((location) => (
                        <button
                            key={location.id}
                            onClick={() => setSelectedLocation(location)}
                            className={`px-3 sm:px-4 py-2 bg-card border rounded-lg text-xs sm:text-sm text-foreground font-medium transition-all duration-200 flex items-center gap-2 ${
                                selectedLocation.id === location.id
                                    ? 'border-accent bg-accent/10 shadow-md'
                                    : 'border-muted hover:border-accent hover:shadow-sm'
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
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-6 items-stretch sm:items-center"
                >
                    {/* Search */}
                    <div className="relative flex-1 w-full min-w-0">
                        <input
                            type="text"
                            placeholder="Search servers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 sm:py-3 bg-card border border-muted rounded-lg text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                        />
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* CPU Filter */}
                    <CPUDropdown
                        selectedCPU={selectedCPU}
                        onCPUChange={setSelectedCPU}
                        cpuOptions={cpuOptions}
                    />

                </motion.div>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mb-4 sm:mb-5"
                >
                    <p className="text-xs sm:text-sm text-muted font-medium">
                        Showing {filteredPlans.length} of {vdsPlans.length} {vdsPlans.length === 1 ? 'server' : 'servers'}
                    </p>
                </motion.div>

                {/* VDS Plans Grid */}
                {filteredPlans.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                    >
                        {filteredPlans.map((plan, index) => (
                            <VDSCard key={plan.id} plan={plan} index={index} />
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
                        <p className="text-base sm:text-lg text-foreground font-semibold mb-2">No servers found</p>
                        <p className="text-sm text-muted">Try adjusting your filters or search query</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
