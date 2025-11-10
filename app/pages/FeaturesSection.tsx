'use client'

import React from 'react'
import { motion } from 'motion/react'
import { FaBolt, FaServer, FaHeadset, FaGamepad, FaCloud, FaShieldAlt, FaDiscord, FaGlobe, FaArrowUp, FaDatabase } from 'react-icons/fa'
import Image
    from 'next/image'
import { Spotlight } from '@/components/ui/ripple'
import { Ripple } from '@/components/ui/background-ripple-effect'
export const FeaturesSection = () => {
    const features = [
        {
            icon: <FaServer className="w-8 h-8" />,
            title: 'HIGH-PERFORMANCE HARDWARE',
            description: 'Experience lightning-fast speeds with AMD Ryzen 9 9950X processors, DDR5 memory, and NVMe SSDs for unmatched computing power.',
            accent: 'blue'
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: 'ADVANCED DDOS PROTECTION',
            description: 'Stay protected with our enterprise-grade NeoProtect system that mitigates attacks up to 2.4+ Tbps, keeping your services online.',
            accent: 'blue'
        },
        {
            icon: <FaBolt className="w-8 h-8" />,
            title: 'ULTRA-FAST STORAGE',
            description: 'Eliminate I/O bottlenecks with NVMe SSDs delivering read/write speeds up to 7000MB/s for instant data access.',
            accent: 'cyan'
        },
        {
            icon: <FaGlobe className="w-8 h-8" />,
            title: 'GLOBAL NETWORK',
            description: 'Connect to strategically positioned data centers worldwide for low-latency performance and optimal user experience.',
            accent: 'cyan'
        },
        {
            icon: <FaServer className="w-8 h-8" />,
            title: '99.9% UPTIME GUARANTEE',
            description: 'Count on our reliable infrastructure with redundant systems, proactive monitoring, and rapid response times.',
            accent: 'blue'
        },
        {
            icon: <FaArrowUp className="w-8 h-8" />,
            title: 'SEAMLESS SCALABILITY',
            description: 'Grow your infrastructure effortlessly with flexible scaling options to match your evolving business needs.',
            accent: 'cyan'
        },
        {
            icon: <FaCloud className="w-8 h-8" />,
            title: 'ADVANCED VIRTUALIZATION',
            description: 'Leverage cutting-edge virtualization technology for optimal resource allocation and isolation between instances.',
            accent: 'cyan'
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: 'ENTERPRISE SECURITY',
            description: 'Protect your data with advanced security measures including firewall protection, intrusion detection, and regular security audits.',
            accent: 'blue'
        },
        {
            icon: <FaDatabase className="w-8 h-8" />,
            title: 'AUTOMATED BACKUPS',
            description: 'Rest easy with scheduled automated backups and simple restore options to keep your data safe and recoverable.',
            accent: 'cyan'
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    }

    return (
        <section className="w-full py-24 px-4 relative ">


            <div className="max-w-7xl mx-auto relative z-10">
                
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16"
                >
                    What we <span className='text-accent'>Offer</span>?
                    <p className='text-muted leading-relaxed max-w-xl mx-auto text-sm sm:text-base mt-4 font-light'>Built by devs, for devs. Every feature is designed to keep your server running smooth, secure, and stress-free.</p>
                </motion.h2>

                
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative group"
                        >
                            <div className="relative h-full p-2  rounded-lg backdrop-blur-sm transition-all duration-300">
                                
                                <div
                                className={`inline-flex items-center bg-button justify-center text-primary-foreground w-16 h-16 mb-4 rounded-sm shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)]`}>
                                    {feature.icon}
                                </div>

                                
                                <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
                                    {feature.title}
                                </h3>

                                
                                <p className="text-sm text-muted leading-relaxed mb-4">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                
               
            </div>
        </section>
    )
}
