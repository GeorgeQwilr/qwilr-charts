import { ResponsiveBar, Bar } from "@nivo/bar";
import { useEffect, useState } from "react";

const data = [
  {
    status: "All",
    count: 62,
  },
  {
    status: "Live",
    count: 10,
  },
  {
    status: "Engaged",
    count: 7,
  },
  {
    status: "Accepted",
    count: 5,
  },
];

function NivoBarChart() {
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setTimeout(() => setUpdate(true), 0);
  }, []);

  return (
    <div style={{ backgroundColor: "white", height: "500px" }}>
      <div
        style={{
          padding: 16,
          fontSize: 24,
          color: "rgba(0,0,0, 0.5)",
          fontWeight: 600,
        }}
      >
        Nivo Funnel
      </div>
      <ResponsiveBar
        height={400}
        data={data}
        keys={["count"]}
        indexBy="status"
        margin={{ top: 50, right: 0, bottom: 60, left: 0 }}
        padding={0.4}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={() => "#716BF1"}
        borderRadius={8}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 24,
          tickRotation: 0,
          renderTick: (tick) => {
            return (
              <>
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
                    {tick.value}
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
                    {data[tick.tickIndex].count}
                  </text>
                </g>
              </>
            );
          },
        }}
        labelTextColor="black"
        role="application"
        ariaLabel="Nivo bar chart demo"
        tooltip={() => null}
        enableGridY={false}
        enableGridX={false}
        theme={{
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default NivoBarChart;
