import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { formatDate, getHijriDate } from '../utils/prayerTimes';

export const Header: React.FC = () => {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Обновляем каждую секунду

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.primaryContainer]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.dateContainer}>
          <Text style={[styles.gregorianDate, { color: theme.colors.onPrimary }]}>
            {formatDate(currentTime)}
          </Text>
          <Text
            style={[styles.hijriDate, { color: theme.colors.onPrimary }]}
          >
            {getHijriDate(currentTime)}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
  },
  timeContainer: {
    marginBottom: 12,
  },
  currentTime: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  dateContainer: {
    alignItems: 'center',
  },
  gregorianDate: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  hijriDate: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.9,
  },
});
