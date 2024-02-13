import { useState } from "react";
import { getInfoByAddress } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { TemperatureMetrics } from "../types";
import { useWeatherForecast } from "./use-weather-forecast";

export const useUserLocation = () => {
  const [hasLocation, setLocation] = useState(false);
  const { addForecastLocation, weatherForecasts } = useWeatherForecast();
  if (!hasLocation) {
    setLocation(true);
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const addressInfo = await getInfoByAddress({
        location: { lat: coords.latitude, lng: coords.longitude },
      });
      const { placeId } = addressInfo!;

      const isPlaceIdInStorage = !weatherForecasts.some(({ placeId: storagePlaceId }) => storagePlaceId === placeId);
      if (isPlaceIdInStorage) return;

      const locationData = {
        placeId,
        coords: { lat: coords.latitude, lng: coords.longitude },
        id: uuidv4(),
        selectedMetrics: TemperatureMetrics.CELSIUS,
      };

      addForecastLocation(locationData);
    });
  }
};
