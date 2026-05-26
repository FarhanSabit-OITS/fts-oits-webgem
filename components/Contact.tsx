import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertCircle, CheckCircle2, Copy, Check, Sparkles, RefreshCcw, MapPin, Navigation, Loader2 } from 'lucide-react';
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
    if (!formData.name.trim()) newErrors.name = 'Identification is required';
    if (!formData.email.trim()) { 
      newErrors.email = 'A business email is required'; 
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) { 
      newErrors.email = 'Please provide a valid email format (e.g. name@company.com)'; 
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide a project mission overview';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setTimeout(() => {
      if (Math.random() < 0.02) { setStatus('error'); } 
      else { 
        setStatus('success'); 
        setFormData({ name: '', email: '', message: '' }); 
        setErrors({}); 
        setTimeout(() => setStatus('idle'), 8000); 
      }
    }, 2500);
  };

  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.123456789012!2d90.3644321!3d23.7431234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzM1LjIiTiA5MMKwMjEnNTEuOSJF!5e0!3m2!1sen!2sbd!4v1234567890123`;

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[45%] h-full bg-blue-100/40 dark:bg-blue-900/5 -skew-x-12 transform translate-x-1/4 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start mb-24">
          <div className="space-y-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-900 dark:text-blue-300 text-[11px] font-black uppercase tracking-[0.25em] mb-8 ring-1 ring-blue-500/30 shadow-sm">
                <Sparkles size={16} className="text-blue-600" /> Start Your Evolution
              </div>
              <h3 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-slate-950 dark:text-white drop-shadow-sm">Let's build <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-pulse">industrial software.</span></h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xl font-medium max-w-lg leading-relaxed">Connect with our senior engineering team to discuss your infrastructure needs.</p>
            
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-slate-100 tracking-tight drop-shadow-sm break-all sm:break-words">{CONTACT_EMAIL}</p>
                <button onClick={handleCopyEmail} className={`p-4 rounded-2xl transition-all border-2 ${isCopied ? 'bg-green-600 border-green-600 text-white shadow-2xl scale-110' : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-blue-600 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20'}`} aria-label="Copy email address">
                  {isCopied ? <Check size={22} className="animate-in zoom-in duration-500" /> : <Copy size={22} />}
                </button>
              </div>
              
              <div className="flex items-start gap-4 p-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">HQ Studio</p>
                    <p className="font-bold text-slate-900 dark:text-slate-100 leading-relaxed text-lg">{ADDRESS}</p>
                 </div>
              </div>
 
               {/* Embedded Map */}
              <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-xl mt-6">
                <iframe 
                   src={mapUrl} 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   title="OITS Dhaka Location"
                   className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
 
          <div className={`relative transition-all duration-1000 delay-300 ease-out transform-gpu ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className={`relative bg-white dark:bg-slate-900 p-6 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[3.5rem] md:rounded-[4rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-700 overflow-hidden ${status === 'sending' ? 'scale-[0.98]' : 'scale-100'}`}>
              
              {status === 'sending' && (
                <div className="absolute inset-0 z-50 bg-white/70 dark:bg-slate-900/85 backdrop-blur-[6px] flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="relative mb-10">
                    <Loader2 size={100} className="text-blue-600 animate-spin stroke-[1.5px]" />
                    <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Establishing Link...</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] animate-pulse">Encrypting Payload</p>
                  </div>
                </div>
              )}

              {status === 'success' ? (
                <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                  <div className="w-32 h-32 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-10 shadow-2xl shadow-green-500/10 ring-4 ring-green-500/10"><CheckCircle2 size={64} className="stroke-[2.5px]" /></div>
                  <h4 className="text-4xl font-black mb-4 text-slate-950 dark:text-white tracking-tighter text-glow">Packet Delivered</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 max-w-xs mx-auto">Our engineering leads will respond shortly.</p>
                  <Button variant="primary" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-14 h-16 border-2 font-black text-lg shadow-xl shadow-green-500/5">Send New Inquiry</Button>
                </div>
              ) : status === 'error' ? (
                <div className="text-center py-20 animate-in zoom-in-95 duration-700">
                  <div className="w-32 h-32 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-10 shadow-2xl shadow-red-500/10"><AlertCircle size={64} className="stroke-[2.5px]" /></div>
                  <h4 className="text-4xl font-black mb-4 text-slate-950 dark:text-white tracking-tighter">Transmission Failed</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-sm mx-auto font-medium">Network timeout. Please retry the connection.</p>
                  <Button variant="primary" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-14 h-16 border-2 font-black text-lg flex items-center gap-3"><RefreshCcw size={20} /> Re-initiate</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4 group">
                      <label htmlFor="name-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200 ml-1 group-focus-within:text-blue-600 transition-colors cursor-pointer">Your Identity <span className="text-blue-500">*</span></label>
                      <input 
                        type="text" 
                        id="name-input" 
                        name="name" 
                        autoComplete="name"
                        aria-invalid={!!errors.name} 
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full bg-slate-50 dark:bg-slate-950 border-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-400 dark:border-slate-600 focus:border-blue-600'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all font-bold shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                        placeholder="John Doe" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-600 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-300">
                          <AlertCircle size={14} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-4 group">
                      <label htmlFor="email-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200 ml-1 group-focus-within:text-blue-600 transition-colors cursor-pointer">Business Email <span className="text-blue-500">*</span></label>
                      <input 
                        type="email" 
                        id="email-input" 
                        name="email" 
                        autoComplete="email"
                        aria-invalid={!!errors.email} 
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full bg-slate-50 dark:bg-slate-950 border-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-400 dark:border-slate-600 focus:border-blue-600'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all font-bold shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                        placeholder="ceo@company.com" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-600 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-300">
                          <AlertCircle size={14} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4 group">
                    <label htmlFor="message-input" className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200 ml-1 group-focus-within:text-blue-600 transition-colors cursor-pointer">Brief Your Mission <span className="text-blue-500">*</span></label>
                    <textarea 
                      id="message-input" 
                      name="message" 
                      aria-invalid={!!errors.message} 
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      rows={5} 
                      className={`w-full bg-slate-50 dark:bg-slate-950 border-2 ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-400 dark:border-slate-600 focus:border-blue-600'} rounded-[2.5rem] px-7 py-6 text-slate-950 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-600/20 transition-all resize-none font-bold shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`} 
                      placeholder="What are we building?" 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-600 dark:text-red-400 text-[11px] mt-2 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-300">
                        <AlertCircle size={14} /> {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className={`w-full font-black text-xl h-20 active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] bg-slate-950 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 ${status === 'sending' ? 'cursor-wait opacity-60' : 'hover:scale-[1.02]'}`} 
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center gap-4 animate-pulse">
                          <Loader2 className="animate-spin" size={24} /> 
                          Establishing Link...
                        </div>
                      ) : (
                        <span className="flex items-center gap-4 group">
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