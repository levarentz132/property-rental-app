import { HStack, Skeleton, VStack, useTheme } from "native-base";
import { PropertyCardProps } from "./property-card";

export const PropertyCardSkeleton: React.FC<PropertyCardProps> = ({
  view = "portrait",
  category,
  value,
  address,
  size,
  picture,
  beds,
  bathrooms,
  kitchens,
  ...props
}: PropertyCardProps): JSX.Element => {
  const { colors } = useTheme();
  const isPortrait = view === "portrait";
  const Wrapper = isPortrait ? VStack : HStack;
  return (
    <Wrapper
      marginX={isPortrait ? 1.5 : 6}
      marginBottom={isPortrait ? 0 : 3}
      rounded="3xl"
      bgColor="primary.bg.white"
      style={{
        elevation: 10,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowColor: colors.textColor.grayLight,
      }}
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
