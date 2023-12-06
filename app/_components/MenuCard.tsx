import React, { memo } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Links from "next/link";

interface Props {
  image: string;
  menuName: string;
  secondMenuName?: string | undefined;
  onClick?: () => void;
  href?: string;
}

const MenuCard = ({
  image,
  menuName,
  secondMenuName,
  onClick,
  href,
}: Props) => {
  return (
    <Links
      // href="./kg-conversion-master"
      href={{
        pathname: href,
      }}
    >
      <Card
        sx={{
          borderTop: "0.5px solid",
          borderColor: "borderColor.main",
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            height="150"
            image={image}
            alt="green iguana"
            sx={{ p: 1,backgroundColor:'white' }}
          />
          <CardContent
            sx={{
              backgroundColor: "primary.main",
              height: 90,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ color: "white",fontSize:"20px"}}>
              {menuName}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "white",fontSize:"20px" }}>
              {secondMenuName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Links>
  );
};

export default memo(MenuCard);
