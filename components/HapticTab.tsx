import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Animated, Pressable } from 'react-native';
import { useRef, useEffect } from 'react';

export function HapticTab(props: BottomTabBarButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <PlatformPressable
        {...props}
        onPressIn={(ev) => {
          handlePressIn();
          props.onPressIn?.(ev);
        }}
        onPressOut={(ev) => {
          handlePressOut();
          props.onPressOut?.(ev);
        }}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.8 : 1,
          },
          props.style,
        ]}
      />
    </Animated.View>
  );
}
