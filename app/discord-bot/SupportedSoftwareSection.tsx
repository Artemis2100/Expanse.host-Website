"use client"

import React from 'react';
import Image from 'next/image';

const supportedSoftware = [
  { name: 'Python', logo: '/software/discord-bot/python.png' },
  { name: 'Java', logo: '/software/discord-bot/java.png' },
  { name: 'Lua', logo: '/software/discord-bot/lua.png', comingSoon: true },
  { name: 'Bun', logo: '/software/discord-bot/bun.png' },
  { name: 'Discord.js', logo: '/software/discord-bot/discordjs.png' },
  { name: 'Node.js', logo: '/software/discord-bot/nodejs.png' },
];

export default function SupportedSoftwareSection() {
  return (
    <section className="relative py-16 px-4 bg-white dark:bg-black">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Supported <span className="text-blue-600 dark:text-blue-400">Software</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Run your Discord bots with your preferred programming language and framework
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {supportedSoftware.map((software, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 border-2 rounded-xl transition-all duration-300 relative ${
                software.comingSoon
                  ? 'border-gray-300 dark:border-gray-600 opacity-60 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg'
              }`}
            >
              {software.comingSoon && (
                <span className="absolute top-2 right-2 bg-gray-400 dark:bg-gray-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
              <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                <Image
                  src={software.logo}
                  alt={software.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Hide image if it doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback text if image doesn't exist */}
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 hidden">
                  {software.name}
                </span>
              </div>
              <span className={`text-sm font-medium text-center ${
                software.comingSoon
                  ? 'text-gray-500 dark:text-gray-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {software.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
