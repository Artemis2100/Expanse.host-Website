'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function Chatwoot() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const loadOnInteraction = () => {
      setShouldLoad(true)
    }

    document.addEventListener('mousedown', loadOnInteraction, { once: true })
    document.addEventListener('touchstart', loadOnInteraction, {
      once: true,
      passive: true,
    })
    document.addEventListener('keydown', loadOnInteraction, { once: true })

    return () => {
      document.removeEventListener('mousedown', loadOnInteraction)
      document.removeEventListener('touchstart', loadOnInteraction)
      document.removeEventListener('keydown', loadOnInteraction)
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


