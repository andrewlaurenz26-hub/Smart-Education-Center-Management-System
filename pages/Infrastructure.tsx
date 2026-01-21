
import React, { useState } from 'react';
import { 
  Server, 
  Network, 
  ShieldCheck, 
  HardDrive, 
  Activity, 
  ArrowRight,
  RefreshCw,
  Lock,
  Globe,
  Database
} from 'lucide-react';
import { INFRA_CATEGORIES } from '../constants';

const Infrastructure: React.FC = () => {
  const [activeTab, setActiveTab] = useState('server');

  const renderServer = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity className="text-indigo-600" size={20} /> Compute Resources
        </h3>
        <div className="space-y-6">
          {[
            { label: 'CPU Usage', value: 34, color: 'bg-indigo-600' },
            { label: 'Memory', value: 58, color: 'bg-purple-600' },
            { label: 'Disk I/O', value: 12, color: 'bg-blue-600' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600">{item.label}</span>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Instances</p>
            <p className="text-lg font-bold text-slate-900">12</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Region</p>
            <p className="text-lg font-bold text-slate-900">US-E1</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Uptime</p>
            <p className="text-lg font-bold text-emerald-600">99.9%</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Server size={120} />
        </div>
        <h3 className="text-lg font-bold mb-4">Cluster Architecture</h3>
        <p className="text-slate-400 text-sm mb-8">Node distribution across availability zones.</p>
        <div className="space-y-4 relative z-10">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Database size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">Node SEC-PRD-0{i}</p>
                <p className="text-xs text-indigo-400">Status: Running</p>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNetwork = () => (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Internal VNet Mesh</h3>
            <p className="text-slate-500">Secure subnet isolation and zero-trust routing configuration.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Globe className="text-blue-600 mb-2" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase">External Ingress</p>
              <p className="text-sm font-bold text-slate-900">Cloudflare WAF</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Lock className="text-emerald-600 mb-2" size={24} />
              <p className="text-xs font-bold text-slate-400 uppercase">Tunneling</p>
              <p className="text-sm font-bold text-slate-900">Wireguard Mesh</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-96 flex flex-col gap-4 items-center justify-center p-8 bg-slate-50 rounded-3xl border border-slate-200 border-dashed">
           {/* Visual Network Diagram Mock */}
           <div className="flex flex-col gap-6 items-center">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm">
                <Globe size={24} className="text-slate-400" />
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-lg">Load Balancer</div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex gap-4">
                <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm text-[10px] font-bold">App Tier</div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm text-[10px] font-bold">Data Tier</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Infrastructure & Operations</h2>
          <p className="text-slate-500">Monitor system health, network topology, and security posture.</p>
        </div>
        <div className="bg-white border border-slate-200 p-1 rounded-xl flex shadow-sm">
          {INFRA_CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === cat.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'server' && renderServer()}
      {activeTab === 'network' && renderNetwork()}
      
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Security Event Log</h3>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <ShieldCheck size={14} /> Enhanced Shield Active
                </span>
             </div>
             <div className="space-y-4">
                {[
                  { event: 'SQL Injection blocked', src: '192.168.1.1', time: '10 min ago', status: 'Blocked' },
                  { event: 'Root login detected', src: 'Internal Auth', time: '1h ago', status: 'Logged' },
                  { event: 'TLS handshake fail', src: 'Unknown Bot', time: '3h ago', status: 'Rejected' },
                ].map((e, i) => (
                  <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{e.event}</p>
                      <p className="text-xs text-slate-400">{e.src} • {e.time}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-100">
                      {e.status}
                    </span>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-indigo-900 p-6 rounded-3xl text-white flex flex-col items-center justify-center text-center">
            <Lock size={48} className="text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">2FA Enforcement</h3>
            <p className="text-sm text-indigo-200 opacity-80 mb-6">98% of administrative staff have multi-factor authentication enabled.</p>
            <div className="w-full bg-white/10 p-4 rounded-2xl">
               <div className="flex justify-between text-xs mb-2">
                 <span>Compliance Score</span>
                 <span>A+</span>
               </div>
               <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-400 w-[95%]"></div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center animate-in slide-in-from-bottom-4 duration-500">
           <div className="w-32 h-32 flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
             <RefreshCw size={48} className="animate-spin-slow" />
           </div>
           <div className="flex-1 text-center md:text-left">
             <h3 className="text-2xl font-bold text-slate-900 mb-2">Active Data Backup Policy</h3>
             <p className="text-slate-500 mb-6">Snapshotting database every 6 hours. Off-site replication to S3 Glacier active.</p>
             <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Last Success</p>
                 <p className="text-sm font-bold text-slate-900">14:30 PM Today</p>
               </div>
               <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Storage Used</p>
                 <p className="text-sm font-bold text-slate-900">2.4 TB</p>
               </div>
               <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Retention</p>
                 <p className="text-sm font-bold text-slate-900">90 Days</p>
               </div>
             </div>
           </div>
           <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
             Trigger Manual Backup
           </button>
        </div>
      )}
    </div>
  );
};

export default Infrastructure;
