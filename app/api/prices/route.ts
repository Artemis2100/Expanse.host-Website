import { NextRequest, NextResponse } from 'next/server';
import { getWHMCSConfig, vpsPlanToPID } from '@/app/config/whmcs-config';

/**
 * Cache price data for 10 minutes
 */
let priceCache: {
  data: Record<string, number> | null;
  lastFetch: number;
} = {
  data: null,
  lastFetch: 0,
};

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * Verify API key from request header
 */
function verifyAPIKey(request: NextRequest): boolean {
  const validAPIKey = process.env.STOCK_API_KEY || process.env.NEXT_PUBLIC_STOCK_API_KEY;
  
  if (!validAPIKey) {
    return false;
  }

  const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');

  if (!apiKey) {
    return false;
  }

  // Constant-time comparison
  if (apiKey.length !== validAPIKey.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < apiKey.length; i++) {
    result |= apiKey.charCodeAt(i) ^ validAPIKey.charCodeAt(i);
  }
  
  return result === 0;
}

/**
 * Fetch prices from WHMCS API using GetProducts
 */
async function fetchPricesFromWHMCS(): Promise<Record<string, number>> {
  const config = getWHMCSConfig();

  if (!config.identifier || !config.secret) {
    console.error('WHMCS API credentials not configured');
    return {};
  }

  try {
    const apiUrl = `${config.url.replace(/\/$/, '')}/includes/api.php`;
    
    const params = new URLSearchParams({
      action: 'GetProducts',
      identifier: config.identifier,
      secret: config.secret,
      responsetype: 'json',
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Expanse-Host-Website/1.0',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error('WHMCS GetProducts API error:', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText.substring(0, 500),
      });
      
      if (response.status === 403) {
        throw new Error(`WHMCS API 403 Forbidden - Check: 1) API credentials are correct, 2) IP whitelisting is disabled or your IP is whitelisted, 3) API has 'GetProducts' permission`);
      }
      
      throw new Error(`WHMCS GetProducts API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result === 'error') {
      console.error('WHMCS GetProducts API error:', data.message);
      return {};
    }

    // Process products and extract prices
    const priceData: Record<string, number> = {};

    // Handle different response structures from WHMCS
    let products: any[] = [];
    if (data.products) {
      if (Array.isArray(data.products.product)) {
        products = data.products.product;
      } else if (data.products.product && typeof data.products.product === 'object') {
        products = [data.products.product];
      } else if (Array.isArray(data.products)) {
        products = data.products;
      }
    }

    products.forEach((product: any) => {
      const pid = parseInt(product.pid);
      
      // Find matching plan ID by PID
      const planId = Object.keys(vpsPlanToPID).find(
        key => vpsPlanToPID[key] === pid
      );

      if (planId) {
        // WHMCS returns pricing in different formats
        // Try to get the monthly price (pricing.monthly or pricing.USD.monthly or just pricing)
        let price: number | null = null;
        
        if (product.pricing) {
          if (typeof product.pricing === 'number') {
            price = product.pricing;
          } else if (product.pricing.monthly) {
            price = parseFloat(String(product.pricing.monthly));
          } else if (product.pricing.USD && product.pricing.USD.monthly) {
            price = parseFloat(String(product.pricing.USD.monthly));
          } else if (product.pricing.price) {
            price = parseFloat(String(product.pricing.price));
          }
        }
        
        // Fallback: try direct price fields
        if (price === null || isNaN(price)) {
          if (product.price) {
            price = parseFloat(String(product.price));
          } else if (product.monthly) {
            price = parseFloat(String(product.monthly));
          }
        }

        if (price !== null && !isNaN(price) && price > 0) {
          priceData[planId] = price;
          console.log(`[Price Sync] ${planId} (PID ${pid}): $${price.toFixed(2)}`);
        } else {
          console.warn(`[Price Sync] Could not parse price for ${planId} (PID ${pid}):`, product);
        }
      }
    });

    return priceData;
  } catch (error) {
    console.error('Error fetching prices from WHMCS:', error);
    return {};
  }
}

/**
 * GET /api/prices - Get current prices for VPS plans from WHMCS
 * Cached for 10 minutes to reduce API calls
 * Protected with API key authentication
 */
export async function GET(request: NextRequest) {
  // Verify API key
  if (!verifyAPIKey(request)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized: Invalid or missing API key',
      },
      { status: 401 }
    );
  }

  try {
    const now = Date.now();

    // Return cached data if it's still fresh
    if (priceCache.data && (now - priceCache.lastFetch) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: priceCache.data,
        cached: true,
        lastUpdated: priceCache.lastFetch,
      });
    }

    // Fetch fresh data from WHMCS
    const priceData = await fetchPricesFromWHMCS();

    // Update cache
    priceCache = {
      data: priceData,
      lastFetch: now,
    };

    return NextResponse.json({
      success: true,
      data: priceData,
      cached: false,
      lastUpdated: now,
    });
  } catch (error) {
    console.error('Error in prices API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch price data',
        data: {},
      },
      { status: 500 }
    );
  }
}

