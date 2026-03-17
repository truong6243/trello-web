import { extendTheme } from "@mui/material";

const theme = extendTheme({
  trello: {
    headerHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      colors: {
        background: "#f9f9f9",
        foreground: "#121212",
      },
    },
    dark: {
      colors: {
        background: "#212121",
        foreground: "#fff",
      },
    },
  },
});

export default theme;
