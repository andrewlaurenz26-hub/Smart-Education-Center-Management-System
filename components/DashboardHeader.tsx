
import React from 'react';
import { Search, Bell, Settings, User, Command } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="h-20 glass sticky top-0 z-40 px-10 flex items-center justify-between border-b border-white/40">
      <div className="relative group w-[400px]">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Type to search or ' / ' for commands..." 
          className="w-full bg-slate-100/50 backdrop-blur-md border border-slate-200/50 rounded-2xl py-3 pl-12 pr-12 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all placeholder:text-slate-400"
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
            <Command size={10} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-3 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all relative group">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm animate-bounce"></span>
          </button>
          <button className="p-3 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all">
            <Settings size={20} />
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-200/60 mx-1"></div>
        
        <div className="flex items-center gap-4 pl-2 group cursor-pointer p-1.5 pr-4 rounded-2xl hover:bg-slate-50 transition-all">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-20 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 shadow-sm overflow-hidden border border-white">
              <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-black text-slate-900 leading-tight">Alex Sterling</p>
            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">System Director</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
