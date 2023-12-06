"use client";
import React from "react";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography, Grid, Stack, TextField, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TestComponent from "./_components/search";

const DateFilter = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null | any>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  function generateCalendar(startDate: Date) {
    const calendar: Date[][] = [];
    const daysInMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    ).getDate();
    let currentRow: Date[] = [];
    let currentDate = new Date(startDate);
    // 注目日が含まれる最初の週を設定
    while (currentDate.getDay() !== 0) {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    for (let i = 0; i < 42; i++) {
      if (currentRow.length === 7) {
        calendar.push(currentRow);
        currentRow = [];
      }
      currentRow.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // 注目日を含む週を一番上に移動
    const firstWeekIndex = calendar.findIndex((row) =>
      row.some((day) => day.getDate() === startDate.getDate())
    );
    if (firstWeekIndex !== -1) {
      const [firstWeek] = calendar.splice(firstWeekIndex, 1);
      calendar.unshift(firstWeek);
    }
    return calendar;
  }
  // 注目日を指定してカレンダーを生成
  // const focusDate = new Date("2023-08-27"); // 例として9月6日を指定
  const calendar = generateCalendar(new Date(selectedDate));
  // console.log(calendar);
  // カレンダーを出力して確認
  //   calendar.forEach((week) => {
  //     const weekString = week
  //       .map((day) => day.toLocaleDateString("ja-JP"))
  //       .join(" | ");
  //     console.log(weekString);
  //   });

  return (
    <>
      <Box padding={3}>
        <Typography>予測入力</Typography>
        <Grid container>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography
              // variant="subtitle2"
              // sx={{ width: 100 }}
              color="fontColor.main"
            >
              登録基準日{" "}
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              {" "}
              <DatePicker
                format="YYYY/MM/DD"
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </Stack>
        </Grid>
      </Box>
      {/* <Grid container> */}
      <Box paddingY={3}>
        {calendar.map((weeks, index) => (
          <Grid container key={index} justifyContent="center">
            {weeks.map((day: any) => (
              <Grid item key={day} border={1} padding={1} width={140}>
                <Typography
                  textAlign="center"
                  borderBottom={1}
                  sx={{ width: "100%" }}
                >
                  {`${day.toLocaleDateString("ja-JP", {
                    weekday: "short",
                  })} (${day.toLocaleDateString("ja-JP", {
                    month: "numeric",
                    day: "numeric",
                  })})`}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  borderBottom={1}
                  width="100%"
                >
                  <Typography
                    padding={0.5}
                    width="33.3%"
                    fontSize={14}
                  ></Typography>
                  <Typography
                    borderLeft={1}
                    borderRight={1}
                    padding={0.5}
                    fontSize={14}
                    width="33.3%"
                  >
                    予測
                  </Typography>
                  <Typography padding={0.5} fontSize={14} width="33.3%">
                    実績
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" borderBottom={1}>
                  <Typography fontSize={14} padding={0.5} width="33.3%">
                    本島
                  </Typography>
                  <TextField
                    size="small"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      paddingX: 1,
                      width: "33.3%",
                      borderLeft: 1,
                      borderRight: 1,
                    }}
                    fullWidth
                  ></TextField>
                  <Typography
                    padding={0.5}
                    width="33.3%"
                    fontSize={14}
                  ></Typography>
                </Stack>
                <Stack direction="row" alignItems="center" borderBottom={1}>
                  <Typography fontSize={14} padding={0.5} width="33.3%">
                    先島
                  </Typography>
                  <Typography
                    borderLeft={1}
                    borderRight={1}
                    padding={0.5}
                    fontSize={14}
                    width="33.3%"
                  >
                    Hi
                  </Typography>
                  <Typography
                    width="33.3%"
                    fontSize={14}
                    padding={0.5}
                  ></Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Typography fontSize={14} width="33.3%" padding={0.5}>
                    小計
                  </Typography>
                  <Typography
                    borderLeft={1}
                    borderRight={1}
                    width="33.3%"
                    padding={0.5}
                    fontSize={14}
                  >
                    Hi
                  </Typography>
                  <Typography
                    width="33.3%"
                    fontSize={14}
                    padding={0.5}
                  ></Typography>
                </Stack>
              </Grid>
            ))}
            <Grid item border={1} padding={1} width={150}>
              <Typography
                textAlign="center"
                borderBottom={1}
                sx={{ width: "100%" }}
              >
                合計
              </Typography>
              <Stack direction="row" borderBottom={1} alignItems="center">
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                ></Typography>
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                  borderLeft={1}
                  borderRight={1}
                >
                  予測
                </Typography>
                <Typography padding={0.5} width="33.3%" fontSize={14}>
                  実績
                </Typography>
              </Stack>
              <Stack direction="row" borderBottom={1} alignItems="center">
                <Typography padding={0.5} width="33.3%" fontSize={14}>
                  本島
                </Typography>
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                  borderLeft={1}
                  borderRight={1}
                >
                  Hi
                </Typography>
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                ></Typography>
              </Stack>
              <Stack direction="row" borderBottom={1} alignItems="center">
                <Typography padding={0.5} width="33.3%" fontSize={14}>
                  先島
                </Typography>
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                  borderLeft={1}
                  borderRight={1}
                >
                  Hi
                </Typography>
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                ></Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography padding={0.5} width="33.3%" fontSize={14}>
                  合計
                </Typography>
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                  borderLeft={1}
                  borderRight={1}
                >
                  Hi
                </Typography>
                <Typography
                  padding={0.5}
                  width="33.3%"
                  fontSize={14}
                ></Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <Grid container justifyContent="center" padding={1}>
          <Grid item>
            <Typography>合計</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <TestComponent />
          <TestComponent />
          <TestComponent />
          <TestComponent />
          <TestComponent />
          <TestComponent />
          <TestComponent />
          <TestComponent />
        </Grid>
      </Box>
      {/* </Grid> */}
    </>
  );
};

export default DateFilter;
