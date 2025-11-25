"use client";

import { motion } from "motion/react";
import { useState, memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { 
    FiSearch, FiGlobe, FiRefreshCw, FiCheck, 
    FiArrowRight, FiServer, FiTrendingUp, FiHeadphones, FiX,
    FiStar, FiLayers
} from "react-icons/fi";
import domainsData from "../json/domains.json";
import { PriceDisplay } from "../components/Price";

const DomainExtensionCard = memo(({ extension, index }: { extension: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative group"
        >
            <div className="relative h-full p-6 border border-muted/50 rounded-xl bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-200">
                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent/10 mb-4">
                        <span className="text-3xl font-bold text-accent">{extension.name}</span>
                    </div>
                    
                    <p className="text-sm text-muted mb-4 min-h-[2.5rem]">{extension.description}</p>
                    
                    <div className="mb-4">
                        <div className="text-3xl font-bold text-foreground">
                            <PriceDisplay usdPrice={extension.price} />
                        </div>
                        <div className="text-xs text-muted">/ year</div>
                    </div>
                    
                    <button
                        className="w-full px-4 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-sm transition-colors duration-200"
                    >
                        Register
                    </button>
                </div>
            </div>
        </motion.div>
    );
});

DomainExtensionCard.displayName = 'DomainExtensionCard';

const BenefitCard = memo(({ benefit, index }: { benefit: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative group"
        >
            <div className="relative h-full p-8 border border-muted/30 rounded-xl bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-200">
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 mb-4">
                        <FiStar className="w-7 h-7 text-accent" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                        {benefit.title}
                    </h3>
                    <p className="text-sm text-muted/80 leading-relaxed">
                        {benefit.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
});

BenefitCard.displayName = 'BenefitCard';

const TipCard = memo(({ tip, index }: { tip: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative group"
        >
            <div className="relative h-full p-6 border border-muted/30 rounded-xl bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-200">
                <div className="relative z-10 flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-accent flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{tip.number}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">
                            {tip.title}
                        </h3>
                        <p className="text-sm text-muted/70 leading-relaxed">
                            {tip.description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

TipCard.displayName = 'TipCard';

const StepCard = memo(({ step, index }: { step: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative group"
        >
            <div className="relative h-full p-8 border border-muted/30 rounded-xl bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-200 text-center">
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-accent/10 mb-4">
                        <span className="text-3xl font-bold text-accent">{step.number}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                        {step.title}
                    </h3>
                    <p className="text-sm text-muted/70">
                        {step.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
});

StepCard.displayName = 'StepCard';

const FeatureCard = memo(({ feature, index }: { feature: any; index: number }) => {
    const iconMap: { [key: string]: React.ReactElement } = {
        "Global Network": <FiGlobe className="w-8 h-8" />,
        "Enterprise Grade Hardware": <FiServer className="w-8 h-8" />,
        "Scalable Infrastructure": <FiTrendingUp className="w-8 h-8" />,
        "Expert Support": <FiHeadphones className="w-8 h-8" />
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative group"
        >
            <div className="relative h-full p-8 border border-muted/30 rounded-xl bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-200">
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-accent/10 mb-6">
                        {iconMap[feature.title] || <FiCheck className="w-8 h-8 text-accent" />}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight">
                        {feature.title}
                    </h3>
                    <p className="text-sm text-muted/80 leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
});

FeatureCard.displayName = 'FeatureCard';

const FAQItem = memo(({ faq, index }: { faq: any; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative group"
        >
            <div
                className="border-2 rounded-2xl bg-card/30 backdrop-blur-xl overflow-hidden transition-all duration-200"
                style={{
                    borderColor: isOpen ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.1)",
                    backgroundColor: isOpen ? "rgba(59, 130, 246, 0.05)" : "transparent",
                }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/5 transition-colors duration-200 group"
                >
                    <h3 className="text-base font-semibold text-foreground pr-4 group-hover:text-accent transition-colors duration-200">
                        {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <FiX className={`w-5 h-5 text-accent transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-70'}`} />
                    </div>
                </button>
                <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                        maxHeight: isOpen ? '500px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        transitionProperty: 'max-height, opacity',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className="px-6 pb-5">
                        <p className="text-sm text-muted/80 leading-relaxed">{faq.answer}</p>
                    </div>
                </div>
            </div>
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
                transition={{ duration: 0.5 }}
                className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-20"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                            Enterprise Domain Services
                        </span>
                        
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                                {domainsData.hero.title}
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-muted/80 max-w-3xl mx-auto mb-4 leading-relaxed">
                            {domainsData.hero.subtitle}
                        </p>
                        
                        <p className="text-sm text-muted/60 mb-12">
                            <a href="/contact" className="text-accent hover:underline font-medium">
                                {domainsData.hero.transferText} →
                            </a>
                        </p>
                    </motion.div>

                    {/* Domain Search Bar */}
                    <motion.form
                        onSubmit={handleDomainSearch}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="relative group">
                            <div className="relative flex flex-col sm:flex-row gap-4 p-2 bg-card/50 backdrop-blur-sm border border-muted/30 rounded-xl">
                                <div className="relative flex-1 flex items-center">
                                    <FiGlobe className="absolute left-4 w-5 h-5 text-muted pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search for your domain..."
                                        value={domainSearch}
                                        onChange={(e) => setDomainSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-transparent border-none outline-none text-foreground placeholder:text-muted/50 text-base font-medium"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSearching}
                                    className="px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
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
                                </button>
                            </div>
                        </div>
                    </motion.form>
                </div>
            </motion.div>

            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto mb-20">
                    {/* Popular Extensions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                                150+ TLDs Available
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                Popular Domain <span className="text-accent">Extensions</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                            {domainsData.popularExtensions.map((extension, index) => (
                                <DomainExtensionCard key={extension.extension} extension={extension} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Bundle Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-32 relative"
                    >
                        <div className="relative p-12 sm:p-16 border border-accent/20 rounded-2xl bg-card/50 backdrop-blur-sm text-center">
                            <div className="inline-block mb-6">
                                <FiLayers className="w-16 h-16 text-accent" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                {domainsData.bundle.title}
                            </h2>
                            <p className="text-muted/80 mb-8 max-w-2xl mx-auto text-lg">
                                {domainsData.bundle.description}
                            </p>
                            <a
                                href="/webhosting"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-lg transition-colors duration-200"
                            >
                                {domainsData.bundle.cta}
                                <FiArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Why Important */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
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

                    {/* Tips */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
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
                            <a
                                href="https://my.expanse.host/cart.php?a=add&domain=register"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-lg transition-colors duration-200"
                            >
                                Register Domain
                                <FiArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Transfer Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-32 relative"
                    >
                        <div className="relative p-12 sm:p-16 border border-muted/30 rounded-2xl bg-card/50 backdrop-blur-sm text-center">
                            <div className="inline-block mb-6">
                                <FiRefreshCw className="w-16 h-16 text-accent" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                {domainsData.transfer.title}
                            </h2>
                            <p className="text-muted/80 mb-8 max-w-2xl mx-auto text-lg">
                                {domainsData.transfer.description}
                            </p>
                            <a
                                href="https://my.expanse.host/cart.php?a=add&domain=transfer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-lg transition-colors duration-200"
                            >
                                {domainsData.transfer.cta}
                                <FiArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* How It Works */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
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
                            <a
                                href="https://my.expanse.host/cart.php?a=add&domain=register"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-lg transition-colors duration-200"
                            >
                                Register Domain
                                <FiArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Why Choose */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
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

                    {/* FAQ */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-32"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                Frequently Asked <span className="text-accent">Questions</span>
                            </h2>
                            <p className="text-lg text-muted/80 max-w-2xl mx-auto">
                                Common inquiries about our domain services
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {domainsData.faq.map((faq, index) => (
                                <FAQItem key={index} faq={faq} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative mb-20"
                    >
                        <div className="relative p-12 sm:p-16 border border-accent/30 rounded-2xl bg-card/50 backdrop-blur-sm text-center">
                            <div className="relative z-10">
                                <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                                    Additional Questions?
                                </h3>
                                <p className="text-muted/80 mb-8 max-w-2xl mx-auto text-lg">
                                    Contact our team to learn more about our enterprise domain services and how we can support your business requirements.
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-lg transition-colors duration-200"
                                >
                                    Contact Us
                                    <FiArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
