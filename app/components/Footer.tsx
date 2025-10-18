'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa'

export const Footer = () => {
  const footerLinks = {
    products: [
      { label: 'Game Hosting', href: '#' },
      { label: 'VPS Hosting', href: '#' },
      { label: 'Dedicated Servers', href: '#' },
      { label: 'Domain Names', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
    support: [
      { label: 'Knowledge Base', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Server Status', href: '#' },
      { label: 'Contact Support', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: <FaDiscord className="w-5 h-5" />, href: '#', label: 'Discord' },
    { icon: <FaTwitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <FaGithub className="w-5 h-5" />, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="w-full  pt-32">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-blue-300 mb-4">Expanse</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Experience lightning-fast performance, rock-solid reliability, and unparalleled support for your web projects.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-10 h-10 bg-blue-400/40 text-white rounded-lg hover:bg-blue-400/30 transition-all"
                  style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.6)' }}
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
            <h4 className="text-lg font-bold text-white mb-4 tracking-wide">PRODUCTS</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-300 transition-colors"
                  >
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
            <h4 className="text-lg font-bold text-white mb-4 tracking-wide">COMPANY</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-300 transition-colors"
                  >
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
            <h4 className="text-lg font-bold text-white mb-4 tracking-wide">SUPPORT</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-blue-400/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Expanse Hosting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 text-sm hover:text-blue-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-blue-300 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-blue-300 transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
