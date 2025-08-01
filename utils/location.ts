import * as Location from 'expo-location';
import citiesData from '../data/cities.json';
import { City } from './prayerTimes';

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation(): Promise<Location.LocationObject | null> {
  const hasPermission = await requestLocationPermission();
  
  if (!hasPermission) {
    console.log('Location permission not granted');
    return null;
  }
  
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return location;
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

export function findNearestCity(latitude: number, longitude: number): City {
  let nearestCity = citiesData[0];
  let minDistance = Number.MAX_VALUE;
  
  for (const city of citiesData) {
    const distance = calculateDistance(
      latitude,
      longitude,
      city.latitude,
      city.longitude
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  }
  
  return nearestCity;
}

// Функция для расчета расстояния между двумя точками (формула гаверсинуса)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Радиус Земли в километрах
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getCurrentCity(): Promise<City | null> {
  const location = await getCurrentLocation();
  
  if (!location) {
    return null;
  }
  
  return findNearestCity(location.coords.latitude, location.coords.longitude);
}

export function searchCities(query: string): City[] {
  const lowercaseQuery = query.toLowerCase();
  
  return citiesData.filter(city => 
    city.name.toLowerCase().includes(lowercaseQuery) ||
    city.country.toLowerCase().includes(lowercaseQuery)
  );
}

export function getAllCities(): City[] {
  return citiesData;
} 