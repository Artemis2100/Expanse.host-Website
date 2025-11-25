import Script from 'next/script'

export default function PreconnectLinks() {
  return (
    <>
      {/* Critical preconnects - only for essential resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <Script
        id="preconnect-links"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof document !== 'undefined') {
                const links = [
                  { rel: 'dns-prefetch', href: 'https://api.exchangerate-api.com' },
                  { rel: 'dns-prefetch', href: 'https://ipapi.co' },
                  { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
                  { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
                  { rel: 'dns-prefetch', href: 'https://chatwoot.expanse.host' }
                ];
                links.forEach(function(link) {
                  if (!document.querySelector('link[rel="' + link.rel + '"][href="' + link.href + '"]')) {
                    const el = document.createElement('link');
                    el.rel = link.rel;
                    el.href = link.href;
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

