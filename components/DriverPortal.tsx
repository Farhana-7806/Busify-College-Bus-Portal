
import React, { useState, useEffect } from 'react';
import { Bus } from '../types';
import { MOCK_BUSES } from '../constants';

const DriverPortal: React.FC = () => {
  const [myBus, setMyBus] = useState<Bus>(MOCK_BUSES[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [pythonLogs, setPythonLogs] = useState<string[]>(["[SYS] Initializing Python 3.10 runtime...", "[SYS] Loading eta_calculator.py..."]);

  const addLog = (msg: string) => {
    setPythonLogs(prev => [...prev.slice(-10), `[PY] ${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addLog(`Re-calculating traffic coefficients for ${myBus.busNumber}...`);
    }, 8000);
    return () => clearInterval(interval);
  }, [myBus.busNumber]);

  const handleStatusChange = (status: Bus['status']) => {
    setMyBus(prev => ({ ...prev, status }));
    addLog(`Status changed to ${status}. Updating model.`);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    addLog("Pushing update to central API...");
    setTimeout(() => {
      setIsUpdating(false);
      setAlertText('');
      addLog("Broadcast successful via Socket.io simulation.");
      alert("Status updated and broadcasted to students!");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-6 lg:p-10 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.75c-4.418 0-8 3.582-8 8V11H4.5a2.25 2.25 0 00-2.25 2.25v6A2.25 2.25 0 004.5 21.5h15a2.25 2.25 0 002.25-2.25v-6A2.25 2.25 0 0019.5 11h-1.75V8.75c0-4.418-3.582-8-8-8zM16.5 11h-4.5V8.75c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5V11z" /></svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">Live Link</span>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Driver Command Center</p>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black mb-4 tracking-tighter">{myBus.busNumber}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-[10px] opacity-50 uppercase font-bold">Assigned Route</p>
                <p className="font-bold text-sm lg:text-base">{myBus.route}</p>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-[10px] opacity-50 uppercase font-bold">AI Status</p>
                <p className={`font-bold text-sm lg:text-base ${myBus.status === 'On Time' ? 'text-green-400' : 'text-yellow-400'}`}>{myBus.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                Quick Status Update
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleStatusChange('On Time')}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${myBus.status === 'On Time' ? 'border-green-500 bg-green-50 text-green-700 shadow-lg' : 'border-slate-100 text-slate-400 bg-slate-50 hover:bg-white'}`}
                >
                  <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="font-bold">On Time</span>
                </button>
                <button 
                  onClick={() => handleStatusChange('Delayed')}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${myBus.status === 'Delayed' ? 'border-red-500 bg-red-50 text-red-700 shadow-lg' : 'border-slate-100 text-slate-400 bg-slate-50 hover:bg-white'}`}
                >
                  <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-bold">Delayed</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Broadcast Delay Message</h3>
              <textarea 
                value={alertText}
                onChange={(e) => setAlertText(e.target.value)}
                placeholder="e.g. Heavy traffic at Tonk Road, expecting 10 min delay..."
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-inner"
              />
            </div>

            <button 
              disabled={isUpdating}
              onClick={handleUpdate}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 text-lg"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing (Python Core)...
                </>
              ) : (
                'Send Live Update'
              )}
            </button>
          </div>

          {/* Python Simulation Logic Side Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">eta_calculator.py</span>
                </div>
                <span className="text-[10px] text-green-500 font-mono animate-pulse">RUNNING</span>
              </div>
              <div className="h-64 overflow-y-auto font-mono text-[10px] terminal-scroll space-y-1">
                {pythonLogs.map((log, i) => (
                  <div key={i} className={log.includes('[SYS]') ? 'text-blue-400' : 'text-slate-300'}>{log}</div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h3 className="text-sm font-black text-blue-900 mb-3 uppercase tracking-tighter">Route Optimization</h3>
              <div className="space-y-3">
                {myBus.stops.map((stop, idx) => (
                  <div key={stop.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 ${idx === 0 ? 'bg-blue-600 border-blue-600' : 'bg-white border-blue-200'}`} />
                      {idx !== myBus.stops.length - 1 && <div className="w-0.5 h-6 bg-blue-100" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-900">{stop.name}</p>
                      <p className="text-[10px] text-blue-500">Python Ref: 0x{stop.id}2F</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPortal;
