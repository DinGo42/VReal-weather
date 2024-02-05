import { useState } from "react";
import { getInfoByAddress } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { TemperatureMetrics } from "../types";
import { useForecast } from "./use-forecast";

export const useUserLocation = () => {
  const [hasLocation, setLocation] = useState(false);
  const { addForecastLocation } = useForecast();
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
};
