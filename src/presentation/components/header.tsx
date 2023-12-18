import { Box, HStack, Heading, Text, VStack } from "native-base";
import React from "react";

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
      <Box rounded="3xl" bgColor="gray.400" w={16} h={16} />
    </HStack>
  );
};
