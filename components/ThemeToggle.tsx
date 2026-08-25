import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="global-theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="relative p-2.5 rounded-full bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all shadow-sm active:scale-95"
    >
      {isDark ? (
        <Sun size={15} className="text-amber-400" />
      ) : (
        <Moon size={15} className="text-slate-700" />
      )}
    </button>
  );
};

