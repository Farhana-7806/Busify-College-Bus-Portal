
import React, { useState } from 'react';
// @google/genai guidelines: Importing types from types.ts is preferred.
import { Bus } from '../types';
import { MOCK_BUSES } from '../constants';

const DriverPortal: React.FC = () => {
  const [myBus, setMyBus] = useState<Bus>(MOCK_BUSES[0]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleStatusChange = (status: Bus['status']) => {
    setMyBus(prev => ({ ...prev, status }));
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setAlertText('');
      alert("Status updated and broadcasted to students!");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-blue-900 p-8 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-32 h-32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
          <p className="text-blue-200 font-bold uppercase tracking-widest text-sm mb-2">Driver Command Center</p>
          <h1 className="text-4xl font-black mb-4">{myBus.busNumber}</h1>
          <div className="flex gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-xs opacity-70">Assigned Route</p>
              <p className="font-bold">{myBus.route}</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-xs opacity-70">Live Status</p>
              <p className={`font-bold ${myBus.status === 'On Time' ? 'text-green-400' : 'text-yellow-400'}`}>{myBus.status}</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Status Update</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleStatusChange('On Time')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${myBus.status === 'On Time' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 text-slate-400'}`}
                >
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="font-bold">On Time</span>
                </button>
                <button 
                  onClick={() => handleStatusChange('Delayed')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${myBus.status === 'Delayed' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 text-slate-400'}`}
                >
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />
            </div>

            <button 
              disabled={isUpdating}
              onClick={handleUpdate}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Broadcasting...
                </>
              ) : (
                'Send Live Update'
              )}
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Stops</h3>
            <div className="space-y-4">
              {myBus.stops.map((stop, idx) => (
                <div key={stop.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${idx === 0 ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`} />
                    {idx !== myBus.stops.length - 1 && <div className="w-0.5 h-10 bg-slate-200" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{stop.name}</p>
                    <p className="text-xs text-slate-500">Estimated Reach: +{idx * 5} min</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-700 mb-2">GPS Diagnostics</h4>
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>Signal Strength:</span>
                <span className="text-green-600 font-bold">EXCELLENT</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                <span>Accuracy:</span>
                <span>±3 meters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPortal;
