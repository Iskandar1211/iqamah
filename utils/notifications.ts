import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { PrayerTime } from './prayerTimes';

// Проверяем, поддерживаются ли уведомления в текущей среде
const isNotificationsSupported = () => {
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

export async function schedulePrayerNotifications(
  prayerTimes: PrayerTime[]
): Promise<void> {
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
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    for (const prayer of prayerTimes) {
      // Создаем дату для времени намаза сегодня
      const prayerDate = new Date(today);
      const [hours, minutes] = prayer.time.split(':').map(Number);
      prayerDate.setHours(hours, minutes, 0, 0);

      // Если время намаза уже прошло сегодня, планируем на завтра
      if (prayerDate <= now) {
        prayerDate.setDate(prayerDate.getDate() + 1);
      }

      // Планируем уведомление за 10 минут до намаза
      const notificationDate = new Date(prayerDate.getTime() - 10 * 60 * 1000);
      
      // Если время уведомления еще не прошло
      if (notificationDate > now) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Время намаза',
            body: `До ${prayer.name} осталось 10 минут`,
            sound: 'default',
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: { prayerName: prayer.name, prayerTime: prayer.time },
          },
          trigger: {
            date: notificationDate,
            repeats: false,
          },
        });

        console.log(`Scheduled notification for ${prayer.name} at ${notificationDate.toLocaleString()}`);
      }

      // Также планируем уведомление точно в время намаза
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Время намаза',
          body: `Время ${prayer.name}`,
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
          data: { prayerName: prayer.name, prayerTime: prayer.time },
        },
        trigger: {
          date: prayerDate,
          repeats: false,
        },
      });

      console.log(`Scheduled notification for ${prayer.name} at ${prayerDate.toLocaleString()}`);
    }

    // Планируем уведомления на следующие 7 дней
    for (let day = 1; day <= 7; day++) {
      const futureDate = new Date(today);
      futureDate.setDate(futureDate.getDate() + day);

      for (const prayer of prayerTimes) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const futurePrayerDate = new Date(futureDate);
        futurePrayerDate.setHours(hours, minutes, 0, 0);

        // Уведомление за 10 минут
        const futureNotificationDate = new Date(futurePrayerDate.getTime() - 10 * 60 * 1000);
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Время намаза',
            body: `До ${prayer.name} осталось 10 минут`,
            sound: 'default',
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: { prayerName: prayer.name, prayerTime: prayer.time },
          },
          trigger: {
            date: futureNotificationDate,
            repeats: false,
          },
        });

        // Уведомление точно в время
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Время намаза',
            body: `Время ${prayer.name}`,
            sound: 'default',
            priority: Notifications.AndroidNotificationPriority.HIGH,
            data: { prayerName: prayer.name, prayerTime: prayer.time },
          },
          trigger: {
            date: futurePrayerDate,
            repeats: false,
          },
        });
      }
    }

    console.log('All prayer notifications scheduled successfully');
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
    console.log('All notifications cancelled');
  } catch (error) {
    console.log('Error canceling notifications:', error);
  }
}

export async function getScheduledNotifications(): Promise<
  Notifications.NotificationRequest[]
> {
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

// Функция для планирования уведомления на конкретное время
export async function scheduleNotificationAtTime(
  title: string,
  body: string,
  date: Date
): Promise<void> {
  if (!isNotificationsSupported()) {
    return;
  }

  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        date,
        repeats: false,
      },
    });
  } catch (error) {
    console.log('Error scheduling notification:', error);
  }
}
