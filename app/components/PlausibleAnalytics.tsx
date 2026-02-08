"use client";

import { useEffect } from "react";

/**
 * Injects Plausible Analytics scripts into document head.
 * Loads on every page; does not replace Google Analytics.
 */
export default function PlausibleAnalytics() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const scriptSrc =
      "http://expanse-internal-tools-plausible-9871e5-109-230-233-69.traefik.me/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js";

    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script1 = document.createElement("script");
    script1.defer = true;
    script1.setAttribute("data-domain", "expanse.host");
    script1.src = scriptSrc;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.textContent = `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`;
    document.head.appendChild(script2);

    return () => {
      script1.remove();
      script2.remove();
    };
  }, []);

  return null;
}
