"use client";

import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { FiShield } from "react-icons/fi";
import aupData from "../json/aup.json";
import { memo } from "react";

interface Section {
  id: number;
  title: string;
  content?: string;
  list?: string[];
}

const AUPSection = memo(({ section, index }: { section: Section; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="mb-8"
  >
    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
      <span className="text-accent">{section.id}.</span> {section.title}
    </h2>
    {section.content && (
      <p className="text-sm sm:text-base text-muted leading-relaxed mb-3">
        {section.content}
      </p>
    )}
    {section.list && section.list.length > 0 && (
      <ul className="space-y-2 ml-4">
        {section.list.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-muted">
            <span className="text-accent mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
));

AUPSection.displayName = "AUPSection";

export default function AUPPage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <Spotlight />
      </div>
      <Navbar />
      <div className="relative px-4 sm:px-6 lg:px-8 mt-20 sm:mt-32 md:mt-32">
        <div className="relative z-10 max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 flex items-center gap-3">
              <FiShield className="w-8 h-8 text-accent" />
              {aupData.title}
            </h1>
            <p className="text-sm sm:text-base text-muted">
              Last Updated: {aupData.lastUpdated}
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed mt-4">
              {aupData.introduction}
            </p>
          </motion.div>

          <div>
            {aupData.sections.map((section: Section, index: number) => (
              <AUPSection key={section.id} section={section} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


