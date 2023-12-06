"use client";
import React from "react";
// import { useRouter } from "next/router";
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
import { data1, data2, data3, data4, day } from "../const";
import DropDown from "../_components/DropDown";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ComboBox from "../_components/combo-box";
import "dayjs/locale/ja";
import {
  ProductCD,
  CustomerCD,
  materialCD,
  calculSettings,
} from "../const/coversion-data";

import { useSelector, useDispatch } from "react-redux";
import { setConversionData } from "../store/features/services/conversionTableSlice";
import { RootState } from "../store";
import AlertBox from "../_components/alertBox";

type FormValues = {
  formData: {
    productName: string;
    kgUnit: string | number;
    customerName: string;
    dayOfWeak: string;
    materialCD: string;
    calSettings: string;
    bagCalStandardUnit: number;
    kilo: number;
    counterUnit: number;
    loss: number;
    date: Dayjs | string | Date;
  }[];
};

let pl = 0;

export default function ConversionTable() {
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handelAlertBox = () => {
    setAlertOpen(true);
  };

  const handelAlertClose = () => {
    setAlertOpen(false);
  };

  const router = useRouter();
  const { register, control, handleSubmit, reset, watch } = useForm<FormValues>(
    {
      defaultValues: {
        formData: [
          {
            productName: "",
            kgUnit: "",
            customerName: "",
            dayOfWeak: "",
            materialCD: "",
            calSettings: "",
            bagCalStandardUnit: 5,
            kilo: 0,
            counterUnit: 0,
            loss: 0,
            date: dayjs(null),
          },
        ],
      },
    }
  );

  const dispatch = useDispatch();
  const Submit = (data: any) => {
    console.log("conversion-table : ",data);
    dispatch(setConversionData(data.formData));
  };

  const [selectedValue, setSelectedValue] = React.useState("1");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Container>
        <Stack
          direction="row"
          sx={{ marginBottom: 4 }}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="bold" color="fontColor.main">
            変換テーブル
          </Typography>
        </Stack>

        <Paper elevation={2} sx={{ backgroundColor: "cardBg.main" }}>
          <form onSubmit={handleSubmit(Submit)}>
            {/* table header */}
            <Grid
              container
              spacing={1}
              sx={{
                dispaly: "flex",
                alignItems: "center",
                paddingX: 2,
                paddingY: 3,
              }}
            >
              <Grid item md={6}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="left"
                    sx={{ color: "fontColor.dark", width: "50%" }}
                  >
                    商品
                  </Typography>

                  <Controller
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ComboBox
                          data={ProductCD}
                          minWidthMd="80%"
                          onChange={onChange}
                        />
                      );
                    }}
                    name={`formData.productName` as any}
                    control={control}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="center"
                    sx={{ color: "fontColor.dark", width: "50%" }}
                  >
                    単位
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="left"
                    sx={{
                      width: "100%",
                      color: "fontColor.dark",
                      borderBottom: "1px solid gray",
                    }}
                    color="primary.main"
                  >
                    Navi
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="center"
                    sx={{ color: "fontColor.dark", width: "40%" }}
                  >
                    Kg単位
                  </Typography>

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name={`formData.kgUnit` as any}
                  />
                </Stack>
              </Grid>
            </Grid>

            {/* table body */}
            <Grid
              container
              spacing={1}
              sx={{
                dispaly: "flex",
                alignItems: "center",
                mt: 1,
                px: 2,
              }}
            >
              <Grid item md={8}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="left"
                    sx={{ color: "fontColor.dark", pl: pl, width: "50%" }}
                  >
                    得意先名
                  </Typography>
                  <Controller
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ComboBox
                          data={CustomerCD}
                          minWidthMd="85%"
                          // onChange={onChange}
                          onChange={(_, selectedValue: string) => {
                            onChange(selectedValue);
                            // handleInputChanges(selectedValue);
                          }}
                        />
                      );
                    }}
                    name={`formData.customerName` as any}
                    control={control}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="center"
                    sx={{ width: "30%", color: "fontColor.dark", pl: pl }}
                  >
                    製造条件
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="left"
                    sx={{
                      width: "50%",
                      color: "fontColor.dark",
                      borderBottom: "1px solid gray",
                    }}
                    color="primary.main"
                  >
                    1:配送条件有
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            {/* row 2 radio button group */}
            <Grid
              container
              sx={{
                dispaly: "flex",
                alignItems: "flex-end",
                py: 3,
                px: 2,
              }}
            >
              <Grid item md>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    <Typography
                      fontWeight="bold"
                      variant="subtitle1"
                      sx={{ color: "fontColor.dark" }}
                    >
                      製造条件
                    </Typography>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    defaultValue="1"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="曜日指定"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="指定日"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {selectedValue === "1" ? (
                <Grid item md>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="subtitle1"
                      align="left"
                      sx={{ color: "fontColor.dark", pl: pl, width: "50%" }}
                    >
                      曜日指定
                    </Typography>
                    <Controller
                      render={({ field: { value, onChange, onBlur } }) => {
                        return (
                          <DropDown
                            variant="outlined"
                            width="100%"
                            value={value}
                            data={day}
                            handleChange={(e) => onChange(e.target.value)}
                          />
                        );
                      }}
                      name={`formData.dayOfWeak` as any}
                      control={control}
                    />
                  </Stack>
                </Grid>
              ) : (
                <Grid item md>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      align="left"
                      sx={{ color: "fontColor.dark", pl: pl, width: "50%" }}
                    >
                      指定日
                    </Typography>
                    <Controller
                      name={`formData.date` as any}
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          adapterLocale="ja"
                        >
                          <DatePicker
                            format="YYYY/MM/DD"
                            value={value}
                            onChange={(date) => onChange(date)}
                            slotProps={{
                              textField: {
                                size: "small",
                              },
                            }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Stack>
                </Grid>
              )}
              <Grid item md></Grid>
              <Grid item md></Grid>
            </Grid>
            {/* row 3 */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="primary.main"
              sx={{ pl: pl + 2.2, mt: 3 }}
            >
              生地製造
            </Typography>
            <Grid
              container
              spacing={1}
              sx={{
                dispaly: "flex",
                alignItems: "center",
                px: 2,
              }}
            >
              <Grid item md={8}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="left"
                    sx={{ width: "50%", color: "fontColor.dark", pl: pl }}
                  >
                    中間品
                  </Typography>
                  <Controller
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ComboBox
                          data={materialCD}
                          minWidthMd="85%"
                          onChange={onChange}
                        />
                      );
                    }}
                    name={`formData.materialCD` as any}
                    control={control}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="center"
                    sx={{ width: "50%", color: "fontColor.dark" }}
                  >
                    計算設定
                  </Typography>

                  <Controller
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <DropDown
                          variant="outlined"
                          width="90%"
                          value={value}
                          data={calculSettings}
                          handleChange={(e) => onChange(e.target.value)}
                        />
                        // <ComboBox data={calculSettings} onChange={onChange}/>
                      );
                    }}
                    name={`formData.calSettings` as any}
                    control={control}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" py={3} px={2}>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    align="left"
                    sx={{ width: "50%", color: "fontColor.dark" }}
                  >
                    袋計算基準単位
                  </Typography>

                  <Controller
                    control={control}
                    defaultValue ={5}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name={`formData.bagCalStandardUnit` as any}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="center"
                    sx={{ width: "50%", color: "fontColor.dark" }}
                  >
                    kg/板
                  </Typography>

                  <Controller
                    control={control}
                    defaultValue ={0}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name={`formData.kilo` as any}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="center"
                    sx={{ width: "50%", color: "fontColor.dark", pl: pl }}
                  >
                    個/板
                  </Typography>
                  <Controller
                  defaultValue ={0}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name={`formData.counterUnit` as any}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="center"
                    sx={{ width: "50%", color: "fontColor.dark" }}
                  >
                    ロス／板
                  </Typography>

                  <Controller
                    control={control}
                    defaultValue={0}
                    // rules={{
                    //   required: true,
                    // }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name={`formData.loss` as any}
                  />
                </Stack>
              </Grid>
              <Grid item md></Grid>
            </Grid>
            {/* action */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              sx={{ p: 2 }}
            >
              <Button
                variant="contained"
                size="medium"
                // type="submit"
                onClick={() => {}}
                sx={{ color: "white" }}
              >
                クリア
              </Button>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                onClick={handelAlertBox}
                sx={{ color: "white" }}
              >
                登録
              </Button>
            </Stack>
          </form>
        </Paper>
        <AlertBox
          open={alertOpen}
          setOpen={setAlertOpen}
          text="登録しました。"
          submit={handelAlertClose}
        />
      </Container>
    </Box>
  );
}
