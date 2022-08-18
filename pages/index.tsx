import type { NextPage } from "next";

import HCBarChart from "./charts/hc-bar-chart";
import CHBarChart from "./charts/ch-bar-chart";
// import NivoBarChart from "./charts/nivo-bar-chart";
// import RCBarChart from "./charts/rc-bar-chart";
import D3BarChart from "./charts/d3-bar-chart";

import styles from "../styles/Home.module.css";

import dynamic from "next/dynamic";

const DynamicNivoBarChart = dynamic(() => import("./charts/nivo-bar-chart"), {
  ssr: false,
});

const DynamicRCBarChart = dynamic(() => import("./charts/rc-bar-chart"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.container}>
        <D3BarChart />
        <br />
        <HCBarChart />
        <br />
        <CHBarChart />
        <br />
        <DynamicRCBarChart />
        <br />
        <DynamicNivoBarChart />
      </div>
    </div>
  );
};

export default Home;
