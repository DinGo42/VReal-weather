import { useCallback } from "react";
import {
  addForecastLocation as userAddForecastLocation,
  removeForecastLocation as userRemoveForecastLocation,
  nextPaginationPage as userNextPaginationPage,
  useAppDispatch,
  useAppSelector,
} from "../store";

export const useWeatherForecast = () => {
  const { weatherForecasts, currentPaginationPage } = useAppSelector((state) => state.weatherReducer);
  const dispatch = useAppDispatch();

  const nextPaginationPage = useCallback(() => {
    dispatch(userNextPaginationPage());
  }, [dispatch]);

  const addForecastLocation = useCallback(
    (value: ReturnType<typeof userAddForecastLocation>["payload"]) => dispatch(userAddForecastLocation(value)),
    [dispatch],
  );
  const removeForecastLocation = useCallback(
    (value: ReturnType<typeof userRemoveForecastLocation>["payload"]) => dispatch(userRemoveForecastLocation(value)),
    [dispatch],
  );

  return {
    currentPaginationPage,
    weatherForecasts,
    addForecastLocation,
    removeForecastLocation,
    nextPaginationPage,
  };
};
