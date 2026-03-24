"use client";

import { useEffect } from "react";

const GA_ID = "G-1TQ8CNNC1E";
const PLAUSIBLE_SRC =
  "https://analytics.exnet.online/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js";

function injectGtag() {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
    return;
  }
  const ext = document.createElement("script");
  ext.async = true;
  ext.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  ext.onload = () => {
    const inline = document.createElement("script");
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { page_path: window.location.pathname });
    `;
    document.head.appendChild(inline);
  };
  document.head.appendChild(ext);
}

function injectPlausible() {
  if (
    document.querySelector(
      'script[data-domain="expanse.host"][src*="analytics.exnet"]',
    )
  ) {
    return;
  }
  const s = document.createElement("script");
  s.defer = true;
  s.setAttribute("data-domain", "expanse.host");
  s.src = PLAUSIBLE_SRC;
  document.body.appendChild(s);
}

/**
 * Loads Plausible + GA after idle so LCP / main thread stay unblocked.
 * Relies on beforeInteractive plausible queue stub in root layout.
 */
export default function ThirdPartyAnalytics() {
  useEffect(() => {
    const run = () => {
      injectPlausible();
      injectGtag();
    };
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      ric(run, { timeout: 8000 });
    } else {
      setTimeout(run, 3200);
    }
  }, []);

  return null;
}
