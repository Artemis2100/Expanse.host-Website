"use client";

import { motion } from "motion/react";
import { memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { 
    FiDollarSign, FiLink, FiTrendingUp, FiClock, FiTag, FiHeadphones, 
    FiArrowRight, FiUserPlus, FiZap, FiRepeat, FiMonitor, FiGift, 
    FiPercent, FiCreditCard, FiShare2, FiFileText, FiTarget, FiBarChart2
} from "react-icons/fi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import affiliateData from "../json/affiliate.json";

const iconMap: { [key: string]: React.ReactElement } = {
    clock: <FiClock className="w-6 h-6" />,
    infinity: <FiZap className="w-6 h-6" />,
    repeat: <FiRepeat className="w-6 h-6" />,
    link: <FiLink className="w-6 h-6" />,
    monitor: <FiMonitor className="w-6 h-6" />,
    gift: <FiGift className="w-6 h-6" />,
    percent: <FiPercent className="w-6 h-6" />,
    wallet: <FiCreditCard className="w-6 h-6" />,
    share: <FiShare2 className="w-6 h-6" />,
    file: <FiFileText className="w-6 h-6" />,
    target: <FiTarget className="w-6 h-6" />,
    compare: <FiBarChart2 className="w-6 h-6" />,
    dollar: <FiDollarSign className="w-6 h-6" />
};

const StatCard = memo(({ stat, index }: { stat: any; index: number }) => {
    // Use green for earnings-related stats
    const isEarning = stat.label.toLowerCase().includes('income') || stat.label.toLowerCase().includes('earnings');
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
        >
            <div className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-2 ${
                isEarning ? 'text-green-500 dark:text-green-400' : 'text-accent'
            }`}>
                {stat.value}
            </div>
            <div className="text-sm sm:text-base text-muted">
                {stat.label}
            </div>
        </motion.div>
    );
});

StatCard.displayName = 'StatCard';

const BenefitCard = memo(({ benefit, index }: { benefit: any; index: number }) => {
    // Make all benefit cards blue
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            <div className="relative h-full p-6 border border-blue-500/30 dark:border-blue-400/30 hover:border-blue-500/50 dark:hover:border-blue-400/50 rounded-lg bg-card/50 backdrop-blur-sm transition-all duration-300 text-center">
                <Ripple />
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center text-primary-foreground w-16 h-16 mb-4 rounded-sm shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)] mx-auto bg-blue-500 dark:bg-blue-600">
                        {iconMap[benefit.icon]}
                    </div>
                    <h3 className="text-lg font-bold tracking-wide text-blue-600 dark:text-blue-400">
                        {benefit.title}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
});

BenefitCard.displayName = 'BenefitCard';

const EarningsCard = memo(({ point, index }: { point: any; index: number }) => {
    // Keep payout section blue
    const isCommission = point.label.toLowerCase().includes('commission');
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
        >
            <div className="relative h-full p-8 border border-blue-500/30 dark:border-blue-400/30 hover:border-blue-500/50 dark:hover:border-blue-400/50 rounded-lg bg-card/50 backdrop-blur-sm transition-all duration-300 text-center">
                <Ripple />
                <div className="relative z-10">
                    <div className={`text-5xl font-bold mb-3 ${
                        isCommission
                            ? 'text-green-500 dark:text-green-400'
                            : 'text-blue-500 dark:text-blue-400'
                    }`}>
                        {point.value}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${
                        isCommission
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-blue-600 dark:text-blue-400'
                    }`}>
                        {point.label}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                        {point.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
});

EarningsCard.displayName = 'EarningsCard';

const TipCard = memo(({ tip, index }: { tip: any; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
    >
        <div className="relative h-full p-6 border border-green-500/20 dark:border-green-400/20 rounded-lg bg-card/50 backdrop-blur-sm hover:border-green-500/40 dark:hover:border-green-400/40 transition-all duration-300">
            <Ripple />
            <div className="relative z-10">
                <div className="inline-flex items-center bg-green-500 dark:bg-green-600 justify-center text-primary-foreground w-16 h-16 mb-4 rounded-sm shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)]">
                    {iconMap[tip.icon]}
                </div>
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3 tracking-wide">
                    {tip.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                    {tip.description}
                </p>
            </div>
        </div>
    </motion.div>
));

TipCard.displayName = 'TipCard';

const StepCard = memo(({ step, index }: { step: any; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="text-center"
    >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 dark:bg-green-400/10 mb-4 border-2 border-green-500/20 dark:border-green-400/20">
            <div className="text-green-500 dark:text-green-400">
                {iconMap[step.icon]}
            </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
            {step.title}
        </h3>
    </motion.div>
));

StepCard.displayName = 'StepCard';

export default function AffiliatePage() {
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
                        className="text-center mb-16"
                    >
                        <p className="text-sm sm:text-base text-green-500 dark:text-green-400 font-semibold mb-4">
                            {affiliateData.hero.tagline}
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Cover your <span className="text-green-500 dark:text-green-400">hosting costs</span>, and a whole lot more.
                        </h1>
                        <p className="text-base sm:text-lg text-muted max-w-3xl mx-auto mb-8">
                            {affiliateData.hero.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="https://my.expanse.host/affiliates.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg font-semibold transition-all text-lg shadow-lg"
                            >
                                <FiUserPlus className="w-5 h-5" />
                                {affiliateData.hero.ctaPrimary}
                            </motion.a>
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-muted hover:border-accent text-foreground rounded-lg font-semibold transition-all text-lg"
                            >
                                {affiliateData.hero.ctaSecondary}
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {affiliateData.stats.map((stat, index) => (
                                <StatCard key={index} stat={stat} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Benefits Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
                            Exclusive Affiliate <span className="text-green-500 dark:text-green-400">Benefits</span>
                        </h2>
                        <p className="text-sm sm:text-base text-muted text-center mb-12 max-w-2xl mx-auto">
                            With everything you need to maximize your income.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {affiliateData.benefits.map((benefit, index) => (
                                <BenefitCard key={index} benefit={benefit} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Earnings Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                            How much can I <span className="text-green-500 dark:text-green-400">earn?</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {affiliateData.earnings.points.map((point, index) => (
                                <EarningsCard key={index} point={point} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Promotion Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                            {affiliateData.promotion.title}
                        </h2>
                        <p className="text-base sm:text-lg text-muted max-w-4xl mx-auto text-center leading-relaxed">
                            {affiliateData.promotion.description}
                        </p>
                    </motion.div>

                    {/* Tips Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                            <span className="text-green-500 dark:text-green-400">Tips</span> to Succeed in The Expanse Host Affiliate Program
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {affiliateData.tips.items.map((tip, index) => (
                                <TipCard key={index} tip={tip} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Getting Started Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                            Getting started is <span className="text-green-500 dark:text-green-400">easy</span>.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {affiliateData.gettingStarted.steps.map((step, index) => (
                                <StepCard key={index} step={step} index={index} />
                            ))}
                        </div>
                        <div className="text-center">
                            <motion.a
                                href="https://my.expanse.host/affiliates.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg font-semibold transition-all text-lg shadow-lg"
                            >
                                {affiliateData.gettingStarted.cta}
                                <FiArrowRight className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
