'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Spotlight } from '@/components/ui/ripple'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa'
import { AiOutlineCloudServer } from "react-icons/ai";
import { CiServer } from "react-icons/ci";
import { Ripple } from '@/components/ui/background-ripple-effect'
const PricingSection = () => {
    const services = [
        {
            title: 'Game Hosting',
            description: 'High-performance servers with instant setup, custom control panel, and mod support.',
            image: '/creeper.png',
            accent: 'blue',
            icon: <Image src="/products/creeper.png" alt="Game Hosting" width={48} height={48} className="w-12 h-auto" />
        },
        {
            title: 'Bare Metal',
            description: 'Dedicated servers with the latest Ryzen processors, DDR5 RAM, and enterprise-grade hardware.',
            image: '/images/bare-metal.jpg',
            accent: 'blue',
            icon: <CiServer className="w-12 h-auto" />
        },
        {
            title: 'Cloud Hosting',
            description: 'Cloud hosting with the latest Intel processors, DDR5 RAM, and enterprise-grade hardware.',
            image: '/images/bare-metal.jpg',
            accent: 'blue',
            icon: <AiOutlineCloudServer className="w-12 h-auto" />
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const
            }
        }
    }

    return (
        <section className="relative w-full  px-4 ">
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl mt-8 sm:mt-12 md:mt-16 font-bold text-foreground mb-6 sm:mb-8 text-left px-2 sm:px-0"
                >
                    We got what <br />  <span className='text-accent'>YOU</span> need.
                    <p className='text-xs sm:text-sm text-muted font-medium mt-3 sm:mt-4'>All available plans that we offer, alot of them right?</p>
                </motion.h2>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                        >
                            <div
                                className="h-full flex flex-col rounded-xl  border border-muted"
                            >

                                <div className="flex flex-col flex-grow  rounded-xl relative z-20">
                                <Ripple />
                                 <div className="p-4 sm:p-6 rounded-xl">
                                    {/* Icon */}
                                    <div className="text-primary mb-4">
                                        {service.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 tracking-wide">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4 sm:mb-6 flex-grow">
                                        {service.description}
                                    </p>

                                    {/* Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-button border border-blue-400/30 text-primary-foreground rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-500/40 transition-colors"
                                    >
                                        <span>Explore Now</span>
                                        <svg
                                            className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                                        </svg>
                                    </motion.button>
                                </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6 sm:mt-8"
                >
                    <div className="relative group">
                        <div className="relative h-full bg-[#5865f2] rounded-lg backdrop-blur-sm p-4 sm:p-6 md:p-8 transition-all duration-300 ">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                                    <div className="inline-flex items-center justify-center text-white rounded-lg flex-shrink-0">
                                        <FaDiscord className="w-8 h-8 sm:w-10 sm:h-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                            JOIN US ON DISCORD
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-200">
                                            Connect with our community, get instant support, and stay updated with the latest news!
                                        </p>
                                    </div>
                                </div>
                                <Image
                                    width={192}
                                    height={192}
                                    className="h-auto w-32 sm:w-40 md:w-48 flex-shrink-0"
                                    alt="Join us on Discord"
                                    src="/assets/joinus.png"
                                />
                            </div>
                        </div>

                    </div>
                </motion.div>                
            </div>
        </section>
    )
}

export default PricingSection