'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'am';

// ── Explicit string-valued type so both locale objects are assignable ──────────
export type T = {
  rent: string; buy: string; sell: string; dealers: string;
  login: string; signup: string;
  heroLine1: string; heroLine2: string;
  searchPlaceholder: string; locationPlaceholder: string;
  filters: string; search: string;
  recommendedBadge: string; featuredTitle: string;
  viewAll: string; rentNow: string; seats: string; perDay: string;
  brandsTitle: string;
  footerDesc: string; quickLinks: string;
  buyCar: string; rentCar: string; sellCar: string; findDealer: string;
  resources: string; loanCalc: string; carValuation: string;
  buyingGuide: string; privacy: string; contactUs: string;
  address: string; copyright: string;
};

export const translations: Record<Lang, T> = {
  en: {
    rent: 'Rent', buy: 'Buy', sell: 'Sell', dealers: 'Dealers',
    login: 'Log in', signup: 'Sign Up',
    heroLine1: 'Find a car',
    heroLine2: "you'll love to drive.",
    searchPlaceholder: 'Make, Model, City...',
    locationPlaceholder: 'Location',
    filters: 'Filters',
    search: 'Search',
    recommendedBadge: 'Recommended for you',
    featuredTitle: 'Featured Cars.',
    viewAll: 'View all cars',
    rentNow: 'Rent Now',
    seats: 'Seats',
    perDay: '/day',
    brandsTitle: 'Available Car Brands.',
    footerDesc: "The world's most trusted marketplace to buy, sell, and rent vehicles. Find your perfect car today.",
    quickLinks: 'Quick Links',
    buyCar: 'Buy a Car', rentCar: 'Rent a Car', sellCar: 'Sell Your Car', findDealer: 'Find a Dealer',
    resources: 'Resources',
    loanCalc: 'Auto Loan Calculator', carValuation: 'Car Valuation',
    buyingGuide: 'Car Buying Guide', privacy: 'Privacy Policy',
    contactUs: 'Contact Us',
    address: 'Ethiopia, Addis Ababa, Kazanchis',
    copyright: '© 2026 Kiray Platform. All rights reserved.',
  },
  am: {
    rent: 'ተከራይ', buy: 'ግዛ', sell: 'ሽጥ', dealers: 'ዲለሮች',
    login: 'ግባ', signup: 'ተመዝገብ',
    heroLine1: 'መኪና ፈልግ',
    heroLine2: 'ለሆድ ልብ የሚሆን።',
    searchPlaceholder: 'ሞዴል, ብራንድ, ከተማ...',
    locationPlaceholder: 'ቦታ',
    filters: 'ማጣሪያ',
    search: 'ፈልግ',
    recommendedBadge: 'ለእርስዎ የሚመከር',
    featuredTitle: 'ምርጥ ተሽከርካሪዎች.',
    viewAll: 'ሁሉንም ተሽከርካሪዎች ይመልከቱ',
    rentNow: 'አሁን ተከራይ',
    seats: 'መቀመጫ',
    perDay: '/ቀን',
    brandsTitle: 'ያሉ የመኪና ብራንዶች.',
    footerDesc: 'ዓለምን በሚዳሰስ ደረጃ ተሽከርካሪ ለመግዛት፣ ለመሸጥና ለመከራየት የሚያምን ሱቅ። ዛሬ ፍጹም መኪናዎን ያግኙ።',
    quickLinks: 'ፈጣን ትስስሮች',
    buyCar: 'መኪና ግዛ', rentCar: 'መኪና ተከራይ', sellCar: 'መኪናዎን ሸጡ', findDealer: 'ዲለር ያግኙ',
    resources: 'ግብዓቶች',
    loanCalc: 'የብድር ካልኩሌተር', carValuation: 'የመኪና ዋጋ ግምት',
    buyingGuide: 'የመኪና ግዢ መመሪያ', privacy: 'የግልነት ፖሊሲ',
    contactUs: 'ያግኙን',
    address: 'ኢትዮጵያ፣ አዲስ አበባ፣ ካዛንቺስ',
    copyright: '© 2026 Kiray Platform. መብቱ በሕግ የተጠበቀ ነው።',
  },
};

// ── Context ───────────────────────────────────────────────────────────────────
interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
