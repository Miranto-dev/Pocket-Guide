export type TabType = 'accueil' | 'carte' | 'trajet' | 'liste' | 'plus' | 'phrases' | 'convertisseur' | 'urgences' | 'documents' | 'journal' | 'cahier';

export interface Place {
  id: string;
  name: string;
  category: 'plages' | 'restaurants' | 'hotels' | 'activites' | 'nature' | 'culture';
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  duration: string;
  openingHours: string;
  price: string;
  description: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
    x: number; // percentage for custom map canvas
    y: number;
  };
  isOfflineAvailable: boolean;
  address: string;
  highlights: string[];
  tips?: string;
  saved?: boolean;
}

export interface Activity {
  id: string;
  time: string;
  duration: string;
  title: string;
  description: string;
  type: 'food' | 'boat' | 'beach' | 'hike' | 'visit' | 'relax' | 'transport';
  icon: string;
  image?: string;
  location?: string;
  placeId?: string;
  completed?: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  date: string;
  summary: string;
  activities: Activity[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  notes?: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  items: ChecklistItem[];
}

export interface Phrase {
  id: string;
  french: string;
  malagasy: string;
  phonetic?: string;
  category: 'salutations' | 'nourriture' | 'urgence' | 'transport' | 'marche' | 'quotidien';
  audioKey?: string;
  context?: string;
}

export interface JournalEntry {
  id: string;
  title?: string;
  date: string;
  content: string;
  location: string;
  category: 'paysage' | 'faune' | 'culinaire' | 'culture' | 'autre';
  imageUrl: string;
  timestamp: number;
}

export interface DocumentItem {
  id: string;
  type: 'passport' | 'flight' | 'insurance' | 'vaccine' | 'hotel' | 'visa' | 'other';
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'verified' | 'today' | 'warning' | 'neutral';
  expiryOrDate?: string;
  documentNumber?: string;
  fileDataUrl?: string;
  qrCodeValue?: string;
  isEncrypted: boolean;
  icon: string;
  colorClass: string;
  notes?: string;
}

export interface EmergencyContact {
  id: string;
  title: string;
  number: string;
  subtitle: string;
  type: 'police' | 'hospital' | 'embassy' | 'agency' | 'fire' | 'doctor';
  icon: string;
  iconBg: string;
  iconColor: string;
  available: string;
}

export interface TripInfo {
  destination: string;
  region: string;
  country: string;
  startDate: string;
  endDate: string;
  daysUntilDeparture: number;
  todayProgram: {
    title: string;
    activity: string;
    time: string;
    heroImage: string;
  };
}
