import { useCallback, useEffect, useRef, useState } from 'react';
import { City, PrayerTime } from '../types/prayerTimes';
import { cancelAllNotifications, schedulePrayerNotifications } from '../utils/notifications';
import {
    calculatePrayerTimes,
    getTimeUntil,
} from '../utils/prayerTimes';
import { getNotificationsEnabled, getSelectedCity } from '../utils/storage';

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Используем ref для отслеживания последнего планирования уведомлений
  const lastNotificationSchedule = useRef<{
    cityId: string;
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

  // Обновление времени намаза при изменении города
  useEffect(() => {
    if (selectedCity) {
      updatePrayerTimes();
    }
  }, [selectedCity, currentTime, notificationsEnabled]);

  const loadSettings = async () => {
    try {
      const [city, notifications] = await Promise.all([
        getSelectedCity(),
        getNotificationsEnabled(),
      ]);

      setSelectedCity(city);
      setNotificationsEnabled(notifications);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrayerTimes = useCallback(async () => {
    if (!selectedCity) return;

    let times: PrayerTime[] = [];
    
    try {
      times = await calculatePrayerTimes(selectedCity, currentTime);
      setPrayerTimes(times);
    } catch (error) {
      console.error('Error calculating prayer times:', error);
      return; // Выходим, если не удалось получить время намаза
    }

    // Проверяем, нужно ли перепланировать уведомления
    const today = new Date().toDateString();
    const currentSchedule = {
      cityId: selectedCity.id.toString(),
      date: today,
      notificationsEnabled,
    };

    // Планируем уведомления только если изменился город, день или настройка уведомлений
    if (
      !lastNotificationSchedule.current ||
      lastNotificationSchedule.current.cityId !== currentSchedule.cityId ||
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
  }, [selectedCity, currentTime, notificationsEnabled]);

  const updateCity = useCallback((city: City) => {
    setSelectedCity(city);
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
    notificationsEnabled,
    loading,
    currentTime,
    updateCity,
    updateNotificationsEnabled,
    getNextPrayer,
    getTimeUntilNextPrayer,
    updatePrayerTimes,
  };
}
