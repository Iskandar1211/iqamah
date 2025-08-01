import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { PrayerTime } from '../utils/prayerTimes';

interface PrayerCardProps {
  prayer: PrayerTime;
  onPress?: () => void;
}

const getPrayerIcon = (prayerName: string): string => {
  switch (prayerName) {
    case 'Фаджр':
      return '🌅';
    case 'Восход':
      return '☀️';
    case 'Зухр':
      return '🌞';
    case 'Аср':
      return '🌤️';
    case 'Магриб':
      return '🌅';
    case 'Иша':
      return '🌙';
    default:
      return '🕌';
  }
};

export const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, onPress }) => {
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: prayer.isNext ? theme.colors.primaryContainer : theme.colors.surface,
          borderColor: prayer.isNext ? theme.colors.primary : 'transparent',
        }
      ]}
      onPress={onPress}
    >
      <Card.Content style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.icon}>{getPrayerIcon(prayer.name)}</Text>
          <View style={styles.textContainer}>
            <Text style={[
              styles.prayerName,
              { color: prayer.isNext ? theme.colors.primary : theme.colors.onSurface }
            ]}>
              {prayer.name}
            </Text>
            {prayer.isNext && prayer.timeUntil && (
              <Text style={[styles.timeUntil, { color: theme.colors.primary }]}>
                {prayer.timeUntil}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={[
            styles.time,
            { color: prayer.isNext ? theme.colors.primary : theme.colors.onSurface }
          ]}>
            {prayer.formattedTime}
          </Text>
          {prayer.isNext && (
            <View style={[styles.nextIndicator, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.nextText, { color: theme.colors.onPrimary }]}>
                Следующий
              </Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeUntil: {
    fontSize: 14,
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  time: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  nextIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  nextText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
}); 