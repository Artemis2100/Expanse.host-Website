'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from "next/image"
import { motion, AnimatePresence } from 'framer-motion'

/**
 * NAVIGATION CONFIGURATION
 *
 * Easy to manage navigation links and dropdowns!
 *
 * HOW TO ADD A DROPDOWN MENU:
 * {
 *   label: 'MENU NAME',
 *   items: [
 *     { label: 'Submenu Item', href: '/path', description: 'Optional description' },
 *     { label: 'Another Item', href: '/path2' }
 *   ]
 * }
 *
 * HOW TO ADD A SIMPLE LINK:
 * {
 *   label: 'LINK NAME',
 *   href: '/path'
 * }
 *
 * To remove a link/dropdown: Simply delete its entry from the array below
 */

type NavLink = {
    label: string
    href?: string
    items?: { label: string; href: string; description?: string }[]
}

const navigationConfig: NavLink[] = [
    {
        label: 'GAME SERVERS',
        items: [
            { label: 'Minecraft', href: '/minecraft', description: 'Java & Bedrock hosting' },
        ]
    },
    {
        label: 'OTHER SERVERS',
        items: [
            { label: 'VPS', href: '/vps', description: 'Virtual private servers' },
            { label: 'Dedicated', href: '/dedicated', description: 'Bare metal servers' },
        ]
    },
    {
        label: 'INFRASTRUCTURE',
        href: '/infrastructure'
    },
    {
        label: 'SUPPORT',
        items: [
            { label: 'Contact Us', href: '/contact', description: 'Get in touch' },
            { label: 'Discord', href: 'https://discord.gg/example', description: 'Join our community' },
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
        // Check for saved theme preference or default to dark
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

    // Prevent horizontal scroll at all times
    React.useEffect(() => {
        document.documentElement.style.overflowX = 'hidden'
        document.body.style.overflowX = 'hidden'
    }, [])

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl ' : 'bg-transparent'}`}>
            {/* Promotional Banner */}
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
                    {/* Logo */}
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

                    {/* Desktop Navigation Menu */}
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

                                        {/* Dropdown Content */}
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
                                    // Simple link
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
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="hidden sm:flex items-center justify-center p-2 sm:p-3 text-foreground hover:bg-muted rounded-lg transition-colors"
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
                                        className="absolute right-0 mt-3 sm:mt-6 w-64 sm:w-72 bg-black/40 border-2 border-blue-400/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-[150]"
                                    >
                                        <div className='p-2 space-y-2'>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <Link
                                                    href="/panel/starbase"
                                                    className="flex items-center justify-between p-3 sm:p-4 bg-[#171a3a]/50 border-1 border-[#474778]/40 rounded-xl hover:bg-[#171a3a]/70 transition-colors group"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-7 h-7 sm:w-8 sm:h-8 mr-2 rounded-lg flex items-center text-gray-300 justify-center">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg"><rect width="7" height="18" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect></svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-xs sm:text-sm font-semibold transition-colors">GAME PANEL</div>
                                                            <div className="text-gray-400 text-[10px] sm:text-xs">Manage your game server</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                <Link
                                                    href="/panel/vps"
                                                    className="flex items-center justify-between p-3 sm:p-4 bg-[#171a3a]/50 border-1 border-[#474778]/40 rounded-xl hover:bg-[#171a3a]/70 transition-colors group"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-7 h-7 sm:w-8 sm:h-8 mr-2 rounded-lg flex items-center text-gray-300 justify-center">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"></path><path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"></path><path d="M6 6h.01"></path><path d="M6 18h.01"></path><path d="m15.7 13.4-.9-.3"></path><path d="m9.2 10.9-.9-.3"></path><path d="m10.6 15.7.3-.9"></path><path d="m13.6 15.7-.4-1"></path><path d="m10.8 9.3-.4-1"></path><path d="m8.3 13.6 1-.4"></path><path d="m14.7 10.8 1-.4"></path><path d="m13.4 8.3-.3.9"></path></svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-xs sm:text-sm font-semibold transition-colors">VPS PANEL</div>
                                                            <div className="text-gray-400 text-[10px] sm:text-xs">Manage your VPS server</div>
                                                        </div>
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

                                {/* Navigation Links */}
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

                                <div className=" ">
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
                                    <div className="space-y-3">
                                        <Link
                                            href="/panel/starbase"
                                            onClick={closeMobileMenu}
                                            className="flex items-center p-3 bg-accent/10 border border-accent rounded-xl hover:bg-accent/20 transition-colors"
                                        >
                                            <div className="w-8 h-8 mr-3 flex items-center text-accent justify-center">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="7" height="18" x="3" y="3" rx="1"></rect>
                                                    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                                                    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-foreground text-sm font-semibold">GAME PANEL</div>
                                                <div className="text-muted text-xs">Manage your game server</div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="/panel/vps"
                                            onClick={closeMobileMenu}
                                            className="flex items-center p-3 bg-accent/10 border border-accent rounded-xl hover:bg-accent/20 transition-colors"
                                        >
                                            <div className="w-8 h-8 mr-3 flex items-center text-accent justify-center">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"></path>
                                                    <path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"></path>
                                                    <path d="M6 6h.01"></path>
                                                    <path d="M6 18h.01"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-foreground text-sm font-semibold">VPS PANEL</div>
                                                <div className="text-muted text-xs">Manage your VPS server</div>
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