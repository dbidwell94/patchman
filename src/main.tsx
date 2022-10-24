import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalThemeWrapper from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalThemeWrapper>
      <App />
    </GlobalThemeWrapper>
  </React.StrictMode>
);
