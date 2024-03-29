import { TemperatureMetrics, getPaginationStates, selectedForecastStorage } from "@weather/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const forecastStore = selectedForecastStorage.get() || [];

const { maxElementsPerPage, maxPaginationPages } = getPaginationStates({
  arrayFormPagination: forecastStore,
  itemHeight: 450,
  maxItemsInRow: 5,
  screensToConsider: 2,
});

export type SelectedLocation = {
  id: string;
  placeId: string;
  coords: { lat: number; lng: number };
  selectedMetrics: TemperatureMetrics;
};

export type UserState = {
  currentPaginationPage: number;
  weatherForecasts: SelectedLocation[];
};

const initialState = {
  currentPaginationPage: 0,
  weatherForecasts: forecastStore?.slice(0, maxElementsPerPage),
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    nextPaginationPage(state) {
      if (state.currentPaginationPage === maxPaginationPages) return;
      state.currentPaginationPage = state.currentPaginationPage + 1;
      const nextPageStartIndex = state.currentPaginationPage * maxElementsPerPage;
      const nextPageEndIndex = (state.currentPaginationPage + 1) * maxElementsPerPage;
      state.weatherForecasts = [
        ...state.weatherForecasts,
        ...forecastStore.slice(nextPageStartIndex, nextPageEndIndex),
      ];
    },
    addForecastLocation(state, action: PayloadAction<SelectedLocation>) {
      state.weatherForecasts.push(action.payload);
    },
    removeForecastLocation(state, action: PayloadAction<SelectedLocation["id"]>) {
      state.weatherForecasts = state.weatherForecasts.filter(({ id }) => id !== action.payload);
    },
  },
});
export const { addForecastLocation, removeForecastLocation, nextPaginationPage } = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
