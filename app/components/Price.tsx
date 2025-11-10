"use client";

import { useCurrency } from "../contexts/CurrencyContext";

interface PriceProps {
    usdPrice: number | string;
    showSymbol?: boolean;
    className?: string;
    period?: string;
}

// Helper to extract number from price string like "$12.99" or "12.99"
function extractPrice(price: number | string): number {
    if (typeof price === 'number') {
        return price;
    }
    // Remove currency symbols and extract number
    const numStr = price.replace(/[^\d.-]/g, '');
    return parseFloat(numStr) || 0;
}

export default function Price({ usdPrice, showSymbol = true, className = "", period }: PriceProps) {
    const { convertPrice } = useCurrency();
    const price = extractPrice(usdPrice);
    const formattedPrice = convertPrice(price, showSymbol);
    
    return (
        <span className={className}>
            {formattedPrice}
            {period && <span className="text-sm text-muted ml-1">{period}</span>}
        </span>
    );
}

export function PriceDisplay({ usdPrice, showSymbol = true, className = "", period }: PriceProps) {
    const { convertPrice } = useCurrency();
    const price = extractPrice(usdPrice);
    const formattedPrice = convertPrice(price, showSymbol);
    
    return (
        <>
            {formattedPrice}
            {period && <span className="text-sm text-muted ml-1">{period}</span>}
        </>
    );
}

