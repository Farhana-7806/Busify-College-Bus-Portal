
import React, { useState } from 'react';
import { UserRole } from './types';
import Navbar from './components/Navbar';
import StudentPortal from './components/StudentPortal';
import DriverPortal from './components/DriverPortal';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-inter">
      <Navbar role={role} setRole={setRole} />
      
      <main className="flex-1 overflow-hidden">
        {role === UserRole.STUDENT ? <StudentPortal /> : <DriverPortal />}
      </main>

      {/* Floating CTA / Quick Help */}
      <button className="fixed bottom-6 right-6 z-[3000] w-16 h-16 bg-[#F9E79F] rounded-full shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform active:scale-95 text-slate-900 border-4 border-white group">
        <svg viewBox="0 0 100 100" className="w-10 h-10 group-hover:rotate-12 transition-transform">
           <path d="M15 45 L50 35 L85 45 L50 55 Z" fill="#1A1A1A" />
           <path d="M30 50 L30 58 Q50 64 70 58 L70 50" fill="#1A1A1A" />
           <path d="M85 45 L85 55" stroke="#D4AC0D" strokeWidth="3" />
           <circle cx="85" cy="57" r="4" fill="#D4AC0D" />
        </svg>
        <span className="text-[8px] font-black uppercase tracking-tighter text-slate-800 -mt-1">Support</span>
      </button>
      
      <footer className="h-10 bg-white border-t border-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        &copy; 2024 Busify Team • Built for SKIT & JECRC Communities
      </footer>
    </div>
  );
};

export default App;
