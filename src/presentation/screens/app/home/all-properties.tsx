import { useNavigation } from "@react-navigation/native";
import type { IStackProps } from "native-base";
import {
  Factory,
  FlatList,
  Heading,
  HStack,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";
import type { Property } from "src/domain/models";
import ArrowRightIcon from "src/main/assets/filled-icons/arrow-right2.svg";
import type { StackNavigatorRouteProps } from "src/main/routes/stack-navigator";
import { PropertyCard } from "src/presentation/components";
import { PropertyCardSkeleton } from "src/presentation/components/property-card-skeleton";

const Icon = Factory(ArrowRightIcon);
const TouchableOpacity = Factory(RNTouchableOpacity);

interface PropertiesProps extends IStackProps {
  properties: Property[];
  loading?: boolean;
}

export const Properties: React.FC<PropertiesProps> = ({
  properties,
  loading = false,
  ...props
}: PropertiesProps): JSX.Element => {
  const { colors, sizes } = useTheme();
  const navigation = useNavigation<StackNavigatorRouteProps>();
  const Card = loading ? PropertyCardSkeleton : PropertyCard;
  return (
    <VStack flex={1} {...props}>
      <HStack paddingX={6} alignItems="center">
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
      <FlatList
        data={properties}
        renderItem={({ item, index }) => (
          <Card
            {...item}
            onPress={() =>
              navigation.navigate("property-details", {
                type: "property",
                id: item.id,
              })
            }
            marginRight={index === properties.length - 1 ? 0 : 3}
          />
        )}
        _contentContainerStyle={{
          paddingTop: sizes[1],
          paddingBottom: sizes[1.5],
          paddingX: sizes[1],
        }}
        ListEmptyComponent={() => (
          <Text marginLeft={6} textAlign="center" color="textColor.grayDark">
            No properties found
          </Text>
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flex: 1 }}
      />
    </VStack>
  );
};
