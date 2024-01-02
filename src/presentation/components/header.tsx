import { createComponents, useToken } from "@gluestack-style/react";
import { Box, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Image as ExpoImage } from "expo-image";
import React from "react";

import { blurhash } from "../helpers/blur-hash";

const Image = createComponents(ExpoImage);

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
          Hi,
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
