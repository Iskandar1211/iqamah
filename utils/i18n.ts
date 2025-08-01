import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'ru' | 'tg' | 'en';

export interface Translations {
  // Общие
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  close: string;
  
  // Навигация
  home: string;
  qibla: string;
  settings: string;
  
  // Главный экран
  nextPrayer: string;
  prayerTimesToday: string;
  selectCity: string;
  detectLocation: string;
  locationDetected: string;
  locationError: string;
  loadingPrayerTimes: string;
  calculationMethod: string;
  through: string;
  
  // Намазы
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  
  // Настройки
  settingsTitle: string;
  settingsSubtitle: string;
  language: string;
  languageDescription: string;
  notifications: string;
  notificationsDescription: string;
  prayerNotifications: string;
  prayerNotificationsDescription: string;
  appearance: string;
  appearanceDescription: string;
  autoTheme: string;
  lightTheme: string;
  darkTheme: string;
  about: string;
  version: string;
  developer: string;
  developerName: string;
  
  // Методы расчета
  hanafiMethod: string;
  isnaMethod: string;
  egyptianMethod: string;
  makkahMethod: string;
  karachiMethod: string;
  tehranMethod: string;
  jafariMethod: string;
  
  // Алерты
  methodChanged: string;
  methodChangeError: string;
  notificationsSaveError: string;
  themeSaveError: string;
}

