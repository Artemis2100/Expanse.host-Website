"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import locations from '@/app/json/minecraft/locations.json';

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

  const handleContinueToCheckout = () => {
    if (!selectedLocation || !selectedPlan) return;

    // Redirect to the order link
    window.open(selectedPlan.orderLink, '_blank', 'noopener,noreferrer');

    // Close the modal
    onClose();
  };

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
              
              <div className=" p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-3xl font-bold text-primary mb-2">Select Server Location</h2>
                <p className="text-gray-600 dark:text-blue-100">
                  Choose a location for your {selectedPlan?.name} plan ({selectedPlan?.price}/month)
                </p>
              </div>

              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                      
                      <div className="flex items-center gap-4 ">
                        <div className="relative w-16 h-12 rounded-md overflow-hidden  flex-shrink-0">
                          <Image
                            src={location.flag}
                            alt={location.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                            {location.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {location.city}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
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
                    disabled={!selectedLocation}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      selectedLocation
                        ? 'bg-button text-white shadow-lg'
                        : 'bg-button text-white opacity-60 cursor-not-allowed'
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
