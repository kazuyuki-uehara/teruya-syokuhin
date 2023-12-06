"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
interface ComboxBoxProps {
  data?: {}[];
  minWidthMd?: string | number;
  minWidthXs?: string | number;
  label?: string;
  placeHolder?: string;
  defaultValue?: any;
  sx?: any;
  dividerSx?: any;
  textFieldSx?: any;
  onChange?: (_: any, value: string) => void;
  divider?: boolean;
  size?: any;
  inputValue?: any;
  setInputValue?: any;
  error?:any
  value?:any
}
export default function ComboBox({
  minWidthMd = "70%",
  minWidthXs = "100%",
  data = [{ label: "simple" }, { label: "simple2" }],
  placeHolder,
  label,
  defaultValue,
  onChange,
  divider = true,
  size = "small",
  sx,
  dividerSx,
  textFieldSx,
  error = false,
  value
}: ComboxBoxProps) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isBack, setIsBack] = React.useState<boolean>(false);
  return (
    <Autocomplete
      onChange={onChange}
      autoHighlight
      autoSelect
      inputValue={inputValue}
      options={data}
      defaultValue={defaultValue}
      value={value}
    
      onKeyDown={(event) => {
        if (event.key == "Backspace") {
          setIsBack(true);
        } else {
          setIsBack(false);
        }
      }}
      onInputChange={(event: React.SyntheticEvent, newValue: string) => {
        setInputValue(newValue);
      }}
      filterOptions={(options, state) => {
        const displayOptions = options.filter((option: any) =>
          option.label
            .toLowerCase()
            .trim()
            .includes(state.inputValue.toLowerCase().trim())
        );
        if (displayOptions.length == 1) {
          setInputValue(displayOptions[0].label);
        }
        if (isBack) {
          setInputValue(inputValue);
        }
        return displayOptions;
      }}
      sx={{
        minWidth: { md: minWidthMd, xs: minWidthXs },
        ...sx,
      }}
      renderInput={(params) => (
        
        <Box position="relative">
          <TextField
            error = {error}
            {...params}
            size={size}
            placeholder={placeHolder}
            label={label}
            sx={{ ...textFieldSx }}
            // defaultValue='sdifji'
          />
          {divider && (
            <Divider
              orientation="vertical"
              variant="fullWidth"
              flexItem
              sx={{
                position: "absolute",
                top: 7,
                bottom: 7,
                right: 38,
                backgroundColor: "#D1D1D1",
                ...dividerSx,
              }}
            />
          )}
        </Box>
      )}
    />
  );
}





