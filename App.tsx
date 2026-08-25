import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { GlobalReach } from './components/GlobalReach';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Insights } from './components/Insights';
import { Contact } from './components/Contact';
import { BrandPaletteShowcase } from './components/BrandPaletteShowcase';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ExitIntentModal } from './components/ExitIntentModal';
import { BackToTop } from './components/BackToTop';
import { LanguageProvider } from './components/LanguageContext';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-slate-100 selection:bg-[#38BDF8]/20 selection:text-[#38BDF8] transition-colors duration-300 relative flex flex-col font-sans">
        
        {/* Dynamic Cursor Spotlight Effect */}
        <CursorSpotlight />

        {/* 1. Global Navigation Header */}
        <Header theme={theme} toggleTheme={toggleTheme} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 2. Hero Section */}
          <Hero />

          {/* 3. About & Engineering Philosophy Section */}
          <About />

          {/* 4. Enterprise Services Section */}
          <Services />

          {/* 5. Portfolio & Case Studies Section */}
          <Portfolio />

          {/* 5.5 Global Geographic Reach Node Network */}
          <GlobalReach />

          {/* 6. Process & Delivery Timeline Section */}
          <Process />

          {/* 7. Social Proof & Tech Ecosystem Section */}
          <Testimonials />

          {/* 7.5 Intellectual Engineering Journal Insights */}
          <Insights />

          {/* 8. Direct Contact & Consultation Section */}
          <Contact />

          {/* 9. Brand Color Palette Component */}
          <BrandPaletteShowcase />
        </main>

        {/* 9. Global Footer */}
        <Footer theme={theme} toggleTheme={toggleTheme} />

        {/* Interactive Overlays */}
        <AiAssistant />
        <ExitIntentModal />
        <BackToTop />
      </div>
    </LanguageProvider>
  );
}

export default App;
