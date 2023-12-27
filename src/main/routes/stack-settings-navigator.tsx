import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  changePasswordFactory,
  personalProfileFactory,
  privacyPolicyFactory,
  settingsFactory,
} from "../factories";

// eslint-disable-next-line react-refresh/only-export-components
const Stack = createNativeStackNavigator();

type ScreenProps = React.ComponentProps<typeof Stack.Screen>;

const screens: ScreenProps[] = [
  {
    name: "settings",
    component: () => settingsFactory(),
  },
  {
    name: "change-password",
    component: () => changePasswordFactory(),
  },
  {
    name: "privacy-policy",
    component: () => privacyPolicyFactory(),
  },
  {
    name: "personal-profile",
    component: () => personalProfileFactory(),
  },
];

type StackRoutes = {
  settings: undefined;
  "change-password": undefined;
  "privacy-policy": undefined;
  "personal-profile": undefined;
};

export type StackNavigatorSettingsRouteProps =
  NativeStackNavigationProp<StackRoutes>;

export const makeSettingsStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="settings"
    screenOptions={{
      headerShown: false,
    }}
  >
    {screens.map((screen) => (
      <Stack.Screen
        key={screen.name}
        name={screen.name}
        children={screen.component as any}
      />
    ))}
  </Stack.Navigator>
);
