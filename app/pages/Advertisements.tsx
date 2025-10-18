import React from 'react'
import Image from 'next/image'

const Advertisements = () => {
  const companies = [
    { name: 'Hetzner', logo: '/advertisement/hetzner.png' },
    { name: 'Intel', logo: '/advertisement/intel.png' },
    { name: 'Pterodactyl', logo: '/advertisement/pterodactyl.png' },
    { name: 'Neoprotect', logo: '/advertisement/neoprotect.png' },
    { name: 'Samsung', logo: '/advertisement/samsung.png' },
  ]

  return (
    <section className="w-full py-32 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
          {companies.map((company) => (
            <div
              key={company.name}
              className="relative h-12 w-32 md:h-14 md:w-36 lg:h-16 lg:w-40 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advertisements