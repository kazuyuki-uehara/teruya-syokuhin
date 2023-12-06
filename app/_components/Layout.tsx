import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import {
  defaultTheme,
  tiffanyTheme,
  lavenderTheme,
  teruraTheme,
} from "../theme";
import Image from "next/image";
import ThemeToggle from "../_components/ThemeToggle";
import Stack from "@mui/material/Stack";
import GradientBackground from "../_components/GradientBackground";
import Container from "@mui/material/Container";
import { Content } from "next/font/google";
import Links from "next/link";

type LayoutProps = Required<{
  readonly children: React.ReactNode;
}>;


const Layout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState(teruraTheme);
  
  return (
    <ThemeProvider theme={theme}>
      <GradientBackground theme={theme}>
        <Container fixed maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Links
              href={{
                pathname: "./",
              }}
            >
            <Image
              src="/logo/logo.svg"
              width={100}
              height={100}
              alt="Picture of the author"
            />
            </Links>
            {/* <ThemeToggle setTheme={setTheme} /> */}
          </Stack>
          {children}
        </Container>
      </GradientBackground>
    </ThemeProvider>
  );
};

export default Layout;
