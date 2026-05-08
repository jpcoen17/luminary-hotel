export interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  size: number;
  floor: number;
  amenities: string[];
  style: RoomStyle;
  available: boolean;
}

export type RoomStyle = 'japandi' | 'luxury-modern' | 'industrial' | 'futuristic';
export type LightingMood = 'warm' | 'cool' | 'dramatic' | 'soft';
export type WeatherMode = 'rain' | 'clear' | 'overcast' | 'storm';
export type TimeOfDay = 'day' | 'golden-hour' | 'night';

export interface RoomConfig {
  roomType: RoomType | null;
  style: RoomStyle;
  lightingMood: LightingMood;
  timeOfDay: TimeOfDay;
  weather: WeatherMode;
  curtainsOpen: boolean;
  lightsOn: boolean;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  totalPrice: number;
  name: string;
  email: string;
}

export interface HotspotInfo {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  icon: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

export interface NavItem {
  label: string;
  href: string;
  section: number;
}

export interface ScrollProgress {
  progress: number;
  section: number;
  velocity: number;
}
