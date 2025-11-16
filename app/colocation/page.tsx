"use client";

import { usePageRedirect } from "../utils/use-page-redirect";

export default function ColocationPage() {
    // Automatically redirects to /coming-soon if configured in page-status.ts
    usePageRedirect();
    
    // Return null while redirecting
    return null;
}
