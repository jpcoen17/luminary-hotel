import type { RoomType, FacilityItem, NavItem, HotspotInfo } from '../types';

export const ROOMS: RoomType[] = [
  {
    id: 'studio-japandi',
    name: 'Studio Japandi',
    description: 'Minimalist harmony of Japanese wabi-sabi and Scandinavian warmth. A sanctuary of intentional calm.',
    price: 2800000,
    size: 32,
    floor: 8,
    amenities: ['Smart TV 65"', 'Rainfall Shower', 'City View', 'Work Desk', 'Mini Bar', 'Fast WiFi'],
    style: 'japandi',
    available: true,
  },
  {
    id: 'suite-luxury',
    name: 'The Luminary Suite',
    description: 'Where opulence meets restraint. Marble, gold, and floor-to-ceiling views of the skyline.',
    price: 5500000,
    size: 65,
    floor: 24,
    amenities: ['Smart TV 85"', 'Soaking Tub', 'Panoramic View', 'Private Balcony', 'Full Kitchen', 'Concierge'],
    style: 'luxury-modern',
    available: true,
  },
  {
    id: 'loft-industrial',
    name: 'Urban Loft',
    description: 'Raw concrete, exposed steel, and curated art. For those who appreciate industrial elegance.',
    price: 3200000,
    size: 45,
    floor: 15,
    amenities: ['Smart TV 75"', 'Rain Shower', 'City Vista', 'Art Collection', 'Record Player', 'Brew Station'],
    style: 'industrial',
    available: true,
  },
  {
    id: 'penthouse-futuristic',
    name: 'Apex Penthouse',
    description: 'The pinnacle of tomorrow. Intelligent architecture, automated everything, boundless sky.',
    price: 12000000,
    size: 120,
    floor: 32,
    amenities: ['Cinema Wall', 'Smart Home AI', '360° View', 'Private Pool', 'Chef Kitchen', 'Helipad Access'],
    style: 'futuristic',
    available: false,
  },
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'infinity-pool',
    name: 'Infinity Pool',
    description: 'Sky-level water that dissolves into the horizon. An aquatic experience 32 floors above the city.',
    icon: '🌊',
    features: ['Heated year-round', 'City panorama', 'Twilight sessions', 'Private cabanas'],
  },
  {
    id: 'gym',
    name: 'Performance Gym',
    description: 'State-of-the-art equipment in a space designed to elevate every session.',
    icon: '⚡',
    features: ['24/7 access', 'Personal trainers', 'Recovery lounge', 'Smart equipment'],
  },
  {
    id: 'coworking',
    name: 'The Atelier',
    description: 'Where ideas become reality. A co-working sanctuary for the modern professional.',
    icon: '💡',
    features: ['Private pods', '10Gbps fiber', 'Meeting rooms', 'Barista service'],
  },
  {
    id: 'cafe',
    name: 'Noir Café & Lounge',
    description: 'Artisanal coffee, curated cocktails, and a jazz soundtrack that never overstays its welcome.',
    icon: '☕',
    features: ['Third-wave coffee', 'Craft cocktails', 'Live jazz weekly', 'Chef specials'],
  },
  {
    id: 'rooftop',
    name: 'Rooftop Garden',
    description: 'An elevated escape. Vertical gardens, fire pits, and the city as your backdrop.',
    icon: '🌿',
    features: ['Vertical garden', 'Fire pits', 'Yoga deck', 'Telescope observatory'],
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about', section: 1 },
  { label: 'Rooms', href: '#rooms', section: 3 },
  { label: 'Facilities', href: '#facilities', section: 5 },
  { label: 'Gallery', href: '#gallery', section: 6 },
  { label: 'Pricing', href: '#pricing', section: 7 },
  { label: 'Book Now', href: '#booking', section: 8 },
];

export const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'bed',
    title: 'Premium Bedding',
    description: '1000-thread Egyptian cotton. Goose down pillows. Sleep redefined.',
    position: [-1, 0.8, 0],
    icon: '🛏',
  },
  {
    id: 'window',
    title: 'Panoramic View',
    description: 'Floor-to-ceiling glass. The city is yours.',
    position: [2, 1, -2],
    icon: '🏙',
  },
  {
    id: 'workspace',
    title: 'Smart Workspace',
    description: 'Wireless charging, 4K monitor port, ergonomic seating.',
    position: [1.5, 0.9, 1],
    icon: '💻',
  },
  {
    id: 'lighting',
    title: 'Circadian Lighting',
    description: 'AI-controlled lighting that syncs with your biology.',
    position: [0, 2.2, 0],
    icon: '💡',
  },
];

export const ROOM_STYLES = [
  { id: 'japandi', label: 'Japandi', description: 'Wabi-sabi meets Nordic calm' },
  { id: 'luxury-modern', label: 'Luxury Modern', description: 'Marble, gold, timeless' },
  { id: 'industrial', label: 'Industrial', description: 'Raw, refined, bold' },
  { id: 'futuristic', label: 'Futuristic', description: 'Tomorrow, today' },
] as const;

export const LIGHTING_MOODS = [
  { id: 'warm', label: 'Warm', color: '#d4922a' },
  { id: 'cool', label: 'Cool', color: '#6eb5ff' },
  { id: 'dramatic', label: 'Dramatic', color: '#ff3366' },
  { id: 'soft', label: 'Soft', color: '#f0ede8' },
] as const;

export const WEATHER_MODES = [
  { id: 'rain', label: 'Rain', icon: '🌧' },
  { id: 'clear', label: 'Clear', icon: '☀️' },
  { id: 'overcast', label: 'Overcast', icon: '⛅' },
  { id: 'storm', label: 'Storm', icon: '⛈' },
] as const;

export const SECTION_NAMES = [
  'Arrival',
  'Lobby',
  'Elevator',
  'The Room',
  'Balcony',
  'Facilities',
  'Configure',
  'Gallery',
  'Book',
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
