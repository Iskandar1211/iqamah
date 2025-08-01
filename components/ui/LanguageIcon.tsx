import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LanguageIconProps {
  size?: number;
  color?: string;
}

export const LanguageIcon: React.FC<LanguageIconProps> = ({ 
  size = 24, 
  color 
}) => {
  const theme = useTheme();
  const iconColor = color || theme.colors.primary;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text style={[styles.icon, { fontSize: size * 0.8, color: iconColor }]}>
        🌐
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
  },
}); 