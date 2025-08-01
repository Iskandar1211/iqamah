import React from 'react';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { SettingsScreen } from '../../screens/SettingsScreen';

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

export default function SettingsScreenWrapper() {
  return (
    <PaperProvider theme={theme}>
      <SettingsScreen 
        onClose={() => {}} 
        onSettingsChanged={() => {}} 
      />
    </PaperProvider>
  );
} 