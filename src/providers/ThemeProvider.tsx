"use client";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
export default ThemeProvider;
