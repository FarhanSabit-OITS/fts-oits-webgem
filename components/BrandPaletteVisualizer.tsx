import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Check, 
  Copy, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Eye, 
  SlidersHorizontal,
  Code
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  textDark: boolean; // true if text on this bg should be white
  wcagWhite: string;
  wcagBlack: string;
  description: string;
  source: string;
}

export const BRAND_COLORS: ColorSwatch[] = [
  {
    name: 'OITS Deep Navy',
    role: 'Primary Canvas & Brand Core',
    hex: '#070a13',
    rgb: 'rgb(7, 10, 19)',
    textDark: true,
    wcagWhite: '19.8:1 (AAA)',
    wcagBlack: '1.05:1',
    description: 'Ultra-deep obsidian navy (--oits-deep-navy). The signature dark theme canvas delivering crisp Swiss-Modern contrast without harsh pitch-black clipping.',
    source: 'CSS Variable: var(--oits-deep-navy)',
  },
  {
    name: 'OITS Midnight Navy',
    role: 'Structural Surface & Cards',
    hex: '#0f172a',
    rgb: 'rgb(15, 23, 42)',
    textDark: true,
    wcagWhite: '16.2:1 (AAA)',
    wcagBlack: '1.3:1',
    description: 'Sophisticated midnight slate (--oits-midnight-navy). Used for elevated card surfaces, modal dialogs, and navigation backdrops.',
    source: 'CSS Variable: var(--oits-midnight-navy)',
  },
  {
    name: 'OITS Blue-600',
    role: 'Interactive Brand Cobalt',
    hex: '#2563eb',
    rgb: 'rgb(37, 99, 235)',
    textDark: true,
    wcagWhite: '4.6:1 (AA)',
    wcagBlack: '4.6:1 (AA)',
    description: 'High-energy electric cobalt (--oits-blue-600). The primary interactive token for buttons, active navigation, and focus rings.',
    source: 'CSS Variable: var(--oits-blue-600)',
  },
  {
    name: 'OITS Logo Navy Seal',
    role: 'Original Emblem Seal',
    hex: '#1D2A68',
    rgb: 'rgb(29, 42, 104)',
    textDark: true,
    wcagWhite: '11.8:1 (AAA)',
    wcagBlack: '1.8:1',
    description: 'The exact signature navy blue from the original OITS circular logo seal. Represents engineering trust and institutional identity.',
    source: 'Extracted directly from Logo.png',
  },
  {
    name: 'OITS Rich Charcoal',
    role: 'Primary Wordmark & Display',
    hex: '#0A0D14',
    rgb: 'rgb(10, 13, 20)',
    textDark: true,
    wcagWhite: '18.9:1 (AAA)',
    wcagBlack: '1.1:1',
    description: 'The ultra-crisp charcoal black from the "oits dhaka ltd" wordmark typography. Provides supreme high-contrast legibility in light mode.',
    source: 'Extracted from "oits" wordmark in Logo.png',
  },
  {
    name: 'OITS Sky Cyan',
    role: 'Micro-accent & Glowing Indicator',
    hex: '#38BDF8',
    rgb: 'rgb(56, 189, 248)',
    textDark: false,
    wcagWhite: '1.6:1',
    wcagBlack: '13.1:1 (AAA)',
    description: 'Vibrant highlight color for badges, live pulse rings, technology tags, and gradient endpoints.',
    source: 'Dynamic highlight pairing',
  },
  {
    name: 'OITS Pure White',
    role: 'Dark Mode Inversion & Canvas',
    hex: '#FFFFFF',
    rgb: 'rgb(255, 255, 255)',
    textDark: false,
    wcagWhite: '1:1',
    wcagBlack: '21:1 (AAA)',
    description: 'The crisp monochrome white from Logo-White.png used for dark theme emblems and high-contrast surfaces.',
    source: 'Extracted from Logo-White.png',
  },
  {
    name: 'OITS Ice Slate',
    role: 'Light Mode Canvas Surface',
    hex: '#F8FAFC',
    rgb: 'rgb(248, 250, 252)',
    textDark: false,
    wcagWhite: '1.05:1',
    wcagBlack: '20.0:1 (AAA)',
    description: 'Calibrated ultra-light cool slate canvas background ensuring 0% eye strain and crisp card container boundaries.',
    source: 'Light mode backdrop foundation',
  },
  {
    name: 'OITS Emerald Mint',
    role: 'Status & Fintech Indicator',
    hex: '#10B981',
    rgb: 'rgb(16, 185, 129)',
    textDark: true,
    wcagWhite: '3.1:1',
    wcagBlack: '6.8:1 (AAA)',
    description: 'Clean positive indicator for uptime badges, fintech ROI metrics, and confirmed deployment states.',
    source: 'Semantic success indicator',
  },
  {
    name: 'OITS Signal Amber',
    role: 'Editorial Attention Accent',
    hex: '#F59E0B',
    rgb: 'rgb(245, 158, 11)',
    textDark: false,
    wcagWhite: '2.1:1',
    wcagBlack: '9.8:1 (AAA)',
    description: 'Warm editorial accent for high-priority announcements, quotation highlights, and system tags.',
    source: 'Editorial alert indicator',
  }
];

