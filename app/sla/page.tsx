"use client";

import { motion } from "motion/react";
import { memo } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { FiClock } from "react-icons/fi";
import slaData from "../json/sla.json";

interface Subsection {
    subtitle: string;
    text: string;
}

interface Section {
    id: number;
    title: string;
    intro: string;
    subsections?: Subsection[];
    list?: string[];
}

const SLASection = memo(({ section, index }: { section: Section; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-10"
    >
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
            {section.title}
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
            {section.intro}
        </p>

        {/* Subsections */}
        {section.subsections && section.subsections.length > 0 && (
            <div className="space-y-4 mt-4 ml-4">
                {section.subsections.map((subsection, idx) => (
                    <div key={idx} className="mb-4">
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

        {/* List items */}
        {section.list && section.list.length > 0 && (
            <ul className="space-y-3 mt-4 ml-4">
                {section.list.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                        <span className="text-accent mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        )}
    </motion.div>
));

SLASection.displayName = 'SLASection';

export default function SLAPage() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
                <Spotlight />
            </div>
            <Navbar />

            <div className="relative px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 md:mt-32">
                <div className="relative z-10 max-w-4xl mx-auto mb-20">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            {slaData.title}
                        </h1>
                        <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
                            {slaData.introduction}
                        </p>
                        <div className="flex items-center gap-2 text-sm sm:text-base text-muted">
                            <FiClock className="w-4 h-4" />
                            <span>
                                This policy was last reviewed and approved for publication on {slaData.lastReviewed}, and is scheduled for re-review on {slaData.nextReview}.
                            </span>
                        </div>
                    </motion.div>

                    {/* Sections */}
                    <div>
                        {slaData.sections.map((section, index) => (
                            <SLASection key={section.id} section={section} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

