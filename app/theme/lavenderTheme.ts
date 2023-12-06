import { createTheme } from "@mui/material/styles";

const lavenderTheme = createTheme({
  palette: {
    primary: {
      main: "#a216ff",
    },
    background: {
      default: "#FFFFFF",
    },
    borderColor: {
      main: "#dba5ff",
    },
    tableHeader: {
      main: "#e0b2ff",
    },
    cardBg: {
      main: "#ffffff",
      light:"#dba5ff"
    },
    fontColor: {
      main: "#a216ff",
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

export default lavenderTheme;
