"use client";

import { motion } from "motion/react";
import { useState, memo, useMemo } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { 
    FiServer, FiShield, FiZap, FiThermometer, FiAlertCircle, 
    FiHeadphones, FiCheck, FiMapPin, FiGlobe
} from "react-icons/fi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import colocationData from "../json/colocation.json";
import { PriceDisplay } from "../components/Price";

const iconMap: { [key: string]: React.ReactElement } = {
    uptime: <FiServer className="w-6 h-6" />,
    security: <FiShield className="w-6 h-6" />,
    power: <FiZap className="w-6 h-6" />,
    climate: <FiThermometer className="w-6 h-6" />,
    fire: <FiAlertCircle className="w-6 h-6" />,
    support: <FiHeadphones className="w-6 h-6" />
};

const colorMap: { [key: string]: string } = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    cyan: "text-cyan-400"
};

const ColocationPlanCard = memo(({ plan, location, index }: { plan: any; location: any; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
    >
        <div className={`relative h-full p-6 border rounded-lg bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 ${
            plan.popular ? 'border-accent/30' : 'border-muted'
        }`}>
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-3 py-1 text-xs font-bold bg-accent text-white rounded-md">
                        POPULAR
                    </span>
                </div>
            )}
            <Ripple />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-accent">
                            <PriceDisplay usdPrice={plan.price} />
                        </div>
                        <div className="text-xs text-muted">/month</div>
                    </div>
                </div>
                
                <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                        <FiServer className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="text-xs text-muted mb-0.5">Rack Space</div>
                            <div className="text-sm font-semibold text-foreground">{plan.rackSpace}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiZap className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="text-xs text-muted mb-0.5">Power Allocated</div>
                            <div className="text-sm font-semibold text-foreground">{plan.powerAllocated}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiZap className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="text-xs text-muted mb-0.5">Power Outlets</div>
                            <div className="text-sm font-semibold text-foreground">{plan.powerOutlets}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiGlobe className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="text-xs text-muted mb-0.5">Bandwidth Allocation</div>
                            <div className="text-sm font-semibold text-foreground">{plan.bandwidth}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiGlobe className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="text-xs text-muted mb-0.5">Uplink Provided</div>
                            <div className="text-sm font-semibold text-foreground">{plan.uplink}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FiServer className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="text-xs text-muted mb-0.5">IP Addresses</div>
                            <div className="text-sm font-semibold text-foreground">{plan.ipAddresses}</div>
                        </div>
                    </div>
                </div>

                <a
                    href={`https://my.expanse.host/cart.php?a=add&pid=${plan.id}&location=${location.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-semibold transition-all"
                >
                    Order Now
                    <FiCheck className="w-4 h-4" />
                </a>
            </div>
        </div>
    </motion.div>
));

ColocationPlanCard.displayName = 'ColocationPlanCard';

const FeatureCard = memo(({ feature, index }: { feature: any; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
    >
        <div className="relative h-full p-6 border border-muted rounded-lg bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
            <Ripple />
            <div className="relative z-10">
                <div className="inline-flex items-center bg-button justify-center text-primary-foreground w-16 h-16 mb-4 rounded-sm shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)]">
                    {iconMap[feature.icon]}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
                    {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </div>
    </motion.div>
));

FeatureCard.displayName = 'FeatureCard';

export default function ColocationPage() {
    const [selectedLocation, setSelectedLocation] = useState(colocationData.locations[0].id);

    const selectedLocationData = useMemo(() => {
        return colocationData.locations.find(loc => loc.id === selectedLocation);
    }, [selectedLocation]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
                <Spotlight />
            </div>
            <Navbar />

            <div className="relative px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 md:mt-32">
                <div className="relative z-10 max-w-7xl mx-auto mb-20">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20 min-h-[60vh] flex flex-col items-center justify-center"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            {colocationData.hero.slogan}
                        </h1>
                        <p className="text-base sm:text-lg text-muted mb-8 max-w-2xl mx-auto">
                            {colocationData.hero.subtitle}
                        </p>
                        
                        {/* Uptime Badge */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <span className="text-3xl font-bold text-green-500">{colocationData.hero.uptime}</span>
                                <span className="text-sm text-muted">Uptime</span>
                            </div>
                        </motion.div>

                        {/* Features */}
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                            {colocationData.hero.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className={`px-4 py-2 rounded-lg border ${colorMap[feature.color] || 'text-accent'} border-current/20 bg-current/5`}
                                >
                                    <span className={`text-sm font-semibold ${colorMap[feature.color] || 'text-accent'}`}>
                                        {feature.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Industry Partners Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
                            Working With Industry <span className="text-accent">Leaders</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted text-center mb-12 max-w-2xl mx-auto">
                            Trusted by leading technology partners worldwide
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-60 hover:opacity-100 transition-opacity">
                            {colocationData.partners.map((partner, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-muted hover:text-foreground transition-colors"
                                >
                                    <div className="text-xl sm:text-2xl font-semibold">
                                        {partner.name}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Locations Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
                            Available <span className="text-accent">Locations</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted text-center mb-8 max-w-2xl mx-auto">
                            Choose from our strategically located data centers around the world
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center mb-12">
                            {colocationData.locations.map((location) => (
                                <button
                                    key={location.id}
                                    onClick={() => setSelectedLocation(location.id)}
                                    className={`px-4 py-3 bg-card border rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                        selectedLocation === location.id
                                            ? 'border-accent bg-accent/10 text-accent'
                                            : 'border-muted hover:border-accent text-foreground'
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
                                    <span>{location.city}, {location.countryCode}</span>
                                </button>
                            ))}
                        </div>

                        {/* Colocation Plans */}
                        <div className="mb-12">
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
                                Colocation Plans - {selectedLocationData?.city}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {colocationData.plans.map((plan, index) => (
                                    <ColocationPlanCard 
                                        key={plan.id} 
                                        plan={plan} 
                                        location={selectedLocationData} 
                                        index={index} 
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Datacenter Certifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-6 bg-card/50 border border-muted rounded-lg"
                        >
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <FiCheck className="w-5 h-5 text-accent" />
                                Datacenter Certifications - {selectedLocationData?.city}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {colocationData.certifications.map((cert, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent rounded-md text-sm font-medium"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Features Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
                            Enterprise <span className="text-accent">Features</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted text-center mb-12 max-w-2xl mx-auto">
                            Comprehensive infrastructure designed for reliability and security
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {colocationData.features.map((feature, index) => (
                                <FeatureCard key={index} feature={feature} index={index} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
