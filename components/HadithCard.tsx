import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme, ActivityIndicator } from 'react-native-paper';

interface Hadith {
  text: string;
  narrator: string;
  source: string;
}

const hadiths: Hadith[] = [
  {
    text: "Поистине, Аллах не смотрит на ваши тела и ваши облики, но смотрит на ваши сердца и ваши дела.",
    narrator: "Абу Хурайра",
    source: "Сахих Муслим"
  },
  {
    text: "Вера мусульманина не будет правильной, пока он не пожелает своему брату того же, чего желает себе.",
    narrator: "Ан-Нуман ибн Башир",
    source: "Сахих аль-Бухари"
  },
  {
    text: "Кто из вас увидит порицаемое, пусть изменит это своей рукой, а если не может, то своим языком, а если не может, то своим сердцем, и это будет самым слабым проявлением веры.",
    narrator: "Абу Саид аль-Худри",
    source: "Сахих Муслим"
  },
  {
    text: "Поистине, Аллах любит, когда кто-то из вас выполняет какое-либо дело, он выполняет его хорошо.",
    narrator: "Аиша",
    source: "Аль-Байхаки"
  },
  {
    text: "Мусульманин - это тот, от языка и рук которого не страдают другие мусульмане.",
    narrator: "Абдуллах ибн Амр",
    source: "Сахих аль-Бухари"
  },
  {
    text: "Поистине, Аллах прощает грехи моей общине за ошибки, забывчивость и то, к чему их принудили.",
    narrator: "Ибн Аббас",
    source: "Ибн Маджа"
  },
  {
    text: "Кто построит мечеть ради Аллаха, тому Аллах построит дом в Раю.",
    narrator: "Усман ибн Аффан",
    source: "Сахих аль-Бухари"
  },
  {
    text: "Поистине, Аллах не принимает молитву без омовения.",
    narrator: "Абу Хурайра",
    source: "Сахих Муслим"
  },
  {
    text: "Лучший из вас тот, кто изучает Коран и обучает ему других.",
    narrator: "Усман ибн Аффан",
    source: "Сахих аль-Бухари"
  },
  {
    text: "Поистине, Аллах любит тех, кто часто кается, и любит тех, кто очищается.",
    narrator: "Абу Хурайра",
    source: "Ат-Тирмизи"
  }
];

export const HadithCard: React.FC = () => {
  const theme = useTheme();
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Выбираем хадис на основе текущей даты
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const hadithIndex = dayOfYear % hadiths.length;
    
    setTimeout(() => {
      setHadith(hadiths[hadithIndex]);
      setLoading(false);
    }, 500); // Небольшая задержка для красивого появления
  }, []);

  if (loading) {
    return (
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurfaceVariant }]}>
            Загрузка хадиса...
          </Text>
        </Card.Content>
      </Card>
    );
  }

  if (!hadith) {
    return null;
  }

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            🕌 Хадис дня
          </Text>
        </View>
        
        <Text style={[styles.hadithText, { color: theme.colors.onSurface }]}>
          "{hadith.text}"
        </Text>
        
        <View style={styles.footer}>
          <Text style={[styles.narrator, { color: theme.colors.onSurfaceVariant }]}>
            Передал: {hadith.narrator}
          </Text>
          <Text style={[styles.source, { color: theme.colors.primary }]}>
            {hadith.source}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  hadithText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  narrator: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 