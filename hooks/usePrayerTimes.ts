import { useCallback, useEffect, useState } from 'react';
import { schedulePrayerNotifications } from '../utils/notifications';
import { City, PrayerTime, calculatePrayerTimes, getTimeUntil } from '../utils/prayerTimes';
import { getCalculationMethod, getSelectedCity } from '../utils/storage';

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [calculationMethod, setCalculationMethod] = useState<string>('MuslimWorldLeague');
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Загрузка настроек при инициализации
  useEffect(() => {
    loadSettings();
  }, []);

  // Обновление времени каждую минуту
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Обновляем каждую минуту

    return () => clearInterval(interval);
  }, []);

  // Обновление времени намаза при изменении города или метода
  useEffect(() => {
    if (selectedCity) {
      updatePrayerTimes();
    }
  }, [selectedCity, calculationMethod, currentTime]);

  const loadSettings = async () => {
    try {
      const [city, method] = await Promise.all([
        getSelectedCity(),
        getCalculationMethod()
      ]);
      
      setSelectedCity(city);
      setCalculationMethod(method);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrayerTimes = useCallback(() => {
    if (!selectedCity) return;

    const times = calculatePrayerTimes(selectedCity, currentTime, calculationMethod);
    setPrayerTimes(times);

    // Планируем уведомления
    schedulePrayerNotifications(times);
  }, [selectedCity, calculationMethod, currentTime]);

  const updateCity = useCallback((city: City) => {
    setSelectedCity(city);
  }, []);

  const updateCalculationMethod = useCallback((method: string) => {
    setCalculationMethod(method);
  }, []);

  const getNextPrayer = useCallback(() => {
    return prayerTimes.find(prayer => prayer.isNext);
  }, [prayerTimes]);

  const getTimeUntilNextPrayer = useCallback(() => {
    const nextPrayer = getNextPrayer();
    if (!nextPrayer) return '';

    return getTimeUntil(nextPrayer.time);
  }, [getNextPrayer]);

  return {
    prayerTimes,
    selectedCity,
    calculationMethod,
    loading,
    currentTime,
    updateCity,
    updateCalculationMethod,
    getNextPrayer,
    getTimeUntilNextPrayer,
    updatePrayerTimes
  };
} 