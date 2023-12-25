import { useToken } from "@gluestack-style/react";
import { FlatList, VStack } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import type { Message, MessageAtom } from "src/domain/models";
import type { BaseRouteParamsProps } from "src/main/routes";
import { Loading } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";

import { ChatInput } from "./chat-input";
import { Header } from "./header";
import { Messages } from "./message";

interface RouteParamsProps extends BaseRouteParamsProps {
  params: {
    id: string;
  };
}

export const Chat: React.FC = (): JSX.Element => {
  const {
    system: { bottomTabs },
    messages: { list },
  } = useApp();
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteParamsProps>();
  const [loading, setLoading] = useState(true);
  const backgroundColor = useToken("colors", "backgroundApp");
  const [messageEntity, setMessageEntity] = useState<Message>();
  useEffect(() => {
    setLoading(true);
    const message = list.find((item) => item.id === params.id);
    if (!message) {
      goBack();
    } else {
      setMessageEntity(message);
      setLoading(false);
    }
  }, [list]);
  useEffect(() => {
    bottomTabs.inactiveBottomTabs.current!();

    return () => {
      bottomTabs.activeBottomTabs.current!();
    };
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <VStack
          flex={1}
          paddingHorizontal="$6"
          marginTop="$2"
          marginBottom={Platform.OS === "ios" ? "$0" : "$4"}
          space="md"
          justifyContent="space-between"
        >
          <Header avatarUrl={messageEntity?.image} />
          <FlatList
            inverted
            contentContainerStyle={{
              flexDirection: "column-reverse",
            }}
            showsVerticalScrollIndicator={false}
            data={messageEntity?.atoms || []}
            keyExtractor={(item) => (item as MessageAtom).date.toISOString()}
            renderItem={({ item }) => (
              <Messages
                message={item as MessageAtom}
                marginVertical="$4"
                avatarUrl={messageEntity?.image}
              />
            )}
          />
          <ChatInput marginVertical="$2" />
        </VStack>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
