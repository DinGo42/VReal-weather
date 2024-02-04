import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addForecastLocation as userAddForecastLocation,
  removeForecastLocation as userRemoveForecastLocation,
  nextPaginationPage as userNextPaginationPage,
} from "../store";

export const useUserStore = () => {
  const { weatherForecasts, currentPaginationPage } = useAppSelector((state) => state.userReducer);
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
