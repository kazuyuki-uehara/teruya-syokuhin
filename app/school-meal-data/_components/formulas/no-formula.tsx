"use client";
import React from "react";
import { useWatch } from "react-hook-form";
import { Typography, Grid } from "@mui/material";
import { Props } from ".";
import { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const NoFormula = () => {
  return (
    <>
      <Grid item md={2}>
        <Grid
          container
          alignItems="center"
          spacing={1}
          justifyContent="center"
          textAlign="center"
        >
          <Grid item md={12}>
            <Typography variant="subtitle2" color="fontColor.dark">
              計算なし
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={2}>
        <Typography variant="subtitle2" color="fontColor.dark">
          計算なし
        </Typography>
      </Grid>
    </>
  );
};

export default NoFormula;
