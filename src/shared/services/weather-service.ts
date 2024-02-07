import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getInfoByAddress, languageStorage } from "../utils";
import { WeatherResponse, WeatherError, StatusCodes } from "../types";
import { Languages } from "../translations";

const currentLanguage = languageStorage.get() || Languages.ENG;

type WeatherApiParams = {
  lat: number;
  lng: number;
  address: string;
};

type WeatherApiResponse = {
  location: string;
} & WeatherResponse;

const validateWeatherResponse = async (
  data: WeatherResponse | WeatherError,
  _: unknown,
  { address }: WeatherApiParams,
) => {
  if (data.cod !== StatusCodes.SUCCESS || !data || !data.list || data.list.length === 0) {
    throw data;
  }
  const {
    city,
    country: { shortName },
  } = await getInfoByAddress({ address });
  return {
    ...data,
    location: city ? `${city}, ${shortName}` : address,
    list: data.list.filter((_, index) => (index + 1) % 8 === 0),
    isTemperatureBelowZero: data.list[0].main.temp < 273.15,
  };
};

export const weatherApi = createApi({
  reducerPath: "weatherAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/" }),
  endpoints: (builder) => ({
    getForecast: builder.query<WeatherApiResponse, WeatherApiParams>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: ({ lat, lng, address }) =>
        `data/2.5/forecast?lat=${lat}&lon=${lng}&lang=${currentLanguage}&appid=${"1a45ff9e85cd13ad1ad576307fe7a916"}`,
      transformResponse: validateWeatherResponse,
    }),
  }),
});

export const { endpoints } = weatherApi;

export const { useGetForecastQuery: useGetForecast, useLazyGetForecastQuery: useLazyForecast } = weatherApi;
