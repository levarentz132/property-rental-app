import { Box, useToken } from "@gluestack-ui/themed";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { type ComponentProps, useEffect, useState } from "react";
import { Platform } from "react-native";
import type { SvgProps } from "react-native-svg";
import FavoritesSVG from "src/main/assets/colorfull-icons/bookmark.svg";
import ChatSVG from "src/main/assets/colorfull-icons/chat.svg";
import HomeSVG from "src/main/assets/colorfull-icons/home.svg";
import MenuSVG from "src/main/assets/colorfull-icons/menu.svg";
import SettingsSVG from "src/main/assets/colorfull-icons/setting.svg";
import { useApp } from "src/presentation/hooks/use-app";

import { menuFactory, savedPropertyFactory } from "../factories";
import { makeHomeStackNavigator } from "./stack-home-navigator";
import { makeMessagesStackNavigator } from "./stack-messages-navigator";
import { makeSettingsStackNavigator } from "./stack-settings-navigator";

type AppRoutesTypes = {
  homeTab: undefined;
  favorites: undefined;
  menu: undefined;
  messagesTab: undefined;
  settingsTab: undefined;
};

const makeTabIcon =
  (Icon: React.FC<SvgProps>) =>
  ({
    color,
    focused,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => (
    <Box
      justifyContent="center"
      alignItems="center"
      width={size * 2}
      height={size * 2}
      bgColor={focused ? color : "transparent"}
      rounded="$2xl"
    >
      <Icon width={size} height={size} />
    </Box>
  );

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutesTypes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesTypes>();

export const AppRoutes: React.FC = () => {
  const {
    system: { bottomTabs },
  } = useApp();
  const iconSize = useToken("space", "5");
  const menuSvgPosition = useToken("space", "5");
  const tabBarActiveTintColor = useToken("colors", "blue100");
  const tabBarInactiveTintColor = useToken("colors", "gray200");
  const backgroundColor = useToken("colors", "white");
  const backgroundApp = useToken("colors", "backgroundApp");
  const [bottomTabDisplay, setBottomTabDisplay] = useState<"flex" | "none">(
    "flex",
  );

  useEffect(() => {
    bottomTabs.handleAddRefToActivate(() => {
      setBottomTabDisplay("flex");
    });
    bottomTabs.handleAddRefToInactive(() => {
      setBottomTabDisplay("none");
    });
  }, []);

  const screens: ComponentProps<typeof Screen>[] = [
    {
      name: "homeTab",
      children: () => makeHomeStackNavigator(),
      options: {
        tabBarIcon: makeTabIcon(HomeSVG),
      },
    },
    {
      name: "favorites",
      children: () => savedPropertyFactory(),
      options: {
        tabBarIcon: makeTabIcon(FavoritesSVG),
      },
    },
    {
      name: "menu",
      children: () => menuFactory(),
      options: {
        tabBarIcon: () => (
          <Box
            justifyContent="center"
            alignItems="center"
            width={iconSize / 2}
            height={1}
            rounded="$2xl"
          >
            <MenuSVG
              width={iconSize * 8}
              height={iconSize * 8}
              style={{
                bottom: menuSvgPosition,
              }}
            />
          </Box>
        ),
      },
    },
    {
      name: "messagesTab",
      children: () => makeMessagesStackNavigator(),
      options: {
        tabBarIcon: makeTabIcon(ChatSVG),
        lazy: false,
      },
    },
    {
      name: "settingsTab",
      children: () => makeSettingsStackNavigator(),
      options: {
        tabBarIcon: makeTabIcon(SettingsSVG),
      },
    },
  ];

  return (
    <Navigator
      initialRouteName="homeTab"
      sceneContainerStyle={{
        backgroundColor: backgroundApp,
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle: {
          display: bottomTabDisplay,
          backgroundColor,
          borderTopWidth: 0,
          height: iconSize * (Platform.OS === "android" ? 4 : 6),
        },
      }}
    >
      {screens.map((screen) => (
        <Screen key={screen.name} {...screen} />
      ))}
    </Navigator>
  );
};
