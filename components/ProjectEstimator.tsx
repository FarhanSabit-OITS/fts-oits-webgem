import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Sparkles, ArrowRight, Zap, RefreshCw, Layers, Calendar, DollarSign } from 'lucide-react';

interface ProjectEstimatorProps {
  onEstimateSync: (briefText: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onEstimateSync }) => {
  const { language } = useLanguage();
  
  // Local translations dictionary
  const text = {
    en: {
      title: 'Project Cost Estimator',
      desc: 'Formulate an instant budget and timeline projection for your specialized engineering requirements.',
      serviceType: 'Select Service Architecture',
      complexity: 'Select Operational Scale',
      timeline: 'Est. Timeline',
      range: 'Forecasted Budget Range',
      syncBtn: 'Sync with Contact Brief',
      syncSuccess: 'Estimation Synced!',
      disclaimer: '*Figures represent ballpark estimates based on typical scope benchmarks. Final pricing determined after detailed technical triage.',
      services: [
        { id: 'frontend', name: 'Custom UX / Frontend Spec', baseUsd: 3500, baseBdt: 400000 },
        { id: 'fullstack', name: 'Enterprise SaaS Full-Stack', baseUsd: 7500, baseBdt: 850000 },
        { id: 'specialized', name: 'Frontiers (AI, AR/VR, Web3, IoT)', baseUsd: 12000, baseBdt: 1400000 },
        { id: 'cloud', name: 'Cloud Infrastructure & Devops', baseUsd: 5000, baseBdt: 580000 },
      ],
      complexities: [
        { id: 'mvp', name: 'MVP / Startup Prototype', multiplier: 1.0, duration: '4 - 6 Weeks' },
        { id: 'growth', name: 'Growth Scale / Commercial', multiplier: 1.5, duration: '8 - 12 Weeks' },
        { id: 'enterprise', name: 'Enterprise / High Availability', multiplier: 2.3, duration: '16+ Weeks' },
      ]
    },
    bn: {
      title: 'প্রজেক্ট বাজেট ক্যালকুলেটর',
      desc: 'আপনার বিশেষায়িত ইঞ্জিনিয়ারিং প্রয়োজনীয়তার জন্য তাত্ক্ষণিক বাজেট এবং সময়কাল প্রক্ষেপণ করুন।',
      serviceType: 'সার্ভিস আর্কিটেকচার নির্বাচন করুন',
      complexity: 'অপারেশনাল স্কেল নির্বাচন করুন',
      timeline: 'আনুমানিক সময়কাল',
      range: 'প্রাক্কলিত বাজেট পরিসীমা',
      syncBtn: 'কন্টাক্ট ফর্মের সাথে সিঙ্ক করুন',
      syncSuccess: 'বাজেট সফলভাবে সিঙ্ক হয়েছে!',
      disclaimer: '*প্রদর্শিত হিসাবটি ওআইটিএস ঢাকার সাধারণ ডেপ্লয়মেন্টের উপর ভিত্তি করে তৈরি। বিস্তারিত আলোচনার পর চূড়ান্ত বাজেট নির্ধারণ করা হবে।',
      services: [
        { id: 'frontend', name: 'কাস্টম ইউএক্স / ফ্রন্টএন্ড ডিজাইন', baseUsd: 3500, baseBdt: 400000 },
        { id: 'fullstack', name: 'এন্টারপ্রাইজ ফুল-স্ট্যাক ও স্যাস', baseUsd: 7500, baseBdt: 850000 },
        { id: 'specialized', name: 'টেকনোলজি ফ্রন্টিয়ার্স (AI, Web3, IoT)', baseUsd: 12000, baseBdt: 1400000 },
        { id: 'cloud', name: 'ক্লাউড ইনফ্রাস্ট্রাকচার ও ডিভঅপ্স', baseUsd: 5000, baseBdt: 580000 },
      ],
      complexities: [
        { id: 'mvp', name: 'এমভিপি / স্টার্টআপ প্রোটোটাইপ', multiplier: 1.0, duration: '৪ - ৬ সপ্তাহ' },
        { id: 'growth', name: 'গ্রোথ স্কেল / কমার্শিয়াল প্ল্যাটফর্ম', multiplier: 1.5, duration: '৮ - ১২ সপ্তাহ' },
        { id: 'enterprise', name: 'এন্টারপ্রাইজ / হাই অ্যাভেলেবিলিটি', multiplier: 2.3, duration: '১৬+ সপ্তাহ' },
      ]
    }
  }[language === 'bn' ? 'bn' : 'en'];

  const [selectedService, setSelectedService] = useState(text.services[1].id);
  const [selectedComplexity, setSelectedComplexity] = useState(text.complexities[0].id);
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('BDT');
  const [isSynced, setIsSynced] = useState(false);

  const activeService = text.services.find(s => s.id === selectedService) || text.services[1];
  const activeComplexity = text.complexities.find(c => c.id === selectedComplexity) || text.complexities[0];

  // Price calculations
  const calculatePrice = () => {
    const basePrice = currency === 'USD' ? activeService.baseUsd : activeService.baseBdt;
    const minVal = Math.round(basePrice * activeComplexity.multiplier);
    const maxVal = Math.round(basePrice * activeComplexity.multiplier * 1.25);
    
    const formattedMin = currency === 'USD' 
      ? `$${minVal.toLocaleString()}` 
      : `${minVal.toLocaleString()} ৳`;

    const formattedMax = currency === 'USD' 
      ? `$${maxVal.toLocaleString()}` 
      : `${maxVal.toLocaleString()} ৳`;

    return { min: formattedMin, max: formattedMax, minRaw: minVal, maxRaw: maxVal };
  };

  const priceResult = calculatePrice();

  const handleSyncClick = () => {
    const brief = language === 'bn' 
      ? `[প্রজেক্ট বাজেট প্রাক্কলন] \nসেবা প্রকার: ${activeService.name}\nঅপারেশনাল স্কেল: ${activeComplexity.name}\nআনুমানিক সময়কাল: ${activeComplexity.duration}\nপ্রাক্কলিত বাজেট সীমা: ${priceResult.min} - ${priceResult.max}`
      : `[Project Estimate Brief]\nService Architecture: ${activeService.name}\nOperational Scale: ${activeComplexity.name}\nEst. Timeline: ${activeComplexity.duration}\nBudget Forecast: ${priceResult.min} - ${priceResult.max}`;
    
    onEstimateSync(brief);
    setIsSynced(true);
    setTimeout(() => setIsSynced(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8 font-sans w-full max-w-xl transition-all hover:border-blue-500/30">
      
      {/* Title block */}
      <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider font-mono">
            <Sparkles size={11} /> Estimator Engine
          </div>
          {/* Currency Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-black font-mono">
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-2.5 py-1 rounded-md transition-all ${currency === 'BDT' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-400'}`}
            >
              BDT (৳)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-md transition-all ${currency === 'USD' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-400'}`}
            >
              USD ($)
            </button>
          </div>
        </div>
        <h4 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
          {text.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {text.desc}
        </p>
      </div>

      {/* Inputs Form */}
      <div className="space-y-6">
        
        {/* Service Type Selection */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
            {text.serviceType}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {text.services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s.id)}
                className={`text-left p-3.5 rounded-xl border-2 text-xs font-bold transition-all transition-duration-300 relative flex items-center justify-between group ${
                  selectedService === s.id 
                    ? 'border-blue-600 bg-blue-50/10 text-blue-600 dark:text-blue-400' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{s.name}</span>
                <Zap size={10} className={`opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 ${selectedService === s.id ? 'opacity-100' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Selection */}
        <div className="space-y-2.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
            {text.complexity}
          </label>
          <div className="grid grid-cols-1 gap-2">
            {text.complexities.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedComplexity(c.id)}
                className={`text-left p-4 rounded-xl border-2 text-xs font-bold transition-all transition-duration-300 flex items-center gap-3 relative ${
                  selectedComplexity === c.id 
                    ? 'border-blue-600 bg-blue-50/10 text-blue-600 dark:text-blue-400' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedComplexity === c.id ? 'border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400 scale-105' : 'border-slate-300 dark:border-slate-600 bg-transparent'
                }`}>
                  {selectedComplexity === c.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className="flex-1 flex justify-between items-center sm:gap-4 flex-wrap">
                  <span className="font-bold">{c.name}</span>
                  <span className="font-mono text-[10px] opacity-75">{c.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Outputs Dashboard */}
      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-2xl p-5 space-y-4">
        
        <div className="flex justify-between items-baseline gap-4 flex-wrap">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">
              {text.timeline}
            </span>
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold text-sm">
              <Calendar size={14} className="text-blue-500" />
              <span>{activeComplexity.duration}</span>
            </div>
          </div>

          <div className="space-y-0.5 text-right flex-1 min-w-[150px]">
            <span className="text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500 block">
              {text.range}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight text-glow">
              {priceResult.min} — {priceResult.max}
            </span>
          </div>
        </div>

        {/* Sync Button & Disclaimer */}
        <div className="space-y-2 pt-2 border-t border-slate-200/50 dark:border-slate-900">
          <button
            type="button"
            onClick={handleSyncClick}
            className={`w-full py-3.5 px-5 rounded-xl text-xs font-black uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all active:scale-95 border-2 ${
              isSynced 
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' 
                : 'bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white border-transparent shadow-md'
            }`}
          >
            {isSynced ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                {text.syncSuccess}
              </>
            ) : (
              <>
                {text.syncBtn}
                <ArrowRight size={13} />
              </>
            )}
          </button>
          
          <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-relaxed">
            {text.disclaimer}
          </p>
        </div>

      </div>

    </div>
  );
};
