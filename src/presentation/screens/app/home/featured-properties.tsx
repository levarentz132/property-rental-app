import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import type { ComponentProps } from "react";
import type { Property } from "src/domain/models";
import type { StackNavigatorRouteProps } from "src/main/routes/stack-navigator";
import { Loading, PropertyCard } from "src/presentation/components";
// import { PropertyCardSkeleton } from "src/presentation/components/property-card-skeleton";

interface PropertiesProps extends ComponentProps<typeof VStack> {
  properties: Property[];
  loading?: boolean;
}

export const FeaturedProperties: React.FC<PropertiesProps> = ({
  properties,
  loading = false,
  ...props
}: PropertiesProps): JSX.Element => {
  const { navigate } = useNavigation<StackNavigatorRouteProps>();
  const Card = loading ? Loading : PropertyCard;
  return (
    <VStack flex={1} {...props}>
      <HStack paddingHorizontal="$6" alignItems="center">
        <Heading fontSize="md" fontWeight="bold" flex={1} marginBottom="$2">
          Featured Property
        </Heading>
      </HStack>
      {properties.length ? (
        properties.map((item) => (
          <Card
            key={item.id}
            view="landscape"
            paddingBottom="$3"
            paddingHorizontal="$4"
            onPress={() =>
              navigate("property-details", {
                type: "featured",
                id: item.id,
              })
            }
            {...item}
          />
        ))
      ) : (
        <Text marginLeft="$6" color="$textDark800">
          No featured properties found
        </Text>
      )}
    </VStack>
  );
};
