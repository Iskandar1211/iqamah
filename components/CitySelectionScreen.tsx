import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Button, List, Searchbar, Text, useTheme } from 'react-native-paper';
import citiesData from '../data/cities.json';
import { useTranslation } from '../utils/i18n';
import { City } from '../utils/prayerTimes';
import { saveSelectedCity } from '../utils/storage';

interface CitySelectionScreenProps {
  onCitySelected: (city: City) => void;
  onClose: () => void;
}

export const CitySelectionScreen: React.FC<CitySelectionScreenProps> = ({
  onCitySelected,
  onClose,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>(citiesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredCities(citiesData);
    } else {
      const filtered = citiesData.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  };

  const handleCityPress = async (city: City) => {
    try {
      await saveSelectedCity(city);
      onCitySelected(city);
      onClose();
    } catch (error) {
      Alert.alert(t('error'), 'Не удалось сохранить выбранный город');
    }
  };

  const renderCityItem = ({ item }: { item: City }) => (
    <List.Item
      title={item.name}
      description={item.country}
      left={props => <List.Icon {...props} icon="city" />}
      right={props => <List.Icon {...props} icon="chevron-right" />}
      onPress={() => handleCityPress(item)}
      style={[styles.cityItem, { backgroundColor: theme.colors.surface }]}
      titleStyle={{ color: theme.colors.onSurface }}
      descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
    />
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          {t('selectCity')}
        </Text>
        <Button mode="text" onPress={onClose} icon="close">
          {t('close')}
        </Button>
      </View>

      <Searchbar
        placeholder="Поиск города..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchbar}
        iconColor={theme.colors.onSurfaceVariant}
      />

      <FlatList
        data={filteredCities}
        renderItem={renderCityItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={[
              styles.separator,
              { backgroundColor: theme.colors.outline },
            ]}
          />
        )}
      />

      <View style={styles.footer}>
        <Text
          style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}
        >
          Всего городов: {filteredCities.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  list: {
    flex: 1,
  },
  cityItem: {
    marginHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
});
