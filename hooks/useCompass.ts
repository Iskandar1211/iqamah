import { Magnetometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

export interface CompassData {
  x: number;
  y: number;
  z: number;
  heading: number; // Направление в градусах (0-360)
  accuracy: number | null;
}

export function useCompass() {
  const [data, setData] = useState<CompassData>({
    x: 0,
    y: 0,
    z: 0,
    heading: 0,
    accuracy: null,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    checkAvailability();
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const checkAvailability = async () => {
    try {
      const isAvailable = await Magnetometer.isAvailableAsync();
      setIsAvailable(isAvailable);
    } catch (error) {
      console.error('Error checking magnetometer availability:', error);
      setIsAvailable(false);
    }
  };

  const startCompass = () => {
    if (!isAvailable) {
      console.warn('Magnetometer is not available');
      return;
    }

    const subscription = Magnetometer.addListener((magnetometerData) => {
      const { x, y, z } = magnetometerData;
      
      // Рассчитываем направление (heading) в градусах
      let heading = Math.atan2(y, x) * (180 / Math.PI);
      
      // Нормализуем к диапазону 0-360
      heading = (heading + 360) % 360;
      
      setData({
        x,
        y,
        z,
        heading,
        accuracy: null, // Expo не предоставляет accuracy для magnetometer
      });
    });

    setSubscription(subscription);
  };

  const stopCompass = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const getDirectionFromHeading = (heading: number): string => {
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

    const normalizedHeading = (heading + 360) % 360;
    const sector = Math.round(normalizedHeading / 45) % 8;
    
    return directions[sector];
  };

  return {
    data,
    isAvailable,
    startCompass,
    stopCompass,
    getDirectionFromHeading,
  };
} 