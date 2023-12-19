import { Factory, HStack, Heading, Text, VStack, useTheme } from "native-base";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";

import ArrowRightIcon from "src/main/assets/filled-icons/arrow-right2.svg";
import { PropertyCard } from "src/presentation/components";

const Icon = Factory(ArrowRightIcon);
const TouchableOpacity = Factory(RNTouchableOpacity);

export const Properties: React.FC = (): JSX.Element => {
  const { colors } = useTheme();
  return (
    <VStack flex={1}>
      <HStack alignItems="center">
        <Heading fontSize="md" fontWeight="bold" flex={1}>
          All Property
        </Heading>
        <TouchableOpacity
          opacity={0.7}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="green.400">See All</Text>
          <Icon width={20} height={20} fill={colors.green[400]} />
        </TouchableOpacity>
      </HStack>
      <PropertyCard />
    </VStack>
  );
};
