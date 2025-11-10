'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from "next/image"
import { motion, AnimatePresence } from 'motion/react'
import CurrencySelector from './CurrencySelector'

type NavLink = {
    label: string
    href?: string
    items?: { label: string; href: string; description?: string }[]
}

const navigationConfig: NavLink[] = [
    {
        label: 'GAMES',
        items: [
            { label: 'Minecraft', href: '/minecraft', description: 'Java & Bedrock hosting' },
        ]
    },
    {
        label: 'CLOUD',
        items: [
            { label: 'VPS Hosting', href: '/vps', description: 'Virtual private servers' },
            { label: 'Web Hosting', href: '/webhosting', description: 'Shared & WordPress hosting' },
            { label: 'Domains', href: '/domains', description: 'Domain registration' },
        ]
    },
    {
        label: 'SERVERS',
        items: [
            { label: 'Bare Metals', href: '/dedicated', description: 'Dedicated servers' },
            { label: 'Colocation', href: '/colocation', description: 'Enterprise colocation services' },
        ]
    },
    {
        label: 'INFRASTRUCTURE',
        items: [
            { label: 'Hardware Information', href: '/infrastructure#hardware', description: 'Server specifications' },
            { label: 'Data Centers', href: '/infrastructure#data-centers', description: 'Global locations' },
            { label: 'DDOS Protection', href: '/infrastructure#ddos-protection', description: 'Security features' },
            { label: 'Network', href: '/infrastructure#network', description: 'Network infrastructure' },
            { label: 'Status Page', href: 'https://status.expanse.host', description: 'System status' },
        ]
    },
    {
        label: 'MORE',
        items: [
            { label: 'About Us', href: '/about', description: 'Learn about Expanse' },
            { label: 'Careers', href: '/careers', description: 'Join our team' },
            { label: 'Affiliate Program', href: '/affiliate', description: 'Earn with us' },
            { label: 'Contact Us', href: '/contact', description: 'Get in touch' },
        ]
    },
]

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [showBanner, setShowBanner] = useState<boolean>(true)
    const [isScrolled, setIsScrolled] = useState<boolean>(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

    const toggleDropdown = (menu: string) => {
        setActiveDropdown(activeDropdown === menu ? null : menu)
    }

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        localStorage.setItem('theme', newTheme)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
    }

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    React.useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

        setTheme(initialTheme)
        document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    }, [])

    // Close mobile menu on escape key and prevent scroll
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeMobileMenu()
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflowX = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    React.useEffect(() => {
        document.documentElement.style.overflowX = 'hidden'
        document.body.style.overflowX = 'hidden'
    }, [])

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl ' : 'bg-transparent'}`}>
            
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`bg-gradient-to-r from-blue-400/50 to-blue-400/40 text-white py-2.5 px-4 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}
                    >
                        <div className="container mx-auto flex items-center justify-center relative">
                            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm md:text-base">
                                <span className="font-semibold">
                                    <span className="hidden sm:inline">Limited Time Offer: </span>Save 10% on Game Servers
                                </span>
                                <span className="bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold">
                                    WELCOME
                                </span>
                            </div>
                            <button
                                onClick={() => setShowBanner(false)}
                                className="absolute right-0 text-white hover:text-gray-200 transition-colors"
                                aria-label="Close banner"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-3 sm:pb-4 overflow-visible"
            >
                <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20 w-full max-w-[1400px] mx-auto relative">
                    
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 z-10"
                    >
                        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
                        <Image
                            width={48}
                            height={48}
                            alt="logo"
                            src="/logo.png"
                            className="w-10 h-10 sm:w-12 sm:h-12" />
                            <div className="flex flex-col">
                                <span className="text-foreground font-bold text-base sm:text-lg lg:text-xl tracking-tight whitespace-nowrap">EXPANSE</span>
                            </div>
                        </Link>
                    </motion.div>

                    
                    <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
                        {navigationConfig.map((navItem, index) => (
                            <div key={index} className="relative">
                                {navItem.items ? (
                                    // Dropdown menu
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(navItem.label)}
                                            className="flex items-center space-x-1 px-4 py-2 text-foreground hover:text-accent transition-colors"
                                        >
                                            <span className="font-medium">{navItem.label}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === navItem.label ? 'rotate-180' : ''}`} />
                                        </button>

                                        
                                        <AnimatePresence>
                                            {activeDropdown === navItem.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-0 mt-2 w-64 backdrop-blur-3xl border border-muted backdrop-blur-xl rounded-md shadow-2xl overflow-hidden z-[150]"
                                                    onMouseLeave={() => setActiveDropdown(null)}
                                                >
                                                    <div className="p-2">
                                                        {navItem.items.map((item, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                            >
                                                                <Link
                                                                    href={item.href}
                                                                    onClick={() => setActiveDropdown(null)}
                                                                    className="block p-3 rounded-lg hover:bg-accent/10 transition-colors group"
                                                                >
                                                                    <div className="text-foreground text-sm font-semibold group-hover:text-accent transition-colors">
                                                                        {item.label}
                                                                    </div>
                                                                    {item.description && (
                                                                        <div className="text-muted text-xs mt-1">
                                                                            {item.description}
                                                                        </div>
                                                                    )}
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={navItem.href || '#'}
                                        className="flex items-center space-x-1 px-4 py-2 text-foreground hover:text-accent transition-colors"
                                    >
                                        <span className="font-medium">{navItem.label}</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="border-2 backdrop-blur-xl rounded-xl border-blue-400/30 p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 flex-shrink-0 z-10">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                        <div className="hidden sm:flex items-center gap-2">
                            <CurrencySelector />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="flex items-center justify-center p-2 sm:p-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </motion.button>
                        </div>



                        <div className="relative hidden sm:block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleDropdown('panels')}
                                className="flex border border-blue-400/20 items-center px-2 sm:px-3 py-2 sm:py-3 bg-button text-primary-foreground rounded-lg font-semibold hover:bg-blue-400/60 transition-colors shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6)] text-sm sm:text-base"
                            >
                                <svg className="h-5 w-5 sm:h-6 sm:w-6 sm:mr-2" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H9.75a.75.75 0 0 1 0-1.5h10.5a.25.25 0 0 0 .25-.25V9h-17v3A.75.75 0 0 1 2 12ZM9 7.5h11.5V3.75a.25.25 0 0 0-.25-.25H9Zm-5.5 0h4v-4H3.75a.25.25 0 0 0-.25.25Z"></path><path d="m9.308 14.5-2.104-2.236a.75.75 0 1 1 1.092-1.028l3.294 3.5a.75.75 0 0 1 0 1.028l-3.294 3.5a.75.75 0 1 1-1.092-1.028L9.308 16H6.09a2.59 2.59 0 0 0-2.59 2.59v2.66a.75.75 0 0 1-1.5 0v-2.66a4.09 4.09 0 0 1 4.09-4.09h3.218Z"></path></svg>
                                <span className="font-medium hidden sm:inline">PANELS</span>
                                <ChevronDown className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                            </motion.button>

                            <AnimatePresence>
                                {activeDropdown === 'panels' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 sm:mt-6 w-72 sm:w-80 bg-gradient-to-br from-card/95 to-card/90 border border-accent/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-[150]"
                                    >
                                        {/* Header */}
                                        <div className="px-4 py-3 border-b border-muted/30 bg-gradient-to-r from-accent/10 to-transparent">
                                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Control Panels</h3>
                                            <p className="text-xs text-muted mt-0.5">Access your services</p>
                                        </div>
                                        
                                        <div className='p-3 space-y-2'>
                                            {/* Billing Area */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 }}
                                            >
                                                <Link
                                                    href="https://my.expanse.host"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="relative z-10 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                        </svg>
                                                    </div>
                                                    <div className="relative z-10 flex-1 min-w-0">
                                                        <div className="text-sm font-bold text-foreground group-hover:text-blue-400 transition-colors">Billing Area</div>
                                                        <div className="text-xs text-muted mt-0.5">Manage invoices & payments</div>
                                                    </div>
                                                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </motion.div>

                                            {/* VPS Panel */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <Link
                                                    href="/panel/vps"
                                                    className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/40 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="relative z-10 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                                        </svg>
                                                    </div>
                                                    <div className="relative z-10 flex-1 min-w-0">
                                                        <div className="text-sm font-bold text-foreground group-hover:text-cyan-400 transition-colors">VPS Panel</div>
                                                        <div className="text-xs text-muted mt-0.5">Manage your VPS server</div>
                                                    </div>
                                                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </motion.div>

                                            {/* Game Panel */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                <Link
                                                    href="/panel/starbase"
                                                    className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="relative z-10 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div className="relative z-10 flex-1 min-w-0">
                                                        <div className="text-sm font-bold text-foreground group-hover:text-green-400 transition-colors">Game Panel</div>
                                                        <div className="text-xs text-muted mt-0.5">Manage your game server</div>
                                                    </div>
                                                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </motion.div>

                                            {/* Bare Metal Control */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <Link
                                                    href="/panel/baremetal"
                                                    className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="relative z-10 w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                        </svg>
                                                    </div>
                                                    <div className="relative z-10 flex-1 min-w-0">
                                                        <div className="text-sm font-bold text-foreground group-hover:text-orange-400 transition-colors">Bare Metal Control</div>
                                                        <div className="text-xs text-muted mt-0.5">Manage dedicated servers</div>
                                                    </div>
                                                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={closeMobileMenu}
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-[320px] bg-background border-l-2 border-blue-400/30 shadow-2xl z-50 overflow-y-auto lg:hidden"
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center space-x-2">
                                        <Image
                                            width={40}
                                            height={40}
                                            alt="logo"
                                            src="/logo.png"
                                            className="w-10 h-10"
                                        />
                                        <span className="text-foreground font-bold text-xl">EXPANSE</span>
                                    </div>
                                    <button
                                        onClick={closeMobileMenu}
                                        className="p-2 text-foreground hover:text-accent transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                
                                <nav className="space-y-2">
                                    {navigationConfig.map((navItem, index) => (
                                        <div key={index}>
                                            {navItem.items ? (
                                                <div className="border-b border-muted pb-2 mb-2">
                                                    <button
                                                        onClick={() => toggleDropdown(navItem.label)}
                                                        className="w-full flex items-center justify-between p-3 text-foreground hover:text-accent transition-colors"
                                                    >
                                                        <span className="font-semibold">{navItem.label}</span>
                                                        <ChevronDown
                                                            className={`w-5 h-5 transition-transform ${
                                                                activeDropdown === navItem.label ? 'rotate-180' : ''
                                                            }`}
                                                        />
                                                    </button>

                                                    <AnimatePresence>
                                                        {activeDropdown === navItem.label && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="pl-4 space-y-1 mt-2">
                                                                    {navItem.items.map((item, idx) => (
                                                                        <Link
                                                                            key={idx}
                                                                            href={item.href}
                                                                            onClick={closeMobileMenu}
                                                                            className="block p-3 rounded-lg hover:bg-accent/10 transition-colors group"
                                                                        >
                                                                            <div className="text-foreground text-sm font-medium group-hover:text-accent transition-colors">
                                                                                {item.label}
                                                                            </div>
                                                                            {item.description && (
                                                                                <div className="text-muted text-xs mt-1">
                                                                                    {item.description}
                                                                                </div>
                                                                            )}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={navItem.href || '#'}
                                                    onClick={closeMobileMenu}
                                                    className="block p-3 text-foreground hover:text-accent transition-colors font-semibold border-b border-muted"
                                                >
                                                    {navItem.label}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </nav>

                                <div className="space-y-2 mt-4">
                                    <div className="p-3">
                                        <CurrencySelector />
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/10 transition-colors"
                                    >
                                        <span className="text-foreground font-semibold">Theme</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted text-sm">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                                            {theme === 'dark' ? (
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-4 pt-4 border-t border-muted">
                                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wide mb-3 px-3">Control Panels</h3>
                                    <div className="space-y-2">
                                        <Link
                                            href="https://my.expanse.host"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-foreground">Billing Area</div>
                                                <div className="text-xs text-muted mt-0.5">Manage invoices & payments</div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="/panel/vps"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-foreground">VPS Panel</div>
                                                <div className="text-xs text-muted mt-0.5">Manage your VPS server</div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="/panel/starbase"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-foreground">Game Panel</div>
                                                <div className="text-xs text-muted mt-0.5">Manage your game server</div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="/panel/baremetal"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-foreground">Bare Metal Control</div>
                                                <div className="text-xs text-muted mt-0.5">Manage dedicated servers</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar