
import React from 'react';
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Booking: React.FC = () => {
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${i + 9}:00 AM`);
  const rooms = ['Room 101', 'Lab 204', 'Meeting A', 'Auditorium'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Resource Booking</h2>
          <p className="text-slate-500">Schedule classes, meeting rooms, and lab sessions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
          <Plus size={18} /> Quick Book
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-slate-900">August 2024</h3>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button className="p-2 hover:bg-slate-50 border-r border-slate-200"><ChevronLeft size={16} /></button>
              <button className="p-2 hover:bg-slate-50"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold shadow-sm">Day</button>
            <button className="px-3 py-1 bg-indigo-600 text-white border border-indigo-600 rounded-lg text-xs font-bold shadow-sm">Week</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold shadow-sm">Month</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-5 border-b border-slate-100">
              <div className="p-4 border-r border-slate-100"></div>
              {rooms.map(room => (
                <div key={room} className="p-4 text-center font-bold text-slate-700 text-sm border-r last:border-0 border-slate-100 bg-slate-50/30">
                  {room}
                </div>
              ))}
            </div>

            {timeSlots.map((time, idx) => (
              <div key={time} className="grid grid-cols-5 border-b border-slate-50 group">
                <div className="p-4 border-r border-slate-100 text-xs font-bold text-slate-400 flex items-center justify-center bg-slate-50/10">
                  {time}
                </div>
                {rooms.map((room, rIdx) => {
                  const isBooked = Math.random() > 0.7;
                  return (
                    <div key={`${room}-${time}`} className="p-2 border-r last:border-0 border-slate-50 min-h-[80px] hover:bg-indigo-50/30 transition-colors relative">
                      {isBooked && (
                        <div className="bg-indigo-600 text-white p-2 rounded-xl text-[10px] shadow-lg animate-in fade-in zoom-in duration-300">
                          <p className="font-bold">Advanced JS</p>
                          <p className="opacity-80">Prof. Miller</p>
                          <div className="flex items-center mt-2 gap-1 opacity-90">
                            <Clock size={8} /> 90 min
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <MapPin size={20} />
            </div>
            <h4 className="font-bold text-slate-900">Room Status</h4>
          </div>
          <div className="space-y-3">
            {rooms.map(r => (
              <div key={r} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{r}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <Calendar size={20} />
            </div>
            <h4 className="font-bold text-slate-900">Upcoming Today</h4>
          </div>
          <p className="text-xs text-slate-500">3 sessions remaining in Lab 204</p>
          <div className="mt-4 flex -space-x-2">
            {[1,2,3,4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/${i+40}/50/50`} className="w-8 h-8 rounded-full border-2 border-white" />
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">+5</div>
          </div>
        </div>

        <div className="bg-indigo-600 p-5 rounded-2xl shadow-lg shadow-indigo-600/20 text-white">
          <h4 className="font-bold mb-2">Automated Optimization</h4>
          <p className="text-sm opacity-80 mb-4">AI suggests shifting "Meeting A" to Lab 204 for 25% better space utilization.</p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all backdrop-blur-md">
            Apply Suggestion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
