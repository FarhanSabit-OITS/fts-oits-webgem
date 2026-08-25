import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { COMPANY_NAME } from '../constants';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedDate, setSelectedDate] = useState('2026-03-01');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Enterprise Architecture & Tech Stack');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'
  ];

  const topics = [
    'Enterprise Architecture & Tech Stack',
    'AI & Custom LLM Integration',
    'Cloud Scaling & DevOps Audit',
    'Dedicated Engineering Team Augmentation',
    'Fintech / Secure Payment Gateway'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-900 transition-colors"
          aria-label="Close scheduling modal"
        >
          <X size={20} />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#38BDF8] text-xs font-mono font-bold tracking-wider w-fit mb-4">
              <Sparkles size={14} />
              <span>FREE EXPERT CONSULTATION</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
              Schedule a Strategy Session
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Pick a free calendar slot to discuss your project roadmap directly with our Senior Tech Leads and Product Managers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Discussion Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                >
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                    Available Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot} (GMT+6)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Securing Calendar Slot...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon size={18} />
                      <span>Confirm Free Strategy Session</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#10B981]">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Session Booked Successfully!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              We have dispatched a calendar invitation and secure Google Meet / Zoom link to <strong className="text-slate-900 dark:text-white">{email}</strong> for <span className="text-[#38BDF8] font-bold">{selectedDate} at {selectedTime}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="py-2.5 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
