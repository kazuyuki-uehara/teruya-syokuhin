"use client";
import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { data1, tokuisakiData } from "../const";
import DropDown from "../_components/DropDown";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import BackButton from "../_components/BackButton";
import { order } from "../const/order";
import "dayjs/locale/ja";
import { useState, useEffect, useRef, useMemo } from "react";
import { Zundoukan, Kinugoshi, Fukuro } from "./_components/formulas";
import { useSelector, useDispatch } from "react-redux";
import { setConversionData } from "../store/features/services/conversionTableSlice";
import { RootState } from "../store";
import { calculSettings } from "../const/coversion-data";
import Preview from "./_components/preview";
import { useReactToPrint } from "react-to-print";
import AlertBox from "../_components/alertBox";
import { FormValues } from "./school-meal-data-type";
import SearchBar from "./_components/search-bar";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import utc from "dayjs/plugin/utc";
import { navCredentials } from "@/app/const/nav-credential";
import CreateUpdataBar from "./_components/create-updata-bar";
import { ExcelOutput } from "./_components/excel-export";
import { useWatch } from "react-hook-form";
import NoFormula from "./_components/formulas/no-formula";
import LoadingBox from "./_components/loading-box";


dayjs.extend(utc);

const fetchSearchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed search data");
  }
  return response.json();
};



const biko2Data = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed search data");
  }
  return response.json();
};

