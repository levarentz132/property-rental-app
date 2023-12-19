import RNMultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  Factory,
  HStack,
  Heading,
  IStackProps,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Button } from "./button";
import { CustomMarker } from "./custom-marker";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING = 6;

const MultiSlider = Factory(RNMultiSlider);
const AnimatedVStack = Animated.createAnimatedComponent(VStack);

interface FilterProps extends IStackProps {
  onCLose: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  onCLose,
  ...props
}: FilterProps): JSX.Element => {
  const { space, colors } = useTheme();
  const filterPosition = useSharedValue(0);
  const animatedFilterStyles = useAnimatedStyle(() => {
    return {
      bottom: -filterPosition.value,
    };
  });
  const onPan = Gesture.Pan()
    .onUpdate((event) => {
      const moveToDown = event.translationY > 0;
      if (moveToDown) {
        filterPosition.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 250) {
        console.log("onEnd", event.translationY);
        filterPosition.value = withTiming(5000);
        runOnJS(onCLose)();
      } else {
        filterPosition.value = withTiming(0);
      }
    });
  return (
    <GestureDetector gesture={onPan}>
      <AnimatedVStack
        position="absolute"
        style={[animatedFilterStyles]}
        entering={SlideInDown}
        exiting={SlideOutDown}
        // flex={1}
        width="100%"
        bgColor="textColor.white"
        borderTopRightRadius="3xl"
        borderTopLeftRadius="3xl"
        paddingX={PADDING}
        paddingY={PADDING * 2}
        {...props}
      >
        <Heading alignSelf="center" fontSize="xl" marginBottom={4}>
          Filter
        </Heading>
        <Text fontSize="lg" fontWeight="bold" marginBottom={16}>
          Property types
        </Text>
        <HStack marginBottom={2}>
          <Text flex={1} fontSize="md" fontWeight="bold">
            Property Size
          </Text>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="secondary.sky"
            opacity={0.7}
          >
            Up to 5000 m²
          </Text>
        </HStack>
        <MultiSlider
          values={[10, 200]}
          sliderLength={SCREEN_WIDTH - space[PADDING] * 2}
          onValuesChange={() => {}}
          min={0}
          max={1000}
          step={10}
          valueSuffix="m²"
          allowOverlap
          isMarkersSeparated
          snapped
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
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
          customMarkerLeft={(props) => <CustomMarker label="Left" {...props} />}
          customMarkerRight={(props) => (
            <CustomMarker label="Right" {...props} />
          )}
        />
        <Text
          flex={1}
          fontSize="md"
          fontWeight="bold"
          marginBottom={2}
          marginTop={8}
        >
          Property Price
        </Text>
        <HStack>
          <Text flex={1} fontSize="xs" fontWeight="normal">
            Low
          </Text>
          <Text fontSize="xs" fontWeight="normal">
            High
          </Text>
        </HStack>
        <MultiSlider
          values={[0, 1000000]}
          sliderLength={SCREEN_WIDTH - space[PADDING] * 2}
          onValuesChange={() => {}}
          min={0}
          max={2000000}
          step={10000}
          valuePrefix="$"
          allowOverlap
          isMarkersSeparated
          snapped
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
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
          customMarkerLeft={(props) => <CustomMarker label="Left" {...props} />}
          customMarkerRight={(props) => (
            <CustomMarker label="Right" {...props} />
          )}
        />
        <HStack width="100%" space={4} marginTop={8}>
          <Button flex={0.5} title="Reset" variant="outline" />
          <Button flex={1} title="Check availability" />
        </HStack>
      </AnimatedVStack>
    </GestureDetector>
  );
};
