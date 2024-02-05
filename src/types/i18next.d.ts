import translationEng from "../shared/translations/english/translation.json";
import { Languages } from "@weather/shared";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "main";
    resources: {
      main: typeof translationEng;
    };
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface i18n {
    changeLanguage(lng?: Languages, callback?: Callback): Promise<TFunction>;
    language: Languages;
  }
}
