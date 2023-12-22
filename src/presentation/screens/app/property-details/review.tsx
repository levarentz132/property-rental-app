import type { IStackProps } from "native-base";
import { HStack, Text, VStack } from "native-base";
import StarIcon from "src/main/assets/colorfull-icons/star.svg";
import { UserSignature } from "src/presentation/components/user-signature";

interface ReviewProps extends IStackProps {}

export const Review: React.FC<ReviewProps> = (
  props: ReviewProps,
): JSX.Element => (
  <VStack
    shadow={9}
    padding={4}
    rounded="3xl"
    bgColor="primary.bg.white"
    {...props}
  >
    <UserSignature
      marginBottom={3}
      name="Henrique Souza"
      userRole="Home Owner/Broker"
      uri="https://github.com/henriquemod.png"
    />
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
