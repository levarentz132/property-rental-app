import { HStack, Text, useToken, VStack } from "@gluestack-ui/themed";
import type { ComponentProps } from "react";
import type { Review as ReviewModel } from "src/domain/models";
import StarIcon from "src/main/assets/colorfull-icons/star.svg";
import { UserSignature } from "src/presentation/components/user-signature";

interface ReviewProps
  extends ReviewModel,
    Omit<ComponentProps<typeof VStack>, "id"> {}

export const Review: React.FC<ReviewProps> = ({
  id,
  comment,
  name,
  picture,
  rating,
  userRole,
  ...props
}: ReviewProps): JSX.Element => {
  const starSize = useToken("space", "5");
  return (
    <VStack
      padding="$4"
      rounded="$3xl"
      bgColor="$white"
      softShadow="1"
      {...props}
    >
      <UserSignature
        marginBottom="$3"
        name={name}
        userRole={userRole}
        uri={picture}
      />
      <Text marginBottom="$3">{comment}</Text>
      <HStack space="xs">
        {rating > 0
          ? Array(rating)
              .fill(0)
              .map((_, index) => (
                <StarIcon key={index} width={starSize} height={starSize} />
              ))
          : null}
      </HStack>
    </VStack>
  );
};
