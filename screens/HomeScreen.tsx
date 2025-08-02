import { CitySelectionScreen } from '@/components/CitySelectionScreen';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HadithCard } from '../components/HadithCard';
import { Header } from '../components/Header';
import { PrayerCard } from '../components/PrayerCard';
import citiesData from '../data/cities.json';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useTranslation } from '../utils/i18n';
import { getCurrentCity } from '../utils/location';
import { saveSelectedCity } from '../utils/storage';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [showCitySelection, setShowCitySelection] = useState(false);

  const {
    prayerTimes,
    selectedCity,
    calculationMethod,
    loading,
    updateCity,
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
        Alert.alert(t('success'), `${t('locationDetected')}: ${currentCity.name}`);
      } else {
        Alert.alert(t('error'), t('locationError'));
      }
    } catch (error) {
      Alert.alert(t('error'), t('locationError'));
    }
  };

  const getMethodDisplayName = (method: string): string => {
    const methodNames: { [key: string]: string } = {
      MuslimWorldLeague: t('hanafiMethod'),
      ISNA: t('isnaMethod'),
      Egyptian: t('egyptianMethod'),
      UmmAlQura: t('makkahMethod'),
      Karachi: t('karachiMethod'),
      Tehran: t('tehranMethod'),
      Dubai: t('dubaiMethod'),
      Kuwait: t('kuwaitMethod'),
      Qatar: t('qatarMethod'),
      Singapore: t('singaporeMethod'),
      Turkey: t('turkeyMethod'),
      MoonsightingCommittee: t('moonsightingMethod'),
      NorthAmerica: t('northAmericaMethod'),
      Other: t('otherMethod'),
    };
    return methodNames[method] || method;
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
          {t('loadingPrayerTimes')}
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
        contentContainerStyle={styles.scrollContent}
      >
        {/* Информация о городе */}
        <View style={styles.citySection}>
          <View style={[styles.cityCard, { backgroundColor: theme.colors.surface }]}>
            <Text
              style={[styles.cityTitle, { color: theme.colors.onSurface }]}
            >
              {selectedCity?.name}, {selectedCity?.country}
            </Text>
            <Text
              style={[
                styles.methodText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {t('calculationMethod')}: {getMethodDisplayName(calculationMethod)}
            </Text>
          </View>
        </View>

        {/* Следующий намаз */}
        {nextPrayer && (
          <View style={styles.nextPrayerContainer}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextPrayerSection}
            >
              <View style={styles.nextPrayerContent}>
                <Text
                  style={[
                    styles.nextPrayerTitle,
                    { color: theme.colors.onPrimary },
                  ]}
                >
                  {t('nextPrayer')}
                </Text>
                <Text
                  style={[
                    styles.nextPrayerName,
                    { color: theme.colors.onPrimary },
                  ]}
                >
                  {nextPrayer.name}
                </Text>
                <Text
                  style={[
                    styles.nextPrayerTime,
                    { color: theme.colors.onPrimary },
                  ]}
                >
                  {nextPrayer.formattedTime}
                </Text>
                {timeUntilNext && (
                  <View style={styles.timeUntilContainer}>
                    <Text
                      style={[
                        styles.timeUntilText,
                        { color: theme.colors.onPrimary },
                      ]}
                    >
                      {t('through')} {timeUntilNext}
                    </Text>
                  </View>
                )}
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Хадис дня */}
        <HadithCard />

        {/* Список всех намазов */}
        <View style={styles.prayerListSection}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.onBackground }]}
          >
            {t('prayerTimesToday')}
          </Text>
          {prayerTimes.map((prayer, index) => (
            <PrayerCard key={index} prayer={prayer} />
          ))}
        </View>

        {/* Кнопки управления */}
        <View style={styles.buttonsSection}>
          <Button
            mode="contained"
            onPress={handleCityPress}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            icon="city"
          >
            {t('selectCity')}
          </Button>

          <Button
            mode="outlined"
            onPress={handleLocationPress}
            style={[styles.button, { borderColor: theme.colors.primary }]}
            contentStyle={styles.buttonContent}
            labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
            icon="crosshairs-gps"
          >
            {t('detectLocation')}
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
  scrollContent: {
    paddingBottom: 20,
  },
  citySection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cityCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cityTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  methodText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  nextPrayerContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  nextPrayerSection: {
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  nextPrayerContent: {
    alignItems: 'center',
  },
  nextPrayerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  nextPrayerName: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  nextPrayerTime: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  timeUntilContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timeUntilText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  prayerListSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  buttonsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  button: {
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
