import { HStack, Heading, IStackProps, List, VStack } from "native-base";

import { Property } from "src/domain/models";
import { PropertyCard } from "src/presentation/components";

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
];

interface PropertiesProps extends IStackProps {}

export const FeaturedProperties: React.FC<PropertiesProps> = (
  props: PropertiesProps,
): JSX.Element => {
  return (
    <VStack flex={1} {...props}>
      <HStack paddingX={6} paddingY={2} alignItems="center">
        <Heading fontSize="md" fontWeight="bold" flex={1} marginBottom={2}>
          Featured Property
        </Heading>
      </HStack>
      <List borderWidth={0}>
        {MOCK_PROPERTIES.map((el) => (
          <PropertyCard
            key={el.id}
            view="landscape"
            paddingBottom={5}
            paddingX={6}
            {...el}
          />
        ))}
      </List>
    </VStack>
  );
};
