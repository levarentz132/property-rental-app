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
import { SvgProps } from "react-native-svg";

type AppRoutesTypes = {
  home: undefined;
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
    name: "home",
    component: () => homeFactory(),
    svg: HomeSVG,
  },
  {
    name: "favorites",
    component: propertyDetailsFactory,
    svg: FavoritesSVG,
  },
  {
    name: "menu",
    component: menuFactory,
    svg: MenuSVG,
  },
  {
    name: "messages",
    component: messagesFactory,
    svg: ChatSVG,
  },
  {
    name: "settings",
    component: settingsFactory,
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
  }) => {
    return (
      <Box
        justifyContent="center"
        alignItems="center"
        width={size * 2}
        height={size * 2}
        bgColor={focused ? color : "transparent"}
        rounded="2xl"
      >
        <Icon width={size} height={size} />
      </Box>
    );
  };

export const AppRoutes: React.FC = () => {
  const { sizes, colors, radii } = useTheme();
  const iconSize = sizes[6];
  return (
    <Navigator
      initialRouteName="home"
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
      {screens.map(({ name, component, svg }) => {
        return name === "menu" ? (
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
        ) : (
          <Screen
            key={name}
            name={name}
            children={component as any}
            options={{
              tabBarIcon: makeTabIcon(svg),
            }}
          />
        );
      })}
    </Navigator>
  );
};
