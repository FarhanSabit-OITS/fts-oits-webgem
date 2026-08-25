import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  Share2, 
  BookOpen, 
  Bookmark, 
  Calendar, 
  X, 
  ChevronRight, 
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Terminal,
  Activity,
  Heart
} from 'lucide-react';

import { SectionWrapper } from './SectionWrapper';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: 'Architecture' | 'AI/ML' | 'DevOps' | 'Security';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  takeaways: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Architecting Ultra-Low Latency Pipelines for Fintech Transactions',
    excerpt: 'How OITS Dhaka engineered lock-free concurrent execution rings, stream telemetry under 200ms, and scaled in-memory cache replica nodes with zero packet leakage.',
    body: `In today’s high-volume fintech ecosystem, a delay of 100 milliseconds can translate to millions in slippage and lost arbitrage opportunities. When transaction volume spikes, standard queue structures introduce locking bottlenecks that saturate the main event loops. This deep dive breaks down how OITS Dhaka engineered a multi-threaded execution queue in low-level Rust and TypeScript to bypass non-blocking I/O cycles, achieving sub-millisecond thread execution profiles.

    By offloading database transaction queries to isolated background workers and establishing optimized Redis pipeline structures, we reduced write cycles to under 5ms. We also bypassed traditional multi-step serialization routines by using flat buffers directly in memory, which removed a massive amount of CPU overhead under load.

    Key Strategic Pillars of Low-Latency Systems:
    1. Event Loop Saturation Bypass via Worker Thread Offloading.
    2. Standardizing Lock-Free Ring Buffers to eliminate deadlocks.
    3. Granular Database Tuning and read-heavy caching paradigms.
    
    Ultimately, this architecture ensures high-frequency financial data stays clean, sequential, and fully durable even during catastrophic regional failover scenarios.`,
    category: 'Architecture',
    date: 'August 24, 2026',
    readTime: '5 min read',
    author: {
      name: 'Tahmid Rahman',
      role: 'Principal Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
    },
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'Lock-free ring buffers eliminate thread deadlocks.',
      'Flat buffers eliminate costly serialization CPU cycles.',
      'Offloading write heavy loops to background workers reduces main loop lag by 85%.'
    ]
  },
  {
    id: 'art-2',
    title: 'Deploying Quantized Deep Learning Models Directly inside Mobile Devices',
    excerpt: 'Techniques to compress heavy neural network layers, optimize on-device GPU inference frames, and protect user data privacy with zero external server dependencies.',
    body: `The decentralization of machine learning is shifting intelligence from gargantuan server clusters directly to local, low-power edge processors. In this study, OITS Dhaka’s research lab explores methods for compressing large convolutional neural networks into highly compact formats that can run directly inside iOS and Android applications.
    
    Through advanced post-training quantization, we successfully converted 32-bit floating-point weights into highly optimized 8-bit integer formats. This resulted in a massive 75% reduction in overall file size while preserving 99.1% of baseline model accuracy.
    
    Running models directly on-device removes latency from cellular network round-trips. It also provides complete privacy, since sensitive user data never leaves the hardware container. By utilizing the Apple Neural Engine (ANE) and Android Neural Networks API (NNAPI) through unified compilation pipelines, we achieved real-time 60FPS classification loops without thermal throttling.`,
    category: 'AI/ML',
    date: 'August 18, 2026',
    readTime: '7 min read',
    author: {
      name: 'Arif Zaman',
      role: 'AI Guild Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
    },
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'Layer weight quantization trims package weight by 3/4 with zero accuracy drops.',
      'Native hardware API direct binding prevents app thermal throttling.',
      'On-device execution guarantees offline availability and absolute privacy.'
    ]
  },
  {
    id: 'art-3',
    title: 'Zero-Downtime Multi-Region Replication Frameworks on AWS & GCP',
    excerpt: 'A masterclass on scaling database nodes across geographical clusters with minimal consistency lag, automated failover routes, and self-healing systems.',
    body: `High Availability is the hallmark of modern software systems. When designing enterprise applications, we must prepare for entire data center outages due to weather, fiber cuts, or cyberattacks. This technical guide outlines OITS Dhaka’s standard multi-region active-active database replication playbook.
    
    We rely on PostgreSQL with distributed replication managers paired with latency-based DNS routing. When a region goes offline, health check sensors instantly redirect global user traffic to the secondary cluster, completely transparently to the user.
    
    To combat consistency delay between continents, we implemented a custom write-ahead log (WAL) pre-shipper that resolves conflict conditions in real-time. This reduces the eventual consistency window from seconds down to less than 120ms.`,
    category: 'DevOps',
    date: 'August 12, 2026',
    readTime: '6 min read',
    author: {
      name: 'Sayem Reza',
      role: 'DevOps Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'DNS latency-based routing dynamically shifts traffic under 10 seconds.',
      'Eventual consistency is minimized with synchronized local message streams.',
      'Active-active cross-cloud infrastructure eliminates single point of failure limits.'
    ]
  },
  {
    id: 'art-4',
    title: 'Zero-Trust API Hardening: Bypassing the OWASP Top 10 Vulnerabilities',
    excerpt: 'An elite security briefing on enforcing JWT signing key rotation, restricting CORS headers, and preventing SQL injection vectors across modern microservices.',
    body: `Modern API endpoints are the primary targets for corporate industrial espionage and data breaches. Standard perimeter security is no longer sufficient; enterprise apps must enforce a strict Zero-Trust Architecture. Every request must be authenticated, authorized, and deeply inspected.
    
    This briefing analyzes how OITS Dhaka secures microservices against injection attacks, broken object-level authorization, and data exposure. By utilizing cryptographically signed JSON Web Tokens (JWT) with automated 24-hour public-key rotation, we render compromised tokens instantly useless.
    
    Furthermore, we implement strict automated rate-limiting buckets based on client IP addresses and API keys to defend against denial-of-service attempts. All network payloads are strictly validated against JSON schema specs prior to reaching application routing logic.`,
    category: 'Security',
    date: 'August 05, 2026',
    readTime: '8 min read',
    author: {
      name: 'Nusrat Jahan',
      role: 'SecOps Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'Automated key rotation locks out stale compromised tokens.',
      'Schema boundary validation blocks malicious query injection.',
      'IP rate limit throttling mitigates coordinated DDoS attacks.'
    ]
  },
  {
    id: 'art-5',
    title: 'Designing Next-Gen Micro-Frontends for Massive Scale Portals',
    excerpt: 'Decomposing large monolithic web apps into autonomous, lazy-loaded modules without layout shifts or style leakage.',
    body: `When scaling software organizations, the frontend codebase can become a major development bottleneck. When hundreds of developers commit to a single monorepo, build pipelines slow down and regression issues proliferate. The solution is Micro-Frontends.
    
    By separating modular business sectors into isolated repositories and bundling them using Module Federation, OITS Dhaka enables autonomous product teams to deploy features independently. We use localized CSS variables and shadow DOM boundaries to completely eliminate CSS class collisions.
    
    This guide highlights how to manage shared application state without coupling micro-applications, and how to optimize shared package dependencies to ensure users only download shared modules once.`,
    category: 'Architecture',
    date: 'July 28, 2026',
    readTime: '6 min read',
    author: {
      name: 'Tahmid Rahman',
      role: 'Principal Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
    },
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'Webpack Module Federation enables atomic team feature rollouts.',
      'Shadow DOM encapsulation prevents global layout shifts.',
      'Shared dependency configuration reduces overall bundle payload size.'
    ]
  },
  {
    id: 'art-6',
    title: 'Harnessing Retrieval-Augmented Generation for Business ERP Systems',
    excerpt: 'Connecting enterprise databases safely to large language models using vector databases, semantic search embedding, and prompt engineering.',
    body: `While Large Language Models (LLMs) are exceptionally powerful, they suffer from knowledge cutoff limits and hallucinations. In a corporate environment, absolute precision is critical. Retrieval-Augmented Generation (RAG) resolves this by augmenting the prompt with verified real-time database facts.
    
    This technical manual covers how OITS Dhaka designs secure RAG pipelines. We extract unstructured company PDF documentation, convert them into vector embeddings, and store them inside high-speed vector index nodes.
    
    When a staff member asks a question, we run a semantic cosine-similarity query to pull relevant paragraphs, inject them into the LLM prompt as ground facts, and guarantee factual, highly customized responses without leaking intellectual property.`,
    category: 'AI/ML',
    date: 'July 15, 2026',
    readTime: '9 min read',
    author: {
      name: 'Arif Zaman',
      role: 'AI Guild Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
    },
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    takeaways: [
      'Semantic embeddings anchor LLM outputs to verifiable database records.',
      'Secure vector indices block unauthorized user document access.',
      'Cosine similarity lookup yields relevant context under 50 milliseconds.'
    ]
  }
];

