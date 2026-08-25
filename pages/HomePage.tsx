import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Services } from '../components/Services';
import { Portfolio } from '../components/Portfolio';
import { GlobalReach } from '../components/GlobalReach';
import { Process } from '../components/Process';
import { TechStackSection } from '../components/TechStackSection';
import { Testimonials } from '../components/Testimonials';
import { Insights } from '../components/Insights';
import { Contact } from '../components/Contact';
import { BrandPaletteShowcase } from '../components/BrandPaletteShowcase';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <About />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <WhyChooseUs />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <Services />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <Portfolio />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <GlobalReach />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <Process />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <TechStackSection />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <Testimonials />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <Insights />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <Contact />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <BrandPaletteShowcase />
    </>
  );
};
