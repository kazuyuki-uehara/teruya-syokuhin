import { createTheme } from "@mui/material/styles";

const tiffanyTheme = createTheme({
  palette: {
    primary: {
      main: "#00baba",
    },
    background: {
      default: "#FFFFFF",
    },
    borderColor: {
      main: "#5effff",
    },
    tableHeader: {
      main: "#a0ffff",
    },
    cardBg: {
      main: "#ffffff",
      light:"#64fcfc"
    },
    fontColor: {
      main: "#00baba",
      dark: "#000000",
    },
  },
  typography: {
    h6: {
      color: "#333333",
    },
    subtitle1: {
      fontSize: 18,
    },
  },
});

export default tiffanyTheme;
