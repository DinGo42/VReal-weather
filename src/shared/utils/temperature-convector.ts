import { TemperatureMetrics } from "../types";

export const TemperatureFormulas: Record<
  TemperatureMetrics,
  (temperature: number, currentTemperatureMetric: TemperatureMetrics) => number | null
> = {
  [TemperatureMetrics.CELSIUS]: (temperature: number, currentTemperatureMetric: TemperatureMetrics) => {
    if (currentTemperatureMetric === TemperatureMetrics.CELSIUS) return temperature;
    if (currentTemperatureMetric === TemperatureMetrics.FAHRENHEIT) return (temperature - 32) * (5 / 9);
    if (currentTemperatureMetric === TemperatureMetrics.KELVIN) return temperature - 273.15;
    return null;
  },
  [TemperatureMetrics.FAHRENHEIT]: (temperature: number, currentTemperatureMetric: TemperatureMetrics) => {
    if (currentTemperatureMetric === TemperatureMetrics.FAHRENHEIT) return temperature;
    if (currentTemperatureMetric === TemperatureMetrics.CELSIUS) return temperature * (9 / 5) + 32;
    if (currentTemperatureMetric === TemperatureMetrics.KELVIN) return (temperature - 273.15) * (9 / 5) + 32;
    return null;
  },
  [TemperatureMetrics.KELVIN]: (temperature: number, currentTemperatureMetric: TemperatureMetrics) => {
    if (currentTemperatureMetric === TemperatureMetrics.KELVIN) return temperature;
    if (currentTemperatureMetric === TemperatureMetrics.CELSIUS) return temperature + 273.15;
    if (currentTemperatureMetric === TemperatureMetrics.FAHRENHEIT) return (temperature - 32) * (5 / 9) + 273.15;
    return null;
  },
};
