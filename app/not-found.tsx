"use client";

import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FiHome, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

export default function NotFound() {

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
                        {/* 404 Number */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                            className="mb-8"
                        >
                            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-black text-foreground/10 dark:text-foreground/5 leading-none">
                                404
                            </h1>
                        </motion.div>

                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
                        >
                            <FiAlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
                        >
                            Page Not Found
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-base sm:text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
                        </motion.p>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-4 justify-center mb-8"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                            >
                                <FiHome className="w-5 h-5" />
                                <span>Go to Homepage</span>
                            </Link>
                            
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-muted hover:border-accent text-foreground rounded-lg font-semibold transition-all"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                <span>Go Back</span>
                            </button>
                        </motion.div>

                        {/* Popular Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
                        >
                            <Link
                                href="/minecraft"
                                className="p-4 bg-card/50 border border-muted hover:border-accent rounded-lg transition-all group"
                            >
                                <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                                    Minecraft
                                </div>
                            </Link>
                            
                            <Link
                                href="/vps"
                                className="p-4 bg-card/50 border border-muted hover:border-accent rounded-lg transition-all group"
                            >
                                <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                                    VPS Hosting
                                </div>
                            </Link>
                            
                            <Link
                                href="/dedicated"
                                className="p-4 bg-card/50 border border-muted hover:border-accent rounded-lg transition-all group"
                            >
                                <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                                    Dedicated
                                </div>
                            </Link>
                            
                            <Link
                                href="/discord-bot"
                                className="p-4 bg-card/50 border border-muted hover:border-accent rounded-lg transition-all group"
                            >
                                <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                                    Discord Bot
                                </div>
                            </Link>
                        </motion.div>

                        {/* Help Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-12 p-6 bg-card/30 border border-muted rounded-lg backdrop-blur-sm"
                        >
                            <p className="text-sm text-muted">
                                Need help? Contact us at{" "}
                                <a href="mailto:support@expanse.host" className="text-accent hover:underline">
                                    support@expanse.host
                                </a>
                                {" "}or visit our{" "}
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

