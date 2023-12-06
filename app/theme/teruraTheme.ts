import { createTheme } from "@mui/material/styles";

const teruraTheme = createTheme({
  palette: {
    primary: {
      main: "#BFAF21",
    },
    background: {
      default: "#11dc6e",
    },
    borderColor: {
      main: "#ffd400",
    },
    tableHeader: {
      main: "#ffe77c",
    },
    tableBodyHigthLight :{
       main:"#ffa30f",
       light:"#ffe377",
    },
    cardBg: {
      main: "#ffffff",
      light:"#ffe884"
    },
    fontColor: {
      main: "#3d3d3d",
      light:"#FFFFFF",
      dark: "#000000",
    },
    errorMessage : {
      main : "#ff2d2d"
    }
  },

  typography: {
    h6: {
      color: "#333333",
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
  },
});

export default teruraTheme;
