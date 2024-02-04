import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addForecastLocation as userAddForecastLocation,
  removeForecastLocation as userRemoveForecastLocation,
} from "../store";

export const useUserStore = () => {
  const { weatherForecasts } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const addForecastLocation = useCallback(
    (value: ReturnType<typeof userAddForecastLocation>["payload"]) => dispatch(userAddForecastLocation(value)),
    [dispatch],
  );
  const removeForecastLocation = useCallback(
    (value: ReturnType<typeof userRemoveForecastLocation>["payload"]) => dispatch(userRemoveForecastLocation(value)),
    [dispatch],
  );

  return {
    weatherForecasts,
    addForecastLocation,
    removeForecastLocation,
  };
};
