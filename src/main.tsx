import App from "./App";
import GlobalThemeWrapper from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";

render(
  <Router>
    <GlobalThemeWrapper>
      <App />
    </GlobalThemeWrapper>
  </Router>,
  document.body
);
