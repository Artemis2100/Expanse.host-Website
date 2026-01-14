"use client"

import React, { useState, useEffect } from 'react';
import pricingPlans from '@/app/json/discord-bot/plans.json';
import { FaMemory, FaMicrochip, FaDatabase, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { MdBackup } from 'react-icons/md';
import { HiCpuChip } from 'react-icons/hi2';
import { PriceDisplay } from '../components/Price';

interface Feature {
  icon: 'ram' | 'cpu' | 'storage' | 'backup' | 'shield' | 'players' | 'cpuModel';
  text: string;
  included?: boolean;
}

interface PricingTier {
  name: string;
  icon: 'creeper' | 'zombie' | 'enderman' | 'blaze';
  price: string;
  firstMonthPrice?: string;
  period: string;
  promoCode?: string;
  promoDiscount?: string;
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
    case 'players':
      return <FaUsers className={iconClass} />;
    case 'cpuModel':
      return <HiCpuChip className={iconClass} />;
    default:
      return null;
  }
};

type BillingCycle = 'monthly' | 'quarterly' | 'semi-annually' | 'annually';

const billingCycles = [
  { value: 'monthly' as BillingCycle, label: 'Monthly', discount: 0 },
  { value: 'quarterly' as BillingCycle, label: 'Quarterly', discount: 5 },
  { value: 'semi-annually' as BillingCycle, label: 'Semi-annually', discount: 12 },
  { value: 'annually' as BillingCycle, label: 'Annually', discount: 20 },
];

export default function DiscordBotPricingSection() {
  const [isDark, setIsDark] = useState(true);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

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
    window.open(plan.orderLink, '_blank', 'noopener,noreferrer');
  };

  const calculatePrice = (basePrice: string, cycle: BillingCycle): { price: number; displayPrice: string; period: string } => {
    const priceNum = parseFloat(basePrice.replace('$', ''));
    const selectedCycle = billingCycles.find(c => c.value === cycle)!;
    const discountMultiplier = 1 - (selectedCycle.discount / 100);
    
    let multiplier = 1;
    let period = '/month';
    
    switch (cycle) {
      case 'monthly':
        multiplier = 1;
        period = '/month';
        break;
      case 'quarterly':
        multiplier = 3;
        period = '/quarter';
        break;
      case 'semi-annually':
        multiplier = 6;
        period = '/6 months';
        break;
      case 'annually':
        multiplier = 12;
        period = '/year';
        break;
    }
    
    const totalPrice = priceNum * multiplier * discountMultiplier;
    const displayPrice = `$${totalPrice.toFixed(2)}`;
    
    return { price: totalPrice, displayPrice, period };
  };

  return (
    <section className="relative py-20 px-4 bg-white dark:bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/wallpapers/discord-bot.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div
        className="absolute inset-0 z-0 dark:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.3)_0%,_rgba(0,0,0,0.5)_50%,_rgba(0,0,0,0.7)_60%)] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_rgba(255,255,255,0.4)_40%,_rgba(255,255,255,0.6)_70%)]"
      />

      <div className="absolute opacity-80 top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="1463" height="926" viewBox="0 0 1463 926" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_discord)">
            <ellipse cx="731.5" cy="300" rx="275.5" ry="102.5" fill={isDark ? "#5865F2" : "#5865F2"} fillOpacity={isDark ? 0.47 : 0.25} />
          </g>
          <g filter="url(#filter1_f_discord)">
            <ellipse cx="731.5" cy="450" rx="275.5" ry="102.5" fill={isDark ? "#5865F2" : "#5865F2"} fillOpacity={isDark ? 0.47 : 0.25} />
          </g>
          <defs>
            <filter id="filter0_f_discord" x="156" y="-102.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_0_1" />
            </filter>
            <filter id="filter1_f_discord" x="156" y="47.5" width="1151" height="805" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_0_1" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-left mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Choose Your Perfect Bot Hosting Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Select from our pre-configured Discord bot hosting plans designed for optimal performance and reliability.
          </p>
        </div>

        {/* Billing Cycle Switcher */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Billing Cycle:</div>
          <div className="flex flex-wrap items-center gap-2">
            {billingCycles.map((cycle) => (
              <button
                key={cycle.value}
                onClick={() => setBillingCycle(cycle.value)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  billingCycle === cycle.value
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {cycle.label}
                {cycle.discount > 0 && (
                  <span className="ml-2 text-xs opacity-90">-{cycle.discount}%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(showAllPlans ? pricingTiers : pricingTiers.slice(0, 4)).map((tier, index) => (
            <div
              key={index}
              className="relative rounded-xl p-5 transition-all duration-300 flex flex-col h-full"
            >
              <div
                className="absolute inset-0 rounded-xl dark:hidden z-0"
                style={{
                  background: `linear-gradient(to bottom, rgba(${tier.glowColor}, 0.15) 0%, rgba(255, 255, 255, 0.95) 100%)`,
                }}
              />
              <div
                className="absolute inset-0 rounded-xl hidden dark:block z-0"
                style={{
                  background: `linear-gradient(to bottom, rgba(${tier.glowColor}, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)`,
                }}
              />

              {/* BEST SELLER Arrow Tag */}
              {tier.highlighted && (
                <div className="absolute top-3 -right-2 z-30">
                  <div className="relative">
                    {/* Tag body with arrow shape */}
                    <div
                      className="relative px-3 py-1.5"
                      style={{
                        background: `rgba(${tier.glowColor}, 1)`,
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <span className="text-white text-xs font-bold uppercase tracking-wider block">
                        BEST SELLER!
                      </span>
                    </div>
                    {/* Arrow pointer */}
                    <div
                      className="absolute right-0 top-1/2"
                      style={{
                        transform: 'translateY(-50%) translateX(100%)',
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: `8px solid rgba(${tier.glowColor}, 1)`,
                        filter: 'drop-shadow(2px 0 2px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">{tier.name}</h3>
                </div>

                {/* Pricing Section */}
                <div className="text-center mb-3">
                  {(() => {
                    const calculated = calculatePrice(tier.price, billingCycle);
                    return (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {calculated.displayPrice}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{calculated.period}</span>
                        </div>
                        {billingCycle !== 'monthly' && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Billed {billingCycle === 'quarterly' ? 'quarterly' : billingCycle === 'semi-annually' ? 'semi-annually' : 'annually'}
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <ul className="space-y-2 mb-4 flex-grow">
                  {tier.features.map((feature, featureIndex) => {
                    const isIncluded = feature.included !== false; // Default to true if not specified
                    return (
                      <li key={featureIndex} className={`flex items-center text-sm ${isIncluded ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
                        <span className="mr-2 flex-shrink-0">
                          {isIncluded ? (
                            <svg className={`w-5 h-5 ${tier.color}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => handleGetStarted(tier)}
                  className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 mt-auto ${tier.bgColor} ${tier.hoverBgColor} text-white text-center block`}
                  style={{
                    boxShadow: `inset 0 2px 8px rgba(0, 0, 0, 0.6)`
                  }}
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {pricingTiers.length > 4 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllPlans(!showAllPlans)}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {showAllPlans ? 'Show Fewer Plans' : 'Show More Plans'}
            </button>
          </div>
        )}
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
    </section>
  );
}
