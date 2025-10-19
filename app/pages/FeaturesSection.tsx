'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaBolt, FaServer, FaHeadset, FaGamepad, FaCloud, FaShieldAlt, FaDiscord } from 'react-icons/fa'
import Image
    from 'next/image'
import { Spotlight } from '@/components/ui/ripple'
export const FeaturesSection = () => {
    const features = [
        {
            icon: <FaBolt className="w-8 h-8" />,
            title: 'INSTANT ACTIVATION',
            description: 'NO WAITING, NO DELAYS! YOUR SERVICE IS ACTIVATED IMMEDIATELY AFTER PAYMENT, SO YOU CAN JUMP RIGHT INTO ACTION. YOUR ACCOUNT DETAILS WILL BE EMAILED WITHIN MINUTES.',
            accent: 'cyan'
        },
        {
            icon: <FaServer className="w-8 h-8" />,
            title: 'POWERFUL SERVERS',
            description: 'DOMINATE THE COMPETITION WITH HIGH-SPEED, CUTTING-EDGE HARDWARE OPTIMIZED FOR PEAK PERFORMANCE. ENJOY ZERO LAG, ULTRA-LOW LATENCY, AND A SEAMLESS EXPERIENCE FOR ALL YOUR NEEDS.',
            accent: 'blue'
        },
        {
            icon: <FaHeadset className="w-8 h-8" />,
            title: 'SUPPORT 24/7',
            description: 'GOT A QUESTION? NEED ASSISTANCE? WE\'VE GOT YOUR BACK! OUR TEAM IS AVAILABLE 24/7 VIA EMAIL AND DISCORD FOR IMMEDIATE SUPPORT.',
            accent: 'blue',
            buttons: [
                { label: 'EMAIL US', variant: 'primary' },
                { label: 'DISCORD', variant: 'secondary' }
            ]
        },
        {
            icon: <FaGamepad className="w-8 h-8" />,
            title: 'PREMIUM GAME PANEL',
            description: 'OUR PTERODACTYL GAME PANEL MAKES MANAGING YOUR SERVER SIMPLE. START, STOP, RESTART, AND CUSTOMIZE YOUR SERVER EASILY, ALL IN ONE PLACE.',
            accent: 'cyan'
        },
        {
            icon: <FaCloud className="w-8 h-8" />,
            title: 'REMOTE BACKUPS',
            description: 'NEVER LOSE YOUR PROGRESS! WE SECURELY BACK UP YOUR DATA TO ENCRYPTED OFFSITE STORAGE, ENSURING YOU CAN RESTORE IT ANYTIME.',
            accent: 'cyan'
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: 'SATISFACTION GUARANTEED',
            description: 'WE\'RE CONFIDENT YOU\'LL LOVE FREAKINHOSTING! THAT\'S WHY WE OFFER A 72-HOUR MONEY-BACK GUARANTEE ON CERTAIN SERVICES. YOUR SATISFACTION IS OUR PRIORITY.',
            accent: 'blue'
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
        <section className="w-full py-24 px-4 relative overflow-hidden">


            <div className="max-w-7xl mx-auto relative z-10">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16"
                >
                    What we <span className='text-accent'>Offer</span>?
                </motion.h2>

                {/* Features Grid */}
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
                            <div className="relative h-full   rounded-lg backdrop-blur-sm transition-all duration-300">
                                {/* Icon with accent color */}
                                <div
                                className={`inline-flex items-center bg-button justify-center text-primary-foreground w-16 h-16 mb-4 rounded-sm shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)]`}>
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted leading-relaxed mb-4">
                                    {feature.description}
                                </p>

                                {/* Buttons if available */}
                                {feature.buttons && (
                                    <div className="flex gap-3 mt-6">
                                        {feature.buttons.map((button, btnIndex) => (
                                            <button
                                                key={btnIndex}
                                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${button.variant === 'primary'
                                                    ? 'bg-blue-500/20 text-accent border border-blue-500/30 hover:bg-blue-500/30'
                                                    : 'bg-transparent text-muted border border-border hover:border-border-accent hover:text-accent'
                                                    }`}
                                            >
                                                {button.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Discord Card */}
               
            </div>
        </section>
    )
}
