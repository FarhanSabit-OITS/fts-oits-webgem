
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
    // Simulated API call with refined state indicators
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 6000);
    }, 2000);
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden">
      {/* Visual Background Accents */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-blue-100/40 dark:bg-blue-900/5 -skew-x-12 transform translate-x-1/4 pointer-events-none transition-colors duration-500" />
      <div className="absolute top-[30%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32">
          <div className="space-y-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-800 dark:text-blue-300 text-[11px] font-black uppercase tracking-[0.25em] mb-8 shadow-sm ring-1 ring-blue-500/20">
                <Sparkles size={16} /> Partner Ecosystem
              </div>
              <h3 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-slate-950 dark:text-white">
                Building software <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x">that scales.</span>
              </h3>
            </div>
            
            <p className={`text-slate-700 dark:text-slate-300 text-xl font-medium max-w-lg transition-all duration-1000 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ready to modernize your infrastructure or build a new digital flagship? Let's engineer your next success.
            </p>

            <div className="space-y-12 pt-6">
              <div className={`flex items-start gap-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-blue-500/5"><Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-2">Direct Channel</p>
                  <div className="flex flex-wrap items-center gap-5">
                    <p className="text-2xl md:text-3xl font-black text-slate-950 dark:text-slate-100 tracking-tight">{CONTACT_EMAIL}</p>
                    <button 
                      onClick={handleCopyEmail} 
                      className={`group/copy p-3.5 rounded-2xl transition-all relative flex items-center justify-center border-2 ${isCopied ? 'bg-green-500 border-green-500 text-white scale-110 shadow-2xl shadow-green-500/30' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-950 dark:hover:text-white border-slate-200 dark:border-slate-700 shadow-lg'}`} 
                      aria-label="Copy business email"
                    >
                      {isCopied ? <Check size={20} className="animate-in zoom-in-50 duration-300" /> : <Copy size={20} />}
                      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2.5 text-[11px] bg-slate-950 text-white rounded-2xl shadow-2xl transition-all font-black uppercase tracking-widest ${isCopied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90 pointer-events-none'}`}>Copied!</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={`flex items-start gap-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '450ms' }}>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-blue-500/5"><MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-2">Global Studio</p>
                  <p className="text-2xl md:text-3xl font-black text-slate-950 dark:text-slate-100 leading-tight tracking-tight">{ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Submission Indicator Overlay */}
            {status === 'sending' && (
              <div className="absolute inset-0 z-30 bg-white/40 dark:bg-slate-950/40 backdrop-blur-[3px] rounded-[3.5rem] flex items-center justify-center animate-in fade-in duration-500">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-black text-blue-600 uppercase tracking-widest animate-pulse">Establishing Connection...</p>
                </div>
              </div>
            )}
            
            <div className={`bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[3.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-[0_60px_100px_-30px_rgba(0,0,0,0.12)] dark:shadow-none transition-all duration-500 ${status === 'sending' ? 'scale-[0.97] opacity-60' : 'scale-100 opacity-100'}`}>
              {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700 py-20">
                    <div className="w-32 h-32 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-10 shadow-2xl shadow-green-500/30 relative">
                        <CheckCircle2 size={64} />
                        <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ping opacity-20" />
                    </div>
                    <h4 className="text-4xl font-black mb-4 text-slate-950 dark:text-white tracking-tighter">Transmission Successful</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-sm font-medium">Message safely encrypted and dispatched. Our architectural team will respond within 24 hours.</p>
                    <Button variant="outline" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-14 h-16 border-2 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">New Inquiry</Button>
                  </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3 relative group">
                      <label htmlFor="contact-name" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-200 ml-1 group-focus-within:text-blue-600 transition-colors duration-300">Full Name</label>
                      <input 
                          type="text" id="contact-name" name="name" aria-invalid={!!errors.name} required
                          className={`w-full bg-slate-50 dark:bg-slate-800/80 border-2 ${errors.name ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-slate-200 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 transition-all duration-300 font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm focus:shadow-2xl focus:shadow-blue-500/5`} 
                          placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        />
                      {errors.name && <p className="text-red-600 dark:text-red-400 text-[11px] mt-3 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-500"><AlertCircle size={14} /> {errors.name}</p>}
                    </div>
                    <div className="space-y-3 relative group">
                      <label htmlFor="contact-email" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-200 ml-1 group-focus-within:text-blue-600 transition-colors duration-300">Business Email</label>
                      <input 
                          type="email" id="contact-email" name="email" aria-invalid={!!errors.email} required
                          className={`w-full bg-slate-50 dark:bg-slate-800/80 border-2 ${errors.email ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-slate-200 dark:border-slate-700'} rounded-2xl px-7 py-5 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 transition-all duration-300 font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm focus:shadow-2xl focus:shadow-blue-500/5`} 
                          placeholder="name@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                      {errors.email && <p className="text-red-600 dark:text-red-400 text-[11px] mt-3 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-500"><AlertCircle size={14} /> {errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-3 relative group">
                    <label htmlFor="contact-message" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-200 ml-1 group-focus-within:text-blue-600 transition-colors duration-300">Project Mission & Goals</label>
                    <textarea 
                        id="contact-message" name="message" aria-invalid={!!errors.message} rows={5} required
                        className={`w-full bg-slate-50 dark:bg-slate-800/80 border-2 ${errors.message ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : 'border-slate-200 dark:border-slate-700'} rounded-[2.5rem] px-7 py-6 text-slate-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 transition-all duration-300 resize-none font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm focus:shadow-2xl focus:shadow-blue-500/5`} 
                        placeholder="Tell us about the challenges and your vision..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      />
                    {errors.message && <p className="text-red-600 dark:text-red-400 text-[11px] mt-3 flex items-center gap-2 font-black animate-in fade-in slide-in-from-top-1 duration-500"><AlertCircle size={14} /> {errors.message}</p>}
                  </div>

                  <div className="relative pt-4">
                    <Button 
                      type="submit" variant="primary" size="lg" 
                      className={`w-full bg-slate-950 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-[2rem] shadow-2xl transition-all duration-300 font-black text-xl h-20 border-none group transform active:scale-[0.97] ${status === 'sending' ? 'cursor-wait opacity-80' : 'hover:shadow-blue-600/20'}`} 
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> 
                          Sending Securely...
                        </div>
                      ) : (
                        <span className="flex items-center gap-4">
                          Establish Partnership
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
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-move 10s ease infinite;
        }
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};
