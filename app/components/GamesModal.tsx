'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface GamesModalProps {
  isOpen: boolean
  onClose: () => void
}

const games = [
  {
    name: 'Minecraft',
    href: '/minecraft',
    image: '/games/minecraft.png',
    description: 'Java & Bedrock hosting',
    price: 'From $8/month'
  },
  {
    name: 'Hytale',
    href: '/hytale',
    image: '/games/hytale.png',
    description: 'Coming soon - Join waitlist',
    price: 'TBA'
  }
]

export default function GamesModal({ isOpen, onClose }: GamesModalProps) {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative bg-card border border-muted rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-muted">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Choose Your Game</h2>
              <p className="text-sm text-muted-foreground mt-1">Start a server in under a minute</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <Link
                key={game.name}
                href={game.href}
                onClick={onClose}
                className="group relative overflow-hidden rounded-xl border border-muted bg-card/50 hover:border-accent/50 transition-all duration-300"
              >
                <div className="aspect-video relative bg-muted/30">
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{game.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                  <p className="text-sm font-medium text-accent">{game.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
