import { VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "src/presentation/components";

export const Home: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} padding={6}>
        <Header />
      </VStack>
    </SafeAreaView>
  );
};
