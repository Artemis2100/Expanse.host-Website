"use client"

import React, { useState, useEffect } from 'react';
import LocationModal from './LocationModal';
import pricingPlans from '@/app/json/minecraft/plans.json';
import { FaMemory, FaMicrochip, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import { MdBackup } from 'react-icons/md';

const CreeperIcon = ({ color }: { color: string }) => (
  <div
    className={color}
    style={{
      width: '116px',
      height: '116px',
      maskImage: 'url(/icons/creeper.svg)',
      WebkitMaskImage: 'url(/icons/creeper.svg)',
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      backgroundColor: 'currentColor'
    }}
  />
);

const ZombieIcon = ({ color }: { color: string }) => (
  <div
    className={color}
    style={{
      width: '116px',
      height: '116px',
      maskImage: 'url(/icons/zombie.svg)',
      WebkitMaskImage: 'url(/icons/zombie.svg)',
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      backgroundColor: 'currentColor'
    }}
  />
);

const EndermanIcon = ({ color }: { color: string }) => (
  <div
    className={color}
    style={{
      width: '116px',
      height: '116px',
      maskImage: 'url(/icons/enderman.svg)',
      WebkitMaskImage: 'url(/icons/enderman.svg)',
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      backgroundColor: 'currentColor'
    }}
  />
);

const BlazeIcon = ({ color }: { color: string }) => (
  <div
    className={color}
    style={{
      width: '116px',
      height: '116px',
      maskImage: 'url(/icons/blaze.svg)',
      WebkitMaskImage: 'url(/icons/blaze.svg)',
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      backgroundColor: 'currentColor'
    }}
  />
);

interface Feature {
  icon: 'ram' | 'cpu' | 'storage' | 'backup' | 'shield';
  text: string;
}

interface PricingTier {
  name: string;
  icon: 'creeper' | 'zombie' | 'enderman' | 'blaze';
  price: string;
  period: string;
  orderLink: string;
  features: Feature[];
  highlighted?: boolean;
  color: string;
  borderColor: string;
  bgColor: string;
  hoverBgColor: string;
  glowColor: string;
}

const pricingTiers: PricingTier[] = pricingPlans as PricingTier[];

const renderIcon = (iconName: string, color: string) => {
  switch (iconName) {
    case 'creeper':
      return <CreeperIcon color={color} />;
    case 'zombie':
      return <ZombieIcon color={color} />;
    case 'enderman':
      return <EndermanIcon color={color} />;
    case 'blaze':
      return <BlazeIcon color={color} />;
    default:
      return null;
  }
};

const renderFeatureIcon = (iconName: string, color: string) => {
  const iconClass = `w-5 h-5 ${color}`;
  switch (iconName) {
    case 'ram':
      return <FaMemory className={iconClass} />;
    case 'cpu':
      return <FaMicrochip className={iconClass} />;
    case 'storage':
      return <FaDatabase className={iconClass} />;
    case 'backup':
      return <MdBackup className={iconClass} />;
    case 'shield':
      return <FaShieldAlt className={iconClass} />;
    default:
      return null;
  }
};

export default function MinecraftPricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; orderLink: string } | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check theme on mount and listen for changes
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = (plan: PricingTier) => {
    setSelectedPlan({ name: plan.name, price: plan.price, orderLink: plan.orderLink });
    setIsModalOpen(true);
  };

  return (
    <section className="relative py-20 px-4 bg-white dark:bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/wallpapers/image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        className="absolute inset-0 z-0 dark:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0.95)_50%,_rgba(0,0,0,1)_60%)] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_rgba(255,255,255,0.85)_40%,_rgba(255,255,255,1)_70%)]"
      />

      <div className="absolute opacity-80 top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="1463" height="926" viewBox="0 0 1463 926" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_minecraft)">
            <ellipse cx="731.5" cy="300" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
          </g>
          <g filter="url(#filter1_f_minecraft)">
            <ellipse cx="731.5" cy="450" rx="275.5" ry="102.5" fill={isDark ? "#1665CD" : "#3b82f6"} fillOpacity={isDark ? 0.47 : 0.25} />
          </g>
          <defs>
            <filter id="filter0_f_minecraft" x="156" y="-102.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_0_1" />
            </filter>
            <filter id="filter1_f_minecraft" x="156" y="47.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_0_1" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            Choose Your <img src="/wallpapers/minecraft-logo.png" alt="Minecraft" className="h-10 md:h-12 inline-block" /> Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Power up your server with our optimized hosting plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-8 transition-all duration-300 flex flex-col h-full border ${tier.borderColor}`}
            >
              <div
                className="absolute inset-0 rounded-xl dark:hidden"
                style={{
                  background: `linear-gradient(to bottom, rgba(${tier.glowColor}, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)`,
                }}
              />
              <div
                className="absolute inset-0 rounded-xl hidden dark:block"
                style={{
                  background: `linear-gradient(to bottom, rgba(${tier.glowColor}, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {tier.highlighted && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20">
                    <span className={`${tier.bgColor} text-white px-4 py-1 rounded text-sm font-semibold whitespace-nowrap`}>
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`flex justify-center mb-6 ${tier.color}`}>
                  {renderIcon(tier.icon, tier.color)}
                </div>

                <h3 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">{tier.name}</h3>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">{tier.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-3 flex-shrink-0">
                        {renderFeatureIcon(feature.icon, tier.color)}
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(tier)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mt-auto ${tier.bgColor} ${tier.hoverBgColor} text-white text-center block`}
                  style={{
                    boxShadow: `inset 0 2px 8px rgba(0, 0, 0, 0.6)`
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <div
          className="h-full w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        />
      </div>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
}
