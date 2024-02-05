import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { errorReducer, weatherReducer } from "./reducers";
import { weatherApi } from "../services";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  weatherReducer,
  errorReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
  });
  return store;
};

export const store = setupStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
