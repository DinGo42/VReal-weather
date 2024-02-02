import { useState } from "react";
import "./App.css";
import { Search, WeatherCardContainer } from "./entities";
import { useSearch } from "./features";
import { TemperatureMetrics, getInfoByAddress, useUserStore } from "./shared";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [hasLocation, setLocation] = useState(false);
  const searchLogic = useSearch();
  const { weatherForecasts, addForecastLocation } = useUserStore();

  if (!hasLocation) {
    setLocation(true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const addressInfo = await getInfoByAddress({ location: { lat: coords.latitude, lng: coords.longitude } });
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
      <Search {...searchLogic} />
      <div className="grid h-full w-full gap-8 p-10 lg:grid-cols-3 xl:grid-cols-5">
        <WeatherCardContainer data={weatherForecasts} />
      </div>
    </>
  );
}

export default App;
