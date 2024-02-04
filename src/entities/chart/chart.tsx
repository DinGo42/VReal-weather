import { FunctionComponent, memo } from "react";
import { ResponsiveContainer, AreaChart, XAxis, Area, LabelList } from "recharts";
import { Props as XAxisPropsType } from "recharts/types/cartesian/XAxis";
import { Props as LabelListPropsType } from "recharts/types/component/LabelList";
import { DataKey, Margin, ViewBox } from "recharts/types/util/types";
import { v4 as uuidv4 } from "uuid";
type Data = {
  value?: number | string | Array<number | string>;
  payload?: unknown;
  parentViewBox?: ViewBox;
};

type ChartProps<T extends Data, U extends Record<string, unknown>> = {
  data: U[];
  internalMarginGraphic?: Margin;
  bottomTextColor?: string;
  dotTextColor?: string;
  bottomTextClassName?: string;
  dotTextClassName?: string;
  chartStrokeColor?: string;
  xChartDataKey: keyof U | T;
  dotsChartDataKey: keyof U | T;
  chartColorFade?: {
    from: string;
    fromOpacity?: number;
    to: string;
    toOpacity?: number;
  };
  XAxisProps?: FunctionComponent<XAxisPropsType>;
  labelListProps?: LabelListPropsType<T>;
};

export const Chart = memo(
  <T extends Data, U extends Record<string, unknown>>({
    data,
    bottomTextColor = "#c5c5c5",
    dotTextColor = "#c5c5c5",
    internalMarginGraphic = {
      top: 20,
      right: 15,
      left: 20,
    },
    chartStrokeColor = "#FFA25B",
    bottomTextClassName = "text-h8",
    dotTextClassName = "text-h9",
    dotsChartDataKey,
    xChartDataKey,
    chartColorFade = { from: "#FFA25B", to: "#FFF4F4", fromOpacity: 1, toOpacity: 0 },
    XAxisProps,
    labelListProps,
  }: ChartProps<T, U>) => {
    const fadeId = uuidv4();
    return (
      <>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={internalMarginGraphic}>
            <defs>
              <linearGradient id={fadeId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={chartColorFade.from} stopOpacity={chartColorFade.fromOpacity} />
                <stop offset="100%" stopColor={chartColorFade.to} stopOpacity={chartColorFade.toOpacity} />
              </linearGradient>
            </defs>
            <XAxis
              type="category"
              axisLine={false}
              height={15}
              dataKey={xChartDataKey as DataKey<keyof T>}
              tickLine={false}
              className={bottomTextClassName}
              tick={{ fill: bottomTextColor }}
              {...XAxisProps}
            />
            <Area
              baseValue={"dataMin"}
              type="bumpX"
              dataKey={dotsChartDataKey as DataKey<keyof T>}
              fill={`url(#${fadeId})`}
              stroke={chartStrokeColor}
            >
              <LabelList
                position="top"
                fill={dotTextColor}
                className={dotTextClassName}
                {...labelListProps}
                dataKey={dotsChartDataKey as DataKey<T>}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </>
    );
  },
);
