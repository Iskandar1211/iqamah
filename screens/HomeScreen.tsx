import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { HadithCard } from '../components/HadithCard';
import { Header } from '../components/Header';
import { PrayerCard } from '../components/PrayerCard';
import citiesData from '../data/cities.json';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { getCurrentCity } from '../utils/location';
import { sendTestNotification } from '../utils/notifications';
import { saveSelectedCity } from '../utils/storage';
import { CitySelectionScreen } from './CitySelectionScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [showCitySelection, setShowCitySelection] = useState(false);

  const {
    prayerTimes,
    selectedCity,
    calculationMethod,
    loading,
    updateCity,
    updateCalculationMethod,
    getNextPrayer,
    getTimeUntilNextPrayer,
  } = usePrayerTimes();

  // Инициализация с городом Душанбе при первом запуске
  useEffect(() => {
    if (!selectedCity && !loading) {
      const dushanbe = citiesData.find(city => city.name === 'Душанбе');
      if (dushanbe) {
        updateCity(dushanbe);
        saveSelectedCity(dushanbe);
      }
    }
  }, [selectedCity, loading, updateCity]);

  const handleCityPress = () => {
    setShowCitySelection(true);
  };

  const handleCitySelected = (city: any) => {
    updateCity(city);
  };

  const handleCloseCitySelection = () => {
    setShowCitySelection(false);
  };

  const handleLocationPress = async () => {
    try {
      const currentCity = await getCurrentCity();
      if (currentCity) {
        updateCity(currentCity);
        await saveSelectedCity(currentCity);
        Alert.alert('Успешно', `Определен город: ${currentCity.name}`);
      } else {
        Alert.alert('Ошибка', 'Не удалось определить местоположение');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось получить местоположение');
    }
  };

  const handleTestNotification = async () => {
    try {
      await sendTestNotification();
      Alert.alert('Успешно', 'Тестовое уведомление отправлено');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось отправить уведомление');
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text
          style={[styles.loadingText, { color: theme.colors.onBackground }]}
        >
          Загрузка времени намаза...
        </Text>
      </View>
    );
  }

  const nextPrayer = getNextPrayer();
  const timeUntilNext = getTimeUntilNextPrayer();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Информация о городе */}
        <View style={styles.citySection}>
          <Text
            style={[styles.cityTitle, { color: theme.colors.onBackground }]}
          >
            {selectedCity?.name}, {selectedCity?.country}
          </Text>
          <Text
            style={[
              styles.methodText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            Метод расчета: Ханафийский (Muslim World League)
          </Text>
        </View>

        {/* Следующий намаз */}
        {nextPrayer && (
          <View
            style={[
              styles.nextPrayerSection,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <Text
              style={[
                styles.nextPrayerTitle,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              Следующий намаз
            </Text>
            <Text
              style={[
                styles.nextPrayerName,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              {nextPrayer.name}
            </Text>
            <Text
              style={[
                styles.nextPrayerTime,
                { color: theme.colors.onPrimaryContainer },
              ]}
            >
              {nextPrayer.formattedTime}
            </Text>
            {timeUntilNext && (
              <Text
                style={[
                  styles.timeUntilText,
                  { color: theme.colors.onPrimaryContainer },
                ]}
              >
                Через {timeUntilNext}
              </Text>
            )}
          </View>
        )}

        {/* Хадис дня */}
        <HadithCard />

        {/* Список всех намазов */}
        <View style={styles.prayerListSection}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
          >
            Время намазов на сегодня
          </Text>
          {prayerTimes.map((prayer, index) => (
            <PrayerCard key={index} prayer={prayer} />
          ))}
        </View>

        {/* Кнопки управления */}
        <View style={styles.buttonsSection}>
          <Button
            mode="outlined"
            onPress={handleCityPress}
            style={styles.button}
            icon="city"
          >
            Выбрать город
          </Button>

          <Button
            mode="outlined"
            onPress={handleLocationPress}
            style={styles.button}
            icon="crosshairs-gps"
          >
            Определить местоположение
          </Button>
        </View>
      </ScrollView>

      {/* Модальное окно выбора города */}
      <Modal
        visible={showCitySelection}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <CitySelectionScreen
          onCitySelected={handleCitySelected}
          onClose={handleCloseCitySelection}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  citySection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  methodText: {
    fontSize: 14,
  },
  nextPrayerSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextPrayerTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  nextPrayerName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  nextPrayerTime: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeUntilText: {
    fontSize: 16,
    fontWeight: '500',
  },
  prayerListSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  buttonsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  button: {
    marginBottom: 12,
  },
});
