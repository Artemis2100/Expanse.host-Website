"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { shouldRedirect } from "@/app/config/page-status";

/**
 * Hook to handle page redirects based on page status configuration
 * 
 * Usage in a page component:
 * ```tsx
 * export default function MyPage() {
 *   usePageRedirect();
 *   // Rest of your page...
 * }
 * ```
 * 
 * The hook will automatically redirect if the page is configured
 * as 'coming-soon' or 'maintenance' in page-status.ts
 */
export function usePageRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Extract route from pathname (remove leading slash)
    const route = pathname.replace(/^\//, '');
    
    // Check if this route should redirect
    const redirectPath = shouldRedirect(route);
    
    if (redirectPath) {
      router.push(redirectPath);
    }
  }, [router, pathname]);
}

