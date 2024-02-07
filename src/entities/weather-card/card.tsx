import {
  Button,
  SelectedLocation,
  TemperatureFormulas,
  TemperatureMetrics,
  useWeatherForecast,
  getFormattedDate,
  selectedForecastStorage,
  StatusCodes,
  useError,
  useGetForecast,
} from "@weather/shared";
import { FC, memo, useCallback, useState } from "react";
import { Chart } from "../chart";
import { CloseIcon } from "@weather/icons";
import { useTranslation } from "react-i18next";
import { twJoin } from "tailwind-merge";
import { WeatherCardSkeleton } from "./card-skeleton";

export type CardProps = SelectedLocation;

const iconSrc = "http://openweathermap.org/img/w" as const;

export const WeatherCard: FC<CardProps> = memo(({ address, coords, id, selectedMetrics }) => {
  const [measurementScale, setMeasurementScale] = useState(selectedMetrics);
  const { createError } = useError();
  const { t, i18n } = useTranslation();
  const { isError, isLoading, data, isFetching } = useGetForecast(
    { ...coords, address },
    {
      selectFromResult: (res) => {
        if (!res.isSuccess || !res.data) return { ...res, data: undefined };
        const { list, isTemperatureBelowZero, location } = res.data;
        const rawForecastData = list.map(({ dt, main: { temp } }) => ({ date: dt, temperature: temp })) || [];
        const forecastData = rawForecastData.map(({ temperature, date }) => ({
          temperature: Math.floor(TemperatureFormulas[measurementScale](temperature, TemperatureMetrics.KELVIN)!),
          date: getFormattedDate({ locale: i18n.language, date: new Date(date * 1000) }).formattedMonthYear,
        }));
        return {
          ...res,
          data: {
            currentForecast: {
              feelsLikeTemperature: list[0].main.feels_like || 0,
              humidity: list[0].main.humidity || 0,
              pressure: list[0].main.pressure || 0,
              temperature: list[0].main.temp || 0,
              windSpeed: list[0].wind.speed || 0,
            },
            iconCode: list[0].weather[0].icon,
            weatherState:
              list[0].weather[0].description[0].toLocaleUpperCase() + list[0].weather[0].description.slice(1),
            forecastData,
            location,
            isTemperatureBelowZero,
          },
        };
      },
    },
  );
  const { removeForecastLocation } = useWeatherForecast();
  const { fullFormatted } = getFormattedDate({ locale: i18n.language });

  const handleClick = useCallback(
    (state: TemperatureMetrics) => {
      const info = selectedForecastStorage.get() ?? [];
      const updatedInfo = info.map(({ id: forecastId, ...props }) =>
        forecastId === id ? { ...props, id, selectedMetrics: state } : { ...props, id: forecastId },
      );
      selectedForecastStorage.set(updatedInfo);
      setMeasurementScale(state);
    },
    [id],
  );

  const handleDelete = useCallback(() => {
    removeForecastLocation(id);
    const info = selectedForecastStorage.get() ?? [];
    const updatedInfo = info.filter(({ id: forecastId }) => forecastId !== id);
    selectedForecastStorage.set(updatedInfo);
  }, [id, removeForecastLocation]);

  if (!data) return;

  const {
    currentForecast: { feelsLikeTemperature, humidity, pressure, temperature, windSpeed },
    forecastData,
    isTemperatureBelowZero,
    location,
    iconCode,
    weatherState,
  } = data;

  const currentTemperature = TemperatureFormulas[measurementScale](temperature, TemperatureMetrics.KELVIN)?.toFixed(1);
  const feelsLikeCurrentTemperature = TemperatureFormulas[measurementScale](
    feelsLikeTemperature,
    TemperatureMetrics.KELVIN,
  )?.toFixed(1);

  if (!currentTemperature || !feelsLikeCurrentTemperature || isError) {
    createError({ isError: true, message: t("errorMessage"), type: StatusCodes.NOT_FOUND });
    return;
  }

  return isFetching || isLoading ? (
    <WeatherCardSkeleton />
  ) : (
    <div
      className={twJoin(
        "flex h-full flex-col justify-between gap-4 rounded-md py-2 pl-4 pr-4 shadow-main",
        isTemperatureBelowZero ? "bg-black-600" : "bg-white-850",
      )}
    >
      <Button className="-mr-2 size-2 self-end" onClick={handleDelete}>
        <CloseIcon />
      </Button>
      <div className="-mt-4 flex justify-between pr-3">
        <div className="flex flex-col gap-1">
          <span className="text-h4">{location}</span>
          <span className="text-h3">{fullFormatted}</span>
        </div>
        <div className="flex h-fit items-center gap-2">
          <img src={`${iconSrc}/${iconCode}.png`} />
          <span className="-mt-1 text-h6 text-black-800">{weatherState}</span>
        </div>
      </div>
      <div className="h-[100px] w-full">
        <Chart
          chartColorFade={{
            from: isTemperatureBelowZero ? "#5B8CFF" : "#FFA25B",
            to: "#FFF4F4",
            fromOpacity: 1,
            toOpacity: 0,
          }}
          chartStrokeColor={isTemperatureBelowZero ? "#5B8CFF" : "#FFA25B"}
          data={forecastData}
          dotsChartDataKey={"temperature"}
          xChartDataKey="date"
        />
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <span className="text-h1">{!isTemperatureBelowZero ? "+" + currentTemperature : currentTemperature}</span>
            <div className="flex h-full items-center gap-2 text-h2 text-black-900">
              <Button
                onClick={() => handleClick(TemperatureMetrics.CELSIUS)}
                className={(measurementScale === TemperatureMetrics.CELSIUS && "text-black-1000") || ""}
              >
                {TemperatureMetrics.CELSIUS}
              </Button>
              <span className="h-5 w-[1.5px] bg-[#707070] text-h2 opacity-65"></span>
              <Button
                onClick={() => handleClick(TemperatureMetrics.FAHRENHEIT)}
                className={(measurementScale === TemperatureMetrics.FAHRENHEIT && "text-black-1000") || ""}
              >
                {TemperatureMetrics.FAHRENHEIT}
              </Button>
            </div>
          </div>
          <div className="text-h6 text-black-800">
            {t("weatherCard.feelsLike")}:{" "}
            {Number(feelsLikeCurrentTemperature) > 0 ? "+" + feelsLikeCurrentTemperature : feelsLikeCurrentTemperature}
            <span className="text-h6-semi-bold">{measurementScale}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="w-fit text-h7">
            {t("weatherCard.wind.type")}:{" "}
            <span
              className={twJoin("text-h7-semi-bold", isTemperatureBelowZero ? "text-blue-1000" : "text-orange-1000")}
            >
              {windSpeed}
              {t("weatherCard.wind.unit")}
            </span>
          </div>
          <div className="w-fit text-h7">
            {t("weatherCard.humidity.type")}:{" "}
            <span
              className={twJoin("text-h7-semi-bold", isTemperatureBelowZero ? "text-blue-1000" : "text-orange-1000")}
            >
              {humidity}
              {t("weatherCard.humidity.unit")}
            </span>
          </div>
          <div className="w-fit text-h7">
            {t("weatherCard.pressure.type")}:{" "}
            <span
              className={twJoin("text-h7-semi-bold", isTemperatureBelowZero ? "text-blue-1000" : "text-orange-1000")}
            >
              {pressure}
              {t("weatherCard.pressure.unit")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
