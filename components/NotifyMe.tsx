import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, BellRing, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { analytics } from '../utils/analytics';
import { triggerConfetti } from '../utils/confetti';

export const NotifyMe: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(language === 'bn' ? 'অনুগ্রহ করে ইমেল নম্বর দিন' : 'Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(language === 'bn' ? 'সঠিক ইমেল প্রদান করুন' : 'Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitting(true);
    analytics.track('newsletter_subscription_attempt', { email: email.trim() });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      analytics.track('newsletter_subscription_success', { email: email.trim() });
      triggerConfetti();
      setEmail('');
    }, 1000);
  };

  return (
    <div className="w-full bg-slate-900/90 dark:bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden text-white shadow-xl">
      {/* Subtle Background Glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
          <BellRing size={16} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
          {language === 'bn' ? 'অগ্রাধিকার সুবিধা' : 'Priority Access'}
        </span>
      </div>

      <h4 className="text-xl md:text-2xl font-black tracking-tight uppercase mb-2">
        {language === 'bn' ? 'লঞ্চে নোটিফিকেশন পান' : 'Get Notified At Launch'}
      </h4>
      <p className="text-xs font-bold text-slate-400 max-w-md mb-6 leading-relaxed">
        {language === 'bn' 
          ? 'আমাদের প্ল্যাটফর্ম আপডেট ও নতুন রিলিজ সম্পর্কে সবার আগে নোটিফিকেশন পেতে যুক্ত থাকুন।'
          : 'Be the first to access our new platform updates, technical research, and service availability.'}
      </p>

      {isSubscribed ? (
        <div role="status" aria-live="polite" className="p-4 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center gap-3 text-blue-200">
          <CheckCircle2 size={20} className="text-blue-400 shrink-0" />
          <div className="text-xs font-bold">
            {language === 'bn' 
              ? 'আপনি প্রায়োরিটি লিস্টে যুক্ত হয়েছেন! লঞ্চ করার সাথে সাথে আমরা আপনাকে অবহিত করব।'
              : "You're on the priority list! We'll reach out when we go live."}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3" aria-label="Launch Notification Subscription Form">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="notify-email" className="sr-only">Work Email Address</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Mail size={16} />
              </div>
              <input
                id="notify-email"
                type="email"
                value={email}
                aria-required="true"
                aria-label="Enter work email address for launch notification"
                aria-invalid={!!error}
                aria-describedby={error ? 'notify-email-error' : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder={language === 'bn' ? 'কর্মক্ষেত্রের ইমেল দিন...' : 'Enter work email address...'}
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-950 border-2 text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all ${
                  error ? 'border-red-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-label="Subscribe to launch notification"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {language === 'bn' ? 'নোটিফিকেশন পান' : 'Notify Me'} <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
          {error && (
            <p id="notify-email-error" className="text-xs font-bold text-red-400 flex items-center gap-1 mt-1" role="alert">
              <AlertCircle size={12} /> {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

