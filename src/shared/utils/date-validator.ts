/* eslint-disable @typescript-eslint/naming-convention */
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import("dayjs/locale/he");
import("dayjs/locale/ru");
import { Translations } from "../types";

const ukrainianLocale: ILocale = {
  name: "ua",
  weekdays: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
  weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  weekdaysMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: [
    "Січеня",
    "Лютого",
    "Березень",
    "Квітня",
    "Травня",
    "Червня",
    "Липня",
    "Серпня",
    "Вересня",
    "Жовтня",
    "Листопада",
    "Грудня",
  ],
  monthsShort: ["Січ", "Лют", "Бер", "Квіт", "Трав", "Черв", "Лип", "Серп", "Вер", "Жовт", "Лист", "Rpy"],
  weekStart: 1,
  ordinal: (n: unknown) => `${n}.`,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY р.",
    LLL: "D MMMM YYYY р., HH:mm",
    LLLL: "dddd, D MMMM YYYY р., HH:mm",
  },
  relativeTime: {
    future: "через %s",
    past: "%s тому",
    s: "кілька секунд",
    m: "хвилина",
    mm: "хвилин",
    h: "година",
    hh: "годин",
    d: "день",
    dd: "днів",
    M: "місяць",
    MM: "місяців",
    y: "рік",
    yy: "років",
  },
} as const;

dayjs.locale(ukrainianLocale);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

type FormattedDate = {
  date?: Date;
  locale: Translations;
};

export const getFormattedDate = ({ date, locale }: FormattedDate) => {
  dayjs.locale(locale);

  const currentDate = dayjs(date);
  const formattedMonthYear = currentDate.format(locale === Translations.ENG ? "MM.DD" : "DD:MM");
  const formattedDate = currentDate.format(locale === Translations.ENG ? "ddd, D MMMM, h:mm A" : "ddd, D MMMM, HH:mm");

  return {
    fullFormatted: formattedDate,
    formattedMonthYear: formattedMonthYear,
  };
};
