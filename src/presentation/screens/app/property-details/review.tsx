import {
  VStack,
  HStack,
  Box,
  Factory,
  Text,
  Heading,
  IStackProps,
} from "native-base";
import { Image as ExpoImage } from "expo-image";

import StarIcon from "src/main/assets/colorfull-icons/star.svg";

const Image = Factory(ExpoImage);

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface ReviewProps extends IStackProps {}

export const Review: React.FC<ReviewProps> = (
  props: ReviewProps,
): JSX.Element => {
  return (
    <VStack
      shadow={9}
      padding={4}
      rounded="3xl"
      bgColor="primary.bg.white"
      {...props}
    >
      <HStack marginBottom={3}>
        <Box rounded="2xl" bgColor="gray.400" w={12} h={12} marginRight={2}>
          <Image
            rounded="2xl"
            width="100%"
            height="100%"
            contentFit="cover"
            placeholder={blurhash}
            source={{ uri: "https://github.com/henriquemod.png" }}
          />
        </Box>
        <VStack>
          <Heading size="sm">Henrique Souza</Heading>
          <Text>Home Owner/Broker</Text>
        </VStack>
      </HStack>
      <Text marginBottom={3}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit
        rem eligendi earum veritatis, numquam quis, totam placeat asperiores
        similique hic recusandae autem est dolorem magnam aperiam illo corporis
        cupiditate vero!
      </Text>
      <HStack space={1}>
        <StarIcon width={20} height={20} />
        <StarIcon width={20} height={20} />
        <StarIcon width={20} height={20} />
        <StarIcon width={20} height={20} />
      </HStack>
    </VStack>
  );
};
