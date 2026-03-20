import { extendTheme } from "@mui/material";

const theme = extendTheme({
  trello: {
    headerHeight: "48px",
    boardBarHeight: "58px",
  },
  colorSchemes: {
    light: {
      palette: {
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
