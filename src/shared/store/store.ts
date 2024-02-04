import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { errorReducer, userReducer } from "./reducers";
import { weatherApi } from "../services";

const rootReducer = combineReducers({
  userReducer,
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
