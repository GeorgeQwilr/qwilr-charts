import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const data = {
  labels: ["All", "Live", "Engaged", "Accepted"],
  datasets: [
    {
      data: [62, 10, 7, 5],
      backgroundColor: ["#716BF1"],
      borderColor: ["#716BF1"],
      borderWidth: 1,
      borderRadius: 8,
      barPercentage: 0.6,
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      enabled: false,
    },
    title: {
      display: true,
      position: "top",
      align: "start",
      text: "Chart.js Funnel",
      font: {
        size: 20,
      },
    },
    legend: {
      display: false,
    },
    datalabels: {
      offset: 24,
      anchor: "top",
      align: "top",
      display: function (context: any) {
        return context.dataIndex !== 0; // display labels with an odd index
      },
      labels: {
        title: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  },
  layout: {
    padding: {
      top: 16,
      left: 16,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      gridLines: {
        drawBorder: false,
      },
      ticks: {
        callback: function (tickIndex) {
          return [
            this.getLabelForValue(tickIndex),
            data.datasets[0].data[tickIndex],
          ];
        },
        font: {
          size: 20,
        },
      },
    },
  },
};

function CHBarChart() {
  return <Bar data={data} options={options} style={{ background: "white" }} />;
}

export default CHBarChart;
