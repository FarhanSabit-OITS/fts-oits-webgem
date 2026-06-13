import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowUpRight, Calendar, User, Clock, ChevronRight, X, Sparkles, Loader2, BookOpen } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  originalCategory: string; // for filtering
}

export const Insights: React.FC = () => {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Set up categories list depending on the language state
  const categories = {
    en: [
      { id: 'all', label: 'All Insights' },
      { id: 'specialized', label: 'Specialized (AI/Web3)' },
      { id: 'infrastructure', label: 'Infrastructure & Cloud' },
      { id: 'backend', label: 'Backend Architecture' },
      { id: 'frontend', label: 'Frontend Design' }
    ],
    bn: [
      { id: 'all', label: 'সকল আর্টিকেল' },
      { id: 'specialized', label: 'স্পেশালিস্ট (AI/IoT/Web3)' },
      { id: 'infrastructure', label: 'ইনফ্রাস্ট্রাকচার ও ক্লাউড' },
      { id: 'backend', label: 'ব্যাকএন্ড আর্কিটেকচার' },
      { id: 'frontend', label: 'ফ্রন্টএন্ড ডিজাইন' }
    ]
  }[language === 'bn' ? 'bn' : 'en'];

  // Mock Blog API Simulator
  const fetchMockBlogAPI = (): Promise<Article[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockArticles: Article[] = [
          {
            id: 'art-1',
            title: language === 'bn' 
              ? 'ফিনটেক পেমেন্টে আল্ট্রা-লো লেটেন্সি আর্কিটেকচার ডিজাইন'
              : 'Architecting Ultra-Low Latency Pipelines for Fintech Transactions',
            excerpt: language === 'bn'
              ? 'উচ্চ ক্ষমতাসম্পন্ন লেনদেনের ব্যাকএন্ডগুলিতে লেটেন্সি বা বিলম্বে পেমেন্ট প্রসেসিং কমানোর কার্যকর কৌশলসমূহ।'
              : 'How to optimize database transaction queries, stream streaming telemetry data under 200ms, and scale backend memory models.',
            body: language === 'bn'
              ? 'আজকের পরিশীলিত আর্থিক অবকাঠামোয় বিলম্ব বা লেটেন্সি কেবল একটি সংযোগ সমস্যা নয়; এটি বড় ধরনের রেভিনিউ ক্ষতি করতে পারে। এই ডিটেইল্ড গাইডে ওআইটিএস ঢাকার সিনিয়র ইঞ্জিনিয়াররা দেখিয়েছেন কীভাবে লাইটওয়েট নোড ক্লাস্টার, রাস্ট রেপ্লিক্যান্টস এবং ইন-মেমোরি রেডিস ডাটা ট্র্যাকিং ব্যবহার করে ট্রানজেকশন ক্যোয়ারী ১ মিলিসেকেন্ডের নিচে নামিয়ে আনা যায় উনত্রিশ শতাংশ বুস্ট নিয়ে। \n\nমূল ফোকাস এরিয়া:\n১. ব্যাকপ্রেশার ম্যানেজমেন্ট ও পাইপলাইনিং।\n২. ডাটাবেস টিউনিং এবং নো-লক ট্রানজেকশন ক্যোয়ারী স্ট্যান্ডার্ডস。\n৩. গ্লোবাল মেমোরি রেপ্লিকেশন অপ্টিমাইজেশন।'
              : 'In today’s high-volume fintech ecosystem, a delay of 100 milliseconds can translate to millions in slippage and lost arbitrage opportunities. This deep dive breaks down how OITS Dhaka engineered a multi-threaded execution queue in low-level Rust to bypass non-blocking I/O cycles, achieving sub-millisecond thread execution profiles in real-world environments.\n\nKey Strategic Pillars:\n- Event Loop Saturation Bypass via Worker Thread Offloading.\n- Standardizing Lock-Free Ring Buffers to eliminate deadlocks.\n- Granular Database Tuning and read-heavy caching paradigms.',
            category: language === 'bn' ? 'ব্যাকএন্ড' : 'Backend',
            originalCategory: 'backend',
            date: language === 'bn' ? '১৩ জুন, ২০২৬' : 'June 13, 2026',
            readTime: language === 'bn' ? '৫ মিনিট পাঠ' : '5 min read',
            author: language === 'bn' ? 'তাহমিদ রহমান, টিম লিড' : 'Tahmid Rahman, Principal Engineer',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
          },
          {
            id: 'art-2',
            title: language === 'bn'
              ? 'মোবাইল ইকোসিস্টেমে এজ ক্লাউড কম্পিউটিং এবং এআই মডেল ডেপ্লয়মেন্ট'
              : 'Deploying Modern Edge AI Models directly inside Mobile Applications',
            excerpt: language === 'bn'
              ? 'ডিভাইসে সরাসরি অন-ডিভাইস ডিপ লার্নিং মডেল রানের মাধ্যমে ডাটা ট্রান্সমিশন বা নেটওয়ার্ক ডিপেন্ডেন্সি কমানো।'
              : 'Techniques to compress neural network layers, run on-device inference without sacrificing UI rendering frames, and reduce cloud costs.',
            body: language === 'bn'
              ? 'অনলাইন সংযোগ বা স্পিডের উপর নির্ভর না করে সরাসরি নেটিভ ডিভাইসে ডিপ লার্নিং মডেল রান করানো এখন মোবাইল প্রযুক্তির এক বিশাল অর্জনের অংশ। ওআইটিএস ঢাকা রিসার্চ ল্যাবের তৈরি এই ব্লগে আমরা পোটেনশিয়াল নিউরাল নেটওয়ার্ক লাইব্রেরি ও কম্প্রেসড পাইটর্চ প্যাকেজের ব্যবহার সম্পর্কে বিশদ আলোচনা করেছি। এটি অ্যাপস্টোর ও গুগল প্লে স্টোরে সহজে সাবমিট করা যায় এবং ইউজার প্রাইভেসী শতভাগ রক্ষা করে।\n\nপ্রধান উপাদানসমূহ:\n১. অন-ডিভাইস এনপিইউ (NPU) অ্যাক্সিলারেশন অপ্টিমাইজেশন।\n২. লেয়ার কোয়ান্টাইজেশন মেথডোলজি。\n৩. মেমোরি থ্রেশহোল্ড মনিটরিং।'
              : 'The decentralization of machine learning is shifting intelligence from gargantuan server clusters to local, low-power edge processors. This article details OITS Dhaka’s engineering patterns using CoreML and TensorFlow Lite underneath cross-platform layers to achieve lightning-fast object detection and offline translation.\n\nKey Strategic Pillars:\n- Core Model Quantization to decrease weights by up to 75%.\n- Asynchronous inference engines utilizing direct neural hardware.\n- Zero cloud dependencies ensuring extreme user data privacy.',
            category: language === 'bn' ? 'স্পেশালিস্ট' : 'Specialized',
            originalCategory: 'specialized',
            date: language === 'bn' ? '১০ জুন, ২০২৬' : 'June 10, 2026',
            readTime: language === 'bn' ? '৭ মিনিট পাঠ' : '7 min read',
            author: language === 'bn' ? 'আরিফ জামান, এআই আর্কিটেক্ট' : 'Arif Zaman, AI Research Lead',
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'
          },
          {
            id: 'art-3',
            title: language === 'bn'
              ? 'ক্লাউড নেটওয়ার্কের অটোমেটেড সিআই/সিডি এবং জিরো-ডাউনটাইম রেপ্লিকেশন'
              : 'Zero-Downtime Multi-Region Replication Frameworks on AWS & GCP',
            excerpt: language === 'bn'
              ? 'রিয়েল-টাইম ডাটা সিঙ্কিং এবং কুবারনেটস ইন্টিগ্রেশন প্যাটার্নস যা গ্যারান্টি দেয় নিরবচ্ছিন্ন ইউজার এক্সপেরিয়েন্স।'
              : 'A step-by-step masterclass on scaling database nodes across geographical clusters with minimal consistency lag.',
            body: language === 'bn'
              ? 'এন্টারপ্রাইজ সল্যুশনের নির্ভরযোগ্যতা রক্ষা করার জন্য কুবারনেটস ক্লাস্টার এবং ডকারাইজড কন্টেইনার আর্কিটেকচার এখন বেঞ্চমার্ক। ওআইটিএস ঢাকা টিম কীভাবে বিশ্বের বিভিন্ন জোনে ডাটা সিঙ্ক করার সময় রাইট-এন্ড-রীড অ্যাক্সেস ব্যালেন্স করেছে, তা এখানে বিশদ তুলে ধরা হয়েছে।\n\nমূল কৌশল:\n১. অ্যাক্টিভ-অ্যাক্টিভ মাল্টি-রিল মেথডলজি।\n২. লেটেন্সি-ভিত্তিক ক্লাউড ট্রাফিক রাউটিং এবং গ্লোবাল লোড ব্যালেন্সিং।\n৩. কুবারনেটস হেলথ ইন্ডিকেটর কনফিগারেশন।'
              : 'High Availability is the hallmark of modern software systems. Enterprise systems must design for complete geographical failure mitigation. This technical reference manual provides the infrastructure configuration scripts to implement automated read-replica handshakes on modern cloud providers under intense stress conditions.\n\nKey Strategic Pillars:\n- Utilizing active-active PostgreSQL databases paired with distributed message queues.\n- Route-53 Latency-Based Failover strategies to mask data center outages.\n- Self-healing Kubernetes microservice designs with zero packet drops.',
            category: language === 'bn' ? 'ইনফ্রাস্ট্রাকচার' : 'Infrastructure',
            originalCategory: 'infrastructure',
            date: language === 'bn' ? '০৫ জুন, ২০২৬' : 'June 05, 2026',
            readTime: language === 'bn' ? '৬ মিনিট পাঠ' : '6 min read',
            author: language === 'bn' ? 'সায়েম রেজা, ক্লাউড স্পেশালিস্ট' : 'Sayem Reza, DevOps Architect',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
          },
          {
            id: 'art-4',
            title: language === 'bn'
              ? 'সলিড রিয়্যাক্ট ১৯ আর্কিটেকচার এবং নতুন হাই-পারফরম্যান্স ওয়েব আর্ট'
              : 'React 19 Server Components & Concurrent Render Enhancements',
            excerpt: language === 'bn'
              ? 'নতুন রিয়্যাক্ট কম্পাইলার এবং অ্যাসিঙ্ক অ্যাকশন ব্যবহারের মাধ্যমে চমৎকার ব্রাউজার অপ্টিমাইজেশন।'
              : 'How the new compiler eliminates redundant re-renders, leverages action transitions, and boosts Core Web Vitals.',
            body: language === 'bn'
              ? 'ওয়েব অ্যাপ্লিকেশনের পারফরম্যান্স বৃদ্ধিতে রিয়্যাক্ট ১৯ (React 19) বিশ্বজুড়ে এক নতুন মাত্রা যোগ করেছে। মেমোরি ম্যানেজমেন্ট অপ্টিমাইজড করে রিয়্যাক্ট অটোমেটেড কম্পাইলার চালু করায়, এখন আর ইউজমেমো বা ইউজকলব্যাক নিয়ে মাথা ঘামাতে হবে না সিনিয়র ডেভেলপারদের। আমাদের অভিজ্ঞ ডেভেলপমেন্ট স্টুডিও কীভাবে এই কনসেপ্ট ব্যবহার করেছে তা জেনে নিন।\n\nরিসার্চের প্রধান হাইলাইটস:\n১. ডাবল রেন্ডার সাইক্লিং ট্র্যাকিং এবং প্রিভেন্টিং।\n২. ইউজ-হুকস মেমরি সলিউশন এবং সার্ভার অ্যাকশন টিউনিং।\n৩. স্টাইলশীট ও স্ক্রিপ্ট রিসোর্স প্রি-লোডিং।'
              : 'React 19 introduces structural shifts in state propagation, async transitions, and server components. By relying on the brand-new React Compiler to natively strip redundant re-renders, OITS Dhaka’s engineering studio achieved 40% improvements in baseline Lighthouse metrics.\n\nKey Strategic Pillars:\n- Seamless transition to compiler-directed memoization pipelines.\n- Harnessing Action Hooks to simplify form bindings and state loaders.\n- Client-side pre-fetching configurations optimized to slash server load.',
            category: language === 'bn' ? 'ফ্রন্টএন্ড' : 'Frontend',
            originalCategory: 'frontend',
            date: language === 'bn' ? '৩০ মে, ২০২৬' : 'May 30, 2026',
            readTime: language === 'bn' ? '৪ মিনিট পাঠ' : '4 min read',
            author: language === 'bn' ? 'সাকিব আবদুল্লাহ, সিনিয়র ডেভেলপার' : 'Sakib Abdullah, Front-End Guild Lead',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
          }
        ];
        resolve(mockArticles);
      }, 1500); // realistic latency check
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchMockBlogAPI().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [language]);

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(art => art.originalCategory === activeCategory);

  const sectionTitle = language === 'bn' ? 'জ্ঞানের মহড়া ও প্রযুক্তিগত প্রবন্ধ' : 'Thought Leadership & Technical Articles';
  const sectionSubtitle = language === 'bn' ? 'ওআইটিএস ঢাকা কলাম' : 'OITS DHAKA INSIGHTS';
  const sectionDesc = language === 'bn' 
    ? 'আমাদের সিনিয়র সফটওয়্যার ইঞ্জিনিয়ারদের গভীর কারিগরি টিপস, স্টাডি এবং স্থাপত্য সংক্রান্ত বাস্তব অভিজ্ঞতা অন্বেষণ করুন।' 
    : 'We don’t just build code; we push engineering boundaries. Read our deep analytical guides covering scalable design patterns, edge microservices, and specialized computing blueprints.';

  return (
    <section id="insights" className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 relative border-t border-slate-100 dark:border-slate-900 overflow-hidden">
      
      {/* Structural background accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-y-[-50%] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-800 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest font-mono">
            <BookOpen size={12} /> {sectionSubtitle}
          </div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-950 dark:text-white">
            {sectionTitle}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium">
            {sectionDesc}
          </p>
        </div>

        {/* Categories Filtering Header */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-slate-100 dark:border-slate-900">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black tracking-tight font-mono transition-all duration-300 active:scale-95 border ${
                activeCategory === cat.id
                  ? 'bg-slate-950 text-white dark:bg-blue-600 dark:border-blue-600 border-slate-950 shadow-md'
                  : 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading Skeleton Simulation Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-4 animate-pulse">
                <div className="aspect-[4/3] rounded-3xl bg-slate-100 dark:bg-slate-900 w-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-md w-1/3" />
                  <div className="h-6 bg-slate-100 dark:bg-slate-900 rounded-md w-5/6" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-md w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredArticles.map((art) => (
              <article 
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group cursor-pointer flex flex-col justify-between h-full bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900/80 rounded-3xl p-5 hover:border-blue-500/20 hover:bg-slate-100/50 dark:hover:bg-slate-900 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="space-y-4">
                  
                  {/* Aspect ratio frame with fast image optimisation params */}
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative bg-slate-200 dark:bg-slate-800">
                    <img 
                      src={`${art.image}&auto=format&fit=crop&q=80&w=600`}
                      alt={art.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-950/90 text-slate-800 dark:text-slate-200 text-[9px] font-black uppercase font-mono tracking-wider shadow-sm backdrop-blur-[4px]">
                      {art.category}
                    </div>
                  </div>

                  {/* Date and Readtime metadata */}
                  <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-[10px] font-mono font-black uppercase">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {art.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="flex items-center gap-1"><Clock size={11} /> {art.readTime}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-md font-black tracking-tight leading-snug text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {art.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {art.excerpt}
                  </p>

                </div>

                {/* Read Interface Arrow */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 mt-6 flex justify-between items-center text-xs font-black uppercase font-mono tracking-wider text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <span>{language === 'bn' ? 'আর্টিকেলটি পড়ুন' : 'Read Article'}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

      </div>

      {/* Full Article Modal Overlay */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-[6px] flex justify-end items-stretch animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedArticle(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedArticle(null);
          }}
        >
          {/* Scrollable Container Panel */}
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-950 h-full overflow-y-auto p-6 sm:p-12 shadow-2xl border-l border-slate-200 dark:border-slate-900 flex flex-col justify-between animate-in slide-in-from-right duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-10">
              
              {/* Overlay Top Controls */}
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-5">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase font-mono tracking-widest">
                  {selectedArticle.category}
                </span>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-all font-mono active:scale-95"
                  aria-label="Close modal slider"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Image Banner Header */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={`${selectedArticle.image}&auto=format&fit=crop&q=80&w=1200`} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Meta information row */}
              <div className="flex gap-4 flex-wrap items-center text-[10px] font-mono font-black uppercase text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {selectedArticle.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-1"><Clock size={12} /> {selectedArticle.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-1"><User size={12} /> {selectedArticle.author}</span>
              </div>

              {/* Title & Body content */}
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-snug">
                  {selectedArticle.title}
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-line border-l-4 border-blue-500 pl-4 py-1 italic bg-blue-50/20 dark:bg-blue-900/5 rounded-r-lg">
                  {selectedArticle.excerpt}
                </p>
                <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-bold space-y-4 whitespace-pre-line pt-4">
                  {selectedArticle.body}
                </div>
              </div>

            </div>

            {/* Bottom Back Button */}
            <div className="border-t border-slate-100 dark:border-slate-900 pt-8 mt-12">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-4 rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-mono text-xs font-black uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-blue-500 transition-all active:scale-95"
              >
                {language === 'bn' ? 'আর্টিকেলে ফিরুন' : 'Back to Insights'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
