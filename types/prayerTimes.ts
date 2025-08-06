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

export interface OfficialPrayerTime {
  date: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
} 