
import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Mail, ExternalLink, Plus, Sparkles, X, ChevronRight, Loader2, Calendar, Clock, Bell, CheckCircle, Phone, MapPin, Download } from 'lucide-react';
import { Student } from '../types';
import { generateCourseSuggestion } from '../services/geminiService';
import OnboardingModal from '../components/OnboardingModal';

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Alice Wong', email: 'alice@example.com', phoneNumber: '+1 (555) 012-3456', address: '123 Tech Lane, San Francisco, CA', course: 'Full Stack Development', enrollmentDate: '2023-09-12', status: 'Active', avatar: 'https://picsum.photos/seed/alice/100/100' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', phoneNumber: '+1 (555) 987-6543', address: '456 Data Street, New York, NY', course: 'Data Science', enrollmentDate: '2023-10-01', status: 'Active', avatar: 'https://picsum.photos/seed/bob/100/100' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', phoneNumber: '+1 (555) 246-8135', address: '789 Design Way, Austin, TX', course: 'UI/UX Design', enrollmentDate: '2023-08-20', status: 'Graduated', avatar: 'https://picsum.photos/seed/charlie/100/100' },
  { id: '4', name: 'Diana Ross', email: 'diana@example.com', phoneNumber: '+1 (555) 135-7924', address: '321 Project Blvd, Seattle, WA', course: 'Project Management', enrollmentDate: '2023-11-15', status: 'On Leave', avatar: 'https://picsum.photos/seed/diana/100/100' },
  { id: '5', name: 'Evan Peters', email: 'evan@example.com', phoneNumber: '+1 (555) 864-2097', address: '654 Secure Rd, Chicago, IL', course: 'Cyber Security', enrollmentDate: '2024-01-05', status: 'Active', avatar: 'https://picsum.photos/seed/evan/100/100' },
];

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  
  // Follow-up reminder states
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const [isReminderSet, setIsReminderSet] = useState(false);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedStudent) {
      const fetchSuggestions = async () => {
        setIsLoadingSuggestions(true);
        setSuggestions([]);
        const context = `${selectedStudent.name} is currently enrolled in ${selectedStudent.course}. Their status is ${selectedStudent.status}.`;
        const result = await generateCourseSuggestion(context);
        if (result) {
          setSuggestions(result.split(',').map(s => s.trim()));
        }
        setIsLoadingSuggestions(false);
      };
      fetchSuggestions();
      
      // Reset reminder state when student changes
      setIsReminderSet(false);
      setReminderDate('');
      setReminderTime('');
      setReminderNote('');
    }
  }, [selectedStudent]);

  const handleScheduleReminder = () => {
    if (!reminderDate || !reminderTime) return;
    setIsReminderSet(true);
    // In a real app, this would be an API call to save the reminder
    console.log(`Reminder scheduled for ${selectedStudent?.name} on ${reminderDate} at ${reminderTime}`);
  };

  const handleOnboardingComplete = (data: any) => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      course: data.course,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      avatar: `https://picsum.photos/seed/${data.name}/100/100`
    };
    setStudents([...students, newStudent]);
    setIsOnboardingOpen(false);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Address', 'Course', 'Enrollment Date', 'Status'];
    const rows = filteredStudents.map(s => [
      s.id,
      s.name,
      s.email,
      s.phoneNumber,
      `"${s.address.replace(/"/g, '""')}"`, // Quote and escape address
      s.course,
      s.enrollmentDate,
      s.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Directory</h2>
          <p className="text-slate-500">Manage student records, enrollment, and profiles.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download size={18} /> Export Students
          </button>
          <button 
            onClick={() => setIsOnboardingOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Table Container */}
        <div className={`flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 ${selectedStudent ? 'opacity-50 pointer-events-none grayscale-[20%]' : ''}`}>
          <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, email, or course..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Enrollment Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudent(student)}
                    className="hover:bg-indigo-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border border-slate-200" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{student.course}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{student.enrollmentDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        student.status === 'Graduated' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Sparkles size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Details Side Panel */}
        {selectedStudent && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 shadow-2xl z-50 animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="text-indigo-600" size={18} /> Student Insights
              </h3>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto space-y-8">
              {/* Profile Overview */}
              <div className="text-center">
                <img src={selectedStudent.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-xl mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900">{selectedStudent.name}</h4>
                <p className="text-sm text-slate-500 mb-6">{selectedStudent.email}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Path</p>
                    <p className="text-xs font-bold text-slate-700">{selectedStudent.course}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <p className="text-xs font-bold text-slate-700">{selectedStudent.status}</p>
                  </div>
                </div>

                {/* New Contact Information Fields */}
                <div className="space-y-3 text-left">
                   <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                       <Phone size={16} />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                       <p className="text-xs font-bold text-slate-700">{selectedStudent.phoneNumber}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                       <MapPin size={16} />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
                       <p className="text-xs font-bold text-slate-700">{selectedStudent.address}</p>
                     </div>
                   </div>
                </div>
              </div>

              {/* AI Suggestions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    AI Recommended Next Steps
                  </h5>
                </div>
                
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 min-h-[160px] relative">
                  {isLoadingSuggestions ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-600 gap-3">
                      <Loader2 className="animate-spin" size={24} />
                      <p className="text-xs font-medium animate-pulse">Consulting AI for career paths...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-indigo-600 font-medium mb-2 italic">
                        "Based on {selectedStudent.name}'s current track in {selectedStudent.course}, these advanced modules are recommended:"
                      </p>
                      {suggestions.map((suggestion, idx) => (
                        <div key={idx} className="group cursor-pointer flex items-center justify-between p-3 bg-white border border-indigo-100 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all">
                          <span className="text-xs font-bold text-slate-700">{suggestion}</span>
                          <ChevronRight size={14} className="text-indigo-300 group-hover:translate-x-1 transition-transform" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Follow-up Reminder Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell size={18} className="text-amber-500" />
                  <h5 className="font-bold text-slate-900 text-sm">Follow-up Reminder</h5>
                </div>
                
                {isReminderSet ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 animate-in zoom-in duration-300">
                    <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs font-bold text-emerald-900">Reminder Scheduled</p>
                      <p className="text-[10px] text-emerald-700">{reminderDate} at {reminderTime}</p>
                    </div>
                    <button 
                      onClick={() => setIsReminderSet(false)}
                      className="ml-auto text-[10px] font-bold text-emerald-600 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="date" 
                          value={reminderDate}
                          onChange={(e) => setReminderDate(e.target.value)}
                          className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-[10px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="time" 
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-[10px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                    <textarea 
                      placeholder="Add a follow-up note..." 
                      value={reminderNote}
                      onChange={(e) => setReminderNote(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-[10px] h-16 resize-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    ></textarea>
                    <button 
                      onClick={handleScheduleReminder}
                      disabled={!reminderDate || !reminderTime}
                      className="w-full py-2 bg-white border border-indigo-100 text-indigo-600 rounded-xl text-[10px] font-bold hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-indigo-600"
                    >
                      Set Reminder
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
                  <Mail size={16} /> Email Career Roadmap
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                  <ExternalLink size={16} /> View Full Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <OnboardingModal 
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Students;
