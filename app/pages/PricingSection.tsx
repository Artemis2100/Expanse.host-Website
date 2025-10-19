'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Spotlight } from '@/components/ui/ripple'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa'
const PricingSection = () => {
    const services = [
        {
            title: 'Game Hosting',
            description: 'High-performance servers with instant setup, custom control panel, and mod support.',
            image: '/minecraft.png',
            accent: 'blue'
        },
        {
            title: 'Bare Metal',
            description: 'Dedicated servers with the latest Ryzen processors, DDR5 RAM, and enterprise-grade hardware.',
            image: '/images/bare-metal.jpg',
            accent: 'blue'
        },
          {
            title: 'Cloud Hosting',
            description: 'Cloud hosting with the latest Intel processors, DDR5 RAM, and enterprise-grade hardware.',
            image: '/images/bare-metal.jpg',
            accent: 'blue'
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
        <section className="relative w-full pt-24 px-4 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl  md:text-5xl font-bold text-white mb-8 text-left"
                >
                    We got what you <span className='text-blue-300'>need</span>
                    <p className='text-sm text-gray-300 font-medium mt-4'>All available plans that we offer, alot of them right?</p>
                </motion.h2>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                        >
                            <CardSpotlight
                                className="h-full flex flex-col bg-gray-800/20 rounded-sm border-blue-400/20"
                                radius={300}
                                color="#1e40af"
                            >
                                <div className="flex flex-col flex-grow relative z-20">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-100 mb-3 tracking-wide">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                                        {service.description}
                                    </p>

                                    {/* Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full flex items-center justify-center px-6 py-3 bg-blue-500/30 border border-blue-400/30 text-white rounded-lg font-semibold hover:bg-blue-500/40 transition-colors"
                                    >
                                        <span>Explore Now</span>
                                        <svg
                                            className="ml-2 w-5 h-5"
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
                            </CardSpotlight>
                        </motion.div>
                    ))}
                </motion.div>

 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6"
                >
                    <div className="relative group">
                        <div className="relative h-full bg-[#5865f2] rounded-lg backdrop-blur-sm p-8 transition-all duration-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="inline-flex items-center justify-center text-white  rounded-lg">
                                        <FaDiscord className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            JOIN US ON DISCORD
                                        </h3>
                                        <p className="text-gray-200">
                                            Connect with our community, get instant support, and stay updated with the latest news!
                                        </p>
                                    </div>
                                </div>
                                <Image
                                    width={192}
                                    height={192}
                                    className="h-auto w-48"
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