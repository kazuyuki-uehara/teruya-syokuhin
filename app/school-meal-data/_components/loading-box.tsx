"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";

interface Props {
  naviSearchLoading: boolean;
  shohinLoading: boolean;
  schoolLunchCalLoading: boolean;
}

const LoadingBox = ({
  naviSearchLoading,
  shohinLoading,
  schoolLunchCalLoading,
}: Props) => {
  const [open, setopen] = useState(false);
  useEffect(() => {
    if (shohinLoading || naviSearchLoading || schoolLunchCalLoading) {
      setopen(true);
    } else {
      setopen(false);
    }
  }, [naviSearchLoading, shohinLoading, schoolLunchCalLoading]);
  
  return (
    <Modal
      disableAutoFocus={true}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: 1,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          読み込み中...
        </Typography>
        <CircularProgress size={50} />
      </Box>
    </Modal>
  );
};

export default LoadingBox;