export interface PalettePreset {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  recommendedFor: string;
  primaryBg: string;
  surfaceBg: string;
  primaryBrand: string;
  accent: string;
  textPrimary: string;
  textMuted: string;
  borderColor: string;
  logoTheme: 'light' | 'dark';
}

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    id: 'swiss-precision',
    title: '1. Swiss-Modern Deep Navy System',
    tagline: 'Deep Navy (#070a13) backdrop, Midnight Navy (#0f172a) card surfaces, and Blue-600 (#2563eb) action accents.',
    badge: 'Core CSS Tokens',
    recommendedFor: 'Global corporate presence, modern SaaS platforms, engineering studio portfolio.',
    primaryBg: '#070a13',
    surfaceBg: '#0f172a',
    primaryBrand: '#070a13',
    accent: '#2563eb',
    textPrimary: '#FFFFFF',
    textMuted: '#94a3b8',
    borderColor: '#1e293b',
    logoTheme: 'dark',
  },
  {
    id: 'light-clean',
    title: '2. Light Mode Clean Editorial',
    tagline: 'Ice Slate (#F8FAFC) canvas with OITS Navy (#1D2A68) branding, Blue-600 (#2563eb) buttons, and Charcoal text.',
    badge: 'Light Theme',
    recommendedFor: 'Daylight readability, investor reports, client whitepapers.',
    primaryBg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    primaryBrand: '#1D2A68',
    accent: '#2563eb',
    textPrimary: '#0A0D14',
    textMuted: '#64748B',
    borderColor: '#E2E8F0',
    logoTheme: 'light',
  },
  {
    id: 'enterprise-midnight',
    title: '3. Enterprise Midnight & Mint',
    tagline: 'Midnight Navy (#0f172a) surfaces with Mint (#10B981) positive indicators & Blue-600 accents.',
    badge: 'Fintech & Security',
    recommendedFor: 'Enterprise banking, cloud infrastructure dashboards, mission-critical systems.',
    primaryBg: '#070a13',
    surfaceBg: '#0f172a',
    primaryBrand: '#0f172a',
    accent: '#10B981',
    textPrimary: '#FFFFFF',
    textMuted: '#94A3B8',
    borderColor: '#1E293B',
    logoTheme: 'dark',
  }
];

