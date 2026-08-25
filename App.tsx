import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ExitIntentModal } from './components/ExitIntentModal';
import { BackToTop } from './components/BackToTop';
import { LanguageProvider } from './components/LanguageContext';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Optionally add a temporary highlight
          element.classList.add('ring-2', 'ring-[#38BDF8]');
          setTimeout(() => element.classList.remove('ring-2', 'ring-[#38BDF8]'), 2000);
        }
      }, 300); // Wait for page to render
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-slate-100 selection:bg-[#38BDF8]/20 selection:text-[#38BDF8] transition-colors duration-300 relative flex flex-col font-sans">
        
        {/* Scroll handler */}
        <ScrollToHash />

        {/* Dynamic Cursor Spotlight Effect */}
        <CursorSpotlight />

        {/* Global Navigation Header */}
        <Header />

        {/* Main Content Sections (Routed) */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Interactive Overlays */}
        <AiAssistant />
        <ExitIntentModal />
        <BackToTop />
      </div>
    </LanguageProvider>
  );
}

export default App;
