import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { signInFactory, signUpFactory } from "../factories";

const { Navigator, Screen } = createNativeStackNavigator();

type ScreenProps = {
  name: string;
  component: React.FC;
};

const screens: ScreenProps[] = [
  {
    name: "sign-in",
    component: () => signInFactory(),
  },
  {
    name: "sign-up",
    component: () => signUpFactory(),
  },
];

type AuthRoutesTypes = {
  "sign-in": undefined;
  "sign-up": undefined;
};

export type AuthNavigatorRouteProps = BottomTabNavigationProp<AuthRoutesTypes>;

export const AuthRoutes: React.FC = () => (
  <Navigator
    initialRouteName="homeTab"
    screenOptions={{
      headerShown: false,
    }}
  >
    {screens.map(({ name, component }) => (
      <Screen key={name} name={name} children={component as any} />
    ))}
  </Navigator>
);
