import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    fontColor: {
      main: "#009dff",
      dark: "#000000",
    },
    primary: {
      main: "#009dff",
    },
    background: {
      default: "#fffcea",
    },
    borderColor: {
      main: "#bae4ff",
    },
    tableHeader: {
      main: "#a8ddff",
    },
    cardBg: {
      main: "#ffffff",
      light:"#9fd8f9"
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

export default defaultTheme;
