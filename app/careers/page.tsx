"use client";

import { motion } from "motion/react";
import { memo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  FiZap, FiGlobe, FiClock, FiTrendingUp,
  FiUsers, FiCpu, FiBookOpen, FiTarget,
  FiArrowRight, FiMapPin, FiBriefcase, FiX
} from "react-icons/fi";
import { AnimatePresence } from "motion/react";
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

const JobCard = memo(({ role, index }: { role: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isExpanded]);

  const handleClose = () => {
    setIsExpanded(false);
  };

  const ModalContent = () => (
    <AnimatePresence>
      {isExpanded && role.details && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 dark:bg-black/95 z-[9999]"
            onClick={handleClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl max-w-3xl w-full max-h-[90vh] relative shadow-2xl flex flex-col pointer-events-auto"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
              
              <div className="flex-1 overflow-y-auto p-8 pr-6 min-h-0 custom-scrollbar">
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {role.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <span className="flex items-center gap-1.5">
                      <FiBriefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium">{role.department}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium">{role.location}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {role.type}
                  </p>
                </div>

                {role.details.overview && (
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Overview</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {role.details.overview}
                    </p>
                  </div>
                )}

                {role.details.whatYoullBuild && role.details.whatYoullBuild.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What You'll Build</h3>
                    <ul className="space-y-3">
                      {role.details.whatYoullBuild.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-blue-600 dark:text-blue-400 mt-1 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {role.details.requirements && role.details.requirements.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What We're Looking For</h3>
                    <ul className="space-y-3">
                      {role.details.requirements.map((requirement: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-blue-600 dark:text-blue-400 mt-1 font-bold">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {role.details.compensation && (
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Compensation</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {role.details.compensation}
                    </p>
                  </div>
                )}

                {role.details.platforms && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Platforms</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {role.details.platforms}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 px-8 pb-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
                <a
                  href={role.details.applyLink}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg flex items-center gap-2"
                >
                  Apply Now
                  <FiArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group"
      >
        <div className="p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 h-full rounded-lg shadow-sm hover:shadow-md">
          <div className="flex flex-wrap gap-2 mb-4">
            {role.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {role.title}
          </h3>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span className="flex items-center gap-1.5">
              <FiBriefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">{role.department}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FiMapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">{role.location}</span>
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
            {role.type}
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {role.description}
          </p>

          <button 
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            View Details
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {mounted && typeof window !== 'undefined' && createPortal(
        <ModalContent />,
        document.body
      )}
    </>
  );
});

JobCard.displayName = 'JobCard';

const TeamMember = memo(({ member, index }: { member: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the image path based on member name
  const getImagePath = (name: string) => {
    const firstName = name.toLowerCase().split(' ')[0];
    if (firstName === 'sam') return '/pfp/sam.png';
    if (firstName === 'shaun') return '/pfp/shaun.png';
    return '/pfp/unknown.png';
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isExpanded]);

  const handleClose = () => {
    setIsExpanded(false);
  };

  const ModalContent = () => (
    <AnimatePresence>
      {isExpanded && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 dark:bg-black/95 z-[9999]"
            onClick={handleClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl pointer-events-auto custom-scrollbar"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-700">
                  <Image
                    src={getImagePath(member.name)}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-base text-blue-600 dark:text-blue-400">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {member.description}
              </p>

              <button
                onClick={handleClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div className="relative p-4 border border-muted rounded-md bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
        
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

        
        <div className="relative flex-grow">
          <p className={`text-sm text-muted leading-relaxed transition-all duration-300 ${
            isExpanded ? '' : 'line-clamp-3'
          }`}>
            {member.description}
          </p>

          
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/90 to-transparent pointer-events-none" />
          )}
        </div>

        
        <button
          onClick={() => setIsExpanded(true)}
          className="mt-4 text-accent text-sm font-medium hover:underline flex items-center gap-2 transition-all"
        >
          Read More
          <FiArrowRight className="w-4 h-4" />
        </button>
      </div>

      {mounted && typeof window !== 'undefined' && createPortal(
        <ModalContent />,
        document.body
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

          {careersData.openRoles.roles && careersData.openRoles.roles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(careersData.openRoles.roles as any[]).map((role: any, index: number) => (
              <JobCard key={index} role={role} index={index} />
            ))}
          </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="border border-dashed border-muted rounded-xl p-6 bg-card/40"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">No openings right now</h3>
              <p className="text-sm text-muted">
                We don&apos;t have any roles open at the moment. Please check back later or follow our socials for updates.
              </p>
            </motion.div>
          )}
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
