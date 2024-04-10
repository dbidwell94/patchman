import App from "./App";
import GlobalThemeWrapper from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root")!);

root.render(
  <Router>
    <GlobalThemeWrapper>
      <App />
    </GlobalThemeWrapper>
  </Router>
);
