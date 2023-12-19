import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";

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
    <NativeBaseProvider theme={THEME} isSSR={false}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Home /> : <Loading />}
    </NativeBaseProvider>
  );
};
