import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { subDays, addDays, format } from "date-fns";
import { useSelector } from "react-redux";
import { selectMonthWater, selectWaterDate } from "../../redux/water/selectors";
import css from "./Chart.module.css";
import { useTranslation } from "react-i18next";

export const Chart = () => {
  const monthData = useSelector(selectMonthWater);
  const dayOfMonth = useSelector(selectWaterDate);
  const { t } = useTranslation();

  const selectDay = new Date(dayOfMonth);
  const start = subDays(selectDay, 6);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  const weeklyData = weekDays.map((day) => {
    const dayData = monthData.find(
      (data) =>
        format(new Date(data.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );
    return {
      key: day.toISOString(),
      day: format(day, "dd"),
      totalDayWater: dayData ? dayData.totalDayWater / 1000 : 0,
    };
  });

  // Знаходимо максимальне значення випитої води
  const maxWater = Math.max(...weeklyData.map((data) => data.totalDayWater));
  const maxYAxisValue = Math.ceil(maxWater) + 1;

  const renderDot = (props) => {
    const { cx, cy, key } = props;
    return (
      <g key={key}>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#FFFFFF"
          stroke="#4CAF50"
          strokeWidth={2}
        />
      </g>
    );
  };

  let chartHeight;
  let padding;
  let margin = 0;

  const width = window.innerWidth;

  if (width >= 1440) {
    chartHeight = 251;
    padding = 25;
    margin = 49;
  } else if (width >= 768) {
    chartHeight = 251;
    padding = 45;
  } else {
    chartHeight = 268;
    padding = 20;
  }

  return (
    <div className={css.container}>
      <ResponsiveContainer
        width="100%"
        height={chartHeight}
        style={{ marginTop: margin, paddingTop: 5 }}
      >
        <AreaChart
          data={weeklyData}
          margin={{
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            padding={{ left: padding }}
          />
          <YAxis
            dataKey="totalDayWater"
            tickFormatter={(value) => value.toFixed(1)}
            unit={t("waterMainInfo.l")}
            tick={{ stroke: "black", strokeWidth: 0.2 }}
            axisLine={false}
            tickLine={false}
            padding={{ bottom: 20 }}
            domain={[0, maxYAxisValue]}
          />

          <Tooltip
            formatter={(value) => [
              `${value}`,
              `${t("monthInfo.totalDayWater")}`,
            ]}
          />

          <Area
            dataKey="totalDayWater"
            stroke="#4CAF50"
            fill="url(#colorUv)"
            dot={renderDot}
            activeDot={{ r: 8 }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={1} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
