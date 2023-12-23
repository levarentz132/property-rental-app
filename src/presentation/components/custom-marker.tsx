import { Box, Center, Text, VStack } from "@gluestack-ui/themed";
import type { MarkerProps } from "@ptomasroos/react-native-multi-slider";

export const CustomMarker: React.FC<MarkerProps> = (props: MarkerProps) => (
  <VStack flex={1} justifyContent="center" alignItems="center">
    <Box position="relative" height="$7" width="$7">
      <Center flex={1}>
        <Box
          position="absolute"
          bgColor="$lightBlue400"
          borderRadius="$full"
          borderWidth="$2"
          borderColor="$white"
          width="$5"
          height="$5"
        />
      </Center>
      {props.pressed && (
        <Box
          position="absolute"
          top="-$14"
          bg="$lightBlue400"
          bgColor="lightBlue400"
          borderRadius="$sm"
          paddingVertical="$1"
          paddingHorizontal="$3"
          justifyContent="center"
          alignItems="center"
          width={props.currentValue.toString().length > 4 ? "$6" : "$4"}
        >
          <Text color="$white">
            {(props.valuePrefix || "") +
              props.currentValue +
              (props.valueSuffix || "")}
          </Text>
        </Box>
      )}
    </Box>
  </VStack>
);
