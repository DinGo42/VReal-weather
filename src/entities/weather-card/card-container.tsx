import { SelectedLocation } from "@weather/shared";
import { FC, memo } from "react";
import { WeatherCard } from "./card";

type WeatherCardContainerProps = {
  data: SelectedLocation[];
};

export const WeatherCardContainer: FC<WeatherCardContainerProps> = memo(({ data }) =>
  data.map((props) => <WeatherCard key={props.id} {...props} />),
);
