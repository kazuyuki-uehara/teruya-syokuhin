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
import BackButton from "../_components/BackButton";

type FormValues = {
  formData: {
    select1: string;
    select2: string;
    input: string;
  }[];

  url: string;
  input: string;
  select: any;
};

const DataRegistration = () => {
  const [drop1, setDrop1] = React.useState("");
  const [drop2, setDrop2] = React.useState("");
  const [isSearch, setIsSearch] = React.useState(false);

  const { register, control, handleSubmit, reset, watch } = useForm<FormValues>(
    {
      defaultValues: {
        formData: [{ select1: "", select2: "", input: "" }],
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
    <Box sx={{ height: "100vh" }}>
      {/* action */}
      <Stack
        direction="row"
        sx={{ marginBottom: 4 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold" color="fontColor.main">
          需要予測データ登録
        </Typography>
      </Stack>
      {/* search */}

      <Paper sx={{ py: 1.5, px: 6, mb: 3, backgroundColor: "cardBg.main" }}>
        <Grid container spacing={10}>
          <Grid item md>
            <DropDown
              label="得意先"
              variant="outlined"
              disableUnderline={false}
              value={drop1}
              data={data1}
              handleChange={(e) => setDrop1(e.target.value as string)}
            />
          </Grid>
          <Grid item md>
            <DropDown
              label="商品"
              variant="outlined"
              disableUnderline={false}
              value={drop2}
              data={data2}
              handleChange={(e) => setDrop2(e.target.value as string)}
            />
          </Grid>
          <Grid item md>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: "small" } }}
                label="納品日"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                size="medium"
                type="submit"
                onClick={() => {
                  setIsSearch(false);
                }}
                sx={{ color: "white" }}
              >
                クリア
              </Button>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                onClick={() => {
                  setIsSearch(true);
                }}
                sx={{ color: "white", ml: 2 }}
              >
                検索
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {isSearch && (
        <>
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
                color="fontColor.main"
              >
                得意先
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                商品
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                納品日
              </Typography>
            </Grid>
            <Grid item md={1.5}></Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                単位
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Button
                onClick={() => {
                  append({
                    select1: "",
                    select2: "",
                    input: "",
                  });
                }}
                variant="contained"
                endIcon={<AddIcon />}
                size="small"
                sx={{ color: "white" }}
              >
                追加
              </Button>
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit(Submit)}>
            {fields.map((field, index) => {
              return (
                <Grid
                  key={field.id}
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
                    <Typography variant="subtitle2" color="fontColor.dark">
                      イオン
                    </Typography>
                  </Grid>
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
                      name={`formData[${index}].select1` as any}
                      control={control}
                    />
                  </Grid>

                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: { size: "small", variant: "outlined" },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={1.5}>
                    <Controller
                      control={control}
                      // rules={{
                      //   required: true,
                      // }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Enter"
                          disableUnderline={true}
                          onChange={onChange}
                          value={value}
                          sx={{ px: 1 }}
                        />
                      )}
                      name={`formData[${index}].input` as any}
                    />
                  </Grid>
                  <Grid item md>
                    <Controller
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <DropDown
                            value={value}
                            data={data2}
                            handleChange={(e) => onChange(e.target.value)}
                          />
                        );
                      }}
                      name={`formData[${index}].select2` as any}
                      control={control}
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
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <BackButton href="/" />
              <Stack direction="row" alignItems="center">
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ color: "white" }}
                >
                  取込み
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ color: "white", ml: 2 }}
                >
                  登録/更新
                </Button>
              </Stack>
            </Stack>
          </form>
        </>
      )}
    </Box>
  );
};

export default DataRegistration;
