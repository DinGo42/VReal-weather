import { SelectedLocation } from "../store";
import { localStorageUtilsGenerator } from "./local-storage-utils-generator";

export const selectedForecastStorage = localStorageUtilsGenerator<SelectedLocation[]>("selectedForecastLocation");
