import { Box, useToken } from "@gluestack-ui/themed";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import type { SvgProps } from "react-native-svg";
import FavoritesSVG from "src/main/assets/colorfull-icons/bookmark.svg";
import ChatSVG from "src/main/assets/colorfull-icons/chat.svg";
import HomeSVG from "src/main/assets/colorfull-icons/home.svg";
import MenuSVG from "src/main/assets/colorfull-icons/menu.svg";
import SettingsSVG from "src/main/assets/colorfull-icons/setting.svg";

import {
  menuFactory,
  messagesFactory,
  savedPropertyFactory,
} from "../factories";
import { makeHomeStackNavigator } from "./stack-home-navigator";
import { makeSettingsStackNavigator } from "./stack-settings-navigator";

type AppRoutesTypes = {
  homeTab: undefined;
  favorites: undefined;
  menu: undefined;
  messages: undefined;
  settingsTab: undefined;
};

type ScreenProps = React.ComponentProps<typeof Screen> & {
  svg: React.FC<SvgProps>;
};

const screens: ScreenProps[] = [
  {
    name: "homeTab",
    component: () => makeHomeStackNavigator(),
    svg: HomeSVG,
  },
  {
    name: "favorites",
    component: () => savedPropertyFactory(),
    svg: FavoritesSVG,
  },
  {
    name: "menu",
    component: () => menuFactory(),
    svg: MenuSVG,
  },
  {
    name: "messages",
    component: () => messagesFactory(),
    svg: ChatSVG,
  },
  {
    name: "settingsTab",
    component: () => makeSettingsStackNavigator(),
    svg: SettingsSVG,
  },
];

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutesTypes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesTypes>();

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

export const AppRoutes: React.FC = () => {
  const iconSize = useToken("space", "5");
  const menuSvgPosition = useToken("space", "7");
  const tabBarActiveTintColor = useToken("colors", "blue100");
  const tabBarInactiveTintColor = useToken("colors", "gray200");
  const backgroundColor = useToken("colors", "white");
  const backgroundApp = useToken("colors", "backgroundApp");
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
          display: "flex",
          backgroundColor,
          borderTopWidth: 0,
          height: iconSize * (Platform.OS === "android" ? 4 : 6),
        },
      }}
    >
      {screens.map(({ name, component, svg }) =>
        name === "menu" ? (
          <Screen
            name="menu"
            key="menu"
            children={() => menuFactory()}
            options={{
              tabBarIcon: () => (
                <Box
                  justifyContent="center"
                  alignItems="center"
                  width={iconSize / 2}
                  rounded="$2xl"
                >
                  <MenuSVG
                    width={iconSize * 9}
                    height={iconSize * 9}
                    style={{
                      bottom: menuSvgPosition,
                    }}
                  />
                </Box>
              ),
            }}
          />
        ) : (
          <Screen
            key={name}
            name={name}
            children={component as any}
            options={{
              tabBarIcon: makeTabIcon(svg),
            }}
          />
        ),
      )}
    </Navigator>
  );
};
