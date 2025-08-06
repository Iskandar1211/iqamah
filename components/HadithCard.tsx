import hadithsData from '@/data/hadiths.json';
import { Hadith } from '@/types';
import { useTranslation } from '@/utils/i18n';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Card, useTheme } from 'react-native-paper';

export const HadithCard: React.FC = () => {
  const theme = useTheme();
  const { t, language } = useTranslation();
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Выбираем хадис на основе текущей даты
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const hadithIndex = dayOfYear % hadithsData.hadiths.length;

    setTimeout(() => {
      setHadith(hadithsData.hadiths[hadithIndex]);
      setLoading(false);
    }, 500); // Небольшая задержка для красивого появления
  }, []);

  const getHadithText = (hadith: Hadith): string => {
    switch (language) {
      case 'tg':
        return hadith.textTg || hadith.text;
      case 'en':
        return hadith.textEn || hadith.text;
      default:
        return hadith.text;
    }
  };

  if (loading) {
    return (
      <View style={styles.cardContainer}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text
              style={[
                styles.loadingText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {t('loading')}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  if (!hadith) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={[theme.colors.secondaryContainer, theme.colors.tertiaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.onSecondaryContainer }]}>
              🕌 {t('hadithOfDay')}
            </Text>
          </View>

          <Text style={[styles.hadithText, { color: theme.colors.onSecondaryContainer }]}>
            &ldquo;{getHadithText(hadith)}&rdquo;
          </Text>

          <View style={styles.footer}>
            <Text
              style={[styles.narrator, { color: theme.colors.onSecondaryContainer }]}
            >
              {t('narratedBy')}: {hadith.narrator}
            </Text>
            <View style={[styles.sourceContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <Text style={[styles.source, { color: theme.colors.onSecondaryContainer }]}>
                {hadith.source}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  gradientCard: {
    borderRadius: 20,
    padding: 24,
  },
  card: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  hadithText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  narrator: {
    fontSize: 13,
    fontStyle: 'italic',
    flex: 1,
    marginRight: 12,
  },
  sourceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  source: {
    fontSize: 12,
    fontWeight: '700',
  },
});
