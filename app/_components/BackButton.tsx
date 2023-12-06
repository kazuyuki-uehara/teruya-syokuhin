import { Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  href: string;
}

const BackButton = ({ href }: Props) => {
  const router = useRouter();
  return (
    <Button
      variant="contained"
      size="medium"
      type="submit"
      sx={{ color: "white",fontSize:"18px"  }}
      onClick={() => router.push(href)}
    >
      戻る
    </Button>
  );
};

export default BackButton;
