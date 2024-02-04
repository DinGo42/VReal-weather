import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEng from "./shared/translations/english/translation.json";
import translationUa from "./shared/translations/ukrainian/translation.json";
import translationHe from "./shared/translations/hebrew/translation.json";
import { Translations, languageStorage } from "./shared";

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
  fallbackLng: Translations.ENG,
  resources,
  lng: languageStorage.get() || Translations.ENG,
  fallbackNS: "main",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
