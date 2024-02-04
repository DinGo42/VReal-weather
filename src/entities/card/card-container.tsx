import { SelectedLocation } from "@weather/shared";
import { FC, memo } from "react";
import { Card } from "./card";

type WeatherCardContainerProps = {
  data: SelectedLocation[];
};

export const WeatherCardContainer: FC<WeatherCardContainerProps> = memo(({ data }) =>
  data?.map((props) => <Card key={props.id} {...props} />),
);
