import { ThemeOptions } from "@mui/material/styles/createTheme";
import { createTheme, ThemeProvider, CssBaseline, GlobalStyles, css } from "@mui/material";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "@fontsource/ubuntu-mono";
import { PropsWithChildren } from "react";

const globalStyle = css`
  html {
    border: none;
    width: 100vw;
    height: 100vh;
  }
  body {
    width: 100%;
    height: 100vh;
  }
  div#root {
    width: 100%;
    height: 100%;
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    max-width: 100%;
    overflow-x: hidden;
  }
`;

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#007EF5",
    },
    secondary: {
      main: "#FFC300",
    },
    success: {
      main: "#4D8B31",
    },
    error: {
      main: "#ED254E",
    },
    info: {
      main: "#7A93AC",
    },
  },
  typography: {
    fontFamily: "Ubuntu",
  },
};

export const theme = createTheme({
  ...darkThemeOptions,
  shape: { borderRadius: 0 },
});

export default function GlobalThemeWrapper(props: PropsWithChildren) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyle} />
        {props.children}
      </ThemeProvider>
    </>
  );
}
