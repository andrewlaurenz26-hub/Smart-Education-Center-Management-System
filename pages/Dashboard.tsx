
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Zap,
  ArrowUpRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { getSystemInsight } from '../services/geminiService';

const chartData = [
  { name: 'Mon', students: 400, bookings: 240 },
  { name: 'Tue', students: 300, bookings: 139 },
  { name: 'Wed', students: 550, bookings: 980 },
  { name: 'Thu', students: 278, bookings: 390 },
  { name: 'Fri', students: 489, bookings: 480 },
  { name: 'Sat', students: 239, bookings: 380 },
  { name: 'Sun', students: 349, bookings: 430 },
];

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState("Analyzing system performance...");

  useEffect(() => {
    const fetchInsight = async () => {
      const text = await getSystemInsight("Current stats: 1,240 active students, 98% attendance rate, 15 new bookings today.");
      setInsight(text || "");
    };
    fetchInsight();
  }, []);

  const stats = [
    { label: 'Total Students', value: '1,240', icon: <Users size={22} />, trend: '+12.5%', color: 'from-blue-600 to-indigo-600', shadow: 'shadow-blue-500/30' },
    { label: 'Active Courses', value: '48', icon: <BookOpen size={22} />, trend: '+4.2%', color: 'from-purple-600 to-fuchsia-600', shadow: 'shadow-purple-500/30' },
    { label: 'New Bookings', value: '852', icon: <Calendar size={22} />, trend: '+23.1%', color: 'from-indigo-600 to-blue-600', shadow: 'shadow-indigo-500/30' },
    { label: 'Completion Rate', value: '94.2%', icon: <TrendingUp size={22} />, trend: '+0.8%', color: 'from-emerald-600 to-teal-600', shadow: 'shadow-emerald-500/30' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-600/10 text-indigo-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-[0.15em]">Live Operations</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Executive Control</h2>
          <p className="text-slate-500 font-medium text-lg mt-1">Strategic overview of center performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            Download Report
          </button>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2">
            <Sparkles size={16} /> New Entry
          </button>
        </div>
      </div>

      {/* AI Insight Cinematic Bar */}
      <div className="relative group overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[2rem] p-6 flex items-center gap-6 shadow-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600 rounded-2xl blur-lg opacity-40 animate-pulse"></div>
            <div className="relative bg-indigo-600 p-4 rounded-2xl text-white shadow-xl shadow-indigo-500/20">
              <Zap size={24} fill="currentColor" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Neural Intelligence Report</p>
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-indigo-300 rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-1 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
            <p className="text-lg text-slate-800 font-semibold leading-snug">{insight}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-50 transition-colors duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-2xl text-white shadow-xl ${stat.shadow} group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                <span className="flex items-center text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white border-slate-200 shadow-xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Engagement Flow</h3>
              <p className="text-slate-400 text-sm font-medium">Monitoring hourly activity trends</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                <Tooltip 
                  cursor={{stroke: '#4f46e5', strokeWidth: 1}}
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)'
                  }}
                  itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-white border-slate-200 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Live Pulse</h3>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { user: 'Sarah J.', action: 'completed UX program', time: '2m ago', color: 'bg-indigo-100 text-indigo-700', icon: '🏆' },
              { user: 'Lab 204', action: 'system maintenance', time: '14m ago', color: 'bg-emerald-100 text-emerald-700', icon: '⚙️' },
              { user: 'Marcus T.', action: 'new student enrollment', time: '1h ago', color: 'bg-amber-100 text-amber-700', icon: '👤' },
              { user: 'Network', action: 'firewall rules updated', time: '3h ago', color: 'bg-slate-100 text-slate-700', icon: '🛡️' },
              { user: 'Alice W.', action: 'certificate verified', time: '5h ago', color: 'bg-rose-100 text-rose-700', icon: '✅' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer hover:bg-slate-50 p-3 rounded-2xl transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-lg shadow-sm ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {item.user} <span className="font-normal text-slate-500">{item.action}</span>
                  </p>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{item.time}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-50 text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white rounded-[1.5rem] transition-all duration-300">
            Show Full History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
