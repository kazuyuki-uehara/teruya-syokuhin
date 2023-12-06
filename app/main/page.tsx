"use client";
import { memo } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import Container from "@mui/material/Container";
import * as React from "react";
import Grid from "@mui/material/Grid";

import MenuCard from "../_components/MenuCard";
import { route } from "../const"

const MainScreen = () => {
  return (
    <Box>
      {/* <Grid container spacing={3} sx={{ mb: 10}}> */}
        {/* <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            注文データ取得
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md>
              <MenuCard image="/kg.svg" menuName="データ取得" href="/" />
            </Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
          </Grid>
        </Grid> */}
      {/* </Grid> */}
      {/* 工場向け需要予測受注数共有システム */}
      {/* <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            工場向け需要予測受注数共有システム
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md>
              <MenuCard
                image="/kg.svg"
                menuName="kg変換マスタ"
                href="/kg-conversion-master"
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/shipping.jpg"
                menuName="出荷製造変換マスタ"
                href="/shipping-conversion-master"
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/kg-list.svg"
                menuName="kg変換マスタ一賢"
                href="/kg-conversion-list"
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/make-to-order.svg"
                menuName="受注製造変換マスタ"
                href="/shipping-conversion-list"
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/data-registration.svg"
                menuName="需要予測データ登録"
                href="/data-registration"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      {/* ダッシュボード */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="fontColor.main">
            ダッシュボード
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md>
              <MenuCard
                image="/schedule.svg"
                menuName="生産予定表示"
                href={route.schedule}
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/process-status.svg"
                menuName="生産工程状況"
                href=""
              />
            </Grid>
            <Grid item md>
              
            </Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="fontColor.main">
            学校給食関連
          </Typography>
        </Grid>
        <Grid item md={12}>
        <Grid container spacing={3}>
            <Grid item md>
              <MenuCard
                image="/customer.svg"
                menuName="学校給食注文入力"
                href={route.schoolMealData}
              />
            </Grid>
            <Grid item md>
              {/* <MenuCard
                image="/kg-list.svg"
                menuName="リスト画面表示／印刷"
                href="/"
              /> */}
            </Grid>
            <Grid item md>
              {/* <MenuCard
                image="/process-status.svg"
                menuName="CSV出力"
                href="/"
              /> */}
            </Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="fontColor.main">
            需要予測関連
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md>
              <MenuCard
                image="/data-registration.svg"
                menuName="需要予測データ登録"
                href={route.dataRegistration}
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/make-to-order.svg"
                menuName="リスト画面表示/印刷"
                href={route.shippingConversionList}
              />
            </Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* 出荷荷姿変換システム */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="fontColor.main">
            出荷荷姿変換システム
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md>
              <MenuCard
                image="/table-registration.svg"
                menuName="荷姿変換テーブル登録"
                href=""
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/total.svg"
                menuName="ピッキングリスト"
                secondMenuName="(集計)"
                href=""
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/customer.svg"
                menuName="ピッキングリスト"
                secondMenuName="(得意先別)"
                href=""
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/product-and-customer.svg"
                menuName="ピッキングリスト"
                secondMenuName="(商品別得意先別)"
                href=""
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/Delivery-label-printing.svg"
                menuName="納品ラベル"
                href=""
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* 生産工程実績管理 */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="fontColor.main">
            生産工程管理
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md>
              <MenuCard
                image="/caculation-master.svg"
                menuName="変換テーブルマスタ登録"
                href={route.conversionTable}
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/Production-process-registration.svg"
                menuName="生産工程登録"
                href=""
              />
            </Grid>
            <Grid item md>
              <MenuCard
                image="/printing.svg"
                menuName="生産カード印刷"
                href=""
              />
            </Grid>
            <Grid item md></Grid>
            <Grid item md></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item md={12}>
          <Typography variant="h6" fontWeight="bold" color="fontColor.main">
            共通
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            <Grid item md>
              <MenuCard
                image="/kg-list.svg"
                menuName="生地マスタ登録"
                href="/"
              />
            </Grid>
            <Grid item md>
            <MenuCard
                image="/new-registration.svg"
                menuName="お知らせ登録"
                href=""
              />
            </Grid>
            <Grid item md>
            <MenuCard
                image="/school-lunch-data-cal-master.svg"
                menuName="学校給食データ"
                secondMenuName="入力計算マスター"
                href={route.schoolLunchDataCalMaster}
              />
            </Grid>
            <Grid item md>
            <MenuCard
                image="/table-registration.svg"
                menuName="備考２マスタ"
                href={route.bikou2Master}
              />
            </Grid>
            <Grid item md></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(MainScreen);
