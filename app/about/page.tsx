"use client";

import { motion } from "framer-motion";
import { memo, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Spotlight } from "@/components/ui/ripple";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  FiArrowRight, FiServer, FiGlobe, FiShield, FiDatabase,
  FiCpu, FiHardDrive, FiTrendingUp
} from "react-icons/fi";
import aboutData from "../json/about.json";
import { Ripple } from "@/components/ui/background-ripple-effect";

const TimelineItem = memo(({ item, index, isLast }: { item: any; index: number; isLast: boolean }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative grid grid-cols-[1fr_auto_1fr] gap-0 mb-16 last:mb-0"
    >
      
      {isEven ? (
        <div className="text-right pr-8 relative">
          <span className="inline-block text-xs font-bold text-accent/80 mb-3 px-3 py-1 bg-accent/10 rounded-full">
            {item.quarter}
          </span>
          <div className="p-6 border border-muted bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 rounded-lg group">
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {item.description}
            </p>
          </div>
          
          <div className="absolute top-1.5 -right-8 w-14 h-0.5 border-muted border-2" />
        </div>
      ) : (
        <div />
      )}

      
      <div className="relative flex flex-col items-center w-12">
        <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent relative z-10" />
        {!isLast && (
          <div className="absolute top-3 w-0.5 border-muted border-2" style={{ height: 'calc(100% + 4rem)' }} />
        )}
      </div>

      
      {!isEven ? (
        <div className="text-left pl-8 relative">
          <span className="inline-block text-xs font-bold text-accent/80 mb-3 px-3 py-1 bg-accent/10 rounded-full">
            {item.quarter}
          </span>
          <div className="p-6 border border-muted bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 rounded-lg group">
            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {item.description}
            </p>
          </div>
          
          <div className="absolute top-1.5 -left-8 w-14 h-0.5 border-muted border-2" />
        </div>
      ) : (
        <div />
      )}
    </motion.div>
  );
});

TimelineItem.displayName = 'TimelineItem';

const DifferentiatorCard = memo(({ item, index }: { item: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group"
  >
    <div className="p-6 border border-muted bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full">
      <h3 className="text-lg font-bold text-foreground mb-3">
        {item.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">
        {item.description}
      </p>
    </div>
  </motion.div>
));

DifferentiatorCard.displayName = 'DifferentiatorCard';

const TeamMember = memo(({ member, index }: { member: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className="relative p-6 border border-muted rounded-xl bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
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
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-accent text-sm font-medium hover:underline flex items-center gap-2 transition-all"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          <FiArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-muted rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent/20">
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
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
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

const StatCard = memo(({ stat, index }: { stat: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="text-center p-6"
  >
    <div className="text-4xl md:text-5xl text-accent mb-2">
      {stat.value}
    </div>
    <div className="text-sm text-muted">
      {stat.label}
    </div>
  </motion.div>
));

StatCard.displayName = 'StatCard';

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
        <Spotlight />
      </div>
      <Navbar />

      
      <div className="relative w-full mt-20 sm:mt-32 md:mt-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="934" height="584" viewBox="0 0 934 584" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:hidden">
            <g filter="url(#filter0_f_about_light)">
              <ellipse cx="467" cy="292" rx="267" ry="92" fill="#93C5FD" fillOpacity="0.4" />
            </g>
            <defs>
              <filter id="filter0_f_about_light" x="0" y="0" width="934" height="584" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1_31" />
              </filter>
            </defs>
          </svg>
          <svg width="934" height="584" viewBox="0 0 934 584" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden dark:block">
            <g filter="url(#filter0_f_about_dark)">
              <ellipse cx="467" cy="292" rx="267" ry="92" fill="#1665CD" fillOpacity="0.6" />
            </g>
            <defs>
              <filter id="filter0_f_about_dark" x="0" y="0" width="934" height="584" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
            Powering the Future of Hosting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted mb-6 sm:mb-8 px-2 sm:px-0"
          >
            Built for speed, scale, and the explorers of tomorrow.
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
              Discover Our Story
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      
      <section className="w-full py-24 border-t border-b border-muted mt-32 px-4 relative overflow-hidden">
        <Ripple />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-foreground mb-6"
              >
                Our Mission & Vision
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-base text-muted leading-relaxed mb-6">
                  At Expanse, we&apos;re on a mission to redefine what&apos;s possible in the hosting industry. We believe in a future where infrastructure is not just a utility, but a competitive advantage that empowers businesses to innovate without constraints.
                </p>
                <p className="text-base text-muted leading-relaxed">
                  Our vision is to build the most advanced hosting platform on the planet, combining cutting-edge AMD hardware, global infrastructure, and intelligent automation to deliver unmatched performance, reliability, and value.
                </p>
              </motion.div>
            </div>

            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 border-l-4 border-accent bg-card/30 backdrop-blur-sm"
              >
                <p className="text-sm text-muted leading-relaxed">
                  Pushing the boundaries of performance with high-frequency AMD Ryzen processors
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 border-l-4 border-accent bg-card/30 backdrop-blur-sm"
              >
                <p className="text-sm text-muted leading-relaxed">
                  Building a global network of strategically positioned data centers
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 border-l-4 border-accent bg-card/30 backdrop-blur-sm"
              >
                <p className="text-sm text-muted leading-relaxed">
                  Developing AI-enhanced tools that simplify complex infrastructure management
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 border-l-4 border-accent bg-card/30 backdrop-blur-sm"
              >
                <p className="text-sm text-muted leading-relaxed">
                  Expanding to new horizons
                </p>
              </motion.div>
            </div>
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
            className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6"
          >
            Our Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted leading-relaxed max-w-3xl mx-auto text-sm sm:text-base text-center mb-16"
          >
            From our humble beginnings to becoming a leading force in the hosting industry, our journey has been defined by innovation, growth, and a relentless pursuit of excellence.
          </motion.p>

          <div className="max-w-5xl mx-auto">
            {aboutData.journey.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLast={index === aboutData.journey.length - 1}
              />
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
            className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6"
          >
            Meet the Team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted leading-relaxed max-w-3xl mx-auto text-sm sm:text-base text-center mb-16"
          >
            The passionate individuals behind Expanse who are dedicated to revolutionizing the hosting industry with innovation, expertise, and a customer-first approach.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.team.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      
      <section className="w-full pt-24 pb-8 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-left text-foreground mb-6"
          >
            Expanse by the Numbers
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutData.stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      
      <section className="w-full pb-24 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 border border-muted bg-card/50 backdrop-blur-sm rounded-xl"
          >
            <BackgroundBeams />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join the Future of Hosting
            </h2>
            <p className="text-base text-muted leading-relaxed mb-8">
              Experience the next generation of hosting with Expanse. Build your infrastructure on a platform designed for the innovators, the dreamers, and the explorers of tomorrow.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-button text-primary-foreground rounded-xl font-medium hover:bg-blue-400/30 transition-colors shadow-inner border border-blue-400/20"
              style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.2)" }}
            >
              Build with Expanse
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
