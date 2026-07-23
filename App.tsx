
import React, { useState, useEffect } from 'react';
import { ComingSoon } from './components/ComingSoon';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ExitIntentModal } from './components/ExitIntentModal';

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300 relative">
      <CursorSpotlight />
      <ComingSoon />
      <ExitIntentModal />
    </div>
  );
}

export default App;
