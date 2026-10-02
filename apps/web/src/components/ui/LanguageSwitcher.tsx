'use client';

import React from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from './LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1.5 bg-[#0B1E36] px-2.5 py-1.5 rounded-lg border border-slate-700/80 shadow-inner">
      <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
      {!compact && (
        <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
          भाषा / Lang:
        </span>
      )}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="bg-transparent text-blue-300 font-bold focus:outline-none cursor-pointer text-xs pr-1"
        aria-label="Select Language"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option 
            key={lang.code} 
            value={lang.code} 
            className="bg-[#0B1E36] text-white py-1"
          >
            {lang.nativeName} ({lang.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};
