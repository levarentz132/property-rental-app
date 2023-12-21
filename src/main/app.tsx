import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as NavigationBar from "expo-navigation-bar";
import { NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Loading } from "../presentation/components/loading";
import { Routes } from "./routes";
import { THEME } from "./theme";
import { AppProvider } from "src/presentation/context";
import { ReactNativeAsyncStorage } from "src/infra/storage/rn-storage";

const storageClient = new ReactNativeAsyncStorage();

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  const handleHideNavigationBar = async () => {
    try {
      if (Platform.OS === "ios") return;
      await NavigationBar.setBehaviorAsync("overlay-swipe");
      await NavigationBar.setVisibilityAsync("hidden");
    } catch (error) {
      console.error(error);
    } finally {
      setIsReady(true);
    }
  };
  useEffect(() => {
    handleHideNavigationBar();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME} isSSR={false}>
        {isReady && fontsLoaded ? (
          <AppProvider asyncStorageClient={storageClient}>
            <Routes />
          </AppProvider>
        ) : (
          <Loading />
        )}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};
