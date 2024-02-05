import { useState } from "react";
import { ChangeTranslation, Search, Toast, WeatherCardContainer } from "./entities";
import { useSearch } from "./features";
import { TemperatureMetrics, getInfoByAddress, useUserStore } from "./shared";
import { v4 as uuidv4 } from "uuid";
import { useLazyLoading } from "./shared/utils/lazy-loading";

const App = () => {
  const [hasLocation, setLocation] = useState(false);
  useLazyLoading();
  const searchLogic = useSearch();
  const { weatherForecasts, addForecastLocation } = useUserStore();

  if (!hasLocation) {
    setLocation(true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const addressInfo = await getInfoByAddress({
        location: { lat: coords.latitude, lng: coords.longitude },
      });
      const {
        city,
        country: { shortName, longName },
      } = addressInfo!;

      const locationData = {
        address: city ? `${city}, ${shortName}` : longName,
        coords: { lat: coords.latitude, lng: coords.longitude },
        id: uuidv4(),
        selectedMetrics: TemperatureMetrics.CELSIUS,
      };
      addForecastLocation(locationData);
    });
  }
  return (
    <>
      <header className="flex h-fit w-full flex-col items-center gap-5 pt-10">
        <ChangeTranslation className="self-end pr-5" />
        <Search {...searchLogic} />
      </header>

      <div className="grid h-fit w-full grid-rows-1 items-start gap-8 p-10 lg:grid-cols-3 xl:grid-cols-5">
        <WeatherCardContainer data={weatherForecasts} />
      </div>
      <Toast />
    </>
  );
};

export default App;