export const BrandPaletteVisualizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<PalettePreset>(PALETTE_PRESETS[0]);
  const [testBackground, setTestBackground] = useState<string>('#1D2A68');
  const [activeTab, setActiveTab] = useState<'palettes' | 'swatches' | 'logotester'>('palettes');

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button on Preview */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-brand-navy via-brand-cobalt to-blue-700 text-white font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-blue-500/25 border border-white/20 backdrop-blur-md flex items-center gap-2.5 group transition-all"
        aria-label="View OITS Brand Color Palettes"
      >
        <Palette size={16} className="text-sky-300 group-hover:rotate-45 transition-transform duration-300" />
        <span className="hidden sm:inline">OITS Brand Palettes</span>
        <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-mono">10 Colors</span>
      </motion.button>

      {/* Full Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 text-slate-100 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center border border-white/20 shadow-inner">
                    <BrandLogo variant="icon" theme="dark" height={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                      OITS Dhaka Brand Color System
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-medium border border-blue-500/30">
                        Design Tokens
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      Extracted from original OITS vector marks & calibrated for Swiss-Modern interface engineering
                    </p>
                  </div>
                </div>

                {/* Tabs & Close */}
                <div className="flex items-center gap-2">
                  <div className="bg-slate-800/80 p-1 rounded-xl flex items-center gap-1 border border-slate-700">
                    <button
                      onClick={() => setActiveTab('palettes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === 'palettes'
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers size={13} /> Preset Palettes
                    </button>
                    <button
                      onClick={() => setActiveTab('swatches')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === 'swatches'
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Palette size={13} /> All Color Tokens
                    </button>
                    <button
                      onClick={() => setActiveTab('logotester')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        activeTab === 'logotester'
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Eye size={13} /> Logo Tester
                    </button>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-8 bg-slate-900/50">
                {/* TAB 1: PRESET PALETTES VISUALIZER */}
                {activeTab === 'palettes' && (
                  <div className="space-y-8">
                    {/* Palette Selector Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {PALETTE_PRESETS.map((preset) => (
                        <div
                          key={preset.id}
                          onClick={() => setSelectedPalette(preset)}
                          className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                            selectedPalette.id === preset.id
                              ? 'bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/50'
                              : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {preset.badge}
                              </span>
                              {selectedPalette.id === preset.id && (
                                <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs shadow">
                                  <Check size={12} strokeWidth={3} />
                                </span>
                              )}
                            </div>
                            <h3 className="text-base font-bold text-white mb-1.5">{preset.title}</h3>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">{preset.tagline}</p>
                          </div>

                          {/* Color bar preview */}
                          <div className="space-y-2">
                            <div className="h-6 rounded-lg overflow-hidden flex shadow-inner border border-slate-700/60">
                              <div style={{ backgroundColor: preset.primaryBg, width: '25%' }} title={`Canvas: ${preset.primaryBg}`} />
                              <div style={{ backgroundColor: preset.surfaceBg, width: '25%' }} title={`Surface: ${preset.surfaceBg}`} />
                              <div style={{ backgroundColor: preset.primaryBrand, width: '25%' }} title={`Brand: ${preset.primaryBrand}`} />
                              <div style={{ backgroundColor: preset.accent, width: '25%' }} title={`Accent: ${preset.accent}`} />
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                              <span>{preset.primaryBrand}</span>
                              <span>{preset.accent}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* LIVE INTERACTIVE PREVIEW CANVAS */}
                    <div className="rounded-3xl border border-slate-700/80 overflow-hidden shadow-2xl bg-slate-950">
                      <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <SlidersHorizontal size={16} className="text-blue-400" />
                          <span className="text-sm font-bold text-white">
                            Live UI Simulation: <span className="text-blue-400 font-mono">{selectedPalette.title}</span>
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          Canvas: {selectedPalette.primaryBg} | Surface: {selectedPalette.surfaceBg}
                        </span>
                      </div>

                      {/* Mockup Canvas */}
                      <div 
                        className="p-8 sm:p-12 transition-colors duration-500"
                        style={{ backgroundColor: selectedPalette.primaryBg }}
                      >
                        {/* Mock Navigation Header */}
                        <div 
                          className="rounded-2xl p-4 sm:px-6 mb-8 flex items-center justify-between shadow-md transition-colors duration-300 border"
                          style={{ 
                            backgroundColor: selectedPalette.surfaceBg, 
                            borderColor: selectedPalette.borderColor,
                            color: selectedPalette.textPrimary 
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <BrandLogo theme={selectedPalette.logoTheme} height={32} />
                          </div>

                          <div className="hidden sm:flex items-center gap-6 text-xs font-semibold" style={{ color: selectedPalette.textMuted }}>
                            <span className="hover:opacity-100 cursor-pointer" style={{ color: selectedPalette.textPrimary }}>Services</span>
                            <span className="hover:opacity-100 cursor-pointer">Tech Stack</span>
                            <span className="hover:opacity-100 cursor-pointer">Process</span>
                            <span className="hover:opacity-100 cursor-pointer">Insights</span>
                          </div>

                          <button 
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-2 transition-transform hover:scale-105"
                            style={{ backgroundColor: selectedPalette.accent }}
                          >
                            <span>Get a Quote</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>

                        {/* Mock Hero & Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Left 2 Cols: Main Hero Pitch */}
                          <div 
                            className="md:col-span-2 rounded-2xl p-6 sm:p-8 border shadow-sm flex flex-col justify-between"
                            style={{ 
                              backgroundColor: selectedPalette.surfaceBg, 
                              borderColor: selectedPalette.borderColor 
                            }}
                          >
                            <div>
                              <div 
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 border"
                                style={{ 
                                  backgroundColor: `${selectedPalette.accent}15`, 
                                  color: selectedPalette.accent,
                                  borderColor: `${selectedPalette.accent}30` 
                                }}
                              >
                                <Sparkles size={12} /> Swiss-Modern Engineering
                              </div>

                              <h4 
                                className="text-2xl sm:text-3xl font-black tracking-tight mb-3 leading-tight"
                                style={{ color: selectedPalette.textPrimary }}
                              >
                                Transforming Ideas Into High-Performance Digital Reality.
                              </h4>

                              <p 
                                className="text-sm leading-relaxed mb-6"
                                style={{ color: selectedPalette.textMuted }}
                              >
                                OITS Dhaka provides enterprise web architectures, cloud infrastructure, and intelligent AI features calibrated for scale.
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t" style={{ borderColor: selectedPalette.borderColor }}>
                              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: selectedPalette.textMuted }}>
                                <ShieldCheck size={15} style={{ color: selectedPalette.accent }} />
                                <span>ISO 27001 Certified Security</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-mono ml-auto" style={{ color: selectedPalette.textMuted }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedPalette.accent }} />
                                <span>100% Uptime Guarantee</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Col: Metric Card with OITS Deep Navy */}
                          <div 
                            className="rounded-2xl p-6 sm:p-8 border shadow-sm flex flex-col justify-between text-white"
                            style={{ 
                              backgroundColor: selectedPalette.primaryBrand, 
                              borderColor: selectedPalette.borderColor 
                            }}
                          >
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200">
                                Official Brand Seal
                              </span>
                              <div className="my-4">
                                <BrandLogo variant="icon" theme="dark" height={50} />
                              </div>
                              <div className="text-3xl font-black tracking-tight text-white mb-1">
                                #1D2A68
                              </div>
                              <div className="text-xs text-blue-200">
                                OITS Deep Navy Primary Seal
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/20 text-[11px] text-blue-100 flex items-center justify-between">
                              <span>WCAG Rating:</span>
                              <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded font-mono">AAA 11.8:1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: ALL INDIVIDUAL COLOR SWATCHES */}
                {activeTab === 'swatches' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {BRAND_COLORS.map((color) => (
                        <div
                          key={color.hex}
                          className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col"
                        >
                          {/* Color Visual Block */}
                          <div
                            className="h-28 p-4 flex flex-col justify-between relative group cursor-pointer"
                            style={{ backgroundColor: color.hex }}
                            onClick={() => handleCopy(color.hex)}
                          >
                            <div className="flex justify-between items-start">
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md ${
                                  color.textDark ? 'bg-black/30 text-white' : 'bg-white/40 text-black'
                                }`}
                              >
                                {color.role}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(color.hex);
                                }}
                                className={`p-1.5 rounded-lg backdrop-blur-md transition-transform active:scale-90 ${
                                  color.textDark ? 'bg-black/40 text-white hover:bg-black/60' : 'bg-white/60 text-black hover:bg-white/80'
                                }`}
                                title="Copy HEX Code"
                              >
                                {copiedHex === color.hex ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                              </button>
                            </div>

                            <div className="flex items-baseline justify-between">
                              <span
                                className={`font-mono text-base font-black tracking-wider ${
                                  color.textDark ? 'text-white' : 'text-slate-950'
                                }`}
                              >
                                {color.hex}
                              </span>
                              <span
                                className={`text-[11px] font-mono ${
                                  color.textDark ? 'text-white/80' : 'text-slate-900/80'
                                }`}
                              >
                                {color.rgb}
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-sm font-bold text-white">{color.name}</h4>
                              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{color.description}</p>
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] font-mono text-slate-400">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Source:</span>
                                <span className="text-slate-300 text-right truncate max-w-[150px]">{color.source}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">White Contrast:</span>
                                <span className="text-emerald-400 font-semibold">{color.wcagWhite}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: INTERACTIVE LOGO ON BACKGROUND TESTER */}
                {activeTab === 'logotester' && (
                  <div className="space-y-6">
                    <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
                      <h3 className="text-base font-bold text-white mb-2">Interactive Logo Background Contrast Tester</h3>
                      <p className="text-xs text-slate-400 mb-6">
                        Click any color swatch below to preview how the Light and Dark OITS Logo variations render on top of that specific brand background:
                      </p>

                      {/* Swatch Selector */}
                      <div className="flex flex-wrap gap-2.5 mb-8">
                        {BRAND_COLORS.map((color) => (
                          <button
                            key={color.hex}
                            onClick={() => setTestBackground(color.hex)}
                            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                              testBackground === color.hex
                                ? 'ring-2 ring-blue-500 border-white text-white'
                                : 'border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                            style={{ backgroundColor: testBackground === color.hex ? '#1E293B' : '#0F172A' }}
                          >
                            <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: color.hex }} />
                            <span>{color.name} ({color.hex})</span>
                          </button>
                        ))}
                      </div>

                      {/* Preview Box */}
                      <div 
                        className="rounded-3xl p-10 sm:p-14 border transition-colors duration-500 flex flex-col items-center justify-center gap-10 shadow-inner"
                        style={{ backgroundColor: testBackground }}
                      >
                        {/* Auto-detected mode */}
                        <div className="text-center space-y-3">
                          <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 text-white backdrop-blur-md">
                            1. Light Mode Brand Logo on {testBackground}
                          </span>
                          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 inline-block shadow-lg">
                            <BrandLogo theme="light" height={52} />
                          </div>
                        </div>

                        {/* Dark Mode Inversion */}
                        <div className="text-center space-y-3">
                          <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 text-white backdrop-blur-md">
                            2. Dark Mode Monochrome Pure White Logo on {testBackground}
                          </span>
                          <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 inline-block shadow-lg">
                            <BrandLogo theme="dark" height={52} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Code size={14} className="text-blue-400" />
                  <span>CSS Variables: <code className="font-mono text-blue-300">--oits-deep-navy (#070a13)</code>, <code className="font-mono text-blue-300">--oits-midnight-navy (#0f172a)</code>, <code className="font-mono text-blue-300">--oits-blue-600 (#2563eb)</code></span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopy('#070a13')}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-white transition-colors flex items-center gap-1.5"
                  >
                    <Copy size={12} /> Copy Deep Navy (#070a13)
                  </button>
                  <button
                    onClick={() => handleCopy('#0f172a')}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-white transition-colors flex items-center gap-1.5"
                  >
                    <Copy size={12} /> Copy Midnight (#0f172a)
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrandPaletteVisualizer;
