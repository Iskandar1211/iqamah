import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { AnimatedTabIcon } from '@/components/AnimatedTabIcon';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
          },
          android: {
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          default: {
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopWidth: 0,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Намаз',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon 
              name="clock.fill" 
              color={color} 
              focused={focused}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="qibla"
        options={{
          title: 'Кибла',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon 
              name="location.north.fill" 
              color={color} 
              focused={focused}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon 
              name="gearshape.fill" 
              color={color} 
              focused={focused}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
