import {
  Button,
  SelectedLocation,
  TemperatureFormulas,
  TemperatureMetrics,
  cn,
  useForecast,
  useUserStore,
  formatDate,
  selectedForecastStorage,
} from "@weather/shared";
import { FC, useState } from "react";
import { Chart } from "../chart";
import { CloseIcon } from "@weather/icons";

export type CardProps = SelectedLocation;

export const Card: FC<CardProps> = ({ address, coords, id, selectedMetrics }) => {
  const { isError, isLoading, data, isFetching } = useForecast(coords, {
    selectFromResult: (res) => {
      if (!res.isSuccess || !res.data) return { ...res, data: undefined };
      const { list, isTemperatureBelowZero } = res.data;
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
          forecastData: list.map(({ dt, main: { temp } }) => ({ date: dt, temperature: temp })) || [],
          location: address,
          isTemperatureBelowZero,
        },
      };
    },
  });
  console.log(selectedMetrics, "selectedMetrics");
  const [measurementScale, setMeasurementScale] = useState(selectedMetrics);
  const { removeForecastLocation } = useUserStore();
  const {
    dayAsNumber,
    month: { fullName: fillMonth },
    dayOfWeek,
    time,
  } = formatDate(new Date())!;

  if (!data) return;

  const {
    currentForecast: { feelsLikeTemperature, humidity, pressure, temperature, windSpeed },
    forecastData,
    isTemperatureBelowZero,
    location,
    iconCode,
  } = data;

  const currentTemperature = TemperatureFormulas[measurementScale](temperature, TemperatureMetrics.KELVIN)?.toFixed(1);

  const feelsLikeCurrentTemperature = TemperatureFormulas[measurementScale](
    feelsLikeTemperature,
    TemperatureMetrics.KELVIN,
  )?.toFixed(1);

  const handleClick = (state: TemperatureMetrics) => {
    const info = selectedForecastStorage.get() ?? [];
    const updatedInfo = info.map(({ id: forecastId, ...props }) =>
      forecastId === id ? { ...props, id, selectedMetrics: state } : { ...props, id: forecastId },
    );
    selectedForecastStorage.set(updatedInfo);
    setMeasurementScale(state);
  };

  if (!currentTemperature || !feelsLikeCurrentTemperature || isFetching || isLoading || isError) return;
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-md py-2 pl-4 pr-4 shadow-[0px_3px_10px_-5px_rgb(0,0,0)]",
        isTemperatureBelowZero ? "bg-secondary-blue" : "bg-main-creamy",
      )}
    >
      <Button className="-mr-2 size-2 self-end" onClick={() => removeForecastLocation(id)}>
        <CloseIcon />
      </Button>
      <div className="-mt-4 flex justify-between pr-3">
        <div className="flex flex-col gap-1">
          <span className="text-h4">{location}</span>
          <span className="text-h3">{`${dayOfWeek.shortName}, ${dayAsNumber}, ${fillMonth}, ${time}`}</span>
        </div>
        <div className="flex h-fit items-center gap-2">
          <img src={`http://openweathermap.org/img/w/${iconCode}.png`} />
          <span className="-mt-1 text-h6 text-secondary-gray">Sunny</span>
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
          data={forecastData.map(({ temperature, date }) => {
            return {
              temperature: Math.floor(TemperatureFormulas[measurementScale](temperature, TemperatureMetrics.KELVIN)!),
              date: formatDate(date * 1000)?.dayAndMonth,
            };
          })}
          dotsChartDataKey={"temperature"}
          xChartDataKey="date"
        />
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <span className="text-h1">{!isTemperatureBelowZero ? "+" + currentTemperature : currentTemperature}</span>
            <div className="flex h-full items-center gap-2">
              <Button
                onClick={() => handleClick(TemperatureMetrics.CELSIUS)}
                className={cn(
                  "text-h2 text-main-gray",
                  measurementScale === TemperatureMetrics.CELSIUS && "text-main-black",
                )}
              >
                {TemperatureMetrics.CELSIUS}
              </Button>
              <span className="h-5 w-[1.5px] bg-[#707070] text-h2 opacity-65"></span>
              <Button
                onClick={() => handleClick(TemperatureMetrics.FAHRENHEIT)}
                className={cn(
                  "text-h2 text-main-gray",
                  measurementScale === TemperatureMetrics.FAHRENHEIT && "text-main-black",
                )}
              >
                {TemperatureMetrics.FAHRENHEIT}
              </Button>
            </div>
          </div>
          <div className="text-h6 text-secondary-gray">
            Feels like:{" "}
            {Number(feelsLikeCurrentTemperature) > 0 ? "+" + feelsLikeCurrentTemperature : feelsLikeCurrentTemperature}
            <span className="text-h6-semi-bold">{measurementScale}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="w-fit text-h7">
            Wind: <span className="text-h7-semi-bold text-main-blue">{windSpeed}m/s</span>
          </div>
          <div className="w-fit text-h7">
            Humidity: <span className="text-h7-semi-bold text-main-blue">{humidity}%</span>
          </div>
          <div className="w-fit text-h7">
            Pressure: <span className="text-h7-semi-bold text-main-blue">{pressure}Pa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
