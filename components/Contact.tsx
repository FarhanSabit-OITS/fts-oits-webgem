
import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { ADDRESS, CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
      if (entry.isIntersecting) { 
        setIsVisible(true); 
        observer.disconnect(); 
      } 
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full identity';
    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'That email format is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Please describe your project mission';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 6000);
    }, 2000);
  };

  return (
    <section 
      ref={sectionRef} 
      id={SectionId.CONTACT} 
      className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[45%] h-full bg-blue-100/40 dark:bg-blue-900/5 -skew-x-12 transform translate-x-1/4 pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start">
          
          <div className="space-y-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-900 dark:text-blue-300 text-[11px] font-black uppercase tracking-[0.25em] mb-8 shadow-sm ring-1 ring-blue-500/30">
                <Sparkles size={16} className="text-blue-600" /> Partner With Us
              </div>
              <h3 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-slate-950 dark:text-white">
                Let's architect <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x">your legacy.</span>
              </h3>
            </div>
            
            <p className={`text-slate-700 dark:text-slate-300 text-xl font-medium max-w-lg transition-all duration-1000 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ready to modernize your infrastructure? Connect with our senior engineers today.
            </p>

            <div className="space-y-12 pt-6">
              <div className={`flex items-start gap-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-blue-500/5 ring-1 ring-slate-100 dark:ring-slate-700">
                  <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3">Reach Us Directly</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-2xl md:text-3xl font-black text-slate-950 dark:text-slate-100 tracking-tight">{CONTACT_EMAIL}</p>
                    <button 
                      onClick={handleCopyEmail} 
                      className={`relative flex items-center justify-center p-4 rounded-2xl transition-all duration-500 border-2 ${
                        isCopied 
                        ? 'bg-green-600 border-green-600 text-white scale-110 shadow-[0_0_25px_rgba(22,163,74,0.3)]' 
                        : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border-slate-200 dark:border-slate-800 shadow-md'
                      }`} 
                      aria-label={isCopied ? "Email copied" : "Copy email address"}
                    >
                      {isCopied ? (
                        <Check size={22} className="animate-in zoom-in spin-in-45 duration-500 stroke-[3px]" />
                      ) : (
                        <Copy size={22} />
                      )}
                      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 text-[10px] bg-slate-950 text-white rounded-xl shadow-2xl transition-all font-black uppercase tracking-widest ${isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                        Copied To Clipboard
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className={`bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[4rem] border-2 border-slate-200 dark:border-slate-800 shadow-[0_60px_100px_-30px_rgba(0,0,0,0.12)] dark:shadow-none transition-all duration-500 ${status === 'sending' ? 'scale-[0.98] blur-[0.5px]' : 'scale-100'}`}>
              
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700 py-20">
                  <div className="w-32 h-32 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-10 shadow-2xl shadow-green-500/10">
                    <CheckCircle2 size={64} className="stroke-[2.5px]" />
                  </div>
                  <h4 className="text-4xl font-black mb-4 text-slate-950 dark:text-white tracking-tighter">Mission Received</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-sm font-medium">Your request has been securely dispatched to our strategy team.</p>
                  <Button variant="primary" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-14 h-16 border-2 font-black text-lg transition-all active:scale-95">Send New Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4 group">
                      <label htmlFor="name-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 ml-1 group-focus-within:text-blue-600 transition-colors">
                        Full Name <span className="text-blue-500">*</span>
                      </label>
                      <input 
                        type="text" id="name-input" name="name" aria-invalid={!!errors.name} 
                        className={`w-full bg-slate-50 dark:bg-slate-800/80 border-2 ${errors.name ? 'border-red-600 dark:border-red-500 bg-red-50/20' : 'border-slate-200 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                        placeholder="Johnathan Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      />
                      {errors.name && (
                        <p className="text-red-700 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-500">
                          <AlertCircle size={14} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-4 group">
                      <label htmlFor="email-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 ml-1 group-focus-within:text-blue-600 transition-colors">
                        Work Email <span className="text-blue-500">*</span>
                      </label>
                      <input 
                        type="email" id="email-input" name="email" aria-invalid={!!errors.email}
                        className={`w-full bg-slate-50 dark:bg-slate-800/80 border-2 ${errors.email ? 'border-red-600 dark:border-red-500 bg-red-50/20' : 'border-slate-200 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                        placeholder="ceo@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      />
                      {errors.email && (
                        <p className="text-red-700 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-500">
                          <AlertCircle size={14} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4 group">
                    <label htmlFor="message-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 ml-1 group-focus-within:text-blue-600 transition-colors">
                      Brief Message <span className="text-blue-500">*</span>
                    </label>
                    <textarea 
                      id="message-input" name="message" aria-invalid={!!errors.message} rows={5}
                      className={`w-full bg-slate-50 dark:bg-slate-800/80 border-2 ${errors.message ? 'border-red-600 dark:border-red-500 bg-red-50/20' : 'border-slate-200 dark:border-slate-700'} rounded-[2.5rem] px-7 py-6 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 transition-all resize-none font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                      placeholder="What are we building?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    />
                    {errors.message && (
                      <p className="text-red-700 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-500">
                        <AlertCircle size={14} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" variant="primary" size="lg" 
                      className={`w-full bg-slate-950 dark:bg-blue-600 text-white rounded-[2rem] shadow-2xl transition-all duration-300 font-black text-xl h-20 border-none group transform active:scale-[0.97] ${status === 'sending' ? 'cursor-wait opacity-60' : 'hover:shadow-blue-600/30'}`} 
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> 
                          Securely Sending...
                        </div>
                      ) : (
                        <span className="flex items-center gap-4">
                          Initiate Connection
                          <Send size={24} className="transform rotate-12 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
