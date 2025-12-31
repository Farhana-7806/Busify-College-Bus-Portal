
import React, { useState, useEffect } from 'react';
import { Bus, Announcement } from '../types';
import BusMap from './BusMap';
import { MOCK_BUSES, MOCK_ANNOUNCEMENTS, MOCK_STOPS } from '../constants';
import { getSmartSummary, getAIEtaPrediction } from '../services/services';

const StudentPortal: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>(MOCK_BUSES);
  const [selectedBus, setSelectedBus] = useState<Bus | undefined>(buses[0]);
  const [announcements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSummary, setAiSummary] = useState<string>('Loading AI insights...');
  const [aiEta, setAiEta] = useState<{ eta: number; reason: string } | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const summary = await getSmartSummary(announcements.map(a => a.message));
      setAiSummary(summary);
    };
    fetchSummary();
  }, [announcements]);

  useEffect(() => {
    const fetchAiEta = async () => {
      if (selectedBus) {
        const prediction = await getAIEtaPrediction(
          { lat: selectedBus.currentLat, lng: selectedBus.currentLng },
          MOCK_STOPS[0], // Distance to main gate
          "Clear Skies",
          "Medium"
        );
        setAiEta(prediction);
      }
    };
    fetchAiEta();
  }, [selectedBus]);

  // Simulate bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => ({
          ...bus,
          currentLat: bus.currentLat + (Math.random() - 0.5) * 0.0005,
          currentLng: bus.currentLng + (Math.random() - 0.5) * 0.0005,
          lastUpdated: new Date().toISOString()
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredBuses = buses.filter(bus => 
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] gap-4 p-4 lg:p-6 overflow-hidden">
      <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Bus Directory</h2>
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search Bus ID or Route..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          <div className="space-y-3">
            {filteredBuses.map(bus => (
              <button
                key={bus.id}
                onClick={() => setSelectedBus(bus)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${selectedBus?.id === bus.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-100 hover:border-slate-300'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-slate-900">{bus.busNumber}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${bus.status === 'On Time' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {bus.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mb-2">{bus.route}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-600">
                  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>ETA: {bus.eta} mins</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-xl shadow-md text-white">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-yellow-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <h3 className="font-bold">AI Assistant</h3>
          </div>
          <p className="text-sm opacity-90 leading-relaxed italic">
            "{aiSummary}"
          </p>
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Campus Alerts
          </h3>
          <div className="space-y-4">
            {announcements.map(ann => (
              <div key={ann.id} className="border-l-4 border-slate-200 pl-3 py-1">
                <h4 className="text-xs font-bold text-slate-900">{ann.title}</h4>
                <p className="text-[11px] text-slate-600 leading-tight mt-0.5">{ann.message}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {new Date(ann.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 relative">
        <div className="flex-1 bg-white p-2 rounded-xl shadow-sm border border-slate-200 relative min-h-[400px]">
          <BusMap buses={buses} selectedBusId={selectedBus?.id} stops={MOCK_STOPS} />
          {selectedBus && (
            <div className="absolute bottom-6 right-6 z-[1000] w-72 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">{selectedBus.busNumber}</h3>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Driver</span>
                  <span className="font-semibold text-slate-800">{selectedBus.driverName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Contact</span>
                  <span className="font-semibold text-blue-600 underline decoration-blue-200">{selectedBus.driverPhone}</span>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">AI-Predicted ETA</div>
                    <div className="text-2xl font-black text-slate-900">
                      {aiEta ? `${aiEta.eta} mins` : `${selectedBus.eta} mins`}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-none mt-1">
                      {aiEta?.reason || "Calculated from current traffic patterns"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-32 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div className="flex gap-8 overflow-x-auto">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Rides Today</p>
              <p className="text-2xl font-black text-slate-900">42</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Avg. Delay</p>
              <p className="text-2xl font-black text-blue-600">3.2m</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Active Buses</p>
              <p className="text-2xl font-black text-green-600">{buses.length}</p>
            </div>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">
            View My History
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
