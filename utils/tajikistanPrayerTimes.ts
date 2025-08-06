import { City, OfficialPrayerTime, PrayerTime } from '../types/prayerTimes';

// Кэш для хранения официальных данных
const prayerTimesCache = new Map<string, OfficialPrayerTime>();

// URL для получения данных от Aladhan API (временное решение)
const ALADHAN_API = 'https://api.aladhan.com/v1/timingsByCity';

// Флаг для использования Aladhan API (установите false для примерных данных)
const USE_ALADHAN_API = true;

/**
 * Получает времена намаза от Aladhan API для конкретной даты
 */
export async function fetchPrayerTimesForDate(
  city: City,
  date: Date
): Promise<OfficialPrayerTime | null> {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const cacheKey = `${city.id}-${year}-${month}-${day}`;
  
  // Проверяем кэш
  if (prayerTimesCache.has(cacheKey)) {
    return prayerTimesCache.get(cacheKey)!;
  }

  try {
    // Получаем данные от Aladhan API для конкретной даты
    const response = await fetch(
      `${ALADHAN_API}?city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(city.country)}&method=4&date=${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 200 || !data.data) {
      throw new Error('Invalid response from Aladhan API');
    }
    
    // Конвертируем данные Aladhan в наш формат
    const prayerTime: OfficialPrayerTime = {
      date: data.data.date.readable,
      fajr: data.data.timings.Fajr,
      sunrise: data.data.timings.Sunrise,
      dhuhr: data.data.timings.Dhuhr,
      asr: data.data.timings.Asr,
      maghrib: data.data.timings.Maghrib,
      isha: data.data.timings.Isha
    };
    
    // Кэшируем данные
    prayerTimesCache.set(cacheKey, prayerTime);
    
    return prayerTime;
  } catch (error) {
    console.warn('Failed to fetch prayer times from Aladhan API:', error);
    return null;
  }
}

/**
 * Получает официальное время намаза для конкретной даты
 */
export async function getOfficialPrayerTimeForDate(
  city: City,
  date: Date
): Promise<OfficialPrayerTime | null> {
  // Если включен Aladhan API, используем его
  if (USE_ALADHAN_API) {
    return await fetchPrayerTimesForDate(city, date);
  }

  // Fallback на примерные данные
  const mockData: OfficialPrayerTime = {
    date: date.toISOString().split('T')[0],
    fajr: '05:45',
    sunrise: '07:15',
    dhuhr: '12:15',
    asr: '15:00',
    maghrib: '17:30',
    isha: '19:00'
  };
  return Promise.resolve(mockData);
}

/**
 * Конвертирует официальные данные в формат приложения
 */
export function convertOfficialToPrayerTimes(
  officialData: OfficialPrayerTime,
  city: City,
  date: Date
): PrayerTime[] {
  const now = new Date();
  let nextPrayerIndex = -1;
  
  const prayers = [
    { name: 'fajr', time: parseTimeString(officialData.fajr, date) },
    { name: 'sunrise', time: parseTimeString(officialData.sunrise, date) },
    { name: 'dhuhr', time: parseTimeString(officialData.dhuhr, date) },
    { name: 'asr', time: parseTimeString(officialData.asr, date) },
    { name: 'maghrib', time: parseTimeString(officialData.maghrib, date) },
    { name: 'isha', time: parseTimeString(officialData.isha, date) },
  ];

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
    // Здесь нужно будет получить данные на завтра
    nextPrayerIndex = 0;
  }

  const PRAYER_NAMES = {
    fajr: 'Фаджр',
    sunrise: 'Восход',
    dhuhr: 'Зухр',
    asr: 'Аср',
    maghrib: 'Магриб',
    isha: 'Иша',
  };

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

/**
 * Парсит строку времени в объект Date
 */
function parseTimeString(timeString: string, date: Date): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const prayerDate = new Date(date);
  prayerDate.setHours(hours, minutes, 0, 0);
  return prayerDate;
}

/**
 * Форматирует время в строку
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Вычисляет время до следующего намаза
 */
function getTimeUntil(targetTime: Date): string {
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

/**
 * Очищает кэш данных
 */
export function clearPrayerTimesCache(): void {
  prayerTimesCache.clear();
}

/**
 * Получает размер кэша
 */
export function getCacheSize(): number {
  return prayerTimesCache.size;
} 