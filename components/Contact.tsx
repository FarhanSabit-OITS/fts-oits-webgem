
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
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid business email';
    }
    if (!formData.message.trim()) newErrors.message = 'Project details are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // Simulated API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 6000);
    }, 2000);
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-100/40 dark:bg-blue-900/10 -skew-x-12 transform translate-x-1/3 pointer-events-none transition-colors duration-500" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32">
          <div className="space-y-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.25em] mb-8">
                <Sparkles size={16} /> Partner With Us
              </div>
              <h3 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-slate-900 dark:text-white">
                Build the future <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x">together.</span>
              </h3>
            </div>
            
            <p className={`text-slate-600 dark:text-slate-300 text-xl font-medium max-w-lg transition-all duration-1000 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Have a bold idea? We provide the engineering muscle to turn it into a high-performance market reality.
            </p>

            <div className="space-y-12 pt-6">
              <div className={`flex items-start gap-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '300ms' }}>
                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700 shadow-2xl shadow-blue-500/5"><Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Direct Channel</p>
                  <div className="flex items-center gap-5">
                    <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{CONTACT_EMAIL}</p>
                    <button 
                      onClick={handleCopyEmail} 
                      className={`p-3 rounded-2xl transition-all relative flex items-center justify-center shadow-md border-2 ${isCopied ? 'bg-green-500 border-green-500 text-white scale-110 shadow-green-500/20' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-600'}`} 
                      aria-label="Copy business email"
                    >
                      {isCopied ? <Check size={20} className="animate-in zoom-in-50 duration-300" /> : <Copy size={20} />}
                      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2.5 text-[11px] bg-slate-950 text-white rounded-2xl shadow-2xl transition-all font-black uppercase tracking-widest ${isCopied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90 pointer-events-none'}`}>Copied!</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={`flex items-start gap-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '450ms' }}>
                <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700 shadow-2xl shadow-blue-500/5"><MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Engineering HQ</p>
                  <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight tracking-tight">{ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="absolute inset-0 bg-blue-600 rounded-[3.5rem] rotate-2 scale-105 opacity-5 blur-2xl pointer-events-none" />
            
            <div className={`bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[3.5rem] border-2 border-white dark:border-slate-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none transition-all duration-500 ${status === 'sending' ? 'scale-[0.98] blur-[1px]' : 'scale-100'}`}>
              {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700 py-20">
                    <div className="w-28 h-28 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-10 shadow-2xl shadow-green-500/20 relative">
                        <CheckCircle2 size={56} />
                        <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ping opacity-20" />
                    </div>
                    <h4 className="text-4xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Transmission Received</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-sm font-medium">We've locked in your request. An architect will reach out within 24 hours.</p>
                    <Button variant="outline" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-14 h-16 border-2 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">Send New Inquiry</Button>
                  </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3 relative">
                      <label htmlFor="name" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                      <input 
                          type="text" id="name" aria-invalid={!!errors.name} 
                          className={`w-full bg-slate-50 dark:bg-slate-800 border-2 ${errors.name ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-slate-200 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm focus:shadow-2xl focus:shadow-blue-500/10`} 
                          placeholder="John Wick" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        />
                      {errors.name && <p className="text-red-500 text-[11px] mt-2.5 flex items-center gap-2 font-black animate-in slide-in-from-top-2 duration-300"><AlertCircle size={14} /> {errors.name}</p>}
                    </div>
                    <div className="space-y-3 relative">
                      <label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Work Email</label>
                      <input 
                          type="email" id="email" aria-invalid={!!errors.email} 
                          className={`w-full bg-slate-50 dark:bg-slate-800 border-2 ${errors.email ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-slate-200 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm focus:shadow-2xl focus:shadow-blue-500/10`} 
                          placeholder="john@nexus.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                      {errors.email && <p className="text-red-500 text-[11px] mt-2.5 flex items-center gap-2 font-black animate-in slide-in-from-top-2 duration-300"><AlertCircle size={14} /> {errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-3 relative">
                    <label htmlFor="message" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">How can we solve your problem?</label>
                    <textarea 
                        id="message" aria-invalid={!!errors.message} rows={5} 
                        className={`w-full bg-slate-50 dark:bg-slate-800 border-2 ${errors.message ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-slate-200 dark:border-slate-700'} rounded-[2.5rem] px-7 py-6 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all resize-none font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm focus:shadow-2xl focus:shadow-blue-500/10`} 
                        placeholder="Briefly describe your project goals..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      />
                    {errors.message && <p className="text-red-500 text-[11px] mt-2.5 flex items-center gap-2 font-black animate-in slide-in-from-top-2 duration-300"><AlertCircle size={14} /> {errors.message}</p>}
                  </div>

                  <div className="relative pt-4">
                    <Button 
                      type="submit" variant="primary" size="lg" 
                      className={`w-full bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-[1.75rem] shadow-2xl transition-all font-black text-xl h-20 border-none group transform active:scale-[0.97] ${status === 'sending' ? 'cursor-not-allowed' : ''}`} 
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> 
                          Encrypting Data...
                        </div>
                      ) : (
                        <span className="flex items-center gap-4">
                          Launch Inquiry 
                          <Send size={24} className="transform rotate-12 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      )}
                    </Button>
                    
                    {/* Visual Indicator Overlay during submission */}
                    {status === 'sending' && (
                      <div className="absolute inset-0 bg-blue-500/10 rounded-[1.75rem] animate-pulse pointer-events-none" />
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-move 8s ease infinite;
        }
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};
