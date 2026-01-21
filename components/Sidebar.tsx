
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { AppView } from '../types';
import { GraduationCap, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="w-72 sidebar-gradient text-slate-300 h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50 overflow-hidden">
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 w-full h-64 bg-indigo-500/10 blur-[100px] pointer-events-none -translate-y-1/2"></div>
      
      <div className="p-8 pb-10 flex items-center gap-4 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-900/40">
            <GraduationCap className="text-white" size={26} />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-white text-xl tracking-tight leading-none">
            SMART <br /> <span className="text-indigo-400 font-bold text-base opacity-90">EDUCATION</span>
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-2 relative z-10">
        <p className="px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-4">Main Navigation</p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative ${
              currentView === item.id 
                ? 'bg-indigo-600/10 text-white border border-indigo-500/20' 
                : 'hover:bg-slate-800/50 hover:text-white border border-transparent'
            }`}
          >
            {currentView === item.id && (
              <div className="absolute left-0 w-1.5 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            )}
            <span className={`transition-transform duration-300 group-hover:scale-110 ${currentView === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'}`}>
              {item.icon}
            </span>
            <span className="font-semibold text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8 relative z-10">
        <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-5 border border-slate-700/50 shadow-inner group cursor-pointer hover:bg-slate-800/60 transition-all">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.15em]">Security Scan</p>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
               <span className="text-emerald-500 font-bold text-xs">A+</span>
             </div>
             <div>
               <p className="text-xs font-bold text-white">All Systems Clear</p>
               <p className="text-[10px] text-slate-500">Last check: 1m ago</p>
             </div>
          </div>
        </div>
        
        <button className="w-full mt-6 flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all font-bold text-sm">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
