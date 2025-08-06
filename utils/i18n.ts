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
  autoThemeDescription: string;
  lightTheme: string;
  lightThemeDescription: string;
  darkTheme: string;
  darkThemeDescription: string;
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
  dubaiMethod: string;
  kuwaitMethod: string;
  qatarMethod: string;
  singaporeMethod: string;
  turkeyMethod: string;
  moonsightingMethod: string;
  northAmericaMethod: string;
  otherMethod: string;
  
  // Qibla
  qiblaDirection: string;
  qiblaDescription: string;
  north: string;
  northeast: string;
  east: string;
  southeast: string;
  south: string;
  southwest: string;
  west: string;
  northwest: string;
  fromNorth: string;
  toKaaba: string;
  yourLocation: string;
  howToDetermineQibla: string;
  step1Qibla: string;
  step2Qibla: string;
  step3Qibla: string;
  step4Qibla: string;
  qiblaNote: string;
  startCompass: string;
  stopCompass: string;
  compassNotAvailable: string;
  compassNotAvailableDescription: string;
  ok: string;
  
  // Алерты
  methodChanged: string;
  methodChangeError: string;
  notificationsSaveError: string;
  themeSaveError: string;
  
  // Дополнительные переводы
  searchCity: string;
  totalCities: string;
  citySaveError: string;
  languageChangeError: string;
  hadithOfDay: string;
  narratedBy: string;
  methodCalculationDescription: string;
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
    autoThemeDescription: 'Следует системной теме',
    lightTheme: 'Светлая тема',
    lightThemeDescription: 'Светлый интерфейс',
    darkTheme: 'Темная тема',
    darkThemeDescription: 'Темный интерфейс',
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
    dubaiMethod: 'Дубайский',
    kuwaitMethod: 'Кувейтский',
    qatarMethod: 'Катарский',
    singaporeMethod: 'Сингапурский',
    turkeyMethod: 'Турецкий',
    moonsightingMethod: 'Комитет наблюдения за луной',
    northAmericaMethod: 'Северная Америка',
    otherMethod: 'Другой',
    
    methodChanged: 'Метод расчета изменен',
    methodChangeError: 'Не удалось сохранить метод расчета',
    notificationsSaveError: 'Не удалось сохранить настройки уведомлений',
    themeSaveError: 'Не удалось сохранить тему',
    
    // Дополнительные переводы
    searchCity: 'Поиск города...',
    totalCities: 'Всего городов',
    citySaveError: 'Не удалось сохранить выбранный город',
    languageChangeError: 'Не удалось изменить язык',
    hadithOfDay: 'Хадис дня',
    narratedBy: 'Передал',
    methodCalculationDescription: 'Выберите метод расчета, соответствующий вашему мазхабу',
    
    // Qibla
    qiblaDirection: 'Направление Киблы',
    qiblaDescription: 'Направление к Каабе в Мекке',
    north: 'С',
    northeast: 'СВ',
    east: 'В',
    southeast: 'ЮВ',
    south: 'Ю',
    southwest: 'ЮЗ',
    west: 'З',
    northwest: 'СЗ',
    fromNorth: 'от севера',
    yourLocation: 'Ваше местоположение',
    howToDetermineQibla: 'Как определить направление Киблы',
    step1Qibla: 'Встаньте лицом к северу',
    step2Qibla: 'Повернитесь в направлении стрелки',
    step3Qibla: 'Теперь вы смотрите в сторону Каабы',
    step4Qibla: 'Это направление для совершения намаза',
    qiblaNote: 'Для более точного определения направления используйте компас или GPS',
    startCompass: 'Включить компас',
    stopCompass: 'Остановить компас',
    compassNotAvailable: 'Компас недоступен',
    compassNotAvailableDescription: 'Ваше устройство не поддерживает компас или датчик недоступен',
    ok: 'ОК',
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
    autoThemeDescription: 'Системаи мавзӯро пайравӣ мекунад',
    lightTheme: 'Мавзӯи равшан',
    lightThemeDescription: 'Интерфейси равшан',
    darkTheme: 'Мавзӯи торик',
    darkThemeDescription: 'Интерфейси торик',
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
    dubaiMethod: 'Дубайӣ',
    kuwaitMethod: 'Кувайтӣ',
    qatarMethod: 'Қатарӣ',
    singaporeMethod: 'Сингапурӣ',
    turkeyMethod: 'Туркӣ',
    moonsightingMethod: 'Кумитаи назорати моҳ',
    northAmericaMethod: 'Амрикои Шимолӣ',
    otherMethod: 'Дигар',
    
    methodChanged: 'Усули ҳисоб тағйир дода шуд',
    methodChangeError: 'Усули ҳисобро сабт карда натавонист',
    notificationsSaveError: 'Танзимоти огоҳиномаҳоро сабт карда натавонист',
    themeSaveError: 'Мавзӯро сабт карда натавонист',
    
    // Дополнительные переводы
    searchCity: 'Ҷустуҷӯи шаҳр...',
    totalCities: 'Ҳамаи шаҳрҳо',
    citySaveError: 'Шаҳри интихобшударо сабт карда натавонист',
    languageChangeError: 'Забонро тағйир дода натавонист',
    hadithOfDay: 'Ҳадиси рӯз',
    narratedBy: 'Ривоят кард',
    methodCalculationDescription: 'Усули ҳисобро интихоб кунед, ки ба мазҳаби шумо мувофиқ аст',
    
    // Qibla
    qiblaDirection: 'Роҳи қибла',
    qiblaDescription: 'Роҳи Каъба дар Макка',
    north: 'Шимол',
    northeast: 'Шимоли шарқ',
    east: 'Шарқ',
    southeast: 'Ҷануби шарқ',
    south: 'Ҷануб',
    southwest: 'Ҷануби ғарб',
    west: 'Ғарб',
    northwest: 'Шимоли ғарб',
    fromNorth: 'аз шимол',
    toKaaba: 'то Каъба',
    yourLocation: 'Ҷойгиршавии шумо',
    howToDetermineQibla: 'Чӣ тавр роҳи қибларо муайян кардан',
    step1Qibla: 'Ба шимол рӯ ба рӯ бистед',
    step2Qibla: 'Ба самти тирча кунед',
    step3Qibla: 'Ҳоло шумо ба самти Каъба мебинед',
    step4Qibla: 'Ин роҳ барои адои намоз аст',
    qiblaNote: 'Барои муайян кардани дақиқи роҳ компас ё GPS истифода баред',
    startCompass: 'Компассро фаъол кунед',
    stopCompass: 'Компассро қатъ кунед',
    compassNotAvailable: 'Компас дастрас нест',
    compassNotAvailableDescription: 'Дастгоҳи шумо компассро дастгирӣ намекунад ё сенсор дастрас нест',
    ok: 'Хуб',
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
    autoThemeDescription: 'Follows system theme',
    lightTheme: 'Light Theme',
    lightThemeDescription: 'Light interface',
    darkTheme: 'Dark Theme',
    darkThemeDescription: 'Dark interface',
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
    dubaiMethod: 'Dubai',
    kuwaitMethod: 'Kuwait',
    qatarMethod: 'Qatar',
    singaporeMethod: 'Singapore',
    turkeyMethod: 'Turkey',
    moonsightingMethod: 'Moonsighting Committee',
    northAmericaMethod: 'North America',
    otherMethod: 'Other',
    
    methodChanged: 'Calculation method changed',
    methodChangeError: 'Could not save calculation method',
    notificationsSaveError: 'Could not save notification settings',
    themeSaveError: 'Could not save theme',
    
    // Дополнительные переводы
    searchCity: 'Search city...',
    totalCities: 'Total cities',
    citySaveError: 'Could not save selected city',
    languageChangeError: 'Could not change language',
    hadithOfDay: 'Hadith of the day',
    narratedBy: 'Narrated by',
    methodCalculationDescription: 'Choose calculation method that corresponds to your madhhab',
    
    // Qibla
    qiblaDirection: 'Qibla Direction',
    qiblaDescription: 'Direction to the Kaaba in Mecca',
    north: 'N',
    northeast: 'NE',
    east: 'E',
    southeast: 'SE',
    south: 'S',
    southwest: 'SW',
    west: 'W',
    northwest: 'NW',
    fromNorth: 'from north',
    toKaaba: 'to Kaaba',
    yourLocation: 'Your Location',
    howToDetermineQibla: 'How to determine Qibla direction',
    step1Qibla: 'Face north',
    step2Qibla: 'Turn in the direction of the arrow',
    step3Qibla: 'Now you are facing the Kaaba',
    step4Qibla: 'This is the direction for prayer',
    qiblaNote: 'For more accurate direction determination, use a compass or GPS',
    startCompass: 'Start Compass',
    stopCompass: 'Stop Compass',
    compassNotAvailable: 'Compass Not Available',
    compassNotAvailableDescription: 'Your device does not support compass or sensor is not available',
    ok: 'OK',
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