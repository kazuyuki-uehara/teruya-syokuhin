"use client";
// react components
import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
// mui components
import {
  Paper,
  Typography,
  Grid,
  Stack,
  Box,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// r-h-f components
import { useForm, useFieldArray, Controller } from "react-hook-form";
// dayJs components
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
// custom components
import DropDown from "@/app/_components/DropDown";
import ComboBox from "@/app/_components/combo-box";
// other components
import { data1, navCredentials, tokuisakiData } from "@/app/const";
import { compose } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import useSWR from "swr";

interface Props {
  setTokuisakiCodeUpdate: React.Dispatch<React.SetStateAction<string>>;
  setTokuisakiNameUpdate: React.Dispatch<React.SetStateAction<string>>;
  setJyuchuYmdUpdate: React.Dispatch<React.SetStateAction<string>>;
  tokuisakiCodeUpdate: string;
}

const fetchDataTokuisaki = async () => {
  try {
    const res = await fetch("api/school-lunch-data/tokuisaki", {
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

const CreateUpdataBar = ({
  setTokuisakiCodeUpdate,
  setTokuisakiNameUpdate,
  setJyuchuYmdUpdate,
}: Props) => {
  const [tokuisakiArr, setTokuisakiArr] = useState([]);
  // api call
  useEffect(() => {
    fetchDataTokuisaki()
      .then((r) => {
        // console.log(r.result)
        setTokuisakiArr(r.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item md={4.5}>
        <Paper sx={{ py: 1.5, px: 6, mb: 3, backgroundColor: "cardBg.light" }}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle2" sx={{ width: 100 }}>
              得意先
            </Typography>
            <ComboBox
              // error={errors.formData?.syohinCd}
              // data={tokuisakiData}
              data={tokuisakiArr}
              onChange={(e, value: any) => {
                setTokuisakiCodeUpdate(value.tokuisakiCd);
                setTokuisakiNameUpdate(value.touisakiName);
              }}
              minWidthMd="80%"
            />
          </Stack>
        </Paper>
      </Grid>
      <Grid item md={4.5}>
        <Paper sx={{ py: 1.5, px: 6, mb: 3, backgroundColor: "cardBg.light" }}>
          <Stack direction="row" alignItems="center">
            <Typography
              variant="subtitle2"
              sx={{ width: 100 }}
              color="fontColor.main"
            >
              受注日
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              <DatePicker
                format="YYYY/MM/DD"
                slotProps={{ textField: { size: "small" } }}
                onChange={(date :any) => {
                  setJyuchuYmdUpdate(dayjs(date).format("YYYY-MM-DD"))
                }}
              />
            </LocalizationProvider>
          </Stack>
        </Paper>
      </Grid>
      <Grid item md></Grid>
    </Grid>
  );
};

export default CreateUpdataBar;
