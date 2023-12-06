"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import PaperFold from "../_components/PaperFold";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Schedule() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="夜勤 製造日 10/1" {...a11yProps(0)} sx={{ width: 120 }} />
          <Tab label="夜勤 製造日 10/2" {...a11yProps(1)} sx={{ width: 120 }} />
          <Tab label="製造日 10/3" {...a11yProps(2)} sx={{ width: 100 }} />
          <Tab label="製造日全体" {...a11yProps(3)} sx={{ width: 120 }} />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* <Typography color="primary.main">Time : 0:05</Typography> */}
            <Typography variant="h5" color="fontColor.main">
              次リフレッシュまで 0:05 分
            </Typography>
          </Box>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ height: "auto" }}>
          <Grid
            container
            spacing={3}
            columnSpacing={2}
            sx={{
              borderBottom: "1px solid",
              pb: 4,
              borderColor: "borderColor.main",
            }}
          >
            {/* 1 */}
            <Grid item md={2.4}>
              <PaperFold href="/kg-add-list">
                <Typography variant="h5" color="fontColor.main" sx={{ mb: 2 }}>
                  水切り生地 <br/>3板
                </Typography>
                <Typography variant="subtitle2" color="fontColor.main" sx={{ mb: 2 }}>
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 2 */}
            <Grid item md={2.4}>
              <PaperFold href="/volume-add-list">
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  水切り生地（島豆腐） 2板
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 3 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  やっこ（大）10缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 2.4 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  やっこ（小）4缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 5 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  ゆし豆腐
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  浦添市立 浦添共同調理4場
                </Typography>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  55.6kg×9缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  500 Kg 小 3等分
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 6 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  ゆし豆腐
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  浦添市立 浦添共同調理場
                </Typography>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  54.2㎏×12缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  650 Kg 中 4等分
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 7 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  ゆし豆腐
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  具志頭学校給食センター
                </Typography>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  40kg×2缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  80 Kg 小
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 8 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  ゆし豆腐
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  具志頭学校給食センター
                </Typography>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  35kg×1缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  35 Kg 中 納品日
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 9 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  ゆし豆腐
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  うるま市立学校給食センター第一調理場
                </Typography>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  25kg×4缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  650 Kg 中 4等分
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業中"
                    sx={{ color: "white", backgroundColor: "#00ad3c" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
            {/* 10 */}
            <Grid item md={2.4}>
              <PaperFold>
                <Typography
                  variant="h5"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  やっこパック用（大）10缶
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="fontColor.main"
                  sx={{ mb: 2, width: "90%" }}
                >
                  納品日2023/10/2
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="作業完了"
                    sx={{ color: "white", backgroundColor: "#ff3838" }}
                  />
                  <Chip label="加熱・冷却" variant="outlined" color="primary" />
                </Stack>
              </PaperFold>
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" sx={{color:"fontColor.light"}}>
              作業指示ラベル印刷
            </Button>
            <Button variant="contained" color="primary" sx={{color:"fontColor.light"}}>
              作業指示リスト印刷
            </Button>
            <Button variant="contained" sx={{ color: "white", backgroundColor: "#00ad3c" }}>
              作業中
            </Button>
            <Button variant="contained" sx={{ color: "white", backgroundColor: "#ff3838" }} >
              作業完了
            </Button>
          </Stack>
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Box sx={{ height: "100vh" }}></Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ height: "100vh" }}></Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box sx={{ height: "100vh" }}></Box>
      </CustomTabPanel>
    </Box>
  );
}
