import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, RefreshCw } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface StatusData {
  status: 'operational' | 'checking';
  uptime: string;
  latency: number;
  lastChecked: string;
}

export const LiveStatus: React.FC = () => {
  const { t, language } = useLanguage();
  const [data, setData] = useState<StatusData>({
    status: 'checking',
    uptime: '99.987%',
    latency: 24,
    lastChecked: '0s ago',
  });
  const [checking, setChecking] = useState(false);
  const [history] = useState<boolean[]>(Array(14).fill(true)); // 14 days of green bars

  const fetchMockStatus = () => {
    setChecking(true);
    // Simulate API request delay
    setTimeout(() => {
      const randomLatency = Math.floor(Math.random() * 15) + 16; // 16ms - 30ms
      const now = new Date();
      const timeStr = now.toLocaleTimeString(language === 'bn' ? 'bn-BD' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setData({
        status: 'operational',
        uptime: '99.987%',
        latency: randomLatency,
        lastChecked: timeStr,
      });
      setChecking(false);
    }, 1200);
  };

  useEffect(() => {
    fetchMockStatus();
    // Auto sync refresh every 30 seconds
    const interval = setInterval(() => {
      fetchMockStatus();
    }, 30000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in duration-500 max-w-sm w-full font-mono text-left">
      {/* Header with Pulse indicator */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs uppercase font-black tracking-widest text-slate-400">
            {t('status_title')}
          </span>
        </div>
        <button 
          onClick={fetchMockStatus}
          disabled={checking}
          className={`p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all ${checking ? 'animate-spin text-blue-400' : 'active:scale-95'}`}
          aria-label="Manually refresh API status check"
        >
          <RefreshCw size={12} />
        </button>
      </div>

      {/* Main Status Metric */}
      <div className="space-y-1">
        <p className="text-sm text-slate-400 uppercase tracking-wider text-[10px] font-black">{t('status_operational')}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white tracking-tight">
            {data.uptime}
          </span>
          <span className="text-[10px] uppercase text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            {t('status_uptime_text')}
          </span>
        </div>
      </div>

      {/* Uptime bars grid */}
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] text-slate-500 font-black uppercase">
          <span>14d ago</span>
          <span>Today</span>
        </div>
        <div className="grid grid-cols-14 gap-1.5 h-6">
          {history.map((ok, idx) => (
            <div 
              key={idx}
              className={`h-full rounded-sm transition-all duration-500 ${
                idx === history.length - 1 && checking 
                  ? 'bg-blue-500/40 animate-pulse' 
                  : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
              }`}
              title={`Day ${idx + 1}: Fully Functional`}
            />
          ))}
        </div>
      </div>

      {/* Secondary Meta metrics */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs font-semibold">
        <div className="space-y-1">
          <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black flex items-center gap-1">
            <Activity size={10} /> {t('status_latency')}
          </p>
          <p className="text-white font-black text-xs">
            {checking ? '...' : `${data.latency} ms`}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black flex items-center gap-1">
            <ShieldCheck size={10} /> {t('status_checks')}
          </p>
          <p className="text-slate-300 text-[10px] uppercase tracking-tighter truncate leading-tight font-black">
            {checking ? 'checking...' : data.lastChecked}
          </p>
        </div>
      </div>
    </div>
  );
};
