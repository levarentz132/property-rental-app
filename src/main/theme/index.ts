import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: {
      green: {
        700: "#54DEAC",
        500: "#7FE6C1",
        300: "#A9EFD5",
        100: "#D4F7EA",
      },
      orange: {
        700: "#F3837B",
        500: "#F6A29C",
        300: "#F9C1BD",
        100: "#FCE0DE",
      },
      blue: {
        800: "#4A43EC",
        700: "#6964EB",
        500: "#8884EA",
        300: "#A7A4E7",
        100: "#C6C4E6",
      },
      bg: {
        light: "#F1F1F1",
        white: "#FFFFFF",
      },
    },
    secondary: {
      sky: "#39D1F2",
      lime: "#92CB92",
      orange: "#F59762",
      cyan: "#00F8FF",
      lightRed: "#EA918B",
      lightSky: "#AFE0FF",
    },
    shade: {
      lightCyan: "#D6FEFF",
      lightOrange: "#FFE2D4",
      lightPurple: "#7F88E5",
    },
    textColor: {
      dark: "#333333",
      grayDark: "#828282",
      grayLight: "#BDBDBD",
      white: "#FCFCFC",
    },
    stateColor: {
      success: "#27AE60",
      warning: "#E2B93B",
      danger: "#EB5757",
      info: "#2F80ED",
    },
  },
  fonts: {
    body: "Inter_400Regular",
    heading: "Inter_700Bold",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148,
  },
});

type CustomThemeType = typeof THEME;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
