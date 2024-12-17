import App from "./App";
import GlobalThemeWrapper from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import fr from "./translations/fr.json";
import es from "./translations/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
    fr: {
      translation: fr,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const root = createRoot(document.querySelector("#root")!);

root.render(
  <Router>
    <GlobalThemeWrapper>
      <App />
    </GlobalThemeWrapper>
  </Router>,
);
