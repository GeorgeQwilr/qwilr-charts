import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "All Pages",
    count: 62,
  },
  {
    name: "Live",
    count: 10,
  },
  {
    name: "Engaged",
    count: 7,
  },
  {
    name: "Accepted",
    count: 5,
  },
];

function RCBarChart() {
  return (
    <div
      style={{
        background: "white",
      }}
    >
      <div
        style={{
          color: "rgba(0,0,0, 0.6)",
          padding: "16px 0 16px 16px ",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        Recharts Funnel
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={data}
          margin={{ top: 16, right: 24, bottom: 16, left: 24 }}
        >
          <YAxis hide={true} domain={[0, 65]} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            height={55}
            tick={(tick) => (
              <g transform={`translate(${tick.x},${tick.y + 22})`}>
                <text
                  x={0}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: "#333",
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {data[tick.index].name}
                </text>
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  x={0}
                  dy={24}
                  style={{
                    fontSize: 24,
                  }}
                >
                  {data[tick.index].count}
                </text>
              </g>
            )}
          />
          <Bar
            dataKey="count"
            fill="#716BF1"
            barSize={120}
            label={(label) => {
              if (label.index === 0) return null;
              return (
                <g>
                  <rect
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgba(113, 107, 241, 0.25)"
                    x={label.x + 40}
                    y={label.y - 32}
                    rx="12"
                    ry="12"
                    width="40"
                    height="24"
                  />
                  <text
                    x={label.x + 60}
                    y={label.y - 16}
                    fill={label.stroke}
                    fontSize={12}
                    fontWeight={600}
                    textAnchor="middle"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;{label.value}
                    %&nbsp;&nbsp;&nbsp;&nbsp;
                  </text>
                </g>
              );
            }}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RCBarChart;
