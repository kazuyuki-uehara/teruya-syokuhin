import React from "react";
import { Typography, Stack, Grid } from "@mui/material";

const TestComponent = () => {
  return (
    <Grid item border={1} padding={1} width={140}>
      <Stack direction="row" borderBottom={1} alignItems="center">
        <Typography padding={0.5} width="33.3%" fontSize={14}></Typography>
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
        <Typography padding={0.5} width="33.3%" fontSize={14}></Typography>
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
        <Typography padding={0.5} width="33.3%" fontSize={14}></Typography>
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
        <Typography padding={0.5} width="33.3%" fontSize={14}></Typography>
      </Stack>
    </Grid>
  );
};

export default TestComponent;
