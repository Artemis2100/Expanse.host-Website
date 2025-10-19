'use client'

import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
    return (
        <div className="relative w-full mt-40 flex items-center justify-center">
            {/* Background blur effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none ">
                <svg width="2244" height="1173" viewBox="0 0 2244 1173" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <g filter="url(#filter0_f_130_63)">
                        <ellipse cx="1122" cy="586.5" rx="972" ry="436.5" fill="#10468C" fillOpacity="0.08"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_130_63" x="0" y="0" width="2244" height="1173" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_130_63"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="text-center max-w-3xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-blue-400/30 to-blue-400/10 border border-blue-500/20 rounded-3xl backdrop-blur-sm shadow-inner"
                >
                    <span className="inline-flex items-center text-sm md:text-base text-foreground dark:text-gray-200 font-medium">
                        <svg className="w-6 text-primary h-6 mr-2" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M166.4 25.64l-12.8 12.72 160 160.04 12.8-12.8-160-159.96zm-32 95.96L128 128l-6.4 6.4 160 160 12.8-12.8-160-160zm-96.08 32L25.6 166.4l160 160 12.8-12.8-160.08-160zm314.78 86.6l-29.4 84.1-85.4 26 71 54-1.7 89.2 73.2-50.8 84.4 29.1-25.7-85.3 53.8-71.2-89.1-2-51.1-73.1z"></path></svg>
                        New VPS lineup released! <span className='underline ml-1 text-accent'> Get started</span>
                    </span>
                    <svg stroke="currentColor" fill="currentColor" className="w-3 h-3 text-primary/60" strokeWidth="0" viewBox="0 0 448 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="text-foreground text-5xl md:text-7xl leading-[1.1] font-bold mb-8"
                >
                    Hosting perfected, <br />that&apos;s <span className='relative inline-block text-accent'>
                        Expanse

                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    className="text-lg md:text-xl text-muted mb-8"
                >
                    Experience lightning-fast performance, rock-solid reliability, and unparalleled support for your web projects.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                    className="flex items-center justify-center gap-2"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex border border-blue-400/20 items-center px-8 py-3 bg-button text-primary-foreground rounded-lg font-semibold hover:bg-blue-400/30 transition-colors shadow-inner"
                        style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.2)" }}
                    >
                        <span>View Plans</span>
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

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center px-4 py-3 bg-transparent text-foreground font-semibold hover:text-accent transition-colors"
                    >
                        <span>Explore dedicated servers</span>
                        <svg
                            className="ml-2 w-5 h-5"
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            version="1.2"
                            baseProfile="tiny"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 20c-.802 0-1.555-.312-2.122-.879-.566-.566-.878-1.32-.878-2.121s.312-1.555.879-2.122l2.878-2.878-2.878-2.879c-.567-.566-.879-1.32-.879-2.121s.312-1.555.879-2.122c1.133-1.132 3.109-1.133 4.243.001l7.121 7.121-7.122 7.121c-.566.567-1.319.879-2.121.879zm0-14c-.268 0-.518.104-.707.292-.189.19-.293.441-.293.708s.104.518.293.707l4.292 4.293-4.292 4.293c-.189.189-.293.439-.293.707s.104.518.293.707c.378.379 1.037.378 1.414.001l5.708-5.708-5.708-5.707c-.189-.189-.439-.293-.707-.293z"></path>
                        </svg>
                    </motion.button>
                </motion.div>
            </div>
        </div>

    )
}

export default HeroSection