import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Animated } from 'react-native';

interface AnimatedTabIconProps {
  name: string;
  color: string;
  focused: boolean;
  size?: number;
}

export function AnimatedTabIcon({ name, color, focused, size = 28 }: AnimatedTabIconProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(0.7)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused, scaleAnim, opacityAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <IconSymbol
        name={name as any}
        size={focused ? size + 4 : size}
        color={color}
      />
    </Animated.View>
  );
} 