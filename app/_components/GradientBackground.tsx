import React from "react";
import Box from "@mui/material/Box";

import {
  teruraTheme,
  defaultTheme,
  tiffanyTheme,
  lavenderTheme,
  sweetTheme,
  darkTheme,
} from "../theme";

interface Props {
  theme: any;
  children: React.ReactNode;
  height?:string | number;
}

export default function GradientBackground({ theme, children,height="auto" }: Props) {
  let bgGradient = "";
  if (theme === teruraTheme) {
    // bgGradient = "linear-gradient(to right, #fffcea, #fff1a5)";
    bgGradient = "#fff1a5";
  } else if (theme === defaultTheme) {
    bgGradient = "linear-gradient(to right, #e0eafc, #cfdef3)";
  } else if (theme === tiffanyTheme) {
    bgGradient = "linear-gradient(to right, #c4fcfc, #d9fced)";
  } else if (theme === lavenderTheme) {
    bgGradient = "linear-gradient(to right, #cfdcfc, #e4c2fc)";
  } else if (theme === sweetTheme) {
    bgGradient = "linear-gradient(to right, #ffedf6, #ffc4e1)";
  }else if (theme === darkTheme) {
    bgGradient = "linear-gradient(to right, #250f35, #11001e)";
  }
  
  return (
    <Box
      sx={{
        background: bgGradient,
        paddingY: 2,
        height : height
      }}
    >
      {children}
    </Box>
  );
}
