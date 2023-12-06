import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { defaultTheme, tiffanyTheme, lavenderTheme,sweetTheme,teruraTheme,darkTheme } from "../theme";
import { dark } from "@mui/material/styles/createPalette";

export default function ThemeToggle({ setTheme }: any) {
  const [alignment, setAlignment] = React.useState("default");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: any
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setTheme(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      size="small"
    >
      <ToggleButton value={teruraTheme}>Terura</ToggleButton>
      <ToggleButton value={defaultTheme} >Ocean</ToggleButton>
      <ToggleButton value={tiffanyTheme}>Tiffany</ToggleButton>
      <ToggleButton value={lavenderTheme}>Lavender</ToggleButton>
      <ToggleButton value={sweetTheme}>Sweet</ToggleButton>
      <ToggleButton value={darkTheme}>Dark</ToggleButton>
    </ToggleButtonGroup>
  );
}
