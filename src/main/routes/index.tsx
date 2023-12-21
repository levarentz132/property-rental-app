import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useApp } from "src/presentation/hooks/use-app";

export interface BaseRouteParamsProps {
  key: string;
  name: string;
}

export const Routes = () => {
  const { user } = useApp();
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.primary.bg.white;

  return (
    <Box flex={1} bg="primary.bg.white">
      <NavigationContainer theme={theme}>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
