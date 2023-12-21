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

export const AuthRoutes: React.FC = () => {
  return (
    <Navigator
      initialRouteName="homeTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(({ name, component }) => {
        return <Screen key={name} name={name} children={component as any} />;
      })}
    </Navigator>
  );
};
