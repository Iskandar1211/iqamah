import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../../utils/i18n';
import { getSelectedCity } from '../../utils/storage';

const QiblaScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [qiblaDirection, setQiblaDirection] = useState(t('southwest'));
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
        setQiblaDirection(t('southwest'));
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
        <View style={[styles.headerContainer, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.headerGradient}>
            <Text style={styles.headerTitle}>🕋</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.onPrimary }]}>
              {t('qiblaDirection')}
            </Text>
            <Text style={[styles.headerDescription, { color: theme.colors.onPrimary }]}>
              {t('qiblaDescription')}
            </Text>
          </View>
        </View>

        {/* Main Compass Card */}
        <Card style={[styles.mainCompassCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.compassContent}>
            <View style={[styles.compassOuterRing, { borderColor: theme.colors.primaryContainer }]}>
              <Animated.View
                style={[
                  styles.compassInnerRing,
                  { 
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.surface
                  },
                ]}
              >
                <View style={[styles.compassCenter, { backgroundColor: theme.colors.primary }]}>
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
                <Text style={[styles.directionMarker, styles.north, { color: theme.colors.primary }]}>
                  {t('north')}
                </Text>
                <Text style={[styles.directionMarker, styles.northeast, { color: theme.colors.primary }]}>
                  {t('northeast')}
                </Text>
                <Text style={[styles.directionMarker, styles.east, { color: theme.colors.primary }]}>
                  {t('east')}
                </Text>
                <Text style={[styles.directionMarker, styles.southeast, { color: theme.colors.primary }]}>
                  {t('southeast')}
                </Text>
                <Text style={[styles.directionMarker, styles.south, { color: theme.colors.primary }]}>
                  {t('south')}
                </Text>
                <Text style={[styles.directionMarker, styles.southwest, { color: theme.colors.primary }]}>
                  {t('southwest')}
                </Text>
                <Text style={[styles.directionMarker, styles.west, { color: theme.colors.primary }]}>
                  {t('west')}
                </Text>
                <Text style={[styles.directionMarker, styles.northwest, { color: theme.colors.primary }]}>
                  {t('northwest')}
                </Text>
              </Animated.View>
            </View>

            <View style={styles.directionInfo}>
              <Text style={[styles.directionText, { color: theme.colors.primary }]}>
                {qiblaDirection}
              </Text>
              <Text style={[styles.angleText, { color: theme.colors.onSurfaceVariant }]}>
                {qiblaAngle}° {t('fromNorth')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Location Info Card */}
        {selectedCity && (
          <Card style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.infoContent}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={[styles.infoTitle, { color: theme.colors.onSurface }]}>
                  {t('yourLocation')}
                </Text>
              </View>
              <Text style={[styles.cityText, { color: theme.colors.primary }]}>
                {selectedCity.name}, {selectedCity.country}
              </Text>
              <Text style={[styles.coordinatesText, { color: theme.colors.onSurfaceVariant }]}>
                {selectedCity.latitude.toFixed(4)}, {selectedCity.longitude.toFixed(4)}
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Instructions Card */}
        <Card style={[styles.instructionsCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.instructionsHeader}>
              <Text style={styles.instructionsIcon}>📋</Text>
              <Text style={[styles.instructionsTitle, { color: theme.colors.onSurface }]}>
                {t('howToDetermineQibla')}
              </Text>
            </View>
            <View style={styles.instructionSteps}>
              <View style={styles.instructionStep}>
                <Text style={[styles.stepNumber, { backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }]}>
                  1
                </Text>
                <Text style={[styles.stepText, { color: theme.colors.onSurfaceVariant }]}>
                  {t('step1Qibla')}
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <Text style={[styles.stepNumber, { backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }]}>
                  2
                </Text>
                <Text style={[styles.stepText, { color: theme.colors.onSurfaceVariant }]}>
                  {t('step2Qibla')}
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <Text style={[styles.stepNumber, { backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }]}>
                  3
                </Text>
                <Text style={[styles.stepText, { color: theme.colors.onSurfaceVariant }]}>
                  {t('step3Qibla')}
                </Text>
              </View>
              <View style={styles.instructionStep}>
                <Text style={[styles.stepNumber, { backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }]}>
                  4
                </Text>
                <Text style={[styles.stepText, { color: theme.colors.onSurfaceVariant }]}>
                  {t('step4Qibla')}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Note */}
        <View style={[styles.noteContainer, { backgroundColor: theme.colors.secondaryContainer }]}>
          <Text style={[styles.noteText, { color: theme.colors.onSecondaryContainer }]}>
            💡 {t('qiblaNote')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
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
    marginBottom: 4,
  },
  headerDescription: {
    fontSize: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  compassInnerRing: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  compassCenter: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    marginBottom: 4,
  },
  angleText: {
    fontSize: 16,
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
  },
  cityText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  noteContainer: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default QiblaScreen;
