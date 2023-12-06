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
import { data1, data2, data3, data4, data5 } from "../const";
import DropDown from "../_components/DropDown";
import Input from "@mui/material/Input";
import BackButton from "../_components/BackButton";

type FormValues = {
  formData: {
    select1: string;
    select2: string;
    select3: string;
    select4: string;
    select5: string;
    input: string;
    input2: string;
    input3: string;
  }[];

  url: string;
  input: string;
  select: any;
};

const ShipConMasterPage = () => {
  const { register, control, handleSubmit, reset, watch } = useForm<FormValues>(
    {
      defaultValues: {
        formData: [
          {
            select1: "",
            select2: "",
            select3: "",
            input: "",
            select4: "",
            select5: "",
            input2: "",
            input3: "",
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
          出荷製造変換マスタ
        </Typography>
        <Button
          onClick={() => {
            append({
              select1: "",
              select2: "",
              select3: "",
              input: "",
              select4: "",
              select5: "",
              input2: "",
              input3: "",
            });
          }}
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ color: "white" }}
        >
          Add
        </Button>
      </Stack>
      {/* t-head */}
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
            商品マスタ
          </Typography>
        </Grid>
        <Grid item md>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="primary.main"
          >
            製造単位
          </Typography>
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md></Grid>
        <Grid item md={1}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="primary.main"
          >
            単位マスタ
          </Typography>
        </Grid>
        <Grid item md></Grid>
        <Grid item md={1}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="primary.main"
          >
            製造日
          </Typography>
        </Grid>
        <Grid item md={1}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="primary.main"
          >
            歩留まり
          </Typography>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
      {/* t-formData */}
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
                        data={data2}
                        handleChange={(e) => onChange(e.target.value)}
                      />
                    );
                  }}
                  name={`formData[${index}].select2` as any}
                  control={control}
                />
              </Grid>
              <Grid item md={1}>
                <Controller
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <DropDown
                        value={value}
                        data={data3}
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
                  control={control}
                  // rules={{
                  //   required: true,
                  // }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Enter Input"
                      disableUnderline={true}
                      onChange={onChange}
                      value={value}
                      sx={{ px: 1 }}
                    />
                  )}
                  name={`formData[${index}].input` as any}
                />
              </Grid>
              <Grid item md={1}>
                <Controller
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <DropDown
                        value={value}
                        data={data4}
                        handleChange={(e) => onChange(e.target.value)}
                      />
                    );
                  }}
                  name={`formData[${index}].select4` as any}
                  control={control}
                />
              </Grid>
              <Grid item md>
                <Controller
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <DropDown
                        value={value}
                        data={data5}
                        handleChange={(e) => onChange(e.target.value)}
                      />
                    );
                  }}
                  name={`formData[${index}].select5` as any}
                  control={control}
                />
              </Grid>
              <Grid item md={1} sx={{ px: 1 }}>
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
                    />
                  )}
                  name={`formData[${index}].input2` as any}
                />
              </Grid>
              <Grid item md={1} sx={{ px: 1 }}>
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
                    />
                  )}
                  name={`formData[${index}].input3` as any}
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
          <Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{ color: "white" }}
          >
            save
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ShipConMasterPage;
