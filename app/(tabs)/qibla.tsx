import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Card, MD3LightTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { getSelectedCity } from '../../utils/storage';

const { width, height } = Dimensions.get('window');

const QiblaScreen: React.FC = () => {
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [qiblaDirection, setQiblaDirection] = useState('Юго-Запад');
  const [qiblaAngle, setQiblaAngle] = useState(225); // Угол в градусах

  useEffect(() => {
    loadCityData();
  }, []);

  const loadCityData = async () => {
    try {
      const city = await getSelectedCity();
      setSelectedCity(city);
      
      // Простой расчет направления Киблы для Таджикистана
      // В реальном приложении здесь будет точный расчет
      if (city) {
        // Примерный расчет для Таджикистана
        setQiblaDirection('Юго-Запад');
        setQiblaAngle(225);
      }
    } catch (error) {
      console.error('Error loading city data:', error);
    }
  };

  const calculateQiblaDirection = (lat: number, lng: number) => {
    // Координаты Каабы в Мекке
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    // Расчет направления Киблы
    const deltaLng = kaabaLng - lng;
    const y = Math.sin(deltaLng) * Math.cos(kaabaLat);
    const x = Math.cos(lat) * Math.sin(kaabaLat) - Math.sin(lat) * Math.cos(kaabaLat) * Math.cos(deltaLng);
    const qiblaAngle = Math.atan2(y, x) * 180 / Math.PI;
    
    return (qiblaAngle + 360) % 360;
  };

  const getDirectionName = (angle: number): string => {
    const directions = [
      'Север', 'Северо-Восток', 'Восток', 'Юго-Восток',
      'Юг', 'Юго-Запад', 'Запад', 'Северо-Запад'
    ];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          🕋 Направление Киблы
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Направление к Каабе в Мекке
        </Text>
      </View>

      {/* Компас */}
      <Card style={[styles.compassCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.compassContent}>
          <View style={styles.compassContainer}>
            <View style={[styles.compass, { borderColor: theme.colors.primary }]}>
              <View style={[styles.compassNeedle, { transform: [{ rotate: `${qiblaAngle}deg` }] }]}>
                <Text style={[styles.compassArrow, { color: theme.colors.primary }]}>
                  🕋
                </Text>
              </View>
              
              {/* Маркеры направлений */}
              <Text style={[styles.directionMarker, styles.north, { color: theme.colors.onSurfaceVariant }]}>
                С
              </Text>
              <Text style={[styles.directionMarker, styles.east, { color: theme.colors.onSurfaceVariant }]}>
                В
              </Text>
              <Text style={[styles.directionMarker, styles.south, { color: theme.colors.onSurfaceVariant }]}>
                Ю
              </Text>
              <Text style={[styles.directionMarker, styles.west, { color: theme.colors.onSurfaceVariant }]}>
                З
              </Text>
            </View>
          </View>
          
          <Text style={[styles.directionText, { color: theme.colors.onSurface }]}>
            {qiblaDirection}
          </Text>
          <Text style={[styles.angleText, { color: theme.colors.onSurfaceVariant }]}>
            {qiblaAngle}° от севера
          </Text>
        </Card.Content>
      </Card>

      {/* Информация о городе */}
      {selectedCity && (
        <Card style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.infoTitle, { color: theme.colors.onSurface }]}>
              Ваше местоположение
            </Text>
            <Text style={[styles.cityText, { color: theme.colors.onSurface }]}>
              {selectedCity.name}, {selectedCity.country}
            </Text>
            <Text style={[styles.coordinatesText, { color: theme.colors.onSurfaceVariant }]}>
              Координаты: {selectedCity.latitude.toFixed(4)}, {selectedCity.longitude.toFixed(4)}
            </Text>
          </Card.Content>
        </Card>
      )}

      {/* Инструкции */}
      <Card style={[styles.instructionsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.instructionsTitle, { color: theme.colors.onSurface }]}>
            Как определить направление Киблы
          </Text>
          <Text style={[styles.instructionText, { color: theme.colors.onSurfaceVariant }]}>
            1. Встаньте лицом к северу{'\n'}
            2. Повернитесь в направлении стрелки{'\n'}
            3. Теперь вы смотрите в сторону Каабы{'\n'}
            4. Это направление для совершения намаза
          </Text>
        </Card.Content>
      </Card>

      {/* Примечание */}
      <View style={styles.noteContainer}>
        <Text style={[styles.noteText, { color: theme.colors.onSurfaceVariant }]}>
          💡 Для более точного определения направления используйте компас или GPS
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  compassCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
  },
  compassContent: {
    alignItems: 'center',
    padding: 24,
  },
  compassContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  compass: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  compassNeedle: {
    position: 'absolute',
    alignItems: 'center',
  },
  compassArrow: {
    fontSize: 40,
  },
  directionMarker: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '600',
  },
  north: {
    top: 10,
  },
  east: {
    right: 10,
  },
  south: {
    bottom: 10,
  },
  west: {
    left: 10,
  },
  directionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  angleText: {
    fontSize: 14,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cityText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 14,
  },
  instructionsCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  noteContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  noteText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default function QiblaScreenWrapper() {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#1E88E5',
      primaryContainer: '#E3F2FD',
      secondary: '#FF6B35',
      secondaryContainer: '#FFF3E0',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <QiblaScreen />
    </PaperProvider>
  );
} 