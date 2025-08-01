import AsyncStorage from '@react-native-async-storage/async-storage';
import { City } from './prayerTimes';

const STORAGE_KEYS = {
  SELECTED_CITY: 'selected_city',
  CALCULATION_METHOD: 'calculation_method',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  THEME: 'theme',
};

export interface AppSettings {
  selectedCity: City | null;
  calculationMethod: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export async function saveSelectedCity(city: City): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.SELECTED_CITY,
      JSON.stringify(city)
    );
  } catch (error) {
    console.error('Error saving selected city:', error);
  }
}

export async function getSelectedCity(): Promise<City | null> {
  try {
    const cityData = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CITY);
    return cityData ? JSON.parse(cityData) : null;
  } catch (error) {
    console.error('Error getting selected city:', error);
    return null;
  }
}

export async function saveCalculationMethod(method: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CALCULATION_METHOD, method);
  } catch (error) {
    console.error('Error saving calculation method:', error);
  }
}

export async function getCalculationMethod(): Promise<string> {
  try {
    return (
      (await AsyncStorage.getItem(STORAGE_KEYS.CALCULATION_METHOD)) ||
      'MuslimWorldLeague'
    );
  } catch (error) {
    console.error('Error getting calculation method:', error);
    return 'MuslimWorldLeague';
  }
}

export async function saveNotificationsEnabled(
  enabled: boolean
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS_ENABLED,
      JSON.stringify(enabled)
    );
  } catch (error) {
    console.error('Error saving notifications setting:', error);
  }
}

export async function getNotificationsEnabled(): Promise<boolean> {
  try {
    const enabled = await AsyncStorage.getItem(
      STORAGE_KEYS.NOTIFICATIONS_ENABLED
    );
    return enabled ? JSON.parse(enabled) : true;
  } catch (error) {
    console.error('Error getting notifications setting:', error);
    return true;
  }
}

export async function saveTheme(
  theme: 'light' | 'dark' | 'auto'
): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
}

export async function getTheme(): Promise<'light' | 'dark' | 'auto'> {
  try {
    return (
      ((await AsyncStorage.getItem(STORAGE_KEYS.THEME)) as
        | 'light'
        | 'dark'
        | 'auto') || 'auto'
    );
  } catch (error) {
    console.error('Error getting theme:', error);
    return 'auto';
  }
}

export async function getAllSettings(): Promise<AppSettings> {
  const [selectedCity, calculationMethod, notificationsEnabled, theme] =
    await Promise.all([
      getSelectedCity(),
      getCalculationMethod(),
      getNotificationsEnabled(),
      getTheme(),
    ]);

  return {
    selectedCity,
    calculationMethod,
    notificationsEnabled,
    theme,
  };
}

export async function clearAllSettings(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing settings:', error);
  }
}
