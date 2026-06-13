import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { Activity } from 'lucide-react';

export const PerformanceMonitor: React.FC = () => {
  const { language } = useLanguage();
  const [loadTime, setLoadTime] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const frameCount = useRef<number>(0);
  const lastTime = useRef<number>(performance.now());

  useEffect(() => {
    // Measure paint load time safely
    const calcLoad = () => {
      // Use standard performance metrics if available, otherwise native high precision timers
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const pageLoad = timing.loadEventEnd - timing.navigationStart;
        if (pageLoad > 0) {
          setLoadTime(pageLoad);
          return;
        }
      }
      // Fallback to active runtime measurement
      setLoadTime(Math.round(performance.now()));
    };

    // Calculate once load is finished
    if (document.readyState === 'complete') {
      calcLoad();
    } else {
      window.addEventListener('load', calcLoad, { passive: true });
      return () => window.removeEventListener('load', calcLoad);
    }
  }, []);

  useEffect(() => {
    // Smooth frame-rate (FPS) tracker
    let animationFrameId: number;

    const tick = () => {
      frameCount.current += 1;
      const now = performance.now();
      const elapsed = now - lastTime.current;

      if (elapsed >= 1000) {
        const measuredFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(Math.min(measuredFps, 60)); // clamp to standard refresh
        frameCount.current = 0;
        lastTime.current = now;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const localizedLoadTime = language === 'bn' 
    ? `${loadTime.toLocaleString('bn-BD')} এমএস` 
    : `${loadTime} ms`;

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-mono font-black uppercase text-slate-400 select-none shadow-inner">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <div className="flex items-center gap-2">
        <Activity size={10} className="text-blue-500" />
        <span className="text-slate-500 font-bold">{language === 'bn' ? 'লোড টাইম:' : 'LOAD TIME:'}</span>
        <span className="text-emerald-400 font-bold">{localizedLoadTime}</span>
      </div>
      <span className="text-slate-800 font-bold">|</span>
      <div className="flex items-center gap-1">
        <span className="text-slate-500 font-bold">FPS:</span>
        <span className="text-blue-400 font-bold">{fps}</span>
      </div>
    </div>
  );
};
