
import React from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const BusifyLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center`}>
    {/* Pale Yellow Circle Background */}
    <div className="absolute inset-0 bg-[#F9E79F] rounded-full shadow-sm"></div>
    
    {/* SVG Reconstruction of the Logo */}
    <svg viewBox="0 0 100 100" className="relative w-[85%] h-[85%]" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation Cap on the B area */}
      <path d="M15 35 L30 28 L45 35 L30 42 Z" fill="#1A1A1A" />
      <path d="M22 38 L22 43 Q30 46 38 43 L38 38" fill="#1A1A1A" />
      <path d="M45 35 L45 42" stroke="#D4AC0D" strokeWidth="2" /> {/* Tassel */}
      <circle cx="45" cy="43" r="2" fill="#D4AC0D" />
      
      {/* Text "BUSIFY" - Simplified high-impact paths */}
      <text x="12" y="65" fontFamily="Arial Black, sans-serif" fontSize="24" fill="#1A1A1A" fontWeight="900">B</text>
      <text x="28" y="65" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#1A1A1A" fontWeight="900">US</text>
      
      {/* The Vertical Bus Icon */}
      <rect x="52" y="40" width="10" height="30" rx="2" fill="#F4D03F" />
      <rect x="54" y="42" width="6" height="4" fill="#34495E" opacity="0.6" />
      <rect x="54" y="48" width="6" height="4" fill="#34495E" opacity="0.6" />
      <rect x="54" y="54" width="6" height="4" fill="#34495E" opacity="0.6" />
      <rect x="54" y="60" width="6" height="4" fill="#34495E" opacity="0.6" />
      <circle cx="53" cy="68" r="1.5" fill="#1A1A1A" />
      <circle cx="61" cy="68" r="1.5" fill="#1A1A1A" />
      
      <text x="65" y="65" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#1A1A1A" fontWeight="900">FY</text>
    </svg>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ role, setRole }) => {
  return (
    <nav className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-[2000] shadow-sm">
      <div className="flex items-center gap-3">
        <BusifyLogo className="w-14 h-14" />
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Busify</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none italic">Success on Track</p>
        </div>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button 
          onClick={() => setRole(UserRole.STUDENT)}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${role === UserRole.STUDENT ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Student View
        </button>
        <button 
          onClick={() => setRole(UserRole.DRIVER)}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${role === UserRole.DRIVER ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Driver View
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-xs font-bold text-slate-900">
            {role === UserRole.STUDENT ? 'Farhana Khan' : 'Suresh Kumar'}
          </p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">
            {role === UserRole.STUDENT ? 'Student ID: 23BCON1978' : 'Lic: RJ14-9921'}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md">
          <img src={`https://picsum.photos/seed/${role}/100/100`} alt="Avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
