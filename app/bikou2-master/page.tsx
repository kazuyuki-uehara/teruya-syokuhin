"use client";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  IconButton,
  Input,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useSWR from "swr";
import { navCredentials } from "@/app/const/nav-credential";
import DropDown from "../_components/DropDown";
import { useState, useEffect, useRef, useMemo } from "react";
// import ComboBox from "@/app/_components/combo-box";
import ComboBoxBiko2 from "./_components/combo-box-biko2";
import AlertBox from "../_components/alertBox";
import { useRouter } from "next/navigation";
import LoadingBox from "./_components/loading-box";
export type FormValues = {
  formData: {
    id: string;
    bikoCd: number | string;
    tokuisakiCd: string;
    syohinCd: string;
    mongon: string;
  }[];
};

const fetchDataMstShoHin = async (url: string) => {
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
  }
};

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

const biko2Data = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed search data");
  }
  return response.json();
};

const Bikou2Master = () => {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
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

  const { data, isLoading } = useSWR(
    `api/bikou2-master/create-update`,
    biko2Data
  );

  console.log("get data >>", data);

  // const [bikou2Data, setBikou2Data] = useState([{}])

  useEffect(() => {
    if (data) {
      let apiData;
      apiData = data.map((data: any) => {
        return {
          id: data.id,
          bikoCd: data.bikoCd,
          tokuisakiCd: data.tokuisakiCd,
          syohinCd: data.syohinCd,
          mongon: data.mongon,
        };
      });
      reset({ formData: apiData });
    }
  }, [data, reset]);

  const handleAppend = () => {
    append({
      id: "",
      bikoCd: "",
      tokuisakiCd: "",
      syohinCd: "",
      mongon: "",
    });
  };

  const [tokuisakiArr, setTokuisakiArr] = useState([]);
  const [tokuisakiLoading,setTokuisakiLoading] = useState(false);
  const fetchDataTokuisaki = async () => {
    setTokuisakiLoading(true)
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
      setTokuisakiLoading(false)
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
        value: syohinCode,
        syohinCd: syohinCode,
      };
      syohin.push(obj);
    });
  }

  const Submit = async (data: any) => {
    const { formData } = data;
    console.log(">>>>>", formData);
    let bikou2Data: any = [];
    formData.map((d: any) => {
      const obj = {
        id: d.id,
        bikoCd: d.bikoCd,
        tokuisakiCd: d.tokuisakiCd,
        syohinCd: d.syohinCd,
        mongon: d.mongon,
      };
      bikou2Data.push(obj);
    });
    console.log("final data >> ", bikou2Data);
    // setBikou2Data(bikou2Data)
    const url = `api/bikou2-master/create-update`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bikou2Data),
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

  const handelAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={{ height: "100%" }}>
      {/* title */}
      <Stack
        direction="row"
        sx={{ marginBottom: 4 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold" color="fontColor.main">
          備考２マスタ
        </Typography>
      </Stack>
      {/* table header */}
      <Grid
        container
        sx={{
          "--Grid-borderWidth": "1px",
          borderColor: "divider",
          "& > div": {
            py: 1,
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
        <Grid item md sx={{ backgroundColor: "tableHeader.main" }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="fontColor.main"
          >
            備考コード
          </Typography>
        </Grid>
        <Grid item md sx={{ backgroundColor: "tableHeader.main" }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="fontColor.main"
          >
            得意先
          </Typography>
        </Grid>
        <Grid item md sx={{ backgroundColor: "tableHeader.main" }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="fontColor.main"
          >
            商品
          </Typography>
        </Grid>
        <Grid item md sx={{ backgroundColor: "tableHeader.main" }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="fontColor.main"
          >
            入力文言
          </Typography>
        </Grid>
        <Grid item md={1} sx={{ "--Grid-borderWidth": "0px" }}></Grid>
      </Grid>
      {/* table body */}
      <form onSubmit={handleSubmit(Submit)}>
        {fields.map((field, index) => {
          return (
            <Grid
              container
              sx={{
                "--Grid-borderWidth": "0.5px",
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
              <Grid item md sx={{}}>
                <Typography
                  variant="subtitle2"
                  // fontWeight="bold"
                  color="fontColor.main"
                >
                  {getValues(`formData[${index}].bikoCd` as any)}
                </Typography>
              </Grid>
              <Grid item md sx={{}}>
                <Controller
                  rules={{
                    // required: "必項目です！",
                    required: true,
                  }}
                  render={({ field: { value, onChange, onBlur } }) => {
                    console.log(value);
                    const filter = tokuisakiArr.filter(
                      (data: any) => data.tokuisakiCd === value
                    );
                    const [defaultValue] = filter.map(
                      (data: any) => data.label
                    );
                    // if(defaultValue===undefined){
                    //     console.log('loading')
                    // }else{
                    //   console.log(defaultValue)
                    // }
                    return (
                      <ComboBoxBiko2
                        // error={errors.formData?.tokuisakiCd}
                        // data={tokuisakiData}
                        value={defaultValue}
                        // defaultValue={value}
                        data={tokuisakiArr}
                        onChange={(_, selectedValue: string | any) => {
                          onChange(selectedValue.tokuisakiCd);
                          // setComboDefault(selectedValue.touisakiName)
                        }}
                        minWidthMd="100%"
                      />
                    );
                  }}
                  name={`formData[${index}].tokuisakiCd` as any}
                  control={control}
                />
              </Grid>
              <Grid item md sx={{}}>
                <Controller
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <DropDown
                        value={value}
                        data={syohin}
                        handleChange={(e) => onChange(e.target.value)}
                      />
                    );
                  }}
                  name={`formData[${index}].syohinCd` as any}
                  control={control}
                />
              </Grid>
              <Grid item md sx={{}}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      fullWidth
                      disableUnderline={true}
                      onChange={onChange}
                      value={value}
                      sx={{ px: 1 }}
                    />
                  )}
                  name={`formData[${index}].mongon` as any}
                />
              </Grid>
              <Grid item md={1} sx={{ "--Grid-borderWidth": "0px" }}>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <RemoveCircleIcon sx={{ color: "#ff4444" }} />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}

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
          <Grid item md={1}></Grid>
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item md>
            <Stack alignItems="flex-end">
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ color: "white", fontSize: "18px" }}
                // onClick={handleAlertBox}
              >
                登録/更新
              </Button>
            </Stack>
          </Grid>
          <Grid item md={1}></Grid>
        </Grid>
      </form>

      <AlertBox
        open={alertOpen}
        setOpen={setAlertOpen}
        text="登録・更新しました。"
        submit={handelAlertClose}
      />
      <LoadingBox tokuisakiLoading={tokuisakiLoading} shohinLoading={shohinLoading}/>
    </Box>
  );
};

export default Bikou2Master;
