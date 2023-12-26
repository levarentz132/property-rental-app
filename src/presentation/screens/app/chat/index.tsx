import { useToken } from "@gluestack-style/react";
import { FlatList, VStack } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import type { HttpGetClient } from "src/data/contracts/infra";
import type { Message, MessageAtom, UserData } from "src/domain/models";
import { env } from "src/main/config/env";
import type { BaseRouteParamsProps } from "src/main/routes";
import { Loading } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";

import { ChatInput } from "./chat-input";
import { Header } from "./header";
import { Messages } from "./message";

interface RouteParamsProps extends BaseRouteParamsProps {
  params:
    | {
        id: string;
      }
    | {
        userId: string;
      };
}

interface ChatProps {
  httpClient: HttpGetClient;
}

export const Chat: React.FC<ChatProps> = ({
  httpClient,
}: ChatProps): JSX.Element => {
  const {
    system: { bottomTabs },
    messages: { list },
  } = useApp();
  const { goBack, navigate } = useNavigation();
  const { params } = useRoute<RouteParamsProps>();
  const [loading, setLoading] = useState(true);
  const backgroundColor = useToken("colors", "backgroundApp");
  const [messageEntity, setMessageEntity] = useState<Message>();
  const loadData = async (id: string) => {
    setLoading(true);
    try {
      if ("id" in params) {
        const message = list.find((item) => item.id === params.id);
        if (!message) {
          goBack();
        } else {
          setMessageEntity(message);
        }
      } else {
        const { body = [] } = await httpClient.get<UserData[]>({
          url: `${env.ENDPOINT}/users?id=${id}`,
        });
        if (body.length > 0) {
          setMessageEntity({
            image: body[0].profilePicture,
            from: body[0].realName,
            atoms: [],
            id: body[0].id,
            isOnline: false,
          });
        } else {
          navigate("home");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if ("id" in params) {
        loadData(params.id);
      } else {
        loadData(params.userId);
      }
    }, [params]),
  );

  useEffect(() => {
    console.log(messageEntity);
  }, [messageEntity]);

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
          <Header
            avatarUrl={messageEntity?.image}
            username={messageEntity?.from || ""}
          />
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
