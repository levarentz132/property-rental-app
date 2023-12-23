import {
  Pressable as NBPressable,
  Text as NBText,
  useToken,
} from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import React, { memo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { Category } from "../screens/app";

const Pressable = Animated.createAnimatedComponent(NBPressable);
const Text = Animated.createAnimatedComponent(NBText);
interface GroupProps extends ComponentProps<typeof NBPressable> {
  category: Category;
  active?: boolean;
  color: string;
  onSelect: (category: Category) => void;
}

export const Group: React.FC<GroupProps> = memo(
  ({ category, color, active = false, ...props }: GroupProps) => {
    const white = useToken("colors", "white");
    const pressableBgColor = useSharedValue(active ? color : "transparent");
    const textColor = useSharedValue(active ? white : color);
    const animatedStyle = useAnimatedStyle(() => ({
      backgroundColor: pressableBgColor.value,
    }));
    const animatedTextStyle = useAnimatedStyle(() => ({
      color: textColor.value,
    }));
    useEffect(() => {
      pressableBgColor.value = withTiming(active ? color : "transparent");
      textColor.value = withTiming(active ? white : color);
    }, [active]);
    return (
      <Pressable
        height="$10"
        style={animatedStyle}
        rounded="$md"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        onPress={() => props.onSelect(category)}
        {...props}
      >
        <Text
          style={animatedTextStyle}
          textTransform="capitalize"
          fontSize="$lg"
          fontWeight="bold"
        >
          {category}
        </Text>
      </Pressable>
    );
  },
);
