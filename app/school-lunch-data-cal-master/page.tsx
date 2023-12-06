"use client";
// react component
import React, { useEffect, useState } from "react";
// mui component
import {
  Paper,
  Typography,
  Grid,
  Stack,
  Box,
  Button,
  TextField,
  Container
} from "@mui/material";
// r-h-f component
import { useForm,Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// custom component
import AlertBox from "../_components/alertBox";
import DropDown from "@/app/_components/DropDown";
import ComboBox from "@/app/_components/combo-box";
// other
import { navCredentials } from "@/app/const/nav-credential";
import { calculSettings } from "@/app/const/coversion-data";

type FormValues = {
  formData: {
    syohinCd: string;
    tani: string | number;
    keisanSettei: String;
    fukuroKijyunchi: number;
  };
};

const fetchDataMstShoHin = async () => {
  try {
    const res = await fetch("/api/school-lunch-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accesss-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(navCredentials),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const SchoolLunchDataCalMaster = () => {
  const [shohinArr, setShohinArr] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    fetchDataMstShoHin()
      .then((r) => {
        console.log("navi data  >>",r.result)
        setShohinArr(r.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      formData: {
        syohinCd: "",
        tani: "",
        keisanSettei: "",
        fukuroKijyunchi: 5,
      },
    },
  });
  // hanle input change
  const handleInputChanges = (selectedValue: any) => {

    if (!selectedValue) {
      setValue("formData.tani", "");
      setValue("formData.syohinCd", "");
    } else {
      setValue("formData.tani", selectedValue.tani);
      setValue("formData.syohinCd", selectedValue.syohinCd);
    }
  };
  // submit
  const onSubmit = async (data: FormValues) => {
    const { formData } = data;
    console.log(">>>>>", formData);
    try {
      // Make API call to 'api/school-lunch-cal'
      const response = await fetch("/api/school-lunch-data/school-lunch-cal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const getData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      setAlertOpen(true);
      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handelAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Container>
        <Paper
          elevation={2}
          sx={{ py: 1.5, px: 6, mb: 3, backgroundColor: "cardBg.main" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container py={5} spacing={5}>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "fontColor.dark", width: "20%" }}
                  >
                    商品
                  </Typography>

                  <Controller
                    rules={{
                      required: "必項目です！",
                    }}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <ComboBox
                          error={errors.formData?.syohinCd}
                          data={shohinArr}
                          onChange={(_, selectedValue: string) => {
                            onChange(selectedValue);
                            handleInputChanges(selectedValue);
                          }}
                          minWidthMd="80%"
                        />
                      );
                    }}
                    name={`formData.syohinCd` as any}
                    control={control}
                  />
                </Stack>
                <Stack
                  justifyContent="center"
                  alignItems="flex-end"
                  sx={{ mt: 1 }}
                >
                  <ErrorMessage
                    errors={errors}
                    name="formData.syohinCd"
                    render={({ message }) => (
                      <Typography variant="subtitle2" color="errorMessage.main">
                        {message}
                      </Typography>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="flex-end"
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    align="left"
                    sx={{ color: "fontColor.dark", width: "25%" }}
                  >
                    単位
                  </Typography>

                  <Controller
                    control={control}
                    rules={{
                      required: "必項目です！",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        // required
                        error={errors.formData?.tani ? true : false}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={onChange}
                        value={value}
                        name="formData.tani"
                      />
                    )}
                    name={`formData.tani` as any}
                  />
                </Stack>
                <Stack
                  justifyContent="center"
                  alignItems="flex-end"
                  sx={{ mt: 1 }}
                >
                  <ErrorMessage
                    errors={errors}
                    name="formData.tani"
                    render={({ message }) => (
                      <Typography variant="subtitle2" color="errorMessage.main">
                        {message}
                      </Typography>
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item md>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "fontColor.dark", width: "20%" }}
                  >
                    計算設定
                  </Typography>

                  <Controller
                    rules={{
                      required: "必項目です！",
                    }}
                    render={({ field: { value, onChange, onBlur } }) => {
                      return (
                        <DropDown
                          error={errors.formData?.keisanSettei}
                          variant="outlined"
                          value={value}
                          data={calculSettings}
                          handleChange={(e) => onChange(e.target.value)}
                        />
                      );
                    }}
                    name={`formData.keisanSettei` as any}
                    control={control}
                  />
                </Stack>
                <Stack
                  justifyContent="center"
                  alignItems="flex-end"
                  sx={{ mt: 1 }}
                >
                  <ErrorMessage
                    errors={errors}
                    name="formData.keisanSettei"
                    render={({ message }) => (
                      <Typography variant="subtitle2" color="errorMessage.main">
                        {message}
                      </Typography>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item md>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    align="left"
                    sx={{ color: "fontColor.dark", width: "25%" }}
                  >
                    袋計算基準単位
                  </Typography>

                  <Controller
                    rules={{
                      required: "必項目です！",
                      maxLength: 3,
                    }}
                    control={control}
                    defaultValue={5}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextField
                        error={errors.formData?.fukuroKijyunchi ? true : false}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                        onChange={onChange}
                        value={value}
                      />
                    )}
                    name={`formData.fukuroKijyunchi` as any}
                  />
                </Stack>
                <Stack
                  justifyContent="center"
                  alignItems="flex-end"
                  sx={{ mt: 1 }}
                >
                  <ErrorMessage
                    errors={errors}
                    name="formData.fukuroKijyunchi"
                    render={({ message }) => (
                      <Typography variant="subtitle2" color="errorMessage.main">
                        {message}
                      </Typography>
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              sx={{ py: 3 }}
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
                sx={{ color: "white" }}
              >
                登録／更新
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
      <AlertBox
        open={alertOpen}
        setOpen={setAlertOpen}
        text="登録しました。"
        submit={handelAlertClose}
      />
    </Box>
  );
};

export default SchoolLunchDataCalMaster;
