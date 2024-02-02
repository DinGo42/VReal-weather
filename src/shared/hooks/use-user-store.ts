import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addForecastLocation as userAddForecastLocation,
  changeLanguage as userChangeLanguage,
  removeForecastLocation as userRemoveForecastLocation,
} from "../store";

export const useUserStore = () => {
  const { weatherForecasts, language } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const addForecastLocation = useCallback(
    (value: ReturnType<typeof userAddForecastLocation>["payload"]) => dispatch(userAddForecastLocation(value)),
    [dispatch],
  );
  const changeLanguage = useCallback(
    (value: ReturnType<typeof userChangeLanguage>["payload"]) => dispatch(userChangeLanguage(value)),
    [dispatch],
  );
  const removeForecastLocation = useCallback(
    (value: ReturnType<typeof userRemoveForecastLocation>["payload"]) => dispatch(userRemoveForecastLocation(value)),
    [dispatch],
  );

  return {
    weatherForecasts,
    language,
    addForecastLocation,
    changeLanguage,
    removeForecastLocation,
  };
};
