import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  MD3LightTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSelectedCity } from '../../utils/storage';

const { width, height } = Dimensions.get('window');

const QiblaScreen: React.FC = () => {
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [qiblaDirection, setQiblaDirection] = useState('Юго-Запад');
  const [qiblaAngle, setQiblaAngle] = useState(225);
  const [rotationAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadCityData();
    animateCompass();
  }, []);

  const animateCompass = () => {
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const loadCityData = async () => {
    try {
      const city = await getSelectedCity();
      setSelectedCity(city);

      if (city) {
        setQiblaDirection('Юго-Запад');
        setQiblaAngle(225);
      }
    } catch (error) {
      console.error('Error loading city data:', error);
    }
  };

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView>
        {/* Gradient Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerGradient}>
            <Text style={styles.headerTitle}>🕋</Text>
            <Text style={styles.headerSubtitle}>Направление Киблы</Text>
            <Text style={styles.headerDescription}>
              Направление к Каабе в Мекке
            </Text>
          </View>
        </View>

        {/* Main Compass Card */}
        <Card style={styles.mainCompassCard}>
          <Card.Content style={styles.compassContent}>
            <View style={styles.compassOuterRing}>
              <Animated.View
                style={[
                  styles.compassInnerRing,
                  { transform: [{ rotate: spin }] },
                ]}
              >
                <View style={styles.compassCenter}>
                  <View
                    style={[
                      styles.compassNeedle,
                      { transform: [{ rotate: `${qiblaAngle}deg` }] },
                    ]}
                  >
                    <Text style={styles.compassArrow}>🕋</Text>
                  </View>
                </View>

                {/* Direction Markers */}
                <Text style={[styles.directionMarker, styles.north]}>С</Text>
                <Text style={[styles.directionMarker, styles.northeast]}>
                  СВ
                </Text>
                <Text style={[styles.directionMarker, styles.east]}>В</Text>
                <Text style={[styles.directionMarker, styles.southeast]}>
                  ЮВ
                </Text>
                <Text style={[styles.directionMarker, styles.south]}>Ю</Text>
                <Text style={[styles.directionMarker, styles.southwest]}>
                  ЮЗ
                </Text>
                <Text style={[styles.directionMarker, styles.west]}>З</Text>
                <Text style={[styles.directionMarker, styles.northwest]}>
                  СЗ
                </Text>
              </Animated.View>
            </View>

            <View style={styles.directionInfo}>
              <Text style={styles.directionText}>{qiblaDirection}</Text>
              <Text style={styles.angleText}>{qiblaAngle}° от севера</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Location Info Card */}
        {selectedCity && (
          <Card style={styles.infoCard}>
            <Card.Content style={styles.infoContent}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoTitle}>Ваше местоположение</Text>
              </View>
              <Text style={styles.cityText}>
                {selectedCity.name}, {selectedCity.country}
              </Text>
              <Text style={styles.coordinatesText}>
                {selectedCity.latitude.toFixed(4)},{' '}
                {selectedCity.longitude.toFixed(4)}
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Instructions Card */}
        <Card style={styles.instructionsCard}>
          <Card.Content>
            <View style={styles.instructionsHeader}>
              <Text style={styles.instructionsIcon}>📋</Text>
              <Text style={styles.instructionsTitle}>
                Как определить направление Киблы
              </Text>
            </View>
            <View style={styles.instructionSteps}>
              <View style={styles.instructionStep}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>Встаньте лицом к северу</Text>
              </View>
              <View style={styles.instructionStep}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>
                  Повернитесь в направлении стрелки
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>
                  Теперь вы смотрите в сторону Каабы
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <Text style={styles.stepNumber}>4</Text>
                <Text style={styles.stepText}>
                  Это направление для совершения намаза
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Note */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            💡 Для более точного определения направления используйте компас или
            GPS
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    backgroundColor: '#1E88E5',
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerGradient: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerDescription: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
  },
  mainCompassCard: {
    margin: 20,
    marginTop: -15,
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    backgroundColor: '#ffffff',
  },
  compassContent: {
    alignItems: 'center',
    padding: 30,
  },
  compassOuterRing: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    borderColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginBottom: 20,
  },
  compassInnerRing: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 6,
    borderColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  compassCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  compassNeedle: {
    position: 'absolute',
    alignItems: 'center',
  },
  compassArrow: {
    fontSize: 32,
  },
  directionMarker: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: '600',
    color: '#1E88E5',
  },
  north: { top: 15 },
  northeast: { top: 45, right: 45 },
  east: { right: 15 },
  southeast: { bottom: 45, right: 45 },
  south: { bottom: 15 },
  southwest: { bottom: 45, left: 45 },
  west: { left: 15 },
  northwest: { top: 45, left: 45 },
  directionInfo: {
    alignItems: 'center',
  },
  directionText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E88E5',
    marginBottom: 4,
  },
  angleText: {
    fontSize: 16,
    color: '#666666',
  },
  infoCard: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContent: {
    padding: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  cityText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1E88E5',
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 14,
    color: '#666666',
  },
  instructionsCard: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionsIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  instructionSteps: {
    gap: 12,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E88E5',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    lineHeight: 20,
  },
  noteContainer: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const QiblaScreenWrapper = () => {
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
};

export default QiblaScreenWrapper;
