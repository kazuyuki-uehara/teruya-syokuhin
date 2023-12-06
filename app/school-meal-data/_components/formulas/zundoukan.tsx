'use client'
import React from "react";
import { useWatch } from "react-hook-form";
import { Typography,Grid } from "@mui/material";
import { Props } from ".";

const Zundoukan = ({control,index,md=2}:Props) => {
    const value = useWatch({
        control,
        name: `formData[${index}]`,
        // defaultValue: {}
      });
    
      let constPot = 60; // 容量（kg/1缶）
      let order = parseInt(value.suryo); //注文数
      let pot = parseInt(value.kamawari); //釜数
    
      let perPot = Math.ceil(order / pot); // 1釜当たり = 注文数 ÷ 釜数
      let maxCan = Math.floor(perPot / constPot); //缶規格MAX充填缶数 = 1釜当たり ÷ 容量（kg/1缶）
      let standardPerPot = maxCan * constPot; // １釜基準数 = 缶規格MAX充填缶数 * 容量（kg/1缶）
      let yakkoCan = Math.floor(standardPerPot / constPot); //釜単位やっこ缶 = １釜基準数 ÷ 容量（kg/1缶）
      let requiredYakkoCan = Math.floor(yakkoCan); //  釜単位必要やっこ缶数 = 釜単位やっこ缶
      // result
      let zundouCan; // ずんどう缶当たり = １釜基準数 ÷ 釜単位必要やっこ缶数
      if (standardPerPot / requiredYakkoCan !== 0) {
        zundouCan = 0;
      } else {
        zundouCan = standardPerPot / requiredYakkoCan;
      }
      let totalCan = requiredYakkoCan * pot; // 缶合計 = 釜単位必要やっこ缶数 * 釜数
      let totalKg = constPot * totalCan; // 合計kg数 = 容量（kg/1缶）* 缶合計
    
      // defference
      let difference = order - totalKg; // 端数差額 = 注文数 - 合計kg数
      let dOrder;
      if (totalKg <= order || totalKg === 0) {
        dOrder = difference;
      } else {
        dOrder = 0;
      }
      let dpot = pot;
      let dPerPot = Math.ceil(dOrder / dpot);
      let minCan = Math.ceil(dPerPot / constPot);
      let dStandardPerPot = minCan * constPot;
      let dYakkoCan = dPerPot / constPot;
      let dYakkoCan2Deci = dYakkoCan.toFixed(2);
      let numberOfCan = Math.ceil(dYakkoCan);
    
      // result
      let dPerPotfinal;
      if (dPerPot / numberOfCan < 30) {
        dPerPotfinal = 30;
      } else {
        dPerPotfinal = 0;
      }
      let dTotalCan = numberOfCan * dpot;
      let dTotalKg = dTotalCan * dPerPotfinal;
      let actualQuantity = totalKg + dTotalKg;
      let loss = actualQuantity - order;
      let potPerLoss = parseFloat((loss / pot).toFixed(2));
    
      if (
        isNaN(totalCan) ||
        isNaN(zundouCan) ||
        isNaN(actualQuantity) ||
        isNaN(loss) ||
        isNaN(potPerLoss) ||
        isNaN(dTotalCan)
      ) {
        totalCan = 0;
        zundouCan = 0;
        actualQuantity = 0;
        loss = 0;
        potPerLoss = 0;
        dTotalCan = 0;
      }
    
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
                  {totalCan}/{zundouCan}kg
                </Typography>
              </Grid>
              <Grid item md>
                <Typography variant="subtitle2" color="fontColor.dark">
                  {dTotalCan}/{dPerPotfinal}kg
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

export default Zundoukan;