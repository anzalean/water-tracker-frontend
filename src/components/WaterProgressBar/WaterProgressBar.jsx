import React from "react";
import styles from "./WaterProgressBar.module.css";

const WaterProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarTitle}>Today</div>
      <div className={styles.progressBarTrack}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progress}%` }} // Динамическая ширина
        ></div>
        <div
          className={styles.progressBarThumb}
          style={{ left: `${progress}%` }} // Динамическая позиция
        ></div>
      </div>
      <div className={styles.progressBarLabels}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
