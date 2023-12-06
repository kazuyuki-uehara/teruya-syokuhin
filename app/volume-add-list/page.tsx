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
import { data, volumeAddListData } from "../const/data";
import BackButton from "../_components/BackButton";

// const KgAdd = () => {
//     kgAddListData.reduce((total, item) => total + item.kg, 0);
// }

const KgAddList = () => {
  return (
    <Box
    // sx={{ height: "100vh" }}
    >
      {/* action */}
      <Stack
        direction="row"
        sx={{ marginBottom: 4 }}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold" color="fontColor.main">
          夜勤　製造日
          <br />
          10/1
        </Typography>
      </Stack>

      <Box
        sx={
          {
            //   padding: 2,
            //   border: "2px solid",
            //   borderColor: "borderColor.main",
            //   height: "60%",
          }
        }
      >
        {/* title */}
        <Grid
          container
          sx={{
            // mb: 2,
            "& > div": {
              py: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <Grid
            item
            md
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "borderColor.main",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              納品日
            </Typography>
          </Grid>
          <Grid
            item
            md
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "borderColor.main",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              商品CD
            </Typography>
          </Grid>
          <Grid
            item
            md
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "borderColor.main",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              商品
            </Typography>
          </Grid>
          <Grid
            item
            md
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "borderColor.main",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              得意先CD
            </Typography>
          </Grid>
          <Grid
            item
            md={3.5}
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "borderColor.main",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              得意先
            </Typography>
          </Grid>
          <Grid
            item
            md
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "borderColor.main",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              数量
            </Typography>
          </Grid>
          <Grid
            item
            md
            sx={{
              backgroundColor: "primary.main",
              border: "1px solid",
              borderColor: "borderColor.main",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="white">
              単位
            </Typography>
          </Grid>
        </Grid>
        {/* body */}
        {volumeAddListData.map((data) => (
          <Grid
            key={data.item}
            container
            sx={{
              backgroundColor: "cardBg.main",
              "--Grid-borderWidth": "1.5px",
              borderColor: "divider",
              "& > div": {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                borderBottom: "var(--Grid-borderWidth) dashed",
                borderColor: "borderColor.main",
                py: 2,
              },
            }}
          >
            <Grid item md>
              <Typography
                variant="subtitle2"
                color="fontColor.dark"
                paddingLeft={1}
              >
                {data.date}
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                color="fontColor.dark"
                paddingLeft={1}
              >
                {data.item_cd}
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                color="fontColor.dark"
                paddingLeft={1}
              >
                {data.item}
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                color="fontColor.dark"
                paddingLeft={1}
              >
                {data.partner_cd}
              </Typography>
            </Grid>
            <Grid item md={3.5}>
              <Typography
                variant="subtitle2"
                color="fontColor.dark"
                paddingLeft={1}
              >
                {data.partner}
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                color="fontColor.dark"
                align="right"
                width="100%"
                paddingRight={1}
              >
                {data.volume.toFixed(1)}
              </Typography>
            </Grid>
            <Grid item md>
              <Typography
                variant="subtitle2"
                color="fontColor.dark"
                paddingLeft={1}
              >
                {data.unit}
              </Typography>
            </Grid>
          </Grid>
        ))}
        <Grid
          container
          sx={{
            // backgroundColor: "red",
            "--Grid-borderWidth": "1.5px",
            // borderColor: "divider",
            "& > div": {
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              //   borderBottom: "var(--Grid-borderWidth) dashed",
              borderColor: "borderColor.main",
              py: 2,
            },
          }}
        >
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid
            item
            md={3.5}
            display="none"
            sx={{
              backgroundColor: "cardBg.main",
              borderBottom: "var(--Grid-borderWidth) dashed",
            }}
          >
            <Typography
              variant="subtitle2"
              color="fontColor.dark"
              paddingLeft={1}
            >
              合計　パック数
            </Typography>
          </Grid>
          <Grid
            item
            md
            display="none"
            sx={{
              backgroundColor: "cardBg.main",
              borderBottom: "var(--Grid-borderWidth) dashed",
            }}
          >
            <Typography
              variant="subtitle2"
              color="fontColor.dark"
              align="right"
              width="100%"
              paddingRight={1}
            >
              {volumeAddListData.reduce(
                (total, item) => parseFloat((total + item.volume).toFixed(2)),
                0
              )}
            </Typography>
          </Grid>
          <Grid item md></Grid>
        </Grid>
        <Grid
          container
          sx={{
            // backgroundColor: "red",
            "--Grid-borderWidth": "1.5px",
            // borderColor: "divider",
            "& > div": {
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              //   borderBottom: "var(--Grid-borderWidth) dashed",
              borderColor: "borderColor.main",
              py: 2,
            },
          }}
        >
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid
            item
            md={3.5}
            display="none"
            sx={{
              backgroundColor: "cardBg.main",
              borderBottom: "var(--Grid-borderWidth) dashed",
            }}
          >
            <Typography
              variant="subtitle2"
              color="fontColor.dark"
              paddingLeft={1}
            >
              1板　36個　ロス2個　34個で合計
            </Typography>
          </Grid>
          <Grid
            item
            md
            display="none"
            sx={{
              backgroundColor: "cardBg.main",
              borderBottom: "var(--Grid-borderWidth) dashed",
            }}
          >
            <Typography
              variant="subtitle2"
              color="fontColor.dark"
              align="right"
              width="100%"
              paddingRight={1}
            >
              {volumeAddListData.reduce(
                (total, item) => parseFloat((total + item.volume).toFixed(2)),
                0
              )}
            </Typography>
          </Grid>
          <Grid item md></Grid>
        </Grid>
        <Grid
          container
          sx={{
            // backgroundColor: "red",
            "--Grid-borderWidth": "1.5px",
            // borderColor: "divider",
            "& > div": {
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              //   borderBottom: "var(--Grid-borderWidth) dashed",
              borderColor: "borderColor.main",
              py: 2,
            },
          }}
        >
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid item md></Grid>
          <Grid
            item
            md={3.5}
            display="none"
            sx={{
              backgroundColor: "cardBg.main",
              borderBottom: "var(--Grid-borderWidth) dashed",
            }}
          >
            <Typography
              variant="h6"
              color="fontColor.dark"
              fontWeight="bold"
              paddingLeft={1}
            >
              水切り生地
            </Typography>
          </Grid>
          <Grid
            item
            md
            display="none"
            sx={{
              backgroundColor: "cardBg.main",
              borderBottom: "var(--Grid-borderWidth) dashed",
            }}
          >
            <Typography
              variant="h6"
              color="fontColor.dark"
              fontWeight="bold"
              align="right"
              width="100%"
              paddingRight={1}
            >
              1.5
            </Typography>
          </Grid>
          <Grid item md></Grid>
        </Grid>
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <BackButton href="/schedule" />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{ color: "white" }}
          >
            CSV出力
          </Button>
          <Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{ color: "white" }}
          >
            印刷
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default KgAddList;
