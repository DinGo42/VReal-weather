import translationEng from "@weather/shared/translations/english/translation.json";
import { Translations } from "@weather/shared";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "main";
    resources: {
      main: typeof translationEng;
    };
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface i18n {
    changeLanguage(lng?: Translations, callback?: Callback): Promise<TFunction>;
    language: Translations;
  }
}
