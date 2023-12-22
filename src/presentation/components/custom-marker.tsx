import { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import { Box, Center, Text, VStack } from "native-base";

export const CustomMarker: React.FC<MarkerProps> = (props: MarkerProps) => {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Box position="relative" height={7} width={7}>
        <Center flex={1}>
          <Box
            position="absolute"
            bgColor="secondary.sky"
            borderRadius="full"
            borderWidth={2}
            borderColor="primary.bg.white"
            width={5}
            height={5}
          />
        </Center>
        {props.pressed && (
          <Box
            position="absolute"
            top={-38}
            bgColor="secondary.sky"
            borderRadius="sm"
            paddingY={1.5}
            paddingX={3}
            justifyContent="center"
            alignItems="center"
            width={props.currentValue.toString().length > 4 ? 24 : 18}
          >
            <Text color="primary.bg.white">
              {(props.valuePrefix || "") +
                props.currentValue +
                (props.valueSuffix || "")}
            </Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
};
