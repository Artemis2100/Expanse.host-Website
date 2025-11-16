'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function Chatwoot() {
  useEffect(() => {
    const baseUrl = 'https://chatwoot.expanse.host'
    // If SDK already loaded, initialize immediately
    // @ts-ignore
    if (typeof window !== 'undefined' && (window as any).chatwootSDK) {
      // @ts-ignore
      ;(window as any).chatwootSDK.run({
        websiteToken: 'CvYQta8cFktSBty8uyMThVy1',
        baseUrl
      })
    }
  }, [])

  return (
    <>
      <Script
        id="chatwoot-sdk"
        src="https://chatwoot.expanse.host/packs/js/sdk.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize after script loads
          // @ts-ignore
          if (typeof window !== 'undefined' && (window as any).chatwootSDK) {
            // @ts-ignore
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


