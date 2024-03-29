import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getInfoByAddress, languageStorage } from "../utils";
import { WeatherResponse, WeatherError, StatusCodes } from "../types";
import { Languages } from "../translations";

const currentLanguage = languageStorage.get() || Languages.ENG;

type WeatherApiParams = {
  lat: number;
  lng: number;
  placeId: string;
};

type WeatherApiResponse = {
  location: string;
} & WeatherResponse;

const validateWeatherResponse = async (
  data: WeatherResponse | WeatherError,
  _: unknown,
  { placeId }: WeatherApiParams,
) => {
  if (data.cod !== StatusCodes.SUCCESS || !data || !data.list || data.list.length === 0) {
    throw data;
  }
  const {
    city,
    country: { shortName, longName },
  } = await getInfoByAddress({ placeId });
  return {
    ...data,
    location: city ? `${city}, ${shortName}` : longName,
    list: data.list.filter((_, index) => (index + 1) % 8 === 0),
    isTemperatureBelowZero: data.list[0].main.temp < 273.15,
  };
};

export const weatherApi = createApi({
  reducerPath: "weatherAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/" }),
  endpoints: (builder) => ({
    getForecast: builder.query<WeatherApiResponse, WeatherApiParams>({
      query: ({ lat, lng }) =>
        `data/2.5/forecast?lat=${lat}&lon=${lng}&lang=${currentLanguage}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
      transformResponse: validateWeatherResponse,
    }),
  }),
});

export const { endpoints } = weatherApi;

export const { useGetForecastQuery: useGetForecast, useLazyGetForecastQuery: useLazyForecast } = weatherApi;
