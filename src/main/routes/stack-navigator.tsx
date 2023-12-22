import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { homeFactory, propertyDetailsFactory } from "../factories";

// eslint-disable-next-line react-refresh/only-export-components
const Stack = createNativeStackNavigator();

type ScreenProps = React.ComponentProps<typeof Stack.Screen>;

const screens: ScreenProps[] = [
  {
    name: "home",
    component: () => homeFactory(),
  },
  {
    name: "property-details",
    component: () => propertyDetailsFactory(),
  },
];

type StackRoutes = {
  home: undefined;
  "property-details": {
    type: "property" | "featured";
    id: string;
  };
};

export type StackNavigatorRouteProps = NativeStackNavigationProp<StackRoutes>;

export const makeStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="home"
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
