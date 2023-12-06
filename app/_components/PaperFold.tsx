"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Links from "next/link";

// type PaperProps = Required<{
//     readonly children: React.ReactNode;
// }>;

interface PaperProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}

export default function PaperFold({ children, href = "" }: PaperProps) {
  return (
    <Links
      // href="./kg-conversion-master"
      href={{
        pathname: href,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "auto",
          height: "auto",
          borderRadius: "10px",
          border: "0.2px solid",
          borderColor: "borderColor.main",
          backgroundColor: "cardBg.main",
          color: "#363c5f",
          padding: "20px",
          // pb:0,
          textAlign: "left",
          //   display: "flex",
          flexDirection: "row",
          //   justifyContent: "space-between",
          clipPath:
            "polygon(0 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, 0 100%)",
          "&::after": {
            content: '""',
            position: "absolute",
            display: "block",
            width: "50px",
            height: "50px",
            backgroundColor: "primary.main",
            top: 0,
            right: 0,
            borderBottomLeftRadius: "10px",
            boxShadow: 4,
          },
        }}
      >
        {children}
      </Box>
    </Links>
  );
}
