
import React from 'react';
import { Book, FileText, Code, Settings, ChevronRight } from 'lucide-react';

const Documentation: React.FC = () => {
  const sections = [
    { title: 'Getting Started', icon: <Book size={18} />, topics: ['Installation', 'Quick Start Guide', 'System Requirements'] },
    { title: 'System Architecture', icon: <Settings size={18} />, topics: ['Load Balancer Config', 'DB Schema', 'API Reference'] },
    { title: 'User Guides', icon: <FileText size={18} />, topics: ['Student Enrollment', 'Certificate Issuance', 'Booking Calendar'] },
    { title: 'Dev Ops', icon: <Code size={18} />, topics: ['Deployment Flow', 'Environment Vars', 'CI/CD Pipeline'] },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-sm px-6">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Documentation</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Everything you need to know about managing the Smart Education Center system, 
          from daily operations to advanced server architecture.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <input 
            type="text" 
            placeholder="Search documentation..." 
            className="w-full max-w-md px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
            </div>
            <ul className="space-y-4">
              {section.topics.map((topic, tIdx) => (
                <li key={tIdx} className="group cursor-pointer flex items-center justify-between text-slate-600 hover:text-indigo-600 transition-colors">
                  <span className="font-medium">{topic}</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Technical Support?</h3>
            <p className="text-indigo-200 opacity-80">Our engineering team is available 24/7 for critical system failures.</p>
          </div>
          <button className="px-8 py-3 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl">
            Contact Engineering
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      </div>
    </div>
  );
};

export default Documentation;
