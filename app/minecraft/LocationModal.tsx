"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import locations from '@/app/json/minecraft/locations.json';
import { getMinecraftCartUrl, splitsConfigMap, backupsConfigMap, softwareConfigMap } from '@/app/config/minecraft-config';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: string;
    orderLink: string;
  } | null;
}

export default function LocationModal({ isOpen, onClose, selectedPlan }: LocationModalProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [serverName, setServerName] = useState<string>('');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('paper');
  const [selectedSplits, setSelectedSplits] = useState<string>('no-extra');
  const [selectedBackups, setSelectedBackups] = useState<string>('2-included');

  const handleContinueToCheckout = () => {
    if (!selectedLocation || !selectedPlan) return;

    // Get the cart URL with all configuration options
    const cartUrl = getMinecraftCartUrl({
      planName: selectedPlan.name,
      locationId: selectedLocation,
      serverName: serverName || undefined,
      software: selectedSoftware,
      splits: selectedSplits,
      backups: selectedBackups,
    });
    
    if (cartUrl) {
      // Redirect to the cart URL
      window.location.href = cartUrl;
    } else {
      // Fallback to the original order link if cart URL generation fails
      console.error('Failed to generate cart URL. Using fallback order link.');
      window.open(selectedPlan.orderLink, '_blank', 'noopener,noreferrer');
    }

    // Close the modal
    onClose();
  };

  // Software options with images
  const softwareOptions = [
    { 
      value: 'paper', 
      label: 'Paper', 
      description: 'Includes Plugin Installer',
      image: '/software/paper.png' // TODO: Add Paper logo to /public/software/paper.png
    },
    { 
      value: 'forge', 
      label: 'Forge', 
      description: 'Mod Support',
      image: '/software/forge.png' // TODO: Add Forge logo to /public/software/forge.png
    },
    { 
      value: 'fabric', 
      label: 'Fabric', 
      description: 'Lightweight Mod Loader',
      image: '/software/fabric.png' // TODO: Add Fabric logo to /public/software/fabric.png
    },
  ];

  // Splits options with prices
  const splitsOptions = [
    { value: 'no-extra', label: 'No Extra Splits', price: '$0.00' },
    { value: '1', label: '1 Split', price: '$0.50' },
    { value: '2', label: '2 Split', price: '$1.00' },
    { value: '3', label: '3 Split', price: '$1.50' },
    { value: '4', label: '4 Split', price: '$2.00' },
    { value: '5', label: '5 Split', price: '$2.50' },
    { value: '6', label: '6 Split', price: '$3.00' },
    { value: '7', label: '7 Split', price: '$3.50' },
    { value: '8', label: '8 Split', price: '$4.00' },
    { value: '9', label: '9 Split', price: '$4.50' },
    { value: '10', label: '10 Split', price: '$5.00' },
  ];

  // Backups options with prices
  const backupsOptions = [
    { value: '2-included', label: '2 Included', price: 'Free' },
    { value: '2+1', label: '2+1 Backups', price: '$2.00' },
    { value: '2+2', label: '2+2 Backups', price: '$4.00' },
    { value: '2+3', label: '2+3 Backups', price: '$6.00' },
    { value: '2+4', label: '2+4 Backups', price: '$8.00' },
    { value: '2+5', label: '2+5 Backups', price: '$10.00' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm z-50"
          />

          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className=" bg-white dark:bg-black/60 backdrop-blur-sm border border-muted rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              
              <div className="p-6 relative border-b border-muted">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Configure Your Server</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Customize your {selectedPlan?.name} plan ({selectedPlan?.price}/month)
                </p>
              </div>

              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)] space-y-6">
                {/* Server Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Server Location <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {locations.map((location) => (
                      <motion.button
                        key={location.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedLocation(location.id)}
                        className={`relative bg-card p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedLocation === location.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                            : 'border-muted hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                      >
                        {selectedLocation === location.id && (
                          <motion.div
                            layoutId="selected-location"
                            className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-8 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={location.flag}
                              alt={location.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {location.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {location.city}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Server Name */}
                <div>
                  <label htmlFor="serverName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Server Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="serverName"
                    type="text"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    placeholder="Type in what Server Name you want to be displayed on our Game Panel"
                    className="w-full px-4 py-2.5 bg-card border border-muted rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Software Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Software <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {softwareOptions.map((software) => (
                      <motion.button
                        key={software.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSoftware(software.value)}
                        className={`relative bg-card p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedSoftware === software.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                            : 'border-muted hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                      >
                        {selectedSoftware === software.value && (
                          <motion.div
                            layoutId="selected-software"
                            className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                            <Image
                              src={software.image}
                              alt={software.label}
                              fill
                              className="object-contain p-2"
                              onError={(e) => {
                                // Fallback if image doesn't exist
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {software.label}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                              {software.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Number of Splits */}
                <div>
                  <label htmlFor="splits" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Number of Splits
                  </label>
                  <select
                    id="splits"
                    value={selectedSplits}
                    onChange={(e) => setSelectedSplits(e.target.value)}
                    className="w-full px-4 py-2.5 bg-card border border-muted rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {splitsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.price !== '$0.00' && `(${option.price})`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Extra Backups */}
                <div>
                  <label htmlFor="backups" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Extra Backups
                  </label>
                  <select
                    id="backups"
                    value={selectedBackups}
                    onChange={(e) => setSelectedBackups(e.target.value)}
                    className="w-full px-4 py-2.5 bg-card border border-muted rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {backupsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} {option.price !== 'Free' && `(${option.price})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              
              <div className="border-t border-muted p-6 ">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-lg font-semibold text-gray-700 dark:text-gray-300 border border-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleContinueToCheckout}
                    disabled={!selectedLocation || !serverName.trim()}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      selectedLocation && serverName.trim()
                        ? 'bg-button text-white shadow-lg hover:bg-button-hover'
                        : 'bg-gray-400 dark:bg-gray-600 text-white opacity-60 cursor-not-allowed'
                    }`}
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
