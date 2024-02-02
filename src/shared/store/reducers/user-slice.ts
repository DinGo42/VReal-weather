import { TemperatureMetrics, Translates, languageStorage, selectedForecastStorage } from "@weather/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedLocation = {
  id: string;
  address: string;
  coords: { lat: number; lng: number };
  selectedMetrics: TemperatureMetrics;
};

export type UserState = {
  weatherForecasts: SelectedLocation[];
  language: Translates;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    language: languageStorage.get() || Translates.ENG,
    weatherForecasts: selectedForecastStorage.get() || [],
  },
  reducers: {
    changeLanguage(state, action: PayloadAction<Translates>) {
      state.language = action.payload;
    },
    addForecastLocation(state, action: PayloadAction<SelectedLocation>) {
      state.weatherForecasts.push(action.payload);
    },
    removeForecastLocation(state, action: PayloadAction<SelectedLocation["id"]>) {
      state.weatherForecasts = state.weatherForecasts.filter(({ id }) => id !== action.payload);
    },
  },
});
export const { addForecastLocation, changeLanguage, removeForecastLocation } = userSlice.actions;

export const userReducer = userSlice.reducer;
