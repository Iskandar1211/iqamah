// Координаты Каабы в Мекке
const KAABA_LATITUDE = 21.4225;
const KAABA_LONGITUDE = 39.8262;

export interface QiblaDirection {
  bearing: number; // Азимут в градусах от севера
  direction: string; // Направление (север, юг, восток, запад, северо-восток и т.д.)
  distance: number; // Расстояние до Каабы в километрах
}

/**
 * Рассчитывает направление киблы от заданной точки
 * @param latitude Широта текущего местоположения
 * @param longitude Долгота текущего местоположения
 * @returns Объект с информацией о направлении киблы
 */
export function calculateQiblaDirection(
  latitude: number,
  longitude: number
): QiblaDirection {
  // Конвертируем координаты в радианы
  const lat1 = (latitude * Math.PI) / 180;
  const lon1 = (longitude * Math.PI) / 180;
  const lat2 = (KAABA_LATITUDE * Math.PI) / 180;
  const lon2 = (KAABA_LONGITUDE * Math.PI) / 180;

  // Рассчитываем разность долгот
  const deltaLon = lon2 - lon1;

  // Рассчитываем азимут (bearing) по формуле
  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
  
  let bearing = Math.atan2(y, x) * (180 / Math.PI);
  
  // Нормализуем азимут к диапазону 0-360 градусов
  bearing = (bearing + 360) % 360;

  // Рассчитываем расстояние до Каабы
  const distance = calculateDistance(latitude, longitude, KAABA_LATITUDE, KAABA_LONGITUDE);

  // Определяем направление
  const direction = getDirectionFromBearing(bearing);

  return {
    bearing,
    direction,
    distance,
  };
}

/**
 * Рассчитывает расстояние между двумя точками на Земле (формула гаверсинуса)
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Радиус Земли в километрах
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Преобразует азимут в градусах в текстовое направление
 */
function getDirectionFromBearing(bearing: number): string {
  const directions = [
    'north', // 0°
    'northeast', // 45°
    'east', // 90°
    'southeast', // 135°
    'south', // 180°
    'southwest', // 225°
    'west', // 270°
    'northwest', // 315°
  ];

  // Нормализуем bearing к диапазону 0-360
  const normalizedBearing = (bearing + 360) % 360;
  
  // Определяем сектор (каждый сектор = 45 градусов)
  const sector = Math.round(normalizedBearing / 45) % 8;
  
  return directions[sector];
}

/**
 * Форматирует расстояние для отображения
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} м`;
  } else if (distance < 10) {
    return `${distance.toFixed(1)} км`;
  } else {
    return `${Math.round(distance)} км`;
  }
}

/**
 * Получает направление киблы для выбранного города
 */
export async function getQiblaDirectionForCity(city: any): Promise<QiblaDirection | null> {
  if (!city || typeof city.latitude !== 'number' || typeof city.longitude !== 'number') {
    return null;
  }

  return calculateQiblaDirection(city.latitude, city.longitude);
} 