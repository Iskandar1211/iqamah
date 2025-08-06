export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface PrayerTime {
  name: string;
  time: Date;
  formattedTime: string;
  isNext: boolean;
  timeUntil: string;
}

export interface AppSettings {
  selectedCity: City | null;
  calculationMethod: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export type CalculationMethod =
  | 'MuslimWorldLeague'
  | 'Tehran'
  | 'Karachi';
