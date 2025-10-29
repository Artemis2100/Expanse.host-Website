"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { FiFileText, FiClock } from "react-icons/fi";
import tosData from "../json/terms-of-service.json";

interface Subsection {
    subtitle: string;
    text: string;
}

interface Section {
    id: number;
    title: string;
    content: string;
    subsections?: Subsection[];
    list?: string[];
}

const TOSSection = memo(({ section, index }: { section: Section; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="relative group mb-8"
    >
        <div className=" pl-6 py-2">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-start gap-3">
                <span className="text-accent">{section.id}.</span>
                {section.title}
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
                {section.content}
            </p>

            {/* Render list if exists */}
            {section.list && section.list.length > 0 && (
                <ul className="space-y-2 mb-4">
                    {section.list.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                            <span className="text-accent mt-1">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Render subsections if exists */}
            {section.subsections && section.subsections.length > 0 && (
                <div className="space-y-4 mt-4">
                    {section.subsections.map((subsection, idx) => (
                        <div key={idx} className="pl-4 border-l-2 border-muted">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                                {subsection.subtitle}
                            </h3>
                            <p className="text-sm sm:text-base text-muted leading-relaxed">
                                {subsection.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </motion.div>
));

TOSSection.displayName = 'TOSSection';

const TableOfContents = memo(({ sections }: { sections: Section[] }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:sticky lg:top-24  backdrop-blur-sm border border-muted  p-6"
    >
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <FiFileText className="w-5 h-5 text-accent" />
            Table of Contents
        </h3>
        <nav className="space-y-2">
            {sections.map((section) => (
                <a
                    key={section.id}
                    href={`#section-${section.id}`}
                    className="block text-sm text-muted hover:text-accent transition-colors py-1 hover:translate-x-1 transform duration-200"
                >
                    <span className="text-accent mr-2">{section.id}.</span>
                    {section.title}
                </a>
            ))}
        </nav>
    </motion.div>
));

TableOfContents.displayName = 'TableOfContents';

export default function TermsOfServicePage() {
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

            {/* Hero Section */}
            <div className="relative px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 md:mt-32">
                <div className="relative z-10 max-w-7xl mx-auto mb-20">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-left mb-8"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            {tosData.title}
                        </h1>
                        <div className="flex items-center gap-2 text-sm sm:text-base text-muted">
                            <FiClock className="w-4 h-4" />
                            <span>Last Updated: {tosData.lastUpdated}</span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
                        {/* Table of Contents - Desktop */}
                        <div className="hidden lg:block">
                            <TableOfContents sections={tosData.sections} />
                        </div>

                        {/* Terms Sections */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Table of Contents - Mobile */}
                            <div className="lg:hidden mb-8">
                                <TableOfContents sections={tosData.sections} />
                            </div>

                            {/* All Sections */}
                            {tosData.sections.map((section, index) => (
                                <div key={section.id} id={`section-${section.id}`}>
                                    <TOSSection section={section} index={index} />
                                </div>
                            ))}

                            {/* Contact CTA */}
                            

                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
