import React from "react";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterButton from "../AddWaterButton/AddWaterButton";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import Logo from "../Logo/Logo"; 
import bottleImage from "../../assets/images/bottle_for_water@1x.webp";
import styles from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const handleAddWater = () => {
    console.log("Add Water button clicked");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <WaterDailyNorma amount="1.5 L" label="My daily norma" />

      <div className={styles.bottleContainer}>
        <img
          className={styles.bottleImage}
          src={bottleImage}
          alt="Water Bottle"
        />
      </div>

      <div className={styles.progressBarContainer}>
        <WaterProgressBar progress={50} />
      </div>

      <div className={styles.buttonContainer}>
        <AddWaterButton onClick={handleAddWater} />
      </div>
    </div>
  );
};

export default WaterMainInfo;
