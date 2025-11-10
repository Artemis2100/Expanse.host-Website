"use client";

import { motion } from "motion/react";
import { useState, useMemo, memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { FiSearch, FiCreditCard, FiShield } from "react-icons/fi";
import paymentMethodsData from "../json/payment-methods.json";

interface PaymentMethod {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: string;
    available: boolean;
}

const paymentMethods: PaymentMethod[] = paymentMethodsData as PaymentMethod[];

const PaymentMethodCard = memo(({ method, index }: { method: PaymentMethod; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="p-6 border border-muted rounded-lg bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full flex flex-col"
    >
        <div className="flex items-start gap-4 mb-3">
            <div className="text-3xl flex-shrink-0">{method.icon}</div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{method.name}</h3>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">
                    {method.category}
                </span>
            </div>
        </div>
        <p className="text-sm text-muted leading-relaxed flex-grow">{method.description}</p>
        {method.available && (
            <div className="mt-4 flex items-center gap-2 text-xs text-green-500">
                <FiShield className="w-4 h-4" />
                <span>Available</span>
            </div>
        )}
    </motion.div>
));

PaymentMethodCard.displayName = 'PaymentMethodCard';

export default function PaymentMethodsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = useMemo(() => {
        const cats = Array.from(new Set(paymentMethods.map(m => m.category)));
        return ["all", ...cats];
    }, []);

    const filteredMethods = useMemo(() => {
        return paymentMethods.filter((method) => {
            const matchesSearch = method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                method.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                method.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "all" || method.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const groupedMethods = useMemo(() => {
        const groups: Record<string, PaymentMethod[]> = {};
        filteredMethods.forEach((method) => {
            if (!groups[method.category]) {
                groups[method.category] = [];
            }
            groups[method.category].push(method);
        });
        return groups;
    }, [filteredMethods]);

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
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            Flexible <span className="text-accent">Payment Options</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-6">
                            Pay your way, your way. We accept multiple payment methods to make your experience seamless and convenient.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted">
                            <FiShield className="w-4 h-4 text-accent" />
                            <span>All payments are secure and encrypted</span>
                        </div>
                    </motion.div>

                    {/* Search and Filter */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search payment methods..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:border-accent transition-all text-foreground placeholder:text-muted/50"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            selectedCategory === category
                                                ? 'bg-accent text-white'
                                                : 'bg-card border border-muted text-foreground hover:border-accent'
                                        }`}
                                    >
                                        {category === "all" ? "All Methods" : category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-muted mt-4">
                            Showing {filteredMethods.length} of {paymentMethods.length} payment methods
                        </p>
                    </motion.div>

                    {/* Payment Methods by Category */}
                    {Object.keys(groupedMethods).length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-12"
                        >
                            {Object.entries(groupedMethods).map(([category, methods]) => (
                                <div key={category}>
                                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                                        <FiCreditCard className="w-6 h-6 text-accent" />
                                        {category}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {methods.map((method, index) => (
                                            <PaymentMethodCard key={method.id} method={method} index={index} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/20 mb-4">
                                <FiSearch className="w-10 h-10 text-muted" />
                            </div>
                            <p className="text-lg text-foreground font-semibold mb-2">No payment methods found</p>
                            <p className="text-sm text-muted">Try adjusting your search or filter criteria</p>
                        </motion.div>
                    )}

                    {/* Security Notice */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-16 p-6 bg-accent/10 border border-accent/20 rounded-lg"
                    >
                        <div className="flex items-start gap-4">
                            <FiShield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Secure Payment Processing</h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    All payment methods are processed through secure, encrypted channels. We never store your full payment details on our servers. 
                                    Your financial information is protected by industry-standard security measures and PCI DSS compliance.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

