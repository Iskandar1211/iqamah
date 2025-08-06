import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Card, useTheme } from 'react-native-paper';
import { useTranslation } from '@/utils/i18n';

interface Hadith {
  text: string;
  narrator: string;
  source: string;
  textTg?: string;
  textEn?: string;
}

const hadiths: Hadith[] = [
  {
    text: 'Поистине, Аллах не смотрит на ваши тела и ваши облики, но смотрит на ваши сердца и ваши дела.',
    textTg: 'Албатта, Аллоҳ ба тана ва сурати шумо намебинад, балки ба дил ва аъмоли шумо мебинад.',
    textEn: 'Indeed, Allah does not look at your bodies and your appearances, but He looks at your hearts and your deeds.',
    narrator: 'Абу Хурайра',
    source: 'Сахих Муслим',
  },
  {
    text: 'Вера мусульманина не будет правильной, пока он не пожелает своему брату того же, чего желает себе.',
    textTg: 'Имони мусулмон дуруст нахоҳад буд, то он барои бародараш он чизеро нахоҳад, ки барои худ мехоҳад.',
    textEn: 'A Muslim\'s faith will not be correct until he wishes for his brother what he wishes for himself.',
    narrator: 'Ан-Нуман ибн Башир',
    source: 'Сахих аль-Бухари',
  },
  {
    text: 'Кто из вас увидит порицаемое, пусть изменит это своей рукой, а если не может, то своим языком, а если не может, то своим сердцем, и это будет самым слабым проявлением веры.',
    textTg: 'Касе аз шумо, ки бадӣ бинад, бо дасташ онро тағйир диҳад, агар натавонад, бо забонаш, агар натавонад, бо дилаш, ва ин заифтарин имонист.',
    textEn: 'Whoever among you sees evil, let him change it with his hand, and if he cannot, then with his tongue, and if he cannot, then with his heart, and that is the weakest of faith.',
    narrator: 'Абу Саид аль-Худри',
    source: 'Сахих Муслим',
  },
  {
    text: 'Поистине, Аллах любит, когда кто-то из вас выполняет какое-либо дело, он выполняет его хорошо.',
    textTg: 'Албатта, Аллоҳ дӯст медорад, ки касе аз шумо корие кунад, онро хуб кунад.',
    textEn: 'Indeed, Allah loves that when one of you does something, he does it well.',
    narrator: 'Аиша',
    source: 'Аль-Байхаки',
  },
  {
    text: 'Мусульманин - это тот, от языка и рук которого не страдают другие мусульмане.',
    textTg: 'Мусулмон касест, ки аз забони ва дасти ӯ дигар мусулмонон озор намебинанд.',
    textEn: 'A Muslim is one from whose tongue and hands other Muslims are safe.',
    narrator: 'Абдуллах ибн Амр',
    source: 'Сахих аль-Бухари',
  },
  {
    text: 'Поистине, Аллах прощает грехи моей общине за ошибки, забывчивость и то, к чему их принудили.',
    textTg: 'Албатта, Аллоҳ гуноҳони уммати манро барои хато, фаромӯшӣ ва он чизе, ки маҷбур шудаанд, меомӯзад.',
    textEn: 'Indeed, Allah forgives the sins of my community for mistakes, forgetfulness, and what they were forced to do.',
    narrator: 'Ибн Аббас',
    source: 'Ибн Маджа',
  },
  {
    text: 'Кто построит мечеть ради Аллаха, тому Аллах построит дом в Раю.',
    textTg: 'Касе, ки масҷид барои Аллоҳ бино кунад, Аллоҳ барои ӯ хона дар биҳишт бино мекунад.',
    textEn: 'Whoever builds a mosque for Allah, Allah will build a house for him in Paradise.',
    narrator: 'Усман ибн Аффан',
    source: 'Сахих аль-Бухари',
  },
  {
    text: 'Поистине, Аллах не принимает молитву без омовения.',
    textTg: 'Албатта, Аллоҳ намозро бе таҳорат қабул намекунад.',
    textEn: 'Indeed, Allah does not accept prayer without ablution.',
    narrator: 'Абу Хурайра',
    source: 'Сахих Муслим',
  },
  {
    text: 'Лучший из вас тот, кто изучает Коран и обучает ему других.',
    textTg: 'Беҳтарин аз шумо касест, ки Қуръонро меомӯзад ва ба дигарон меомӯзонад.',
    textEn: 'The best among you is the one who learns the Quran and teaches it to others.',
    narrator: 'Усман ибн Аффан',
    source: 'Сахих аль-Бухари',
  },
  {
    text: 'Поистине, Аллах любит тех, кто часто кается, и любит тех, кто очищается.',
    textTg: 'Албатта, Аллоҳ онҳоро дӯст медорад, ки зиёд тавба мекунанд ва онҳоро дӯст медорад, ки таҳорат мекунанд.',
    textEn: 'Indeed, Allah loves those who repent frequently, and He loves those who purify themselves.',
    narrator: 'Абу Хурайра',
    source: 'Ат-Тирмизи',
  },
];

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
    const hadithIndex = dayOfYear % hadiths.length;

    setTimeout(() => {
      setHadith(hadiths[hadithIndex]);
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