const SchoolMealData = () => {
  const [drop1, setDrop1] = React.useState("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState(true);

  const [schoolData, setSchoolDate] = useState([{}]);
  const [searchData, setSearchData] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [schoolLunchData, setSchoolLunchData] = useState([{}]);
  const [naviSearchLoading, setNaviSearchLoading] = useState(false);


  const conversionData = useSelector(
    (state: RootState) => state.conversionTable.conversionData
  );
  const { calSettings } = conversionData;

  const handleAlertBox = () => {
    setAlertOpen(true);
  };

  const handelAlertClose = () => {
    setAlertOpen(false);
  };

  const search = useSearchParams();
  const searchQuary = search?.get("q");
  const searchYm = search?.get("ym");
  const searchYmd = search?.get("ymd");

  const encodeSearchQuary = encodeURI(searchQuary || "");
  const encodeSearchYm = encodeURI(searchYm || "");
  const encodeSearchYmd = encodeURI(searchYmd || "");
  // console.log("search Date : ", encodeSearchYm);

  

  const { data, isLoading } = useSWR(
    !shouldFetch
      ? null
      : `api/school-lunch-data/school-lunch-data-search?q=${encodeSearchQuary}&ym=${searchYm}&ymd=${encodeSearchYmd}`,
    fetchSearchData
  );


  const [csvData, setCsvData] = useState([]);
  const [csvAlertOpen, setCsvAlertOpen] = useState<boolean>(false);

  useEffect(() => {
    const csv = async () => {
      try {
        const res = await fetch(
          `api/school-lunch-data/school-lunch-data-search?q=${encodeSearchQuary}&ym=${searchYm}&ymd=${encodeSearchYmd}`
        );
        const data = await res.json();
        // const { message, final } = data;
        const headers = Object.keys(data[0]);
        const arrayOfArrays: any = [
          headers,
          ...data.map((obj: any) => headers.map((key) => obj[key])),
        ];
        // console.log(arrayOfArrays);
        setCsvData(arrayOfArrays);
      } catch (err) {
        console.log(err);
      }
    };
    csv();
  }, [encodeSearchQuary, searchYm, encodeSearchYmd]);

  const handleCsvAlert = () => {
    setCsvAlertOpen(true);
  };

  const handleCsvClose = () => {
    setCsvAlertOpen(false);
    const exporter = new ExcelOutput();
    const data: any = csvData;
    exporter.addData(data);
    exporter.saveToFile("SampleOutput.csv");
  };

  const [shohinLoading, setShohinLoading] = useState(false)
  // console.log("shohinLoading >>",shohinLoading)
  const fetchDataShohin = async () => {
    const url = `/api/school-lunch-products`
    setShohinLoading(true)
    try {
      const res = await fetch(url, {
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
      setShohinLoading(false)
    }
  }
  const [schoolLunchProducts, setSchoolLunchProducts] = useState([{}])
  useEffect(() => {
    fetchDataShohin()
      .then((r) => {
        // console.log(r.result)
        setSchoolLunchProducts(r.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let syohin: any = [];
  if (schoolLunchProducts) {
    schoolLunchProducts.map((d: any) => {
      const syohinNm = d.shohinNm;
      const syohinCode = d.syohinCd;
      const obj = {
        name: syohinNm,
        value: syohinNm,
        syohinCd: syohinCode,
      };
      syohin.push(obj);
    });
  }

  const { register, control, handleSubmit, reset, watch, getValues, setValue } =
    useForm<FormValues>({
      defaultValues: {
        formData: [],
      },
    });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "formData",
    });


  useEffect(() => {
    if(data) {
      // setLoadingNavi(false)
      let test;
      test = data.map((d: any, index: number) => {
        return {
          id: d.id,
          syohinName: d.syohinName,
          nouhinYmd: d.nouhinYmd,
          teikeisaki: d.teikeisaki,
          suryo: d.suryo,
          kamawari: d.kamawari,
          cut: d.cut,
          bikou1: d.bikou1,
          bikou2: d.bikou2,
          kansanA: d.kansanA,
          kansanB: d.kansanB,
          nouhinsuryo: d.nouhinsuryo,
          cyumonsaZentai: d.cyumonsaZentai,
          cyumonsa1Kama: d.cyumonsa1Kama,
        };
      });
      reset({ formData: test });
      setSchoolLunchData(test);
    }
  }, [data, reset]);
  // console.log('data for preview >>',schoolLunchData)

  const handleAppend = () => {
    append({
      id: "",
      // unitName: "",
      tokuisakiCd: "",
      tokuisakiName: "",
      jyuchuYmd: new Date(""),
      nouhinYmd: new Date(""),
      syohinCd: "",
      syohinName: "",
      teikeisaki: "",
      suryo: 0,
      kamawari: 0,
      cut: "",
      kansanA: 0,
      kansanB: 0,
      nouhinsuryo: 0,
      cyumonsaZentai: 0,
      cyumonsa1Kama: 0,
      bikou1: "",
      bikou2: "data",
      tani: "",
      keisanSettei: 0,
      fukuroKijyunchi: 5,
    });
  };

  const [tokuisakiCodeUpdate, setTokuisakiCodeUpdate] = useState("");
  const [tokuisakiNameUpdate, setTokuisakiNameUpdate] = useState("");
  const [jyuchuYmdUpdate, setJyuchuYmdUpdate] = useState("");
  const [deletedUserIds, setDeletedUserIds] = useState<any>([]);
  const [formData, setFormData] = useState<any>([]);
  const handleDeleteUser = (userId: any) => {
    // ユーザーIDを追加する処理
    setDeletedUserIds([...deletedUserIds, userId]);
  };
  // console.log("delete id >>", deletedUserIds);

  const Submit = async (data: any) => {
    // console.log("submit :", data);
    const { formData } = data;
    // console.log(">>>>>", formData);
    let schoolLunchData: any = [];
    formData.map((d: any) => {
      const obj = {
        id: d.id,
        tokuisakiCd: d.tokuisakiCd,
        tokuisakiName: d.tokuisakiName,
        jyuchuYmd: dayjs(d.jyuchuYmd).format("YYYY-MM-DDTHH:mm:ss[Z]"),
        nouhinYmd: dayjs(d.nouhinYmd).format("YYYY-MM-DDTHH:mm:ss[Z]"),
        syohinCd: d.syohinCd,
        syohinName: d.syohinName,
        teikeisaki: d.teikeisaki,
        suryo: parseFloat(d.suryo),
        kamawari: parseInt(d.kamawari),
        cut: d.cut,
        kansanA: d.kansanA,
        kansanB: d.kansanB,
        nouhinsuryo: d.nouhinsuryo,
        cyumonsaZentai: d.cyumonsaZentai,
        cyumonsa1Kama: d.cyumonsa1Kama,
        bikou1: d.bikou1,
        bikou2: d.bikou2,
      };
      schoolLunchData.push(obj);
    });
    // schoolLunchData.push(deletedUserIds);
    // deletedUserIds.map((d:any)=>{
    //   const obj = {
    //     deletedId : d
    //   }
    //   schoolLunchData.push(obj);
    // })

    console.log("final data >> ", schoolLunchData);
    const url = `/api/school-lunch-data/create-update?tokuisakiCd=${tokuisakiCodeUpdate}&jyuchuYmd=${jyuchuYmdUpdate}&&searchTokuisaki=${searchQuary}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolLunchData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setAlertOpen(true);
    }
  };

  // for preview
  const [previewAlert, setPreviewAlert] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState([{}]);
  const [previewLoading, setPreviewLoading] = useState(true);

  const handlePreviewAlertBox = () => {
    setPreviewAlert(true);
  };

  const openPreview = () => {
    setPreviewAlert(false);
    setPreviewOpen(true);
    setPreviewLoading(true);
    const url = `/api/preview`;
    const url2 = `/api/school-lunch-data/preview?q=${encodeSearchQuary}&ym=${searchYm}&ymd=${encodeSearchYmd}`;
    const getPreviewData = async () => {
      try {
        const res = await fetch(url2);
        const data = await res.json();
        setPreviewData(data.final);
      } catch (err) {
        console.log(err);
      } finally {
        setPreviewLoading(false);
      }
    };
    getPreviewData();
  };

  const [schoolLunchCal, setSchoolLunchCal] = useState([{}]);
  const [schoolLunchCalLoading, setSchoolLunchCalLoading] = useState(true);

  useEffect(() => {
    const url = `api/school-lunch-data/school-lunch-cal`;
    setSchoolLunchCalLoading(true);
    const schoolLunchCal = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log("school-lunch-cal >>",data)
        setSchoolLunchCal(data);
      } catch (err) {
        console.log(err);
      } finally {
        setSchoolLunchCalLoading(false);
      }
    };
    schoolLunchCal();
  }, []);

  const [rerender, setRerender] = useState("");
  const [rerender2, setRerender2] = useState();
  const [rerender3, setRerender3] = useState();
  // console.log("tokuisakiNameUpdate >>", tokuisakiNameUpdate);

  const biko2 = useSWR(`api/bikou2-master/create-update`, biko2Data);

  // console.log("biko2 data >>", biko2.data);
  return (
    <Box sx={{ height: "100%" }}>
      {/* action */}
      <Stack
        direction="row"
        sx={{ marginBottom: 4 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold" color="fontColor.main">
          学校給食データ入力
        </Typography>
      </Stack>

      {/* Search area */}
      <SearchBar 
      setShouldFetch={setShouldFetch} 
      naviSearchLoading = {naviSearchLoading}
      setNaviSearchLoading = {setNaviSearchLoading}
      />
      <CreateUpdataBar
        tokuisakiCodeUpdate={tokuisakiCodeUpdate}
        setTokuisakiCodeUpdate={setTokuisakiCodeUpdate}
        setTokuisakiNameUpdate={setTokuisakiNameUpdate}
        setJyuchuYmdUpdate={setJyuchuYmdUpdate}
      />

      {/* this is previous search area */}
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
            <Grid item md={1.1}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                納品日
              </Typography>
            </Grid>
            <Grid item md={1.6}>
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
                提供先
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                数量
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                単位
              </Typography>
            </Grid>
            <Grid item md textAlign="center">
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                釜割
                <br />
                (等分)
              </Typography>
            </Grid>
            <Grid item md={1} textAlign="center">
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                カット
                <br />
                (切り方)
              </Typography>
            </Grid>
            <Grid item md={2} textAlign="center">
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                Kg個数換算(Kg,袋)
                <br />
                やっこ缶(大。小)
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Grid item md={4}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    納品
                    <br />
                    数量
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    注文差
                    <br />
                    (全体)
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    注文差
                    <br />
                    (１釜)
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={0.8}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                備考 1
              </Typography>
            </Grid>
            <Grid item md={1.2}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="fontColor.main"
              >
                備考 2
              </Typography>
            </Grid>
            <Grid item md={0.5}></Grid>
          </Grid>
          {/* new data */}
          <form onSubmit={handleSubmit(Submit)}>
            {/* dynamit field */}
            <>
              {fields.map((field, index) => {
                setValue(
                  `formData[${index}].tokuisakiCd` as any,
                  tokuisakiCodeUpdate
                );
                setValue(
                  `formData[${index}].tokuisakiName` as any,
                  tokuisakiNameUpdate
                );

                setValue(
                  `formData[${index}].jyuchuYmd` as any,
                  jyuchuYmdUpdate
                );

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
                    <Grid item md={1.1}>
                      <Controller
                        name={`formData[${index}].nouhinYmd` as any}
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => {
                          // console.log(value)
                          return (
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              adapterLocale="ja"
                            >
                              <DatePicker
                                views={["month", "day"]}
                                format="MM/DD (ddd)"
                                // defaultValue={dayjs("2022-12-12")}
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
                    </Grid>
                    <Grid item md={1.6}>
                      <Controller
                        render={({ field: { value, onChange, onBlur } }) => {
                          const syohinCode = syohin.filter(
                            (data: any) => data.name === value
                          );
                          const [filterCode] = syohinCode.map(
                            (data: any) => data.syohinCd
                          );
                          // console.log(filterCode);
                          setValue(
                            `formData[${index}].syohinCd` as any,
                            filterCode
                          );

                          const filterBikou2 = biko2.data.filter(
                            (data: any) =>
                              data.syohinCd === filterCode &&
                              data.tokuisakiCd === tokuisakiCodeUpdate
                          );
                          const [mongon] = filterBikou2.map(
                            (data: any) => data.mongon
                          );
                          setRerender3(mongon);
                          if (mongon) {
                            setValue(
                              `formData[${index}].bikou2` as any,
                              mongon
                            );
                          } else {
                            setValue(`formData[${index}].bikou2` as any, "");
                          }

                          // console.log("mongon >> ", mongon);

                          if (!schoolLunchCalLoading) {
                            let filter = schoolLunchCal.filter(
                              (d: any) => d.syohinCd == filterCode
                            );
                            let [tani] = filter.map((d: any) => d.tani);
                            setRerender(tani);
                            let [keisanSettei] = filter.map(
                              (d: any) => d.keisanSettei
                            );
                            setRerender2(keisanSettei);
                            let [fukuroKijyunchi] = filter.map(
                              (d: any) => d.fukuroKijyunchi
                            );

                            setValue(`formData[${index}].tani` as any, tani);
                            setValue(
                              `formData[${index}].keisanSettei` as any,
                              keisanSettei
                            );
                            setValue(
                              `formData[${index}].fukuroKijyunchi` as any,
                              fukuroKijyunchi
                            );
                          }

                          // console.log(filterCode)
                          // const [filterName] = syohinCode.map(
                          //   (data: any) => data.name
                          // );
                          // setSyohinCode(filterCode);

                          return (
                            <DropDown
                              value={value}
                              data={syohin}
                              handleChange={(e) => onChange(e.target.value)}
                            />
                          );
                        }}
                        name={`formData[${index}].syohinName` as any}
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
                            // {...register("input")}
                          />
                        )}
                        name={`formData[${index}].teikeisaki` as any}
                      />
                    </Grid>
                    <Grid
                      item
                      md
                      sx={{ backgroundColor: "tableBodyHigthLight.main" }}
                    >
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
                        name={`formData[${index}].suryo` as any}
                      />
                    </Grid>
                    <Grid item md>
                      <Typography variant="subtitle2" color="fontColor.dark">
                        {getValues(`formData[${index}].tani` as any)}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md
                      sx={{ backgroundColor: "tableBodyHigthLight.main" }}
                    >
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => {
                          return (
                            <Input
                              disableUnderline={true}
                              onChange={onChange}
                              value={value}
                              sx={{ px: 1 }}
                            />
                          );
                        }}
                        name={`formData[${index}].kamawari` as any}
                      />
                    </Grid>
                    <Grid
                      item
                      md={1}
                      sx={{ backgroundColor: "tableBodyHigthLight.light" }}
                    >
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
                        name={`formData[${index}].cut` as any}
                      />
                    </Grid>
                    {getValues(`formData[${index}].keisanSettei` as any) ==
                    1 ? (
                      <NoFormula />
                    ) : getValues(`formData[${index}].keisanSettei` as any) ==
                      2 ? (
                      <Fukuro control={control} index={index} />
                    ) : getValues(`formData[${index}].keisanSettei` as any) ==
                      3 ? (
                      <Kinugoshi
                        control={control}
                        index={index}
                        setValue={setValue}
                      />
                    ) : getValues(`formData[${index}].keisanSettei` as any) ==
                      4 ? (
                      <NoFormula />
                    ) : (
                      <NoFormula />
                    )}
                    <Grid
                      item
                      md={0.8}
                      sx={{ backgroundColor: "tableBodyHigthLight.light" }}
                    >
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
                        name={`formData[${index}].bikou1` as any}
                      />
                    </Grid>
                    <Grid
                      item
                      md={1.2}
                      sx={{ backgroundColor: "tableBodyHigthLight.light" }}
                    >
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
                        name={`formData[${index}].bikou2` as any}
                      />
                      {/* {field.bikou2} */}
                    </Grid>
                    <Grid
                      item
                      md={0.5}
                      sx={{
                        "--Grid-borderWidth": "0px",
                      }}
                    >
                      {/* {index !== 0 && ( */}
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          let id = getValues(`formData[${index}].id` as any);
                          handleDeleteUser(id);
                          remove(index);
                        }}
                      >
                        <RemoveCircleIcon sx={{ color: "#ff4444" }} />
                      </IconButton>
                      {/* )} */}
                    </Grid>
                  </Grid>
                );
              })}
            </>

            <Grid container sx={{ mt: 2 }}>
              <Grid item md>
                <Stack alignItems="flex-end">
                  <Button
                    onClick={handleAppend}
                    variant="contained"
                    endIcon={<AddIcon />}
                    sx={{ color: "white", width: 110 }}
                  >
                    追加
                  </Button>
                </Stack>
              </Grid>
              <Grid item md={0.5}></Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 12 }}
            >
              <BackButton href="/" />

              <Stack direction="row" alignItems="center" spacing={3}>
                <Button
                  variant="contained"
                  size="medium"
                  // type="submit"
                  sx={{ color: "white", fontSize: "18px" }}
                  // onClick={handleAlert}
                  onClick={handlePreviewAlertBox}
                >
                  印刷
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  sx={{ color: "white", fontSize: "18px" }}
                  // onClick={handleAlertBox}
                >
                  登録/更新
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  // type="submit"
                  sx={{ color: "white", fontSize: "18px" }}
                  onClick={handleCsvAlert}
                  // onClick={exportCsv}
                >
                  CSV出力
                </Button>
              </Stack>
            </Stack>
          </form>
        </>
      )}

      <Preview
        open={previewOpen}
        setOpen={setPreviewOpen}
        previewData={previewData}
        loading={previewLoading}
      />

      <AlertBox
        open={alertOpen}
        setOpen={setAlertOpen}
        text="登録・更新しました。"
        submit={handelAlertClose}
      />
      <AlertBox
        open={previewAlert}
        setOpen={setPreviewAlert}
        text="データ書き出ししてからの印刷になります。"
        submit={openPreview}
        cancelButton={true}
      />
      <AlertBox
        open={csvAlertOpen}
        setOpen={setCsvAlertOpen}
        text="データ書き出ししてからのCSV出力になります。"
        submit={handleCsvClose}
        cancelButton={true}
      />
      <LoadingBox naviSearchLoading={naviSearchLoading} shohinLoading={shohinLoading} schoolLunchCalLoading={schoolLunchCalLoading}/>
    </Box>
  );
};

export default SchoolMealData;
