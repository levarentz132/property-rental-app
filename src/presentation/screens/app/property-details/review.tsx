import { HStack, Text, useToken, VStack } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import StarIcon from "src/main/assets/colorfull-icons/star.svg";
import { UserSignature } from "src/presentation/components/user-signature";

interface ReviewProps extends ComponentProps<typeof VStack> {}

export const Review: React.FC<ReviewProps> = (
  props: ReviewProps,
): JSX.Element => {
  const starSize = useToken("space", "5");
  return (
    <VStack
      padding="$4"
      rounded="$3xl"
      bgColor="$white"
      shadowRadius="$2"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 5 }}
      shadowOpacity={0.34}
      {...props}
    >
      <UserSignature
        marginBottom="$3"
        name="Henrique Souza"
        userRole="Home Owner/Broker"
        uri="https://github.com/henriquemod.png"
      />
      <Text marginBottom="$3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit
        rem eligendi earum veritatis, numquam quis, totam placeat asperiores
        similique hic recusandae autem est dolorem magnam aperiam illo corporis
        cupiditate vero!
      </Text>
      <HStack space="xs">
        <StarIcon width={starSize} height={starSize} />
        <StarIcon width={starSize} height={starSize} />
        <StarIcon width={starSize} height={starSize} />
        <StarIcon width={starSize} height={starSize} />
      </HStack>
    </VStack>
  );
};
