
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
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-900 text-white overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Get in Touch</h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">Let's build something <br/> <span className="text-blue-500">extraordinary</span> together.</h3>
            </div>
            
            <p className={`text-slate-300 text-lg max-w-md transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.</p>

            <div className="space-y-6 pt-8">
              <div className={`flex items-start gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: '200ms' }}>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700"><Mail className="w-6 h-6 text-blue-400" /></div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email Us</p>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-medium text-slate-100">{CONTACT_EMAIL}</p>
                    <button onClick={handleCopyEmail} className="p-1.5 hover:bg-slate-700 rounded-md transition-colors group relative" aria-label="Copy email address">
                      {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-400 group-hover:text-white" />}
                      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] bg-slate-800 rounded transition-opacity ${isCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>Copied!</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className={`flex items-start gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: '350ms' }}>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700"><MapPin className="w-6 h-6 text-blue-400" /></div>
                <div><p className="text-sm text-slate-400 mb-1">Visit Us</p><p className="text-lg font-medium text-slate-100">{ADDRESS}</p></div>
              </div>
            </div>
          </div>

          <div className={`bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-700 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500 py-12">
                   <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-6"><CheckCircle2 size={40} /></div>
                   <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                   <Button variant="outline" onClick={() => setStatus('idle')} className="text-white border-slate-700 hover:bg-slate-700">Send another message</Button>
                </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <input type="text" id="name" aria-invalid={!!errors.name} className={`w-full bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all`} placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                     {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                   </div>
                   <div>
                     <input type="email" id="email" aria-invalid={!!errors.email} className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all`} placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                     {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                   </div>
                 </div>
                 <div>
                   <textarea id="message" aria-invalid={!!errors.message} rows={4} className={`w-full bg-slate-900 border ${errors.message ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none`} placeholder="Project Requirements..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                   {errors.message && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                 </div>
                 <Button type="submit" variant="primary" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/40 active:scale-95 transition-all" disabled={status === 'sending'}>
                   {status === 'sending' ? 'Sending...' : <span className="flex items-center">Send Message <Send className="ml-2 w-4 h-4" /></span>}
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};
