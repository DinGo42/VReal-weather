import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "./shared/translations/i18n.ts";
import { store } from "./shared";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);
