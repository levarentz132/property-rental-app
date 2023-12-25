import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { messagesFactory } from "../factories";
import { chatFactory } from "../factories/chat-factory";

// eslint-disable-next-line react-refresh/only-export-components
const Stack = createNativeStackNavigator();

type ScreenProps = React.ComponentProps<typeof Stack.Screen>;

const screens: ScreenProps[] = [
  {
    name: "messages",
    component: () => messagesFactory(),
  },
  {
    name: "chat",
    component: () => chatFactory(),
  },
];

type StackRoutes = {
  home: undefined;
  chat: {
    id: string;
  };
};

export type StackMessagesNavigatorRouteProps =
  NativeStackNavigationProp<StackRoutes>;

export const makeMessagesStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="messages"
    screenOptions={{
      headerShown: false,
      presentation: "modal",
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
