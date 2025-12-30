
export enum UserRole {
  STUDENT = 'STUDENT',
  DRIVER = 'DRIVER'
}

export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Bus {
  id: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  currentLat: number;
  currentLng: number;
  route: string;
  status: 'On Time' | 'Delayed' | 'Maintenance';
  lastUpdated: string;
  eta: number; // minutes
  stops: BusStop[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'alert';
}

export interface Feedback {
  id: string;
  studentName: string;
  message: string;
  rating: number;
  date: string;
}
