import React from 'react';
import { ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const Breadcrumbs: React.FC = () => {
  const { language } = useLanguage();

  const items = [
    {
      name: language === 'bn' ? 'হোম' : 'Home',
      url: 'https://oitsdhaka.com/',
      icon: Home
    },
    {
      name: language === 'bn' ? 'স্টুডিও' : 'Studio',
      url: 'https://oitsdhaka.com/#studio',
    },
    {
      name: language === 'bn' ? 'প্রস্তুতি পর্ব ২০২৬' : 'Coming Soon 2026',
      url: 'https://oitsdhaka.com/#coming-soon',
    }
  ];

  // Generate the BreadcrumbList JSON-LD structure
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <nav 
      aria-label={language === 'bn' ? 'ব্রেডক্রাম্ব নেভিগেশন' : 'Breadcrumb'} 
      className="inline-flex items-center py-2 px-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm"
    >
      {/* Search Engine structured data markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ol className="flex items-center space-x-2.5 text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const Icon = item.icon;

          return (
            <li key={idx} className="flex items-center">
              {idx > 0 && (
                <ChevronRight size={10} className="mx-2 text-slate-300 dark:text-slate-700" aria-hidden="true" />
              )}
              
              {isLast ? (
                <span className="text-blue-600 dark:text-blue-400 font-extrabold select-none flex items-center gap-1">
                  {item.name}
                  <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                </span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                >
                  {Icon && <Icon size={11} className="text-slate-400" />}
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
