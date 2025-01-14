import React from "react";
import DailyInfo from "../DailyInfo/DailyInfo"; 
import styles from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <section className={styles.waterDetailedInfo}>
      <h2 className={styles.title}>Water Tracker</h2>
      <DailyInfo />
    </section>
  );
};

export default WaterDetailedInfo;
