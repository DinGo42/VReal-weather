import { LanguagePicker, Search, WeatherCardContainer } from "@weather/entities";
import { useSearch } from "@weather/features";
import { useUserLocation, useWeatherForecast, useScrollPagination } from "@weather/shared";

export const Home = () => {
  useScrollPagination();
  useUserLocation();
  const searchLogic = useSearch();
  const { weatherForecasts } = useWeatherForecast();

  return (
    <>
      <div className="flex h-fit w-full flex-col items-center gap-5 pt-10">
        <LanguagePicker className="self-end pr-5" />
        <Search {...searchLogic} />
      </div>

      <main role="main" className="grid h-fit w-full grid-rows-1 items-start gap-8 p-10 lg:grid-cols-3 xl:grid-cols-5">
        <WeatherCardContainer data={weatherForecasts} />
      </main>
    </>
  );
};
