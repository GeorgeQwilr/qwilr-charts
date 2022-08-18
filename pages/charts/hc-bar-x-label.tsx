import React from "react";

function BarChartXAxisLable({ value }: { value: string }): React.ReactElement {
  const [categoryName, categoryValue] = String(value).split("/");
  return (
    <>
      <text>
        <tspan
          textAnchor="middle"
          x={0}
          style={{
            fill: "#333",
            fontSize: 12,
            textTransform: "uppercase",
          }}
        >
          {categoryName}
        </tspan>
        <tspan
          textAnchor="middle"
          x={0}
          dx={-3}
          dy={32}
          style={{
            fontSize: 24,
          }}
        >
          {categoryValue}
        </tspan>
      </text>
    </>
  );
}

export default BarChartXAxisLable;
