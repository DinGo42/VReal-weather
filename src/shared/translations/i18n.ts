import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEng from "./english/translation.json";
import translationUa from "./ukrainian/translation.json";
import translationHe from "./hebrew/translation.json";
import { Languages } from "../translations";
import { languageStorage } from "../utils/language-store";

export const resources = {
  en: {
    main: translationEng,
  },
  ua: {
    main: translationUa,
  },
  he: {
    main: translationHe,
  },
};

i18next.use(initReactI18next).init({
  ns: ["main"],
  defaultNS: "main",
  fallbackLng: languageStorage.get() || Languages.ENG,
  resources,
  fallbackNS: "main",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
