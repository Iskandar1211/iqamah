import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { PrayerTime } from './prayerTimes';

// Проверяем, поддерживаются ли уведомления в текущей среде
const isNotificationsSupported = () => {
  // В Expo Go SDK 53+ push-уведомления не поддерживаются
  // Но локальные уведомления могут работать
  return Platform.OS !== 'web';
};

// Настройка обработчика уведомлений
if (isNotificationsSupported()) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (!isNotificationsSupported()) {
    console.log('Notifications not supported in this environment');
    return false;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Notification permissions not granted');
      return false;
    }
    
    return true;
  } catch (error) {
    console.log('Error requesting notification permissions:', error);
    return false;
  }
}

export async function schedulePrayerNotifications(prayerTimes: PrayerTime[]): Promise<void> {
  if (!isNotificationsSupported()) {
    console.log('Notifications not supported in this environment');
    return;
  }

  try {
    // Сначала отменяем все существующие уведомления
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      console.log('No notification permissions');
      return;
    }
    
    const now = new Date();
    
    for (const prayer of prayerTimes) {
      // В Expo Go SDK 53+ планирование уведомлений ограничено
      // Отправляем немедленное уведомление для тестирования
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Время намаза',
          body: `До ${prayer.name} осталось 10 минут`,
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // Немедленное уведомление для тестирования
      });
    }
  } catch (error) {
    console.log('Error scheduling prayer notifications:', error);
  }
}

export async function cancelAllNotifications(): Promise<void> {
  if (!isNotificationsSupported()) {
    return;
  }

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.log('Error canceling notifications:', error);
  }
}

export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  if (!isNotificationsSupported()) {
    return [];
  }

  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.log('Error getting scheduled notifications:', error);
    return [];
  }
}

// Функция для тестирования уведомлений
export async function sendTestNotification(): Promise<void> {
  if (!isNotificationsSupported()) {
    console.log('Notifications not supported in this environment');
    return;
  }

  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      console.log('No notification permissions');
      return;
    }
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Тестовое уведомление',
        body: 'Это тестовое уведомление для проверки работы',
        sound: 'default',
      },
      trigger: null, // Немедленное уведомление для тестирования
    });
  } catch (error) {
    console.log('Error sending test notification:', error);
  }
} 