import {
  Inter_200ExtraLight,
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReactNativeAsyncStorage } from "src/infra/storage/rn-storage";
import { config } from "src/main/theme/glue/gluestack-ui.config";
import { AppProvider } from "src/presentation/context";

import { Loading } from "../presentation/components/loading";
import { Routes } from "./routes";

const storageClient = new ReactNativeAsyncStorage();

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_400Regular,
    Inter_700Bold,
  });
  const handleHideNavigationBar = async () => {
    try {
      if (Platform.OS === "ios") return;
      await NavigationBar.setBehaviorAsync("inset-swipe");
      await NavigationBar.setVisibilityAsync("hidden");
    } catch (error) {
      // console.error(error);
    } finally {
      setIsReady(true);
    }
  };
  useEffect(() => {
    handleHideNavigationBar();
  }, []);
  useEffect(() => {
    if (Platform.OS === "ios") return;
    const subs = NavigationBar.addVisibilityListener((e) => {
      if (e.visibility === "visible") {
        setTimeout(() => {
          NavigationBar.setVisibilityAsync("hidden");
        }, 3000);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => subs.remove();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        {isReady && fontsLoaded ? (
          <AppProvider asyncStorageClient={storageClient}>
            <Routes />
          </AppProvider>
        ) : (
          <Loading />
        )}
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
};
