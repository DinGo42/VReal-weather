import { languageStorage, Languages, getInfoByAddress, useWeatherForecast } from "@weather/shared";
import { useState, useCallback, useEffect } from "react";
import useReactPlaces, { HookArgs } from "use-places-autocomplete";

const currentLanguage = languageStorage.get() || Languages.ENG;

export const useSearch = (settings?: HookArgs) => {
  const [newData, setData] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const { weatherForecasts } = useWeatherForecast();
  const [selectedValue, setSelected] = useState("");
  const {
    value,
    setValue,
    ready,
    suggestions: { data, loading, status },
    clearSuggestions,
  } = useReactPlaces({
    requestOptions: {
      types: ["(regions)"],
      language: currentLanguage,
    },
    cache: false,
    debounce: 500,
    ...settings,
  });

  useEffect(() => {
    if (!ready) return;
    Promise.all(
      data.map(async (place) => {
        const addressInfo = await getInfoByAddress({ placeId: place.place_id });
        const {
          city,
          country: { shortName, longName },
        } = addressInfo;
        return {
          ...place,
          description: city ? `${city}, ${shortName}` : longName,
        };
      }),
    ).then((res) => setData(res));
  }, [data, ready]);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
    },
    [setValue],
  );

  const searchResultData = newData.filter(
    ({ place_id: placeId }) => !weatherForecasts.some(({ placeId: storagePlaceId }) => storagePlaceId === placeId),
  );

  return {
    data: searchResultData,
    isLoading: loading,
    status,
    selectedValue,
    setSelected,
    onChange: handleChange,
    setLocation: setValue,
    clearSuggestions,
    value,
  };
};
