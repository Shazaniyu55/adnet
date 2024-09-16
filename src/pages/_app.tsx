"use client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Provider from '@/store/provider';
import { createTheme } from "@mui/material/styles";
import { Backdrop, CircularProgress } from "@mui/material";

import axios from "axios";
import ErrorAlert from "@/components/alerts/Error";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


declare module "@mui/material/styles" {
  interface Theme {
    smnk: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
      1300: string;
      1400: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    smnk: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
      1300: string;
      1400: string;
    };
  }
  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
  }
  interface PaletteOptions {}
}

const smnkColors = {
  100: "#ECEDFD",
  200: "#C7C8FA",
  300: "#A1A3F7",
  400: "#5659F0",
  500: "#1013BC",
  600: "#0F11A9",
  700: "#0D0F96",
  800: "#OBOD83",
  900: "#0A0C71",
  1000: "#080A5E",
  1100: "#07084B",
  1200: "#04052E",
  1300: "#04023B",
  1400: "#030426",
};

export const theme = createTheme({
  smnk: smnkColors,
  palette: {
    primary: {
      main: smnkColors[1200],
      light: smnkColors[100],
      dark: smnkColors[1200],
    },
    info: {
      main: smnkColors[500],
    },
  },
});

const logError = async (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}/api/error`,
      data: { msg: error.toString(), info },
    });
  } catch (err) {}
};

function fallbackRender({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  //resetErrorBoundary();
  return <ErrorAlert message={error.toString()} />;
}

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Provider>
      <SmnkErrorBoundary>
      <Component {...pageProps} />
      </SmnkErrorBoundary>
    </Provider>
  ) 
}

export function SmnkErrorBoundary({ children }: any) {
  return (
    <ErrorBoundary fallbackRender={fallbackRender} onError={logError}>
      {children}
    </ErrorBoundary>
  );
}

export function SmnkBackDrop() {
  const { pageLoading } = useSelector((state: RootState) => state.users);
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={pageLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
