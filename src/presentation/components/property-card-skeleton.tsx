import { HStack, Skeleton, VStack } from "native-base";

import type { PropertyCardProps } from "./property-card";

export const PropertyCardSkeleton: React.FC<PropertyCardProps> = ({
  view = "portrait",
}: PropertyCardProps): JSX.Element => {
  const isPortrait = view === "portrait";
  const Wrapper = isPortrait ? VStack : HStack;
  return (
    <Wrapper
      marginX={isPortrait ? 1.5 : 6}
      marginBottom={isPortrait ? 0 : 3}
      rounded="3xl"
      bgColor="primary.bg.white"
      shadow={10}
      maxW={isPortrait ? 200 : undefined}
      padding={4}
      alignItems="center"
    >
      <Skeleton
        h="40"
        width={isPortrait ? "100%" : 20}
        height={isPortrait ? 44 : 20}
        rounded="3xl"
        marginRight={isPortrait ? 0 : 2}
      />
      <VStack
        alignItems="center"
        marginTop={isPortrait ? 4 : 0}
        flex={isPortrait ? undefined : 1}
      >
        <HStack
          width="100%"
          marginBottom={isPortrait ? 0 : 2}
          alignItems="center"
        >
          <Skeleton.Text
            fontWeight="bold"
            fontSize={isPortrait ? "md" : "lg"}
            flex={isPortrait ? 1 : undefined}
            marginRight={isPortrait ? 0 : 6}
            textTransform="capitalize"
          />
          <Skeleton.Text color="primary.blue.800" fontWeight="bold" />
        </HStack>
      </VStack>
    </Wrapper>
  );
};
