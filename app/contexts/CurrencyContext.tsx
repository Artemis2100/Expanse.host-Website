"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Currency = 'USD' | 'EUR' | 'INR' | 'JPY' | 'CNY' | 'PHP' | 'KRW' | 'RUB' | 'AUD' | 'CAD';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    exchangeRates: Record<Currency, number>;
    isLoading: boolean;
    convertPrice: (usdPrice: number, showSymbol?: boolean) => string;
    formatPrice: (price: number, showSymbol?: boolean) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Currency symbols
const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    INR: '₹',
    JPY: '¥',
    CNY: '¥',
    PHP: '₱',
    KRW: '₩',
    RUB: '₽',
    AUD: 'A$',
    CAD: 'C$',
};

// Country to Currency mapping
const countryToCurrency: Record<string, Currency> = {
    // Europe
    'AT': 'EUR', 'BE': 'EUR', 'CY': 'EUR', 'EE': 'EUR', 'FI': 'EUR',
    'FR': 'EUR', 'DE': 'EUR', 'GR': 'EUR', 'IE': 'EUR', 'IT': 'EUR',
    'LV': 'EUR', 'LT': 'EUR', 'LU': 'EUR', 'MT': 'EUR', 'NL': 'EUR',
    'PT': 'EUR', 'SK': 'EUR', 'SI': 'EUR', 'ES': 'EUR', 'AD': 'EUR',
    'MC': 'EUR', 'SM': 'EUR', 'VA': 'EUR',
    
    // Asia
    'IN': 'INR',
    'JP': 'JPY',
    'CN': 'CNY',
    'PH': 'PHP',
    'KR': 'KRW',
    'RU': 'RUB',
    
    // Oceania
    'AU': 'AUD', 'NZ': 'AUD', 'PG': 'AUD', 'SB': 'AUD', 'VU': 'AUD',
    
    // North America
    'CA': 'CAD',
    'US': 'USD', 'MX': 'USD', 'PR': 'USD', 'VI': 'USD',
    
    // Default to USD for other countries
};

// Default exchange rates (will be updated from API)
const defaultRates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.92,
    INR: 83.15,
    JPY: 149.50,
    CNY: 7.24,
    PHP: 55.80,
    KRW: 1320.50,
    RUB: 91.50,
    AUD: 1.52,
    CAD: 1.35,
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>('USD');
    const [exchangeRates, setExchangeRates] = useState<Record<Currency, number>>(defaultRates);
    const [isLoading, setIsLoading] = useState(true);

    // Load currency preference from localStorage
    useEffect(() => {
        const savedCurrency = localStorage.getItem('preferredCurrency') as Currency;
        if (savedCurrency && Object.keys(currencySymbols).includes(savedCurrency)) {
            setCurrencyState(savedCurrency);
        }
    }, []);

    // Detect user location and set currency
    useEffect(() => {
        const detectCurrency = async () => {
            try {
                // Check if we already have a saved preference
                const savedCurrency = localStorage.getItem('preferredCurrency');
                if (savedCurrency) {
                    setIsLoading(false);
                    return;
                }

                // Detect location via IP
                const response = await fetch('https://ipapi.co/json/');
                if (response.ok) {
                    const data = await response.json();
                    const countryCode = data.country_code;
                    
                    if (countryCode && countryToCurrency[countryCode]) {
                        const detectedCurrency = countryToCurrency[countryCode];
                        setCurrencyState(detectedCurrency);
                        localStorage.setItem('preferredCurrency', detectedCurrency);
                    }
                }
            } catch (error) {
                console.error('Failed to detect location:', error);
            } finally {
                setIsLoading(false);
            }
        };

        detectCurrency();
    }, []);

    // Fetch exchange rates daily
    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                // Check if rates were fetched today
                const lastFetch = localStorage.getItem('exchangeRatesLastFetch');
                const today = new Date().toDateString();
                
                if (lastFetch === today) {
                    // Use cached rates
                    const cachedRates = localStorage.getItem('exchangeRates');
                    if (cachedRates) {
                        setExchangeRates(JSON.parse(cachedRates));
                        return;
                    }
                }

                // Fetch from API (using a free API)
                // Using exchangerate-api.com free tier
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
                
                if (response.ok) {
                    const data = await response.json();
                    const rates: Record<Currency, number> = {
                        USD: 1,
                        EUR: data.rates.EUR || defaultRates.EUR,
                        INR: data.rates.INR || defaultRates.INR,
                        JPY: data.rates.JPY || defaultRates.JPY,
                        CNY: data.rates.CNY || defaultRates.CNY,
                        PHP: data.rates.PHP || defaultRates.PHP,
                        KRW: data.rates.KRW || defaultRates.KRW,
                        RUB: data.rates.RUB || defaultRates.RUB,
                        AUD: data.rates.AUD || defaultRates.AUD,
                        CAD: data.rates.CAD || defaultRates.CAD,
                    };
                    
                    setExchangeRates(rates);
                    localStorage.setItem('exchangeRates', JSON.stringify(rates));
                    localStorage.setItem('exchangeRatesLastFetch', today);
                } else {
                    // Fallback to default rates
                    setExchangeRates(defaultRates);
                }
            } catch (error) {
                console.error('Failed to fetch exchange rates:', error);
                // Use default rates on error
                setExchangeRates(defaultRates);
            }
        };

        fetchExchangeRates();
        
        // Refresh rates every 24 hours
        const interval = setInterval(fetchExchangeRates, 24 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const setCurrency = useCallback((newCurrency: Currency) => {
        setCurrencyState(newCurrency);
        localStorage.setItem('preferredCurrency', newCurrency);
    }, []);

    const formatPrice = useCallback((price: number, showSymbol: boolean = true): string => {
        const symbol = showSymbol ? currencySymbols[currency] : '';
        
        // Format based on currency
        let formattedPrice: string;
        
        if (currency === 'JPY' || currency === 'KRW' || currency === 'INR') {
            // No decimals for these currencies
            formattedPrice = Math.round(price).toLocaleString();
        } else if (currency === 'CNY' || currency === 'RUB') {
            // 2 decimals
            formattedPrice = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            // 2 decimals with proper formatting
            formattedPrice = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        
        return showSymbol ? `${symbol}${formattedPrice}` : formattedPrice;
    }, [currency]);

    const convertPrice = useCallback((usdPrice: number, showSymbol: boolean = true): string => {
        const convertedPrice = usdPrice * exchangeRates[currency];
        return formatPrice(convertedPrice, showSymbol);
    }, [currency, exchangeRates, formatPrice]);

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                setCurrency,
                exchangeRates,
                isLoading,
                convertPrice,
                formatPrice,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}

export { currencySymbols };

