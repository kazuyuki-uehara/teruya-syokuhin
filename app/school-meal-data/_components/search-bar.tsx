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

dayjs.extend(utc);

type FormValues = {
  formData: {
    tokuisakiCd: string;
    jyuchuYmd: Date;
    nouhinYmd: Date;
  };
};

interface Props {
  encodeSearchQuery?: string;
  setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>;
  naviSearchLoading? : boolean;
  setNaviSearchLoading:React.Dispatch<React.SetStateAction<boolean>>;
}



// const fetchSearchData = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed search data");
//   }
//   return response.json();
// };

const SearchBar = ({
  encodeSearchQuery,
  setShouldFetch,
  naviSearchLoading,
  setNaviSearchLoading
}: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      formData: {
        tokuisakiCd:"",
        jyuchuYmd:new Date(""),
        nouhinYmd:new Date("")
      },
    },
  });
  const [drop1, setDrop1] = useState("");
  const [tokuisakiArr, setTokuisakiArr] = useState([]);
  // const [naviSearchLoading, setNaviSearchLoading] = useState(false);
  const router = useRouter();


  const fetchDataTokuisaki = async () => {
    setNaviSearchLoading(true)
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
    }finally{
      setNaviSearchLoading(false)
    }
  };
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

  // hanle input change
  const handleInputChanges = (selectedValue: any) => {
    if (!selectedValue) {
      setValue("formData.tokuisakiCd", "");
    } else {
      setValue("formData.tokuisakiCd", selectedValue.tokuisakiCd);
    }
  };

  // submit
  const onSubmit = async (entrydata: FormValues) => {
    const { formData } = entrydata;
    let tokuisakiSearchData = [];
    const obj = {
      tokuisakiCd: formData.tokuisakiCd,
      jyuchuYmd: dayjs(formData.jyuchuYmd).format("YYYY-MM"),
      nouhinYmd: dayjs(formData.nouhinYmd).format("YYYY-MM-DD"),
    };
    tokuisakiSearchData.push(obj);
    console.log(">>>>>", obj);
    const tokuisakiCd = encodeURI(obj.tokuisakiCd);
    const jyuchuYmd = encodeURI(obj.jyuchuYmd);
    const nouhinYmd = encodeURI(obj.nouhinYmd)
    router.push(`/school-meal-data?q=${tokuisakiCd}&ym=${jyuchuYmd}&ymd=${nouhinYmd}`);
    setShouldFetch(true);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ py: 1.5, px: 6, mb: 3, backgroundColor: "cardBg.main" }}>
        <Grid container spacing={5}>
          <Grid item md={4}>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" sx={{ width: 100 }}>
                得意先
              </Typography>
              <Controller
                rules={{
                  // required: "必項目です！",
                  required: true,
                }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <ComboBox
                      error={errors.formData?.tokuisakiCd}
                      // data={tokuisakiData}
                      data={tokuisakiArr}
                      onChange={(_, selectedValue: string) => {
                        onChange(selectedValue);
                        handleInputChanges(selectedValue);
                      }}
                      minWidthMd="80%"
                    />
                  );
                }}
                name={`formData.tokuisakiCd` as any}
                control={control}
              />
            </Stack>
          </Grid>
          <Grid item md>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" sx={{ width: 100 }}>
                受注月
              </Typography>

              <Controller
                name={`formData.jyuchuYmd` as any}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => {
                  // console.log(value)
                  return (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="ja"
                    >
                      <DatePicker
                        views={["year", "month"]}
                        format="YY/MM"
                        // closeOnSelect={false}
                        value={dayjs(value)}
                        onChange={(date) => onChange(date)}
                        slotProps={{
                          textField: {
                            size: "small",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  );
                }}
              />
            </Stack>
          </Grid>
          <Grid item md>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" sx={{ width: 100 }}>
                納品日
              </Typography>
              <Controller
                name={`formData.nouhinYmd` as any}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="ja"
                    >
                      <DatePicker
                        views={["year", "month", "day"]}
                        value={dayjs(value)}
                        onChange={(date) => {
                          onChange(date);
                        }}
                        slotProps={{
                          textField: {
                            size: "small",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  );
                }}
              />
            </Stack>
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
                sx={{ color: "white" }}
              >
                クリア
              </Button>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ color: "white", ml: 2 }}
              >
                検索
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default SearchBar;
