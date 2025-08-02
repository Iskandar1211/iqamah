import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { ThemeProvider, useThemeContext } from '@/contexts/ThemeContext';

// Светлая тема
const lightPaperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1E88E5',
    primaryContainer: '#E3F2FD',
    secondary: '#FF6B35',
    secondaryContainer: '#FFF3E0',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#FAFAFA',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    onBackground: '#1C1B1F',
  },
};

// Темная тема
const darkPaperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#90CAF9',
    primaryContainer: '#1976D2',
    secondary: '#FFB74D',
    secondaryContainer: '#F57C00',
    surface: '#1C1B1F',
    surfaceVariant: '#2D2D2D',
    background: '#121212',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',
    onBackground: '#E6E1E5',
  },
};

function AppContent() {
  const { activeTheme } = useThemeContext();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const paperTheme = activeTheme === 'dark' ? darkPaperTheme : lightPaperTheme;
  const navigationTheme = activeTheme === 'dark' ? DarkTheme : DefaultTheme;

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
