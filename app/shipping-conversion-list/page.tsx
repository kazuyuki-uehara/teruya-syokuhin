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
import BackButton from "../_components/BackButton";

const ShipConMasterList = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      {/* action */}
      <Stack
        direction="row"
        sx={{ marginBottom: 4 }}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold" color="fontColor.main">
          出荷製造変換マスタ一賢
        </Typography>
      </Stack>

      <Box
        sx={{
          //   padding: 2,
          //   border: "2px solid",
          //   borderColor: "borderColor.main",
          height: "60%",
        }}
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
              製造単位
            </Typography>
          </Grid>
          <Grid item md></Grid>
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
              端数処理
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
              製造日
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
              歩留まり
            </Typography>
          </Grid>
        </Grid>
        {/* body */}
        <Grid
          container
          sx={{
            backgroundColor: "cardBg.main",
            "--Grid-borderWidth": "1.5px",
            borderColor: "divider",
            "& > div": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "var(--Grid-borderWidth) dashed",
              borderColor: "borderColor.main",
              py: 2,
            },
          }}
        >
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              水切り
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              板
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              ÷ 36
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              個
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              切り上げ
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              -2
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              2
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            backgroundColor: "cardBg.main",
            "--Grid-borderWidth": "1.5px",
            borderColor: "divider",
            "& > div": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "var(--Grid-borderWidth) dashed",
              borderColor: "borderColor.main",
              py: 2,
            },
          }}
        >
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              島豆腐
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              板
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              ÷ 36
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              個
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              切り上げ
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              -2
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              2
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            backgroundColor: "cardBg.main",
            "--Grid-borderWidth": "1.5px",
            borderColor: "divider",
            "& > div": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "var(--Grid-borderWidth) dashed",
              borderColor: "borderColor.main",
              py: 2,
            },
          }}
        >
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              やっこ
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              7kg缶
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              ÷ 140000
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              個
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              切り上げ
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              -1
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              0
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <BackButton href="/" />
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

export default ShipConMasterList;
