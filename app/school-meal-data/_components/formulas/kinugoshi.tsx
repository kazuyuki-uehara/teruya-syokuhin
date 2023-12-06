"use client";
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { Typography, Grid } from "@mui/material";
import { Props } from ".";

const Kinugoshi = ({ control, index, md = 2, setValue = () => {} }: Props) => {
  const value = useWatch({
    control,
    name: `formData[${index}]`,
    // defaultValue: {}
  });

//   const { kansanA, kansanB, nouhinsuryo, cyumonsaZentai, cyumonsa1Kama } =
//     value;

  let standardCan = 7; // 缶の規格 7 倍数
  // やっこ缶（大）14㎏
  let constPot = 14; // 容量（kg/1缶）
  let order = parseFloat(value.suryo); //注文数
  let pot = parseFloat(value.kamawari); //釜数

  let perPotconverse = Math.round((order / pot) * 10) / 10; // 1釜当たり = 注文数 ÷ 釜数
  // let perPot = parseFloat(perPotconverse.toFixed(1));
  let perPot = perPotconverse;
  let minCan = Math.ceil(perPot / standardCan);
  let standardPerPot = minCan * standardCan; // １釜基準数 = 缶規格MAX充填缶数 * 缶の規格 7 倍数
  let yakkoCan = Math.floor(standardPerPot / constPot); //釜単位やっこ缶 = １釜基準数 ÷ 容量（kg/1缶）
  let requiredYakkoCan = Math.floor(yakkoCan); //  釜単位必要やっこ缶数 = 釜単位やっこ缶
  let perPot2; //1釜当たり = 1釜当たり2 ÷ 釜単位必要やっこ缶数
  if (requiredYakkoCan !== 0) {
    perPot2 = Math.round((perPot / requiredYakkoCan) * 10) / 10;
  } else {
    perPot2 = 0;
  }
  let totalCan = requiredYakkoCan * pot; // 缶合計 = 釜単位必要やっこ缶数 * 釜数
  let totalKg = constPot * totalCan; // 合計kg数 = 容量（kg/1缶）* 缶合計
  // defference
  let difference = order - totalKg; // 端数差額 = 注文数 - 合計kg数
  // やっこ缶（小）7kg
  let constPot2 = 7; // 容量（kg/1缶）
  let dOrder;
  if (totalKg <= order || totalKg === 0) {
    dOrder = (difference * 10) / 10;
  } else {
    dOrder = 0;
  }
  let dpot = pot;
  let dPerPot = parseFloat((dOrder / dpot).toFixed(1));
  let dMinCan = Math.ceil(dPerPot / standardCan);
  let dStardardPerPot = dMinCan * standardCan;
  let dYakkoCan = Math.round((dPerPot / constPot2) * 100) / 100;
  let dRequiredYakkoCan = Math.ceil(dYakkoCan);
  let dPerPot2;
  if (dRequiredYakkoCan !== 0) {
    dPerPot2 = dPerPot / dRequiredYakkoCan;
  } else {
    dPerPot2 = 0;
  }
  let dTotalCan = dRequiredYakkoCan * dpot;
  let dTotalKg = constPot2 * dTotalCan;

  let actualQuantity = totalKg + dTotalKg;
  let loss = actualQuantity - order;
  let potPerLoss = parseFloat((loss / pot).toFixed(1));

  // console.log(kansanA)

  if (
    isNaN(totalCan) ||
    isNaN(perPot2) ||
    isNaN(actualQuantity) ||
    isNaN(loss) ||
    isNaN(potPerLoss) ||
    isNaN(dTotalCan)
  ) {
    totalCan = 0;
    perPot2 = 0;
    actualQuantity = 0;
    loss = 0;
    potPerLoss = 0;
    dTotalCan = 0;
  }

  useEffect(() => {
    setValue(`formData[${index}].kansanA`, totalCan);
    setValue(`formData[${index}].kansanB`, dTotalCan);
    setValue(`formData[${index}].nouhinsuryo`, actualQuantity);
    setValue(`formData[${index}].cyumonsaZentai`, loss);
    setValue(`formData[${index}].cyumonsa1Kama`, potPerLoss);
  }, 
  [totalCan, dTotalCan, actualQuantity, loss, potPerLoss,index,setValue]
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
              {/* {totalCan}/{perPot2}kg */}
              大 {totalCan}
            </Typography>
          </Grid>
          <Grid item md>
            <Typography variant="subtitle2" color="fontColor.dark">
              {/* {dTotalCan}/{dPerPot2}kg */}
              小 {dTotalCan}
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

export default Kinugoshi;
