import {
  Box,
  createComponents,
  HStack,
  Icon,
  Pressable,
  Text,
  useToken,
  VStack,
} from "@gluestack-ui/themed";
import { Image as ExpoImage } from "expo-image";
import type { ComponentProps } from "react";
import { useMemo } from "react";
import type { SvgProps } from "react-native-svg";
import type { Property } from "src/domain/models";
import LocationIconSvg from "src/main/assets/filled-icons/location.svg";
import BathroomIconSvg from "src/main/assets/property-icons/bathroom.svg";
import BedIconSvg from "src/main/assets/property-icons/bed.svg";
import KitchenIconSvg from "src/main/assets/property-icons/kitchen.svg";
import SpaceIconSvg from "src/main/assets/property-icons/space.svg";

const Image = createComponents(ExpoImage);

export interface PropertyCardProps
  extends Property,
    Omit<ComponentProps<typeof Pressable>, "id" | "size"> {
  fullWidth?: boolean;
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
}) => (
  <HStack alignItems="center" justifyContent="center">
    <Icon as={icon} size="sm" />
    <Text
      fontFamily="$extraLight"
      fontSize="$xs"
      fontWeight="$bold"
      marginLeft="$1"
      marginRight={marginRight ? "$4" : 0}
      color="$textDark900"
    >
      {value}
    </Text>
  </HStack>
);

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
  fullWidth = false,
  ...props
}: PropertyCardProps): JSX.Element => {
  const trueGray300 = useToken("colors", "trueGray300");
  const isPortrait = view === "portrait";
  const portraitImageWidth = useToken("space", isPortrait ? "full" : "20");
  const portraitImageHeight = useToken("space", isPortrait ? "48" : "20");
  const portraitMarginRight = useToken("space", isPortrait ? "0" : "3");
  const portraitImageRadius = useToken("radii", "3xl");
  const titleFontSize = useMemo(() => {
    if (fullWidth) return "$xl";
    if (isPortrait) return "$md";
    return "$lg";
  }, [isPortrait]);
  const Wrapper = isPortrait ? VStack : HStack;
  return (
    <Pressable {...props}>
      <Wrapper
        rounded="$3xl"
        bgColor="$white"
        softShadow="1"
        maxWidth={isPortrait && !fullWidth ? "$56" : undefined}
        padding="$4"
        alignItems="center"
      >
        <Image
          style={{
            borderRadius: portraitImageRadius,
            width: portraitImageWidth,
            height: portraitImageHeight,
            marginRight: portraitMarginRight,
          }}
          contentFit="fill"
          source={{
            uri: `${picture}?dummy=${address.replace(/\s/g, "")}`,
          }}
        />
        <VStack
          alignItems="center"
          justifyContent="space-evenly"
          marginTop={isPortrait ? "$4" : 0}
          flex={isPortrait ? undefined : 1}
          space="xs"
        >
          <HStack width="100%" alignItems="center">
            <Text
              fontWeight="$bold"
              fontFamily="$heading"
              fontSize={titleFontSize}
              flex={isPortrait ? 1 : undefined}
              marginRight={isPortrait ? 0 : "$6"}
              textTransform="capitalize"
            >
              {category}
            </Text>
            <Text
              color="$blue800"
              fontWeight="$bold"
              fontFamily="$heading"
              fontSize={fullWidth ? "$xl" : "$md"}
            >
              ${value}
            </Text>
          </HStack>
          {(!isPortrait || fullWidth) && (
            <HStack
              width="100%"
              padding={fullWidth ? 3 : 0}
              alignItems="center"
            >
              <Icon
                as={LocationIconSvg}
                fill={trueGray300}
                marginLeft={-1}
                size="xs"
                marginRight="$1.5"
              />
              <Text
                width="100%"
                color="$textDark800"
                fontWeight="$bold"
                fontFamily="$extraLight"
                fontSize={fullWidth ? "$md" : "$sm"}
                maxWidth={isPortrait ? undefined : 220}
                numberOfLines={fullWidth ? 2 : 1}
              >
                {address}
              </Text>
            </HStack>
          )}
          <HStack
            width="100%"
            justifyContent={isPortrait ? "space-around" : "flex-start"}
          >
            {size && (
              <PropItem
                icon={SpaceIconSvg}
                value={`${size}m²`}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {beds && (
              <PropItem
                icon={BedIconSvg}
                value={beds}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {bathrooms && (
              <PropItem
                icon={BathroomIconSvg}
                value={bathrooms}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {kitchens && (
              <PropItem
                icon={KitchenIconSvg}
                value={kitchens}
                marginRight={!isPortrait || fullWidth}
              />
            )}
            {fullWidth && <Box flex={1} />}
          </HStack>
        </VStack>
      </Wrapper>
    </Pressable>
  );
};
