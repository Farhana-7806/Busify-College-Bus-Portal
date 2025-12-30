
import { Bus, BusStop, Announcement } from './types';

export const COLORS = {
  primary: '#1e3a8a', // Deep Blue
  secondary: '#facc15', // Yellow
  accent: '#3b82f6',
};

export const MOCK_STOPS: BusStop[] = [
  { id: '1', name: 'Main Gate', lat: 26.8228, lng: 75.8653 },
  { id: '2', name: 'Hostel Block A', lat: 26.8248, lng: 75.8673 },
  { id: '3', name: 'Academic Block', lat: 26.8218, lng: 75.8633 },
  { id: '4', name: 'Cafeteria', lat: 26.8238, lng: 75.8613 },
  { id: '5', name: 'Library', lat: 26.8258, lng: 75.8643 },
];

export const MOCK_BUSES: Bus[] = [
  {
    id: 'bus-101',
    busNumber: 'RJ-14-PB-1234',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 9876543210',
    currentLat: 26.8220,
    currentLng: 75.8640,
    route: 'Route A: City Center to SKIT',
    status: 'On Time',
    lastUpdated: new Date().toISOString(),
    eta: 5,
    stops: MOCK_STOPS.slice(0, 3)
  },
  {
    id: 'bus-202',
    busNumber: 'RJ-14-PB-5678',
    driverName: 'Ramesh Singh',
    driverPhone: '+91 9123456789',
    currentLat: 26.8260,
    currentLng: 75.8680,
    route: 'Route B: Mansarovar to JECRC',
    status: 'Delayed',
    lastUpdated: new Date().toISOString(),
    eta: 12,
    stops: MOCK_STOPS.slice(2, 5)
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'Rainy Weather Alert',
    message: 'Buses might be delayed by 10-15 minutes due to heavy rain in the city area.',
    timestamp: new Date().toISOString(),
    type: 'warning'
  },
  {
    id: 'a2',
    title: 'New Route Added',
    message: 'Route C is now operational starting from Vaishali Nagar.',
    timestamp: new Date().toISOString(),
    type: 'info'
  }
];
