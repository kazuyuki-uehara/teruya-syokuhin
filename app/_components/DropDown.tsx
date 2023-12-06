import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface Props {
  value: string;
  data: { value: number; name: string }[];
  fullWidth?: boolean;
  width?: string | number;
  variant?: any;
  disableUnderline?: boolean;
  label?: string;
  handleChange: (event: SelectChangeEvent) => void;
  sx?: any;
  defaultValue?: any;
  error?: any;
}

export default function DropDown({
  value,
  data,
  handleChange,
  fullWidth = true,
  width = "100%",
  disableUnderline = true,
  variant = "standard",
  label,
  sx,
  defaultValue,
  error = false,
}: Props) {
  return (
    <FormControl fullWidth={fullWidth}>
      {label && (
        <InputLabel id="demo-simple-select-label" size="small">
          {label}
        </InputLabel>
      )}
      <Select
        error={error}
        size="small"
        variant={variant}
        disableUnderline={disableUnderline}
        label={label}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        sx={{ px: 1, width: width, ...sx }}
        defaultValue={defaultValue}
      >
        {data.map((d) => {
          return (
            <MenuItem key={d.value} value={d.value}>
              {d.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
