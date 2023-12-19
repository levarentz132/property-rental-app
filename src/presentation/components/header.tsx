import { Box, HStack, Heading, Text, VStack, Factory } from "native-base";
import React from "react";
import { Image as ExpoImage } from "expo-image";

const Image = Factory(ExpoImage);

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const Header: React.FC = (): JSX.Element => {
  return (
    <HStack justifyContent="center" alignItems="center">
      <VStack flex={1}>
        <Text fontWeight="bold" fontSize={14} color="textColor.dark">
          Ola,
        </Text>
        <Heading fontWeight="bold" fontSize={24} color="textColor.dark">
          Henrique
        </Heading>
      </VStack>
      <Box rounded="3xl" bgColor="gray.400" w={16} h={16}>
        <Image
          rounded="3xl"
          width="100%"
          height="100%"
          contentFit="cover"
          placeholder={blurhash}
          source={{ uri: "https://github.com/henriquemod.png" }}
        />
      </Box>
    </HStack>
  );
};
