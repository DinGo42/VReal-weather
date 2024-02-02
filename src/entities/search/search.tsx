import {
  Button,
  ButtonStyleTypes,
  Input,
  InputStyleTypes,
  TemperatureMetrics,
  getInfoByAddress,
  selectedForecastStorage,
  useUserStore,
} from "@weather/shared";
import { FC } from "react";
import { ClearSuggestions, SetValue, Status } from "use-places-autocomplete";
import { SearchingResults } from "./searching-results";
import { v4 as uuidv4 } from "uuid";

export type ResultItemProps = {
  clearSuggestions: ClearSuggestions;
  data: google.maps.places.AutocompletePrediction[];
  setLocation: SetValue;
};
export type SearchProps = {
  status: Status;
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
  setLocation: SetValue;
  clearSuggestions: ClearSuggestions;
  data: google.maps.places.AutocompletePrediction[];
};

export const Search: FC<SearchProps> = ({
  isLoading,
  onChange,
  value,
  status,
  clearSuggestions,
  data,
  setLocation,
}) => {
  const { addForecastLocation } = useUserStore();

  const handleAdd = async () => {
    if (!value) return;
    const {
      city,
      country: { shortName, longName },
      coords,
    } = await getInfoByAddress({ address: value });

    const address = city ? `${city}, ${shortName}` : longName;

    addForecastLocation({ address, coords, id: uuidv4(), selectedMetrics: TemperatureMetrics.CELSIUS });

    const info = selectedForecastStorage.get() ?? [];
    info?.push({ address, coords, id: uuidv4(), selectedMetrics: TemperatureMetrics.CELSIUS });
    selectedForecastStorage.set(info!);

    onChange(" ");
    clearSuggestions();
  };

  return (
    <div className="relative mx-auto my-10 flex w-[560px] gap-10">
      <Input
        value={value}
        onChange={({ target }) => onChange(target.value)}
        styleType={InputStyleTypes.MAIN}
        inputWrapperClassName="flex flex-col-reverse w-full"
      >
        {status === "OK" && (
          <div className="absolute top-full z-50 mt-5 flex h-fit w-full flex-col overflow-y-auto rounded-md bg-main-white shadow-[0px_3px_10px_-5px_rgb(0,0,0)]">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <SearchingResults clearSuggestions={clearSuggestions} data={data} setLocation={setLocation} />
            )}
          </div>
        )}
      </Input>
      <Button onClick={handleAdd} styleType={ButtonStyleTypes.MAIN}>
        Add
      </Button>
    </div>
  );
};
