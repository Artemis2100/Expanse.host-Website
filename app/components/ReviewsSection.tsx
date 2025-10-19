'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'
import { FaStar } from 'react-icons/fa'

const reviews = [
  {
    name: "Alex Johnson",
    username: "@alexj",
    body: "Best hosting provider I've ever used. Lightning-fast servers and excellent support team. Highly recommend!",
    img: "https://avatar.vercel.sh/alex",
    rating: 5,
  },
  {
    name: "Sarah Miller",
    username: "@sarahm",
    body: "Switched from another host and couldn't be happier. The control panel is intuitive and performance is outstanding.",
    img: "https://avatar.vercel.sh/sarah",
    rating: 5,
  },
  {
    name: "Mike Chen",
    username: "@mikec",
    body: "Running my Minecraft server here for 6 months. Zero downtime, amazing performance. Worth every penny!",
    img: "https://avatar.vercel.sh/mike",
    rating: 5,
  },
  {
    name: "Emma Davis",
    username: "@emmad",
    body: "The DDoS protection actually works! My server stayed online during a massive attack. Impressive infrastructure.",
    img: "https://avatar.vercel.sh/emma",
    rating: 5,
  },
  {
    name: "James Wilson",
    username: "@jamesw",
    body: "Great value for money. The hardware specs are incredible and support responds within minutes. A+",
    img: "https://avatar.vercel.sh/james",
    rating: 5,
  },
  {
    name: "Olivia Brown",
    username: "@oliviab",
    body: "Been hosting multiple game servers here. The mod support and one-click installers make everything so easy!",
    img: "https://avatar.vercel.sh/olivia",
    rating: 5,
  },
  {
    name: "Ryan Martinez",
    username: "@ryanm",
    body: "Migrated from a VPS to bare metal here. The performance difference is night and day. Absolutely love it!",
    img: "https://avatar.vercel.sh/ryan",
    rating: 5,
  },
  {
    name: "Sophia Lee",
    username: "@sophial",
    body: "Customer support is phenomenal. They helped me optimize my server configuration and it runs perfectly now.",
    img: "https://avatar.vercel.sh/sophia",
    rating: 5,
  },
  {
    name: "Daniel Kim",
    username: "@danielk",
    body: "The backup system saved me when I accidentally deleted files. Instant restore, no hassle. These guys know what they're doing.",
    img: "https://avatar.vercel.sh/daniel",
    rating: 5,
  },
  {
    name: "Ava Garcia",
    username: "@avag",
    body: "Uptime has been perfect. My community loves the server performance. Best decision I made for my gaming community!",
    img: "https://avatar.vercel.sh/ava",
    rating: 5,
  },
  {
    name: "Lucas Taylor",
    username: "@lucast",
    body: "The dedicated IP and custom ports feature is exactly what I needed. Setup was incredibly straightforward.",
    img: "https://avatar.vercel.sh/lucas",
    rating: 5,
  },
  {
    name: "Mia Anderson",
    username: "@miaa",
    body: "Amazing performance for the price. My server handles 100+ players without any lag. Impressive hardware!",
    img: "https://avatar.vercel.sh/mia",
    rating: 5,
  },
]

const firstRow = reviews.slice(0, 3)
const secondRow = reviews.slice(3, 6)
const thirdRow = reviews.slice(6, 9)
const fourthRow = reviews.slice(9, 12)

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
}: {
  img: string
  name: string
  username: string
  body: string
  rating: number
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-blue-400/20 bg-black/20 hover:bg-black/30 transition-colors backdrop-blur-sm"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <img className="rounded-full" width="40" height="40" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-gray-200">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500">{username}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <FaStar key={i} className="w-3 h-3 text-blue-400" />
        ))}
      </div>
      <blockquote className="text-sm text-gray-400 leading-relaxed">{body}</blockquote>
    </figure>
  )
}

const ReviewsSection = () => {
  return (
    <section className="relative w-full py-24 px-4 overflow-hidden">
     

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* 3D Marquee Reviews - Left Side */}
          <div className="relative flex h-[500px] flex-1 flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
            <div
              className="flex flex-row items-center gap-4"
              style={{
                transform:
                  "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
              }}
            >
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="[--duration:20s]" vertical>
              {thirdRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
              {fourthRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>

            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#0a0a0a]"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a]"></div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0a0a0a]"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0a0a0a]"></div>
          </div>

          {/* Header - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3 flex-shrink-0"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4 leading-tight">
              What Our <span className="text-blue-300">Customers</span> Say
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              Join thousands of satisfied customers who trust us with their hosting needs
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-400/40 border border-blue-400/20 text-white font-semibold rounded-lg hover:bg-blue-400/30 transition-colors shadow-inner flex items-center gap-2"
              style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.2)" }}
            >
              <FaStar className="w-4 h-4" />
              Check our Trustpilot
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection