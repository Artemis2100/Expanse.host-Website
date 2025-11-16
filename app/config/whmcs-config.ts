/**
 * WHMCS API Configuration
 * 
 * Configure your WHMCS API credentials here.
 * Set these as environment variables in your .env.local file for security.
 */

export interface WHMCSConfig {
  url: string;
  identifier: string;
  secret: string;
}

// Get WHMCS config from environment variables
export function getWHMCSConfig(): WHMCSConfig {
  const url = process.env.WHMCS_URL || 'https://my.expanse.host';
  const identifier = process.env.WHMCS_API_IDENTIFIER || '';
  const secret = process.env.WHMCS_API_SECRET || '';

  if (!identifier || !secret) {
    console.warn('WHMCS API credentials not configured. Please set WHMCS_API_IDENTIFIER and WHMCS_API_SECRET environment variables.');
  }

  return { url, identifier, secret };
}

/**
 * Note: WHMCS API credentials are stored server-side only.
 * They are NEVER exposed to the client.
 */

/**
 * Map VPS plan IDs to WHMCS product IDs (PIDs)
 * These should match the PIDs in your WHMCS system
 */
export const vpsPlanToPID: Record<string, number> = {
  // Regular (NA/EU) Plans
  "v1-micro": 13,
  "v2-starter": 14,
  "v3-standard": 15,
  "v4-pro": 16,
  "v5-enterprise": 17,
  "v6-titan": 18,
  "v7-ultra": 19,
  "v8-omega": 51,
  "v9-apex": 52,
  
  // APAC Plans
  "v1-micro-apac": 53,
  "v2-starter-apac": 54,
  "v3-standard-apac": 55,
  "v4-pro-apac": 56,
  "v5-enterprise-apac": 57,
  "v6-titan-apac": 58,
  "v7-ultra-apac": 59,
  "v8-omega-apac": 60,
  "v9-apex-apac": 61,
};

