import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={
          colorScheme === 'dark' 
            ? ['rgba(17, 24, 39, 0.95)', 'rgba(17, 24, 39, 1)']
            : ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 1)']
        }
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  return 0;
}
