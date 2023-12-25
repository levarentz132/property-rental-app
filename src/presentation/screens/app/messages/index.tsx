import { createComponents, useToken } from "@gluestack-style/react";
import { FlatList, Heading, HStack, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import type { Message } from "src/domain/models";
import ArrowBackIcon from "src/main/assets/outline-icons/arrow-left2.svg";
import { MessageCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";

import { Search } from "./search";

const TouchableOpacity = createComponents(RNTouchableOpacity);

const ICON_SIZE = "7";

export const Messages: React.FC = (): JSX.Element => {
  const { goBack, navigate } = useNavigation();
  const {
    messages: { list },
  } = useApp();
  const [search, setSearch] = useState<string>();
  const iconColor = useToken("colors", "blue800");
  const backgroundColor = useToken("colors", "backgroundApp");
  const iconSize = useToken("space", ICON_SIZE);
  const messagesMargin = useToken("space", "3");
  const handleNewMessage = () => {
    console.log();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <VStack flex={1} flexGrow={1} paddingHorizontal="$6">
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
            Messages
          </Heading>
        </HStack>
        <Search
          inputProps={{
            value: search,
            onChangeText: setSearch,
          }}
          onNewMessage={handleNewMessage}
        />
        <FlatList
          marginTop="$6"
          showsVerticalScrollIndicator={false}
          flex={1}
          data={list}
          keyExtractor={(item) => (item as Message).id}
          renderItem={({ item }) => (
            <MessageCard
              containerProps={{ style: { marginVertical: messagesMargin } }}
              onPress={() => {
                navigate("chat", { id: (item as Message).id });
              }}
              {...(item as Message)}
            />
          )}
        />
      </VStack>
    </SafeAreaView>
  );
};
