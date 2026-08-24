import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    nav_home: 'Home',
    nav_services: 'Services',
    nav_workflow: 'Workflow',
    nav_portfolio: 'Portfolio',
    nav_about: 'About',
    nav_insights: 'Insights',
    nav_contact: 'Contact',
    
    // Hero
    hero_tagline: 'Digital Mastery Engineered for Performance',
    hero_badge: 'High Performance Tech Stack',
    hero_cta_quote: 'Get a Quote',
    hero_cta_demo: 'Request Demo',
    hero_stats_projects: 'Active Deployments',
    hero_stats_uptime: 'Average Uptime',
    hero_stats_rating: 'Client Rating',

    // Services
    services_badge: 'Engineering Capability',
    services_title: 'Full-Cycle Development Spec',
    services_desc: 'We architect and build bespoke enterprise software, mobile experiences, and specialized advanced technologies.',
    services_features_title: 'Key Capabilities',
    services_view_details: 'Explore Spec',

    // Process
    process_badge: 'Lifecycle Strategy',
    process_title: 'How We Build Systems',
    process_desc: 'From initial design sprints to fully scaled automated cloud deployments, our iterative workflow maintains pure transparency.',

    // Portfolio
    portfolio_badge: 'Selected Artifacts',
    portfolio_title: 'Engineered Products',
    portfolio_desc: 'Explore the high-scale digital solutions we have built, optimized, and maintained for clients worldwide.',
    portfolio_all: 'All',
    portfolio_completed: 'Completed',
    portfolio_in_progress: 'In Progress',
    portfolio_maintenance: 'Maintenance',
    portfolio_back: 'Back to Grid',
    portfolio_tech_stack: 'Stack',
    portfolio_duration: 'Lifecycle',
    portfolio_status: 'State',
    portfolio_details: 'Case Details',
    portfolio_problem: 'The Challenge',
    portfolio_approach: 'Architectural Approach',
    portfolio_result: 'Business Velocity',

    // About
    about_badge: 'Engineering DNA',
    about_title: 'Built in Dhaka. Scaling Globally.',
    about_desc_1: 'OITS Dhaka is an elite software engineering studio dedicated to building robust, high-availability web applications, native mobile experiences, and specialized digital infrastructure.',
    about_desc_2: 'We reject standard cookie-cutter layouts. Every system we deploy is custom-crafted down to the pixel, employing ultra-optimized backend algorithms and pristine modern typography to drive real business velocity.',
    about_stats_engineers: 'Senior Engineers',
    about_stats_solutions: 'Deployed Solutions',
    about_stats_countries: 'Global Markets served',
    about_core_values: 'Core Principles',

    // Testimonials
    testimonials_badge: 'Verified Success',
    testimonials_title: 'Partner Feedback',
    testimonials_desc: 'Read direct reviews from technology leaders who rely on OITS Dhaka to scale their software foundations.',

    // Contact
    contact_badge: 'Start Your Evolution',
    contact_title: "Let's build industrial software.",
    contact_desc: 'Connect with our senior engineering team to discuss your infrastructure needs.',
    contact_hq: 'HQ Studio',
    contact_label_name: 'Your Identity',
    contact_label_email: 'Business Email',
    contact_label_message: 'Brief Your Mission',
    contact_placeholder_name: 'John Doe',
    contact_placeholder_email: 'ceo@company.com',
    contact_placeholder_message: 'What are we building?',
    contact_required: 'is required',
    contact_error_name: 'Identification is required',
    contact_error_email_empty: 'A business email is required',
    contact_error_email_invalid: 'Please provide a valid email format (e.g. name@company.com)',
    contact_error_message: 'Please provide a project mission overview',
    contact_button_submit: 'Initiate Connection',
    contact_status_sending: 'Establishing Link...',
    contact_status_success_title: 'Packet Delivered',
    contact_status_success_desc: 'Our engineering leads will respond shortly.',
    contact_status_success_button: 'Send New Inquiry',
    contact_status_error_title: 'Transmission Failed',
    contact_status_error_desc: 'Network timeout. Please retry the connection.',
    contact_status_error_button: 'Re-initiate',

    // Status Indicator
    status_title: 'System Health',
    status_operational: 'All Systems Operational',
    status_latency: 'Ping Latency',
    status_checks: 'Verified Sync',
    status_uptime_text: 'Reliability Index',

    // Footer
    footer_desc: 'Empowering businesses through innovative software solutions. Your digital transformation partner.',
    footer_newsletter: 'Newsletter',
    footer_newsletter_desc: 'Subscribe for the latest tech news and digital strategy updates from OITS Dhaka.',
    footer_newsletter_placeholder: 'Business email address',
    footer_newsletter_btn: 'Join',
    footer_company: 'Company',
    footer_services: 'Services',
    footer_copyright: 'OITS Dhaka. Digital Excellence Delivered.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    
    // Insights Section Enhancements
    insights_filter_all: 'All Insights',
    insights_filter_web: 'Web Engineering',
    insights_filter_mobile: 'Mobile Ecosystems',
    insights_filter_design: 'Product Design',
    insights_filter_ai: 'AI & Frontier Tech',
    insights_share_article: 'Share Article',
    insights_newsletter_title: 'Engineering Briefing',
    insights_newsletter_desc: 'Receive technical deep-dives and architectural strategies from our senior leads once a week.',
    insights_newsletter_placeholder: 'Your technical lead email',
    insights_newsletter_btn: 'Subscribe to Briefs',
    insights_newsletter_success: 'Connection established. Welcome to the weekly briefing.',
    insights_newsletter_error: 'Connection index failed. Please re-verify email.'
  },
  bn: {
    // Header
    nav_home: 'হোম',
    nav_services: 'সেবাসমূহ',
    nav_workflow: 'কার্যপ্রণালী',
    nav_portfolio: 'পোর্টফোলিও',
    nav_about: 'সম্পর্কে',
    nav_insights: 'নিবন্ধ',
    nav_contact: 'যোগাযোগ',
    
    // Hero
    hero_tagline: 'ডিজিটাল শ্রেষ্ঠত্ব, পারফরম্যান্সের দুর্দান্ত সমন্বয়',
    hero_badge: 'উচ্চ পারফরম্যান্স সম্পন্ন টেক স্ট্যাক',
    hero_cta_quote: 'কোটেশন নিন',
    hero_cta_demo: 'ডেমো দেখুন',
    hero_stats_projects: 'সক্রিয় প্রকল্প সমূহ',
    hero_stats_uptime: 'গড় আপটাইম সময়',
    hero_stats_rating: 'ক্লায়েন্ট রেটিং',

    // Services
    services_badge: 'ইঞ্জিনিয়ারিং দক্ষতা',
    services_title: 'পূর্ণাঙ্গ উন্নয়ন সমাধান',
    services_desc: 'আমরা কাস্টম এন্টারপ্রাইজ সফটওয়্যার, মোবাইল অভিজ্ঞতা এবং বিশেষায়িত আধুনিক প্রযুক্তি তৈরি করি।',
    services_features_title: 'মূল সুবিধাসমূহ',
    services_view_details: 'সেবা সমূহের সবিস্তার বিবরণ',

    // Process
    process_badge: 'জীবনচক্র কৌশল',
    process_title: 'যেভাবে আমরা সিস্টেম তৈরি করি',
    process_desc: 'প্রাথমিক ডিজাইন স্প্রিন্ট থেকে শুরু করে সম্পূর্ণ স্কেলড স্বয়ংক্রিয় ক্লাউড ডেপ্লয়মেন্ট পর্যন্ত, আমাদের প্রক্রিয়া সম্পূর্ণ স্বচ্ছ।',

    // Portfolio
    portfolio_badge: 'নির্বাচিত কাস্টম কাজ',
    portfolio_title: 'ইঞ্জিনিয়ার্ড প্রোডাক্ট সমূহ',
    portfolio_desc: 'বিশ্বজুড়ে ক্লায়েন্টদের জন্য আমরা যে উচ্চ-স্কেলে ডিজিটাল সমাধানগুলি তৈরি, অপ্টিমাইজ এবং রক্ষণাবেক্ষণ করেছি তা দেখুন।',
    portfolio_all: 'সবগুলো',
    portfolio_completed: 'সম্পন্ন',
    portfolio_in_progress: 'চলতি',
    portfolio_maintenance: 'রক্ষণাবেক্ষণ',
    portfolio_back: 'গ্রিডে ফিরে যান',
    portfolio_tech_stack: 'প্রযুক্তি',
    portfolio_duration: 'সময়কাল',
    portfolio_status: 'অবস্থা',
    portfolio_details: 'কেস স্টাডি বিস্তারিত',
    portfolio_problem: 'আমাদের চ্যালেঞ্জ',
    portfolio_approach: 'আর্কিটেকচারাল পদ্ধতি',
    portfolio_result: 'ব্যবসায়িক সুবিধা',

    // About
    about_badge: 'ইঞ্জিনিয়ারিং ডিএনএ',
    about_title: 'ঢাকায় নির্মিত। বিশ্ব দরবারে সমাদৃত।',
    about_desc_1: 'ওআইটিএস ঢাকা (OITS Dhaka) একটি অভিজাত সফটওয়্যার ইঞ্জিনিয়ারিং স্টুডিও যা শক্তিশালী, হাই-অ্যাভেলেবিলিটি ওয়েব অ্যাপ্লিকেশন, নেটিভ মোবাইল অভিজ্ঞতা এবং বিশেষায়িত ডিজিটাল অবকাঠামো তৈরিতে নিবেদিত।',
    about_desc_2: 'আমরা কাস্টমাইজড কোড ও টেকসই ডিজিটাল আর্কিটেকচারে বিশ্বাসী। আমাদের তৈরি প্রতিটি সিস্টেম পিক্সেল নিখুঁত, অপ্টিমাইজড ব্যাকএন্ড অ্যালগরিদম এবং নান্দনিক আধুনিক ডিজাইনের মিশ্রণে তৈরি, যা আপনার ব্যবসাকে বহুদূর এগিয়ে নিয়ে যাবে।',
    about_stats_engineers: 'সিনিয়র ইঞ্জিনিয়ার',
    about_stats_solutions: 'ডেপ্লয়ড সমাধান সমূহ',
    about_stats_countries: 'গ্লোবাল মার্কেট',
    about_core_values: 'আমাদের মূলনীতি সমূহ',

    // Testimonials
    testimonials_badge: 'যাচাইকৃত সফলতা',
    testimonials_title: 'পার্টনারদের মূল্যায়ন',
    testimonials_desc: 'ওআইটিএস ঢাকার ওপর আস্থা রাখা প্রযুক্তি খাতের লিডারদের বাস্তব অভিজ্ঞতা ও মতামত জানুন।',

    // Contact
    contact_badge: 'উন্নতির পথযাত্রা',
    contact_title: 'চলুন শক্তিশালী সফটওয়্যার গড়ি।',
    contact_desc: 'আপনার অবকাঠামো এবং প্রযুক্তিগত সল্যুশন নিয়ে আলোচনা করতে আমাদের সিনিয়র ইঞ্জিনিয়ারিং টিমের সাথে যুক্ত হন।',
    contact_hq: 'প্রধান স্টুডিও',
    contact_label_name: 'আপনার নাম',
    contact_label_email: 'ব্যবসায়িক ইমেল',
    contact_label_message: 'আপনার প্রজেক্টের সংক্ষিপ্ত বিবরণ',
    contact_placeholder_name: 'জন ডো',
    contact_placeholder_email: 'ceo@company.com',
    contact_placeholder_message: 'আমরা কি বিল্ড করতে যাচ্ছি?',
    contact_required: 'প্রয়োজন',
    contact_error_name: 'আপনার নাম সরবরাহ করা প্রয়োজন',
    contact_error_email_empty: 'একটি ব্যবসায়িক ইমেল প্রয়োজন',
    contact_error_email_invalid: 'অনুগ্রহ করে সঠিক ইমেল ফরম্যাট প্রদান করুন (যেমন: name@company.com)',
    contact_error_message: 'অনুগ্রহ করে প্রজেক্টের সংক্ষিপ্ত বিবরণ দিন',
    contact_button_submit: 'সংযোগ শুরু করুন',
    contact_status_sending: 'লিঙ্ক তৈরি করা হচ্ছে...',
    contact_status_success_title: 'প্যাকেট সফলভাবে পৌঁছেছে',
    contact_status_success_desc: 'আমাদের ইঞ্জিনিয়ারিং লিড অতি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
    contact_status_success_button: 'নতুন অনুসন্ধান পাঠান',
    contact_status_error_title: 'সংযোগ ব্যর্থ হয়েছে',
    contact_status_error_desc: 'নেটওয়ার্ক টাইমআউট হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
    contact_status_error_button: 'পুনরায় সংযোগ করুন',

    // Status Indicator
    status_title: 'সিস্টেমের স্বাস্থ্য পরীক্ষা',
    status_operational: 'সব সিস্টেম পুরোপুরি সচল',
    status_latency: 'পিং লেটেন্সি',
    status_checks: 'যাচাইকৃত সিঙ্ক',
    status_uptime_text: 'নির্ভরযোগ্যতা সূচক',

    // Footer
    footer_desc: 'উদ্ভাবনী সফটওয়্যার সলিউশনের মাধ্যমে ব্যবসাকে শক্তিশালী করা। আপনার ডিজিটাল রূপান্তর অংশীদার।',
    footer_newsletter: 'নিউজলেটার',
    footer_newsletter_desc: 'ওআইটিএস ঢাকার পক্ষ থেকে সর্বশেষ প্রযুক্তি সংবাদ এবং ডিজিটাল কৌশল আপডেটের জন্য সাবস্ক্রাইব করুন।',
    footer_newsletter_placeholder: 'ব্যবসায়িক ইমেল ঠিকানা',
    footer_newsletter_btn: 'যুক্ত হোন',
    footer_company: 'কোম্পানি',
    footer_services: 'সেবাসমূহ',
    footer_copyright: 'ওআইটিএস ঢাকা। চমৎকার ডিজিটাল সার্ভিস সরবরাহকৃত।',
    footer_privacy: 'গোপনীয়তা নীতি',
    footer_terms: 'পরিষেবার শর্তাবলী',

    // Insights Section Enhancements
    insights_filter_all: 'সবগুলো',
    insights_filter_web: 'ওয়েব ইঞ্জিনিয়ারিং',
    insights_filter_mobile: 'মোবাইল ইকোসিস্টেম',
    insights_filter_design: 'প্রোডাক্ট ডিজাইন',
    insights_filter_ai: 'AI এবং ভবিষ্যৎ প্রযুক্তি',
    insights_share_article: 'আর্টিকেলটি শেয়ার করুন',
    insights_newsletter_title: 'ইঞ্জিনিয়ারিং ব্রিফিং',
    insights_newsletter_desc: 'সপ্তাহে সরাসরি আপনার ইনবক্সে আমাদের সিনিয়র লিডদের প্রযুক্তিগত বিশদ বিবরণ এবং কৌশলগুলো পান।',
    insights_newsletter_placeholder: 'আপনার অফিসিয়াল ইমেল',
    insights_newsletter_btn: 'সাবস্ক্রাইব করুন',
    insights_newsletter_success: 'সংযোগ স্থাপন সম্পন্ন হয়েছে। সাপ্তাহিক ব্রিফিংয়ে আপনাকে স্বাগতম।',
    insights_newsletter_error: 'সংযোগ ব্যর্থ হয়েছে। ইমেল পুনরায় যাচাই করুন।'
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'en' || saved === 'bn') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
