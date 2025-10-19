'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaDiscord, FaTwitter, FaGithub, FaGamepad, FaServer, FaDatabase, FaGlobe, FaInfoCircle, FaEnvelope, FaFileContract, FaShieldAlt, FaBook, FaQuestionCircle, FaChartLine, FaHeadset } from 'react-icons/fa'
import Image from 'next/image'

export const Footer = () => {
  const footerLinks = {
    products: [
      { label: 'Game Hosting', href: '#', icon: <FaGamepad className="w-4 h-4" /> },
      { label: 'VPS Hosting', href: '#', icon: <FaServer className="w-4 h-4" /> },
      { label: 'Dedicated Servers', href: '#', icon: <FaDatabase className="w-4 h-4" /> },
      { label: 'Domain Names', href: '#', icon: <FaGlobe className="w-4 h-4" /> },
    ],
    company: [
      { label: 'About Us', href: '#', icon: <FaInfoCircle className="w-4 h-4" /> },
      { label: 'Contact', href: '#', icon: <FaEnvelope className="w-4 h-4" /> },
      { label: 'Terms of Service', href: '#', icon: <FaFileContract className="w-4 h-4" /> },
      { label: 'Privacy Policy', href: '#', icon: <FaShieldAlt className="w-4 h-4" /> },
    ],
    support: [
      { label: 'Knowledge Base', href: '#', icon: <FaBook className="w-4 h-4" /> },
      { label: 'FAQ', href: '#', icon: <FaQuestionCircle className="w-4 h-4" /> },
      { label: 'Server Status', href: '#', icon: <FaChartLine className="w-4 h-4" /> },
      { label: 'Contact Support', href: '#', icon: <FaHeadset className="w-4 h-4" /> },
    ],
  }

  const socialLinks = [
    { icon: <FaDiscord className="w-5 h-5" />, href: '#', label: 'Discord' },
    { icon: <FaTwitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <FaGithub className="w-5 h-5" />, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="w-full border-t rounded-t-3xl border-blue-400/20 relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-30">
        <svg width="2468" height="800" viewBox="0 0 2468 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_footer)">
            <ellipse cx="1234" cy="400" rx="600" ry="250" fill="#10468C" fillOpacity="0.1"/>
          </g>
          <defs>
            <filter id="filter0_f_footer" x="0" y="0" width="2468" height="800" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_footer"/>
            </filter>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-blue-400/10 p-1.5">
                <Image
                  src="/logo.png"
                  alt="Expanse Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-300">Expanse</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience lightning-fast performance, rock-solid reliability, and unparalleled support for your web projects.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-10 h-10 bg-blue-400/20 border border-blue-400/20 text-blue-300 rounded-lg hover:bg-blue-400/30 hover:border-blue-400/30 transition-all"
                  style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.2)' }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold text-blue-300 mb-6 tracking-wider uppercase">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-blue-400/40 group-hover:text-blue-300 transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-blue-300 mb-6 tracking-wider uppercase">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-blue-400/40 group-hover:text-blue-300 transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-bold text-blue-300 mb-6 tracking-wider uppercase">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-blue-400/40 group-hover:text-blue-300 transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 mb-8 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-blue-400/20 border border-blue-400/20 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Switch to Expanse today
              </h3>
              <p className="text-gray-300 text-base md:text-lg">
                We are on a mission to provide affordable server hosting to everyone
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              TAKE ME THERE
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-blue-400/10 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-blue-400">Expanse Hosting</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="text-gray-500 text-sm hover:text-blue-300 transition-colors relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-300 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-blue-300 transition-colors relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-300 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-blue-300 transition-colors relative group">
              Cookie Policy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-300 group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
