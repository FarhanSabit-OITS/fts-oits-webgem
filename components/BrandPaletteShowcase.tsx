import React, { useState } from 'react';
import { Palette, Check, Sparkles, Copy } from 'lucide-react';

interface ColorSwatch {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  category: 'Primary' | 'Secondary' | 'Neutral' | 'Accent';
}

export const BrandPaletteShowcase: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const swatches: ColorSwatch[] = [
    { name: 'Emerald Glow', hex: '#10B981', rgb: '16, 185, 129', usage: 'Borders, glowing accents, success states, and badges', category: 'Primary' },
    { name: 'Sky Cyan', hex: '#38BDF8', rgb: '56, 189, 248', usage: 'Interactive highlights, tech labels, and links', category: 'Primary' },
    { name: 'OITS Obsidian', hex: '#0A0F1D', rgb: '10, 15, 29', usage: 'Dark mode deep background & card surfaces', category: 'Neutral' },
    { name: 'Slate Dark', hex: '#1E293B', rgb: '30, 41, 59', usage: 'Secondary container cards and dividers in dark mode', category: 'Neutral' },
    { name: 'Brownish Brand Bronze', hex: '#B45309', rgb: '180, 83, 9', usage: 'Schedule a call button hover state & warm highlights', category: 'Accent' },
    { name: 'Indigo Depth', hex: '#4F46E5', rgb: '79, 70, 229', usage: 'CTA gradients, primary buttons, and deep badges', category: 'Secondary' },
    { name: 'Slate Light', hex: '#F8FAFC', rgb: '248, 250, 252', usage: 'Light mode canvas & clean backgrounds', category: 'Neutral' },
    { name: 'Charcoal Text', hex: '#0F172A', rgb: '15, 23, 42', usage: 'Primary typography & high contrast headings', category: 'Neutral' },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const categories = ['All', 'Primary', 'Secondary', 'Accent', 'Neutral'];

  const filteredSwatches = activeCategory === 'All' 
    ? swatches 
    : swatches.filter(s => s.category === activeCategory);

  return (
    <section id="brand-palette" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#070A13] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#10B981] text-xs font-mono font-bold uppercase tracking-wider">
            <Palette size={14} />
            <span>Design System & Aesthetics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            OITS Dhaka Brand Color Palette
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Swiss-Modern editorial color hierarchy balancing high-contrast obsidian dark themes, glowing emerald borders, and warm bronze accents.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#10B981] text-slate-950 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#10B981]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSwatches.map((swatch, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Color Box */}
                <div
                  className="w-full h-32 rounded-2xl shadow-inner border border-black/10 dark:border-white/10 relative flex items-end justify-end p-3 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <button
                    onClick={() => handleCopy(swatch.hex)}
                    className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-mono"
                    title="Copy HEX code"
                  >
                    {copiedHex === swatch.hex ? (
                      <>
                        <Check size={14} className="text-[#10B981]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{swatch.hex}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-950 dark:text-white">{swatch.name}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {swatch.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>HEX: <strong className="text-slate-800 dark:text-slate-200">{swatch.hex}</strong></span>
                    <span>RGB: {swatch.rgb}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {swatch.usage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Guidelines Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-blue-500/15 to-indigo-500/10 border border-emerald-500/20 dark:border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#10B981] font-bold text-sm">
              <Sparkles size={16} />
              <span>Swiss-Modern Editorial Theme Compliance</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              All components strictly observe WCAG AA contrast guidelines, maintaining high legibility across both obsidian dark and clean light modes with glowing emerald and warm bronze micro-accents.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('global-header');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-[#10B981] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:opacity-90 transition-all shrink-0"
          >
            Back to Top Navigation
          </button>
        </div>

      </div>
    </section>
  );
};
