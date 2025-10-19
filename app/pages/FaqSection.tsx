'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronRight } from 'react-icons/fa'

export const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'What performance can I expect from Expanse?',
            answer: 'Our servers are powered by cutting-edge hardware including AMD Ryzen processors and NVMe SSD storage, delivering exceptional performance with ultra-low latency. You can expect 99.9% uptime and lightning-fast load times for all your applications.'
        },
        {
            question: 'Does Expanse support dedicated IP Addresses?',
            answer: 'Yes! We offer dedicated IP addresses on all our premium plans. You can purchase additional dedicated IPs at any time through your control panel, perfect for SSL certificates, email reputation, and application requirements.'
        },
        {
            question: 'Can I invite people to co-manage my server?',
            answer: 'Absolutely! Our Pterodactyl control panel allows you to create sub-users with customizable permissions. You can grant specific access levels to team members, from basic server controls to full administrative access.'
        },
        {
            question: 'How do I get support?',
            answer: 'Our support team is available 24/7 via email and Discord. Submit a ticket through your client area for technical issues, or join our Discord community for quick assistance. Most tickets receive a response within 15 minutes during peak hours.'
        }
    ]

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="w-full py-24 mt-24 px-4 relative overflow-hidden">
            {/* Top border with fade effect */}
            <div className="absolute top-0 left-0 right-0 h-px ">
                <div
                    className="h-full w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                    }}
                />
            </div>

            {/* Background blur effect - matching Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="2468" height="1218" viewBox="0 0 2468 1218" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_faq)">
                        <ellipse cx="1154" cy="438" rx="664" ry="288" fill="#10468C" fillOpacity="0.08"/>
                    </g>
                    <g filter="url(#filter1_f_faq)">
                        <ellipse cx="631" cy="870.5" rx="481" ry="197.5" fill="#10468C" fillOpacity="0.06"/>
                    </g>
                    <g filter="url(#filter2_f_faq)">
                        <ellipse cx="1837" cy="780.5" rx="481" ry="197.5" fill="#10468C" fillOpacity="0.13"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_faq" x="340" y="0" width="1628" height="876" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_faq"/>
                        </filter>
                        <filter id="filter1_f_faq" x="0" y="523" width="1262" height="695" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_faq"/>
                        </filter>
                        <filter id="filter2_f_faq" x="1206" y="433" width="1262" height="695" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_faq"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left side - Header */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl lg:text-5xl font-bold text-gray-200 mb-4 leading-tight"
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-gray-400 text-base mb-8 leading-relaxed max-w-xl"
                        >
                            Hungry for more info? Our FAQ is here to fill the gaps with clear answers to the questions we get asked most.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 bg-blue-400/40 border border-blue-400/20 text-white font-semibold rounded-lg hover:bg-blue-400/30 transition-colors shadow-inner"
                            style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.2)" }}
                        >
                            Join the Discord
                        </motion.button>
                    </div>

                    {/* Right side - FAQ Items */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-3"
                    >
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="relative"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left px-6 py-4 bg-black/20 hover:bg-black/30 border border-gray-800/30 rounded-lg transition-all duration-300 group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-200 group-hover:text-white font-medium pr-4 transition-colors">
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: openIndex === index ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-shrink-0"
                                        >
                                            <FaChevronRight className={`w-4 h-4 transition-colors ${
                                                openIndex === index ? 'text-blue-300' : 'text-gray-500'
                                            }`} />
                                        </motion.div>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 py-4 text-gray-400 text-base leading-relaxed bg-black/10 border-x border-b border-gray-800/30 rounded-b-lg">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default FaqSection