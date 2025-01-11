import React from "react";
import styles from "./WaterDailyNorma.module.css";

const WaterDailyNorma = ({ amount, label }) => {
  return (
    <div className={styles.dailyNormaContainer}>
      <span className={styles.dailyNormaAmount}>{amount}</span>
      <span className={styles.dailyNormaLabel}>{label}</span>
    </div>
  );
};

export default WaterDailyNorma;
