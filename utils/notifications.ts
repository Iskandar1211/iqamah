import * as Notifications from 'expo-notifications';
import { PrayerTime } from './prayerTimes';

// Настройка обработчика уведомлений
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
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
}

export async function schedulePrayerNotifications(prayerTimes: PrayerTime[]): Promise<void> {
  // Сначала отменяем все существующие уведомления
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.log('No notification permissions');
    return;
  }
  
  const now = new Date();
  
  for (const prayer of prayerTimes) {
    // Планируем уведомление за 10 минут до намаза
    const notificationTime = new Date(prayer.time.getTime() - 10 * 60 * 1000);
    
    // Если время уведомления уже прошло, пропускаем
    if (notificationTime <= now) {
      continue;
    }
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Время намаза',
        body: `До ${prayer.name} осталось 10 минут`,
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        date: notificationTime,
      },
    });
  }
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  return await Notifications.getAllScheduledNotificationsAsync();
}

// Функция для тестирования уведомлений
export async function sendTestNotification(): Promise<void> {
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
    trigger: {
      seconds: 5, // Уведомление через 5 секунд
    },
  });
} 