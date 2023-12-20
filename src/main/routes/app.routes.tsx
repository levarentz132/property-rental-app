import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Box, useTheme } from "native-base";
import { Platform } from "react-native";

import FavoritesSVG from "src/main/assets/colorfull-icons/bookmark.svg";
import ChatSVG from "src/main/assets/colorfull-icons/chat.svg";
import HomeSVG from "src/main/assets/colorfull-icons/home.svg";
import MenuSVG from "src/main/assets/colorfull-icons/menu.svg";
import SettingsSVG from "src/main/assets/colorfull-icons/setting.svg";
import {
  homeFactory,
  menuFactory,
  messagesFactory,
  propertyDetailsFactory,
  settingsFactory,
} from "../factories";

type AppRoutesTypes = {
  home: undefined;
  favorites: undefined;
  menu: undefined;
  messages: undefined;
  settings: undefined;
};

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutesTypes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesTypes>();

export const AppRoutes: React.FC = () => {
  const { sizes, colors, radii } = useTheme();
  const iconSize = sizes[6];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary.blue[100],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarIconStyle: {
          marginBottom: Platform.OS === "android" ? undefined : sizes[4],
        },
        tabBarStyle: {
          borderTopRightRadius: radii["3xl"],
          borderTopLeftRadius: radii["3xl"],
          backgroundColor: colors.primary.bg.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : undefined,
          marginTop: Platform.OS === "android" ? undefined : sizes[4],
          paddingTop: Platform.OS === "android" ? sizes[9] : 0,
          paddingBottom: sizes[9],
        },
      }}
    >
      <Screen
        name="home"
        children={() => homeFactory()}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              justifyContent="center"
              alignItems="center"
              width={iconSize / 2}
              height={iconSize / 2}
              bgColor={focused ? color : "transparent"}
              rounded="2xl"
            >
              <HomeSVG width={iconSize} height={iconSize} />
            </Box>
          ),
        }}
      />
      <Screen
        name="favorites"
        children={() => propertyDetailsFactory()}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              justifyContent="center"
              alignItems="center"
              width={iconSize / 2}
              height={iconSize / 2}
              bgColor={focused ? color : "transparent"}
              rounded="2xl"
            >
              <FavoritesSVG width={iconSize} height={iconSize} />
            </Box>
          ),
        }}
      />
      <Screen
        name="menu"
        children={() => menuFactory()}
        options={{
          tabBarIcon: () => (
            <Box
              justifyContent="center"
              alignItems="center"
              width={iconSize / 2}
              rounded="2xl"
            >
              <MenuSVG
                width={iconSize * 7}
                height={iconSize * 7}
                style={{
                  bottom: sizes[5],
                }}
              />
            </Box>
          ),
        }}
      />
      <Screen
        name="messages"
        children={() => messagesFactory()}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              justifyContent="center"
              alignItems="center"
              width={iconSize / 2}
              height={iconSize / 2}
              bgColor={focused ? color : "transparent"}
              rounded="2xl"
            >
              <ChatSVG width={iconSize} height={iconSize} />
            </Box>
          ),
        }}
      />
      <Screen
        name="settings"
        children={() => settingsFactory()}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              justifyContent="center"
              alignItems="center"
              width={iconSize / 2}
              height={iconSize / 2}
              bgColor={focused ? color : "transparent"}
              rounded="2xl"
            >
              <SettingsSVG width={iconSize} height={iconSize} />
            </Box>
          ),
        }}
      />
    </Navigator>
  );
};
