"use client";

import { motion } from "motion/react";
import { useState, useMemo, memo, useEffect } from "react";
import { FiHardDrive, FiMail, FiDatabase, FiGlobe, FiShield, FiServer, FiRefreshCw, FiCheck } from "react-icons/fi";
import { BiNetworkChart } from "react-icons/bi";
import { Ripple } from "@/components/ui/background-ripple-effect";
import webHostingPlansData from "@/app/json/webhosting/webhosting-plans.json";
import { PriceDisplay } from "../components/Price";

interface WebHostingPlan {
    id: string;
    name: string;
    description: string;
    storage: string;
    bandwidth: string;
    domains: number | string;
    emailAccounts: number | string;
    databases: number | string;
    ssl: boolean;
    backup: string;
    support: string;
    features: string[];
    price: number;
    period: string;
    status: "in_stock" | "low_stock" | "out_of_stock";
    popular?: boolean;
    orderLink: string;
}

const webHostingPlans: WebHostingPlan[] = webHostingPlansData as WebHostingPlan[];

const WebHostingCard = memo(({ plan, index }: { plan: WebHostingPlan; index: number }) => {
    const statusColors = {
        in_stock: "text-green-500",
        low_stock: "text-yellow-500",
        out_of_stock: "text-red-500"
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
            className="relative h-full"
        >
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-1.5 text-xs font-bold border-dashed border-2 backdrop-blur-3xl border-muted text-primary rounded-md">
                        MOST POPULAR
                    </span>
                </div>
            )}

            <div className={`group relative h-full transition-all duration-300 overflow-hidden backdrop-blur-sm flex flex-col ${
                plan.popular
                    ? 'border-2 border-dashed border-muted'
                    : 'border border-muted hover:border-accent/50'
            }`}>
                <Ripple />

                <div className="relative z-10 p-6 border-b border-muted bg-gradient-to-br from-accent/5 to-transparent">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2 uppercase tracking-tight">
                                {plan.name}
                            </h3>
                            <p className="text-sm text-muted mb-2">{plan.description}</p>
                            <span className={`inline-flex items-center text-xs font-semibold ${statusColors[plan.status]}`}>
                                {statusText[plan.status]}
                            </span>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="text-3xl font-bold text-foreground">
                                <PriceDisplay usdPrice={plan.price} />
                            </div>
                            <div className="text-sm text-muted">/{plan.period}</div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow p-6">
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <FiHardDrive className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Storage</div>
                                <div className="text-sm font-bold text-foreground">{plan.storage}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <BiNetworkChart className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Bandwidth</div>
                                <div className="text-sm font-bold text-foreground">{plan.bandwidth}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <FiGlobe className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Domains</div>
                                <div className="text-sm font-bold text-foreground">{plan.domains}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <FiMail className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Email Accounts</div>
                                <div className="text-sm font-bold text-foreground">{plan.emailAccounts}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <FiDatabase className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">Databases</div>
                                <div className="text-sm font-bold text-foreground">{plan.databases}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <FiShield className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <div className="text-xs text-muted mb-1 uppercase tracking-wide font-medium">SSL & Backup</div>
                                <div className="text-sm font-bold text-foreground">
                                    {plan.ssl ? "Free SSL" : "No SSL"} • {plan.backup}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-muted pt-4">
                        <div className="text-xs text-muted mb-3 uppercase tracking-wide font-medium">Features</div>
                        <ul className="space-y-2">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                                    <FiCheck className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex-shrink-0 p-6 border-t border-muted bg-gradient-to-br from-transparent to-accent/5">
                    {plan.status === "out_of_stock" ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            disabled={true}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-muted hover:bg-button text-accent-foreground font-semibold transition-all opacity-50 cursor-not-allowed"
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
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-muted hover:bg-button text-accent-foreground font-semibold transition-all group"
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
        </motion.div>
    );
});

WebHostingCard.displayName = "WebHostingCard";

export default function WebHostingPricing() {
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
                    <g filter="url(#filter0_f_webhosting_1)">
                        <ellipse cx="731.5" cy="300" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
                    </g>
                    <g filter="url(#filter1_f_webhosting_1)">
                        <ellipse cx="731.5" cy="626" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
                    </g>
                    <defs>
                        <filter id="filter0_f_webhosting_1" x="156" y="-102.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_webhosting_1" />
                        </filter>
                        <filter id="filter1_f_webhosting_1" x="156" y="223.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_webhosting_1" />
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
                    className="mb-6 sm:mb-8 md:mb-12 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                        Choose the perfect <span className="text-accent">Web Hosting</span> plan
                    </h2>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl mx-auto">
                        Reliable, fast, and secure web hosting solutions for your website. From personal blogs to enterprise applications, we have the perfect plan for you.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {webHostingPlans.map((plan, index) => (
                        <WebHostingCard key={plan.id} plan={plan} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

