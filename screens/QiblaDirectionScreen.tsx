import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme, Button } from 'react-native-paper';

export const QiblaDirectionScreen: React.FC = () => {
  const theme = useTheme();

  const handleQiblaPress = () => {
    // В будущем здесь будет интеграция с компасом
    // Пока показываем информацию о направлении
  };

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            🕋 Направление Киблы
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.compassContainer}>
            <View
              style={[styles.compass, { borderColor: theme.colors.primary }]}
            >
              <Text
                style={[styles.compassText, { color: theme.colors.primary }]}
              >
                🕋
              </Text>
            </View>
            <Text
              style={[styles.directionText, { color: theme.colors.onSurface }]}
            >
              Юго-Запад
            </Text>
          </View>

          <Text
            style={[
              styles.description,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            Направление к Каабе в Мекке
          </Text>
        </View>

        <Button
          mode="outlined"
          onPress={handleQiblaPress}
          style={styles.button}
          icon="compass"
        >
          Открыть компас
        </Button>
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
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    marginBottom: 16,
  },
  compassContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  compass: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  compassText: {
    fontSize: 32,
  },
  directionText: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
});
