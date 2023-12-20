import { HStack, Heading, IStackProps, List, Text, VStack } from "native-base";

import { Property } from "src/domain/models";
import { PropertyCard } from "src/presentation/components";
import { PropertyCardSkeleton } from "src/presentation/components/property-card-skeleton";

interface PropertiesProps extends IStackProps {
  properties: Property[];
  loading?: boolean;
}

export const FeaturedProperties: React.FC<PropertiesProps> = ({
  properties,
  loading = false,
  ...props
}: PropertiesProps): JSX.Element => {
  const Card = loading ? PropertyCardSkeleton : PropertyCard;
  return (
    <VStack flex={1} {...props}>
      <HStack paddingX={6} alignItems="center">
        <Heading fontSize="md" fontWeight="bold" flex={1} marginBottom={2}>
          Featured Property
        </Heading>
      </HStack>
      <List borderWidth={0}>
        {properties.length ? (
          properties.map((item) => (
            <Card
              key={item.id}
              view="landscape"
              paddingBottom={3}
              paddingX={6}
              {...item}
            />
          ))
        ) : (
          <Text marginLeft={6} color="textColor.grayDark">
            No featured properties found
          </Text>
        )}
      </List>
    </VStack>
  );
};
