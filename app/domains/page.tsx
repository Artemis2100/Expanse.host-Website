"use client";

import { motion } from "motion/react";
import { useState, memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { 
    FiSearch, FiGlobe, FiShield, FiMail, FiLock, FiRefreshCw, FiCheck, 
    FiArrowRight, FiServer, FiZap, FiTrendingUp, FiHeadphones, FiX,
    FiStar, FiAward, FiTarget, FiLayers, FiCode, FiCloud
} from "react-icons/fi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import domainsData from "../json/domains.json";
import { PriceDisplay } from "../components/Price";

const DomainExtensionCard = memo(({ extension, index }: { extension: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
            style={{ perspective: '1000px' }}
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    transform: isHovered ? 'perspective(1000px) rotateY(5deg) rotateX(-5deg)' : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                    transformStyle: 'preserve-3d',
                }}
                className="relative h-full p-6 border border-muted/50 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl hover:border-accent/50 transition-all duration-500 overflow-hidden"
            >
                {/* Animated background gradient */}
                <motion.div
                    animate={{
                        background: isHovered 
                            ? "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
                            : "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)"
                    }}
                    className="absolute inset-0 pointer-events-none"
                />
                
                {/* Glowing orb effect */}
                <motion.div
                    animate={{
                        x: isHovered ? [0, 100, 0] : 0,
                        y: isHovered ? [0, -50, 0] : 0,
                        opacity: isHovered ? [0.3, 0.6, 0.3] : 0.1,
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
                />
                
                <div className="relative z-10 text-center">
                    <motion.div
                        animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 mb-4"
                    >
                        <span className="text-3xl font-black text-accent">{extension.name}</span>
                    </motion.div>
                    
                    <p className="text-xs text-muted mb-4 min-h-[2.5rem]">{extension.description}</p>
                    
                    <motion.div
                        animate={{ y: isHovered ? -5 : 0 }}
                        className="mb-4"
                    >
                        <div className="text-3xl font-black text-foreground">
                            <PriceDisplay usdPrice={extension.price} />
                        </div>
                        <div className="text-xs text-muted">/ year</div>
                    </motion.div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-accent/50"
                    >
                        Register
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
});

DomainExtensionCard.displayName = 'DomainExtensionCard';

const BenefitCard = memo(({ benefit, index }: { benefit: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateZ: -2 }}
            whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                animate={{
                    y: isHovered ? -10 : 0,
                }}
                style={{
                    transform: isHovered ? 'perspective(1000px) rotateY(2deg) rotateX(-2deg) translateY(-10px)' : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)',
                    transformStyle: 'preserve-3d',
                }}
                className="relative h-full p-8 border border-muted/30 rounded-3xl bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-xl overflow-hidden"
            >
                {/* Animated diagonal gradient */}
                <motion.div
                    animate={{
                        background: isHovered
                            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)"
                            : "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)"
                    }}
                    className="absolute inset-0 pointer-events-none"
                />
                
                {/* Floating particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        className="absolute w-2 h-2 bg-accent/30 rounded-full"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                        }}
                    />
                ))}
                
                <div className="relative z-10">
                    <motion.div
                        animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 mb-4"
                    >
                        <FiStar className="w-7 h-7 text-accent" />
                    </motion.div>
                    
                    <h3 className="text-xl font-black text-foreground mb-3 tracking-tight">
                        {benefit.title}
                    </h3>
                    <p className="text-sm text-muted/80 leading-relaxed">
                        {benefit.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
});

BenefitCard.displayName = 'BenefitCard';

const TipCard = memo(({ tip, index }: { tip: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateZ: index % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotateZ: isHovered ? (index % 2 === 0 ? 2 : -2) : 0,
                }}
                className="relative h-full p-6 border-2 border-muted/20 rounded-2xl bg-gradient-to-br from-card/70 to-card/30 backdrop-blur-xl overflow-hidden"
            >
                {/* Animated mesh gradient */}
                <motion.div
                    animate={{
                        backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-purple-500/10 bg-[length:200%_200%] pointer-events-none"
                />
                
                <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                        animate={{ 
                            scale: isHovered ? 1.2 : 1,
                            rotate: isHovered ? 360 : 0,
                        }}
                        className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg"
                    >
                        <span className="text-xl font-black text-white">{tip.number}</span>
                    </motion.div>
                    <div className="flex-1">
                        <h3 className="text-base font-black text-foreground mb-2 tracking-tight">
                            {tip.title}
                        </h3>
                        <p className="text-sm text-muted/70 leading-relaxed">
                            {tip.description}
                        </p>
                    </div>
                </div>
                
                {/* Corner accent */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-full"
                />
            </motion.div>
        </motion.div>
    );
});

TipCard.displayName = 'TipCard';

const StepCard = memo(({ step, index }: { step: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                animate={{
                    y: isHovered ? -15 : 0,
                    scale: isHovered ? 1.03 : 1,
                }}
                className="relative h-full p-8 border border-muted/40 rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-card/80 backdrop-blur-xl overflow-hidden text-center"
            >
                {/* Animated radial gradient */}
                <motion.div
                    animate={{
                        scale: isHovered ? 1.5 : 1,
                        opacity: isHovered ? 0.3 : 0.1,
                    }}
                    className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                    }}
                />
                
                {/* Connecting line animation */}
                {index < 5 && (
                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0.3 }}
                        className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent to-transparent z-10"
                    />
                )}
                
                <div className="relative z-10">
                    <motion.div
                        animate={{ 
                            scale: isHovered ? 1.3 : 1,
                            rotate: isHovered ? [0, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 mb-4"
                    >
                        <span className="text-3xl font-black text-accent">{step.number}</span>
                    </motion.div>
                    
                    <h3 className="text-xl font-black text-foreground mb-3 tracking-tight">
                        {step.title}
                    </h3>
                    <p className="text-sm text-muted/70">
                        {step.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
});

StepCard.displayName = 'StepCard';

const FeatureCard = memo(({ feature, index }: { feature: any; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const iconMap: { [key: string]: React.ReactElement } = {
        "Global Network": <FiGlobe className="w-8 h-8" />,
        "Enterprise Grade Hardware": <FiServer className="w-8 h-8" />,
        "Scalable Infrastructure": <FiTrendingUp className="w-8 h-8" />,
        "Expert Support": <FiHeadphones className="w-8 h-8" />
    };
    
    const colors = [
        "from-blue-500/20 to-cyan-500/10",
        "from-purple-500/20 to-pink-500/10",
        "from-green-500/20 to-emerald-500/10",
        "from-orange-500/20 to-red-500/10",
    ];
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
            style={{ perspective: '1000px' }}
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
                style={{
                    transform: isHovered ? 'perspective(1000px) rotateY(5deg) rotateX(-5deg) translateZ(50px)' : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
                    transformStyle: 'preserve-3d',
                }}
                className="relative h-full p-8 border border-muted/30 rounded-3xl bg-gradient-to-br from-card/70 to-card/40 backdrop-blur-xl overflow-hidden"
            >
                {/* Dynamic gradient background */}
                <motion.div
                    animate={{
                        background: isHovered
                            ? `linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.15) 100%)`
                            : `linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)`
                    }}
                    className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} pointer-events-none`}
                />
                
                {/* Animated icon glow */}
                <motion.div
                    animate={{
                        scale: isHovered ? 2 : 1,
                        opacity: isHovered ? 0.4 : 0.1,
                    }}
                    className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                />
                
                <div className="relative z-10">
                    <motion.div
                        animate={{ 
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 mb-6"
                    >
                        {iconMap[feature.title] || <FiCheck className="w-8 h-8 text-accent" />}
                    </motion.div>
                    
                    <h3 className="text-xl font-black text-foreground mb-4 tracking-tight">
                        {feature.title}
                    </h3>
                    <p className="text-sm text-muted/80 leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
});

FeatureCard.displayName = 'FeatureCard';

const FAQItem = memo(({ faq, index }: { faq: any; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            <motion.div
                animate={{ 
                    borderColor: isOpen ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.1)",
                    backgroundColor: isOpen ? "rgba(59, 130, 246, 0.05)" : "transparent",
                }}
                className="border-2 border-muted/20 rounded-2xl bg-card/30 backdrop-blur-xl overflow-hidden transition-all duration-300"
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/5 transition-colors group"
                >
                    <h3 className="text-base font-bold text-foreground pr-4 group-hover:text-accent transition-colors">
                        {faq.question}
                    </h3>
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center"
                    >
                        <FiX className="w-5 h-5 text-accent" />
                    </motion.div>
                </button>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-5"
                    >
                        <p className="text-sm text-muted/80 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
});

FAQItem.displayName = 'FAQItem';

export default function DomainsPage() {
    const [domainSearch, setDomainSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleDomainSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domainSearch.trim()) return;
        
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            window.open(`https://my.expanse.host/cart.php?a=add&domain=register&query=${domainSearch}`, '_blank');
        }, 500);
    };

    return (
        <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
                <Spotlight />
            </div>
            <Navbar />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-20"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <motion.span
                            animate={{ 
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/30 to-accent/20 bg-[length:200%_100%] text-accent text-sm font-bold mb-6"
                        >
                            🚀 Secure Your Digital Identity
                        </motion.span>
                        
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
                                {domainsData.hero.title}
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-muted/80 max-w-3xl mx-auto mb-4 leading-relaxed">
                            {domainsData.hero.subtitle}
                        </p>
                        
                        <p className="text-sm text-muted/60 mb-12">
                            <a href="/contact" className="text-accent hover:underline font-semibold">
                                {domainsData.hero.transferText} →
                            </a>
                        </p>
                    </motion.div>

                    {/* Animated Search Bar */}
                    <motion.form
                        onSubmit={handleDomainSearch}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl mx-auto"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative flex flex-col sm:flex-row gap-4 p-2 bg-card/50 backdrop-blur-xl border-2 border-muted/30 rounded-2xl">
                                <div className="relative flex-1 flex items-center">
                                    <FiGlobe className="absolute left-4 w-6 h-6 text-muted pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search for your perfect domain..."
                                        value={domainSearch}
                                        onChange={(e) => setDomainSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-5 bg-transparent border-none outline-none text-foreground placeholder:text-muted/50 text-lg font-medium"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={isSearching}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-5 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
                                >
                                    {isSearching ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Searching...
                                        </>
                                    ) : (
                                        <>
                                            <FiSearch className="w-5 h-5" />
                                            Search
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>

            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto mb-20">
                    {/* Popular Extensions - Staggered Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-12">
                            <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-4"
                            >
                                150+ TLDs Available
                            </motion.span>
                            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                                Popular Domain <span className="text-accent">Extensions</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                            {domainsData.popularExtensions.map((extension, index) => (
                                <DomainExtensionCard key={extension.extension} extension={extension} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Bundle Section - Curved Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-32 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-accent/10 rounded-[3rem] blur-3xl" />
                        <div className="relative p-12 sm:p-16 border-2 border-accent/20 rounded-[3rem] bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl text-center">
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="inline-block mb-6"
                            >
                                <FiLayers className="w-16 h-16 text-accent" />
                            </motion.div>
                            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                                {domainsData.bundle.title}
                            </h2>
                            <p className="text-muted/80 mb-8 max-w-2xl mx-auto text-lg">
                                {domainsData.bundle.description}
                            </p>
                            <motion.a
                                href="/webhosting"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-accent/50"
                            >
                                {domainsData.bundle.cta}
                                <FiArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Why Important - Asymmetric Layout */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                                {domainsData.whyImportant.title}
                            </h2>
                            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
                                {domainsData.whyImportant.subtitle}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {domainsData.whyImportant.benefits.map((benefit, index) => (
                                <BenefitCard key={index} benefit={benefit} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Tips - Zigzag Layout */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                                {domainsData.tips.title}
                            </h2>
                            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
                                {domainsData.tips.subtitle}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {domainsData.tips.items.map((tip, index) => (
                                <TipCard key={index} tip={tip} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <motion.a
                                href="https://my.expanse.host/cart.php?a=add&domain=register"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-accent/50"
                            >
                                Get Your Domain
                                <FiArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Transfer Section - Diagonal Design */}
                    <motion.div
                        initial={{ opacity: 0, rotateX: -15 }}
                        whileInView={{ opacity: 1, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-32 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-accent/10 to-cyan-500/10 rounded-[3rem] blur-3xl" />
                        <div className="relative p-12 sm:p-16 border-2 border-purple-500/20 rounded-[3rem] bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-xl text-center" style={{ perspective: '1000px' }}>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="inline-block mb-6"
                            >
                                <FiRefreshCw className="w-16 h-16 text-purple-400" />
                            </motion.div>
                            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                                {domainsData.transfer.title}
                            </h2>
                            <p className="text-muted/80 mb-8 max-w-2xl mx-auto text-lg">
                                {domainsData.transfer.description}
                            </p>
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-purple-500/50"
                            >
                                {domainsData.transfer.cta}
                                <FiArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* How It Works - Connected Flow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                                {domainsData.howItWorks.title}
                            </h2>
                            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
                                {domainsData.howItWorks.subtitle}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative">
                            {domainsData.howItWorks.steps.map((step, index) => (
                                <StepCard key={index} step={step} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <motion.a
                                href="https://my.expanse.host/cart.php?a=add&domain=register"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-accent/50"
                            >
                                Get Your Domain
                                <FiArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Why Choose - 3D Cards */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                                {domainsData.whyChoose.title}
                            </h2>
                            <p className="text-lg text-muted/80 max-w-3xl mx-auto">
                                {domainsData.whyChoose.description}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {domainsData.whyChoose.features.map((feature, index) => (
                                <FeatureCard key={index} feature={feature} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* FAQ - Accordion with Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                                Frequently Asked <span className="text-accent">Questions</span>
                            </h2>
                            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
                                You might have one of these questions in your mind
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {domainsData.faq.map((faq, index) => (
                                <FAQItem key={index} faq={faq} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Final CTA - Glowing Effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative mb-20"
                    >
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(59, 130, 246, 0.3)",
                                    "0 0 40px rgba(59, 130, 246, 0.5)",
                                    "0 0 20px rgba(59, 130, 246, 0.3)",
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="relative p-12 sm:p-16 border-2 border-accent/30 rounded-[3rem] bg-gradient-to-br from-card/70 to-card/40 backdrop-blur-xl text-center"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-accent/5 to-transparent rounded-[3rem]"
                            />
                            <div className="relative z-10">
                                <h3 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                                    Got another questions?
                                </h3>
                                <p className="text-muted/80 mb-8 max-w-2xl mx-auto text-lg">
                                    Reach out to us anytime to learn more about our services and how we can support you. Don't hesitate, contact us now and let's chat!
                                </p>
                                <motion.a
                                    href="/contact"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-accent/50"
                                >
                                    Ask Us Anything
                                    <FiArrowRight className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
