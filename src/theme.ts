"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#797979",
    },
    secondary: {
      main: "#9f3939",
    },
    warning: {
      main: "#ffab8d",
    },
  },
});

export default theme;
