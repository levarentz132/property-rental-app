import { Box, useToken } from "@gluestack-ui/themed";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useApp } from "src/presentation/hooks/use-app";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export interface BaseRouteParamsProps {
  key: string;
  name: string;
}

export const Routes = () => {
  const { user } = useApp();
  const backgroundColor = useToken("colors", "white");
  const theme = DefaultTheme;
  theme.colors.background = backgroundColor;

  return (
    <Box flex={1} bg="primary.bg.white">
      <NavigationContainer theme={theme}>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
