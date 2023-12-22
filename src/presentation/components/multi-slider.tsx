import RNMultiSlider, {
  MultiSliderProps as RNMultiSliderProps,
} from "@ptomasroos/react-native-multi-slider";
import { Box, useTheme } from "native-base";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CustomMarker } from "src/presentation/components";

// const AnimatedMultiSlider = Animated.createAnimatedComponent(RNMultiSlider);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING = 6;

interface MultiSliderProps extends RNMultiSliderProps {}

export const MultiSlider: React.FC<MultiSliderProps> = ({
  ...props
}: MultiSliderProps): JSX.Element => {
  const { colors, space } = useTheme();
  const marginTop = useSharedValue(0);
  const sliderStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTop.value,
    };
  });
  return (
    <AnimatedBox style={[sliderStyle]}>
      <RNMultiSlider
        sliderLength={SCREEN_WIDTH - space[PADDING] * 2}
        onValuesChange={() => {}}
        allowOverlap
        isMarkersSeparated
        snapped
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onValuesChangeStart={() =>
          (marginTop.value = withTiming(40, { duration: 100 }))
        }
        onValuesChangeFinish={() =>
          (marginTop.value = withTiming(0, { duration: 100 }))
        }
        trackStyle={{
          backgroundColor: colors.secondary.sky,
        }}
        markerStyle={{
          backgroundColor: colors.secondary.sky,
        }}
        selectedStyle={{
          opacity: 1,
        }}
        unselectedStyle={{
          opacity: 0.3,
        }}
        customMarkerLeft={CustomMarker}
        customMarkerRight={CustomMarker}
        {...props}
      />
    </AnimatedBox>
  );
};
