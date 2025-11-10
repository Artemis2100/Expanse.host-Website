"use client";

import { motion } from "motion/react";
import { useState, useMemo, memo, useEffect, useRef } from "react";
import { FiCpu, FiHardDrive, FiShield, FiServer, FiChevronDown, FiSearch } from "react-icons/fi";
import { BiNetworkChart } from "react-icons/bi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import Image from "next/image";
import dedicatedPlansData from "@/app/json/dedicated/dedicated-plans.json";
import locationsData from "@/app/json/dedicated/locations.json";
import { FaLifeRing, FaShieldAlt, FaKey, FaCheckCircle } from "react-icons/fa";
import { PriceDisplay } from "../components/Price";

interface Location {
    id: string;
    city: string;
    country: string;
    countryCode: string;
    flag: string;
}

interface DedicatedPlan {
    id: string;
    name: string;
    description: string;
    badge?: string;
    cpu: {
        model: string;
        cores: string;
        frequency: string;
    };
    ram: {
        default: string;
        options: Array<{ value: string; price: number }>;
    };
    storage: {
        default: string;
        options: Array<{ value: string; price: number }>;
    };
    network: {
        default: string;
        options: Array<{ value: string; price: number }>;
    };
    ddos: {
        provider: string;
        level: string;
    };
    price: number;
    status: "in_stock" | "low_stock" | "out_of_stock" | "pre_order";
    deliveryTime: string;
    location: string;
    orderLink: string;
}

const locations: Location[] = locationsData as Location[];
const dedicatedPlans: DedicatedPlan[] = dedicatedPlansData as DedicatedPlan[];

