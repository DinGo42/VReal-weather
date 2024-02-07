import {
  Button,
  ButtonStyleTypes,
  Input,
  InputStyleTypes,
  TemperatureMetrics,
  getInfoByAddress,
  selectedForecastStorage,
  useWeatherForecast,
} from "@weather/shared";
import { FC, memo, useCallback } from "react";
import { ClearSuggestions, SetValue, Status } from "use-places-autocomplete";
import { SearchingResults } from "./searching-results";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

export type SearchProps = {
  status: Status;
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  setLocation: SetValue;
  clearSuggestions: ClearSuggestions;
  data: google.maps.places.AutocompletePrediction[];
  selectedValue: string;
  setSelected: (value: string) => void;
};

export const Search: FC<SearchProps> = memo(
  ({ isLoading, onChange, value, status, clearSuggestions, data, setLocation, selectedValue, setSelected }) => {
    const { t } = useTranslation();
    const { addForecastLocation } = useWeatherForecast();
    const handleAdd = useCallback(async () => {
      if (!selectedValue.trim()) return;
      const { coords } = await getInfoByAddress({ placeId: selectedValue });
      addForecastLocation({
        placeId: selectedValue,
        coords,
        id: uuidv4(),
        selectedMetrics: TemperatureMetrics.CELSIUS,
      });
      const info = selectedForecastStorage.get() ?? [];
      info.push({ placeId: selectedValue, coords, id: uuidv4(), selectedMetrics: TemperatureMetrics.CELSIUS });
      selectedForecastStorage.set(info);
      onChange(" ");
      setSelected("");
      clearSuggestions();
    }, [addForecastLocation, clearSuggestions, onChange, selectedValue, setSelected]);

    return (
      <div className="relative mx-auto flex w-full max-w-[640px] gap-10 px-10">
        <Input
          value={value}
          onChange={({ target }) => onChange(target.value)}
          styleType={InputStyleTypes.MAIN}
          inputWrapperClassName="flex flex-col-reverse w-full"
        >
          <div className="absolute top-full z-50 mt-5 flex h-fit w-full flex-col overflow-y-auto rounded-md bg-white-1000 shadow-main">
            {isLoading && status === "OK" ? (
              <span> {t("loading")}</span>
            ) : (
              <SearchingResults
                setSelected={setSelected}
                clearSuggestions={clearSuggestions}
                data={data}
                setLocation={setLocation}
              />
            )}
          </div>
        </Input>
        <Button onClick={handleAdd} styleType={ButtonStyleTypes.MAIN}>
          {t("header.addButton")}
        </Button>
      </div>
    );
  },
);
