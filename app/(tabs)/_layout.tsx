import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { AnimatedTabIcon } from '@/components/AnimatedTabIcon';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/utils/i18n';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 88,
            paddingBottom: 20,
            paddingTop: 8,
            borderTopWidth: 0,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
            alignItems: 'center',
          },
          android: {
            height: 70,
            paddingBottom: 8,
            borderWidth: 1,
            paddingTop: 8,
            borderTopWidth: 0,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            // alignItems: 'center',
          },
          default: {
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopWidth: 0,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            // alignItems: 'center',
          },
        }),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
          textTransform: 'none',
          textAlign: 'center',
          alignSelf:'center',
        },
        tabBarIconStyle: {
          marginBottom: 2,
          flexDirection:'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf:'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon 
              name="namaz.fill" 
              color={color} 
              focused={focused}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="qibla"
        options={{
          title: t('qibla'),
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon 
              name="location.north.fill" 
              color={color} 
              focused={focused}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings'),
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon 
              name="gearshape.fill" 
              color={color} 
              focused={focused}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
