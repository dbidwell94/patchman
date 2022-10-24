import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import GlobalThemeWrapper from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalThemeWrapper>
      <App />
    </GlobalThemeWrapper>
  </React.StrictMode>
);