const translations: Record<Language, Translations> = {
  ru: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    save: 'Сохранить',
    close: 'Закрыть',
    
    home: 'Главная',
    qibla: 'Кибла',
    settings: 'Настройки',
    
    nextPrayer: 'Следующий намаз',
    prayerTimesToday: 'Время намазов на сегодня',
    selectCity: 'Выбрать город',
    detectLocation: 'Определить местоположение',
    locationDetected: 'Определен город',
    locationError: 'Не удалось определить местоположение',
    loadingPrayerTimes: 'Загрузка времени намаза...',
    calculationMethod: 'Метод расчета',
    through: 'Через',
    
    fajr: 'Фаджр',
    sunrise: 'Восход',
    dhuhr: 'Зухр',
    asr: 'Аср',
    maghrib: 'Магриб',
    isha: 'Иша',
    
    settingsTitle: 'Настройки',
    settingsSubtitle: 'Персонализируйте ваше приложение',
    language: 'Язык',
    languageDescription: 'Выберите язык приложения',
    notifications: 'Уведомления',
    notificationsDescription: 'Получать уведомления за 10 минут до намаза',
    prayerNotifications: 'Уведомления о намазе',
    prayerNotificationsDescription: 'Уведомления за 10 минут до каждого намаза',
    appearance: 'Внешний вид',
    appearanceDescription: 'Выберите тему приложения',
    autoTheme: 'Автоматически',
    lightTheme: 'Светлая тема',
    darkTheme: 'Темная тема',
    about: 'О приложении',
    version: 'Версия',
    developer: 'Разработчик',
    developerName: 'Просто раб аллаха',
    
    hanafiMethod: 'Ханафийский (Muslim World League)',
    isnaMethod: 'ISNA (Islamic Society of North America)',
    egyptianMethod: 'Египетский',
    makkahMethod: 'Мекканский',
    karachiMethod: 'Карачинский',
    tehranMethod: 'Тегеранский',
    jafariMethod: 'Джафари',
    
    methodChanged: 'Метод расчета изменен',
    methodChangeError: 'Не удалось сохранить метод расчета',
    notificationsSaveError: 'Не удалось сохранить настройки уведомлений',
    themeSaveError: 'Не удалось сохранить тему',
  },
  
  tg: {
    loading: 'Боркунӣ...',
    error: 'Хато',
    success: 'Муваффақ',
    cancel: 'Бекор кардан',
    save: 'Сабт кардан',
    close: 'Пӯшидан',
    
    home: 'Асосӣ',
    qibla: 'Қибла',
    settings: 'Танзимот',
    
    nextPrayer: 'Намази навбатӣ',
    prayerTimesToday: 'Вақти намазҳо барои имрӯз',
    selectCity: 'Шаҳрро интихоб кунед',
    detectLocation: 'Ҷойгиршавиро муайян кунед',
    locationDetected: 'Шаҳр муайян шуд',
    locationError: 'Ҷойгиршавиро муайян карда натавонист',
    loadingPrayerTimes: 'Вақти намазҳо боркунӣ мешавад...',
    calculationMethod: 'Усули ҳисоб',
    through: 'Тавассути',
    
    fajr: 'Фаҷр',
    sunrise: 'Тулуъ',
    dhuhr: 'Зуҳр',
    asr: 'Аср',
    maghrib: 'Мағриб',
    isha: 'Ишо',
    
    settingsTitle: 'Танзимот',
    settingsSubtitle: 'Барномаи худро шахсӣ кунед',
    language: 'Забон',
    languageDescription: 'Забони барномаро интихоб кунед',
    notifications: 'Огоҳиномаҳо',
    notificationsDescription: '10 дақиқа пеш аз намаз огоҳиномаҳоро қабул кунед',
    prayerNotifications: 'Огоҳиномаҳои намаз',
    prayerNotificationsDescription: '10 дақиқа пеш аз ҳар як намаз огоҳинома',
    appearance: 'Намоиш',
    appearanceDescription: 'Мавзӯи барномаро интихоб кунед',
    autoTheme: 'Худкор',
    lightTheme: 'Мавзӯи равшан',
    darkTheme: 'Мавзӯи торик',
    about: 'Дар бораи барнома',
    version: 'Версия',
    developer: 'Таҳиягар',
    developerName: 'Фақат бандаи Аллоҳ',
    
    hanafiMethod: 'Ҳанафӣ (Muslim World League)',
    isnaMethod: 'ISNA (Islamic Society of North America)',
    egyptianMethod: 'Мисрӣ',
    makkahMethod: 'Маккӣ',
    karachiMethod: 'Карачӣ',
    tehranMethod: 'Теҳронӣ',
    jafariMethod: 'Ҷаъфарӣ',
    
    methodChanged: 'Усули ҳисоб тағйир дода шуд',
    methodChangeError: 'Усули ҳисобро сабт карда натавонист',
    notificationsSaveError: 'Танзимоти огоҳиномаҳоро сабт карда натавонист',
    themeSaveError: 'Мавзӯро сабт карда натавонист',
  },
  
  en: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    
    home: 'Home',
    qibla: 'Qibla',
    settings: 'Settings',
    
    nextPrayer: 'Next Prayer',
    prayerTimesToday: 'Prayer Times Today',
    selectCity: 'Select City',
    detectLocation: 'Detect Location',
    locationDetected: 'City detected',
    locationError: 'Could not determine location',
    loadingPrayerTimes: 'Loading prayer times...',
    calculationMethod: 'Calculation Method',
    through: 'In',
    
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    
    settingsTitle: 'Settings',
    settingsSubtitle: 'Personalize your app',
    language: 'Language',
    languageDescription: 'Choose app language',
    notifications: 'Notifications',
    notificationsDescription: 'Receive notifications 10 minutes before prayer',
    prayerNotifications: 'Prayer Notifications',
    prayerNotificationsDescription: 'Notifications 10 minutes before each prayer',
    appearance: 'Appearance',
    appearanceDescription: 'Choose app theme',
    autoTheme: 'Auto',
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    about: 'About',
    version: 'Version',
    developer: 'Developer',
    developerName: 'Just a servant of Allah',
    
    hanafiMethod: 'Hanafi (Muslim World League)',
    isnaMethod: 'ISNA (Islamic Society of North America)',
    egyptianMethod: 'Egyptian',
    makkahMethod: 'Makkah',
    karachiMethod: 'Karachi',
    tehranMethod: 'Tehran',
    jafariMethod: 'Jafari',
    
    methodChanged: 'Calculation method changed',
    methodChangeError: 'Could not save calculation method',
    notificationsSaveError: 'Could not save notification settings',
    themeSaveError: 'Could not save theme',
  },
};

class I18n {
  private currentLanguage: Language = 'ru';
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadLanguage();
  }

  private async loadLanguage() {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'tg' || savedLanguage === 'en')) {
        this.currentLanguage = savedLanguage as Language;
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  }

  async setLanguage(language: Language) {
    this.currentLanguage = language;
    try {
      await AsyncStorage.setItem('language', language);
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: keyof Translations): string {
    return translations[this.currentLanguage][key] || key;
  }

  addListener(listener: () => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: () => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  getAvailableLanguages(): Array<{ code: Language; name: string; nativeName: string }> {
    return [
      { code: 'ru', name: 'Russian', nativeName: 'Русский' },
      { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ' },
      { code: 'en', name: 'English', nativeName: 'English' },
    ];
  }
}

export const i18n = new I18n();

import React from 'react';

// Хук для использования переводов в компонентах
export const useTranslation = () => {
  const [_, forceUpdate] = React.useState({});

  React.useEffect(() => {
    const listener = () => forceUpdate({});
    i18n.addListener(listener);
    return () => i18n.removeListener(listener);
  }, []);

  return {
    t: i18n.t.bind(i18n),
    language: i18n.getLanguage(),
    setLanguage: i18n.setLanguage.bind(i18n),
    availableLanguages: i18n.getAvailableLanguages(),
  };
}; 