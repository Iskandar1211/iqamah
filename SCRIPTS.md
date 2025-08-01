# Скрипты проекта Iqamah

Этот документ описывает все доступные npm скрипты для разработки и сборки приложения.

## 🚀 Основные команды

### Разработка
- `npm start` - Запуск Expo сервера разработки
- `npm run dev` - Запуск в режиме разработки с dev-client
- `npm run ios` - Запуск на iOS симуляторе
- `npm run android` - Запуск на Android эмуляторе
- `npm run web` - Запуск веб-версии
- `npm run tunnel` - Запуск через туннель (для тестирования на устройстве)
- `npm run local` - Запуск только на localhost

### Сборка
- `npm run build:android` - Сборка для Android
- `npm run build:ios` - Сборка для iOS
- `npm run build:web` - Сборка веб-версии
- `npm run prebuild` - Подготовка к сборке
- `npm run publish` - Публикация в Expo

### Качество кода
- `npm run lint` - Проверка кода с ESLint
- `npm run lint:fix` - Автоматическое исправление ошибок ESLint
- `npm run type-check` - Проверка типов TypeScript
- `npm run format` - Форматирование кода с Prettier
- `npm run format:check` - Проверка форматирования кода

### Очистка и кэш
- `npm run clean` - Очистка кэша Expo
- `npm run clean:full` - Полная очистка проекта (удаляет node_modules, .expo и др.)
- `npm run clear-cache` - Очистка кэша при запуске

### Зависимости и обновления
- `npm run install` - Установка зависимостей
- `npm run update` - Обновление Expo SDK
- `npm run upgrade` - Обновление всех зависимостей
- `npm run check-deps` - Проверка устаревших пакетов и уязвимостей
- `npm run doctor` - Диагностика проекта Expo

### Утилиты
- `npm run eject` - Извлечение из Expo managed workflow
- `npm run analyze` - Анализ бандла
- `npm run test` - Запуск тестов (заглушка)
- `npm run reset-project` - Сброс проекта (существующий скрипт)

## 🔧 Дополнительные инструменты

### Prettier
- Автоматическое форматирование кода
- Конфигурация в `.prettierrc`
- Исключения в `.prettierignore`

### Husky + lint-staged
- Автоматическая проверка кода перед коммитом
- Конфигурация в `.lintstagedrc`

## 📝 Примеры использования

### Типичный рабочий процесс:
```bash
# Начало работы
npm install
npm run type-check
npm run lint

# Разработка
npm start

# Перед коммитом
npm run format
npm run lint:fix
npm run type-check

# Очистка при проблемах
npm run clean:full
npm install
```

### Проверка проекта:
```bash
npm run check-deps
npm run doctor
npm run lint
npm run type-check
```

### Сборка для продакшена:
```bash
npm run lint:fix
npm run type-check
npm run build:android  # или build:ios
```

## 🚨 Устранение неполадок

### Проблемы с кэшем:
```bash
npm run clean
npm run clear-cache
```

### Проблемы с зависимостями:
```bash
npm run clean:full
npm install
npm run check-deps
```

### Проблемы с типами:
```bash
npm run type-check
```

### Проблемы с форматированием:
```bash
npm run format
npm run lint:fix
``` 