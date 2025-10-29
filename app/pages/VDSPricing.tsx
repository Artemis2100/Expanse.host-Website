"use client";

import { motion } from "framer-motion";
import { useState, useMemo, memo, useEffect, useRef } from "react";
import { FiCpu, FiHardDrive, FiShield, FiServer, FiChevronDown, FiFilter } from "react-icons/fi";
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
    orderLink: string;
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
        if (cpu === "all") return "/cpu/intel.png";
        if (cpu.includes("Ryzen 9 7950X")) return "/cpu/ryzen9.png";
        if (cpu.includes("Ryzen 9 5950X")) return "/cpu/ryzen9.png";
        if (cpu.includes("Intel")) return "/cpu/intel.png";
        if (cpu.includes("EPYC")) return "/cpu/epyc.png";
        return "/cpu/ryzen9.png";
    };

    const handleSelect = (cpu: string) => {
        onCPUChange(cpu);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="w-full sm:w-64 px-4 py-2.5 sm:py-2.5 backdrop-blur-sm bg-card border border-muted rounded text-foreground text-sm hover:border-accent focus:outline-none transition-all flex items-center justify-between gap-3"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="relative w-full "
        >
            
            {plan.badge && (
                <div className="absolute -top-3 left-6 z-10">
                    <span className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-black border border-muted text-accent-foreground rounded ">
                        {plan.badge}
                    </span>
                </div>
            )}

            
            <div className=" group relative rounded border border-muted hover:border-accent/50 transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
                <Ripple />
                <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
                    
                    <div className="flex-shrink-0 lg:w-56bg-gradient-to-br from-accent/5 to-transparent border-b lg:border-b-0 lg:border-r border-muted flex flex-col">
                        <div className="flex-grow  p-5 sm:p-6 ">
                            <h3 className="text-lg mt-8 sm:text-xl font-bold uppercase text-foreground mb-2 tracking-tight">
                                {plan.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`inline-flex items-center rounded-full text-xs font-semibold ${statusColors[plan.status]}`}>
                                    {statusText[plan.status]}
                                </span>
                                <span className="text-xs text-muted">{plan.deliveryTime}</span>
                            </div>
                        </div>

                        
                        <div className="flex flex-wrap gap-2 mt-4 pt-4  p-5 sm:p-6  border-t border-muted">
                            <span className="px-2.5 py-1  text-accent text-xs font-medium  border border-muted">
                                {plan.storage.type} Storage
                            </span>
                            {plan.ram.type === "DDR5" && (
                            <span className="px-2.5 py-1 text-accent text-xs font-medium rounded border border-muted">
                                    DDR5 RAM
                                </span>
                            )}
                        </div>
                    </div>

                    
                    <div className="flex-grow p-3 sm:p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <FiCpu className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">CPU</div>
                                    <div className="text-sm font-bold text-foreground mb-0.5">
                                        {plan.cpu.cores}
                                    </div>
                                    <div className="text-xs text-muted truncate">{plan.cpu.model}</div>
                                </div>
                            </div>

                            
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <FiServer className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">RAM</div>
                                    <div className="text-sm font-bold text-foreground mb-0.5">
                                        {plan.ram.size}
                                    </div>
                                    <div className="text-xs text-muted">{plan.ram.type}</div>
                                </div>
                            </div>

                            
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <FiHardDrive className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Storage</div>
                                    <div className="text-sm font-bold text-foreground mb-0.5">
                                        {plan.storage.size}
                                    </div>
                                    <div className="text-xs text-muted">{plan.storage.type}</div>
                                </div>
                            </div>

                            
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <BiNetworkChart className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Network</div>
                                    <div className="text-sm font-bold text-foreground mb-0.5">
                                        {plan.network.speed}
                                    </div>
                                    <div className="text-xs text-muted">{plan.network.description}</div>
                                </div>
                            </div>

                            
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors sm:col-span-2 lg:col-span-1">
                                <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <FiShield className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Protection</div>
                                    <div className="text-sm font-bold text-foreground mb-0.5">
                                        GSL DDoS
                                    </div>
                                    <div className="text-xs text-muted">{plan.ddos.level}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex-shrink-0 lg:w-64 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-muted bg-gradient-to-br from-transparent to-accent/5 ">
                        <div className="mb-6 text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                                ${plan.price}
                            </div>
                            <div className="text-sm text-muted font-medium">per month</div>
                        </div>
                        {plan.status === "out_of_stock" ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                disabled={true}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border-t border-b border-muted hover:bg-button  text-accent-foreground font-semibold transition-all opacity-50 cursor-not-allowed group"
                            >
                                <span>Out of Stock</span>
                            </motion.button>
                        ) : (
                            <motion.a
                                href={plan.orderLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border-t border-b border-muted hover:bg-button  text-accent-foreground font-semibold transition-all group"
                            >
                                <span>Order Now</span>
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

VDSCard.displayName = "VDSCard";

export default function VDSPricing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCPU, setSelectedCPU] = useState<string>("all");
    const [showOutOfStock, setShowOutOfStock] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 6;

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

    // Initialize price range based on actual data
    useEffect(() => {
        const prices = vdsPlans.map(plan => plan.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPriceRange({ min, max });
    }, []);

    const filteredPlans = useMemo(() => {
        return vdsPlans.filter((plan) => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.cpu.model.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCPU = selectedCPU === "all" || plan.cpu.model === selectedCPU;

            const matchesStock = showOutOfStock || plan.status !== "out_of_stock";

            const matchesPrice = plan.price >= priceRange.min && plan.price <= priceRange.max;

            return matchesSearch && matchesCPU && matchesStock && matchesPrice;
        });
    }, [searchQuery, selectedCPU, showOutOfStock, priceRange]);

    // Get min and max prices from all plans
    const priceMinMax = useMemo(() => {
        const prices = vdsPlans.map(plan => plan.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
    const paginatedPlans = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredPlans.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredPlans, currentPage]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCPU, showOutOfStock, priceRange]);

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
        <section className="mb-16 relative w-full px-4 sm:px-6 mt-20 sm:mt-28 md:mt-32 lg:px-8">
            
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
                            className={`px-3 sm:px-4 py-2 bg-card border rounded text-xs sm:text-sm text-foreground font-medium transition-all duration-200 flex items-center gap-2 ${
                                selectedLocation.id === location.id
                                    ? 'border-transparent bg-button text-white'
                                    : 'border-muted hover:border-accent '
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
                            <span className="whitespace-nowrap ">{location.city}</span>
                        </button>
                    ))}
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6"
                >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                        
                        <div className="relative flex-1 w-full min-w-0">
                            <input
                                type="text"
                                placeholder="Search servers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2.5 sm:py-3 bg-card border border-muted rounded text-foreground text-sm placeholder:text-muted focus:outline-none  transition-all"
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

                        
                        <CPUDropdown
                            selectedCPU={selectedCPU}
                            onCPUChange={setSelectedCPU}
                            cpuOptions={cpuOptions}
                        />

                        
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-4 py-2.5 sm:py-2.5 backdrop-blur-sm bg-card border rounded text-foreground text-sm hover:border-accent focus:outline-none transition-all flex items-center gap-2 ${
                                showFilters ? 'bg-button text-white border-transparent' : 'border-muted'
                            }`}
                        >
                            <FiFilter className="w-4 h-4" />
                            <span className="font-medium">Filters</span>
                        </button>
                    </div>

                    
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 sm:p-5 bg-card border border-muted rounded">
                                <div className="flex flex-col gap-4">
                                    
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground mb-3">Price Range (per month)</h3>
                                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                                            
                                            <div className="flex-1 w-full">
                                                <label className="block text-xs text-muted mb-2">Min Price</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
                                                    <input
                                                        type="number"
                                                        min={priceMinMax.min}
                                                        max={priceRange.max}
                                                        value={priceRange.min}
                                                        onChange={(e) => {
                                                            const newMin = Number(e.target.value);
                                                            if (newMin >= priceMinMax.min && newMin < priceRange.max) {
                                                                setPriceRange(prev => ({ ...prev, min: newMin }));
                                                            }
                                                        }}
                                                        className="w-full pl-7 pr-3 py-2.5 bg-background border border-muted rounded text-foreground text-sm focus:outline-none focus:border-accent transition-all"
                                                    />
                                                </div>
                                            </div>

                                            
                                            <div className="flex-1 w-full">
                                                <label className="block text-xs text-muted mb-2">Max Price</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
                                                    <input
                                                        type="number"
                                                        min={priceRange.min}
                                                        max={priceMinMax.max}
                                                        value={priceRange.max}
                                                        onChange={(e) => {
                                                            const newMax = Number(e.target.value);
                                                            if (newMax <= priceMinMax.max && newMax > priceRange.min) {
                                                                setPriceRange(prev => ({ ...prev, max: newMax }));
                                                            }
                                                        }}
                                                        className="w-full pl-7 pr-3 py-2.5 bg-background border border-muted rounded text-foreground text-sm focus:outline-none focus:border-accent transition-all"
                                                    />
                                                </div>
                                            </div>

                                            
                                            <button
                                                onClick={() => setPriceRange({ min: priceMinMax.min, max: priceMinMax.max })}
                                                className="px-4 py-2.5 text-sm font-medium text-accent border border-muted rounded hover:bg-muted/10 transition-colors whitespace-nowrap"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                        <p className="text-xs text-muted mt-2">
                                            Showing servers from ${priceRange.min} to ${priceRange.max}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </motion.div>

                
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

                
                {filteredPlans.length > 0 ? (
                    <>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="flex flex-col gap-5 md:gap-6"
                        >
                            {paginatedPlans.map((plan, index) => (
                                <VDSCard key={plan.id} plan={plan} index={index} />
                            ))}
                        </motion.div>

                        
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 sm:mt-10 pt-6 border-t border-muted"
                            >
                                
                                <div className="text-sm text-muted">
                                    Page {currentPage} of {totalPages} ({filteredPlans.length} total servers)
                                </div>

                                
                                <div className="flex items-center gap-2">
                                    
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 border border-muted rounded text-foreground hover:bg-muted/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                            // Show first page, last page, current page, and pages around current
                                            const showPage = page === 1 ||
                                                           page === totalPages ||
                                                           Math.abs(page - currentPage) <= 1;

                                            const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                                            const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                                            if (showEllipsisBefore || showEllipsisAfter) {
                                                return (
                                                    <span key={page} className="px-2 text-muted">
                                                        ...
                                                    </span>
                                                );
                                            }

                                            if (!showPage) return null;

                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`min-w-[40px] px-3 py-2 border rounded text-sm font-medium transition-all ${
                                                        currentPage === page
                                                            ? 'bg-accent text-white border-accent'
                                                            : 'border-muted text-foreground hover:bg-muted/10'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 border border-muted rounded text-foreground hover:bg-muted/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </>
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
