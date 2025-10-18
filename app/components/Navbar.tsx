'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Image from "next/image"
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [showBanner, setShowBanner] = useState<boolean>(true)
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    const toggleDropdown = (menu: string) => {
        setActiveDropdown(activeDropdown === menu ? null : menu)
    }

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="sticky top-0 z-50">
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
                            <div className="flex items-center justify-center space-x-2 text-sm md:text-base">
                                <span className="font-semibold">Limited Time Offer: Save 10% on Game Servers</span>
                                <span className="bg-white/20 px-3 py-1 rounded-md text-xs font-bold">
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
                className={`container mx-auto px-4 lg:px-8 pt-4 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-black/20' : ''}`}
            >
                <div className="flex items-center justify-between h-20 relative">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                        <Image
                            width={48}
                            height={48}
                            alt="logo"
                            src="/logo.png" />
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-xl tracking-tight">EXPANSE</span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Navigation Menu */}
                    <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
                        {/* Game Servers */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('game')}
                                className="flex items-center space-x-1 px-4 py-2 text-white transition-colors"
                            >
                                <span className="font-medium">GAME SERVERS</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Other Servers */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('other')}
                                className="flex items-center space-x-1 px-4 py-2 text-white transition-colors"
                            >
                                <span className="font-medium">OTHER SERVERS</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Learn */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('learn')}
                                className="flex items-center space-x-1 px-4 py-2 text-white transition-colors"
                            >
                                <span className="font-medium">LEARN</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Support */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('support')}
                                className="flex items-center space-x-1 px-4 py-2 text-white  transition-colors"
                            >
                                <span className="font-medium">SUPPORT</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="border-2 backdrop-blur-xl rounded-xl border-blue-400/30 p-2 flex items-center ">
                        {/* Billing Button */}
                        <Link
                            href="/billing"
                            className="hidden lg:flex items-center space-x-2 px-5 py-3 text-white  transition-colors "
                        >
                            <svg className="w-6 h-6" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 32 32" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M 16 5 C 12.1 5 9 8.1 9 12 C 9 14.4375 10.209961 16.561523 12.070312 17.8125 C 8.5100119 19.34733 6 22.893578 6 27 L 8 27 C 8 22.6 11.6 19 16 19 C 19.9 19 23 15.9 23 12 C 23 8.1 19.9 5 16 5 z M 16 7 C 18.8 7 21 9.2 21 12 C 21 14.8 18.8 17 16 17 C 13.2 17 11 14.8 11 12 C 11 9.2 13.2 7 16 7 z M 24.099609 18 L 24.099609 20.099609 C 23.499609 20.199609 22.900391 20.500781 22.400391 20.800781 L 20.900391 19.300781 L 19.5 20.699219 L 21 22.199219 C 20.6 22.699219 20.400781 23.3 20.300781 24 L 18 24 L 18 26 L 20.099609 26 C 20.199609 26.6 20.500781 27.200781 20.800781 27.800781 L 19.300781 29.300781 L 20.699219 30.699219 L 22.199219 29.199219 C 22.699219 29.499219 23.300391 29.800391 23.900391 29.900391 L 23.900391 32 L 25.900391 32 L 25.900391 29.900391 C 26.500391 29.800391 27.099609 29.499219 27.599609 29.199219 L 29.099609 30.699219 L 30.5 29.300781 L 29 27.800781 C 29.4 27.300781 29.599219 26.7 29.699219 26 L 32 26 L 32 24 L 29.900391 24 C 29.800391 23.4 29.499219 22.799219 29.199219 22.199219 L 30.699219 20.699219 L 29.300781 19.300781 L 27.800781 20.800781 C 27.300781 20.500781 26.699609 20.199609 26.099609 20.099609 L 26.099609 18 L 24.099609 18 z M 25 22 C 26.7 22 28 23.3 28 25 C 28 26.7 26.7 28 25 28 C 23.3 28 22 26.7 22 25 C 22 23.3 23.3 22 25 22 z M 25 24 C 24.875 24 24.75 24.03125 24.632812 24.085938 C 24.515625 24.140625 24.40625 24.21875 24.3125 24.3125 C 24.21875 24.40625 24.140625 24.515625 24.085938 24.632812 C 24.03125 24.75 24 24.875 24 25 C 24 25.375 24.28125 25.75 24.632812 25.914062 C 24.75 25.96875 24.875 26 25 26 C 25.5 26 26 25.5 26 25 C 26 24.5 25.5 24 25 24 z"></path></svg>                            <span className="text-md font-medium">BILLING</span>
                        </Link>

                        {/* Panels Button */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleDropdown('panels')}
                                className="flex border border-blue-400/20 items-center px-3 py-3 bg-blue-400/40 text-white rounded-lg font-semibold hover:bg-blue-400/60 transition-colors shadow-inner"
                                style={{ boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.6)" }}
                            >
                                <svg className="h-6 mr-2 w-6" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H9.75a.75.75 0 0 1 0-1.5h10.5a.25.25 0 0 0 .25-.25V9h-17v3A.75.75 0 0 1 2 12ZM9 7.5h11.5V3.75a.25.25 0 0 0-.25-.25H9Zm-5.5 0h4v-4H3.75a.25.25 0 0 0-.25.25Z"></path><path d="m9.308 14.5-2.104-2.236a.75.75 0 1 1 1.092-1.028l3.294 3.5a.75.75 0 0 1 0 1.028l-3.294 3.5a.75.75 0 1 1-1.092-1.028L9.308 16H6.09a2.59 2.59 0 0 0-2.59 2.59v2.66a.75.75 0 0 1-1.5 0v-2.66a4.09 4.09 0 0 1 4.09-4.09h3.218Z"></path></svg>                                <span className="font-medium">PANELS</span>
                                <ChevronDown className="ml-2 w-4 h-4" />
                            </motion.button>

                            {/* Panels Dropdown */}
                            <AnimatePresence>
                                {activeDropdown === 'panels' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-6 w-72 bg-black/40 border-2 border-blue-400/30 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
                                    >
                                        <div className='p-2 space-y-2'>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <Link
                                                    href="/panel/starbase"
                                                    className="flex items-center justify-between p-4 bg-[#171a3a]/50 border-1 border-[#474778]/40  rounded-xl hover:bg-[#171a3a]/70 transition-colors group"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 mr-2  rounded-lg flex items-center text-gray-300 justify-center">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><rect width="7" height="18" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect></svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-sm font-semibold  transition-colors">GAME PANEL</div>
                                                            <div className="text-gray-400 text-xs">Manage your game server</div>
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
                                                    className="flex items-center justify-between p-4 bg-[#171a3a]/50 border-1 border-[#474778]/40  rounded-xl hover:bg-[#171a3a]/70 transition-colors group"
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 mr-2 rounded-lg flex items-center text-gray-300 justify-center">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"></path><path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"></path><path d="M6 6h.01"></path><path d="M6 18h.01"></path><path d="m15.7 13.4-.9-.3"></path><path d="m9.2 10.9-.9-.3"></path><path d="m10.6 15.7.3-.9"></path><path d="m13.6 15.7-.4-1"></path><path d="m10.8 9.3-.4-1"></path><path d="m8.3 13.6 1-.4"></path><path d="m14.7 10.8 1-.4"></path><path d="m13.4 8.3-.3.9"></path></svg>                                            </div>
                                                        <div>
                                                            <div className="text-white text-sm font-semibold  transition-colors">VPS PANEL</div>
                                                            <div className="text-gray-400 text-xs">Manage your VPS server</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden text-white p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>
        </nav>
    )
}

export default Navbar