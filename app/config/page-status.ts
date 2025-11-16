/**
 * Page Status Configuration
 * 
 * This file manages which pages should redirect to "coming soon" or "maintenance" pages.
 * To add a page to maintenance or coming soon mode, simply update this configuration.
 * 
 * Usage:
 * - Add a route to 'comingSoon' array to redirect to /coming-soon
 * - Add a route to 'maintenance' array to redirect to /maintenance (when created)
 * - Remove from arrays to make pages active again
 */

export type PageStatus = 'active' | 'coming-soon' | 'maintenance';

export interface PageStatusConfig {
  [route: string]: PageStatus;
}

/**
 * Page status configuration
 * 
 * Routes should match the page paths (without leading slash in the key)
 * Examples:
 * - 'webhosting' for /webhosting
 * - 'colocation' for /colocation
 * - 'infrastructure' for /infrastructure
 */
export const pageStatusConfig: PageStatusConfig = {
  // Coming Soon Pages
  webhosting: 'coming-soon',
  colocation: 'coming-soon',
  
  // Maintenance Pages (example - uncomment when needed)
  // infrastructure: 'maintenance',
  
  // Active Pages (default - don't need to be listed, but can be for clarity)
  // minecraft: 'active',
  // vps: 'active',
  // dedicated: 'active',
};

/**
 * Get the status of a page by route
 * @param route - The route path (e.g., 'webhosting', 'colocation')
 * @returns The status of the page or 'active' if not configured
 */
export function getPageStatus(route: string): PageStatus {
  return pageStatusConfig[route] || 'active';
}

/**
 * Get the redirect path for a page status
 * @param status - The page status
 * @returns The redirect path or null if active
 */
export function getRedirectPath(status: PageStatus): string | null {
  switch (status) {
    case 'coming-soon':
      return '/coming-soon';
    case 'maintenance':
      return '/maintenance';
    case 'active':
    default:
      return null;
  }
}

/**
 * Check if a route should redirect
 * @param route - The route path
 * @returns The redirect path or null if no redirect needed
 */
export function shouldRedirect(route: string): string | null {
  const status = getPageStatus(route);
  return getRedirectPath(status);
}

