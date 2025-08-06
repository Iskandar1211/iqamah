import { useCallback, useEffect, useState, useRef } from 'react';
import { schedulePrayerNotifications, cancelAllNotifications } from '../utils/notifications';
import {
  City,
  PrayerTime,
  calculatePrayerTimes,
  getTimeUntil,
} from '../utils/prayerTimes';
import { getCalculationMethod, getSelectedCity, getNotificationsEnabled } from '../utils/storage';

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [calculationMethod, setCalculationMethod] =
    useState<string>('MuslimWorldLeague');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Используем ref для отслеживания последнего планирования уведомлений
  const lastNotificationSchedule = useRef<{
    cityId: string;
    method: string;
    date: string;
    notificationsEnabled: boolean;
  } | null>(null);

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
  }, [selectedCity, calculationMethod, currentTime, notificationsEnabled]);

  const loadSettings = async () => {
    try {
      const [city, method, notifications] = await Promise.all([
        getSelectedCity(),
        getCalculationMethod(),
        getNotificationsEnabled(),
      ]);

      setSelectedCity(city);
      setCalculationMethod(method);
      setNotificationsEnabled(notifications);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrayerTimes = useCallback(() => {
    if (!selectedCity) return;

    const times = calculatePrayerTimes(
      selectedCity,
      currentTime,
      calculationMethod
    );
    setPrayerTimes(times);

    // Проверяем, нужно ли перепланировать уведомления
    const today = new Date().toDateString();
    const currentSchedule = {
      cityId: selectedCity.id,
      method: calculationMethod,
      date: today,
      notificationsEnabled,
    };

    // Планируем уведомления только если изменился город, метод, день или настройка уведомлений
    if (
      !lastNotificationSchedule.current ||
      lastNotificationSchedule.current.cityId !== currentSchedule.cityId ||
      lastNotificationSchedule.current.method !== currentSchedule.method ||
      lastNotificationSchedule.current.date !== currentSchedule.date ||
      lastNotificationSchedule.current.notificationsEnabled !== currentSchedule.notificationsEnabled
    ) {
      console.log('Scheduling notifications due to changes...');
      
      if (notificationsEnabled) {
        schedulePrayerNotifications(times);
      } else {
        cancelAllNotifications();
      }
      
      lastNotificationSchedule.current = currentSchedule;
    }
  }, [selectedCity, calculationMethod, currentTime, notificationsEnabled]);

  const updateCity = useCallback((city: City) => {
    setSelectedCity(city);
  }, []);

  const updateCalculationMethod = useCallback((method: string) => {
    setCalculationMethod(method);
  }, []);

  const updateNotificationsEnabled = useCallback((enabled: boolean) => {
    setNotificationsEnabled(enabled);
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
    notificationsEnabled,
    loading,
    currentTime,
    updateCity,
    updateCalculationMethod,
    updateNotificationsEnabled,
    getNextPrayer,
    getTimeUntilNextPrayer,
    updatePrayerTimes,
  };
}
