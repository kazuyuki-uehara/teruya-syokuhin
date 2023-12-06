"use client";
import React from "react";
import { useWatch } from "react-hook-form";
import { Typography, Grid } from "@mui/material";
import { Props } from ".";
import { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Fukuro = ({ control, index, md = 2, setValue =()=>{}}: Props) => {
  const value = useWatch({
    control,
    name: `formData[${index}]`,
    // defaultValue: {}
  });

  const { kansanA , kansanB } = value

  const conversionData = useSelector(
    (state: RootState) => state.conversionTable.conversionData
  );
  const { bagCalStandardUnit } = conversionData;
  console.log("cosntPot : ", bagCalStandardUnit);

  // let constPot = parseInt(bagCalStandardUnit); // 容量（kg/1缶）
  let constPot = value.fukuroKijyunchi
  // let constPot = 5
  let order = parseFloat(value.suryo); //注文数
  let pot = parseFloat(value.kamawari); //釜数
  let perPot = order / pot; //1釜当たり
  let bags = perPot / constPot; // 釜数 = 1釜当たり ÷ 容量（kg/1缶）
  let requiredBags = Math.ceil(bags); // 必要袋数
  let perBag = parseFloat((perPot / requiredBags).toFixed(3)); // 1袋当たり = 釜数 ÷ 必要袋数
  let finalPerBag = Math.ceil(perBag * 10) / 10;
  let totalBag = requiredBags * pot;
  let totalKg = parseFloat((finalPerBag * totalBag).toFixed(1));

  if (isNaN(finalPerBag) || isNaN(totalBag)) {
    finalPerBag = 0;
    totalBag = 0;
  }
  let actualQuantity = 0;
  let loss = 0;
  let potPerLoss = 0;

  useEffect(
    () => {
      setValue(`formData[${index}].kansanA`, finalPerBag);
      setValue(`formData[${index}].kansanB`,totalBag)
      setValue(`formData[${index}].nouhinsuryo`,actualQuantity)
      setValue(`formData[${index}].cyumonsaZentai`,loss)
      setValue(`formData[${index}].cyumonsa1Kama`,potPerLoss)
    },
    [finalPerBag,totalBag,actualQuantity,loss,potPerLoss,index,setValue]
    // [setValue,index,]

  );

  return (
    <>
      <Grid item md={md}>
        <Grid
          container
          alignItems="center"
          spacing={1}
          justifyContent="center"
          textAlign="center"
        >
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              {finalPerBag}kg
              {/* {kansanA}kg */}
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              {/* {dTotalCan}/{dPerPot2}kg */}
              {totalBag}袋
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={2}>
        <Grid container textAlign="center">
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              {actualQuantity}
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              {loss}
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              {potPerLoss}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Fukuro;
