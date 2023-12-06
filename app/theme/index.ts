import darkTheme from "./darkTheme";
import defaultTheme from "./defaultTheme";
import lavenderTheme from "./lavenderTheme";
import sweetTheme from "./sweetTheme";
import teruraTheme from "./teruraTheme";
import tiffanyTheme from "./tiffanyTheme";


declare module '@mui/material/styles' {
    interface Palette {
      fontColor: Palette['primary'];
      borderColor :Palette['primary'];
      backgroundliner : Palette['primary'];
      tableHeader :  Palette['primary'];
      cardBg : Palette['primary'];
      tableBody : Palette['primary'];
      tableBodyHigthLight : Palette['primary'];
      errorMessage:Palette['primary'];
    }
  
    interface PaletteOptions {
      fontColor?: PaletteOptions['primary'];
      borderColor?: PaletteOptions['primary'];
      backgroundliner?: PaletteOptions['primary'];
      tableHeader?: PaletteOptions['primary'];
      cardBg? : PaletteOptions['primary'];
      tableBody? : PaletteOptions['primary'];
      tableBodyHigthLight? : PaletteOptions['primary'];
      errorMessage? : PaletteOptions['primary'];
    }
  }

export {
    defaultTheme,
    tiffanyTheme,
    lavenderTheme,
    sweetTheme,
    teruraTheme,
    darkTheme
}