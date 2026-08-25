import React, { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_EMAIL } from '../constants';

interface CopyEmailButtonProps {
  className?: string;
  showIconBg?: boolean;
  variant?: 'standard' | 'compact';
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({ 
  className = '', 
  showIconBg = true,
  variant = 'standard'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          onClick={handleCopy}
          id="copy-email-footer-trigger"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-mono text-[10px] select-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          aria-label="Copy contact email address to clipboard"
        >
          {copied ? (
            <Check size={14} className="text-emerald-500 animate-pulse stroke-[2.5]" />
          ) : (
            <Mail size={14} className="text-[#38BDF8]" />
          )}
          <span>{CONTACT_EMAIL}</span>
        </button>

        {/* Elegant Floating Toast/Tooltip */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: -36, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest shadow-xl border border-slate-800 dark:border-slate-100 pointer-events-none flex items-center gap-1.5 whitespace-nowrap z-50"
            >
              <Check size={9} className="text-emerald-500 dark:text-emerald-600 stroke-[3]" />
              <span>Copied!</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-900 dark:bg-white border-r border-b border-slate-800 dark:border-slate-100 rotate-45 -mt-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {showIconBg && (
        <div className="p-3 rounded-2xl bg-sky-500/10 text-[#38BDF8] shrink-0 border border-sky-500/10">
          <Mail size={20} />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
          Direct Inquiries
        </p>
        
        <div className="relative inline-flex items-center gap-2 group">
          <button
            onClick={handleCopy}
            id="copy-email-address-trigger"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-mono text-xs font-bold shadow-sm select-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            aria-label="Copy contact email address to clipboard"
          >
            <span className="truncate">{CONTACT_EMAIL}</span>
            <div className="shrink-0 transition-transform group-hover:scale-105">
              {copied ? (
                <Check size={14} className="text-emerald-500 animate-pulse stroke-[2.5]" />
              ) : (
                <Copy size={13} className="opacity-70 group-hover:opacity-100" />
              )}
            </div>
          </button>

          {/* Elegant Floating Toast/Tooltip */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -42, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest shadow-xl border border-slate-800 dark:border-slate-100 pointer-events-none flex items-center gap-1.5 whitespace-nowrap z-50"
              >
                <Check size={10} className="text-emerald-500 dark:text-emerald-600 stroke-[3]" />
                <span>Copied!</span>
                {/* Micro caret indicator */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white border-r border-b border-slate-800 dark:border-slate-100 rotate-45 -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
