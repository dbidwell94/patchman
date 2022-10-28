import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalThemeWrapper from "./theme";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <GlobalThemeWrapper>
        <App />
      </GlobalThemeWrapper>
    </Router>
  </React.StrictMode>
);
