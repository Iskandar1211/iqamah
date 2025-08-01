import React, { useEffect, useState, useRef } from 'react';
import { Alert, Animated, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Card,
  List,
  RadioButton,
  Switch,
  Text,
  useTheme
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../utils/i18n';
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
  const { t, language, setLanguage, availableLanguages } = useTranslation();
  const [calculationMethod, setCalculationMethod] =
    useState('MuslimWorldLeague');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'auto'>(
    'auto'
  );
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

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
      Alert.alert(t('success'), t('methodChanged'));
    } catch (error) {
      Alert.alert(t('error'), t('methodChangeError'));
    }
  };

  const handleNotificationsChange = async (enabled: boolean) => {
    try {
      await saveNotificationsEnabled(enabled);
      setNotificationsEnabled(enabled);
      onSettingsChanged?.();
    } catch (error) {
      Alert.alert(t('error'), t('notificationsSaveError'));
    }
  };

  const handleThemeChange = async (theme: 'light' | 'dark' | 'auto') => {
    try {
      await saveTheme(theme);
      setSelectedTheme(theme);
      onSettingsChanged?.();
    } catch (error) {
      Alert.alert(t('error'), t('themeSaveError'));
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await setLanguage(newLanguage as any);
      onSettingsChanged?.();
    } catch (error) {
      Alert.alert(t('error'), 'Не удалось изменить язык');
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
          {t('loading')}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Заголовок */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
              {t('settingsTitle')}
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              {t('settingsSubtitle')}
            </Text>
          </View>

          {/* Язык */}
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                  <Text style={[styles.sectionIcon, { color: theme.colors.onPrimaryContainer }]}>
                    🌐
                  </Text>
                </View>
                <View style={styles.sectionTextContainer}>
                  <Text
                    style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
                  >
                    {t('language')}
                  </Text>
                  <Text
                    style={[
                      styles.sectionDescription,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {t('languageDescription')}
                  </Text>
                </View>
              </View>

              <RadioButton.Group
                onValueChange={handleLanguageChange}
                value={language}
              >
                {availableLanguages.map((lang) => (
                  <View key={lang.code} style={styles.radioItem}>
                    <RadioButton.Item
                      label={`${lang.nativeName} (${lang.name})`}
                      value={lang.code}
                      color={theme.colors.primary}
                      labelStyle={[styles.radioLabel, { color: theme.colors.onSurface }]}
                      style={styles.radioButton}
                    />
                  </View>
                ))}
              </RadioButton.Group>
            </Card.Content>
          </Card>

          {/* Метод расчета */}
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                  <Text style={[styles.sectionIcon, { color: theme.colors.onPrimaryContainer }]}>
                    🕌
                  </Text>
                </View>
                <View style={styles.sectionTextContainer}>
                  <Text
                    style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
                  >
                    {t('calculationMethod')}
                  </Text>
                  <Text
                    style={[
                      styles.sectionDescription,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    Выберите метод расчета, соответствующий вашему мазхабу
                  </Text>
                </View>
              </View>

              <RadioButton.Group
                onValueChange={handleMethodChange}
                value={calculationMethod}
              >
                {Object.entries(CALCULATION_METHODS).map(([key, value]) => (
                  <View key={key} style={styles.radioItem}>
                    <RadioButton.Item
                      label={getMethodDisplayName(value)}
                      value={value}
                      color={theme.colors.primary}
                      labelStyle={[styles.radioLabel, { color: theme.colors.onSurface }]}
                      style={styles.radioButton}
                    />
                  </View>
                ))}
              </RadioButton.Group>
            </Card.Content>
          </Card>

          {/* Уведомления */}
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                  <Text style={[styles.sectionIcon, { color: theme.colors.onPrimaryContainer }]}>
                    🔔
                  </Text>
                </View>
                <View style={styles.sectionTextContainer}>
                  <Text
                    style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
                  >
                    {t('notifications')}
                  </Text>
                  <Text
                    style={[
                      styles.sectionDescription,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {t('notificationsDescription')}
                  </Text>
                </View>
              </View>

              <List.Item
                title={t('prayerNotifications')}
                description={t('prayerNotificationsDescription')}
                left={props => (
                  <List.Icon
                    {...props}
                    icon="bell"
                    color={theme.colors.primary}
                    style={styles.listIcon}
                  />
                )}
                right={() => (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsChange}
                    color={theme.colors.primary}
                    style={styles.switch}
                  />
                )}
                titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
                descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurfaceVariant }]}
                style={styles.listItem}
              />
            </Card.Content>
          </Card>

          {/* Тема */}
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                  <Text style={[styles.sectionIcon, { color: theme.colors.onPrimaryContainer }]}>
                    🎨
                  </Text>
                </View>
                <View style={styles.sectionTextContainer}>
                  <Text
                    style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
                  >
                    {t('appearance')}
                  </Text>
                  <Text
                    style={[
                      styles.sectionDescription,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {t('appearanceDescription')}
                  </Text>
                </View>
              </View>

              <RadioButton.Group
                onValueChange={value =>
                  handleThemeChange(value as 'light' | 'dark' | 'auto')
                }
                value={selectedTheme}
              >
                <View style={styles.radioItem}>
                  <RadioButton.Item
                    label={t('autoTheme')}
                    value="auto"
                    color={theme.colors.primary}
                    labelStyle={[styles.radioLabel, { color: theme.colors.onSurface }]}
                    style={styles.radioButton}
                  />
                </View>
                <View style={styles.radioItem}>
                  <RadioButton.Item
                    label={t('lightTheme')}
                    value="light"
                    color={theme.colors.primary}
                    labelStyle={[styles.radioLabel, { color: theme.colors.onSurface }]}
                    style={styles.radioButton}
                  />
                </View>
                <View style={styles.radioItem}>
                  <RadioButton.Item
                    label={t('darkTheme')}
                    value="dark"
                    color={theme.colors.primary}
                    labelStyle={[styles.radioLabel, { color: theme.colors.onSurface }]}
                    style={styles.radioButton}
                  />
                </View>
              </RadioButton.Group>
            </Card.Content>
          </Card>

          {/* Информация */}
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                  <Text style={[styles.sectionIcon, { color: theme.colors.onPrimaryContainer }]}>
                    ℹ️
                  </Text>
                </View>
                <View style={styles.sectionTextContainer}>
                  <Text
                    style={[styles.sectionTitle, { color: theme.colors.onSurface }]}
                  >
                    {t('about')}
                  </Text>
                </View>
              </View>

              <List.Item
                title={t('version')}
                description="1.0.0"
                left={props => (
                  <List.Icon
                    {...props}
                    icon="information"
                    color={theme.colors.primary}
                    style={styles.listIcon}
                  />
                )}
                titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
                descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurfaceVariant }]}
                style={styles.listItem}
              />

              <List.Item
                title={t('developer')}
                description={t('developerName')}
                left={props => (
                  <List.Icon
                    {...props}
                    icon="account"
                    color={theme.colors.primary}
                    style={styles.listIcon}
                  />
                )}
                titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
                descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurfaceVariant }]}
                style={styles.listItem}
              />
            </Card.Content>
          </Card>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </Animated.View>
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
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  cardContent: {
    paddingVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionIcon: {
    fontSize: 24,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  radioItem: {
    marginVertical: 4,
  },
  radioButton: {
    paddingVertical: 8,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  listItem: {
    paddingVertical: 8,
  },
  listIcon: {
    marginRight: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  listItemDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  switch: {
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});
