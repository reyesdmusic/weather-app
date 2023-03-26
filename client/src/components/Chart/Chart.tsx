import "./Chart.css";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { format, parseISO } from "date-fns";

function Chart({ forecast }) {
    if (!forecast?.list?.length) return null;

    const chartData = forecast?.list?.map(weather => {
        return { date: weather.dt_txt, temp: weather?.main?.temp, humidity: weather?.main?.humidity }
    });
    
  return (
    <div className="chart-container">
        <div className="legend">
            <span className="temp">Temperature</span>
            <span className="humidity">Humidity</span>
        </div>
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
            <defs>
                <linearGradient id="primary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                <stop offset="75%" stopColor="var(--primary)" stopOpacity={0.05} />
                </linearGradient>

                <linearGradient id="secondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--secondary-light)" stopOpacity={0.4} />
                <stop offset="75%" stopColor="var(--secondary-light)" stopOpacity={0.05} />
                </linearGradient>
            </defs>

            <Area dataKey="temp" stroke="var(--secondary)" fill="url(#secondary)" />

            <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickFormatter={(str) => {
                const date = parseISO(str);
                const hour = format(date, "H");
                const formattedDate = format(date, "MMM d");
                if (+hour === 0) {
                    return formattedDate;
                } else {
                    return "";
                }
                }}
            />

            <YAxis
                dataKey="humidity"
                axisLine={false}
                tickLine={false}
                tickCount={10}
                tickFormatter={(number) => {
                    return number
                }}
            />

            <Area dataKey="humidity" stroke="var(--primary)" fill="url(#primary)"  />

            <Tooltip
                content={
                <CustomTooltip active="" payload="" label="" />
                }
            />

            <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>{payload[0].value.toFixed(2)}°F</p>
        <p>Humidity {payload[1].value}%</p>
      </div>
    );
  }
  return null;
}

export default Chart;
