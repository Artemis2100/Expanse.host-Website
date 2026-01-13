"use client"

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function HytaleWaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/hytale-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden bg-white dark:bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/wallpapers/hytale.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Overlay Gradient - Lighter for better background visibility */}
      <div
        className="absolute inset-0 z-0 dark:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.4)_0%,_rgba(0,0,0,0.6)_50%,_rgba(0,0,0,0.75)_100%)] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.5)_50%,_rgba(255,255,255,0.7)_100%)]"
      />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-card/80 backdrop-blur-md border border-border rounded-xl mx-auto block text-center"
        >
          <span className="text-sm md:text-base text-foreground font-medium">
            Coming Soon
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-foreground"
        >
          Hytale Hosting
          <br />
          <span className="text-accent">
            Coming Soon
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-center text-muted mb-12 max-w-2xl mx-auto"
        >
          Be among the first to experience enterprise-grade Hytale server hosting. 
          Join our waitlist to get notified when we launch.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="relative flex flex-col sm:flex-row gap-3 p-1 bg-card/80 backdrop-blur-md border border-border rounded-xl shadow-lg">
                <div className="flex-1 relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success' || !email}
                  whileHover={{ scale: status !== 'loading' && status !== 'success' ? 1.02 : 1 }}
                  whileTap={{ scale: status !== 'loading' && status !== 'success' ? 0.98 : 1 }}
                  className="px-8 py-4 bg-button hover:bg-blue-500/40 text-primary-foreground font-semibold rounded-lg shadow-inner disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 min-w-[140px] border border-blue-400/30"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Joining...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      <span>Joined!</span>
                    </>
                  ) : (
                    <span>Join Waitlist</span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Error Message */}
            {status === 'error' && errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
              >
                <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{errorMessage}</span>
              </motion.div>
            )}

            {/* Success Message */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400"
              >
                <FiCheck className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Successfully joined the waitlist! We'll notify you when Hytale hosting launches.</span>
              </motion.div>
            )}
          </form>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            We respect your privacy. Your email will only be used to notify you about Hytale hosting availability.
          </motion.p>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: '⚡', title: 'High Performance', desc: 'Ryzen 9 processors with NVMe storage' },
            { icon: '🛡️', title: 'DDoS Protection', desc: 'Enterprise-grade security included' },
            { icon: '🎮', title: 'Easy Setup', desc: 'One-click server deployment' },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-card/80 backdrop-blur-md border border-border rounded-xl text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

