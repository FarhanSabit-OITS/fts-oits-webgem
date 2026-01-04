
import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react';
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
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
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-500 relative">
      {/* Dynamic Background Element for contrast */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/70 dark:bg-blue-900/10 -skew-x-12 transform translate-x-1/4 pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-indigo-50/50 dark:bg-indigo-900/5 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none transition-colors duration-500" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-6">
                Connect With Us
              </div>
              <h3 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
                Let's architect <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">the future</span> together.
              </h3>
            </div>
            
            <p className={`text-slate-600 dark:text-slate-300 text-lg max-w-md transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Whether you're looking for enterprise solutions or a dedicated engineering partner, our team is ready to scale with you.
            </p>

            <div className="space-y-10 pt-4">
              <div className={`flex items-start gap-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: '200ms' }}>
                <div className="p-4.5 bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-50 dark:border-slate-700 shadow-xl shadow-blue-500/5"><Mail className="w-7 h-7 text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Email Support</p>
                  <div className="flex items-center gap-4">
                    <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">{CONTACT_EMAIL}</p>
                    <button 
                      onClick={handleCopyEmail} 
                      className={`p-2.5 rounded-xl transition-all relative flex items-center justify-center shadow-sm ${isCopied ? 'bg-green-500 text-white' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'}`} 
                      aria-label="Copy contact email"
                    >
                      {isCopied ? <Check size={18} className="animate-in zoom-in-50 duration-200" /> : <Copy size={18} />}
                      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3.5 py-2 text-[10px] bg-slate-900 text-white rounded-xl shadow-2xl transition-all font-black uppercase tracking-widest ${isCopied ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90 pointer-events-none'}`}>Copied!</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={`flex items-start gap-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: '350ms' }}>
                <div className="p-4.5 bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-50 dark:border-slate-700 shadow-xl shadow-blue-500/5"><MapPin className="w-7 h-7 text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">Headquarters</p>
                  <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 leading-tight">{ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-slate-50 dark:bg-slate-900 p-8 md:p-14 rounded-[3rem] border-2 border-white dark:border-slate-800 shadow-2xl transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500 py-20">
                   <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-8 shadow-2xl shadow-green-500/20">
                      <CheckCircle2 size={48} />
                   </div>
                   <h4 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">Request Sent</h4>
                   <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-xs">Our team will review your requirements and reach out within one business day.</p>
                   <Button variant="outline" size="lg" onClick={() => setStatus('idle')} className="rounded-2xl px-12 border-2 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">New Inquiry</Button>
                </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-10" noValidate>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2.5">
                     <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 ml-1">Full Name</label>
                     <input 
                        type="text" id="name" aria-invalid={!!errors.name} 
                        className={`w-full bg-white dark:bg-slate-800 border-2 ${errors.name ? 'border-red-500' : 'border-slate-100 dark:border-slate-700'} rounded-2xl px-6 py-4.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm focus:shadow-xl focus:shadow-blue-500/5`} 
                        placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      />
                     {errors.name && <p className="text-red-500 text-[11px] mt-2 flex items-center gap-2 font-black animate-in slide-in-from-top-1"><AlertCircle size={14} /> {errors.name}</p>}
                   </div>
                   <div className="space-y-2.5">
                     <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 ml-1">Work Email</label>
                     <input 
                        type="email" id="email" aria-invalid={!!errors.email} 
                        className={`w-full bg-white dark:bg-slate-800 border-2 ${errors.email ? 'border-red-500' : 'border-slate-100 dark:border-slate-700'} rounded-2xl px-6 py-4.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm focus:shadow-xl focus:shadow-blue-500/5`} 
                        placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      />
                     {errors.email && <p className="text-red-500 text-[11px] mt-2 flex items-center gap-2 font-black animate-in slide-in-from-top-1"><AlertCircle size={14} /> {errors.email}</p>}
                   </div>
                 </div>
                 
                 <div className="space-y-2.5">
                   <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 ml-1">Project Details</label>
                   <textarea 
                      id="message" aria-invalid={!!errors.message} rows={5} 
                      className={`w-full bg-white dark:bg-slate-800 border-2 ${errors.message ? 'border-red-500' : 'border-slate-100 dark:border-slate-700'} rounded-[2rem] px-6 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all resize-none font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm focus:shadow-xl focus:shadow-blue-500/5`} 
                      placeholder="Share your goals or challenges..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    />
                   {errors.message && <p className="text-red-500 text-[11px] mt-2 flex items-center gap-2 font-black animate-in slide-in-from-top-1"><AlertCircle size={14} /> {errors.message}</p>}
                 </div>

                 <Button 
                   type="submit" variant="primary" size="lg" 
                   className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-[1.75rem] shadow-2xl shadow-blue-500/20 transform active:scale-[0.98] transition-all font-black text-lg h-16.5 border-none" 
                   disabled={status === 'sending'}
                 >
                   {status === 'sending' ? (
                     <div className="flex items-center gap-3">
                       <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div> 
                       Processing Request...
                     </div>
                   ) : <span className="flex items-center gap-3">Secure Transmission <Send size={20} className="transform rotate-12" /></span>}
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};