const LocationDropdown = memo(({
    selectedLocation,
    onLocationChange,
    locations
}: {
    selectedLocation: string;
    onLocationChange: (location: string) => void;
    locations: Location[];
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

    const getDisplayText = (locationId: string) => {
        if (locationId === "all") return "All Locations";
        const location = locations.find(l => l.id === locationId);
        return location ? `${location.city}, ${location.countryCode}` : "All Locations";
    };

    const handleSelect = (locationId: string) => {
        onLocationChange(locationId);
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
                <span className="font-medium truncate">{getDisplayText(selectedLocation)}</span>
                <FiChevronDown
                    className={`w-4 h-4 text-muted transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 z-[9999] backdrop-blur-xl bg-card border border-muted rounded-lg shadow-2xl overflow-hidden max-h-60 sm:max-h-64 overflow-y-auto"
                >
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSelect("all");
                        }}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 transition-colors text-left hover:bg-muted/10 active:bg-muted/20 ${
                            selectedLocation === "all"
                                ? 'bg-accent/10 border-l-2 border-accent'
                                : ''
                        }`}
                    >
                        <span className="text-foreground font-medium text-xs sm:text-sm truncate">All Locations</span>
                    </button>
                    {locations.map((location) => (
                        <button
                            type="button"
                            key={location.id}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelect(location.id);
                            }}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 transition-colors text-left hover:bg-muted/10 active:bg-muted/20 ${
                                selectedLocation === location.id
                                    ? 'bg-accent/10 border-l-2 border-accent'
                                    : ''
                            }`}
                        >
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-sm overflow-hidden flex-shrink-0">
                                <Image
                                    src={location.flag}
                                    alt={location.country}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-foreground font-medium text-xs sm:text-sm truncate">{location.city}, {location.countryCode}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

LocationDropdown.displayName = "LocationDropdown";

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
                <span className="font-medium truncate">{getDisplayText(selectedCPU)}</span>
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
                            <span className="text-foreground font-medium text-xs sm:text-sm truncate">{getDisplayText(cpu)}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

CPUDropdown.displayName = "CPUDropdown";

const OptionDropdown = memo(({
    value,
    options,
    onChange,
    disabled = false
}: {
    value: string;
    options: Array<{ value: string; price: number }>;
    onChange: (value: string) => void;
    disabled?: boolean;
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

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!disabled) setIsOpen(!isOpen);
                }}
                disabled={disabled}
                className={`w-full px-2 py-1.5 backdrop-blur-sm bg-card border border-muted rounded text-foreground text-xs hover:border-accent focus:outline-none transition-all flex items-center justify-between gap-2 ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                <span className="font-medium truncate text-xs">{value}</span>
                <FiChevronDown
                    className={`w-3 h-3 text-muted transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && !disabled && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 z-[9999] backdrop-blur-xl bg-card border border-muted rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                >
                    {options.map((option) => (
                        <button
                            type="button"
                            key={option.value}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelect(option.value);
                            }}
                            className={`w-full px-3 py-2.5 flex items-center justify-between transition-colors text-left hover:bg-muted/10 active:bg-muted/20 ${
                                value === option.value
                                    ? 'bg-accent/10 border-l-2 border-accent'
                                    : ''
                            }`}
                        >
                            <span className="text-foreground font-medium text-xs truncate">{option.value}</span>
                            {option.price !== 0 && (
                                <span className={`text-xs ml-2 ${option.price > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {option.price > 0 ? '+' : ''}
                                    <PriceDisplay usdPrice={Math.abs(option.price)} />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

OptionDropdown.displayName = "OptionDropdown";

const DedicatedCard = memo(({ plan, index }: { plan: DedicatedPlan; index: number }) => {
    const [selectedRAM, setSelectedRAM] = useState(plan.ram.default);
    const [selectedStorage, setSelectedStorage] = useState(plan.storage.default);
    const [selectedNetwork, setSelectedNetwork] = useState(plan.network.default);

    // Calculate total price based on selected options
    const calculateTotalPrice = useMemo(() => {
        const basePrice = plan.price;
        
        // Find selected RAM option price
        const ramOption = plan.ram.options.find(opt => opt.value === selectedRAM);
        const ramPrice = ramOption?.price || 0;
        
        // Find selected Storage option price
        const storageOption = plan.storage.options.find(opt => opt.value === selectedStorage);
        const storagePrice = storageOption?.price || 0;
        
        // Find selected Network option price
        const networkOption = plan.network.options.find(opt => opt.value === selectedNetwork);
        const networkPrice = networkOption?.price || 0;
        
        return basePrice + ramPrice + storagePrice + networkPrice;
    }, [plan.price, plan.ram.options, plan.storage.options, plan.network.options, selectedRAM, selectedStorage, selectedNetwork]);

    // Generate order link with selected options
    const generateOrderLink = () => {
        const locationName = locations.find(l => l.id === plan.location);
        const locationLabel = locationName ? `${locationName.city}, ${locationName.countryCode}` : plan.location;
        
        const message = `Hi, I'd like to purchase the dedicated server listed on your website with the following specs:

${plan.name}, ${selectedRAM}, ${selectedStorage}
${selectedNetwork}
${locationLabel}
Unmanaged

Thanks in advance!`;

        return `https://my.expanse.host/submitticket.php?step=2&deptid=1&subject=${encodeURIComponent("Dedicated Server Inquiry")}&message=${encodeURIComponent(message)}`;
    };

    const statusColors = {
        in_stock: "bg-green-500/10 text-green-500 border-green-500/20",
        low_stock: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        out_of_stock: "bg-red-500/10 text-red-500 border-red-500/20",
        pre_order: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    };

    const statusText = {
        in_stock: "In stock",
        low_stock: "In Stock",
        out_of_stock: "Out of Stock",
        pre_order: "Pre-Orders Open"
    };

    const buttonText = {
        in_stock: "Request this server",
        low_stock: "Limited Stock",
        out_of_stock: "Out of Stock",
        pre_order: "Pre-Book This Server"
    };

    const location = locations.find(l => l.id === plan.location);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative w-full"
        >
            <div className="group relative rounded-lg border border-muted hover:border-accent/50 transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
                <Ripple />
                <div className="relative z-10 p-4">
                    {/* Header - Compact */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                                {plan.badge && (
                                    <span className="px-2 py-0.5 text-xs font-semibold bg-accent/10 text-accent border border-accent/20 rounded whitespace-nowrap">
                                        {plan.badge}
                                    </span>
                                )}
                                {location && (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-muted/30 border border-muted rounded whitespace-nowrap">
                                        <div className="relative w-4 h-3 rounded-sm overflow-hidden flex-shrink-0">
                                            <Image
                                                src={location.flag}
                                                alt={location.country}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-xs text-muted font-medium">{location.city}, {location.countryCode}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-muted leading-relaxed">{plan.description}</p>
                        </div>
                    </div>

                    {/* Specs - Horizontal Compact Layout */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                        <div className="flex items-center gap-2">
                            <FiCpu className="w-4 h-4 text-accent flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-foreground leading-tight">{plan.cpu.cores}</span>
                                <span className="text-xs text-muted leading-tight">{plan.cpu.frequency}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiServer className="w-4 h-4 text-accent flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-foreground leading-tight">{selectedRAM.split(' ')[0]}</span>
                                <span className="text-xs text-muted leading-tight">{selectedRAM.split(' ').slice(1).join(' ')}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiHardDrive className="w-4 h-4 text-accent flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-foreground leading-tight">{selectedStorage.replace(/ \([^)]*\)/g, '').trim()}</span>
                                <span className="text-xs text-muted leading-tight">NVMe</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiShield className="w-4 h-4 text-accent flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-foreground leading-tight">{plan.ddos.provider}</span>
                                <span className="text-xs text-muted leading-tight">{plan.ddos.level}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <BiNetworkChart className="w-4 h-4 text-accent flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-foreground leading-tight">{selectedNetwork.split(' @ ')[0]}</span>
                                <span className="text-xs text-muted leading-tight">Network Speed : {selectedNetwork.split(' @ ')[1] || selectedNetwork.split(' : ')[1] || '10Gbps'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Configuration Options - Compact Inline */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        <OptionDropdown
                            value={selectedRAM}
                            options={plan.ram.options}
                            onChange={setSelectedRAM}
                            disabled={plan.status === "out_of_stock"}
                        />
                        <OptionDropdown
                            value={selectedStorage}
                            options={plan.storage.options}
                            onChange={setSelectedStorage}
                            disabled={plan.status === "out_of_stock"}
                        />
                        <OptionDropdown
                            value={selectedNetwork}
                            options={plan.network.options}
                            onChange={setSelectedNetwork}
                            disabled={plan.status === "out_of_stock"}
                        />
                    </div>

                    {/* Footer - Compact */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-muted">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded border ${statusColors[plan.status]}`}>
                                {statusText[plan.status]}
                            </span>
                            <span className="text-xs text-muted">Delivery {plan.deliveryTime}</span>
                            <span className="text-lg font-bold text-foreground">
                                <PriceDisplay usdPrice={calculateTotalPrice} />/mo
                            </span>
                        </div>
                        {plan.status === "out_of_stock" ? (
                            <button
                                disabled
                                className="px-4 py-2 bg-muted/20 text-muted border border-muted rounded text-xs font-semibold cursor-not-allowed whitespace-nowrap"
                            >
                                {buttonText[plan.status]}
                            </button>
                        ) : (
                            <a
                                href={generateOrderLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded text-xs font-semibold transition-colors whitespace-nowrap"
                            >
                                {buttonText[plan.status]}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

DedicatedCard.displayName = "DedicatedCard";

export default function DedicatedPricing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<string>("all");
    const [selectedCPU, setSelectedCPU] = useState<string>("all");
    const [showOutOfStock, setShowOutOfStock] = useState(false);
    const [isDark, setIsDark] = useState(true);

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
        return dedicatedPlans.filter((plan) => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.cpu.model.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesLocation = selectedLocation === "all" || plan.location === selectedLocation;

            const matchesCPU = selectedCPU === "all" || plan.cpu.model === selectedCPU;

            const matchesStock = showOutOfStock || plan.status !== "out_of_stock";

            return matchesSearch && matchesLocation && matchesCPU && matchesStock;
        });
    }, [searchQuery, selectedLocation, selectedCPU, showOutOfStock]);

    const cpuOptions = useMemo(() => {
        const cpus = Array.from(new Set(dedicatedPlans.map(plan => plan.cpu.model)));
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
                    <g filter="url(#filter0_f_dedicated_1)">
                        <ellipse cx="731.5" cy="300" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
                    </g>
                    <g filter="url(#filter1_f_dedicated_1)">
                        <ellipse cx="731.5" cy="626" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
                    </g>
                    <defs>
                        <filter id="filter0_f_dedicated_1" x="156" y="-102.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_dedicated_1" />
                        </filter>
                        <filter id="filter1_f_dedicated_1" x="156" y="223.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_dedicated_1" />
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 sm:mb-12"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                        Find the perfect <span className="text-accent">Dedicated Server</span> for you
                    </h1>
                    <p className="text-base sm:text-lg text-muted mb-4">
                        Fully owned hardware in top tier facilities. We won&apos;t let you down.
                    </p>
                    <p className="text-sm sm:text-base text-muted mb-2">
                        Feel free to contact us at any time if you need help picking a server via{" "}
                        <a href="https://discord.expanse.host" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">
                            Discord
                        </a>{" "}
                        or a{" "}
                        <a href="https://my.expanse.host/submitticket.php" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">
                            Sales ticket
                        </a>
                    </p>
                    <p className="text-sm sm:text-base text-muted">
                        Have a large community and need multiple machines? Reach out via the links above to our sales team for bulk pricing.
                    </p>
                </motion.div>

                {/* Location Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
                >
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

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6"
                >
                    <div className="relative flex-1 w-full min-w-0">
                        <input
                            type="text"
                            placeholder="Search servers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 sm:py-3 pl-10 bg-card border border-muted rounded-lg text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-accent transition-all"
                        />
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    </div>

                    <LocationDropdown
                        selectedLocation={selectedLocation}
                        onLocationChange={setSelectedLocation}
                        locations={locations}
                    />

                    <CPUDropdown
                        selectedCPU={selectedCPU}
                        onCPUChange={setSelectedCPU}
                        cpuOptions={cpuOptions}
                    />

                    <div className="flex items-center gap-2 px-4 py-2.5 bg-card border border-muted rounded-lg">
                        <input
                            type="checkbox"
                            id="showOutOfStock"
                            checked={showOutOfStock}
                            onChange={(e) => setShowOutOfStock(e.target.checked)}
                            className="w-4 h-4 text-accent rounded focus:ring-accent"
                        />
                        <label htmlFor="showOutOfStock" className="text-sm text-foreground cursor-pointer">
                            Show out of stock
                        </label>
                    </div>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mb-6"
                >
                    <p className="text-sm text-muted font-medium">
                        Showing {filteredPlans.length} of {dedicatedPlans.length} {dedicatedPlans.length === 1 ? 'server' : 'servers'}
                    </p>
                </motion.div>

                {/* Server Cards */}
                {filteredPlans.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col gap-4"
                    >
                        {filteredPlans.map((plan, index) => (
                            <DedicatedCard key={plan.id} plan={plan} index={index} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/20 mb-4">
                            <FiServer className="w-10 h-10 text-muted" />
                        </div>
                        <p className="text-lg text-foreground font-semibold mb-2">No servers found</p>
                        <p className="text-sm text-muted">Try adjusting your filters or search query</p>
                    </motion.div>
                )}

                {/* All Servers Include Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 sm:mt-20"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                        All Servers Include
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-card border border-muted rounded-lg hover:border-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                <FaLifeRing className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Rescue Mode</h3>
                            <p className="text-sm text-muted">Never get locked out of your server with our Rescue Mode.</p>
                        </div>

                        <div className="p-6 bg-card border border-muted rounded-lg hover:border-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                <FaShieldAlt className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">DDoS Protection</h3>
                            <p className="text-sm text-muted">Enterprise-grade protection up to 10Tbps+</p>
                        </div>

                        <div className="p-6 bg-card border border-muted rounded-lg hover:border-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                <FaKey className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Full Root Access</h3>
                            <p className="text-sm text-muted">Complete control over your server configuration</p>
                        </div>

                        <div className="p-6 bg-card border border-muted rounded-lg hover:border-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                <FaCheckCircle className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">99.9% Uptime</h3>
                            <p className="text-sm text-muted">Guaranteed reliability with SLA</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

