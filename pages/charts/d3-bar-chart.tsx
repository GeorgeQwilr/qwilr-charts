import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const dataO = [
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

const data = dataO.map((d) => d.count);
const dataName = dataO.map((d) => d.name);

/**
 *
 * @param x
 * @param y
 * @param w
 * @param h
 * @param r
 * { tl, tr, bl, bt }
 * @returns
 */
function generatePath(x, y, w, h, r) {
  let radiusTopRight = "";
  let radiusTopLeft = "";
  let radiusBottomLeft = "";
  let radiusBottomRight = "";

  if (r.tr != undefined) radiusTopRight = `q${r.tr},0 ${r.tr},${r.tr}`;
  if (r.tl != undefined) radiusTopLeft = `q0, -${r.tl} ${r.tl}, -${r.tl}`;
  if (r.bl != undefined) radiusBottomLeft = `q-${r.bl}, 0 -${r.bl},-${r.bl}`;
  if (r.br != undefined) radiusBottomRight = `q0, ${r.br} -${r.br},${r.br}`;

  // below on works for tl & tr has value
  // need an algrithm for all cases
  const horizontalLineTop = `h${w - (r.tl || r.tr || 0)}`;
  const horizontalLineBottom = `h-${w - (r.br || 0)}`;
  const verticalLineLeft = `v${h - (r.tl || 0)}`;
  const verticalLineRight = `v-${h - (r.tl || 0)}`;

  const start = `M${x},${y}`;
  const close = "Z";

  return `${start}${horizontalLineTop}${radiusTopRight}${verticalLineLeft}${radiusBottomRight}${horizontalLineBottom}${radiusBottomLeft}${verticalLineRight}${radiusTopLeft}${close}`;
}

function drawChart() {
  const width = 960;
  const height = 500;
  const padding = 0.5;
  const bars = d3.select("#d3-bar-chart svg #d3-bars");
  const xaxis = d3.select("#d3-bar-chart svg #d3-xaxis");
  const labels = d3.select("#d3-bar-chart svg #d3-labels");

  const barSelections = bars.selectAll("rect").data(data);
  const xaxisSelections = xaxis.selectAll("text").data(dataO);
  const labelsSelections = labels.selectAll("text").data(data);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([110, height * 0.85]);

  barSelections
    .enter()
    .append("path")
    .attr("fill", "#716BF1")
    .attr("d", (d, i) => {
      const x =
        i * (width / data.length) + ((width / data.length) * (1 - padding)) / 2;
      const y = height - yScale(d);
      const w = (width / data.length) * padding;
      const h = yScale(d) - 100;

      return generatePath(x, y, w, h, { tl: 8, tr: 8 });
    });

  const text = xaxisSelections
    .enter()
    .append("text")
    .attr(
      "x",
      (d, i) =>
        i * (width / data.length) + ((width / data.length) * (1 - padding)) / 2
    )
    .attr("y", (d) => height * 0.95 - 50);

  text
    .style(
      "transform",
      `translate(${((width / data.length) * (1 - padding)) / 2}px, 0px)`
    )
    .append("tspan")
    .attr("text-anchor", "middle")
    .attr("style", "fill: #333; font-size: 12px; text-transform: uppercase")
    .text((d) => d.name);

  text
    .append("tspan")
    .attr(
      "x",
      (d, i) =>
        i * (width / data.length) +
        ((width / data.length) * (1 - padding)) / 2 -
        1
    )
    .attr("dy", 32)
    .attr("text-anchor", "middle")
    .attr("style", "font-size: 24px;")
    .text((d) => d.count);

  const label = labelsSelections.enter().append("g");

  label.style("display", (d, i) => (i === 0 ? "none" : "initial"));
  label
    .append("rect")
    .attr("fill", "rgba(113, 107, 241, 0.25)")
    .attr("rx", "12")
    .attr("ry", "12")
    .attr("width", "40")
    .attr("height", "24")
    .attr(
      "x",
      (d, i) =>
        i * (width / data.length) +
        ((width / data.length) * (1 - padding)) / 2 +
        40
    )
    .attr("y", (d) => height - yScale(d) - 16 - 16); // 16 offset;

  label
    .append("text")
    .attr("text-anchor", "middle")
    .style(
      "transform",
      `translate(${((width / data.length) * (1 - padding)) / 2}px, 0px)`
    )
    .style("font-size", "12px")
    .style("font-weight", "600")
    .attr(
      "x",
      (d, i) =>
        i * (width / data.length) + ((width / data.length) * (1 - padding)) / 2
    )
    .attr("y", (d) => height - yScale(d) - 16) // 16 offset
    .text((d) => `${d}%`);
}

function D3BarChart() {
  const chartRef = useRef(undefined);

  useEffect(() => {
    drawChart(chartRef);
  }, []);

  return (
    <div style={{ background: "white" }}>
      <div
        style={{
          padding: 16,
          fontSize: 24,
          color: "rgba(0,0,0, 0.5)",
          fontWeight: 600,
        }}
      >
        D3 Funnel
      </div>
      <div id="d3-bar-chart">
        <svg width="100%" height={500} style={{ padding: 16 }}>
          <g id="d3-labels" />
          <g id="d3-bars" />
          <g id="d3-xaxis" />
        </svg>
      </div>
    </div>
  );
}

export default D3BarChart;
