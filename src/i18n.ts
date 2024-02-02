import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEng from "./shared/translations/english/translation.json";
import translationUa from "./shared/translations/ukrainian/translation.json";
import translationHe from "./shared/translations/hebrew/translation.json";

const resources = {
  en: {
    translation: translationEng,
  },
  ua: {
    translation: translationUa,
  },
  he: {
    translation: translationHe,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
});

export default i18next;
