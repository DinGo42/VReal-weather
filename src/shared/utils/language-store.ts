import { Languages } from "../translations";
import { localStorageUtilsGenerator } from "./local-storage-utils-generator";

export const languageStorage = localStorageUtilsGenerator<Languages>("language");
