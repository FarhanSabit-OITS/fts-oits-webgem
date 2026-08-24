import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ContactFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose, isModal = false }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'bn' ? 'আপনার নাম দেয়া আবশ্যক' : 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = language === 'bn' ? 'নাম কমপক্ষে ২ অক্ষরের হতে হবে' : 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = language === 'bn' ? 'ইমেল নম্বর দেয়া আবশ্যক' : 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = language === 'bn' ? 'সঠিক ইমেল প্রদান করুন' : 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = language === 'bn' ? 'বার্তা প্রদান আবশ্যক' : 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = language === 'bn' ? 'বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে' : 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate mock email transmission API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 1200);
  };

  const handleChange = (field: 'name' | 'email' | 'message', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div 
      role={isModal ? "dialog" : "region"}
      aria-labelledby="contact-form-title"
      aria-modal={isModal ? "true" : undefined}
      className={`w-full max-w-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative transition-all ${isModal ? 'mx-auto' : ''}`}
    >
      {isModal && onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:scale-110 transition-all"
          aria-label={language === 'bn' ? 'সংলাপটি বন্ধ করুন' : 'Close contact dialog'}
        >
          <X size={18} />
        </button>
      )}

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-500/20">
          {language === 'bn' ? 'সরাসরি চ্যানেল' : 'Direct Channel'}
        </div>
        <h3 id="contact-form-title" className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white tracking-tight uppercase">
          {language === 'bn' ? 'ইঞ্জিনিয়ারিং টিমের সাথে যোগাযোগ' : 'Connect with Engineering'}
        </h3>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-2">
          {language === 'bn' ? 'ঢাকার প্রধান প্রকৌশলী দলের কাছে সরাসরি বার্তা পাঠান।' : 'Send a direct message to our core engineering team in Dhaka.'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="status"
            aria-live="polite"
            className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-2">
              Transmission Received
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold max-w-xs mb-6">
              Thank you for reaching out. An engineer will respond to your inquiry within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact Engineering Form">
            {/* Name Field */}
            <div>
              <label htmlFor="contact-name" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Full Name <span className="text-blue-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </div>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Sabit Rahman"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 font-bold text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.name && (
                <p id="contact-name-error" className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="contact-email" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Email Address <span className="text-blue-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 font-bold text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p id="contact-email-error" className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="contact-message" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Project Scope / Message <span className="text-blue-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400">
                  <MessageSquare size={16} />
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Describe your inquiry or technical requirements..."
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 font-bold text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Transmit Inquiry <Send size={15} />
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};
