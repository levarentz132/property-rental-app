import { Heading, HStack, useToken, VStack } from "@gluestack-ui/themed";
import type { ComponentProps, PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";

const DEFAULT_BACKGROUND_COLOR = "backgroundApp";
const DEFAULT_VERTICAL_PROP: ComponentProps<typeof VStack> = {
  flex: 1,
  paddingHorizontal: "$6",
  paddingTop: "$3",
  space: "lg",
};
const DEFAULT_AREA_VIEW = (
  backgroundColor: string,
): ComponentProps<typeof SafeAreaView> => ({
  style: {
    flex: 1,
    backgroundColor,
  },
});

export interface LayoutProps extends PropsWithChildren {
  onGoBack?: () => void;
}

export const StaticVerticalScrollableLayout = ({
  onGoBack,
  children,
}: LayoutProps) => {
  const backgroundColor = useToken("colors", DEFAULT_BACKGROUND_COLOR);
  const iconSize = useToken("space", "7");
  const iconColor = useToken("colors", "blue800");
  const marginRightGoBack = useToken("space", "4");

  return (
    <SafeAreaView {...DEFAULT_AREA_VIEW(backgroundColor)}>
      <ScrollView>
        <VStack {...DEFAULT_VERTICAL_PROP}>
          <HStack marginBottom="$3" alignItems="center">
            {onGoBack && (
              <TouchableOpacity
                style={{ marginRight: marginRightGoBack }}
                activeOpacity={0.7}
                onPress={onGoBack}
              >
                <ArrowBackIcon
                  width={iconSize}
                  height={iconSize}
                  fill={iconColor}
                />
              </TouchableOpacity>
            )}
            <Heading flex={1} textTransform="capitalize">
              Change Password
            </Heading>
          </HStack>
          {children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export const StaticVerticalLayout = ({ children }: PropsWithChildren) => {
  const backgroundColor = useToken("colors", DEFAULT_BACKGROUND_COLOR);

  return (
    <SafeAreaView {...DEFAULT_AREA_VIEW(backgroundColor)}>
      <VStack {...DEFAULT_VERTICAL_PROP}>{children}</VStack>
    </SafeAreaView>
  );
};
