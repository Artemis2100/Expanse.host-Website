'use client'

import React from 'react'
import { motion } from 'motion/react'
import { FaDiscord, FaTwitter, FaGithub, FaGamepad, FaServer, FaDatabase, FaGlobe, FaInfoCircle, FaEnvelope, FaFileContract, FaShieldAlt, FaBook, FaQuestionCircle, FaChartLine, FaHeadset, FaTag, FaGavel, FaFileAlt, FaCreditCard, FaBriefcase, FaHandshake } from 'react-icons/fa'
import Image from 'next/image'

export const Footer = () => {
  const footerLinks = {
    products: [
      { label: 'Minecraft Hosting', href: '/minecraft', icon: <FaGamepad className="w-4 h-4" /> },
      { label: 'VPS Hosting', href: '/vps', icon: <FaServer className="w-4 h-4" /> },
      { label: 'Dedicated Servers', href: '/dedicated', icon: <FaDatabase className="w-4 h-4" /> },
      { label: 'Web Hosting', href: '/webhosting', icon: <FaGlobe className="w-4 h-4" /> },
      { label: 'Domain Registration', href: '/domains', icon: <FaTag className="w-4 h-4" /> },
      { label: 'Colocation', href: '/colocation', icon: <FaServer className="w-4 h-4" /> },
    ],
    company: [
      { label: 'About Us', href: '/about', icon: <FaInfoCircle className="w-4 h-4" /> },
      { label: 'Contact', href: '/contact', icon: <FaEnvelope className="w-4 h-4" /> },
      { label: 'Careers', href: '/careers', icon: <FaBriefcase className="w-4 h-4" /> },
      { label: 'Affiliate Program', href: '/affiliate', icon: <FaHandshake className="w-4 h-4" /> },
    ],
    support: [
      { label: 'Knowledge Base', href: 'https://kb.expanse.host', icon: <FaBook className="w-4 h-4" /> },
      { label: 'Server Status', href: 'https://status.expanse.host', icon: <FaChartLine className="w-4 h-4" /> },
      { label: 'Contact Support', href: '/contact', icon: <FaHeadset className="w-4 h-4" /> },
      { label: 'Infrastructure', href: '/infrastructure', icon: <FaServer className="w-4 h-4" /> },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms-of-services', icon: <FaFileContract className="w-4 h-4" /> },
      { label: 'Privacy Policy', href: '/privacy-policy', icon: <FaShieldAlt className="w-4 h-4" /> },
      { label: 'SLA', href: '/sla', icon: <FaFileAlt className="w-4 h-4" /> },
      { label: 'Acceptable Use', href: '/acceptable-use-policy', icon: <FaGavel className="w-4 h-4" /> },
      { label: 'Payment Methods', href: '/payment-methods', icon: <FaCreditCard className="w-4 h-4" /> },
    ],
  }

  const socialLinks = [
    { icon: <FaDiscord className="w-5 h-5" />, href: 'https://discord.expanse.host', label: 'Discord' },
    { icon: <FaTwitter className="w-5 h-5" />, href: 'https://x.com/expanse_host', label: 'Twitter' },
  ]

  return (
    <footer className="w-full border-t rounded-t-3xl border-blue-400/20 relative overflow-hidden">
      
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

      <div className="max-w-7xl mx-auto px-4 py-16 relative ">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden  p-1.5">
                <Image
                  src="/logo.png"
                  alt="Expanse Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold">Expanse</h3>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Expanse fuels the leaders — and you&apos;re next. Our platform delivers unmatched features and performance you simply won&apos;t find anywhere else.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-10 h-10 bg-button text-white rounded-lg hover:bg-blue-400/30 hover:border-blue-400/30 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-bold text-accent mb-6 tracking-wider uppercase">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-primary/40 group-hover:text-accent transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-bold text-accent mb-6 tracking-wider uppercase">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-primary/40 group-hover:text-accent transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h4 className="text-sm font-bold text-accent mb-6 tracking-wider uppercase">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-muted text-sm hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-primary/40 group-hover:text-accent transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h4 className="text-sm font-bold text-accent mb-6 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-primary/40 group-hover:text-accent transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 mb-8 p-6 md:p-12 rounded-2xl bg-card  border border-muted relative overflow-hidden"
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Switch to Expanse today
              </h3>
              <p className="text-muted text-base md:text-lg">
                We are on a mission to provide affordable server hosting to everyone
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-button text-primary-foreground font-semibold rounded-lg transition-colors whitespace-nowrap"
              onClick={() => { window.location.href = '/vps' }}
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
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-muted text-sm">
              Copyright © 2025, Expanse Hosting
            </p>
            <p className="text-muted text-xs">
              COSMORACK LTD | Company number: 15759478
            </p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="/privacy-policy" className="text-muted text-sm hover:text-accent transition-colors relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
            <a href="/terms-of-services" className="text-muted text-sm hover:text-accent transition-colors relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
