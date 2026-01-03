
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { SectionId } from './types';
import { COMPANY_NAME, TAGLINE } from './constants';
import { ArrowUp } from 'lucide-react';

const SEO_DATA = {
  [SectionId.HOME]: {
    title: `${COMPANY_NAME} | ${TAGLINE}`,
    description: "Transforming ideas into digital reality with expert web and mobile development services in Dhaka."
  },
  [SectionId.SERVICES]: {
    title: `Expert Services - ${COMPANY_NAME}`,
    description: "From custom web apps to scalable enterprise cloud solutions."
  },
  [SectionId.PROCESS]: {
    title: `Our Process - ${COMPANY_NAME}`,
    description: "Discover our agile lifecycle for delivering world-class software."
  },
  [SectionId.ABOUT]: {
    title: `Who We Are - ${COMPANY_NAME}`,
    description: "A team of passionate engineers and designers dedicated to your success."
  },
  [SectionId.PORTFOLIO]: {
    title: `Our Work - ${COMPANY_NAME}`,
    description: "Explore the successful products we've built for global clients."
  },
  [SectionId.CONTACT]: {
    title: `Start Your Project - ${COMPANY_NAME}`,
    description: "Contact OITS Dhaka for a consultation and free project estimate."
  }
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const seoInfo = SEO_DATA[sectionId as SectionId] || SEO_DATA[SectionId.HOME];
          
          if (seoInfo) {
            document.title = seoInfo.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute('content', seoInfo.description);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3
    });

    Object.values(SectionId).forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300 relative">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme} />
      <AiAssistant />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-[90] p-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xl border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-110 active:scale-95 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top of page"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}

export default App;
