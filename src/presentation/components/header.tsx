import { createComponents, useToken } from "@gluestack-style/react";
import { Box, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Image as ExpoImage } from "expo-image";
import React from "react";

const Image = createComponents(ExpoImage);

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const Header: React.FC = (): JSX.Element => {
  const borderRadius = useToken("radii", "3xl");
  return (
    <HStack justifyContent="center" alignItems="center">
      <VStack flex={1}>
        <Text
          fontWeight="$bold"
          fontSize="$lg"
          fontFamily="$heading"
          color="$textDark900"
          marginBottom="$2"
        >
          Ola,
        </Text>
        <Heading fontWeight="bold" fontSize="$3xl" color="$textDark900">
          Henrique
        </Heading>
      </VStack>
      <Box rounded="$3xl" bgColor="$trueGray400" w="$16" h="$16">
        <Image
          style={{
            borderRadius,
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
          placeholder={blurhash}
          source={{ uri: "https://github.com/henriquemod.png" }}
        />
      </Box>
    </HStack>
  );
};
