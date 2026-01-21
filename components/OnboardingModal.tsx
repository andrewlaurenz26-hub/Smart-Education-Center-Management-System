
import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, BookOpen, Sparkles, ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { getOnboardingWelcome } from '../services/geminiService';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (studentData: any) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    course: '',
  });
  const [aiWelcome, setAiWelcome] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const courses = [
    'Full Stack Development',
    'Data Science',
    'UI/UX Design',
    'Project Management',
    'Cyber Security'
  ];

  useEffect(() => {
    if (step === 3 && !aiWelcome) {
      const fetchWelcome = async () => {
        setIsLoadingAi(true);
        const welcome = await getOnboardingWelcome(formData.name, formData.course);
        setAiWelcome(welcome || '');
        setIsLoadingAi(false);
      };
      fetchWelcome();
    }
  }, [step, formData]);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const isStep1Valid = formData.name && formData.email && formData.phoneNumber && formData.address;
  const isStep2Valid = formData.course;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
        
        {/* Progress Header */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <Sparkles size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Student Onboarding</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-indigo-600' : 'bg-slate-100'}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 p-8 pt-4 overflow-y-auto min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Build their profile</h3>
                <p className="text-slate-500">Enter the essential personal details to register the new student.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phoneNumber}
                      onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Residence</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      placeholder="City, State, Country"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Select First Course</h3>
                <p className="text-slate-500">Which academic track will {formData.name || 'the student'} embark on first?</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {courses.map(course => (
                  <button
                    key={course}
                    onClick={() => setFormData({...formData, course})}
                    className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all text-left ${
                      formData.course === course 
                        ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                        : 'border-slate-100 bg-white hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${formData.course === course ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{course}</p>
                        <p className="text-xs text-slate-500">Professional Certification • 12 Weeks</p>
                      </div>
                    </div>
                    {formData.course === course && <CheckCircle2 className="text-indigo-600" size={24} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 text-center">
              <div>
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Launch!</h3>
                <p className="text-slate-500">We've gathered all the details. Here's what AI thinks about this journey.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
                  <Sparkles size={80} className="text-indigo-600" />
                </div>
                
                <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4">Personalized Advisor Note</h4>
                
                {isLoadingAi ? (
                  <div className="flex flex-col items-center justify-center py-6 text-indigo-600 gap-3">
                    <Loader2 className="animate-spin" size={24} />
                    <p className="text-sm font-medium animate-pulse">Consulting educational models...</p>
                  </div>
                ) : (
                  <p className="text-lg text-slate-700 font-medium leading-relaxed italic">
                    "{aiWelcome}"
                  </p>
                )}

                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4">
                  <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Track</p>
                    <p className="text-xs font-bold text-slate-800">{formData.course}</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                    <p className="text-xs font-bold text-emerald-600">Enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 pt-0 flex gap-3">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="flex-1 py-4 px-6 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              <ChevronLeft size={20} /> Back
            </button>
          )}
          {step < 3 ? (
            <button 
              onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="flex-[2] py-4 px-6 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:shadow-none"
            >
              Next Step <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={() => onComplete(formData)}
              className="flex-[2] py-4 px-6 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              Finish Setup <Sparkles size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
