"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material";
import "./globals.css";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#9AD4D6",
      light: "#9cf4f7",
      dark: "#7fb1b3",
      contrastText: "#fff",
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Jost", sans-serif',
      color: "white",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#9AD4D6",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Standard
          "& .MuiInput-root": {
            color: "#e7e7e7",
            "&:before": {
              borderColor: "#e7e7e7",
              borderWidth: "1px",
            },
            "&:after": {
              borderColor: "#9AD4D6",
              borderWidth: "2px",
            },
            ":hover:not(.Mui-focused)": {
              "&:before": {
                borderColor: "#e7e7e7",
                borderWidth: "2px",
              },
            },
          },
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={customTheme}>{children} </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
