import React from 'react';
import { motion } from 'motion/react';
import { LogOut, LayoutDashboard, Settings, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate home 
    navigate('/');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-[#070A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <LayoutDashboard className="text-[#38BDF8]" size={28} />
              Workspace Portal
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Welcome back to your enterprise dashboard.
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-red-500/50 flex items-center gap-2 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Mock Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Active Projects</h3>
            <p className="text-2xl font-mono text-slate-700 dark:text-slate-300">0</p>
          </div>
          
          <div className="bg-white dark:bg-[#0C1222] border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
              <Settings size={20} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Support Tickets</h3>
            <p className="text-2xl font-mono text-slate-700 dark:text-slate-300">0</p>
          </div>
        </div>

      </div>
    </div>
  );
};
