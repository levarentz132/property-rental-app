import { Image as ExpoImage } from "expo-image";
import {
  Factory,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
  useTheme,
} from "native-base";
import { SvgProps } from "react-native-svg";

import BathroomIconSvg from "src/main/assets/property-icons/bathroom.svg";
import BedIconSvg from "src/main/assets/property-icons/bed.svg";
import KitchenIconSvg from "src/main/assets/property-icons/kitchen.svg";
import SpaceIconSvg from "src/main/assets/property-icons/space.svg";
import LocationIconSvg from "src/main/assets/filled-icons/location.svg";
import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";
import { Property } from "src/domain/models";

const Image = Factory(ExpoImage);

export interface PropertyCardProps
  extends Property,
    Omit<InterfacePressableProps, "id" | "size"> {
  view?: "portrait" | "landscape";
}

const PropItem = ({
  icon,
  value,
  marginRight,
}: {
  icon: React.FC<SvgProps>;
  value: string | number;
  marginRight?: boolean;
}) => {
  return (
    <HStack alignItems="center" justifyContent="center">
      <Icon as={icon} size={4} />
      <Text
        marginLeft={1}
        marginRight={marginRight ? 4 : 0}
        color="textColor.grayDark"
      >
        {value}
      </Text>
    </HStack>
  );
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  view = "portrait",
  category,
  value,
  address,
  size,
  picture,
  beds,
  bathrooms,
  kitchens,
  ...props
}: PropertyCardProps): JSX.Element => {
  const { colors } = useTheme();
  const isPortrait = view === "portrait";
  const Wrapper = isPortrait ? VStack : HStack;
  return (
    <Pressable {...props}>
      <Wrapper
        rounded="3xl"
        bgColor="primary.bg.white"
        style={{
          elevation: 10,
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowColor: colors.textColor.grayLight,
        }}
        maxW={isPortrait ? 200 : undefined}
        padding={4}
        alignItems="center"
      >
        <Image
          width={isPortrait ? "100%" : 20}
          height={isPortrait ? 44 : 20}
          rounded="3xl"
          contentFit="fill"
          marginRight={isPortrait ? 0 : 3}
          source={{ uri: picture }}
        />
        <VStack
          alignItems="center"
          marginTop={isPortrait ? 4 : 0}
          flex={isPortrait ? undefined : 1}
        >
          <HStack
            width="100%"
            marginBottom={isPortrait ? 0 : 2}
            alignItems="center"
          >
            <Text
              fontWeight="bold"
              fontSize={isPortrait ? "md" : "lg"}
              flex={isPortrait ? 1 : undefined}
              marginRight={isPortrait ? 0 : 6}
              textTransform="capitalize"
            >
              {category}
            </Text>
            <Text color="primary.blue.800" fontWeight="bold">
              ${value}
            </Text>
          </HStack>
          {!isPortrait && (
            <HStack width="100%">
              <Icon
                as={LocationIconSvg}
                fill={colors.textColor.grayLight}
                marginLeft={-1}
              />
              <Text
                width="100%"
                color="textColor.grayLight"
                fontWeight="bold"
                maxWidth={isPortrait ? undefined : 200}
                numberOfLines={1}
              >
                {address}
              </Text>
            </HStack>
          )}
          <HStack
            width="100%"
            justifyContent={isPortrait ? "space-around" : "flex-start"}
            marginTop={2}
          >
            {size && (
              <PropItem
                icon={SpaceIconSvg}
                value={`${size}m²`}
                marginRight={!isPortrait}
              />
            )}
            {beds && (
              <PropItem
                icon={BedIconSvg}
                value={beds}
                marginRight={!isPortrait}
              />
            )}
            {bathrooms && (
              <PropItem
                icon={BathroomIconSvg}
                value={bathrooms}
                marginRight={!isPortrait}
              />
            )}
            {kitchens && (
              <PropItem
                icon={KitchenIconSvg}
                value={kitchens}
                marginRight={!isPortrait}
              />
            )}
          </HStack>
        </VStack>
      </Wrapper>
    </Pressable>
  );
};
