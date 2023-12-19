import { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import { Box, Text, VStack } from "native-base";

interface CustomMarkerProps extends MarkerProps {
  label: string | number;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  label,
  ...props
}: CustomMarkerProps) => {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Box flex={1} />
      <Box position="relative" height={5} width={5}>
        <Box
          position="absolute"
          bgColor="secondary.sky"
          borderRadius="full"
          borderWidth={2}
          borderColor="primary.bg.white"
          width={5}
          height={5}
        />
        {props.pressed && (
          <Box
            position="absolute"
            bottom={-44}
            left={-20}
            bgColor="secondary.sky"
            borderRadius="sm"
            paddingY={1.5}
            paddingX={3}
            justifyContent="center"
            alignItems="center"
          >
            <Text color="primary.bg.white" overflow="visible" width={12}>
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
