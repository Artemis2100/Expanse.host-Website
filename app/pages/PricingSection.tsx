'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
const PricingSection = () => {
    const services = [
        {
            title: 'Minecraft Hosting',
            description: 'High-performance servers with instant setup, custom control panel, and mod support.',
            image: '/images/minecraft-hosting.jpg',
            accent: 'blue'
        },
        {
            title: 'Zenith Series VDS',
            description: 'Virtual dedicated servers with NVMe storage, high-frequency CPUs, and guaranteed resources.',
            image: '/images/zenith-vds.jpg',
            accent: 'blue'
        },
        {
            title: 'Eclipse Series VDS',
            description: 'Enterprise-grade virtual servers with dedicated resources, SSD storage, and full root access.',
            image: '/images/eclipse-vds.jpg',
            accent: 'blue'
        },
        {
            title: 'Bare Metal',
            description: 'Dedicated servers with the latest Ryzen processors, DDR5 RAM, and enterprise-grade hardware.',
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
        <section className="relative w-full py-24 px-4 overflow-hidden">
            <BackgroundRippleEffect />
            {/* Vignette Overlay - fades from edges to center */}
            <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/80"
                 style={{
                     background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.9) 100%)'
                 }}
            />
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="bg-blue-400/40 rounded-full h-2 w-16 mb-8"/>
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl  md:text-5xl font-bold text-white mb-16 text-left"
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
                            className="relative group"
                        >
                            <div className="relative h-full flex border border-blue-400/20 flex-col bg-gray-800/20 rounded-lg backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-500/40">
                                {/* Image Container */}
                                <div className="relative w-full h-48 bg-gradient-to-br from-blue-400/20 to-blue-600/10 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                                    {/* Placeholder for image - replace with actual images */}
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg
                                            className="w-20 h-20 text-blue-300/40"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow p-6">
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
                                        className="w-full flex items-center justify-center px-6 py-3 bg-blue-400/40 border border-blue-400/20 text-white rounded-lg font-semibold hover:bg-blue-400/30 transition-colors shadow-inner"
                                        style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.2)" }}
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
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Domain Lookup Card */}
                
            </div>
        </section>
    )
}

export default PricingSection