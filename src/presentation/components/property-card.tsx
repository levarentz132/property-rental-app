import { Image as ExpoImage } from "expo-image";
import { Factory, HStack, Text, VStack } from "native-base";

const Image = Factory(ExpoImage);

interface PropertyCardProps {
  view?: "portrait" | "landscape";
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  view = "portrait",
}: PropertyCardProps): JSX.Element => {
  const Wrapper = view === "portrait" ? VStack : HStack;
  return (
    <Wrapper
      rounded="3xl"
      bgColor="primary.bg.white"
      style={{
        elevation: 20,
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
      maxW={200}
      padding={4}
      alignItems="center"
    >
      <Image
        width={40}
        height={40}
        rounded="3xl"
        contentFit="fill"
        source={{ uri: "https://picsum.photos/200/300" }}
      />
      <VStack alignItems="center" marginTop={4}>
        <HStack width="100%">
          <Text fontWeight="bold" flex={1} textTransform="capitalize">
            Apartment
          </Text>
          <Text color="primary.blue.800" fontWeight="bold">
            $267000
          </Text>
        </HStack>
        <HStack width="100%" justifyContent="space-around" marginTop={2}>
          <Text>2000sqft</Text>
          <Text>4</Text>
          <Text>3</Text>
          <Text>1</Text>
        </HStack>
      </VStack>
    </Wrapper>
  );
};
