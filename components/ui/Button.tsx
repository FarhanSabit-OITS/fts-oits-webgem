
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
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.05] hover:shadow-2xl hover:shadow-slate-500/30 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:shadow-blue-600/40 dark:focus:ring-blue-500",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-900 hover:text-white hover:border-slate-900 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-white dark:hover:text-slate-950 dark:hover:border-white",
    ghost: "hover:bg-slate-100 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-8 text-sm",
    lg: "h-14 px-10 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
