import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { GlobalReach } from './components/GlobalReach';
import { Process } from './components/Process';
import { TechStackSection } from './components/TechStackSection';
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
import { ScrollAnimationWrapper } from './components/ScrollAnimationWrapper';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#070A13] text-slate-900 dark:text-slate-100 selection:bg-[#38BDF8]/20 selection:text-[#38BDF8] transition-colors duration-300 relative flex flex-col font-sans">
        
        {/* Dynamic Cursor Spotlight Effect */}
        <CursorSpotlight />

        {/* 1. Global Navigation Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 2. Hero Section - Immediate Load */}
          <Hero />

          {/* 3. About & Engineering Philosophy Section */}
          <ScrollAnimationWrapper>
            <About />
          </ScrollAnimationWrapper>

          {/* 4. Enterprise Services Section */}
          <ScrollAnimationWrapper>
            <Services />
          </ScrollAnimationWrapper>

          {/* 5. Portfolio & Case Studies Section */}
          <ScrollAnimationWrapper>
            <Portfolio />
          </ScrollAnimationWrapper>

          {/* 5.5 Global Geographic Reach Node Network */}
          <ScrollAnimationWrapper>
            <GlobalReach />
          </ScrollAnimationWrapper>

          {/* 6. Process & Delivery Timeline Section */}
          <ScrollAnimationWrapper>
            <Process />
          </ScrollAnimationWrapper>

          {/* 6.5 Technology Ecosystem Adoption Radar */}
          <ScrollAnimationWrapper>
            <TechStackSection />
          </ScrollAnimationWrapper>

          {/* 7. Social Proof & Tech Ecosystem Section */}
          <ScrollAnimationWrapper>
            <Testimonials />
          </ScrollAnimationWrapper>

          {/* 7.5 Intellectual Engineering Journal Insights */}
          <ScrollAnimationWrapper>
            <Insights />
          </ScrollAnimationWrapper>

          {/* 8. Direct Contact & Consultation Section */}
          <ScrollAnimationWrapper>
            <Contact />
          </ScrollAnimationWrapper>

          {/* 9. Brand Color Palette Component */}
          <ScrollAnimationWrapper>
            <BrandPaletteShowcase />
          </ScrollAnimationWrapper>
        </main>

        {/* 9. Global Footer */}
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
