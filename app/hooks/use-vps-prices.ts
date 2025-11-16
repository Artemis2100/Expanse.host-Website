import { useState, useEffect, useCallback } from 'react';

interface PriceData {
  [planId: string]: number;
}

interface UseVPSPricesReturn {
  prices: PriceData;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  refresh: () => void;
}

const PRICE_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

export function useVPSPrices(): UseVPSPricesReturn {
  const [prices, setPrices] = useState<PriceData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch('/api/prices', {
        headers: {
          'x-api-key': apiKey,
        },
      });

      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid API key');
      }

      const result = await response.json();

      if (result.success) {
        setPrices(result.data || {});
        setLastUpdated(result.lastUpdated || Date.now());
      } else {
        throw new Error(result.error || 'Failed to fetch prices');
      }
    } catch (err) {
      console.error('Error fetching prices:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch price data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  // Set up refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrices();
    }, PRICE_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    prices,
    isLoading,
    error,
    lastUpdated,
    refresh: fetchPrices,
  };
}

