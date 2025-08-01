import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
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

  if (prayer.isNext) {
    return (
      <View style={styles.nextCardContainer}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.nextCard}
        >
          <View style={styles.content}>
            <View style={styles.leftSection}>
              <Text style={styles.icon}>{getPrayerIcon(prayer.name)}</Text>
              <View style={styles.textContainer}>
                <Text style={[styles.prayerName, { color: theme.colors.onPrimary }]}>
                  {prayer.name}
                </Text>
                {prayer.timeUntil && (
                  <Text style={[styles.timeUntil, { color: theme.colors.onPrimary }]}>
                    {prayer.timeUntil}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.rightSection}>
              <Text style={[styles.time, { color: theme.colors.onPrimary }]}>
                {prayer.formattedTime}
              </Text>
              <View style={[styles.nextIndicator, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                <Text style={[styles.nextText, { color: theme.colors.onPrimary }]}>
                  Следующий
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
      onPress={onPress}
    >
      <Card.Content style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.icon}>{getPrayerIcon(prayer.name)}</Text>
          <View style={styles.textContainer}>
            <Text style={[styles.prayerName, { color: theme.colors.onSurface }]}>
              {prayer.name}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.time, { color: theme.colors.onSurface }]}>
            {prayer.formattedTime}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  nextCardContainer: {
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  nextCard: {
    borderRadius: 16,
    padding: 20,
  },
  card: {
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 28,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  timeUntil: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  time: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  nextIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  nextText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
