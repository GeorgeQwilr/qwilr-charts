import { ReactElement, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Highcharts from "highcharts";
import borderRadius from "highcharts-border-radius";
import BarChartXAxisLable from "../charts/hc-bar-x-label";

borderRadius(Highcharts);

type Props = { data: any; drilldown?: any };

const createBarChart = ({ data, drilldown }: Props) => {
  return Highcharts.chart("container-hc", {
    chart: {
      type: "column",
    },
    title: {
      align: "left",
      text: "HC Funnel",
      style: {
        fontWeight: 700,
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
      lineWidth: 0,
      labels: {
        useHTML: false,
        format: "${text}",
        formatter: function () {
          return renderToStaticMarkup(
            createElement(BarChartXAxisLable, { value: String(this.value) })
          );
        },
      },
    },

    yAxis: {
      visible: false,
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        borderWidth: 1,
        dataLabels: {
          enabled: true,
          formatter: function (...values) {
            if (this.x === 0) return undefined;
            return `${Math.round(this.y)}%`;
          },
          useHTML: true,
          className: "chart-column-plot-label",
          padding: 12,
          style: {
            fontWeight: "500",
          },
        },
      },
      column: {
        borderRadiusTopLeft: 8,
        borderRadiusTopRight: 8,
      },
    },

    tooltip: {
      enabled: false,
    },

    colors: ["#716BF1"],

    series: [
      {
        colorByPoint: true,
        data,
      },
    ],
    drilldown: drilldown,
  });
};

export default createBarChart;
