
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import L from 'leaflet';
import { Bus, BusStop } from '../types';

interface BusMapProps {
  buses: Bus[];
  selectedBusId?: string;
  stops: BusStop[];
}

const BusMap: React.FC<BusMapProps> = ({ buses, selectedBusId, stops }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    leafletMap.current = L.map(mapRef.current).setView([26.8238, 75.8643], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(leafletMap.current);

    stops.forEach(stop => {
      const stopIcon = L.divIcon({
        html: `<div class="bg-blue-600 w-3 h-3 rounded-full border-2 border-white shadow-sm"></div>`,
        className: 'custom-div-icon',
        iconSize: [12, 12]
      });
      if (leafletMap.current) {
        L.marker([stop.lat, stop.lng], { icon: stopIcon })
          .addTo(leafletMap.current)
          .bindPopup(`<b>Stop:</b> ${stop.name}`);
      }
    });

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [stops]);

  useEffect(() => {
    if (!leafletMap.current) return;

    buses.forEach(bus => {
      const isSelected = bus.id === selectedBusId;
      const busColor = bus.status === 'Delayed' ? '#ef4444' : '#F4D03F';
      
      const busIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-10 h-12 bg-white rounded-lg shadow-xl border-2 border-slate-800 flex items-center justify-center transition-all duration-500 overflow-hidden ${isSelected ? 'scale-125 -translate-y-4' : ''}">
              <div class="w-full h-full p-1" style="background-color: ${busColor}">
                 <div class="w-full h-1/4 bg-slate-800/60 mb-1 rounded-sm"></div>
                 <div class="w-full h-1/4 bg-slate-800/60 mb-1 rounded-sm"></div>
                 <div class="flex justify-between px-1">
                    <div class="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                    <div class="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                 </div>
              </div>
            </div>
            ${isSelected ? '<div class="absolute -top-16 bg-slate-900 text-[#F9E79F] px-2 py-1 rounded-md shadow-lg text-[9px] font-black uppercase tracking-tighter whitespace-nowrap border border-[#F9E79F]">Active Track</div>' : ''}
          </div>
        `,
        className: 'custom-div-icon',
        iconSize: [40, 50],
        iconAnchor: [20, 25]
      });

      if (markersRef.current[bus.id]) {
        markersRef.current[bus.id].setLatLng([bus.currentLat, bus.currentLng]);
        markersRef.current[bus.id].setIcon(busIcon);
      } else if (leafletMap.current) {
        const marker = L.marker([bus.currentLat, bus.currentLng], { icon: busIcon })
          .addTo(leafletMap.current)
          .bindPopup(`<b>Bus ${bus.busNumber}</b><br>Driver: ${bus.driverName}<br>Status: ${bus.status}`);
        markersRef.current[bus.id] = marker;
      }

      if (isSelected && leafletMap.current) {
        leafletMap.current.panTo([bus.currentLat, bus.currentLng]);
      }
    });
  }, [buses, selectedBusId]);

  return <div ref={mapRef} className="h-full w-full rounded-xl overflow-hidden shadow-inner border border-slate-200" />;
};

export default BusMap;
