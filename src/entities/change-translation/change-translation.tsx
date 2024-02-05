import { PlanetIcon, ArrowIcon } from "@weather/icons";
import { Button, Languages, languageStorage } from "@weather/shared";
import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { twJoin } from "tailwind-merge";

type LanguagePickerProps = {
  className?: string;
};

export const LanguagePicker: FC<LanguagePickerProps> = memo(({ className }) => {
  const [isOpen, setOpen] = useState(false);
  const [language, setLanguage] = useState(languageStorage.get() || Languages.ENG);
  const { i18n } = useTranslation();

  const handleSelect = useCallback(
    (locale: Languages) => {
      setOpen(false);
      setLanguage(locale);
      i18n.changeLanguage(locale);
      languageStorage.set(locale);
    },
    [i18n],
  );
  return (
    <div className={twJoin("relative ml-40 flex w-fit flex-col items-center", className)}>
      <Button onClick={() => setOpen((prev) => !prev)}>
        <div className="flex w-fit items-center gap-1">
          <PlanetIcon className="size-3" />
          <span className="text-h4 text-[#AFAFAF]">{language.toUpperCase()}</span>
          <ArrowIcon className={twJoin(isOpen && "rotate-180", "h-3")} />
        </div>
      </Button>
      <div
        className={twJoin(
          "bg-white-1000 absolute z-50 mt-8 grid w-full shadow-main transition-all duration-500",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="w-full overflow-hidden">
          <div className={twJoin("flex flex-col items-center")}>
            {Object.values(Languages).map(
              (translate) =>
                language !== translate && (
                  <Button
                    key={translate}
                    onClick={() => handleSelect(translate)}
                    className={"text-black-1000 hover:bg-black-700 w-full p-1 px-[5px] py-[3px] text-start"}
                  >
                    {translate.toUpperCase()}
                  </Button>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
