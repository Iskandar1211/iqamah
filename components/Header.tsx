import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.timeContainer}>
        <Text style={[styles.currentTime, { color: theme.colors.onSurface }]}>
          {formatTime(currentTime)}
        </Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={[styles.gregorianDate, { color: theme.colors.onSurface }]}>
          {formatDate(currentTime)}
        </Text>
        <Text
          style={[styles.hijriDate, { color: theme.colors.onSurfaceVariant }]}
        >
          {getHijriDate(currentTime)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  timeContainer: {
    marginBottom: 8,
  },
  currentTime: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  dateContainer: {
    alignItems: 'center',
  },
  gregorianDate: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  hijriDate: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
});
