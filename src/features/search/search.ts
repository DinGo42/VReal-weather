import { languageStorage, Languages, getInfoByAddress } from "@weather/shared";
import { useState, useCallback, useEffect } from "react";
import useReactPlaces, { HookArgs } from "use-places-autocomplete";

const currentLanguage = languageStorage.get() || Languages.ENG;

export const useSearch = (settings?: HookArgs) => {
  const [newData, setData] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const {
    value,
    setValue,
    ready,
    suggestions: { data, loading, status },
    clearSuggestions,
  } = useReactPlaces({
    requestOptions: {
      types: ["geocode"],
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
        const addressInfo = await getInfoByAddress({ address: place.description });
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

  return {
    data: newData,
    isLoading: loading,
    status,
    onChange: handleChange,
    setLocation: setValue,
    clearSuggestions,
    value,
  };
};
