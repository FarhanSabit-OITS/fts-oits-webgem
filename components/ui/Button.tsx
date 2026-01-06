import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-black tracking-tight transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.96] overflow-hidden relative group/btn-ui transform-gpu";
  
  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-800 hover:scale-[1.05] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.6)] border border-transparent shadow-lg",
    secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200 hover:scale-[1.03] dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    outline: "border-2 border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-transparent backdrop-blur-sm text-slate-950 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-500 hover:scale-[1.02] shadow-sm",
    ghost: "hover:bg-slate-100 text-slate-800 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-11 px-6 text-sm",
    md: "h-14 px-10 text-base",
    lg: "h-20 px-14 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn-ui:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};