const CATEGORIES = ['All', 'Architecture', 'AI/ML', 'DevOps', 'Security'] as const;

export const Insights: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Simple bookmarks toggler
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  // Simple likes toggler
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(lId => lId !== id) : [...prev, id]
    );
  };

  // Share API fallback handler
  const handleShare = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  // Filter and search logic combined
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article (first one matching selected category or overall first)
  const featuredArticle = useMemo(() => {
    if (selectedCategory === 'All') {
      return ARTICLES[0];
    }
    return ARTICLES.find(art => art.category === selectedCategory) || ARTICLES[0];
  }, [selectedCategory]);

  // Rest of articles in grid (exclude featured article)
  const gridArticles = useMemo(() => {
    return filteredArticles.filter(art => art.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  return (
    <>
      <SectionWrapper id="insights" className="bg-white dark:bg-[#070A13]">
        
        {/* Section Header */}
        <div id="insights-hub" className="space-y-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block">
                ENGINEERING JOURNAL & TELEMETRY INSIGHTS
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-950 dark:text-white">
                Thought Leadership Hub
              </h2>
            </div>

            {/* Real-time Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search size={16} />
              </span>
              <input 
                type="text"
                placeholder="Search telemetry articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-100 dark:border-slate-900 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  // Reset search query on filter click to avoid confusing empty states
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-slate-950 dark:bg-sky-500 text-white border-slate-950 dark:border-sky-500 font-bold'
                    : 'bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center space-y-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <span className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 inline-block">
              <Search size={24} />
            </span>
            <p className="font-mono text-xs text-slate-500">
              No articles matching "{searchQuery}" under {selectedCategory} category.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-slate-950 dark:bg-sky-500 text-white text-[10px] font-mono uppercase tracking-wider font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* 1. Featured Post Banner (Top Grid Unit) */}
            {/* Show featured banner only if no specific search query filters are applied */}
            {!searchQuery && (
              <div 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="group cursor-pointer border border-slate-200/80 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 rounded-[2rem] p-6 lg:p-8 transition-all duration-500 hover:border-sky-500/40 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column (7 cols) - High-resolution aspect ratio thumbnail */}
                  <div className="lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={`${featuredArticle.image}&auto=format&fit=crop&q=80&w=1200`} 
                      alt={featuredArticle.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Category overlay & Read time */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 text-white text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-[4px] border border-white/10">
                        {featuredArticle.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-sky-500/80 text-white text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-[4px]">
                        {featuredArticle.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Right Column (5 cols) - Author metadata,Published date,Title,Excerpt */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={featuredArticle.author.avatar} 
                        alt={featuredArticle.author.name} 
                        className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                      />
                      <div>
                        <span className="font-mono text-[10px] font-bold text-slate-800 dark:text-slate-200 block leading-none">
                          {featuredArticle.author.name}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 block mt-1">
                          {featuredArticle.author.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                        <Calendar size={12} /> {featuredArticle.date}
                        <span>•</span>
                        <span className="text-emerald-500">FEATURED TELEMETRY</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-black text-slate-950 dark:text-white leading-tight tracking-tight group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-300">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-slate-950 dark:text-white uppercase tracking-widest border-b border-slate-900 dark:border-white pb-1 group-hover:gap-4 transition-all">
                        Read Article <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 2. Articles Bento Grid (3-column responsive) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="group cursor-pointer flex flex-col justify-between h-full bg-slate-50/20 dark:bg-slate-950/20 border border-slate-200/80 dark:border-slate-800 rounded-[1.5rem] p-5 hover:border-sky-500/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="space-y-4">
                    
                    {/* Thumbnail Container */}
                    <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={`${art.image}&auto=format&fit=crop&q=80&w=600`} 
                        alt={art.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Monospaced Category overlay */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/90 dark:bg-slate-900/90 text-white text-[8px] font-mono font-bold uppercase tracking-wider backdrop-blur-[2px] border border-white/10">
                        {art.category}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {art.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {art.readTime}</span>
                    </div>

                    {/* Title & Excerpt */}
                    <div className="space-y-2">
                      <h4 className="text-md font-bold tracking-tight text-slate-950 dark:text-white line-clamp-2 leading-snug group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                  </div>

                  {/* Footer Bar with Action Triggers */}
                  <div className="pt-5 border-t border-slate-100 dark:border-slate-900 mt-5 flex items-center justify-between">
                    {/* Author block */}
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={art.author.avatar} 
                        alt={art.author.name} 
                        className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                      />
                      <span className="font-mono text-[9px] font-bold text-slate-500 dark:text-slate-400">
                        {art.author.name}
                      </span>
                    </div>

                    {/* Action icons */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => toggleLike(art.id, e)}
                        className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                          likedIds.includes(art.id) ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                        }`}
                        aria-label="Like insight"
                      >
                        <Heart size={14} fill={likedIds.includes(art.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button 
                        onClick={(e) => toggleBookmark(art.id, e)}
                        className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                          bookmarkedIds.includes(art.id) ? 'text-sky-500' : 'text-slate-400 hover:text-sky-500'
                        }`}
                        aria-label="Bookmark insight"
                      >
                        <Bookmark size={14} fill={bookmarkedIds.includes(art.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button 
                        onClick={(e) => handleShare(art, e)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        aria-label="Share insight link"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}
      </SectionWrapper>

      {/* 3. Interactive Modal / Drawer Reader */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex justify-end items-stretch"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedArticle(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedArticle(null);
          }}
        >
          {/* Slider Panel container */}
          <div 
            className="w-full max-w-2xl bg-white dark:bg-[#070A13] h-full overflow-y-auto p-6 sm:p-12 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-8">
              
              {/* Header bar controls */}
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-5">
                <span className="px-3.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-sky-400 text-[9px] font-mono font-bold uppercase tracking-widest border border-slate-200/50 dark:border-slate-800/80">
                  {selectedArticle.category}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-slate-400 mr-2 uppercase tracking-wider">{selectedArticle.readTime}</span>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    aria-label="Close panel"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Title & Author card */}
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight leading-snug">
                  {selectedArticle.title}
                </h3>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-800/40 p-3 rounded-2xl">
                  <img 
                    src={selectedArticle.author.avatar} 
                    alt={selectedArticle.author.name} 
                    className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                  />
                  <div>
                    <span className="font-mono text-[10px] font-bold text-slate-900 dark:text-white block leading-none">
                      {selectedArticle.author.name}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400 block mt-1">
                      {selectedArticle.author.role}
                    </span>
                  </div>
                  <span className="ml-auto font-mono text-[9px] text-slate-500">{selectedArticle.date}</span>
                </div>
              </div>

              {/* Aspect Ratio Banner */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={`${selectedArticle.image}&auto=format&fit=crop&q=80&w=1200`} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Excerpt callout */}
              <p className="text-slate-600 dark:text-slate-300 text-sm italic font-medium border-l-4 border-sky-500 dark:border-sky-500 pl-4 py-1 leading-relaxed bg-slate-50 dark:bg-slate-900/10">
                "{selectedArticle.excerpt}"
              </p>

              {/* Content body with standard layout */}
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm space-y-4 whitespace-pre-line font-medium">
                {selectedArticle.body}
              </div>

              {/* Key takeaways callout box */}
              {selectedArticle.takeaways && selectedArticle.takeaways.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl space-y-3">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 font-bold">
                    <Sparkles size={14} className="text-sky-500" /> Key Architectural Takeaways:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-disc pl-5">
                    {selectedArticle.takeaways.map((takeaway, i) => (
                      <li key={i}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Modal Bottom control */}
            <div className="border-t border-slate-100 dark:border-slate-900 pt-8 mt-12 flex gap-4">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex-1 py-4 rounded-xl bg-slate-950 dark:bg-sky-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Return to Journal
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
};
