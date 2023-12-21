import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";

import { AppRoutes } from "./app.routes";

export interface BaseRouteParamsProps {
  key: string;
  name: string;
}

export const Routes = () => {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.primary.bg.white;

  return (
    <Box flex={1} bg="primary.bg.white">
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
};
