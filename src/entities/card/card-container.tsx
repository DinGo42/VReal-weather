import { SelectedLocation } from "@weather/shared";
import { FC } from "react";
import { Card } from "./card";

type WeatherCardContainerProps = {
  data: SelectedLocation[];
};

export const WeatherCardContainer: FC<WeatherCardContainerProps> = ({ data }) =>
  data?.map(props => <Card key={props.id} {...props} />);
