import { createComponents, useToken } from "@gluestack-style/react";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import type { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";
import type { Property } from "src/domain/models";
import ArrowRightIcon from "src/main/assets/filled-icons/arrow-right2.svg";
import type { StackNavigatorRouteProps } from "src/main/routes/stack-navigator";
import { Loading, PropertyCard } from "src/presentation/components";
// import { PropertyCardSkeleton } from "src/presentation/components/property-card-skeleton";

const Icon = createComponents(ArrowRightIcon);

interface PropertiesProps extends ComponentProps<typeof VStack> {
  properties: Property[];
  loading?: boolean;
}

export const Properties: React.FC<PropertiesProps> = ({
  properties,
  loading = false,
  ...props
}: PropertiesProps): JSX.Element => {
  const cardPadding = useToken("space", "4");
  const seeAllColorIcon = useToken("colors", "green500");
  const navigation = useNavigation<StackNavigatorRouteProps>();
  const Card = loading ? Loading : PropertyCard;
  return (
    <VStack flex={1} {...props}>
      <HStack paddingHorizontal="$6" alignItems="center">
        <Heading fontSize="$md" fontWeight="bold" flex={1}>
          All Property
        </Heading>
        <TouchableOpacity activeOpacity={0.7}>
          <Box flexDirection="row" justifyContent="center" alignItems="center">
            <Text color="$green400">See All</Text>
            <Icon width={20} height={20} fill={seeAllColorIcon} />
          </Box>
        </TouchableOpacity>
      </HStack>
      <FlatList
        data={properties}
        renderItem={({ item, index }) => (
          <Card
            {...(item as Property)}
            onPress={() =>
              navigation.navigate("property-details", {
                type: "property",
                id: (item as Property).id,
              })
            }
            marginRight={index === properties.length - 1 ? 0 : "$3"}
          />
        )}
        contentContainerStyle={{
          padding: cardPadding,
        }}
        ListEmptyComponent={() => (
          <Text marginLeft={6} textAlign="center" color="$textDark800">
            No properties found
          </Text>
        )}
        keyExtractor={(item) => (item as Property).id}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flex: 1 }}
      />
    </VStack>
  );
};
