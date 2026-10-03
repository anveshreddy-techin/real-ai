'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, SUPPORTED_LANGUAGES, LanguageCode, LanguageOption } from '@/data/translations';

export type { LanguageCode, LanguageOption };
export { SUPPORTED_LANGUAGES, TRANSLATIONS };

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skillguard_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    } catch {
      // ignore SSR or restricted localStorage
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('skillguard_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
