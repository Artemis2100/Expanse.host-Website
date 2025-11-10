"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useCurrency, Currency, currencySymbols } from "../contexts/CurrencyContext";
import { FiChevronDown, FiGlobe } from "react-icons/fi";

const currencies: { code: Currency; name: string; symbol: string }[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
];

export default function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedCurrency = currencies.find(c => c.code === currency);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/50 border border-muted hover:border-accent/50 transition-all text-sm font-medium text-foreground"
            >
                <FiGlobe className="w-4 h-4" />
                <span>{selectedCurrency?.symbol} {currency}</span>
                <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-card border border-muted rounded-lg shadow-xl backdrop-blur-xl z-50 overflow-hidden"
                    >
                        <div className="max-h-80 overflow-y-auto">
                            {currencies.map((curr) => (
                                <button
                                    key={curr.code}
                                    onClick={() => {
                                        setCurrency(curr.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/10 transition-colors ${
                                        currency === curr.code ? 'bg-accent/10 border-l-2 border-accent' : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{curr.symbol}</span>
                                        <div>
                                            <div className="font-semibold text-foreground text-sm">{curr.code}</div>
                                            <div className="text-xs text-muted">{curr.name}</div>
                                        </div>
                                    </div>
                                    {currency === curr.code && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 rounded-full bg-accent"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

