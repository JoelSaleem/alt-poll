// theme.js
// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      accent: "#63B3ED",
      main: "#1ca4ff",
      shadow: "#1A365D",
      superAccent: "#BEE3F8",
    },
  },
});
export default theme;
