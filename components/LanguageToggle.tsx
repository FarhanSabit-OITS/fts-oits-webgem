import React from 'react';
import { useLanguage, Language } from './LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang);
    }
  };

  return (
    <div 
      aria-label="Language selection" 
      className="inline-flex items-center gap-1 p-1 bg-slate-200/60 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800 rounded-full shadow-inner"
    >
      <Languages size={13} className="ml-2 text-slate-500 dark:text-slate-400 shrink-0" aria-hidden="true" />
      <button
        type="button"
        onClick={() => handleToggle('en')}
        aria-label="Switch language to English"
        aria-pressed={language === 'en'}
        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          language === 'en'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleToggle('bn')}
        aria-label="Switch language to Bengali"
        aria-pressed={language === 'bn'}
        className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          language === 'bn'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        বাংলা
      </button>
    </div>
  );
};
