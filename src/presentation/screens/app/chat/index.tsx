import { createComponents, useToken } from "@gluestack-style/react";
import { Heading, HStack, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import type { StackMessagesNavigatorRouteProps } from "src/main/routes/stack-messages-navigator";
import { useApp } from "src/presentation/hooks/use-app";

const TouchableOpacity = createComponents(RNTouchableOpacity);
const ICON_SIZE = "7";

export const Chat: React.FC = (): JSX.Element => {
  const {
    system: { bottomTabs },
  } = useApp();
  const { goBack } = useNavigation<StackMessagesNavigatorRouteProps>();
  const iconColor = useToken("colors", "blue800");
  const backgroundColor = useToken("colors", "backgroundApp");
  const iconSize = useToken("space", ICON_SIZE);
  useEffect(() => {
    bottomTabs.inactiveBottomTabs.current!();

    return () => {
      bottomTabs.activeBottomTabs.current!();
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <VStack
        flex={1}
        flexGrow={1}
        paddingHorizontal="$6"
        borderColor="$red400"
      >
        <HStack marginBottom="$3" alignItems="center">
          <TouchableOpacity
            style={{ marginRight: 4 }}
            activeOpacity={0.7}
            onPress={goBack}
          >
            <ArrowBackIcon
              width={iconSize}
              height={iconSize}
              fill={iconColor}
            />
          </TouchableOpacity>
          <Heading flex={1} textTransform="capitalize">
            Chat
          </Heading>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};
