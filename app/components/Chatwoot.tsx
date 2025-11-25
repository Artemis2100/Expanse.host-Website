'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function Chatwoot() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Only load Chatwoot after user interaction or after 3 seconds
    const loadOnInteraction = () => {
      setShouldLoad(true)
    }

    // Load after 3 seconds if no interaction
    const timeoutId = setTimeout(() => {
      setShouldLoad(true)
    }, 3000)

    // Load on user interaction - using once: true so listeners auto-remove
    document.addEventListener('mousedown', loadOnInteraction, { once: true })
    document.addEventListener('touchstart', loadOnInteraction, { once: true })
    document.addEventListener('scroll', loadOnInteraction, { once: true, passive: true })

    return () => {
      clearTimeout(timeoutId)
      // Since we use { once: true }, listeners auto-remove, but we clean up just in case
      document.removeEventListener('mousedown', loadOnInteraction)
      document.removeEventListener('touchstart', loadOnInteraction)
      document.removeEventListener('scroll', loadOnInteraction)
    }
  }, [])

  useEffect(() => {
    if (!shouldLoad) return
    
    const baseUrl = 'https://chatwoot.expanse.host'
    // If SDK already loaded, initialize immediately
    if (typeof window !== 'undefined' && (window as any).chatwootSDK) {
      ;(window as any).chatwootSDK.run({
        websiteToken: 'CvYQta8cFktSBty8uyMThVy1',
        baseUrl
      })
    }
  }, [shouldLoad])

  if (!shouldLoad) return null

  return (
    <>
      <Script
        id="chatwoot-sdk"
        src="https://chatwoot.expanse.host/packs/js/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Initialize after script loads
          if (typeof window !== 'undefined' && (window as any).chatwootSDK) {
            (window as any).chatwootSDK.run({
              websiteToken: 'CvYQta8cFktSBty8uyMThVy1',
              baseUrl: 'https://chatwoot.expanse.host'
            })
          }
        }}
      />
    </>
  )
}


