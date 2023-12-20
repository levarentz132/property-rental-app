import {
  IPressableProps,
  Pressable as NBPressable,
  Text as NBText,
  useTheme,
} from "native-base";
import React, { memo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Category } from "../screens/app";

const Pressable = Animated.createAnimatedComponent(NBPressable);
const Text = Animated.createAnimatedComponent(NBText);
interface GroupProps extends IPressableProps {
  category: Category;
  active?: boolean;
  color: string;
  onSelect: (category: Category) => void;
}

export const Group: React.FC<GroupProps> = memo(
  ({ category, color, active = false, ...props }: GroupProps) => {
    const { colors } = useTheme();
    const pressableBgColor = useSharedValue(active ? color : "transparent");
    const textColor = useSharedValue(active ? colors.primary.bg.white : color);
    const animatedStyle = useAnimatedStyle(() => ({
      backgroundColor: pressableBgColor.value,
    }));
    const animatedTextStyle = useAnimatedStyle(() => ({
      color: textColor.value,
    }));
    useEffect(() => {
      pressableBgColor.value = withTiming(active ? color : "transparent");
      textColor.value = withTiming(active ? colors.primary.bg.white : color);
    }, [active]);
    return (
      <Pressable
        h={10}
        style={animatedStyle}
        rounded="md"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        onPress={() => props.onSelect(category)}
        isPressed={active}
        {...props}
      >
        <Text
          style={animatedTextStyle}
          textTransform="capitalize"
          fontSize="lg"
          fontWeight="bold"
        >
          {category}
        </Text>
      </Pressable>
    );
  },
);
