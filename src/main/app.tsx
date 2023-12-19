import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { NativeBaseProvider } from "native-base";

import { Loading } from "../presentation/components/loading";
import { THEME } from "./theme";
import { homeFactory } from "./factories";

export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME} isSSR={false}>
        {fontsLoaded ? homeFactory() : <Loading />}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};
