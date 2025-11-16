"use client"

import React from 'react'
import Image from 'next/image'

const Advertisements = () => {
  const companies = [
    // { name: 'Hetzner', logo: '/advertisement/hetzner.png' },
    { name: 'Intel', logo: '/advertisement/intel.png' },
    { name: 'Pterodactyl', logo: '/advertisement/pterodactyl.png' },
    { name: 'G-Core', logo: '/advertisement/G-core.png' },
    { name: 'Samsung', logo: '/advertisement/samsung.png' },
    { name: 'AMD', logo: '/advertisement/amd.png' },
    { name: 'Gigabyte', logo: '/advertisement/gigabyte.png' },
    { name: 'SuperMicro', logo: '/advertisement/supermicro.png' },
    // { name: 'VirtFusion', logo: '/advertisement/virtfusion.png' },
  ]

  // Duplicate the array for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies]

  return (
    <section className="w-full pt-32 overflow-hidden">
      <div className="max-w-full mx-auto px-4">
        <div className="relative">
          {/* Gradient overlays for fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div 
            className="flex items-center gap-12 md:gap-16 lg:gap-20 group"
            style={{
              animation: 'scroll-advertisements 60s linear infinite',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running'
            }}
          >
            {duplicatedCompanies.map((company, index) => {
              return (
                <div
                  key={`${company.name}-${index}`}
                  className="relative h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Advertisements