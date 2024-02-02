import { StatusCodes, WeatherResponse } from "../types";

export const getWeatherForecast = async ({ lat, lng }: { lat: number; lng: number }): Promise<WeatherResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${"1a45ff9e85cd13ad1ad576307fe7a916"}`,
  );
  const res: WeatherResponse = await response.json();
  if (res.cod !== StatusCodes.SUCCESS) return res;
  return {
    ...res,
    list: res.list.filter((uknown, index) => (index + 1) % 8 === 0),
    isTemperatureBelowZero: res.list[0].main.temp < 273.15,
  };
};
