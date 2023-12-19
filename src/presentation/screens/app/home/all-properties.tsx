import {
  Factory,
  FlatList,
  HStack,
  Heading,
  IStackProps,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";

import { Property } from "src/domain/models";
import ArrowRightIcon from "src/main/assets/filled-icons/arrow-right2.svg";
import { PropertyCard } from "src/presentation/components";

const Icon = Factory(ArrowRightIcon);
const TouchableOpacity = Factory(RNTouchableOpacity);

const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    address: "2BW Street, NY, New York",
    category: "Apartment1",
    value: 267000,
    bathrooms: 3,
    beds: 4,
    kitchens: 1,
    size: 2000,
  },
  {
    id: "2",
    address: "2BW Street, NY, New York",
    category: "Apartment2",
    value: 267000,
    bathrooms: 3,
    beds: 4,
    kitchens: 1,
    size: 2000,
  },
  {
    id: "3",
    address: "2BW Street, NY, New York",
    category: "Apartment3",
    value: 267000,
    bathrooms: 3,
    beds: 4,
    kitchens: 1,
    size: 2000,
  },
  {
    id: "4",
    address: "2BW Street, NY, New York",
    category: "Apartment4",
    value: 267000,
    bathrooms: 3,
    beds: 4,
    kitchens: 1,
    size: 2000,
  },
];

interface PropertiesProps extends IStackProps {}

export const Properties: React.FC<PropertiesProps> = (
  props: PropertiesProps,
): JSX.Element => {
  const { colors } = useTheme();
  return (
    <VStack flex={1} {...props}>
      <HStack paddingX={6} paddingY={2} alignItems="center">
        <Heading fontSize="md" fontWeight="bold" flex={1} marginBottom={2}>
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
      <FlatList
        position="relative"
        data={MOCK_PROPERTIES}
        renderItem={({ item }) => <PropertyCard {...item} marginX={1.5} />}
        _contentContainerStyle={{
          paddingBottom: 5,
        }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flex: 1 }}
      />
    </VStack>
  );
};
