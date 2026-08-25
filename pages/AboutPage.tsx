import React from 'react';
import { About } from '../components/About';
import { WhyChooseUs } from '../components/WhyChooseUs';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <About />
      <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />
      <WhyChooseUs />
    </div>
  );
};
