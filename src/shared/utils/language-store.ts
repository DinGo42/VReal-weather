import { Translates } from "../types";
import { localStorageUtilsGenerator } from "./local-storage-utils-generator";

export const languageStorage = localStorageUtilsGenerator<Translates>("language");
