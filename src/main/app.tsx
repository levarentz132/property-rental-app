import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { NativeBaseProvider } from "native-base";

import { Loading } from "../presentation/components/loading";
import { Register } from "../presentation/screens/auth";
import { Home } from "../presentation/screens/app";
import { THEME } from "./theme";

export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME} isSSR={false}>
        {fontsLoaded ? <Home /> : <Loading />}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
};
