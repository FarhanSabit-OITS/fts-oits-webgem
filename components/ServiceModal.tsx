import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Globe, Smartphone, Users, Cloud, Terminal, Cpu } from 'lucide-react';
import { Service } from '../types';

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
  Smartphone: <Smartphone className="w-6 h-6 md:w-8 md:h-8" />,
  Users: <Users className="w-6 h-6 md:w-8 md:h-8" />,
  Cloud: <Cloud className="w-6 h-6 md:w-8 md:h-8" />,
  Terminal: <Terminal className="w-6 h-6 md:w-8 md:h-8" />,
};

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-950 dark:hover:text-white transition-all hover:rotate-90 active:scale-90"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Sidebar/Visual Side */}
              <div className="w-full md:w-2/5 p-10 md:p-14 bg-slate-50 dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20 mb-10">
                    {iconMap[service.icon] || <Cpu className="w-8 h-8" />}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-none mb-6">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-bold leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">Core Capabilities</div>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 p-10 md:p-14 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
                <div className="max-w-2xl">
                  <section className="mb-12">
                    <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6 border-b border-blue-500/10 pb-2">Technical Overview</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed mb-8">
                      {service.longDescription || 'Our enterprise-grade approach ensures your solution is built on a foundation of security, scalability, and performance.'}
                    </p>
                  </section>

                  {service.technicalSpecs && (
                    <section className="mb-12">
                      <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-8 border-b border-blue-500/10 pb-2">Stack Specifications</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {service.technicalSpecs.map((spec, idx) => (
                          <div key={idx} className="group">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 group-hover:text-blue-600 transition-colors">
                              {spec.label}
                            </div>
                            <div className="text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-8 border-b border-blue-500/10 pb-2">Business Outcome</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                        <CheckCircle2 className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Architecture Longevity</h4>
                          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed">Engineered for a 5-year technology cycle with modular growth patterns.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Performance Benchmarks</h4>
                          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed">Targeting sub-200ms latency and 90+ Lighthouse scores across all metrics.</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
