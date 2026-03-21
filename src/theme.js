import { extendTheme } from "@mui/material";
import { cyan, deepOrange, orange, teal } from "@mui/material/colors";

const theme = extendTheme({
  trello: {
    headerHeight: "58px",
    boardBarHeight: "60px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
        // Đổi 'colors' thành 'palette'
        background: {
          default: "#f9f9f9", // MUI sẽ tự động lấy màu này làm nền trang web
          paper: "#ffffff", // Nền cho các component nổi lên như thẻ Card, Modal
        },
        text: {
          primary: "#121212", // MUI tự động lấy màu này làm màu chữ chính
        },
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
        // Đổi 'colors' thành 'palette'
        background: {
          default: "#212121",
          paper: "#2c2c2c",
        },
        text: {
          primary: "#fff",
        },
      },
    },
  },
});

export default theme;
