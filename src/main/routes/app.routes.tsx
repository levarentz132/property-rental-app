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
  settingsFactory,
} from "../factories";
import { makeStackNavigator } from "./stack-navigator";

type AppRoutesTypes = {
  homeTab: undefined;
  favorites: undefined;
  menu: undefined;
  messages: undefined;
  settings: undefined;
};

type ScreenProps = React.ComponentProps<typeof Screen> & {
  svg: React.FC<SvgProps>;
};

const screens: ScreenProps[] = [
  {
    name: "homeTab",
    component: () => makeStackNavigator(),
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
    name: "settings",
    component: () => settingsFactory(),
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
  const marginBottomOnIos = useToken("space", "4");
  const marginTopOnIos = useToken("space", "4");
  const paddingTopOnAndroid = useToken("space", "4");
  const paddingBottom = useToken("space", "9");
  const menuSvgPosition = useToken("space", "5");
  const tabBarActiveTintColor = useToken("colors", "blue100");
  const tabBarInactiveTintColor = useToken("colors", "gray200");
  const borderRadius = useToken("radii", "3xl");
  const backgroundColor = useToken("colors", "white");
  return (
    <Navigator
      initialRouteName="homeTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarIconStyle: {
          marginBottom:
            Platform.OS === "android" ? undefined : marginBottomOnIos,
        },
        tabBarStyle: {
          display: "flex",
          borderTopRightRadius: borderRadius,
          borderTopLeftRadius: borderRadius,
          backgroundColor,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : undefined,
          marginTop: Platform.OS === "android" ? undefined : marginTopOnIos,
          paddingTop: Platform.OS === "android" ? paddingTopOnAndroid : 0,
          paddingBottom,
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
                    width={iconSize * 7}
                    height={iconSize * 7}
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
