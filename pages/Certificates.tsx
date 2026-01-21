
import React, { useState } from 'react';
import { Award, Search, Download, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Certificate } from '../types';

const MOCK_CERTIFICATES: Certificate[] = [
  { id: 'C-001', studentId: '1', studentName: 'Alice Wong', courseName: 'Full Stack Development', issueDate: '2023-12-20', hash: '8f2a1b3c...' },
  { id: 'C-002', studentId: '3', studentName: 'Charlie Davis', courseName: 'UI/UX Design', issueDate: '2023-11-15', hash: '2d9e4f1a...' },
];

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Certificate Management</h2>
          <p className="text-slate-500">Verify and issue digital credentials secured by hash verification.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
          <Award size={18} /> Issue New Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Certificate List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by student or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {MOCK_CERTIFICATES.map(cert => (
              <div 
                key={cert.id} 
                onClick={() => setSelectedCert(cert)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedCert?.id === cert.id 
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Award size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified</span>
                </div>
                <h4 className="font-bold text-slate-900">{cert.studentName}</h4>
                <p className="text-xs text-slate-500 mb-2">{cert.courseName}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                  <ShieldCheck size={10} /> {cert.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="lg:col-span-2">
          {selectedCert ? (
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl animate-in zoom-in duration-300">
              <div className="p-12 relative overflow-hidden flex flex-col items-center text-center">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full -ml-20 -mb-20 opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg">
                    <Award size={48} />
                  </div>
                  
                  <h3 className="text-indigo-600 font-bold tracking-widest uppercase mb-6">Certificate of Completion</h3>
                  <p className="text-slate-500 text-lg italic mb-2">This is to certify that</p>
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-6 font-serif">{selectedCert.studentName}</h2>
                  <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
                    has successfully completed all the requirements of the intensive professional course in
                  </p>
                  <h4 className="text-2xl font-bold text-indigo-900 mb-12 underline underline-offset-8 decoration-indigo-200">{selectedCert.courseName}</h4>
                  
                  <div className="grid grid-cols-2 gap-16 w-full max-w-lg mt-8 pt-8 border-t border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Issue Date</p>
                      <p className="font-bold text-slate-900">{selectedCert.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Director Signature</p>
                      <p className="font-serif italic text-xl text-slate-700">James Wilson</p>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-50 w-full flex justify-between items-center text-[10px] text-slate-400">
                    <p>VERIFICATION ID: {selectedCert.id}</p>
                    <p>SYSTEM HASH: {selectedCert.hash}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                  <CheckCircle2 size={18} /> Verified by SEC Blockchain
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                    <Download size={16} /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <Award size={32} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">No Certificate Selected</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">Select a student from the list to preview, download, or share their completion certificate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
