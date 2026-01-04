import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, AlertCircle, CheckCircle2, Copy, Check, Sparkles, RefreshCcw, MapPin, Navigation, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { CONTACT_EMAIL, ADDRESS } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
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
    if (!formData.email.trim()) { newErrors.email = 'An email address is required'; } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = 'That email format is invalid'; }
    if (!formData.message.trim()) newErrors.message = 'Please describe your project mission';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setTimeout(() => {
      if (Math.random() < 0.05) { setStatus('error'); } 
      else { setStatus('success'); setFormData({ name: '', email: '', message: '' }); setErrors({}); setTimeout(() => setStatus('idle'), 6000); }
    }, 2000);
  };

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.123456789012!2d90.3644321!3d23.7431234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzM1LjIiTiA5MMKwMjEnNTEuOSJF!5e0!3m2!1sen!2sbd!4v1234567890123`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[45%] h-full bg-blue-100/40 dark:bg-blue-900/5 -skew-x-12 transform translate-x-1/4 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start mb-24">
          <div className="space-y-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-900 dark:text-blue-300 text-[11px] font-black uppercase tracking-[0.25em] mb-8 ring-1 ring-blue-500/30 shadow-sm">
                <Sparkles size={16} className="text-blue-600" /> Partner With Us
              </div>
              <h3 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-slate-950 dark:text-white drop-shadow-sm">Let's architect <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-pulse">your legacy.</span></h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xl font-medium max-w-lg leading-relaxed">Ready to modernize your infrastructure? Connect with our senior engineers today.</p>
            
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-2xl md:text-3xl font-black text-slate-950 dark:text-slate-100 tracking-tight drop-shadow-sm">{CONTACT_EMAIL}</p>
                <button onClick={handleCopyEmail} className={`p-4 rounded-2xl transition-all border-2 ${isCopied ? 'bg-green-600 border-green-600 text-white shadow-2xl scale-110' : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-blue-600 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20'}`}>
                  {isCopied ? <Check size={22} className="animate-in zoom-in spin-in-45 duration-500" /> : <Copy size={22} />}
                </button>
              </div>
              
              <div className="flex items-start gap-4 p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Our Studio</p>
                    <p className="font-bold text-slate-900 dark:text-slate-100 leading-relaxed text-lg">{ADDRESS}</p>
                 </div>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className={`relative bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[4rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-700 overflow-hidden ${status === 'sending' ? 'scale-[0.98]' : 'scale-100'}`}>
              
              {/* Submission Overlay with smoother transitions and distinct indicator */}
              {status === 'sending' && (
                <div className="absolute inset-0 z-50 bg-white/70 dark:bg-slate-900/85 backdrop-blur-[4px] flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="relative mb-8">
                    <Loader2 size={80} className="text-blue-600 animate-spin stroke-[2px]" />
                    <div className="absolute inset-0 bg-blue-600/30 blur-3xl rounded-full scale-150 animate-pulse"></div>
                  </div>
                  <p className="text-2xl font-black text-slate-950 dark:text-white tracking-tight text-center">
                    Establishing Secure Link... <br/>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-2 inline-block">Dispatching Inquiry</span>
                  </p>
                </div>
              )}

              {status === 'success' ? (
                <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                  <div className="w-32 h-32 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-10 shadow-2xl shadow-green-500/10 ring-4 ring-green-500/10"><CheckCircle2 size={64} className="stroke-[2.5px]" /></div>
                  <h4 className="text-4xl font-black mb-4 text-slate-950 dark:text-white tracking-tighter">Mission Received</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 max-w-xs mx-auto">We'll respond to your briefing within one business day.</p>
                  <Button variant="primary" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-14 h-16 border-2 font-black text-lg">Send New Message</Button>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                  <div className="w-32 h-32 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-10 shadow-2xl shadow-red-500/10"><AlertCircle size={64} className="stroke-[2.5px]" /></div>
                  <h4 className="text-4xl font-black mb-4 text-slate-950 dark:text-white tracking-tighter">Transmission Failed</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-sm mx-auto font-medium">A network disruption occurred. Please try resending your inquiry.</p>
                  <Button variant="primary" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-14 h-16 border-2 font-black text-lg flex items-center gap-3"><RefreshCcw size={20} /> Retry Transmission</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4 group">
                      <label htmlFor="name-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 ml-1 group-focus-within:text-blue-600 transition-colors">Full Name <span className="text-blue-500">*</span></label>
                      <input 
                        type="text" 
                        id="name-input" 
                        name="name" 
                        autoComplete="name"
                        aria-invalid={!!errors.name} 
                        aria-describedby={errors.name ? "name-error" : undefined} 
                        className={`w-full bg-slate-50 dark:bg-slate-950 border-2 ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all font-bold shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                        placeholder="e.g. Johnathan Doe" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      />
                      <div className="min-h-[20px]">
                        {errors.name && <p id="name-error" className="text-red-600 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-300"><AlertCircle size={14} /> {errors.name}</p>}
                      </div>
                    </div>
                    <div className="space-y-4 group">
                      <label htmlFor="email-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 ml-1 group-focus-within:text-blue-600 transition-colors">Business Email <span className="text-blue-500">*</span></label>
                      <input 
                        type="email" 
                        id="email-input" 
                        name="email" 
                        autoComplete="email"
                        aria-invalid={!!errors.email} 
                        aria-describedby={errors.email ? "email-error" : undefined} 
                        className={`w-full bg-slate-50 dark:bg-slate-950 border-2 ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all font-bold shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                        placeholder="ceo@company.com" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      />
                      <div className="min-h-[20px]">
                        {errors.email && <p id="email-error" className="text-red-600 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-300"><AlertCircle size={14} /> {errors.email}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 group">
                    <label htmlFor="message-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100 ml-1 group-focus-within:text-blue-600 transition-colors">Brief Your Mission <span className="text-blue-500">*</span></label>
                    <textarea 
                      id="message-input" 
                      name="message" 
                      aria-invalid={!!errors.message} 
                      aria-describedby={errors.message ? "message-error" : undefined} 
                      rows={5} 
                      className={`w-full bg-slate-50 dark:bg-slate-950 border-2 ${errors.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-[2.5rem] px-7 py-6 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all resize-none font-bold shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                      placeholder="What can we help you build?" 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    />
                    <div className="min-h-[20px]">
                      {errors.message && <p id="message-error" className="text-red-600 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-300"><AlertCircle size={14} /> {errors.message}</p>}
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className={`w-full bg-slate-950 dark:bg-blue-600 text-white rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.4)] transition-all duration-500 font-black text-xl h-20 transform active:scale-[0.97] hover:-translate-y-1.5 focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-950 ${status === 'sending' ? 'cursor-wait opacity-60' : ''}`} 
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center gap-4">
                          <Loader2 className="animate-spin" size={24} /> 
                          Establishing Link...
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

        {/* Map Section - Enhanced contrast and interactions */}
        <div className={`transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-4 border-2 border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group/map ring-4 ring-white dark:ring-slate-900 ring-offset-0 group-hover/map:ring-blue-500/10 transition-all">
            <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden grayscale contrast-125 dark:grayscale-0 dark:contrast-100 transition-all duration-700 group-hover/map:grayscale-0 group-hover/map:contrast-100 group-hover/map:scale-[1.01]">
              <iframe
                title="Office Location"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              <div className="absolute bottom-8 right-8 z-20">
                <a 
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-10 py-5 bg-slate-950 dark:bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-110 active:scale-95 transition-all group/btn ring-offset-2 hover:ring-2 hover:ring-blue-500 dark:hover:ring-white"
                >
                  <Navigation size={22} className="group-hover/btn:animate-subtle-bounce" />
                  Get Directions
                </a>
              </div>
              {/* Internal Border Frame */}
              <div className="absolute inset-0 pointer-events-none border-[12px] border-white dark:border-slate-900 rounded-[2.5rem] z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
