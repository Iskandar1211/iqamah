# Интеграция с временами намаза

## Обзор

Этот документ описывает интеграцию приложения Iqamah с временами намаза от Aladhan API (временное решение) и подготовку к интеграции с официальными данными от Исламского центра Республики Таджикистан.

## Архитектура

### Файлы

1. **`types/prayerTimes.ts`** - Типы данных для времени намаза
2. **`utils/tajikistanPrayerTimes.ts`** - Основная логика работы с официальными данными
3. **`utils/mockOfficialData.ts`** - Примерные данные для тестирования
4. **`utils/prayerTimes.ts`** - Обновленная логика с fallback на расчеты adhan

### Принцип работы

1. Приложение сначала пытается получить данные от Aladhan API
2. Если данные недоступны, используется fallback на расчеты библиотеки adhan
3. Все данные кэшируются для оптимизации производительности
4. В будущем планируется переход на официальные данные от Исламского центра

## Настройка

### 1. Включение/отключение Aladhan API

В файле `utils/tajikistanPrayerTimes.ts`:

```typescript
// Флаг для использования Aladhan API (установите false для примерных данных)
const USE_ALADHAN_API = true;
```

### 2. Настройка API URL

В файле `utils/tajikistanPrayerTimes.ts`:

```typescript
// URL для получения данных от Aladhan API
const ALADHAN_API = 'https://api.aladhan.com/v1/timingsByCity';
```

## API Спецификация (Aladhan)

### Запрос

```
GET /v1/timingsByCity?city={cityName}&country={countryName}&method=4&month={month}&year={year}
```

### Параметры

- `cityName` - Название города (например, "Dushanbe")
- `countryName` - Название страны (например, "Tajikistan")
- `method` - Метод расчета (4 = Muslim World League)
- `year` - Год (например, 2024)
- `month` - Месяц (1-12)

### Ответ

```json
{
  "code": 200,
  "status": "OK",
  "data": [
    {
      "date": {
        "readable": "01 Dec 2024"
      },
      "timings": {
        "Fajr": "05:45",
        "Sunrise": "07:15",
        "Dhuhr": "12:15",
        "Asr": "15:00",
        "Maghrib": "17:30",
        "Isha": "19:00"
      }
    }
  ]
}
```

## Интеграция с Aladhan API

### Текущее состояние

✅ **Aladhan API интегрирован и работает**
- Использует метод Muslim World League (метод 4)
- Поддерживает все города Таджикистана
- Автоматическое кэширование данных

### Шаги для интеграции с официальным API

1. **Связаться с Исламским центром Республики Таджикистан**
   - Получить доступ к API
   - Обсудить формат данных
   - Согласовать лимиты запросов

2. **Обновить URL API**
   ```typescript
   const OFFICIAL_API_URL = 'https://api.islamic-center.tj/prayer-times';
   ```

3. **Отключить Aladhan API**
   ```typescript
   const USE_ALADHAN_API = false;
   ```

4. **Протестировать интеграцию**
   - Проверить получение данных
   - Убедиться в корректности времени
   - Проверить fallback механизм

### Требования к API

- **Доступность**: 24/7
- **Формат времени**: HH:MM (24-часовой формат)
- **Часовой пояс**: Asia/Dushanbe
- **Кодировка**: UTF-8
- **Формат даты**: YYYY-MM-DD

## Кэширование

Данные кэшируются по ключу: `{cityId}-{year}-{month}`

### Управление кэшем

```typescript
import { clearPrayerTimesCache, getCacheSize } from './utils/tajikistanPrayerTimes';

// Очистить кэш
clearPrayerTimesCache();

// Получить размер кэша
const size = getCacheSize();
```

## Fallback механизм

Если официальные данные недоступны, приложение автоматически переключается на расчеты библиотеки adhan с методом MuslimWorldLeague.

### Логирование

```typescript
console.log('Using official prayer times from Islamic Center of Tajikistan');
console.log('Using adhan calculations as fallback');
```

## Тестирование

### Примерные данные

Файл `utils/mockOfficialData.ts` содержит примерные данные для Душанбе на декабрь 2024 года.

### Тестирование интеграции

1. Включите `USE_MOCK_DATA = true`
2. Запустите приложение
3. Проверьте, что отображаются примерные данные
4. Отключите `USE_MOCK_DATA = false`
5. Проверьте fallback на расчеты adhan

## Мониторинг

### Метрики для отслеживания

- Процент успешных запросов к API
- Время ответа API
- Количество fallback на adhan
- Размер кэша

### Логирование ошибок

```typescript
console.warn('Failed to fetch official prayer times:', error);
console.error('Error calculating prayer times:', error);
```

## Безопасность

### Рекомендации

1. Используйте HTTPS для API запросов
2. Добавьте аутентификацию при необходимости
3. Ограничьте частоту запросов
4. Валидируйте полученные данные

## Поддержка

### Контакты

- **Исламский центр Республики Таджикистан**
- **Email**: [email центра]
- **Телефон**: [телефон центра]

### Документация

- [Официальный сайт Исламского центра](https://islamic-center.tj)
- [API документация](https://api.islamic-center.tj/docs)

## Обновления

### Версия 1.0.0
- Базовая интеграция с официальным API
- Fallback на расчеты adhan
- Кэширование данных
- Примерные данные для тестирования

### Планы на будущее
- Поддержка push-уведомлений от центра
- Автоматическое обновление данных
- Офлайн режим с кэшированными данными
- Поддержка дополнительных городов 