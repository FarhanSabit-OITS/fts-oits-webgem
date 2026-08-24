import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FAQItem {
  id: string;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
  categoryEn: string;
  categoryBn: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    categoryEn: 'Services & Tech',
    categoryBn: 'সেবা ও প্রযুক্তি',
    questionEn: 'What core engineering services does OITS Dhaka offer?',
    questionBn: 'ওআইটিএস ঢাকা মূলত কী কী ইঞ্জিনিয়ারিং সেবা প্রদান করে?',
    answerEn: 'We specialize in full-cycle enterprise web application development, high-performance native mobile apps (iOS/Android), cloud infrastructure orchestration, AI/ML integrations, and dedicated engineering team augmentation.',
    answerBn: 'আমরা মূলত এন্টারপ্রাইজ ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট, হাই-পারফরম্যান্স মোবাইল অ্যাপ (iOS/Android), ক্লাউড ইনফ্রাস্ট্রাকচার, কৃত্রিম বুদ্ধিমত্তা (AI/ML) ইন্টিগ্রেশন এবং স্পেশালাইজড ইঞ্জিনিয়ারিং টিম সাপোর্ট প্রদান করি।',
  },
  {
    id: 'faq-2',
    categoryEn: 'Launch & Availability',
    categoryBn: 'লঞ্চ ও সুযোগসুবিধা',
    questionEn: 'When will the official OITS Dhaka platform launch?',
    questionBn: 'ওআইটিএস ঢাকার অফিসিয়াল প্ল্যাটফর্ম কবে চালু হবে?',
    answerEn: 'Our platform goes live on August 31, 2026. However, our engineering division is fully operational, taking pre-launch project inquiries, technical audits, and client consultations right now.',
    answerBn: 'আমাদের নতুন প্ল্যাটফর্ম ৩১ আগস্ট ২০২৬ সালে আনুষ্ঠানিকভাবে চালু হবে। তবে আমাদের ইঞ্জিনিয়ারিং বিভাগ সম্পূর্ণ সচল এবং আমরা এখনই নতুন প্রজেক্ট, টেকনিক্যাল অডিট ও ক্লায়েন্ট পরামর্শ নিচ্ছি।',
  },
  {
    id: 'faq-3',
    categoryEn: 'Consultation',
    categoryBn: 'পরামর্শ ও প্রস্তাবনা',
    questionEn: 'How can I request a project proposal or consultation before launch?',
    questionBn: 'লঞ্চের আগে কীভাবে প্রজেক্টের প্রস্তাবনা বা পরামর্শ নেওয়া যাবে?',
    answerEn: 'Click the "Contact Us" or "Pre-book Consultation" buttons to open our direct engineering line. A senior lead will review your scope and respond within 24 hours.',
    answerBn: '"Contact Us" বা "Pre-book Consultation" বাটনে ক্লিক করে আমাদের ইঞ্জিনিয়ারিং দলের সাথে সরাসরি যুক্ত হোন। ২৪ ঘণ্টার মধ্যে একজন সিনিয়র ইঞ্জিনিয়ারিং লিড আপনার সাথে যোগাযোগ করবেন।',
  },
  {
    id: 'faq-4',
    categoryEn: 'Security & Quality',
    categoryBn: 'নিরাপত্তা ও গুণমান',
    questionEn: 'How do you guarantee high availability and data security?',
    questionBn: 'আপনারা কীভাবে সিস্টেমের হাই-অ্যাভেলেবিলিটি ও ডেটা নিরাপত্তা নিশ্চিত করেন?',
    answerEn: 'We implement zero-trust security standards, end-to-end encryption, automated CI/CD pipeline code audits, and multi-region failover cloud hosting on GCP and AWS.',
    answerBn: 'আমরা জিরো-ট্রাস্ট সিকিউরিটি স্ট্যান্ডার্ড, এন্ড-টু-এন্ড এনক্রিপশন, স্বয়ংক্রিয় CI/CD কোড অডিট এবং GCP ও AWS ক্লাউডে মাল্টি-রিজিয়ন ব্যাকআপ নিশ্চিত করি।',
  },
  {
    id: 'faq-5',
    categoryEn: 'Global & Local Scope',
    categoryBn: 'গ্লোবাল ও লোকাল ক্লায়েন্ট',
    questionEn: 'Do you work with international clients as well as local Bangladesh enterprises?',
    questionBn: 'আপনারা কি দেশীয় প্রতিষ্ঠানের পাশাপাশি আন্তর্জাতিক ক্লায়েন্টদের সাথেও কাজ করেন?',
    answerEn: 'Yes. Based in Dhaka, Bangladesh, we partner with ambitious enterprises and technology leaders across North America, Europe, Asia-Pacific, and South Asia.',
    answerBn: 'হ্যাঁ, ঢাকায় মূল অফিস হলেও আমরা বাংলাদেশসহ উত্তর আমেরিকা, ইউরোপ, এশিয়া-প্যাসিফিক ও এশিয়ার বিভিন্ন দেশের স্বনামধন্য টেক ব্র্যান্ড ও এন্টারপ্রাইজের সাথে কাজ করছি।',
  },
];

export const FAQAccordion: React.FC = () => {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Generate FAQ JSON-LD structure dynamically depending on active language
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": language === 'bn' ? item.questionBn : item.questionEn,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": language === 'bn' ? item.answerBn : item.answerEn
      }
    }))
  };

  return (
    <div className="w-full space-y-4">
      {/* JSON-LD Structured Data for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
          <HelpCircle size={18} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
            {language === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ' : 'Frequently Asked Questions'}
          </h3>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {language === 'bn' ? 'আমাদের পরিষেবা ও ইঞ্জিনিয়ারিং সম্পর্কিত সচরাচর প্রশ্নের উত্তর' : 'Direct answers regarding our services, stack, and launch workflow.'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          const question = language === 'bn' ? item.questionBn : item.questionEn;
          const answer = language === 'bn' ? item.answerBn : item.answerEn;
          const category = language === 'bn' ? item.categoryBn : item.categoryEn;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white dark:bg-slate-900/90 border-blue-500/50 dark:border-blue-500/40 shadow-lg shadow-blue-500/5'
                  : 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset transition-colors"
              >
                <div className="pr-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
                    {category}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                    {question}
                  </h4>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="p-1.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 shrink-0"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-5 pt-1 text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1">
                      {answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
