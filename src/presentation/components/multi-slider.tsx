import { Box, useToken } from "@gluestack-ui/themed";
import type { MultiSliderProps as RNMultiSliderProps } from "@ptomasroos/react-native-multi-slider";
import RNMultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CustomMarker } from "src/presentation/components";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING = "6";

interface MultiSliderProps extends RNMultiSliderProps {}

export const MultiSlider: React.FC<MultiSliderProps> = ({
  ...props
}: MultiSliderProps): JSX.Element => {
  // const { colors, space } = useTheme();
  const space = useToken("space", PADDING);
  const backgroundColor = useToken("colors", "lightBlue400");
  const marginTop = useSharedValue(0);
  const sliderStyle = useAnimatedStyle(() => ({
    marginTop: marginTop.value,
  }));
  const handleElevation = (opening: boolean) => () => {
    marginTop.value = withTiming(opening ? 40 : 0, { duration: 100 });
  };
  return (
    <AnimatedBox style={[sliderStyle]}>
      <RNMultiSlider
        sliderLength={SCREEN_WIDTH - space}
        onValuesChange={() => {}}
        allowOverlap
        isMarkersSeparated
        snapped
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onValuesChangeStart={handleElevation(true)}
        onValuesChangeFinish={handleElevation(false)}
        trackStyle={{
          backgroundColor,
        }}
        markerStyle={{
          backgroundColor,
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
