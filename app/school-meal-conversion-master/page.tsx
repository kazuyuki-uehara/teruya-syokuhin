"use client";
import React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { useSearchParams } from "next/navigation";
import GradientBackground from "../_components/GradientBackground";
import { Typography } from "@mui/material";
import MenuCard from "../_components/MenuCard";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Autocomplete from "@mui/material/Autocomplete";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { data1, data2, data3, data4 } from "../const";
import DropDown from "../_components/DropDown";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type FormValues = {
  formData: {
    select: string;
    input: string;
  }[];
};

const SchoolMealData = () => {
  const { register, control, handleSubmit, reset, watch } = useForm<FormValues>(
    {
      defaultValues: {
        formData: [{ select: "", input: "" }],
      },
    }
  );

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "formData",
    }
  );

  const Submit = (data: any) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      {/* action */}
      <Stack
        direction="row"
        sx={{ marginBottom: 4 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          学校給食換算マスタ
        </Typography>
      </Stack>
      {/* search */}

      <Box
        sx={{
          width: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "65%" }}>
          <Grid
            container
            sx={{
              mb: 2,
              "& > div": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                商品マス
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                基準数（Kg/1袋）
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Button
                onClick={() => {
                  append({
                    select: "",
                    input: "",
                  });
                }}
                variant="contained"
                endIcon={<AddIcon />}
                size="small"
                sx={{ color: "white" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit(Submit)}>
            {fields.map((field, index) => {
              return (
                <Grid
                  key={field.id}
                  // width="50%"
                  container
                  sx={{
                    "--Grid-borderWidth": "1px",
                    borderColor: "divider",
                    "& > div": {
                      borderTop: "var(--Grid-borderWidth) solid",
                      borderLeft: "var(--Grid-borderWidth) solid",
                      borderRight: "var(--Grid-borderWidth) solid",
                      borderBottom: "var(--Grid-borderWidth) solid",
                      borderColor: "#666666",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <Grid item md>
                    <Controller
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <DropDown
                            value={value}
                            data={data1}
                            handleChange={(e) => onChange(e.target.value)}
                          />
                        );
                      }}
                      name={`formData[${index}].select` as any}
                      control={control}
                    />
                  </Grid>
                  <Grid item md>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          disableUnderline={true}
                          onChange={onChange}
                          value={value}
                          sx={{ px: 1 }}
                        />
                      )}
                      name={`formData[${index}].input` as any}
                    />
                  </Grid>
                  <Grid
                    item
                    md={1}
                    sx={{
                      "--Grid-borderWidth": "0px",
                    }}
                  >
                    {index !== 0 && (
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <RemoveCircleIcon sx={{ color: "#ff4444" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              );
            })}
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ color: "white" }}
              >
                登録/更新
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SchoolMealData;
