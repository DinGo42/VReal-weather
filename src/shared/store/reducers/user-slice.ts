import { TemperatureMetrics, selectedForecastStorage } from "@weather/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedLocation = {
  id: string;
  address: string;
  coords: { lat: number; lng: number };
  selectedMetrics: TemperatureMetrics;
};

export type UserState = {
  weatherForecasts: SelectedLocation[];
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    weatherForecasts: selectedForecastStorage.get() || [],
  },
  reducers: {
    addForecastLocation(state, action: PayloadAction<SelectedLocation>) {
      state.weatherForecasts.push(action.payload);
    },
    removeForecastLocation(state, action: PayloadAction<SelectedLocation["id"]>) {
      state.weatherForecasts = state.weatherForecasts.filter(({ id }) => id !== action.payload);
    },
  },
});
export const { addForecastLocation, removeForecastLocation } = userSlice.actions;

export const userReducer = userSlice.reducer;
