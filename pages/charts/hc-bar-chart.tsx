import { useEffect } from "react";
import createBarChart from "../hc-utils/create-bar-chart";

const data = [
  {
    name: "All Pages / 62",
    y: 62.74,
    drilldown: "Chrome",
  },
  {
    name: "Live / 10",
    y: 10.57,
    drilldown: "Firefox",
  },
  {
    name: "Engaged / 7",
    y: 7.23,
    drilldown: "Internet Explorer",
  },
  {
    name: "Accepted / 5",
    y: 5.58,
    drilldown: "Safari",
  },
];

function HCBarChart() {
  useEffect(() => {
    createBarChart({ data });
  }, []);
  return <div id="container-hc"></div>;
}

export default HCBarChart;
