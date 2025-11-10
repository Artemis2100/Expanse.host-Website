'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { FaChevronRight } from 'react-icons/fa'

export const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: 'What performance can I expect from Expanse?',
            answer: 'Our servers are powered by cutting-edge hardware including AMD Ryzen 9 9950X processors, DDR5 memory, and NVMe SSD storage, delivering exceptional performance with ultra-low latency. Our servers deliver up to 35% better performance than comparable offerings, ensuring your applications run at peak efficiency. You can expect 99.9% uptime and lightning-fast load times for all your applications.'
        },
        {
            question: 'Does Expanse support dedicated IP Addresses?',
            answer: 'Yes! We offer dedicated IP addresses on all our premium plans. You can purchase additional dedicated IPs at any time through your control panel, perfect for SSL certificates, email reputation, and application requirements.'
        },
        {
            question: 'How do I get support?',
            answer: 'Our support team is available 24/7 via email and Discord. Submit a ticket through your client area for technical issues, or join our Discord community for quick assistance. Most tickets receive a response within 15 minutes during peak hours. Live chat responses are typically under 30 minutes, support tickets under 3 hours, and email inquiries under 24 hours.'
        },
        {
            question: 'What DDoS protection do you offer?',
            answer: 'We provide enterprise-grade DDoS protection through our G-Core system that can mitigate attacks up to 200+ Tbps. Our multi-layered protection ensures your services remain online and responsive, even during the most aggressive attacks.'
        },
        {
            question: 'What storage technology do you use?',
            answer: 'We use NVMe SSDs that deliver read/write speeds up to 7000MB/s, eliminating I/O bottlenecks for instant data access. For our distributed infrastructure, we utilize Ceph storage architecture which provides unmatched reliability, performance, and scalability with automatic replication and data protection.'
        },
        {
            question: 'Can I scale my resources?',
            answer: 'Yes! Unlike traditional hosting providers that force you into rigid plans, our modular pricing allows you to pay only for the resources you need. Scale individual components like CPU, RAM, and storage independently to create your perfect configuration.'
        }
    ]

    const toggleFaq = useCallback((index: number) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index)
    }, [])

    return (
        <section className="w-full py-24 mt-24 px-4 relative overflow-hidden">
            
            <div className="absolute top-0 left-0 right-0 h-px ">
                <div
                    className="h-full w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                    }}
                />
            </div>

            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 dark:opacity-60">
                <svg width="2468" height="1218" viewBox="0 0 2468 1218" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_faq)">
                        <ellipse cx="1154" cy="438" rx="664" ry="288" fill="#10468C" fillOpacity="0.2"/>
                    </g>
                    <g filter="url(#filter1_f_faq)">
                        <ellipse cx="631" cy="870.5" rx="481" ry="197.5" fill="#10468C" fillOpacity="0.15"/>
                    </g>
                    <g filter="url(#filter2_f_faq)">
                        <ellipse cx="1837" cy="780.5" rx="481" ry="197.5" fill="#10468C" fillOpacity="0.25"/>
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
                    
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-muted text-base mb-8 leading-relaxed max-w-xl"
                        >
                            Hungry for more info? Our FAQ is here to fill the gaps with clear answers to the questions we get asked most.
                        </motion.p>
                        <motion.a
                            href="https://discord.expanse.host"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-block px-6 py-3 bg-button border border-blue-400/20 text-primary-foreground font-semibold rounded-lg hover:bg-blue-400/30 transition-colors shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.2)]"
                        >
                            Join the Discord
                        </motion.a>
                    </div>

                    
                    <div className="space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index
                            return (
                                <div
                                    key={index}
                                    className="relative"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full text-left px-6 py-4 bg-card hover:bg-card border border-muted rounded-lg transition-colors duration-200 group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-foreground group-hover:text-accent font-medium pr-4 transition-colors duration-200">
                                                {faq.question}
                                            </span>
                                            <div
                                                className="flex-shrink-0 transition-transform duration-300 ease-out"
                                                style={{
                                                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                                }}
                                            >
                                                <FaChevronRight className={`w-4 h-4 transition-colors duration-200 ${
                                                    isOpen ? 'text-accent' : 'text-muted'
                                                }`} />
                                            </div>
                                        </div>
                                    </button>

                                    <div
                                        className="overflow-hidden transition-all duration-300 ease-out"
                                        style={{
                                            maxHeight: isOpen ? '500px' : '0px',
                                            opacity: isOpen ? 1 : 0,
                                            transitionProperty: 'max-height, opacity',
                                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        <div className="px-6 py-4 text-muted text-base leading-relaxed bg-card border-x border-b border-muted rounded-b-lg">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqSection