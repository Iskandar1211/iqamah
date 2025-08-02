import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme, saveTheme } from '../utils/storage';

export type ThemeType = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  selectedTheme: ThemeType;
  activeTheme: 'light' | 'dark';
  changeTheme: (theme: ThemeType) => Promise<boolean>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('auto');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const theme = await getTheme();
      setSelectedTheme(theme);
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeTheme = async (theme: ThemeType): Promise<boolean> => {
    try {
      await saveTheme(theme);
      setSelectedTheme(theme);
      return true;
    } catch (error) {
      console.error('Error saving theme:', error);
      return false;
    }
  };

  // Определяем активную тему
  const getActiveTheme = (): 'light' | 'dark' => {
    if (selectedTheme === 'auto') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return selectedTheme;
  };

  const activeTheme = getActiveTheme();

  const value: ThemeContextType = {
    selectedTheme,
    activeTheme,
    changeTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 