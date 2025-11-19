import Script from 'next/script'

export default function PreconnectLinks() {
  return (
    <>
      <Script
        id="preconnect-links"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof document !== 'undefined') {
                const links = [
                  { rel: 'preconnect', href: 'https://api.exchangerate-api.com', crossorigin: 'anonymous' },
                  { rel: 'preconnect', href: 'https://ipapi.co', crossorigin: 'anonymous' },
                  { rel: 'preconnect', href: 'https://www.google-analytics.com', crossorigin: 'anonymous' },
                  { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: 'anonymous' },
                  { rel: 'preconnect', href: 'https://chatwoot.expanse.host', crossorigin: 'anonymous' }
                ];
                links.forEach(function(link) {
                  if (!document.querySelector('link[rel="' + link.rel + '"][href="' + link.href + '"]')) {
                    const el = document.createElement('link');
                    el.rel = link.rel;
                    el.href = link.href;
                    if (link.crossorigin) el.crossOrigin = link.crossorigin;
                    document.head.appendChild(el);
                  }
                });
              }
            })();
          `,
        }}
      />
    </>
  )
}

