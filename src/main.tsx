import {render} from 'preact';
import App from "./App";
import GlobalThemeWrapper from "./theme";
import { BrowserRouter as Router } from "react-router-dom";

render(
    <Router>
      <GlobalThemeWrapper>
        <App />
      </GlobalThemeWrapper>
    </Router>,
  document.body
);
