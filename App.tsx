
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Certificates from './pages/Certificates';
import Booking from './pages/Booking';
import Infrastructure from './pages/Infrastructure';
import Documentation from './pages/Documentation';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <Students />;
      case 'certificates': return <Certificates />;
      case 'booking': return <Booking />;
      case 'infrastructure': return <Infrastructure />;
      case 'documentation': return <Documentation />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-indigo-100 selection:text-indigo-700">
      {/* Decorative Background Circles */}
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-indigo-200/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[40%] bg-purple-200/20 blur-[150px] rounded-full pointer-events-none"></div>
      
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 ml-72 min-h-screen flex flex-col relative z-10">
        <DashboardHeader />
        
        <div className="p-10 pb-24 flex-1 overflow-y-auto">
          {renderView()}
        </div>
        
        <footer className="h-16 border-t border-slate-200/60 bg-white/50 backdrop-blur-md flex items-center justify-between px-10 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
          <span>&copy; 2024 Smart Education OS</span>
          <div className="flex gap-6">
            <span className="text-indigo-500">Security: Tier 4</span>
            <span>v2.4.0-Stable Production</span>
          </div>
        </footer>
      </main>

      {/* Premium Status Bar */}
      <div className="fixed bottom-10 right-10 z-50">
        <div className="glass px-6 py-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 animate-in slide-in-from-right-10 duration-700">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Network Shield Active</span>
          </div>
          <div className="h-4 w-px bg-slate-300"></div>
          <span className="text-[10px] font-bold text-slate-500 italic">Latency: 24ms</span>
        </div>
      </div>
    </div>
  );
};

export default App;
