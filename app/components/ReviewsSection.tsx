'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { FaStar } from 'react-icons/fa'

const ReviewsSection = () => {
  const reviews = [
    {
      quote: "Expanse has been a game-changer for our Minecraft server. The performance is incredible and their support team responds within minutes. We've tried 5+ hosting providers and this is by far the best.",
      name: "Alex Thompson",
      title: "Server Owner - PixelCraft Network"
    },
    {
      quote: "I was skeptical about switching providers, but the migration was seamless. Zero downtime, double the performance, and half the price. The DDoS protection alone is worth every penny.",
      name: "Sarah Mitchell",
      title: "Community Manager - Velocity Gaming"
    },
    {
      quote: "The control panel is intuitive and powerful. I can manage everything from mod installations to backups with just a few clicks. It's clear they actually understand what server admins need.",
      name: "Marcus Chen",
      title: "Developer - TechCraft Studios"
    },
    {
      quote: "99.99% uptime isn't just a promise - it's reality. Our community has grown 300% since switching to Expanse because players know the server will always be online when they want to play.",
      name: "Emily Rodriguez",
      title: "Owner - Adventure Realms"
    },
    {
      quote: "The instant setup saved us hours of configuration. We went from signup to a fully operational server in under 5 minutes. The one-click mod installer is absolutely brilliant.",
      name: "David Park",
      title: "Admin - Skyblock Legends"
    },
    {
      quote: "I've been hosting with Expanse for 2 years and haven't had a single major issue. The automated backups saved us once when a plugin corrupted our world. Customer support is genuinely exceptional.",
      name: "Jessica Williams",
      title: "Founder - Creative Build Hub"
    },
    {
      quote: "The server hardware is top-tier. We're running 200+ players simultaneously with complex mods and the TPS never drops below 19.5. Absolutely phenomenal performance.",
      name: "Ryan Foster",
      title: "Technical Lead - Faction Warfare"
    },
    {
      quote: "Best value for money in the industry. We compared 10+ providers and Expanse offered the best specs at the most competitive price. The free DDoS protection sealed the deal.",
      name: "Olivia Martinez",
      title: "Owner - Survival Kingdom"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="relative w-full px-4 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <InfiniteMovingCards
            items={reviews}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="py-8"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ReviewsSection