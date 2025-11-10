"use client";

import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FiClock, FiMail, FiBell, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function ComingSoonPage() {

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="absolute top-0 left-0 right-0 h-screen bg-black/20 overflow-hidden pointer-events-none">
                <BackgroundBeams />
            </div>
            
            <Navbar />
            
            <div className="flex-1 relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/10 border border-accent/20 mb-8"
                        >
                            <FiClock className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
                        </motion.div>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
                        >
                            <FiBell className="w-4 h-4 text-accent" />
                            <span className="text-sm font-semibold text-accent">Coming Soon</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                        >
                            Something <span className="text-accent">Amazing</span> is on the Way
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-base sm:text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            We&apos;re working hard to bring you an incredible new feature. Stay tuned for updates and be the first to know when we launch!
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
                        >
                            <div className="p-6 bg-card/50 border border-muted rounded-lg backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                                    <FiClock className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
                                <p className="text-sm text-muted">Get notified as soon as we launch</p>
                            </div>
                            
                            <div className="p-6 bg-card/50 border border-muted rounded-lg backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                                    <FiMail className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Early Access</h3>
                                <p className="text-sm text-muted">Be among the first to experience it</p>
                            </div>
                            
                            <div className="p-6 bg-card/50 border border-muted rounded-lg backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                                    <FiBell className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No Spam</h3>
                                <p className="text-sm text-muted">We&apos;ll only notify you when it&apos;s ready</p>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                            >
                                <span>Go to Homepage</span>
                                <FiArrowRight className="w-5 h-5" />
                            </Link>
                            
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-muted hover:border-accent text-foreground rounded-lg font-semibold transition-all"
                            >
                                <FiMail className="w-5 h-5" />
                                <span>Contact Us</span>
                            </Link>
                        </motion.div>

                        {/* Countdown or Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-12 p-6 bg-card/30 border border-muted rounded-lg backdrop-blur-sm"
                        >
                            <p className="text-sm text-muted">
                                Have questions? Reach out to us at{" "}
                                <a href="mailto:support@expanse.host" className="text-accent hover:underline">
                                    support@expanse.host
                                </a>
                                {" "}or join our{" "}
                                <a href="https://discord.expanse.host" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                    Discord
                                </a>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

