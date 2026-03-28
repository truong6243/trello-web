import { createTheme } from "@mui/material";
// import { blue, cyan, deepOrange, orange, teal } from "@mui/material/colors";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class", // Khai báo dùng CSS variables với class
  },
  trello: {
    headerHeight: "58px",
    boardBarHeight: "60px",
  },
  colorSchemes: {
    light: {
      // palette: {
      //   primary: teal,
      //   secondary: deepOrange,
      // },
    },
    dark: {
      // palette: {
      //   primary: blue,
      //   secondary: orange,
      // },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
          },
        },
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
          // "& .MuiOutlinedInput-notchedOutline": {
          //   borderColor: theme.palette.primary.light,
          // },
          // "&:hover .MuiOutlinedInput-notchedOutline": {
          //   borderColor: theme.palette.primary.main,
          // },
          "& fieldset": {
            borderWidth: "0.5px !important",
          },
        }),
      },
    },
  },
});

export default theme;
