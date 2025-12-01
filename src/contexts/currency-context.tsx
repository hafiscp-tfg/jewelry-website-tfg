'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'USD' | 'INR';

const exchangeRates = {
  USD: 1,
  INR: 83,
};

const currencySymbols: Record<Currency, string> = {
    USD: '$',
    INR: '₹'
}

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUsd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  const setCurrency = (newCurrency: Currency) => {
    if (exchangeRates[newCurrency]) {
      setCurrencyState(newCurrency);
    }
  };

  const formatPrice = (priceInUsd: number) => {
    const rate = exchangeRates[currency];
    const symbol = currencySymbols[currency];
    const convertedPrice = priceInUsd * rate;
    return `${symbol}${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
