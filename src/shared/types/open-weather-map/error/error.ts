import { StatusCodes } from "../../status-codes";

export type WeatherError = {
  cod: Exclude<StatusCodes, StatusCodes.SUCCESS>;
  message: string;
  parameters?: string[];
};
