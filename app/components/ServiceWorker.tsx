'use client'

import { useEffect } from 'react'

export default function ServiceWorker() {
  useEffect(() => {
    // Delay service worker registration to not block initial page load
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      // Register service worker after page load
      const registerSW = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Service Worker registered:', registration.scope)
            }
          })
          .catch((error) => {
            if (process.env.NODE_ENV === 'development') {
              console.error('Service Worker registration failed:', error)
            }
          })
      }

      // Register after page is fully loaded
      if (document.readyState === 'complete') {
        setTimeout(registerSW, 1000)
      } else {
        window.addEventListener('load', () => {
          setTimeout(registerSW, 1000)
        })
      }
    }
  }, [])

  return null
}

