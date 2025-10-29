"use client";

import { motion } from "framer-motion";
import { memo, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  FiZap, FiGlobe, FiClock, FiTrendingUp,
  FiUsers, FiCpu, FiBookOpen, FiTarget,
  FiArrowRight, FiMapPin, FiBriefcase
} from "react-icons/fi";
import careersData from "../json/careers.json";

const iconMap: { [key: string]: React.ReactElement } = {
  innovation: <FiZap className="w-8 h-8" />,
  remote: <FiGlobe className="w-8 h-8" />,
  flexible: <FiClock className="w-8 h-8" />,
  growth: <FiTrendingUp className="w-8 h-8" />,
  ownership: <FiUsers className="w-8 h-8" />,
  tech: <FiCpu className="w-8 h-8" />,
  learning: <FiBookOpen className="w-8 h-8" />,
  impact: <FiTarget className="w-8 h-8" />
};

const BenefitCard = memo(({ benefit, index }: { benefit: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="relative group"
  >
    <div className="relative h-full p-6 rounded-lg backdrop-blur-sm transition-all duration-300">
      <div className="inline-flex items-center bg-button justify-center text-primary-foreground w-16 h-16 mb-4 rounded-sm shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)]">
        {iconMap[benefit.icon]}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
        {benefit.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">
        {benefit.description}
      </p>
    </div>
  </motion.div>
));

BenefitCard.displayName = 'BenefitCard';

const JobCard = memo(({ role, index }: { role: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group"
  >
    <div className="p-6 border border-muted bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {role.tags.map((tag: string, idx: number) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs font-medium bg-card text-accent rounded-md border border-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">
        {role.title}
      </h3>

      <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
        <span className="flex items-center gap-1">
          <FiBriefcase className="w-4 h-4" />
          {role.department}
        </span>
        <span className="flex items-center gap-1">
          <FiMapPin className="w-4 h-4" />
          {role.location}
        </span>
      </div>

      <p className="text-sm text-muted mb-4">
        {role.type}
      </p>

      <p className="text-sm text-muted leading-relaxed mb-4">
        {role.description}
      </p>

      <button className="text-accent text-sm font-medium hover:underline flex items-center gap-2 group-hover:gap-3 transition-all">
        View Details
        <FiArrowRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
));

JobCard.displayName = 'JobCard';

const TeamMember = memo(({ member, index }: { member: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine the image path based on member name
  const getImagePath = (name: string) => {
    const firstName = name.toLowerCase().split(' ')[0];
    if (firstName === 'sam') return '/pfp/sam.png';
    if (firstName === 'shaun') return '/pfp/shaun.png';
    return '/pfp/unknown.png';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div className="relative p-4 border border-muted rounded-md bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
        {/* Header with PFP and Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent/20">
            <Image
              src={getImagePath(member.name)}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {member.name}
            </h3>
            <p className="text-sm text-accent">
              {member.role}
            </p>
          </div>
        </div>

        {/* Description with blur overlay when collapsed */}
        <div className="relative flex-grow">
          <p className={`text-sm text-muted leading-relaxed transition-all duration-300 ${
            isExpanded ? '' : 'line-clamp-3'
          }`}>
            {member.description}
          </p>

          {/* Blur overlay when collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/90 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Read More Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-accent text-sm font-medium hover:underline flex items-center gap-2 transition-all"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          <FiArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Full screen overlay when expanded */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className=" border border-muted rounded p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-muted">
                <Image
                  src={getImagePath(member.name)}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-base text-accent">
                  {member.role}
                </p>
              </div>
            </div>

            <p className="text-base text-muted leading-relaxed mb-6">
              {member.description}
            </p>

            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 bg-button text-white rounded hover:bg-accent/80 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
});

TeamMember.displayName = 'TeamMember';

const ProgramCard = memo(({ program, index }: { program: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 border-l-4 border-accent bg-card/30 backdrop-blur-sm rounded-r-xl"
  >
    <h3 className="text-lg font-bold text-foreground mb-2">
      {program.title}
    </h3>
    <p className="text-sm text-muted leading-relaxed">
      {program.description}
    </p>
  </motion.div>
));

ProgramCard.displayName = 'ProgramCard';

export default function CareersPage() {
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
      <div className="relative w-full mt-20 sm:mt-32 md:mt-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <BackgroundBeams />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="934" height="584" viewBox="0 0 934 584" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:hidden">
            <g filter="url(#filter0_f_careers_light)">
              <ellipse cx="467" cy="292" rx="267" ry="92" fill="#93C5FD" fillOpacity="0.4" />
            </g>
            <defs>
              <filter id="filter0_f_careers_light" x="0" y="0" width="934" height="584" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1_31" />
              </filter>
            </defs>
          </svg>
          <svg width="934" height="584" viewBox="0 0 934 584" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block">
            <g filter="url(#filter0_f_careers_dark)">
              <ellipse cx="467" cy="292" rx="267" ry="92" fill="#1665CD" fillOpacity="0.6" />
            </g>
            <defs>
              <filter id="filter0_f_careers_dark" x="0" y="0" width="934" height="584" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1_31" />
              </filter>
            </defs>
          </svg>
        </div>

        <div className="text-center max-w-4xl w-full relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-bold mb-4 sm:mb-6"
          >
            Build the future <br /> with us.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted mb-6 sm:mb-8 px-2 sm:px-0"
          >
            {careersData.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-button text-primary-foreground rounded-xl font-medium hover:bg-blue-400/30 transition-colors shadow-inner text-sm sm:text-base border border-blue-400/20"
              style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.2)" }}
            >
              {careersData.hero.ctaText}
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Why Work Here Section */}
      

      {/* Open Roles Section */}
      <section className="w-full py-24 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-left text-foreground mb-4"
          >
            {careersData.openRoles.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted leading-relaxed max-w-3xl text-sm sm:text-base text-left mb-4"
          >
            {careersData.openRoles.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careersData.openRoles.roles.map((role, index) => (
              <JobCard key={role.id} role={role} index={index} />
            ))}
          </div>
        </div>
      </section>
<section className="w-full py-4 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4"
          >
            {careersData.whyWorkHere.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted leading-relaxed max-w-3xl mx-auto text-sm sm:text-base text-center mb-16"
          >
            {careersData.whyWorkHere.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careersData.whyWorkHere.benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="w-full py-24 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4"
          >
            {careersData.team.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted leading-relaxed max-w-3xl mx-auto text-sm sm:text-base text-center mb-16"
          >
            {careersData.team.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careersData.team.members.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Early Careers Section */}
      <section className="w-full py-24 px-4 relative">
        <div className="max-w-7xl mx-auto relative ">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {careersData.earlyCareers.title}
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-4xl mx-auto leading-relaxed mb-8">
              {careersData.earlyCareers.subtitle}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-button text-primary-foreground rounded-xl font-medium hover:bg-blue-400/30 transition-colors shadow-inner border border-blue-400/20"
              style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.2)" }}
            >
              {careersData.earlyCareers.ctaText}
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careersData.earlyCareers.programs.map((program, index) => (
              <ProgramCard key={index} program={program} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
