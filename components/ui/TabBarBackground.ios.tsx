import { useColorScheme } from '@/hooks/useColorScheme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

export default function BlurTabBarBackground() {
  const colorScheme = useColorScheme();
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView
        tint={colorScheme === 'dark' ? 'dark' : 'light'}
        intensity={80}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={
          colorScheme === 'dark' 
            ? ['rgba(17, 24, 39, 0.8)', 'rgba(17, 24, 39, 0.95)']
            : ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
        }
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
