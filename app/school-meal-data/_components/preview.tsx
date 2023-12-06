"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import { Zundoukan, Kinugoshi, Fukuro } from "./formulas";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { calculSettings } from "../../const/coversion-data";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

interface modelBoxProps {
  previewData: any;
  open: boolean;
  loading: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Preview = ({ previewData, open, setOpen, loading }: modelBoxProps) => {
  const [hide, setHide] = useState(false);
  const conversionData = useSelector(
    (state: RootState) => state.conversionTable.conversionData
  );
  const { calSettings } = conversionData;

  const handleClose = () => {
    setOpen(false);
  };

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        fullWidth
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {/* <Box ref={componentRef}> */}
        <DialogTitle id="scroll-dialog-title" sx={{ pb: 0 }}>
          <Stack direction="row" alignItems="center">
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="fontColor.main"
              sx={{ width: "99%" }}
            >
              Preview
            </Typography>
            <DialogActions>
              <IconButton aria-label="delete" onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogActions>
          </Stack>
        </DialogTitle>
        <DialogContent ref={componentRef}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box sx={{ width: "100%" }}>
              <Grid container>
                <Grid item md></Grid>
                <Grid item md={1.2}>
                  <Typography variant="subtitle2" color="fontColor.main">
                    やっこ缶
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  "--Grid-borderWidth": "1px",
                  borderColor: "divider",
                  // py:1,
                  "& > div": {
                    backgroundColor: "tableHeader.main",
                    borderTop: "var(--Grid-borderWidth) solid",
                    borderLeft: "var(--Grid-borderWidth) solid",
                    borderRight: "var(--Grid-borderWidth) solid",
                    borderBottom: "var(--Grid-borderWidth) solid",
                    borderColor: "borderColor.main",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 1,
                  },
                }}
              >
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    color="fontColor.main"
                    fontWeight="bold"
                  >
                    納品日
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    color="fontColor.main"
                    fontWeight="bold"
                  >
                    納品コード
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    商品
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    数量
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    単位
                  </Typography>
                </Grid>
                <Grid item md textAlign="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    等分
                  </Typography>
                </Grid>
                <Grid item md textAlign="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    カット
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    提供先
                  </Typography>
                </Grid>
                <Grid item md textAlign="center">
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    納品時間
                  </Typography>
                </Grid>
                <Grid item md={2.5}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    Kg個数換算
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    (大) 14kg
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                  >
                    (小) 7kg
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* preview body */}
            {!loading ? (
              previewData.map((data: any) => {
                const nouhinYmd: any = dayjs(data.nouhinYmd);
                return (
                  <Grid
                    key={Math.random() * Math.random()}
                    container
                    sx={{
                      "--Grid-borderWidth": "1px",
                      // borderColor: "divider",
                      "& > div": {
                        // backgroundColor:data.syohinName=="合計"?"#fff5c9":"white",
                        borderTop: "var(--Grid-borderWidth) solid",
                        borderLeft: "var(--Grid-borderWidth) solid",
                        borderRight: "var(--Grid-borderWidth) solid",
                        borderBottom: "var(--Grid-borderWidth) solid",
                        borderColor: "#666666",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 1,
                      },
                    }}
                  >
                    <Grid item md>
                      <Typography variant="subtitle2" color="fontColor.main">
                        {/* {nouhinYmd&&{`${nouhinYmd.$M + 1}月${nouhinYmd.$D}日`}} */}
                        {isNaN(nouhinYmd.$M || nouhinYmd.$D)
                          ? ""
                          : `${nouhinYmd.$M + 1}月${nouhinYmd.$D}日`}
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                      ></Typography>
                    </Grid>
                    <Grid
                      className="total"
                      item
                      md
                      sx={{
                        backgroundColor:
                          data.syohinName == "合計"
                            ? "#fff5c9"
                            : data.syohinName == "総合計"
                            ? "#AFE8FD"
                            : "white",
                      }}
                    >
                      <Typography variant="subtitle2" color="fontColor.main">
                        {data.syohinName}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md
                      sx={{
                        backgroundColor:
                          data.syohinName == "合計"
                            ? "#fff5c9"
                            : data.syohinName == "総合計"
                            ? "#AFE8FD"
                            : "white",
                      }}
                    >
                      <Typography variant="subtitle2" color="fontColor.main">
                        {data.suryo}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md
                      sx={{
                        backgroundColor:
                          data.syohinName == "合計"
                            ? "#fff5c9"
                            : data.syohinName == "総合計"
                            ? "#AFE8FD"
                            : "white",
                      }}
                    >
                      <Typography variant="subtitle2" color="fontColor.main">
                        kg
                      </Typography>
                    </Grid>
                    <Grid item md textAlign="center">
                      <Typography variant="subtitle2" color="fontColor.main">
                        {data.kamawari}
                      </Typography>
                    </Grid>
                    <Grid item md textAlign="center">
                      <Typography variant="subtitle2" color="fontColor.main">
                        {data.cut}
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography variant="subtitle2" color="fontColor.main">
                        {data.teikeisaki}
                      </Typography>
                    </Grid>
                    <Grid item md textAlign="center">
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                      ></Typography>
                    </Grid>
                    <Grid item md={0.625}>
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                        sx={{ width: "100%", px: 0.5 }}
                        align="right"
                      >
                        {data.kansanA}
                      </Typography>
                    </Grid>
                    <Grid item md={0.625}>
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                        sx={{ width: "100%", px: 0.5 }}
                        align="left"
                      >
                        {data.syohinName == "合計" || "総合計" ? "" : "kg"}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md={0.625}
                      sx={{
                        backgroundColor:
                          data.syohinName == "合計"
                            ? "#fff5c9"
                            : data.syohinName == "総合計"
                            ? "#AFE8FD"
                            : "white",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                        sx={{ width: "100%", px: 0.5 }}
                        align="right"
                      >
                        {data.kansanB}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      md={0.625}
                      sx={{
                        backgroundColor:
                          data.syohinName == "合計"
                            ? "#fff5c9"
                            : data.syohinName == "総合計"
                            ? "#AFE8FD"
                            : "white",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                        sx={{ width: "100%", px: 0.5 }}
                        align="left"
                      >
                        袋
                      </Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                      ></Typography>
                    </Grid>
                    <Grid item md>
                      <Typography
                        variant="subtitle2"
                        color="fontColor.main"
                      ></Typography>
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "40vh",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  alignItems:'center'
                }}
              >
                <CircularProgress size={50} thickness={5} />
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="fontColor.main"
                    mt={2}
                  >
                   お待ち下さい
                  </Typography>
              </Box>
            )}

            {/* preview body */}
          </DialogContentText>
        </DialogContent>
        {/* </Box> */}
      </Dialog>
    </React.Fragment>
  );
};

export default Preview;
