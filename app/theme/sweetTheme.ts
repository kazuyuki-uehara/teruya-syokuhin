import { createTheme } from "@mui/material/styles";

const sweetTheme = createTheme({
  palette: {
    fontColor: {
      main: "#ff56a5",
      dark: "#000000",
    },
    primary: {
      main: "#ff56a5",
    },
    background: {
      default: "#FFFFFF",
    },
    borderColor: {
      main: "#ff9bcb",
    },
    tableHeader: {
      main: "#fcbada",
    },
    cardBg: {
      main: "#ffffff",
      light:"#fcabd1"
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

export default sweetTheme;
