import { useToken } from "@gluestack-style/react";
import { FlatList } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import type { Message } from "src/domain/models";
import { MessageCard } from "src/presentation/components";
import { useApp } from "src/presentation/hooks/use-app";
import { StaticVerticalLayout } from "src/presentation/layout";

import { Search } from "./search";

export const Messages: React.FC = (): JSX.Element => {
  const { navigate } = useNavigation();
  const {
    messages: { list },
  } = useApp();
  const [search, setSearch] = useState<string>();
  const messagesMargin = useToken("space", "3");
  const handleNewMessage = () => {
    console.log();
  };
  return (
    <StaticVerticalLayout title="Messages">
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
    </StaticVerticalLayout>
  );
};
