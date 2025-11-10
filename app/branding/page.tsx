"use client";

import { motion } from "motion/react";
import { memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { FiDownload, FiImage, FiDroplet, FiType } from "react-icons/fi";
import Image from "next/image";

const BrandAsset = memo(({ title, description, downloadLink, preview, index }: {
    title: string;
    description: string;
    downloadLink: string;
    preview?: string;
    index: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="p-6 border border-muted rounded-lg bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300"
    >
        {preview && (
            <div className="mb-4 p-4 bg-muted/10 rounded-lg flex items-center justify-center min-h-[120px]">
                <div className="text-4xl font-bold text-accent">{preview}</div>
            </div>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted mb-4">{description}</p>
        <a
            href={downloadLink}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-all"
        >
            <FiDownload className="w-4 h-4" />
            Download
        </a>
    </motion.div>
));

BrandAsset.displayName = 'BrandAsset';

const ColorSwatch = memo(({ name, color, hex, index }: { name: string; color: string; hex: string; index: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex items-center gap-4 p-4 border border-muted rounded-lg bg-card/50 backdrop-blur-sm"
    >
        <div
            className="w-16 h-16 rounded-lg flex-shrink-0 border border-muted"
            style={{ backgroundColor: hex }}
        />
        <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">{name}</h4>
            <p className="text-xs text-muted font-mono">{hex}</p>
        </div>
    </motion.div>
));

ColorSwatch.displayName = 'ColorSwatch';

export default function BrandingPage() {
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
                            Brand <span className="text-accent">Guidelines</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto">
                            Represent Expanse Hosting with consistency and professionalism. Use our brand assets correctly to maintain our identity across all platforms.
                        </p>
                    </motion.div>

                    {/* Logo Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FiImage className="w-6 h-6 text-accent" />
                            <h2 className="text-2xl font-bold text-foreground">Logos</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <BrandAsset
                                title="Primary Logo"
                                description="Main logo for use on light backgrounds"
                                downloadLink="/branding/logo-primary.png"
                                preview="EXPANSE"
                                index={0}
                            />
                            <BrandAsset
                                title="Dark Logo"
                                description="Logo variant for dark backgrounds"
                                downloadLink="/branding/logo-dark.png"
                                preview="EXPANSE"
                                index={1}
                            />
                            <BrandAsset
                                title="Icon Only"
                                description="Standalone icon for favicons and small spaces"
                                downloadLink="/branding/logo-icon.png"
                                preview="E"
                                index={2}
                            />
                        </div>
                    </motion.div>

                    {/* Color Palette */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FiDroplet className="w-6 h-6 text-accent" />
                            <h2 className="text-2xl font-bold text-foreground">Color Palette</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ColorSwatch name="Primary Accent" color="Blue" hex="#1665CD" index={0} />
                            <ColorSwatch name="Secondary" color="Dark Blue" hex="#0A4A8C" index={1} />
                            <ColorSwatch name="Success" color="Green" hex="#10B981" index={2} />
                            <ColorSwatch name="Warning" color="Yellow" hex="#F59E0B" index={3} />
                            <ColorSwatch name="Error" color="Red" hex="#EF4444" index={4} />
                            <ColorSwatch name="Background" color="Dark" hex="#0A0F1A" index={5} />
                        </div>
                    </motion.div>

                    {/* Typography */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <FiType className="w-6 h-6 text-accent" />
                            <h2 className="text-2xl font-bold text-foreground">Typography</h2>
                        </div>
                        <div className="p-6 border border-muted rounded-lg bg-card/50 backdrop-blur-sm space-y-6">
                            <div>
                                <h3 className="text-sm font-semibold text-muted mb-2 uppercase tracking-wide">Heading Font</h3>
                                <h1 className="text-4xl font-bold text-foreground">Expanse Hosting</h1>
                                <p className="text-sm text-muted mt-2">Inter, system-ui, sans-serif</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-muted mb-2 uppercase tracking-wide">Body Font</h3>
                                <p className="text-base text-foreground leading-relaxed">
                                    The quick brown fox jumps over the lazy dog. Use this font for all body text and descriptions.
                                </p>
                                <p className="text-sm text-muted mt-2">Inter, system-ui, sans-serif</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-muted mb-2 uppercase tracking-wide">Monospace Font</h3>
                                <code className="text-sm text-foreground font-mono bg-muted/20 px-2 py-1 rounded">
                                    Code snippets, technical terms, and identifiers
                                </code>
                                <p className="text-sm text-muted mt-2">JetBrains Mono, Consolas, monospace</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Usage Guidelines */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-6">Usage Guidelines</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 border border-muted rounded-lg bg-card/50 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-foreground mb-3">✅ Do</h3>
                                <ul className="space-y-2 text-sm text-muted">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Use logos at appropriate sizes with adequate spacing</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Maintain brand colors consistently</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Use high-resolution assets for print materials</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Follow typography guidelines for consistency</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 border border-muted rounded-lg bg-card/50 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-foreground mb-3">❌ Don&apos;t</h3>
                                <ul className="space-y-2 text-sm text-muted">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Modify, distort, or alter logos in any way</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Use brand colors that don&apos;t match our palette</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Place logos on busy or cluttered backgrounds</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Use outdated or incorrect brand assets</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact for Brand Assets */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="p-6 bg-accent/10 border border-accent/20 rounded-lg text-center"
                    >
                        <h3 className="text-lg font-semibold text-foreground mb-2">Need Additional Brand Assets?</h3>
                        <p className="text-sm text-muted mb-4">
                            For high-resolution files, vector formats, or custom brand assets, please contact our team.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-all"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

