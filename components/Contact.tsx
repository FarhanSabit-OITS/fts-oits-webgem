import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { CopyEmailButton } from './CopyEmailButton';
import { CONTACT_EMAIL, ADDRESS, COMPANY_NAME } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    projectScope: 'Custom Enterprise Web App',
    budgetTier: '$10k – $25k',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const scopeOptions = [
    'Custom Enterprise Web App',
    'Native Mobile App (iOS/Android)',
    'Cloud Architecture & DevOps',
    'AI / LLM System Integration',
    'Dedicated Engineering Team',
    'Cybersecurity Audit & Hardening'
  ];

  const budgetTiers = [
    '$5k – $10k',
    '$10k – $25k',
    '$25k – $50k',
    '$50k+'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.workEmail.trim()) {
      errs.workEmail = 'Work email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.workEmail)) {
      errs.workEmail = 'Please provide a valid corporate email format';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a summary of your project requirements';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate high-reliability API transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: '',
        workEmail: '',
        projectScope: 'Custom Enterprise Web App',
        budgetTier: '$10k – $25k',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 8000);
    }, 1500);
  };

  return (
    <section 
      id={SectionId.CONTACT} 
      className="py-28 bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>DIRECT CONSULTATION & INTAKE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-4">
            Let’s architect your <span className="text-[#38BDF8]">next system</span>.
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Submit your technical scope below. Our lead architects review all inquiries and respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Full Validation Enterprise Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
            
            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in-0 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-[#10B981] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Thank you. An engineering lead from OITS Dhaka will review your project brief and follow up via email within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-200"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Full Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all ${
                        errors.fullName ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1 font-mono">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="e.g. s.jenkins@enterprise.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all ${
                        errors.workEmail ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    />
                    {errors.workEmail && (
                      <p className="text-xs text-red-500 mt-1 font-mono">{errors.workEmail}</p>
                    )}
                  </div>
                </div>

                {/* Project Scope Dropdown & Budget Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Project Scope
                    </label>
                    <select
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
                    >
                      {scopeOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Target Budget Tier
                    </label>
                    <select
                      value={formData.budgetTier}
                      onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all cursor-pointer"
                    >
                      {budgetTiers.map((tier, i) => (
                        <option key={i} value={tier}>{tier}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message / Brief */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Project Mission & Technical Objectives *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current tech stack, desired timeline, and architectural challenges..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1 font-mono">{errors.message}</p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-sm uppercase tracking-wider border-2 border-slate-950 dark:border-white hover:border-[#10B981] dark:hover:border-[#10B981] hover:text-[#10B981] dark:hover:text-[#10B981] hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#10B981]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting Project Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Consultation Scope</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Coordinates & SLA Commitment (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Coordinates Card */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800">
                Direct Engineering Coordinates
              </h3>

              {/* Direct Email */}
              <CopyEmailButton />

              {/* Studio HQ */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-[#10B981] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Studio Headquarters</p>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {ADDRESS}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-[#F59E0B] shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Engineering Hours</p>
                  <p className="text-sm text-slate-800 dark:text-slate-200">
                    Sun – Thu: 09:00 – 18:00 (GMT+6)<br />
                    24/7 On-Call SecOps for Active SLAs
                  </p>
                </div>
              </div>
            </div>

            {/* SLA Commitment Pledge Badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900/50 to-sky-500/10 border border-emerald-500/30 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#10B981] text-[#070A13] shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 dark:text-white">
                  Guaranteed 24-Hour SLA Response
                </h4>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                  All enterprise technical requests receive direct architect analysis.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Google Maps Embed - Full Viewport Width */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 mt-16 sm:mt-24 h-[350px] sm:h-[500px]">
        <iframe
          title="OITS Dhaka Studio Location"
          src="https://maps.google.com/maps?q=Dhanmondi%20Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 pointer-events-auto"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
      </div>

    </section>
  );
};
