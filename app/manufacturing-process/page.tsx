"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
    input1: string;
    input2: string;
    input3: string;
    select3: string;
    select4: string;
  }[];
};

const ManufacturingProcess = () => {
  const [isSearch, setIsSearch] = React.useState(false);

  const { register, control, handleSubmit, reset, watch } = useForm<FormValues>(
    {
      defaultValues: {
        formData: [
          {
            select1: "",
            select2: "",
            input1: "",
            input2: "",
            input3: "",
            select3: "",
            select4: "",
          },
        ],
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
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          加工工程
        </Typography>
      </Stack>
      {/* search */}

      <Paper sx={{ py: 1.5, px: 6, mb: 3, backgroundColor: "cardBg.main" }}>
        <Grid
          container
          spacing={10}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item md>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Grid item md>
                <Typography variant="subtitle2" color="fontColor.dark">
                  商品CD
                </Typography>
              </Grid>
              <Grid item md>
                <TextField
                  size="small"
                  variant="outlined"
                  sx={{ width: "225px" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={3}
            >
              <Grid item md>
                <Typography variant="subtitle2" color="fontColor.dark">
                  商品名
                </Typography>
              </Grid>
              <Grid item md>
                <Typography
                  variant="subtitle2"
                  color="fontColor.dark"
                  borderBottom="1px solid gray"
                  sx={{ width: "225px", py: 0.5 }}
                >
                  get from
                </Typography>
              </Grid>
            </Grid>
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
                color="primary.main"
              >
                作業CD
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                作業名
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                作業時間帯
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                作業日
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                工程進捗管理
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                ラベル発行
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                画面
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="primary.main"
              >
                リスト
              </Typography>
            </Grid>
            <Grid item md={1}>
              <Button
                onClick={() => {
                  append({
                    select1: "",
                    select2: "",
                    input1: "",
                    input2: "",
                    input3: "",
                    select3: "",
                    select4: "",
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
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Enter"
                          disableUnderline={true}
                          onChange={onChange}
                          value={value}
                          sx={{ px: 1 }}
                        />
                      )}
                      name={`formData[${index}].input1` as any}
                    />
                  </Grid>
                  <Grid item md>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "fontColor.dark" }}
                    >
                      Tofu
                    </Typography>
                  </Grid>
                  <Grid item md>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Enter"
                          disableUnderline={true}
                          onChange={onChange}
                          value={value}
                          sx={{ px: 1 }}
                        />
                      )}
                      name={`formData[${index}].input2` as any}
                    />
                  </Grid>
                  <Grid item md>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Enter"
                          disableUnderline={true}
                          onChange={onChange}
                          value={value}
                          sx={{ px: 1 }}
                        />
                      )}
                      name={`formData[${index}].input3` as any}
                    />
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
                      name={`formData[${index}].select2` as any}
                      control={control}
                    />
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
                      name={`formData[${index}].select3` as any}
                      control={control}
                    />
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
                      name={`formData[${index}].select4` as any}
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

export default ManufacturingProcess;
