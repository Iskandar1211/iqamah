import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Card,
  Divider,
  List,
  RadioButton,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CALCULATION_METHODS } from '../utils/prayerTimes';
import {
  getCalculationMethod,
  getNotificationsEnabled,
  getTheme,
  saveCalculationMethod,
  saveNotificationsEnabled,
  saveTheme,
} from '../utils/storage';

interface SettingsScreenProps {
  onSettingsChanged?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onSettingsChanged,
}) => {
  const theme = useTheme();
  const [calculationMethod, setCalculationMethod] =
    useState('MuslimWorldLeague');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'auto'>(
    'auto'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [method, notifications, theme] = await Promise.all([
        getCalculationMethod(),
        getNotificationsEnabled(),
        getTheme(),
      ]);

      setCalculationMethod(method);
      setNotificationsEnabled(notifications);
      setSelectedTheme(theme);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMethodChange = async (method: string) => {
    try {
      await saveCalculationMethod(method);
      setCalculationMethod(method);
      onSettingsChanged?.();
      Alert.alert('Успешно', 'Метод расчета изменен');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить метод расчета');
    }
  };

  const handleNotificationsChange = async (enabled: boolean) => {
    try {
      await saveNotificationsEnabled(enabled);
      setNotificationsEnabled(enabled);
      onSettingsChanged?.();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить настройки уведомлений');
    }
  };

  const handleThemeChange = async (theme: 'light' | 'dark' | 'auto') => {
    try {
      await saveTheme(theme);
      setSelectedTheme(theme);
      onSettingsChanged?.();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить тему');
    }
  };

  const getMethodDisplayName = (method: string): string => {
    const methodNames: { [key: string]: string } = {
      MuslimWorldLeague: 'Ханафийский (Muslim World League)',
      ISNA: 'ISNA (Islamic Society of North America)',
      Egyptian: 'Египетский',
      Makkah: 'Мекканский',
      Karachi: 'Карачинский',
      Tehran: 'Тегеранский',
      Jafari: 'Джафари',
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
        <Text
          style={[styles.loadingText, { color: theme.colors.onBackground }]}
        >
          Загрузка настроек...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Метод расчета */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Метод расчета времени намаза
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Выберите метод расчета, соответствующий вашему мазхабу
            </Text>

            <RadioButton.Group
              onValueChange={handleMethodChange}
              value={calculationMethod}
            >
              {Object.entries(CALCULATION_METHODS).map(([key, value]) => (
                <RadioButton.Item
                  key={key}
                  label={getMethodDisplayName(value)}
                  value={value}
                  color={theme.colors.primary}
                  labelStyle={{ color: theme.colors.onSurface }}
                />
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        {/* Уведомления */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Уведомления
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Получать уведомления за 10 минут до намаза
            </Text>

            <List.Item
              title="Уведомления о намазе"
              description="Уведомления за 10 минут до каждого намаза"
              left={props => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={handleNotificationsChange}
                  color={theme.colors.primary}
                />
              )}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        {/* Тема */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              Внешний вид
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Выберите тему приложения
            </Text>

            <RadioButton.Group
              onValueChange={value =>
                handleThemeChange(value as 'light' | 'dark' | 'auto')
              }
              value={selectedTheme}
            >
              <RadioButton.Item
                label="Автоматически"
                value="auto"
                color={theme.colors.primary}
                labelStyle={{ color: theme.colors.onSurface }}
              />
              <RadioButton.Item
                label="Светлая тема"
                value="light"
                color={theme.colors.primary}
                labelStyle={{ color: theme.colors.onSurface }}
              />
              <RadioButton.Item
                label="Темная тема"
                value="dark"
                color={theme.colors.primary}
                labelStyle={{ color: theme.colors.onSurface }}
              />
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        {/* Информация */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
            >
              О приложении
            </Text>

            <List.Item
              title="Версия"
              description="1.0.0"
              left={props => <List.Icon {...props} icon="information" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />

            <List.Item
              title="Разработчик"
              description="Iqamah Team"
              left={props => <List.Icon {...props} icon="account" />}
              titleStyle={{ color: theme.colors.onSurface }}
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          </Card.Content>
        </Card>
      </ScrollView>
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
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  divider: {
    marginHorizontal: 16,
  },
});