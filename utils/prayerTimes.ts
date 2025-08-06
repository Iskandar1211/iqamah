import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';

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

export const PRAYER_NAMES = {
  fajr: 'Фаджр',
  sunrise: 'Восход',
  dhuhr: 'Зухр',
  asr: 'Аср',
  maghrib: 'Магриб',
  isha: 'Иша',
};

export const CALCULATION_METHODS = {
  MuslimWorldLeague: 'MuslimWorldLeague',
  Tehran: 'Tehran',
  Karachi: 'Karachi',
};

export function getCalculationMethod(method: string): any {
  switch (method) {
    case 'MuslimWorldLeague':
      return CalculationMethod.MuslimWorldLeague();
    case 'Tehran':
      return CalculationMethod.Tehran();
    case 'Karachi':
      return CalculationMethod.Karachi();
    default:
      return CalculationMethod.MuslimWorldLeague();
  }
}

export function calculatePrayerTimes(
  city: City,
  date: Date = new Date()
): PrayerTime[] {
  const coordinates = new Coordinates(city.latitude, city.longitude);
  const calculationMethod = CalculationMethod.MuslimWorldLeague();

  const prayerTimes = new PrayerTimes(coordinates, date, calculationMethod);

  const prayers = [
    { name: 'fajr', time: prayerTimes.fajr },
    { name: 'sunrise', time: prayerTimes.sunrise },
    { name: 'dhuhr', time: prayerTimes.dhuhr },
    { name: 'asr', time: prayerTimes.asr },
    { name: 'maghrib', time: prayerTimes.maghrib },
    { name: 'isha', time: prayerTimes.isha },
  ];

  const now = new Date();
  let nextPrayerIndex = -1;

  // Находим следующий намаз
  for (let i = 0; i < prayers.length; i++) {
    if (prayers[i].time > now) {
      nextPrayerIndex = i;
      break;
    }
  }

  // Если все намазы прошли, следующий - завтрашний Фаджр
  if (nextPrayerIndex === -1) {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPrayerTimes = new PrayerTimes(
      coordinates,
      tomorrow,
      calculationMethod
    );
    prayers[0] = { name: 'fajr', time: tomorrowPrayerTimes.fajr };
    nextPrayerIndex = 0;
  }

  return prayers.map((prayer, index) => {
    const isNext = index === nextPrayerIndex;
    const timeUntil = isNext ? getTimeUntil(prayer.time) : '';

    return {
      name: PRAYER_NAMES[prayer.name as keyof typeof PRAYER_NAMES],
      time: prayer.time,
      formattedTime: formatTime(prayer.time),
      isNext,
      timeUntil,
    };
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function getTimeUntil(targetTime: Date): string {
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();

  if (diff <= 0) return '';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  } else {
    return `${minutes}м`;
  }
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('ru-RU', options);
}

export function getHijriDate(date: Date): string {
  // Простая реализация для получения хиджри даты
  // В реальном приложении лучше использовать библиотеку hijri-date
  const gregorianYear = date.getFullYear();
  const hijriYear = gregorianYear - 622;
  const hijriMonth = date.getMonth() + 1;
  const hijriDay = date.getDate();

  return `${hijriDay} ${getHijriMonthName(hijriMonth)} ${hijriYear} г.х.`;
}

function getHijriMonthName(month: number): string {
  const months = [
    'Мухаррам',
    'Сафар',
    'Раби аль-авваль',
    'Раби ас-сани',
    'Джумада аль-уля',
    'Джумада ас-сани',
    'Раджаб',
    'Шаабан',
    'Рамадан',
    'Шавваль',
    'Зуль-када',
    'Зуль-хиджа',
  ];
  return months[month - 1] || '';
}
