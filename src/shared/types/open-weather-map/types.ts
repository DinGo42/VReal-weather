import { CountryCode } from "./country-code";
import { StatusCodes } from "../status-codes";
import { WeatherCondition } from "./weather-conditions";

export type Coords = {
  lat: number;
  lon: number;
};

export type Weather = {
  id: WeatherCondition;
  main: string;
  description: string;
  icon: string;
};

export type Main = {
  temp: number; /// Temperature in kelvins
  feels_like: number;
  pressure: number; // Pressure in hPa
  humidity: number; // in %
  temp_min: number; // Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
  temp_max: number;
  sea_level: number; // Pressure in hPa at sea_level
  grnd_level: number; // Pressure in hPa at grnd_level
};

export interface Wind {
  speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
  deg: number; // Wind direction, degrees (meteorological)
  gust?: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
}

export interface Clouds {
  all: number; // Cloudiness, %
}

export interface ForecastPrecipitation {
  "3h": number; // Rain volume for the last 3 hours, mm
}

export interface Precipitation extends ForecastPrecipitation {
  "1h"?: number; // Rain volume for the last 1 hour, mm
}

export interface ForecastSys {
  pod: "d" | "n"; // Part of the day (d = day, n = night)
}

export type Forecast = {
  dt: number;
  main: Main & { temp_kf: number };
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: ForecastPrecipitation; // Only in the first Element when received in a Forecast list
  snow?: ForecastPrecipitation; // Only in the first Element when received in a Forecast list
  sys: ForecastSys;
  dt_txt: Date; // Time of data forecasted, ISO, UTC
};

export type City = {
  country: CountryCode;
  coords: Coords;
  id: number;
  name: string;
  population: number;
  sunrise: Date;
  sunset: Date;
  timezone: number;
};
export type WeatherResponse = {
  message: number;
  city: City;
  cnt: number;
  cod: StatusCodes.SUCCESS;
  list: Forecast[];
  isTemperatureBelowZero: boolean;
};
